---
title: "Git Workflow"
author: ajcunningham
date: 1/12/2020
output:
  word_document:
    highlight: "tango"
---

# Git workflow overview

Using a [Git feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow):

1. Make sure you are on `master` branch, fetch and merge. If [merge conflicts](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts) arise, resolve conflicts, then add and commit changes.

```zsh

git checkout master
git fetch
# git fetch --all
git merge
```

2. Create and checkout new branch to work on.

```zsh

git checkout -b Name_TrelloTaskName
```

3. Fix or work on the new feature locally and then add, commit, and push your changes to the remote branch.

```zsh

git add -p
git commit
# It's ideal that you run git rebase -i origin/master or
# git rebase -i master (if your master branch is up-to-date
# with the remote master) before you creating the PR request,
# so it'll be always fast-forward, would be less confusion on
#the possible conflicts that
# needed to address later.

# If you are pushing to a new branch for the first time use:
git push --set-upstream origin Name_TrelloTaskName
# otherwise use git push origin
```

4. Create a pull request in Bitbucket and add a reviewer (the rule of thumb is: at least one reviewer for a simple fix or new functionality and at least 2 reviewers for a major fix or new feature).

5. Reviewer(s) review the code and approve.

6. Developer merges code to the Master branch.

7. Remove merged branch from local repository and BitBucket.

```zsh

# checkout master branch
git checkout master
# delete branch locally
git branch -d Name_TrelloTaskName
# delete branch remotely
git push origin --delete Name_TrelloTaskName
```

8. Trello board task is updated to complete.

N.B. _Ensure that your name and email address are correctly set in your local repository. These details will be carried over into the Bitbucket repository_

```zsh
git config user.name "FIRST_NAME LAST_NAME"
git config user.email "MY_NAME@deakin.edu.au"
```

## Commit messages

Please refer to the following commit message guidelines:

* [A guide on commit messages](https://yvonnickfrin.dev/a-guide-on-commit-messages)
* [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)

The seven rules of a great Git commit message<sup>[1](https://chris.beams.io/posts/git-commit/#seven-rules)</sup>:

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

## Reviewing Pull Requests

Please read the following resources to familiarize yourself with code reviews:

### Pull Requests and Code Review on BitBucket

* [Use pull requests for code review](https://support.atlassian.com/bitbucket-cloud/docs/use-pull-requests-for-code-review/)
* [Reviewing a pull request](https://confluence.atlassian.com/bitbucketserver/reviewing-a-pull-request-808488540.html)
* [Review code in a pull request](https://support.atlassian.com/bitbucket-cloud/docs/review-code-in-a-pull-request/)

### About Code Reviews

* [What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
* [9 Code Review Best Practices](https://www.perforce.com/blog/qac/9-best-practices-for-code-review)

### Node.js Examples and Best practices

* [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices)
* [Node.js Express.js Project Examples](https://github.com/gothinkster/node-express-realworld-example-app)