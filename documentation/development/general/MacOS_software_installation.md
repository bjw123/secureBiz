---
title: "MacOS software installation"
author: ajcunningham
date: 1/12/2020
output:
  word_document:
    highlight: "tango"
---

# MacOS software installation

The [Homebrew](https://brew.sh/) package manager is used to manage software needed for the project.

MacOS Catalina replaced the Bash shell with Z Shell. Example code below assumes Z Shell, but steps will work with Bash as well.

## Git

You can use [Sourcetree](https://www.sourcetreeapp.com/) or the Git command-line version to work with
the project’s [BitBucket repository](https://bitbucket-students.deakin.edu.au/projects/DCVENT-PG/repos/asd-essential-eight-cyber-mitigation-toolkit_2020t3/browse).

### Install Sourcetree

```zsh

brew install --cask sourcetree
```

Use the `Clone in Sourcetree` button in the Bitbucket [repository](https://bitbucket-students.deakin.edu.au/projects/DCVENT-PG/repos/asd-essential-eight-cyber-mitigation-toolkit_2020t3/browse).

### Install git

```zsh

brew install git
```

### Clone git repo

It is possible to use either HTMLS or [SSH](https://confluence.atlassian.com/bitbucketserver/ssh-user-keys-for-personal-use-776639793.html) to interact with the [repository](https://bitbucket-students.deakin.edu.au/projects/DCVENT-PG/repos/asd-essential-eight-cyber-mitigation-toolkit_2020t3/browse).

The following commands clone the repository into `~/dev/securebiz`.

#### SSH

```zsh

cd ~/dev/
git clone ssh://git@bitbucket-students.deakin.edu.au:7999/dcvent-pg/asd-essential-eight-cyber-mitigation-toolkit_2020t3.git securebiz
```

#### HTTPS

```zsh

cd ~/dev/
git clone https://bitbucket-students.deakin.edu.au/scm/dcvent-pg/asd-essential-eight-cyber-mitigation-toolkit_2020t3.git securebiz

```

#### Set user name and email

```zsh

git config user.name "Your_name"
git config user.email "Deakin_email_address"
```

## Node.js

You can install the latest Node.js available as a brew formula, or alternatively you can install Nodenv, which allows you to install and manage multiple versions of Node.js.

### Installing Node.js using Homebrew

```zsh

brew install node
```

## Install Nodenv

Alternatively use [Nodenv](https://github.com/nodenv/nodenv) to install and manage [Node.js](https://nodejs.org/en/) versions.

```zsh

brew install nodenv
```

Edit `~/.zshrc`, adding:

```zsh

if command -v nodenv 1>/dev/null 2>&1; then
  eval "$(nodenv init -)"
fi
```

Reload `~/.zshrc` and install the version of Node.js required.  

```zsh
# Reload .zshrc:
source ~/.zshrc
# list all available versions:
$ nodenv install -l
# Install latest LTS:
nodenv install 14.15.1
```

## MongoDB

The MongoDB developers provide their own [tap](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/).

```zsh

brew update
brew tap mongodb/brew
brew install mongodb-community@4.4
```

```txt

==> mongodb-community
To have launchd start mongodb/brew/mongodb-community now and restart at login:
  brew services start mongodb/brew/mongodb-community
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf
```

## NoSQLBooster

```zsh

brew cask install nosqlbooster-for-mongodb
```
