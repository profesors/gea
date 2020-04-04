#!/bin/bash
if [ -n "$1" ]; then
	#mogrify -format png *.jpg
	#mogrify -resize $1x$1 -gravity center -extent $1x$1 *.png
	# Redimensiona a 128x128 y después se queda con un cuadrado de 128x128
	mogrify -resize $1 -gravity center -extent $1x$1 *.png
else
	echo "Uso: $0 size_in_pixels"
fi
