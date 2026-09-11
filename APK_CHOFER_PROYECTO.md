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

## Versiones y errores corregidos
### v1-v4
Las APK se construyeron en runners distintos de GitHub Actions y cada runner generó una clave debug diferente. Android bloqueaba las actualizaciones con el mensaje: **"No se instaló la app debido a un conflicto con un paquete"**.

### v5 - base actualizable
Desde v5 se usa una firma estable dentro de la rama `APK-CHOFER`. Para pasar desde v1-v4 a v5 fue necesario desinstalar una sola vez. Desde v5 en adelante se mantiene el mismo `applicationId`, la misma firma y se aumenta `versionCode`.

### v6 - GPS y vehículo dinámico
- La app solicita permiso de ubicación una sola vez al primer ingreso.
- En Carrera se comprueba el permiso existente sin volver a mostrar la solicitud del sistema si ya está concedido.
- Si el GPS está autorizado, la ubicación se inicia automáticamente al entrar a Carrera.
- El botón de autorización solo aparece si el permiso falta o fue retirado.
- El seguimiento en segundo plano solicita permisos solo la primera vez que se inicia una carrera.
- Tipo, color, modelo y placa se muestran en el encabezado.
- Ajustes tiene vista previa del vehículo.
- El color guardado se aplica al vehículo mostrado en el mapa mediante un marcador SVG dinámico.
- Modelo, color y placa se reflejan en Carrera después de guardar la configuración.

## Identificador Android
`com.controlchofer.app`

## Rama permanente
`APK-CHOFER`

## Regla para futuras versiones
- No cambiar `applicationId`.
- No cambiar la firma usada desde v5.
- Aumentar `versionCode` en cada compilación.
- Mantener la interfaz Android visualmente alineada con la versión web.
- Conservar GPS, cálculo de combustible, usuarios, vehículo, historial y reportes ya correctos.
- No volver a solicitar permisos Android si `checkPermissions()` indica que ya están concedidos.
- El color/modelo/placa del vehículo deben actualizar el encabezado, Ajustes y el marcador del mapa.

## Nota de firma
La firma estable actual es de pruebas para facilitar actualizaciones durante el desarrollo. Antes de publicación en Google Play debe sustituirse por una clave release privada y conservarse permanentemente.
