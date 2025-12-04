// Global Places database organized by city
const CITIES = {
    madrid: { name: "Madrid", country: "España", lat: 40.4168, lng: -3.7038, timezone: "Europe/Madrid", emoji: "🇪🇸" },
    paris: { name: "París", country: "Francia", lat: 48.8566, lng: 2.3522, timezone: "Europe/Paris", emoji: "🇫🇷" },
    london: { name: "Londres", country: "Reino Unido", lat: 51.5074, lng: -0.1278, timezone: "Europe/London", emoji: "🇬🇧" },
    rome: { name: "Roma", country: "Italia", lat: 41.9028, lng: 12.4964, timezone: "Europe/Rome", emoji: "🇮🇹" },
    tokyo: { name: "Tokio", country: "Japón", lat: 35.6762, lng: 139.6503, timezone: "Asia/Tokyo", emoji: "🇯🇵" },
    newyork: { name: "Nueva York", country: "Estados Unidos", lat: 40.7128, lng: -74.0060, timezone: "America/New_York", emoji: "🇺🇸" },
    barcelona: { name: "Barcelona", country: "España", lat: 41.3851, lng: 2.1734, timezone: "Europe/Madrid", emoji: "🇪🇸" },
    amsterdam: { name: "Ámsterdam", country: "Países Bajos", lat: 52.3676, lng: 4.9041, timezone: "Europe/Amsterdam", emoji: "🇳🇱" },
    berlin: { name: "Berlín", country: "Alemania", lat: 52.5200, lng: 13.4050, timezone: "Europe/Berlin", emoji: "🇩🇪" },
    bangkok: { name: "Bangkok", country: "Tailandia", lat: 13.7563, lng: 100.5018, timezone: "Asia/Bangkok", emoji: "🇹🇭" },
    dubai: { name: "Dubái", country: "EAU", lat: 25.2048, lng: 55.2708, timezone: "Asia/Dubai", emoji: "🇦🇪" },
    sydney: { name: "Sídney", country: "Australia", lat: -33.8688, lng: 151.2093, timezone: "Australia/Sydney", emoji: "🇦🇺" }
};

const PLACES = {
    madrid: [
        { id: 1, name: "Museo del Prado", category: "culture", tags: ["art", "culture", "history"], description: "Uno de los museos de arte más importantes del mundo con obras de Velázquez, Goya y El Greco.", lat: 40.4138, lng: -3.6921, hours: "10:00-20:00", rating: 4.8, price: "€€", duration: 180 },
        { id: 2, name: "Mercado de San Miguel", category: "food", tags: ["food", "local", "shopping"], description: "Mercado gourmet con tapas tradicionales y productos locales.", lat: 40.4153, lng: -3.7090, hours: "10:00-24:00", rating: 4.5, price: "€€", duration: 60 },
        { id: 3, name: "Parque del Retiro", category: "nature", tags: ["nature", "relaxed", "free"], description: "Pulmón verde de Madrid con jardines históricos y el Palacio de Cristal.", lat: 40.4153, lng: -3.6845, hours: "06:00-22:00", rating: 4.7, price: "€", duration: 120 },
        { id: 4, name: "Reina Sofía", category: "art", tags: ["art", "culture", "modern"], description: "Museo de arte contemporáneo que alberga el Guernica de Picasso.", lat: 40.4086, lng: -3.6943, hours: "10:00-21:00", rating: 4.6, price: "€€", duration: 150 },
        { id: 5, name: "Barrio de Malasaña", category: "local", tags: ["local", "nightlife", "shopping"], description: "Barrio bohemio con tiendas vintage y cafés artesanales.", lat: 40.4260, lng: -3.7044, hours: "24h", rating: 4.4, price: "€", duration: 90 },
        { id: 6, name: "Templo de Debod", category: "culture", tags: ["culture", "history", "free"], description: "Templo egipcio del siglo II a.C. con vistas al atardecer.", lat: 40.4241, lng: -3.7178, hours: "10:00-20:00", rating: 4.6, price: "€", duration: 45 }
    ],
    paris: [
        { id: 1, name: "Torre Eiffel", category: "culture", tags: ["culture", "history", "adventure"], description: "El monumento más icónico de París con vistas panorámicas de la ciudad.", lat: 48.8584, lng: 2.2945, hours: "09:00-24:00", rating: 4.7, price: "€€€", duration: 120 },
        { id: 2, name: "Museo del Louvre", category: "art", tags: ["art", "culture", "history"], description: "El museo más visitado del mundo con la Mona Lisa y miles de obras maestras.", lat: 48.8606, lng: 2.3376, hours: "09:00-18:00", rating: 4.8, price: "€€", duration: 240 },
        { id: 3, name: "Montmartre", category: "local", tags: ["local", "art", "culture"], description: "Barrio de artistas con el Sacré-Cœur y cafés bohemios.", lat: 48.8867, lng: 2.3431, hours: "24h", rating: 4.6, price: "€", duration: 150 },
        { id: 4, name: "Le Marais", category: "food", tags: ["food", "shopping", "local"], description: "Barrio histórico con galerías, boutiques y la mejor falafel de París.", lat: 48.8566, lng: 2.3622, hours: "10:00-22:00", rating: 4.5, price: "€€", duration: 120 },
        { id: 5, name: "Jardín de Luxemburgo", category: "nature", tags: ["nature", "relaxed", "free"], description: "Jardines elegantes perfectos para un picnic parisino.", lat: 48.8462, lng: 2.3372, hours: "07:30-21:00", rating: 4.7, price: "€", duration: 90 },
        { id: 6, name: "Canal Saint-Martin", category: "local", tags: ["local", "nature", "nightlife"], description: "Canal pintoresco con cafés y ambiente hipster.", lat: 48.8710, lng: 2.3655, hours: "24h", rating: 4.4, price: "€", duration: 60 }
    ],
    london: [
        { id: 1, name: "British Museum", category: "culture", tags: ["culture", "history", "free"], description: "Museo gratuito con tesoros de todo el mundo incluyendo la Piedra Rosetta.", lat: 51.5194, lng: -0.1270, hours: "10:00-17:00", rating: 4.8, price: "€", duration: 180 },
        { id: 2, name: "Borough Market", category: "food", tags: ["food", "local", "shopping"], description: "El mercado gastronómico más antiguo y vibrante de Londres.", lat: 51.5055, lng: -0.0910, hours: "10:00-17:00", rating: 4.6, price: "€€", duration: 90 },
        { id: 3, name: "Hyde Park", category: "nature", tags: ["nature", "relaxed", "free"], description: "El parque real más grande de Londres ideal para pasear.", lat: 51.5073, lng: -0.1657, hours: "05:00-24:00", rating: 4.7, price: "€", duration: 120 },
        { id: 4, name: "Tate Modern", category: "art", tags: ["art", "culture", "free"], description: "Arte moderno en una antigua central eléctrica junto al Támesis.", lat: 51.5076, lng: -0.0994, hours: "10:00-18:00", rating: 4.6, price: "€", duration: 150 },
        { id: 5, name: "Shoreditch", category: "nightlife", tags: ["nightlife", "art", "local"], description: "Barrio creativo con street art, bares underground y música en vivo.", lat: 51.5255, lng: -0.0790, hours: "24h", rating: 4.4, price: "€€", duration: 180 },
        { id: 6, name: "Camden Town", category: "shopping", tags: ["shopping", "local", "food"], description: "Mercados alternativos, comida internacional y cultura punk.", lat: 51.5390, lng: -0.1426, hours: "10:00-18:00", rating: 4.5, price: "€€", duration: 120 }
    ],
    rome: [
        { id: 1, name: "Coliseo", category: "culture", tags: ["culture", "history", "adventure"], description: "El anfiteatro más grande jamás construido, símbolo del Imperio Romano.", lat: 41.8902, lng: 12.4922, hours: "09:00-19:00", rating: 4.8, price: "€€", duration: 120 },
        { id: 2, name: "Trastevere", category: "food", tags: ["food", "local", "nightlife"], description: "Barrio auténtico con las mejores trattorias y ambiente nocturno.", lat: 41.8867, lng: 12.4692, hours: "24h", rating: 4.7, price: "€€", duration: 150 },
        { id: 3, name: "Villa Borghese", category: "nature", tags: ["nature", "art", "relaxed"], description: "Jardines con la galería Borghese y vistas a la ciudad.", lat: 41.9145, lng: 12.4858, hours: "07:00-21:00", rating: 4.6, price: "€", duration: 120 },
        { id: 4, name: "Museos Vaticanos", category: "art", tags: ["art", "culture", "history"], description: "Tesoros papales incluyendo la Capilla Sixtina de Miguel Ángel.", lat: 41.9065, lng: 12.4536, hours: "09:00-18:00", rating: 4.7, price: "€€€", duration: 240 },
        { id: 5, name: "Campo de' Fiori", category: "local", tags: ["local", "food", "shopping"], description: "Plaza con mercado matutino y vida nocturna animada.", lat: 41.8956, lng: 12.4722, hours: "07:00-02:00", rating: 4.4, price: "€€", duration: 60 },
        { id: 6, name: "Fontana di Trevi", category: "culture", tags: ["culture", "history", "free"], description: "La fuente barroca más famosa del mundo. Tira una moneda.", lat: 41.9009, lng: 12.4833, hours: "24h", rating: 4.6, price: "€", duration: 30 }
    ],
    tokyo: [
        { id: 1, name: "Templo Senso-ji", category: "culture", tags: ["culture", "history", "shopping"], description: "El templo budista más antiguo de Tokio con mercado tradicional.", lat: 35.7148, lng: 139.7967, hours: "06:00-17:00", rating: 4.7, price: "€", duration: 90 },
        { id: 2, name: "Mercado de Tsukiji", category: "food", tags: ["food", "local", "culture"], description: "El mercado de pescado más famoso con el mejor sushi del mundo.", lat: 35.6654, lng: 139.7707, hours: "05:00-14:00", rating: 4.8, price: "€€", duration: 120 },
        { id: 3, name: "Shinjuku Gyoen", category: "nature", tags: ["nature", "relaxed", "culture"], description: "Jardín japonés tradicional perfecto para hanami.", lat: 35.6852, lng: 139.7100, hours: "09:00-16:30", rating: 4.6, price: "€", duration: 120 },
        { id: 4, name: "Teamlab Borderless", category: "art", tags: ["art", "adventure", "modern"], description: "Museo de arte digital inmersivo único en el mundo.", lat: 35.6264, lng: 139.7838, hours: "10:00-19:00", rating: 4.8, price: "€€€", duration: 180 },
        { id: 5, name: "Shibuya", category: "nightlife", tags: ["nightlife", "shopping", "local"], description: "El cruce más famoso del mundo y la mejor vida nocturna.", lat: 35.6595, lng: 139.7004, hours: "24h", rating: 4.5, price: "€€", duration: 150 },
        { id: 6, name: "Harajuku", category: "shopping", tags: ["shopping", "local", "food"], description: "Centro de la moda kawaii con Takeshita Street.", lat: 35.6702, lng: 139.7026, hours: "11:00-20:00", rating: 4.4, price: "€€", duration: 120 }
    ],
    newyork: [
        { id: 1, name: "Metropolitan Museum", category: "art", tags: ["art", "culture", "history"], description: "Uno de los museos de arte más grandes del mundo.", lat: 40.7794, lng: -73.9632, hours: "10:00-17:00", rating: 4.8, price: "€€", duration: 240 },
        { id: 2, name: "Chelsea Market", category: "food", tags: ["food", "shopping", "local"], description: "Mercado gourmet en antigua fábrica de galletas Oreo.", lat: 40.7424, lng: -74.0061, hours: "07:00-21:00", rating: 4.6, price: "€€", duration: 90 },
        { id: 3, name: "Central Park", category: "nature", tags: ["nature", "relaxed", "free"], description: "El pulmón verde de Manhattan con 340 hectáreas.", lat: 40.7829, lng: -73.9654, hours: "06:00-01:00", rating: 4.7, price: "€", duration: 180 },
        { id: 4, name: "High Line", category: "nature", tags: ["nature", "art", "local"], description: "Parque elevado en antigua vía de tren con arte urbano.", lat: 40.7480, lng: -74.0048, hours: "07:00-22:00", rating: 4.6, price: "€", duration: 90 },
        { id: 5, name: "Brooklyn Bridge", category: "culture", tags: ["culture", "adventure", "free"], description: "Puente icónico con vistas al skyline de Manhattan.", lat: 40.7061, lng: -73.9969, hours: "24h", rating: 4.7, price: "€", duration: 60 },
        { id: 6, name: "Greenwich Village", category: "nightlife", tags: ["nightlife", "local", "food"], description: "Barrio histórico con jazz clubs y restaurantes íntimos.", lat: 40.7336, lng: -74.0027, hours: "24h", rating: 4.5, price: "€€", duration: 150 }
    ],
    barcelona: [
        { id: 1, name: "Sagrada Familia", category: "culture", tags: ["culture", "art", "history"], description: "La obra maestra inacabada de Gaudí, símbolo de Barcelona.", lat: 41.4036, lng: 2.1744, hours: "09:00-20:00", rating: 4.8, price: "€€€", duration: 120 },
        { id: 2, name: "La Boquería", category: "food", tags: ["food", "local", "shopping"], description: "El mercado más colorido de Europa con productos frescos.", lat: 41.3816, lng: 2.1719, hours: "08:00-20:30", rating: 4.6, price: "€€", duration: 90 },
        { id: 3, name: "Park Güell", category: "nature", tags: ["nature", "art", "culture"], description: "Parque modernista de Gaudí con mosaicos y vistas.", lat: 41.4145, lng: 2.1527, hours: "09:30-19:30", rating: 4.5, price: "€€", duration: 120 },
        { id: 4, name: "Barrio Gótico", category: "local", tags: ["local", "history", "culture"], description: "Laberinto medieval de calles con plazas escondidas.", lat: 41.3833, lng: 2.1761, hours: "24h", rating: 4.6, price: "€", duration: 120 },
        { id: 5, name: "Barceloneta", category: "nature", tags: ["nature", "food", "relaxed"], description: "Playa urbana con chiringuitos y marisquerías.", lat: 41.3758, lng: 2.1894, hours: "24h", rating: 4.4, price: "€", duration: 180 },
        { id: 6, name: "El Raval", category: "nightlife", tags: ["nightlife", "art", "local"], description: "Barrio multicultural con arte urbano y bares de copas.", lat: 41.3797, lng: 2.1689, hours: "24h", rating: 4.3, price: "€€", duration: 120 }
    ],
    amsterdam: [
        { id: 1, name: "Rijksmuseum", category: "art", tags: ["art", "culture", "history"], description: "Museo nacional con Rembrandt y la Ronda de Noche.", lat: 52.3600, lng: 4.8852, hours: "09:00-17:00", rating: 4.8, price: "€€", duration: 180 },
        { id: 2, name: "Albert Cuypmarkt", category: "food", tags: ["food", "local", "shopping"], description: "El mercado callejero más grande de Europa.", lat: 52.3558, lng: 4.8944, hours: "09:00-17:00", rating: 4.5, price: "€", duration: 90 },
        { id: 3, name: "Vondelpark", category: "nature", tags: ["nature", "relaxed", "free", "local"], description: "El Central Park de Ámsterdam con conciertos gratuitos.", lat: 52.3579, lng: 4.8686, hours: "24h", rating: 4.6, price: "€", duration: 90 },
        { id: 4, name: "Van Gogh Museum", category: "art", tags: ["art", "culture"], description: "La mayor colección de obras de Van Gogh del mundo.", lat: 52.3584, lng: 4.8811, hours: "09:00-18:00", rating: 4.7, price: "€€", duration: 150 },
        { id: 5, name: "Jordaan", category: "local", tags: ["local", "food", "shopping"], description: "Barrio de canales con cafés brown y galerías.", lat: 52.3752, lng: 4.8818, hours: "24h", rating: 4.6, price: "€€", duration: 120 },
        { id: 6, name: "De Pijp", category: "nightlife", tags: ["nightlife", "food", "local"], description: "Barrio bohemio con la mejor vida nocturna de la ciudad.", lat: 52.3530, lng: 4.8938, hours: "24h", rating: 4.5, price: "€€", duration: 150 }
    ],
    berlin: [
        { id: 1, name: "Isla de los Museos", category: "culture", tags: ["culture", "art", "history"], description: "Cinco museos de clase mundial en una isla del Spree.", lat: 52.5169, lng: 13.4019, hours: "10:00-18:00", rating: 4.7, price: "€€", duration: 240 },
        { id: 2, name: "Markthalle Neun", category: "food", tags: ["food", "local"], description: "Mercado de comida callejera los jueves por la noche.", lat: 52.5007, lng: 13.4341, hours: "12:00-18:00", rating: 4.6, price: "€€", duration: 90 },
        { id: 3, name: "Tiergarten", category: "nature", tags: ["nature", "relaxed", "free"], description: "El mayor parque urbano de Berlín histórico.", lat: 52.5145, lng: 13.3501, hours: "24h", rating: 4.5, price: "€", duration: 120 },
        { id: 4, name: "East Side Gallery", category: "art", tags: ["art", "culture", "history", "free"], description: "El mayor fragmento del Muro de Berlín convertido en galería.", lat: 52.5052, lng: 13.4396, hours: "24h", rating: 4.6, price: "€", duration: 90 },
        { id: 5, name: "Kreuzberg", category: "nightlife", tags: ["nightlife", "local", "food"], description: "Epicentro de la vida nocturna y cultura alternativa.", lat: 52.4952, lng: 13.4030, hours: "24h", rating: 4.5, price: "€€", duration: 180 },
        { id: 6, name: "Prenzlauer Berg", category: "local", tags: ["local", "food", "shopping"], description: "Barrio gentrificado con cafés y mercado de pulgas.", lat: 52.5393, lng: 13.4244, hours: "10:00-18:00", rating: 4.4, price: "€€", duration: 120 }
    ],
    bangkok: [
        { id: 1, name: "Gran Palacio", category: "culture", tags: ["culture", "history", "art"], description: "El complejo palaciego más impresionante de Tailandia.", lat: 13.7500, lng: 100.4913, hours: "08:30-15:30", rating: 4.7, price: "€€", duration: 180 },
        { id: 2, name: "Chatuchak Market", category: "shopping", tags: ["shopping", "food", "local"], description: "El mercado de fin de semana más grande del mundo.", lat: 13.7999, lng: 100.5505, hours: "Sáb-Dom 09:00-18:00", rating: 4.6, price: "€", duration: 240 },
        { id: 3, name: "Lumphini Park", category: "nature", tags: ["nature", "relaxed", "free"], description: "Oasis verde en el centro con lagartos monitores.", lat: 13.7309, lng: 100.5417, hours: "04:30-21:00", rating: 4.4, price: "€", duration: 90 },
        { id: 4, name: "Wat Arun", category: "culture", tags: ["culture", "history", "art"], description: "El templo del amanecer con mosaicos de porcelana.", lat: 13.7437, lng: 100.4889, hours: "08:00-18:00", rating: 4.6, price: "€", duration: 60 },
        { id: 5, name: "Khao San Road", category: "nightlife", tags: ["nightlife", "food", "local"], description: "La calle mochilera más famosa del sudeste asiático.", lat: 13.7587, lng: 100.4970, hours: "24h", rating: 4.2, price: "€", duration: 120 },
        { id: 6, name: "Chinatown Yaowarat", category: "food", tags: ["food", "local", "culture"], description: "Street food nocturno legendario en el barrio chino.", lat: 13.7400, lng: 100.5100, hours: "17:00-24:00", rating: 4.7, price: "€", duration: 150 }
    ],
    dubai: [
        { id: 1, name: "Burj Khalifa", category: "culture", tags: ["culture", "adventure", "modern"], description: "El edificio más alto del mundo con vistas de 360°.", lat: 25.1972, lng: 55.2744, hours: "08:30-23:00", rating: 4.7, price: "€€€", duration: 120 },
        { id: 2, name: "Gold Souk", category: "shopping", tags: ["shopping", "culture", "local"], description: "Mercado tradicional con toneladas de oro y especias.", lat: 25.2867, lng: 55.2963, hours: "10:00-22:00", rating: 4.5, price: "€", duration: 90 },
        { id: 3, name: "Dubai Miracle Garden", category: "nature", tags: ["nature", "art"], description: "El jardín de flores natural más grande del mundo.", lat: 25.0603, lng: 55.2449, hours: "09:00-21:00", rating: 4.4, price: "€€", duration: 120 },
        { id: 4, name: "Dubai Frame", category: "art", tags: ["art", "culture", "modern"], description: "Marco gigante con vistas al viejo y nuevo Dubái.", lat: 25.2350, lng: 55.3002, hours: "09:00-21:00", rating: 4.5, price: "€€", duration: 60 },
        { id: 5, name: "Al Fahidi", category: "culture", tags: ["culture", "history", "local"], description: "Barrio histórico con museos y cafés tradicionales.", lat: 25.2637, lng: 55.2962, hours: "08:00-20:00", rating: 4.4, price: "€", duration: 90 },
        { id: 6, name: "Dubai Marina", category: "nightlife", tags: ["nightlife", "food", "modern"], description: "Puerto moderno con restaurantes y vida nocturna de lujo.", lat: 25.0767, lng: 55.1337, hours: "24h", rating: 4.6, price: "€€€", duration: 180 }
    ],
    sydney: [
        { id: 1, name: "Sydney Opera House", category: "culture", tags: ["culture", "art", "history"], description: "El edificio más icónico de Australia con tours y shows.", lat: -33.8568, lng: 151.2153, hours: "09:00-17:00", rating: 4.8, price: "€€", duration: 120 },
        { id: 2, name: "Sydney Fish Market", category: "food", tags: ["food", "local"], description: "El mercado de mariscos más grande del hemisferio sur.", lat: -33.8706, lng: 151.1916, hours: "07:00-16:00", rating: 4.5, price: "€€", duration: 90 },
        { id: 3, name: "Royal Botanic Garden", category: "nature", tags: ["nature", "relaxed", "free"], description: "Jardines junto al puerto con vistas a la Ópera.", lat: -33.8642, lng: 151.2166, hours: "07:00-20:00", rating: 4.7, price: "€", duration: 120 },
        { id: 4, name: "Bondi Beach", category: "nature", tags: ["nature", "adventure", "local"], description: "La playa más famosa de Australia con paseo costero.", lat: -33.8915, lng: 151.2767, hours: "24h", rating: 4.6, price: "€", duration: 180 },
        { id: 5, name: "The Rocks", category: "local", tags: ["local", "history", "shopping"], description: "Barrio histórico con mercados de fin de semana.", lat: -33.8599, lng: 151.2090, hours: "10:00-17:00", rating: 4.5, price: "€€", duration: 120 },
        { id: 6, name: "Surry Hills", category: "nightlife", tags: ["nightlife", "food", "local"], description: "Barrio creativo con los mejores cafés y bares.", lat: -33.8859, lng: 151.2114, hours: "24h", rating: 4.4, price: "€€", duration: 150 }
    ]
};

window.CITIES = CITIES;
window.PLACES = PLACES;
