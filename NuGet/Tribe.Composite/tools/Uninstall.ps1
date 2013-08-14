param($installPath, $toolsPath, $package, $project)

$command = "`r`n`$(ProjectDir)Tools\PackScript.exe `"`$(ProjectDir)`""

$project.Properties | where { $_.Name -eq "PreBuildEvent" } | foreach { $_.Value = $_.Value.Replace($command, "") }