# Workflow for Encrypting and Decrypting Authentication Tokens

## Overview

This document outlines how to use [GnuPG](https://gnupg.org) to encrypt and decrypt the authentication tokens used in the Securebiz web application. [GnuPG](https://gnupg.org) is an implementation of the [OpenPGP](https://www.openpgp.org/) standard.

This guide covers how to install GPG and use the command-line tool to complete each step listed below. These steps can also be completed using the suggested GUI tools, but the full details are outside of the scope of this document.

## GPG workflow

### Step 1. Create new authentication tokens

At the start each trimester, the security admin creates a plain text document with new authentication tokens.

### Step 2. Installation instructions

**Windows** users are recommended to install _Gpg4Win_ ([https://www.gpg4win.org/get-gpg4win.html](https://www.gpg4win.org/get-gpg4win.html)). The software suite includes the command line GPG tool as well as a GUI tool that is explained in more detail below.

Most  **Linux** distributions may already include GPG. If not, use the following command to install the package.

For Ubuntu and derivatives:

```bash
sudo apt-get install pgp
```

After installing GPG, run the following command to ensure it has been installed correctly. This will also provide you with an overview of the features GPG includes.

```bash
gpg –help
```

Alternatively, there are a range of GPG tools that include a **GUI**.

For **Windows** users, _Gpg4Win_ includes Kleopatra. This GUI program is a certificate manager for OpenPGP. The official handbook contains detailed information about how to generate public and private keys, sign/encrypt files and decrypt files ([https://docs.kde.org/trunk5/en/pim/kleopatra/kleopatra.pdf](https://docs.kde.org/trunk5/en/pim/kleopatra/kleopatra.pdf)). Kleopatra can also be installed as a stand-alone program on **Linux** ([https://apps.kde.org/en/kleopatra](https://apps.kde.org/en/kleopatra)).

**Mac** users can install [GPG Suite](https://gpgtools.org/) (GPGTools) or [GnuPG for OS X](https://sourceforge.net/p/gpgosx/docu/Download/). _GPG Suite_ includes _GPG Keychain_, a GUI tool for managing keys.

### Step 3. Create public/private key pair

Each team member creates their own public/private key pair (RSA, 4096 bits) using their Deakin University email address. Set the expiration date based upon the individual student&#39;s expected last trimester in the project.

```bash
gpg --full-generate-key
```

GPG and OpenPGP use a pair of private and public keys. You keep your private key secure, never sharing it. You share your public key so that other people can encrypt a file or email using their private key and your public key, allowing you to decrypt the file or email when you receive it.
### Step 4. Share public key

You need to export your public key. You can use the key ID or any part of the user ID to identify the key.


```zsh
gpg --armor --export <KEYID> > your_name-pub.asc
```

or

```zsh
gpg --armor --export username@deakin.edu.au > your_name-pub.asc
```

The `--armor` flag means the file will be ASCII armored (denoted by the extension `.asc`) instead of a binary file (commonly denoted by the `.gpg` extension).

You can list all public keys to obtain the Key ID of your public key:

```zsh
gpg --list-keys
```

Each team member shares their public key in the documentation\application\_security\keys directory by committing it to Bitbucket. Security admin signs each team member&#39;s public key.

### Step 5. Encrypt and sign plain text document

Security admin uses each team member&#39;s public key to encrypt the plain text document, which they sign with their private key.

Encrypted files should be generated as ASCII armored files rather than as binary files.

To encrypt a file for more than one recipient:

```bash
gpg --recipient <user-id1> --recipient <user-id2> --recipient <user-id3> --encrypt --armor file_name
```

This will create a file `file_name.asc`.

Files should also be signed, using a detached signature.

```bash
gpg --detach-sign <filename>.asc
```

This will create a signature file `file_name.asc.sig`.

### Step 6. Commit encrypted document to Bitbucket

Security admin commits the encrypted document, which includes the security admin&#39;s digital signature.

### Step 7. Decrypt document

Each team member decrypts the encrypted document with their private key and verifies the document has not been modified by checking the digital signature. If the file is decrypted and saved, ensure it is saved outside the local repository to prevent it from being shared in a subsequent commit.

Firstly, verify the encrypted file:

```bash
gpg --verify file_name.asc.sig 
```

The generic form of the command is:

```bash
gpg --verify [signature-file] [encrypted-file]
```

To decrypt a file:

```bash
gpg --decrypt file_name.asc > ~/temp/file_name
```


## Notes on text editors and IDEs

Some text editors and IDEs have plugins or packages to provide integrated GnuPG support.

For instance:

* [gnupg.vim](https://www.vim.org/scripts/script.php?script_id=3645) plugin for vim and gvim.
* [GnuPG-Tool](https://github.com/heilingbrunner/vscode-gnupg-tool) for Visual Studio Code

These plugins allow you to preview and read a decrypted version of a file without saving the decrypted file.

## Working with multiple secret keys

Some squad members will already have GPG installed and have a secret key. GnuPG can have multiple secret keys, but will default to a specfic key when encrypting or signing files.

There are two approaches to working with multiple secret keys:

1. use the `--local-user <KEYID>` or `--local-user <name>` flags with the command
2. use the `--homedir <dir_path>` flag.

For option 2, it is necessary to copy all the files and directories in `~/.gnupg/` to another location, i.e. `/home/<username>/dev/securebiz/gpg/` on Linux or `/User/<username>/dev/securebiz/gpg/` on MacOS. The when using the `gpg` command add the `--homedir <dir_path>` flag. You can delete all non Deakin secret keys, and pare back the public keys to those needed. The Visual Studio Code, GnuPG-Tool package allows you to specify, in settings, the path to use for `gpg`.

To decrypt a file:

```bash
gpg --local-user <name> --decrypt encrypted_file_name > ~/temp/file_name
```

or

```bash
gpg --homedir <dir_path> --decrypt encrypted_file_name > ~/temp/file_name
```

N.B the repository `.gitignore` excludes the `gpg` directory and contents from tracking. Before committing and pushing for the first time after adding the `gpg/` directory, double-check that the `gpg/` directory remains untracked.

