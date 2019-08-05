#!/bin/bash
# Cambia el tamaño de las imágenes preservando aspecto y ratio pero dejándolas en lienzo de 64x64
mogrify -resize 64x64 -gravity center -extent 64x64 *.png
#convert 001PC.png -alpha set \( +clone -distort DePolar 0 -virtual-pixel HorizontalTile -background None -distort Polar 0 \) -compose Dst_In -composite -trim +repage 001PC.png
#mogrify *.png -alpha set -background none -vignette  0x5
#convert -size 64x64 xc:PeachPuff -fill LightBlue -stroke black -strokewidth 10 -draw "circle 190,150 190,10" -transparent LightBlue mask.png #Crear máscara
