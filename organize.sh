#!/bin/bash

echo "開始整理 Downloads..."

mkdir -p sorted

mv ~/Downloads/*.png sorted/ 2>/dev/null
mv ~/Downloads/*.jpg sorted/ 2>/dev/null
mv ~/Downloads/*.pdf sorted/ 2>/dev/null

echo "整理完成"
