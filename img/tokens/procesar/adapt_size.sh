#!/bin/bash
if [ -n "$1" ]; then
	#mogrify -format png *.jpg
	mogrify -resize $1x$1 -gravity center -extent $1x$1 *.jpg
else
	echo "Uso: $0 size_in_pixels"
fi
