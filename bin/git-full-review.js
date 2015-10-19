#!/usr/bin/env node
require('shelljs/global');

function fail(message) {
    console.error(message);
    exit(1);
}
if (!which('git')) {
    fail('Sorry, this script requires git');
}
// create empty...review
var emptyBranchName = "empty";
var reviewBranchName = "review";

var currentBranchName = exec("git rev-parse --abbrev-ref HEAD").output.trim();
if (typeof currentBranchName !== "string" || currentBranchName.length === 0) {
    fail("currentBranch is undefined");
}
// review branch
if (exec("git checkout --orphan " + reviewBranchName).code !== 0) {
    fail("fail to checkout --oorphan");
}
//  remove under the git
var filesUnderGit = exec("git ls-files").output.split("\n").filter(function (filePath) {
    return filePath.length > 0;
});
filesUnderGit.forEach(function (filePath) {
    //  remove files
    exec("git rm --cached " + filePath);
});
// clean
exec("git clean -fxd");
//  create start point
exec('git commit --allow-empty -m "Start of the review"');
//  create empty branch
exec('git branch ' + emptyBranchName);
//  merge review point
//  merge with prev branch(= probably master)
exec('git merge "' + currentBranchName + '"');
//  push to origin
exec("git push origin " + reviewBranchName);
exec("git push origin " + emptyBranchName);
// Open like https://github.com/azu/sandbox-review/compare/empty...review?expand=1
echo("Open https://<domain>/<user>/<repo>/compare/empty...review?expand=1");