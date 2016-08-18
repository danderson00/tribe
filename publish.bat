node ./bumpVersion.js
for /d %%m in (node_modules/*) do (
  cd node_modules/%%m
  npm publish
  cd ..\..
)
