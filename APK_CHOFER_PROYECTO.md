# Proyecto APK CHOFER

Nombre funcional de la app: **Control del Chofer**.

## Objetivo
Aplicación Android y web para controlar ingresos, gastos, carreras, GPS y rentabilidad de un chofer que trabaja con Uber, inDrive, Expresos, Particular u otros servicios.

## Estructura actual
- Inicio de sesión por usuario y contraseña.
- Roles: chofer y administrador.
- Datos de vehículo por usuario: tipo, color, modelo y placa.
- Meta diaria.
- Carrera con valor a cobrar antes de iniciar.
- Peaje, otros gastos y otros cobros por carrera.
- Kilometraje del vehículo.
- Cálculo de combustible por rendimiento: ejemplo $30 / 600 km = $0.05/km.
- GPS real en Android.
- Vehículo mostrado sobre el mapa y seguimiento de ruta.
- Geolocalización en segundo plano durante carrera.
- Distancia, duración, velocidad, ingreso, costo y utilidad por carrera.
- Dashboard financiero.
- Mapa de actividad / mapa de calor.
- Ingresos vs. gastos.
- Ingresos por plataforma.
- Frecuencia por día y hora.
- Horas pico, mejores días, rutas frecuentes y últimos viajes.
- Ingresos/Gastos, Análisis, Reportes y Ajustes.

## Navegación Android
Se usa navegación superior con páginas independientes para evitar conflictos con la zona de gestos inferior de Android.

## Error de actualización corregido
Las APK v1-v4 se construyeron en runners distintos de GitHub Actions y cada runner generó una clave debug distinta. Android no permite actualizar una app si el mismo applicationId está firmado con otra clave y muestra: **"No se instaló la app debido a un conflicto con un paquete"**.

Desde **v5** el proyecto usa una clave de pruebas estable dentro de la rama `APK-CHOFER`. Por ello:
1. Para pasar desde v1-v4 a v5 hay que desinstalar una sola vez la versión anterior.
2. Instalar v5 como nueva base.
3. Desde v5 en adelante las futuras APK deben conservar el mismo `applicationId` y la misma firma de pruebas, y solo aumentar `versionCode`.

## Identificador Android
`com.controlchofer.app`

## Rama permanente
`APK-CHOFER`

## Regla para futuras versiones
- No cambiar applicationId.
- No cambiar la firma usada desde v5.
- Aumentar versionCode en cada compilación.
- Mantener la interfaz Android visualmente alineada con la versión web.
- Conservar GPS, cálculo de combustible, usuarios, vehículo, historial y reportes ya correctos.

## Nota de firma
La firma estable actual es de pruebas para facilitar actualizaciones durante el desarrollo. Antes de publicación en Google Play debe sustituirse por una clave release privada y conservarse permanentemente.
