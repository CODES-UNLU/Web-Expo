# 🌟 Expo UNLu Web - Stand Virtual de Sistemas

Sitio web interactivo desarrollado por **CODES++** (Centro de Estudiantes de Sistemas) para representar el stand virtual de la **Licenciatura en Sistemas de Información** durante la **Expo UNLu 2025**.

## 📌 Descripción

Este proyecto ofrece una experiencia digital completa e interactiva para estudiantes de secundaria y público interesado en conocer la carrera de **Licenciatura en Sistemas de Información** de la **Universidad Nacional de Luján (UNLu)**. El sitio combina información educativa con actividades gamificadas para crear un engagement significativo.

## 🧩 Tecnologías Utilizadas

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Diseño moderno con gradientes, animaciones y responsive design
- **JavaScript Vanilla** - Interactividad y lógica de aplicaciones
- **Font Awesome** - Iconografía consistente
- **Google Fonts (Inter)** - Tipografía moderna y legible

## 🎯 Características Principales

### 🎨 Diseño y UX
- **Diseño moderno** con gradientes y efectos glassmorphism
- **Totalmente responsive** para dispositivos móviles y desktop
- **Navegación intuitiva** con menú hamburguesa para móviles
- **Animaciones suaves** y efectos de hover
- **Accesibilidad** con etiquetas ARIA y navegación por teclado

### 🎮 Actividades Interactivas

#### 1. **Test Vocacional "¿Qué carrera va con vos?"** (`test.html`)
- **10 preguntas aleatorizadas** sobre preferencias tecnológicas
- **Comparación entre Sistemas y Ciencia de Datos**
- **Algoritmo de scoring** con porcentajes de afinidad
- **Resultados visuales** con emojis y corazones
- **Duración estimada**: 3 minutos

#### 2. **UNLuWords - Juego Interactivo** (`juego.html`)
- **Juego tipo Wordle** con 3 niveles de dificultad (4, 5 y 6 letras)
- **Palabras temáticas** relacionadas con tecnología y programación
- **Sistema de pistas visuales**: verde (correcto), amarillo (presente), gris (ausente)
- **6 intentos por nivel** con contador visual
- **Sorteo especial** para los 10 mejores tiempos
- **Recolección de emails** para participación en premios

### 📚 Contenido Informativo

#### 3. **Preguntas Frecuentes** (`faq.html`)
- **8 preguntas comunes** sobre ingreso a la UNLu
- **Información sobre inscripción** y documentación requerida
- **Detalles sobre gratuidad** y ubicación
- **Información de transporte** y horarios

#### 4. **Explorá la Expo UNLu** (`explora.html`)
- **5 charlas informativas** de diferentes carreras
- **Horarios y ubicaciones** detallados
- **Información sobre gratuidad** y acceso público
- **Diseño en grilla** con iconos temáticos

## 🏗️ Estructura del Proyecto

```
Web-Expo/
├── index.html          # Página principal con navegación
├── test.html          # Test vocacional interactivo
├── test.js            # Lógica del test vocacional
├── juego.html         # Juego UNLuWords
├── juego.js           # Lógica del juego
├── faq.html           # Preguntas frecuentes
├── explora.html       # Charlas informativas
├── styles.css         # Estilos principales
├── LogoCodes.png      # Logo del Centro de Estudiantes
├── logoLSIUNLu.svg    # Logo de la carrera
├── LogoUNLu.png       # Logo de la universidad
└── README.md          # Documentación del proyecto
```

## 🎮 Funcionalidades Detalladas

### Test Vocacional
- **Preguntas dinámicas**: Se presentan en orden aleatorio
- **Opciones múltiples**: 4 opciones por pregunta con iconos
- **Sistema de puntuación**: 
  - Sistemas: +1 punto
  - Datos: +1 punto  
  - Ambos: +0.5 puntos cada uno
  - Ninguno: Sin puntuación
- **Resultados personalizados**: Porcentajes y recomendaciones

### Juego UNLuWords
- **3 niveles progresivos**: 4, 5 y 6 letras
- **Palabras temáticas**: code, dato, email, python, docker, etc.
- **Validación en tiempo real**: Feedback inmediato
- **Sistema de intentos**: 6 oportunidades por nivel
- **Animaciones**: Efectos de shake, flash y confeti
- **Recolección de datos**: Email para sorteo

## 🎨 Elementos de Diseño

### Paleta de Colores
- **Primario**: Gradiente `#667eea` a `#764ba2`
- **Secundario**: Variaciones de grises y blancos
- **Acentos**: Verde (`#48bb78`), Amarillo (`#ed8936`), Gris (`#a0aec0`)

### Tipografía
- **Principal**: Inter (Google Fonts)
- **Pesos**: 400, 500, 600, 700, 800
- **Jerarquía**: Títulos grandes, texto legible

### Efectos Visuales
- **Glassmorphism**: Fondos translúcidos con blur
- **Gradientes**: Fondos y botones con gradientes
- **Sombras**: Efectos de profundidad
- **Animaciones**: Transiciones suaves y efectos hover

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px
- **Tablet**: 600px - 768px  
- **Mobile**: < 600px

### Adaptaciones Móviles
- **Menú hamburguesa** para navegación
- **Grids flexibles** que se adaptan
- **Botones táctiles** optimizados
- **Texto escalable** para legibilidad

## 🎯 Objetivos del Sitio

### Educativos
- **Informar** sobre la carrera de Sistemas
- **Orientar** vocacionalmente a estudiantes
- **Mostrar** las posibilidades de la tecnología

### Interactivos
- **Engagement** a través de gamificación
- **Participación** en actividades
- **Recolección** de datos para seguimiento

### Institucionales
- **Promocionar** la UNLu y la carrera
- **Conectar** con futuros estudiantes
- **Fortalecer** la presencia digital del CODES++

## 🔧 Características Técnicas

### Performance
- **Carga rápida**: Sin dependencias pesadas
- **Optimización**: CSS y JS minificados
- **Caché**: Recursos estáticos optimizados

### SEO
- **Meta tags** completos para cada página
- **Open Graph** para redes sociales
- **Estructura semántica** HTML5
- **URLs descriptivas** y navegación clara

### Accesibilidad
- **Etiquetas ARIA** para lectores de pantalla
- **Navegación por teclado** completa
- **Contraste adecuado** en textos
- **Alt text** en imágenes

## 📞 Contacto y Enlaces

- **Email**: codes.unlu@gmail.com
- **Centro de Estudiantes**: [Web CODES++](https://codes-unlu.github.io/Web-Codes/)
- **Carrera**: [Sistemas UNLu](https://www.sistemas.unlu.edu.ar/)
- **Universidad**: [UNLu](https://www.unlu.edu.ar/)

## 🚀 Instalación y Uso

1. **Clonar** el repositorio
2. **Abrir** `index.html` en un navegador web
3. **Navegar** por las diferentes secciones
4. **Probar** las actividades interactivas

No se requieren dependencias adicionales ni configuración especial.

---

**Desarrollado con ❤️ por CODES++ - Centro de Estudiantes de Sistemas UNLu**

*Proyecto para la Expo UNLu 2025*

---

**Desarrollada por Federico Rizzo para CODES++ - Centro de Estudiantes de Sistemas UNLu**



