// WanderMind - Professional Itinerary Templates
// Premium travel agent style itineraries

const ITINERARY_TEMPLATES = {
    // Templates by city and style
    cultural: {
        name: 'Cultural & Histórico',
        icon: '🏛️',
        description: 'Museos, monumentos y patrimonio',
        dayStructure: {
            morning: { start: '09:00', end: '13:00', activities: 2 },
            lunch: { start: '13:30', end: '15:00' },
            afternoon: { start: '15:30', end: '19:00', activities: 2 },
            dinner: { start: '20:00', end: '21:30' },
            evening: { start: '21:30', end: '23:00', activities: 1 }
        }
    },
    gastronomic: {
        name: 'Gastronómico',
        icon: '🍽️',
        description: 'Lo mejor de la cocina local y mercados',
        dayStructure: {
            morning: { start: '10:00', end: '12:00', activities: 1 },
            brunch: { start: '12:00', end: '14:00' },
            afternoon: { start: '15:00', end: '18:00', activities: 2 },
            dinner: { start: '20:30', end: '22:30' },
            evening: { start: '22:30', end: '00:00', activities: 1 }
        }
    },
    adventure: {
        name: 'Aventura & Naturaleza',
        icon: '🏔️',
        description: 'Actividades al aire libre y parques',
        dayStructure: {
            morning: { start: '08:00', end: '12:00', activities: 2 },
            lunch: { start: '12:30', end: '14:00' },
            afternoon: { start: '14:30', end: '18:00', activities: 2 },
            dinner: { start: '19:30', end: '21:00' },
            evening: { start: '21:00', end: '22:30', activities: 1 }
        }
    },
    romantic: {
        name: 'Romántico',
        icon: '💑',
        description: 'Para parejas, momentos especiales',
        dayStructure: {
            morning: { start: '10:00', end: '12:30', activities: 1 },
            brunch: { start: '12:30', end: '14:30' },
            afternoon: { start: '15:00', end: '19:00', activities: 2 },
            dinner: { start: '20:30', end: '23:00' },
            evening: { start: '23:00', end: '00:30', activities: 1 }
        }
    },
    budget: {
        name: 'Low Cost',
        icon: '💰',
        description: 'Máximo disfrute, mínimo gasto',
        dayStructure: {
            morning: { start: '09:00', end: '13:00', activities: 3 },
            lunch: { start: '13:00', end: '14:30' },
            afternoon: { start: '14:30', end: '19:00', activities: 3 },
            dinner: { start: '19:30', end: '21:00' },
            evening: { start: '21:00', end: '23:00', activities: 1 }
        }
    }
};

// City-specific places and experiences
const CITY_EXPERIENCES = {
    madrid: {
        morning: [
            { name: 'Museo del Prado', type: 'museum', duration: 120, price: 15, freeDay: 'Lunes-Sábado 18-20h', rating: 4.8, tip: 'Entra por la puerta de Goya, menos cola' },
            { name: 'Retiro + Palacio de Cristal', type: 'park', duration: 90, price: 0, rating: 4.7, tip: 'Alquila una barca por 8€' },
            { name: 'Mercado de San Miguel', type: 'market', duration: 60, price: 0, rating: 4.5, tip: 'Ideal para tapas variadas' },
            { name: 'Palacio Real (exterior)', type: 'monument', duration: 45, price: 0, rating: 4.6, tip: 'Cambio de guardia a las 11:00 miércoles y sábados' }
        ],
        afternoon: [
            { name: 'Templo de Debod', type: 'monument', duration: 45, price: 0, rating: 4.5, tip: 'Atardecer increíble, llega 30min antes' },
            { name: 'Museo Reina Sofía', type: 'museum', duration: 90, price: 12, freeDay: 'Lunes, Miércoles-Sábado 19-21h', rating: 4.6, tip: 'El Guernica está en la planta 2' },
            { name: 'Barrio de Malasaña', type: 'neighborhood', duration: 90, price: 0, rating: 4.4, tip: 'Tiendas vintage en Calle Velarde' },
            { name: 'Gran Vía', type: 'street', duration: 60, price: 0, rating: 4.3, tip: 'El "Broadway madrileño", teatros y tiendas' }
        ],
        evening: [
            { name: 'Rooftop Círculo de Bellas Artes', type: 'viewpoint', duration: 60, price: 5, rating: 4.7, tip: 'Las mejores vistas de Madrid con copa' },
            { name: 'Cena en La Latina', type: 'dining', duration: 90, price: 25, rating: 4.6, tip: 'Cava Baja tiene los mejores restaurantes' },
            { name: 'Tablao Flamenco', type: 'show', duration: 90, price: 35, rating: 4.8, tip: 'Corral de la Morería es el más auténtico' }
        ],
        food: [
            { name: 'Bocadillo de calamares', where: 'Bar La Campana (Plaza Mayor)', price: '4-5€' },
            { name: 'Churros con chocolate', where: 'Chocolatería San Ginés', price: '5€' },
            { name: 'Cocido madrileño', where: 'La Bola', price: '25€' },
            { name: 'Vermut y aceitunas', where: 'Casa Camacho (Malasaña)', price: '3-5€' }
        ],
        transport: {
            fromAirport: 'Metro L8 + L10 (30min, 5€) o Aerobús (35min, 6€)',
            bestPass: 'Abono Turístico Zona A - 8.40€/día',
            tips: 'Sol es el centro de todo. Metro cierra a 01:30'
        }
    },

    barcelona: {
        morning: [
            { name: 'Sagrada Familia', type: 'monument', duration: 90, price: 26, rating: 4.9, tip: 'RESERVA ONLINE obligatoria, mejor a las 9:00' },
            { name: 'Park Güell', type: 'park', duration: 90, price: 10, freeDay: 'Antes de 9:30', rating: 4.7, tip: 'La zona monumental requiere entrada' },
            { name: 'La Boquería', type: 'market', duration: 60, price: 0, rating: 4.5, tip: 'Ve temprano (9-10h), luego es un caos' },
            { name: 'Casa Batlló', type: 'monument', duration: 60, price: 35, rating: 4.8, tip: 'Vale la pena entrar, arquitectura increíble' }
        ],
        afternoon: [
            { name: 'Barrio Gótico', type: 'neighborhood', duration: 90, price: 0, rating: 4.6, tip: 'Piérdete por las callejuelas, descubrirás plazas secretas' },
            { name: 'La Barceloneta & playa', type: 'beach', duration: 120, price: 0, rating: 4.4, tip: 'Chiringuitos con vistas' },
            { name: 'Bunkers del Carmel', type: 'viewpoint', duration: 60, price: 0, rating: 4.8, tip: 'Las mejores vistas de BCN, lleva bebida' },
            { name: 'El Born', type: 'neighborhood', duration: 90, price: 0, rating: 4.5, tip: 'Boutiques, galerías y el Picasso' }
        ],
        evening: [
            { name: 'Atardecer en W Hotel', type: 'viewpoint', duration: 60, price: 15, rating: 4.6, tip: 'Copa con vistas al mar' },
            { name: 'Cena en Gràcia', type: 'dining', duration: 90, price: 20, rating: 4.7, tip: 'Ambiente local, menos turístico' },
            { name: 'Flamenco en El Tablao de Carmen', type: 'show', duration: 90, price: 45, rating: 4.7, tip: 'En Poble Espanyol, incluye entrada' }
        ],
        food: [
            { name: 'Pa amb tomàquet', where: 'Cualquier bar', price: '2-3€' },
            { name: 'Fideuà', where: 'Can Paixano (La Barceloneta)', price: '12€' },
            { name: 'Bombas (patatas)', where: 'La Cova Fumada', price: '3€' },
            { name: 'Vermut', where: 'Bar Mut (Eixample)', price: '4€' }
        ],
        transport: {
            fromAirport: 'Aerobús (35min, 7.75€) o T2 Metro L9 (45min, 5.15€)',
            bestPass: 'T-Casual (10 viajes) 11.35€ o Hola BCN 17.50€/48h',
            tips: 'Muévete en metro, es muy eficiente. La L3 verde pasa por todo'
        }
    },

    paris: {
        morning: [
            { name: 'Torre Eiffel', type: 'monument', duration: 120, price: 29, rating: 4.8, tip: 'Reserva online, escaleras más barato (11€)' },
            { name: 'Museo del Louvre', type: 'museum', duration: 180, price: 17, freeDay: 'Primer domingo del mes', rating: 4.9, tip: 'Entrada por Carrousel du Louvre, sin cola' },
            { name: 'Montmartre + Sacré-Cœur', type: 'neighborhood', duration: 120, price: 0, rating: 4.7, tip: 'Sube caminando, baja en funicular' },
            { name: 'Jardines de Luxemburgo', type: 'park', duration: 60, price: 0, rating: 4.6, tip: 'Trae un croissant y siéntate a ver parisinos' }
        ],
        afternoon: [
            { name: 'Notre-Dame (exterior)', type: 'monument', duration: 30, price: 0, rating: 4.5, tip: 'En reconstrucción pero impresiona' },
            { name: 'Le Marais', type: 'neighborhood', duration: 90, price: 0, rating: 4.7, tip: 'El barrio más cool, falafel en L\'As du Fallafel' },
            { name: 'Museo d\'Orsay', type: 'museum', duration: 120, price: 16, rating: 4.8, tip: 'Impresionistas en la 5ª planta' },
            { name: 'Campos Elíseos', type: 'street', duration: 60, price: 0, rating: 4.3, tip: 'Paseo desde Concorde hasta Arc de Triomphe' }
        ],
        evening: [
            { name: 'Crucero por el Sena', type: 'activity', duration: 60, price: 15, rating: 4.6, tip: 'Bateaux Mouches al atardecer' },
            { name: 'Cena en Saint-Germain', type: 'dining', duration: 90, price: 35, rating: 4.5, tip: 'Bistros auténticos' },
            { name: 'Moulin Rouge', type: 'show', duration: 120, price: 90, rating: 4.4, tip: 'Reserva con semanas de antelación' }
        ],
        food: [
            { name: 'Croissant', where: 'Du Pain et des Idées', price: '2.50€' },
            { name: 'Crêpe', where: 'Breizh Café (Le Marais)', price: '8-12€' },
            { name: 'Falafel', where: 'L\'As du Fallafel', price: '8€' },
            { name: 'Macarons', where: 'Ladurée (Champs-Élysées)', price: '3€/ud' }
        ],
        transport: {
            fromAirport: 'RER B (CDG 35min, 11€) o Roissybus (Orly 60min, 14.50€)',
            bestPass: 'Paris Visite 13.95€/día (zonas 1-3)',
            tips: 'Métro muy extenso. RER para zonas alejadas (Versailles, aeropuertos)'
        }
    }
};

// Professional Itinerary Generator
class ProfessionalItineraryGenerator {
    constructor(cities, days, style, budget) {
        this.cities = cities;
        this.days = days;
        this.style = style || 'cultural';
        this.budget = budget || 'medium';
    }

    generate() {
        const itinerary = {
            title: this.generateTitle(),
            cities: this.cities,
            totalDays: this.days,
            style: ITINERARY_TEMPLATES[this.style],
            dailyPlans: [],
            totalEstimatedCost: 0,
            transportLinks: []
        };

        const daysPerCity = Math.floor(this.days / this.cities.length);
        let dayNumber = 1;

        this.cities.forEach((cityKey, cityIndex) => {
            const cityData = CITIES_TRANSPORT[cityKey];
            const experiences = CITY_EXPERIENCES[cityKey];

            if (!cityData || !experiences) return;

            // Add transport link for this city
            itinerary.transportLinks.push({
                city: cityData.name,
                transport: cityData.transport
            });

            for (let d = 0; d < daysPerCity; d++) {
                const dayPlan = this.generateDayPlan(dayNumber, cityKey, cityData, experiences, d);
                itinerary.dailyPlans.push(dayPlan);
                itinerary.totalEstimatedCost += dayPlan.estimatedCost;
                dayNumber++;
            }
        });

        return itinerary;
    }

    generateDayPlan(dayNumber, cityKey, cityData, experiences, dayInCity) {
        const template = ITINERARY_TEMPLATES[this.style].dayStructure;

        const dayPlan = {
            day: dayNumber,
            city: cityData.name,
            country: cityData.country,
            date: this.getDateString(dayNumber),
            sections: [],
            estimatedCost: 0,
            transportTips: cityData.transport
        };

        // Morning
        const morningActivities = this.selectActivities(experiences.morning, template.morning.activities, dayInCity);
        dayPlan.sections.push({
            timeOfDay: 'morning',
            icon: '🌅',
            title: 'MAÑANA',
            timeRange: `${template.morning.start} - ${template.morning.end}`,
            activities: morningActivities,
            transport: this.getTransportBetween(morningActivities, cityData)
        });

        // Lunch
        const lunchOption = experiences.food[dayInCity % experiences.food.length];
        dayPlan.sections.push({
            timeOfDay: 'lunch',
            icon: '🍽️',
            title: 'ALMUERZO',
            timeRange: template.lunch ? `${template.lunch.start} - ${template.lunch.end}` : '13:30 - 15:00',
            recommendation: lunchOption
        });

        // Afternoon
        const afternoonActivities = this.selectActivities(experiences.afternoon, template.afternoon.activities, dayInCity);
        dayPlan.sections.push({
            timeOfDay: 'afternoon',
            icon: '🌆',
            title: 'TARDE',
            timeRange: `${template.afternoon.start} - ${template.afternoon.end}`,
            activities: afternoonActivities,
            transport: this.getTransportBetween(afternoonActivities, cityData)
        });

        // Evening
        const eveningActivities = this.selectActivities(experiences.evening, template.evening.activities, dayInCity);
        dayPlan.sections.push({
            timeOfDay: 'evening',
            icon: '🌙',
            title: 'NOCHE',
            timeRange: `${template.evening.start} - ${template.evening.end}`,
            activities: eveningActivities
        });

        // Calculate estimated cost
        [...morningActivities, ...afternoonActivities, ...eveningActivities].forEach(act => {
            dayPlan.estimatedCost += act.price || 0;
        });

        return dayPlan;
    }

    selectActivities(pool, count, offset) {
        const selected = [];
        for (let i = 0; i < count && i < pool.length; i++) {
            selected.push(pool[(i + offset) % pool.length]);
        }
        return selected;
    }

    getTransportBetween(activities, cityData) {
        if (activities.length < 2) return null;

        const metro = cityData.transport.metro;
        return {
            type: 'metro',
            name: metro.name,
            url: metro.url,
            estimatedTime: '10-15 min',
            price: metro.ticketPrice
        };
    }

    generateTitle() {
        if (this.cities.length === 1) {
            const city = CITIES_TRANSPORT[this.cities[0]];
            return `${this.days} días en ${city ? city.name : this.cities[0]}`;
        }
        return `Tour ${this.cities.map(c => CITIES_TRANSPORT[c]?.name || c).join(' → ')} (${this.days} días)`;
    }

    getDateString(dayNumber) {
        const date = new Date();
        date.setDate(date.getDate() + dayNumber - 1);
        return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    }
}

// Export
window.ITINERARY_TEMPLATES = ITINERARY_TEMPLATES;
window.CITY_EXPERIENCES = CITY_EXPERIENCES;
window.ProfessionalItineraryGenerator = ProfessionalItineraryGenerator;
