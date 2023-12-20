runf() {
  cat>$2; [ ${2%%.desktop} != $2 ]&& chmod +x $2; $1 $2; rm $2
}

runf 'xdg-mime install' SV-db.xml <<OK
<?xml version="1.0"?>
<mime-info xmlns='http://www.freedesktop.org/standards/shared-mime-info'>
  <mime-type type="application/x-svpk">
    <comment>Voice install</comment>
    <glob pattern="*.svpk"/>
  </mime-type>
  <mime-type type="application/x-s5p">
    <sub-class-of type="application/json"/>
    <comment>Song Project</comment>
    <glob pattern="*.s[v5]p"/>
  </mime-type>
  `sed -E 's/(\w+)/<mime-type type="application\/x-s5pc"><comment>Song Import<\/comment><glob pattern="*.\1"\/><\/mime-type>\n/g' <<<" ust vsqx vpr ccs"`
</mime-info>
OK
s=`echo application/x-s{vpk,5p,5pc}`

runf 'xdg-desktop-menu install' SV-app.desktop <<OK
[Desktop Entry]
Version=1.0
Type=Application
Name=Synthesizer V
Exec='$HOME/`ls Synth*/synthv-studio`' %f
Icon=SV-app
Comment=At the forefront of singing synth
Categories=AudioVideo
MimeType=${s// /;};audio/midi;
OK
icons() {
for x in $s; do
xdg-icon-resource install --context mimetypes --size 128 $1 $x
done
}
curl https://resource.dreamtonics.com/download/_h5ai/public/images/themes/comity/ar-svpk.svg \
|rsvg-convert --width=128|runf icons SV.png
curl https://dreamtonics.com/wp-content/themes/homepage_theme/assets/img/front/app_icon.png|\
runf 'xdg-icon-resource install --size 512' SV-app.png
