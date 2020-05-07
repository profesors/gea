## Codificación de caractéres en el servidor

La función que controla la codificación de caractéres está en libController::setup_lang, en dicha
función hay dos líneas comentadas. Si las descomentas el servidor de gettext deja de funcionar.
Sospecho que hacer esto lo reinicia y entonces puedes hacer modificaciones y empieza a funcionar
correctamente.

Compureba por si acaso la codificación de las tablas de base de datos en el servidor
