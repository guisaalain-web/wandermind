# FitBattle Gym 🏋️‍♂️

**Aplicación Gamificada de Entrenamiento**

FitBattle Gym es una aplicación web que combina ejercicio físico con mecánicas de videojuegos para motivar a los usuarios. El sistema gestiona usuarios, sesiones de entrenamiento, ejercicios, puntos, niveles y logros en una base de datos completa y normalizada.

## 🎯 Características Principales

- **Gestión de Usuarios**: Registro completo con perfil, foto y bono activo
- **Sesiones de Entrenamiento**: Registro detallado de cada sesión con fecha, duración y calorías
- **Catálogo de Ejercicios**: Base de datos con ejercicios, tipo, músculo principal y videos tutoriales
- **Sistema de Puntos**: Acumulación de puntos según el rendimiento
- **Niveles**: Sistema de progresión basado en puntos acumulados
- **Logros**: Sistema de recompensas por cumplir metas
- **Historial Completo**: Consulta de todas las sesiones y progreso del usuario

## 📊 Modelo de Datos

El sistema utiliza un modelo de base de datos normalizado (3FN) con las siguientes entidades:

- **USUARIO**: Información personal y perfil del usuario
- **SESION_ENTRENAMIENTO**: Registro de cada sesión de entrenamiento
- **EJERCICIO**: Catálogo de ejercicios disponibles
- **SESION_EJERCICIO**: Ejercicios realizados en cada sesión
- **NIVEL**: Sistema de niveles con puntos mínimos
- **LOGRO**: Logros disponibles para desbloquear
- **USUARIO_LOGRO**: Relación usuario-logro con fecha de obtención

## 🚀 Instalación y Uso

1. Descarga o clona este repositorio
2. Abre `index.html` en tu navegador web
3. No requiere servidor - funciona completamente en el navegador usando localStorage

## 📁 Estructura del Proyecto

```
FitBattle-Gym/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos de la aplicación
├── js/
│   ├── database.js         # Gestión de base de datos (localStorage)
│   ├── models.js           # Modelos de datos
│   ├── app.js              # Lógica principal de la aplicación
│   └── gamification.js     # Sistema de gamificación
├── assets/
│   └── images/             # Imágenes y recursos
└── README.md               # Este archivo
```

## 🎮 Funcionalidades

### Para Usuarios:
- Registro y perfil personalizado
- Registro de sesiones de entrenamiento
- Selección de ejercicios del catálogo
- Visualización de puntos y nivel actual
- Consulta de logros desbloqueados
- Historial completo de entrenamientos

### Para Entrenadores:
- Visualización de todos los usuarios
- Seguimiento del progreso de cada usuario
- Consulta de estadísticas y métricas

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (con diseño moderno y responsive)
- JavaScript (ES6+)
- LocalStorage para persistencia de datos
- No requiere frameworks externos

## 📝 Notas de Desarrollo

Esta aplicación está diseñada como proyecto educativo y demuestra:
- Diseño de base de datos normalizada (3FN)
- Modelo Entidad-Relación bien estructurado
- Gestión de datos complejos en JavaScript
- Interfaz de usuario intuitiva y atractiva
- Sistema de gamificación funcional

## 👨‍💻 Autor

Proyecto desarrollado para [nombre de la asignatura/profesor]

## 📄 Licencia

Proyecto educativo - Uso académico

