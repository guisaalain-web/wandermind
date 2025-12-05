# 📊 Modelo de Datos - FitBattle Gym

## Descripción General

FitBattle Gym utiliza un modelo de base de datos relacional normalizado en **Tercera Forma Normal (3FN)**. Este documento explica cada entidad, sus atributos y las relaciones entre ellas.

---

## 🗃️ Entidades del Sistema

### 1. USUARIO
Almacena la información personal de cada usuario del sistema.

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `idUsuario` | PK | Identificador único del usuario |
| `nombreCompleto` | Texto | Nombre completo del usuario |
| `email` | Hipervínculo/Texto | Correo electrónico |
| `telefono` | Texto | Número de teléfono |
| `fechaNacimiento` | Fecha/Hora | Fecha de nacimiento |
| `bonoActivo` | Sí/No (Booleano) | Indica si tiene bono activo |
| `fotoPerfil` | Archivo Adjunto/URL | Foto del usuario |
| `puntosTotales` | Número | Puntos acumulados |

---

### 2. SESION_ENTRENAMIENTO
Registra cada sesión de entrenamiento realizada por un usuario.

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `idSesion` | PK | Identificador único de la sesión |
| `idUsuario` | FK | Referencia al usuario |
| `fechaSesion` | Fecha/Hora | Fecha y hora de la sesión |
| `duracionMin` | Número | Duración en minutos |
| `calorias` | Número | Calorías quemadas |

---

### 3. EJERCICIO
Catálogo de ejercicios disponibles en el sistema.

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `idEjercicio` | PK | Identificador único del ejercicio |
| `nombreEjercicio` | Texto | Nombre del ejercicio |
| `tipo` | Texto | Tipo (Fuerza, Cardio, etc.) |
| `musculoPrincipal` | Texto | Músculo principal trabajado |
| `videoTutorial` | Hipervínculo | URL del video tutorial |

---

### 4. SESION_EJERCICIO (Tabla Intermedia)
Relaciona cada sesión con los ejercicios realizados, resolviendo la relación M:N.

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `idSesionEjercicio` | PK | Identificador único |
| `idSesion` | FK | Referencia a la sesión |
| `idEjercicio` | FK | Referencia al ejercicio |
| `repeticiones` | Número | Número de repeticiones |
| `pesoKg` | Número | Peso levantado en kg |
| `minutos` | Número | Minutos (para cardio) |

---

### 5. NIVEL
Define los niveles de progresión del sistema de gamificación.

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `idNivel` | PK | Identificador único del nivel |
| `nombreNivel` | Texto | Nombre del nivel |
| `puntosMinimos` | Número | Puntos requeridos |

---

### 6. LOGRO
Define los logros disponibles para desbloquear.

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `idLogro` | PK | Identificador único del logro |
| `nombreLogro` | Texto | Nombre del logro |
| `descripcion` | Texto | Descripción del logro |
| `icono` | Archivo Adjunto | Icono/emoji del logro |

---

### 7. USUARIO_LOGRO (Tabla Intermedia)
Registra qué logros ha obtenido cada usuario.

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `idUsuarioLogro` | PK | Identificador único |
| `idUsuario` | FK | Referencia al usuario |
| `idLogro` | FK | Referencia al logro |
| `fechaObtencion` | Fecha/Hora | Fecha de obtención |

---

## 🔗 Diagrama Entidad-Relación

```
                    ┌─────────────┐
                    │    NIVEL    │
                    ├─────────────┤
                    │ idNivel (PK)│
                    │ nombreNivel │
                    │ puntosMinimos│
                    └──────┬──────┘
                           │ 1
                           │
                           ▼ M
┌──────────────┐     ┌─────────────────┐     ┌──────────────────────┐
│    LOGRO     │     │     USUARIO     │     │ SESION_ENTRENAMIENTO │
├──────────────┤     ├─────────────────┤     ├──────────────────────┤
│ idLogro (PK) │     │ idUsuario (PK)  │     │ idSesion (PK)        │
│ nombreLogro  │     │ nombreCompleto  │◄────│ idUsuario (FK)       │
│ descripcion  │     │ email           │  1:M│ fechaSesion          │
│ icono        │     │ telefono        │     │ duracionMin          │
└──────┬───────┘     │ fechaNacimiento │     │ calorias             │
       │             │ bonoActivo      │     └──────────┬───────────┘
       │ M           │ fotoPerfil      │                │ 1
       │             │ puntosTotales   │                │
       ▼ M           └────────┬────────┘                ▼ M
┌────────────────┐            │              ┌─────────────────────┐
│ USUARIO_LOGRO  │            │              │   SESION_EJERCICIO  │
├────────────────┤            │              ├─────────────────────┤
│ idUsuarioLogro │◄───────────┘              │ idSesionEjercicio   │
│ idUsuario (FK) │         1:M               │ idSesion (FK)       │
│ idLogro (FK)   │                           │ idEjercicio (FK)    │◄──┐
│ fechaObtencion │                           │ repeticiones        │   │
└────────────────┘                           │ pesoKg              │   │ M
                                             │ minutos             │   │
                                             └─────────────────────┘   │
                                                                       │
                                             ┌─────────────────┐       │
                                             │    EJERCICIO    │       │
                                             ├─────────────────┤       │
                                             │ idEjercicio (PK)│───────┘
                                             │ nombreEjercicio │     1
                                             │ tipo            │
                                             │ musculoPrincipal│
                                             │ videoTutorial   │
                                             └─────────────────┘
```

---

## ✅ Justificación de la Normalización 3FN

### Primera Forma Normal (1FN)
- ✅ Todos los campos son **atómicos** (no hay listas o conjuntos)
- ✅ Cada tabla tiene una **clave primaria** única
- ✅ No hay **grupos repetitivos**

### Segunda Forma Normal (2FN)
- ✅ Cumple con 1FN
- ✅ Todos los atributos no clave dependen de **toda la clave primaria**
- ✅ En las tablas intermedias (SESION_EJERCICIO, USUARIO_LOGRO) no hay dependencias parciales

### Tercera Forma Normal (3FN)
- ✅ Cumple con 2FN
- ✅ No hay **dependencias transitivas**
- ✅ Ningún atributo no clave depende de otro atributo no clave

---

## 📈 Tipos de Datos Utilizados

| Tipo Access | Ejemplos en el Modelo |
|-------------|----------------------|
| **Texto** | nombreCompleto, email, tipo |
| **Número** | puntosTotales, repeticiones, pesoKg |
| **Fecha/Hora** | fechaNacimiento, fechaSesion |
| **Sí/No (Booleano)** | bonoActivo |
| **Hipervínculo** | email, videoTutorial |
| **Datos Adjuntos** | fotoPerfil, icono |

---

## 📊 Resumen

- **7 Entidades** en el modelo
- **+25 Atributos** en total
- **6 tipos de datos** diferentes
- **Modelo completamente normalizado** en 3FN
- **2 tablas intermedias** para resolver relaciones M:N
