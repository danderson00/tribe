for /d %%m in (node_modules/*) do (
  cd node_modules/%%m
  npm install
  for /d %%f in (node_modules\tribe*) do rd /s /q %%f
  cd ..\..
)
