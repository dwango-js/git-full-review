# git-full-review

Git full code review command line tool.

What is full code review?

- [How to conduct a full code review on GitHub](http://astrofrog.github.io/blog/2013/04/10/how-to-conduct-a-full-code-review-on-github/ "How to conduct a full code review on GitHub")

## Installation

    npm install -g git-full-review

Work on OS X, Linux, Windows.

## Usage

    $ git-full-review
    # open https://github.com/<user>/<repo>/compare/empty...review?expand=1
    # create pull request

Workflow:

```sh
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
# open https://<domain>/<user>/<repo>/compare/empty...review?expand=1
```

See [shell script POC](./shell)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT