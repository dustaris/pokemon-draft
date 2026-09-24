#!/bin/sh
# Builds the standalone GitHub Pages copy in docs/ from index.html (which is written for the Claude artifact wrapper).
set -e
cd "$(dirname "$0")/.."
mkdir -p docs
{
  printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
  printf '<meta name="description" content="Spin a region, draft a Pokémon for every role, sign a trainer and try to go 13-0 through the League. An unofficial fan game.">\n'
  printf '<style>html{color-scheme:light}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'
  cat index.html
  printf '\n</body>\n</html>\n'
} > docs/index.html
cp dex.js sprites.js docs/
touch docs/.nojekyll
