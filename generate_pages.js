const fs = require('fs');
const path = require('path');

// Template is the current index.html
const templatePath = path.join(__dirname, 'index.html');
let template = fs.readFileSync(templatePath, 'utf8');

// Cities to generate pages for
const cities = [
    {
        slug: 'madrid',
        name: 'Madrid',
        country: 'España',
        title: 'Rutas Turísticas en Madrid | WanderMind',
        description: 'Descubre Madrid con rutas personalizadas por IA. Visita el Palacio Real, el Retiro y museos ocultos con nuestra guía inteligente.',
        h1: 'Descubre Madrid<br>a tu manera'
    },
    {
        slug: 'barcelona',
        name: 'Barcelona',
        country: 'España',
        title: 'Guía de Viaje Barcelona | WanderMind',
        description: 'Planifica tu viaje a Barcelona. Rutas por la Sagrada Familia, Parque Güell y el Barrio Gótico optimizadas para ti.',
        h1: 'Explora Barcelona<br>sin límites'
    },
    {
        slug: 'paris',
        name: 'París',
        country: 'Francia',
        title: 'Rutas por París y la Torre Eiffel | WanderMind',
        description: 'La mejor guía de París. Itinerarios románticos, culturales y gastronómicos creados por inteligencia artificial.',
        h1: 'Enamórate de París<br>con rutas únicas'
    },
    {
        slug: 'london',
        name: 'Londres',
        country: 'Reino Unido',
        title: 'Qué ver en Londres | Itinerarios WanderMind',
        description: 'Descubre el Londres alternativo y clásico. Camden, Big Ben y museos gratis en una ruta perfecta para ti.',
        h1: 'Vive Londres<br>como un local'
    },
    {
        slug: 'rome',
        name: 'Roma',
        country: 'Italia',
        title: 'Rutas Históricas en Roma | WanderMind',
        description: 'Camina por la historia en Roma. Coliseo, Vaticano y Trastevere en un itinerario inteligente paso a paso.',
        h1: 'Descubre la Roma<br>eterna'
    },
    {
        slug: 'tokyo',
        name: 'Tokio',
        country: 'Japón',
        title: 'Guía de Tokio y Rutas Geek | WanderMind',
        description: 'Explora Tokio, desde Akihabara hasta templos antiguos. La guía definitiva para tu viaje a Japón.',
        h1: 'Siente la energía<br>de Tokio'
    },
    {
        slug: 'new-york',
        name: 'Nueva York',
        country: 'Estados Unidos',
        title: 'Rutas por Nueva York y Manhattan | WanderMind',
        description: 'La ciudad que nunca duerme te espera. Rutas por Central Park, Times Square y Brooklyn a tu medida.',
        h1: 'Conquista Nueva York<br>paso a paso'
    }
];

cities.forEach(city => {
    let content = template;

    // Replace Title
    content = content.replace(/<title>.*<\/title>/, `<title>${city.title}</title>`);

    // Replace Meta Title
    content = content.replace(/<meta name="title" content=".*">/, `<meta name="title" content="${city.title}">`);

    // Replace Meta Description
    content = content.replace(/<meta name="description"\s+content=".*">/, `<meta name="description" content="${city.description}">`);

    // Replace OG Title & Description
    content = content.replace(/<meta property="og:title" content=".*">/, `<meta property="og:title" content="${city.title}">`);
    content = content.replace(/<meta property="og:description"\s+content=".*">/, `<meta property="og:description" content="${city.description}">`);

    // Replace Canonical URL
    content = content.replace(/<link rel="canonical" href=".*">/, `<link rel="canonical" href="https://guisaalain-web.github.io/wandermind/${city.slug}.html">`);

    // Replace H1 (Hero Title)
    // Looking for <h1 class="hero-title">...</h1>
    content = content.replace(
        /<h1 class="hero-title">[\s\S]*?<\/h1>/,
        `<h1 class="hero-title"><span class="gradient-text">${city.h1}</span></h1>`
    );

    // Inject a small script to auto-select the city on load
    const autoSelectScript = `
    <script>
        window.addEventListener('DOMContentLoaded', () => {
            // Wait for app to initialize
            setTimeout(() => {
                if (window.app && window.app.cityMgr) {
                    // Simulate city selection
                    const cityData = { name: "${city.name}", country: "${city.country}", lat: 0, lng: 0 }; // Lat/Lng will be fetched by API if 0
                    // We trigger the search to get real coords
                    window.app.cityMgr.searchCities("${city.name}").then(results => {
                        if (results && results.length > 0) {
                            window.app.selectCity(results[0]);
                        }
                    });
                }
            }, 1000);
        });
    </script>
    </body>`;

    content = content.replace('</body>', autoSelectScript);

    const outputPath = path.join(__dirname, `${city.slug}.html`);
    fs.writeFileSync(outputPath, content);
    console.log(`Generated ${city.slug}.html`);
});

console.log('All city pages generated successfully!');
