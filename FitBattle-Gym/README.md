# 🏋️‍♂️ FitBattle Gym

**Aplicación Web Gamificada de Entrenamiento**

> *Transforma tu entrenamiento en una aventura épica con puntos, niveles y logros*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

---

## 📖 Descripción

FitBattle Gym es una aplicación web que combina **ejercicio físico** con **mecánicas de videojuegos** para motivar a los usuarios. El sistema:

- 📊 **Gestiona datos** de usuarios, sesiones y ejercicios
- 📈 **Registra métricas** detalladas (series, repeticiones, tiempo, peso)
- 🏆 **Recompensa el progreso** con puntos, niveles y logros
- 💾 **Almacena datos** en localStorage (no requiere servidor)

---

## ✨ Características

| Funcionalidad | Descripción |
|---------------|-------------|
| 👤 **Gestión de Usuarios** | CRUD completo con foto, email, teléfono y estado de bono |
| 📋 **Catálogo de Ejercicios** | Base de datos con videos tutoriales |
| 🏃 **Registro de Sesiones** | Fecha, duración, calorías y ejercicios realizados |
| ⭐ **Sistema de Puntos** | Puntos por repeticiones, peso levantado y cardio |
| 📊 **Niveles de Progresión** | 7 niveles desde Principiante hasta Leyenda |
| 🏅 **Sistema de Logros** | 8 logros desbloqueables por cumplir metas |

---

## 🗃️ Modelo de Base de Datos (3FN)

El sistema implementa **7 entidades** normalizadas en Tercera Forma Normal:

```
USUARIO ─────1:M────▶ SESION_ENTRENAMIENTO ─────1:M────▶ SESION_EJERCICIO
    │                                                          │
    │                                                          │
    └───1:M───▶ USUARIO_LOGRO ◀───M:1─── LOGRO                │ M:1
                                                               │
                                            EJERCICIO ◀────────┘
                                            
                NIVEL (asigna nivel por puntos)
```

📄 **Ver documentación completa:** [MODELO_DATOS.md](MODELO_DATOS.md)

---

## 🚀 Instalación y Uso

### Opción 1: Ejecución Local
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/FitBattle-Gym.git

# Abrir en el navegador
# Simplemente abre el archivo index.html
```

### Opción 2: Desde GitHub Pages
Visita: `https://tu-usuario.github.io/FitBattle-Gym`

> ⚠️ **Nota**: La aplicación usa localStorage, los datos se almacenan localmente en tu navegador.

---

## 📁 Estructura del Proyecto

```
FitBattle-Gym/
├── 📄 index.html            # Página principal
├── 📁 css/
│   └── styles.css           # Estilos de la aplicación
├── 📁 js/
│   ├── models.js            # Modelos de datos (entidades 3FN)
│   ├── database.js          # Gestión de localStorage (CRUD)
│   ├── gamification.js      # Sistema de puntos, niveles y logros
│   └── app.js               # Lógica principal de la UI
├── 📄 MODELO_DATOS.md       # Documentación del modelo de datos
├── 📄 README.md             # Este archivo
└── 📄 .gitignore
```

---

## 🎮 Sistema de Gamificación

### Niveles
| Nivel | Puntos Requeridos |
|-------|-------------------|
| 🌱 Principiante | 0 |
| 📚 Novato | 100 |
| 💪 Intermedio | 500 |
| 🔥 Avanzado | 1,000 |
| ⚡ Experto | 2,500 |
| 🎯 Maestro | 5,000 |
| 👑 Leyenda | 10,000 |

### Logros
- 🎯 **Primeros Pasos** - Completa tu primera sesión
- 🌟 **Aprendiz** - Completa 5 sesiones
- 💪 **Fuerza Bruta** - Levanta más de 100kg en total
- 🏃 **Resistencia** - Corre más de 60 minutos en total
- 🔥 **Persistente** - Entrena 10 días seguidos
- ⚡ **Quemador** - Quema más de 5000 calorías
- 👑 **Campeón** - Alcanza el nivel Experto
- 🏆 **Leyenda Viva** - Alcanza 10000 puntos

---

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con variables CSS
- **JavaScript ES6+** - Clases, módulos y async
- **LocalStorage API** - Persistencia de datos

---

## 📊 Tipos de Datos Implementados

| Tipo | Ejemplo en el Modelo |
|------|---------------------|
| Texto | nombreCompleto, email |
| Número | puntosTotales, calorias |
| Fecha/Hora | fechaNacimiento, fechaSesion |
| Sí/No | bonoActivo |
| Hipervínculo | videoTutorial |
| Datos Adjuntos | fotoPerfil, icono |

---

## 👨‍💻 Desarrollo

Este proyecto fue desarrollado como trabajo académico para demostrar:
- Diseño de bases de datos normalizadas (3FN)
- Modelo Entidad-Relación
- Implementación de aplicaciones web
- Sistemas de gamificación

---

## 📄 Licencia

Proyecto educativo - Uso académico

---

<p align="center">
  <strong>🏋️‍♂️ FitBattle Gym</strong><br>
  <em>¡Entrena, sube de nivel, conviértete en leyenda!</em>
</p>
