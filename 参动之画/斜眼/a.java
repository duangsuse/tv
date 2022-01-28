class FnRun{
  interface R{void run();}
  static R f1;
  static public void main(String[]a){
    f1="".isEmpty()? ()->{ a[0]=""; } :new R(){public void run(){a[1]="";} };
  }
}
