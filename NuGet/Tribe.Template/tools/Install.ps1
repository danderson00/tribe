param($installPath, $toolsPath, $package, $project)
# Open the readme
$project.DTE.ItemOperations.OpenFile("$installPath\Tribe.readme", [EnvDTE.Constants].vsViewKindTextView)
