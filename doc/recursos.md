# Recursos proyecto Gea

- [Generador de texturas](https://cpetry.github.io/TextureGenerator-Online/)
- [Marcos redondos en Imagemagic](http://www.imagemagick.org/Usage/thumbnails/#rounded)
- [Ejemplo marco redondo](http://rubblewebs.co.uk/imagemagick/display_example.php?example=68)

Fuente de iconos:
- [Iconos](https://www.iemoji.com/)

## Herramientas

Cambiar el tamaño de las imágenes preservando aspecto y ratio pero dejándolas en un lienzo de 64x64
```bash
mogrify -resize 64x64 -gravity center -extent 64x64 *.png
```
