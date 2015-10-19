#!/bin/bash

currentBranchName=$(git rev-parse --abbrev-ref HEAD)
# review branch
git checkout --orphan review
## remove under the git
git ls-files | xargs git rm --cached
## remove files
git clean -fxd
# create start point
git commit --allow-empty -m "Start of the review"
# create empty branch
git branch empty
# merge review point
git merge "${currentBranchName}" # merge with prev branch(= probably master)
# push to origin
git push origin review
git push origin empty
