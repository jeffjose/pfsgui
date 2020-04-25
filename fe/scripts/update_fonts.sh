#!/usr/bin/env bash

curl https://rsms.me/inter/inter.css --output ../
#wget https://rsms.me/inter/font-files/Inter-roman.var.woff2
#wget https://rsms.me/inter/font-files/Inter-italic.var.woff2

# Find all woff2 files
#
curl --silent https://rsms.me/inter/inter.css | grep src --color=never | sed -E 's/.*(font-files.*\.woff2).*/https:\/\/rsms.me\/inter\/\1/'