Estoy reescribiendo la aplicación desde cero en Lua en este repositorio: https://github.com/samuel-gf/gea

Esta aplicación
crea un tablero al que se conectan varios jugadores, cada uno con su propio dispositivo, aunque
también pueden ser dispositivos compartidos. Mi idea es que funcione tanto en *PC* como en *tablet*
y en *móvil* sin tener que instalar ninguna aplicación especial y que ademaś pueda funcionar razonablemente
bien en dispositivos antiguos.

Cada jugador podrá mover sus fichas o *tokens* desde su dispositivo y todos los demás jugadores
del juego de mesa podrán ver el movimiento.

## Características actuales de la aplicación

- Tablero de juego compartido
- Cada jugador puede hacer movimientos que los demás jugadores podrán ver en pantalla
- Comandos de texto para controlar los movimientos de las fichas
- Juego controlado enteramente por el servidor, de tal manera que si un jugador se desconecta
y se conecta de nuevo más tarde no exista problema en el funcionamiento normal del juego
- Cada ficha o *token* puede tener asociado un borde de color que permite asociarlo con un determinado
jugador o bien con un determinado estado

## Mejoras para la siguiente versión

- Mejora de usabilidad en pantallas pequeñas: Sin lugar a dudas, esta es una de sus mayores carencias ahora mismo
- Mostrar los resultados del lanzamiento de dados
- Interfaz más visual y menos texto
- Identificación de los usuarios con *login* y *password*
- *Log* o registro de acciones que llevan a cabo los jugadores durante la partida para poder consultar en cualquier momento
- Reorganizar el código según vaya haciéndose más grande el proyecto
