# Installing Visual Studio Code, VSCodium, or Atom

## VSCodium

To install VSCodium on MacOS:

```zsh

brew update
brew cask install vscodium
```

For Windows, use an [installer](https://github.com/VSCodium/vscodium/releases), or use [Chocolatey](https://chocolatey.org/):

```zsh

choco install vscodium
```

Alternatively, for Windows you can use the Windows Package Manager (winget) or [Scoop](https://scoop.sh/).

For Debian or Ubuntu based distros:

```zsh

wget -qO - https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg | gpg --d
echo 'deb https://paulcarroty.gitlab.io/vscodium-deb-rpm-repo/debs/ vscodium main' | sudo tee --append /etc/apt/sources.list.d/vscodium.list
sudo apt update && sudo apt install codium
```

## Visual Studio Code

For MacOS:

```zsh

brew update
brew install --cask visual-studio-code
```

For Windows, use the [installer](https://code.visualstudio.com/Download) or use [Chocolatey](https://chocolatey.org/):


```zsh

choco install vscode
```

For Ubuntu based distros, use [Snap](https://snapcraft.io/):

```zsh

sudo apt install snapd
sudo snap install code --classic
```

## Atom

For MacOS:

```zsh

brew install --cask atom
```

For Windows, use the [installer](https://github.com/atom/atom/releases/tag/v1.53.0) or use [Chocolatey](https://chocolatey.org/):

```zsh

choco install atom
```

For Ubuntu based distros, use [Snap](https://snapcraft.io/):

```zsh

sudo apt install snapd
sudo snap install atom --classic
```

