#!/usr/bin/env bash

curl https://rsms.me/inter/inter.css --output ../

# Find all woff2 files
#
curl --silent https://rsms.me/inter/inter.css | grep src --color=never | sed -E 's/.*(font-files.*\.woff2).*/https:\/\/rsms.me\/inter\/\1/' | xargs -n 1 wget
