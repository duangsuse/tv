setlocal
set args=anim
for /F "tokens=*" %%s in ('dir *.txt /b') do set args=%args% %%s
echo %args%
pause