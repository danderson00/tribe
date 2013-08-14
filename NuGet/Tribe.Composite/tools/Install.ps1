param($installPath, $toolsPath, $package, $project)

# Add the PreBuild event
$command = "`r`n`$(ProjectDir)Tools\PackScript.exe `"`$(ProjectDir)`""
$project.Properties | where { $_.Name -eq "PreBuildEvent" } | foreach { $_.Value += $command }