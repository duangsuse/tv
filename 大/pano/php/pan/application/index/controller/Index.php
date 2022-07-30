<?php
namespace app\index\controller;
use Think\Controller;

define("TBS_STATIC","x");

class Index extends \think\Controller
{
    public function index($code,$cutNum){
        //return var_dump($this);
        // return $this->fetch("hello", []);
        //先 获取id （md5值）
        // $code =trim(I("code"));
        //图片切割方式  6图（采集的是6图） 和12图（比较复杂建议生成图片 用6图 配置切割）
        // $cutNum =intval(I("cutNum"));

        // $t = new \think\Template();
        return $this->fetch("d3",["codeVal"=>$code,"cutNum"=>$cutNum]);
        // $t->display();
    }
    

    public function hello($name = 'ThinkPHP5')
    {
        
        return 'hello,' . $name;
    }

    public function upload_3d_pic()
    {
        $file = $_FILES["imgUpload"];
        $u_name =$file['name'];
        $u_temp_name =$file['tmp_name'];
        $u_size =$file['size'];
        
        // 生成 一个随机字符串
        $str = null;
        $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123tbs456789abcdefghijklmnopqrstuvwxyz";
        $max = strlen($strPol)-1;
        for($i=0;$i<$length;$i++){
            $str.=$strPol[rand(0,$max)];//rand($min,$max)生成介于min和max两个数之间的一个随机整数
        }
        
        //$md5Code 会作为文件夹的名字 跟文件的名字，要保持惟一性
        $md5Code =md5_16bit(hash("sha256",$u_name.time().$rand_char)).$str;
        $datePath =date("Y-m-d",time());
    
        $root_path ='./upload_3dpic/';
        $url_path ='/upload_3dpic/';    //外部访问url
        $f_up_to_path =$root_path .'/'. $datePath.'/'.$md5Code;
        if(!file_exists($f_up_to_path)){
            mkdir($f_up_to_path, 0777, true);
        }
        $type = strtolower(substr($u_name, strrpos($u_name, '.') + 1));
        $img_file_name =$md5Code."." . $type;
    
        $saveFileName = $f_up_to_path."." . $type;
        $true_img_url =$url_path . $datePath.'/'.$md5Code."." . $type; //外部访问连接
        if (!move_uploaded_file($u_temp_name, $saveFileName)) {
            $this->ajaxReturn(array("error_code"=>250,"msg"=>"图片上传失败，请稍后重试！","return"=>"move pic fail>>temp_name=".$u_temp_name.">>save file name=".$saveFileName));
        } else {
            @rmdir($f_up_to_path);
        }
    
        //判断文件是否存在
        if(file_exists($saveFileName)){
            //若是存在 则生成 全景图
            $this->create_pano_pic($saveFileName);
            // 若是 此时没有生成图片 须要删除上传图片并报错 平面图可能生成不了图片
            $dirName = dirname($saveFileName) . '/pano' . '/' . $md5Code . '.tbs-pano';
            if ( !file_exists($dirName) ) {
                unlink($saveFileName); // 删除文件
                $this->ajaxReturn(array('error_code'=>250,"msg"=>"上传图片不能生成全景图"));
            }
    
            //移动全景图到指定的目录 图片在哪里全景图将会生成在那个目录
            $mvres = $this->mv_to_pano_path($saveFileName,$img_file_name);
            if ( $mvres === false ) {
                $this->ajaxReturn(array('error_code'=>250,"msg"=>"移动文件失败"));
            }
        }else{
    
            $this->ajaxReturn(array('error_code'=>250,"msg"=>"img not exists!",'img_url'=>$true_img_url));
        }
        // 移动后的缩略图路径
        $thumb_url = $url_path . 'TreeDPic/' . $md5Code . '/pano/' . $md5Code . '.tbs-pano/3d-pano-thumb.jpg';
        $this->ajaxReturn(array(
            'error_code'=>0,
            'msg'=>"sucess",
            'img_url'=>$true_img_url,
            "pano_name"=>$md5Code,
            'thumb_url'=>$thumb_url)
         );
    }
    
    /***
    * @param string $img_path
    * @return string
    * 将当前传入的图片 渲染成为全景图
    */
    private function create_pano_pic($img_path="")
    {
        if(empty($img_path)){
            return $img_path;
        }
        if(!file_exists($img_path)){
            return "图片不存在！";
        }
        //软件注册码
        $r_code ="FXsqTqaGNSZER5dSETEm+VzQEh9sWSa5DZMFsSmMxYV9GcXs8W3R8A/mWXrGNUceXvrihmh28hfRF1ivrW0HMzEychPvNiD8B/4/ZzDaUE9Rh6Ig22aKJGDbja1/kYIqmc/VKfItRE2RTSOIbIroxOtsz626NIpxWksAAifwhpNwuPXqDQpz2sRUMBzoPqZktpkItoSenN2mKd8Klfx7pOuB6CIK3e1CDXgyndqOt2mWybLZcU/wfJVAecfxk15ghiqrzaDsbqrdABDowg==";
    
        $pano_path=C("KRPANO_PATH"); //krpano 路径 本身配置
    
        $pano_tools ="krpanotools";
    
        //krpano 生成图片的命令
        $dealFlat = ''; // 处理 非球面图
        if(PHP_OS == 'WINNT'){
            $pano_path=$pano_path."Win";
            $pano_tools ="krpanotools32.exe";
        } else {
            // 上传平面图时 直接跳过图片生成 不然会一直等待
            $dealFlat = 'echo -e "0\n" | '; 
        }
        
        $kr_command = $dealFlat . $pano_path . "/".$pano_tools." makepano -config=" . $pano_path . "/templates/normal.config ";
    
        try{
            //在生成图片以前 先注册一下码，要不生成的全景图会有水印
            exec( $pano_path . '/'.$pano_tools.' register ' .$r_code);
            $kr_command =$kr_command.$img_path;
            //执行生成图片命令
            exec($kr_command, $log, $status);
        } catch (\Exception $e){
            $this->ajaxCallMsg(250,$e->getMessage());
        }
        return true;
    }
    
    /**
    * @param $pano_img_path
    * @return string
    * 全景图生成后再调用这个方法，把全景图移到对应的目录供 xml 文件获取内容
    */
    private function mv_to_pano_path($pano_img_path,$img_name){
        $ig_name =explode(".",$img_name)[0];
        $root_path = './upload_3dpic/';
    
        if(!file_exists($pano_img_path) ||empty($pano_img_path)){
            $this->up_error_log($pano_img_path.'》》图片路径文件不存在');
            return '';
        }
    
        $now_path =dirname($pano_img_path);//获取当前文件目录
    
        if ($dh = @opendir($now_path)){
            //打开目录
            while (($file = readdir($dh)) !== false){
                //循环获取目录的 文件
                if (($file != '.') && ($file != '..')) {
                    //若是文件不是.. 或 . 则就是真实的文件
                    if($file=="pano"){
                        //全景图切片目录
                        $t_d_path =$root_path .'TreeDPic/'. $ig_name;
    
                        if(!file_exists($t_d_path)){
                            //不存在就建立
                            @mkdir($t_d_path, 0777, true);
                        }
                        if(file_exists($t_d_path.'/'.$file)){
                            //判断是否已经存在 当前名字的  全景图 文件
                            return false;
                        }else{
                            //不然就 把 当前上传的生成 的全景文件切片，移动到指定的目录
                            rename($now_path.'/'.$file,$t_d_path.'/'.$file);
                        }
                    }else if ($file !==$img_name){
                        //删除不是 原图片的文件
                        if(is_dir($file)){
                            $this->deleteDir($now_path.'/'.$file);
                        }else{
                            @unlink($now_path.'/'.$file);
                        }
                    }else{
                        return false;
                    }
                }
            }
            closedir($dh);
        }else{
            return false;
        }
    
    }
    /**
    * @param $dir
    * @return bool
    * 删除文件夹及文件
    */
    private  function deleteDir($dir)
    {
        if (!$handle = @opendir($dir)) {
            return false;
        }
        while (false !== ($file = readdir($handle))) {
            if ($file !== "." && $file !== "..") {       //排除当前目录与父级目录
                $file = $dir . '/' . $file;
                if (is_dir($file)) {
                    $this->deleteDir($file);
                } else {
                    @unlink($file);
                }
            }
        }
        @rmdir($dir);
    }
    

// 解析XML文件
public function panorama_xml(){
    $code =I("code");
    $cutNum =intval(I("cutNum"));
    $url_path = '/upload_3dpic/';   
    // 切割模式分为 6图 和 12图
    if(!in_array($cutNum,array(6,12))){
        $this->error();
    }
    $this->echoSixXml($url_path,$code);
}

private function echoSixXml($url_path,$code=""){
    echo "<krpano  version=\"1.19\" title=\"Virtual Tour\">
            <!-- the skin -->
            <!-- <include url=\"/3dpic/pano/sixDefaultXml/\" />--> 

            <!-- 视图设置 <view hlookat=\"0\" vlookat=\"0\" maxpixelzoom=\"1.0\" fovmax=\"150\" limitview=\"auto\" /> -->
            

            <skin_settings maps=\"false\"
                   maps_type=\"google\"
                   maps_bing_api_key=\"\"
                   maps_google_api_key=\"\"
                   maps_zoombuttons=\"false\"
                   gyro=\"true\"
                   webvr=\"true\"
                   webvr_gyro_keeplookingdirection=\"false\"
                   webvr_prev_next_hotspots=\"true\"
                   littleplanetintro=\"false\"
                   title=\"true\"
                   thumbs=\"true\"
                   thumbs_width=\"120\" thumbs_height=\"80\" thumbs_padding=\"10\" thumbs_crop=\"0|40|240|160\"
                   thumbs_opened=\"false\"
                   thumbs_text=\"false\"
                   thumbs_dragging=\"true\"
                   thumbs_onhoverscrolling=\"false\"
                   thumbs_scrollbuttons=\"false\"
                   thumbs_scrollindicator=\"false\"
                   thumbs_loop=\"false\"
                   tooltips_buttons=\"false\"
                   tooltips_thumbs=\"false\"
                   tooltips_hotspots=\"false\"
                   tooltips_mapspots=\"false\"
                   deeplinking=\"false\"
                   loadscene_flags=\"MERGE\"
                   loadscene_blend=\"OPENBLEND(0.5, 0.0, 0.75, 0.05, linear)\"
                   loadscene_blend_prev=\"SLIDEBLEND(0.5, 180, 0.75, linear)\"
                   loadscene_blend_next=\"SLIDEBLEND(0.5,   0, 0.75, linear)\"
                   loadingtext=\"loading...\"
                   layout_width=\"100%\"
                   layout_maxwidth=\"814\"
                   controlbar_width=\"-24\"
                   controlbar_height=\"40\"
                   controlbar_offset=\"20\"
                   controlbar_offset_closed=\"-40\"
                   controlbar_overlap.no-fractionalscaling=\"10\"
                   controlbar_overlap.fractionalscaling=\"0\"
                   design_skin_images=\"vtourskin.png\"
                   design_bgcolor=\"0x2D3E50\"
                   design_bgalpha=\"0.8\"
                   design_bgborder=\"0\"
                   design_bgroundedge=\"1\"
                   design_bgshadow=\"0 4 10 0x000000 0.3\"
                   design_thumbborder_bgborder=\"3 0xFFFFFF 1.0\"
                   design_thumbborder_padding=\"2\"
                   design_thumbborder_bgroundedge=\"0\"
                   design_text_css=\"color:#FFFFFF; font-family:Arial;\"
                   design_text_shadow=\"1\"
                   />
            
    
            <scene name=\"{$code}\" title=\"{$code}\" onstart=\"\" thumburl=\"{$url_path}TreeDPic/{$code}/pano/{$code}.tbs-pano/3d-pano-thumb.jpg\" lat=\"\" lng=\"\" heading=\"\">
        
                <view hlookat=\"0.0\" vlookat=\"0.0\" fovtype=\"MFOV\" fov=\"120\" maxpixelzoom=\"2.0\" fovmin=\"70\" fovmax=\"140\" limitview=\"range\" vlookatmin=\"-58.156\" vlookatmax=\"58.156\" />
        
                <preview url=\"{$url_path}TreeDPic/{$code}/pano/{$code}.tbs-pano/3d-pano-preview.jpg\" />
        
                <image type=\"CUBE\" multires=\"true\" tilesize=\"512\">
                    <cube url=\"{$url_path}TreeDPic/{$code}/pano/{$code}.tbs-pano/3d-pano-%s.jpg\" />
                </image>
            </scene>
            <!--<preview url=\"{$url_path}TreeDPic/{$code}/pano/{$code}.tbs-pano/preview.jpg\" />-->

            <image>
                <cube url=\"{$url_path}TreeDPic/{$code}/pano/{$code}.tbs-pano/3d-pano-%s.jpg\" />
            </image>

        </krpano>";
    }

}
