# Changelog Gea
## Ideas
- Iniciativa automática: Reordena la lista de retratos que hay a la derecha
- Modos de combate: carga, defensiva...

## Versiones

1.57	Añadido el tablero del alquimista
1.56	Cambio de tablero automático
1.55	Luces con antorchas que portan los PJs
1.54	Luces avanzadas cuyas fuentes se sacan de una tabla de la base de datos
1.53	Permite dos tableros
1.52	Inventario
1.51	Panel de control de master
1.50	Mejoras
1.49	Luz dinámica
1.48	Añadido Gac0 a la ficha y elimina correctamente tokens del tablero
1.45	Output en servidor correcto con ñ y tilde
1.44	Modo defensivo
1.43	Se puede realizar una carga desde la ficha de personaje
1.42	Tabla *mods* que guardan el *status* del personaje
1.41	Turno 0 que no limita el movimiento
1.40	Chequeo de características
1.39	La ficha de personaje depende del sistema de juego empleado
1.38	Permite chequeos de caraacteristicas
1.37	Cuando un token realiza una acción su icono de guideline cambia de color
1.36	Resuelto problema al mover token grande a una casilla ocupada por sí mismo
1.35	Turnos limitan el movimiento y el ataque
1.34	PanelD generado por javascript
1.33	Resuelto problema de carga de fondo
1.32	Interface muestra icono de acción de combate sobre enemigo
1.31	BUG que permite mover a través de un enemigo
1.30	Resuelto problema que no movía los tokens por el path correctamente
1.29	En lugar de llamrlo *dice* para a llamarse *output*
1.28	Aplica penalizaciones al disparar a distancia cuando el objetivo tiene cobertura
1.27	Tokens no pueden pasar sobre enemigos aunque estos sean invisibles
1.26	El movimiento está controlado por una clase de Javascript
1.25	Indica los pasos dados en el camino
1.24	Desplazamiento de tokens por esquinas
1.23	Cuando un token se mueve se ve una línea del camino trazado antes de desplazarse
1.22	Impide mover tokens por zonas imposibles (atravesar paredes)
1.21	Resuelto problema que hacía parpadear tokens PNJ
1.20	Guidelines para la ficha generados en el servidor
1.19	Cambio de fondo gradual y suave y nuevos iconos SVG
1.18	Nueva tabla de la base de datos para guardar las animaciones
1.17	Animaciones en su propio archivo .js
1.16	Proyectil mágico, primer hechizo implementado
1.15	Los bonus del guideline están incluidos en la línea de comando guideline
1.14	Los tokens muestran el icono del guideline seleccionado
1.13	Los tokens pueden ser importados en un escenario con un defaultGuideline
1.12	Resuelto BUG al mostrar la ficha de personaje, los tokens del tablero aún pueden ser seleccionados
1.11	Los tokens muestran el guideline por defecto
1.10	Los PJs deben seleccionar el guideline a utilizar por anticipado
1.09	El explorador tiene +2 al atacar a pieles verde a distancia
1.08	El explorador tiene +2 al atacar a pieles verdes en cuerpo a cuerpo
1.07	Simplificar _guidelines_ de _lmde_
1.06	Fichas de personaje mejoradas
1.05	Las fichas muestran los datos dinámicos
		Las fichas tienen campos dinámicos: _t:name_ representa el Nombre del token, mientras que
		_a:hp_ representa el Atributo hp, por otra parte _g:name:1_ representa el nombre del
		guideline numerado como 1
1.04	Las armas de distancia pierden efectividad con la distancia
1.03	Escenario de la caravana completo
1.02	Cargador de tokens en la base de datos
1.01	Los *guidelines* se leen y se ejecutan en el servidor, no en el cliente
		guideline: fattack r1 a1d20+5 d1d12+2	(Function Range1, Attack 1d20+5, Damage1d12+2)
		sendCommand: gNumberOfGuideline
1.0 	Primera versión testeada a principios de abril de 2020 con Rafael Alonso y José Fernández
