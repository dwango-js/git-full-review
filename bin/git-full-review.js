#!/usr/bin/env node
require('shelljs/global');

function fail(message) {
    console.error(message);
    exit(1);
}
if (!which('git')) {
    fail('Sorry, this script requires git command');
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
// merge review point
// merge with prev branch(= probably master)
// Git 2.9 require  --allow-unrelated-histories
// http://stackoverflow.com/questions/27641380/git-merge-commits-into-an-orphan-branch/36528527#36528527
exec('git merge --allow-unrelated-histories "' + currentBranchName + '"');
//  push to origin
exec("git push origin " + reviewBranchName);
exec("git push origin " + emptyBranchName);

// cleanup local
exec("git checkout " + currentBranchName);
exec("git branch -D " + reviewBranchName);
exec("git branch -D " + emptyBranchName);
// Open like https://github.com/azu/sandbox-review/compare/empty...review?expand=1
echo("=== Full Code Review");
echo("=== Preparation Completion\n");
echo("Open https://<domain>/<user>/<repo>/compare/empty...review?expand=1");