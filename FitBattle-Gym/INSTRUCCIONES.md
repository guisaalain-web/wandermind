# Instrucciones para el Profesor

## Cómo usar la aplicación FitBattle Gym

### 1. Abrir la aplicación
- Simplemente abre el archivo `index.html` en cualquier navegador web moderno (Chrome, Firefox, Edge, etc.)
- No requiere instalación ni servidor web
- Funciona completamente offline usando localStorage del navegador

### 2. Primera vez - Datos de ejemplo
La aplicación incluye datos iniciales automáticos:
- **Niveles**: Sistema completo de 7 niveles (Principiante a Leyenda)
- **Logros**: 8 logros predefinidos con iconos
- **Ejercicios**: 6 ejercicios de ejemplo en el catálogo

### 3. Flujo de uso recomendado

1. **Crear Usuarios**:
   - Ir a la sección "Usuarios"
   - Click en "Nuevo Usuario"
   - Completar el formulario
   - La foto de perfil puede ser una URL de imagen o dejarse vacío

2. **Agregar Ejercicios** (opcional):
   - Si quieres más ejercicios, ve a "Ejercicios"
   - Click en "Nuevo Ejercicio"
   - Completa los datos incluyendo un enlace a video tutorial si tienes

3. **Registrar Sesión de Entrenamiento**:
   - Ve a "Entrenar"
   - Selecciona un usuario
   - Establece fecha, duración y calorías
   - Agrega ejercicios haciendo click en "Agregar Ejercicio"
   - Completa repeticiones, peso y/o minutos según el tipo
   - Guarda la sesión

4. **Ver Progreso**:
   - Ve a "Progreso"
   - Selecciona un usuario
   - Verás su nivel, puntos, logros desbloqueados e historial completo

### 4. Características del sistema

#### Modelo de Datos (3FN)
- **USUARIO**: Datos personales, foto, bono activo, puntos totales
- **SESION_ENTRENAMIENTO**: Fecha, duración, calorías
- **EJERCICIO**: Catálogo con nombre, tipo, músculo, video
- **SESION_EJERCICIO**: Tabla intermedia (repeticiones, peso, minutos)
- **NIVEL**: Sistema de niveles con puntos mínimos
- **LOGRO**: Logros disponibles
- **USUARIO_LOGRO**: Relación usuario-logro con fecha

#### Sistema de Gamificación
- **Puntos**: Se calculan automáticamente según:
  - Repeticiones realizadas
  - Peso levantado
  - Minutos de cardio
  - Calorías quemadas
  - Bonus por completar sesión

- **Niveles**: Los usuarios suben automáticamente según puntos acumulados

- **Logros**: Se desbloquean automáticamente al cumplir objetivos como:
  - Primera sesión
  - 5 sesiones completadas
  - 100kg levantados
  - 60 minutos de cardio
  - 5000 calorías quemadas
  - Alcanzar nivel Experto
  - 10000 puntos totales

### 5. Datos almacenados
- Todos los datos se guardan en **localStorage** del navegador
- Los datos persisten entre sesiones
- Para resetear: Abre la consola del navegador (F12) y ejecuta:
  ```javascript
  localStorage.clear();
  location.reload();
  ```

### 6. Estructura del proyecto
```
FitBattle-Gym/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos completos
├── js/
│   ├── models.js       # Modelos de datos
│   ├── database.js     # Gestión localStorage
│   ├── gamification.js # Sistema de puntos/niveles/logros
│   └── app.js          # Lógica principal
├── README.md           # Documentación del proyecto
└── .gitignore          # Para GitHub
```

### 7. Características técnicas demostradas
✅ Modelo de base de datos normalizado (3FN)
✅ 7 entidades bien definidas
✅ Más de 20 atributos totales
✅ Tipos de datos: texto, número, fecha/hora, sí/no, URL
✅ Relaciones uno-a-muchos correctamente implementadas
✅ Tablas intermedias para relaciones complejas
✅ Sistema de gamificación funcional
✅ Interfaz de usuario completa y responsive

### 8. Para subir a GitHub
1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos de la carpeta `FitBattle-Gym/`
3. El README.md ya está incluido con toda la documentación

### Contacto
Si tienes alguna pregunta sobre la implementación o el modelo de datos, revisa el código comentado en los archivos JavaScript.

