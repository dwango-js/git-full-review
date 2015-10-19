#!/usr/bin/env node
require('shelljs/global');

function fail(message){
    console.error(message);
    exit(1);
}
if (!which('git')) {
    fail('Sorry, this script requires git');
}
var currentBranchName=exec("git rev-parse --abbrev-ref HEAD");
// review branch
if(exec("git checkout --orphan review").code !== 0){
    fail("fail to checkout --oorphan");
}
//  remove under the git
var fileUnderGit = exec("git ls-files").output.split("\n").filter(function(filePath){
    return filePath.length > 0;
});
fileUnderGit.forEach(function (filePath) {
    //  remove files
    exec("git rm --cached " + filePath);
});
// clean
exec("git clean -fxd");
//  create start point
exec('git commit --allow-empty -m "Start of the review"');
//  create empty branch
exec('git branch empty');
//  merge review point
//  merge with prev branch(= probably master)
exec('git merge "' + currentBranchName + '"');
//  push to origin
exec("git push origin review");
exec("git push origin empty");
