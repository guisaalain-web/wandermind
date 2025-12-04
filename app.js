// WanderMind - Global Tourist App with ANY City Search
(function () {
    'use strict';

    // City Manager with Nominatim API for any city worldwide
    class CityManager {
        constructor() {
            this.currentCity = this.loadSavedCity() || { name: 'Madrid', country: 'España', lat: 40.4168, lng: -3.7038 };
            this.searchTimeout = null;
        }

        loadSavedCity() {
            const saved = localStorage.getItem('wandermind_city');
            return saved ? JSON.parse(saved) : null;
        }

        saveCity(city) {
            this.currentCity = city;
            localStorage.setItem('wandermind_city', JSON.stringify(city));
        }

        getCity() { return this.currentCity; }

        // Search cities using Nominatim API (free, no API key needed)
        async searchCities(query) {
            if (!query || query.length < 2) return [];
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&addressdetails=1&featuretype=city`,
                    { headers: { 'Accept-Language': 'es' } }
                );
                const data = await response.json();
                return data
                    .filter(item => item.type === 'city' || item.type === 'town' || item.type === 'village' || item.type === 'administrative' || item.class === 'place')
                    .map(item => ({
                        name: item.address?.city || item.address?.town || item.address?.village || item.name,
                        country: item.address?.country || '',
                        lat: parseFloat(item.lat),
                        lng: parseFloat(item.lon),
                        displayName: item.display_name
                    }))
                    .filter(c => c.name);
            } catch (error) {
                console.error('City search error:', error);
                return [];
            }
        }
    }

    // Dynamic Content Generator for any city
    class ContentGenerator {
        constructor(cityMgr) {
            this.cityMgr = cityMgr;
        }

        // Generate places for any city based on universal categories
        generatePlaces() {
            const city = this.cityMgr.getCity();
            const lat = city.lat, lng = city.lng;

            const placeTemplates = [
                { name: `Museo Central de ${city.name}`, category: 'culture', tags: ['culture', 'art', 'history'], description: `El principal museo de ${city.name} con colecciones históricas y artísticas.`, duration: 180, price: '€€', rating: 4.6 },
                { name: `Mercado Local de ${city.name}`, category: 'food', tags: ['food', 'local', 'shopping'], description: `Mercado tradicional con productos frescos y gastronomía local.`, duration: 90, price: '€', rating: 4.5 },
                { name: `Parque Principal`, category: 'nature', tags: ['nature', 'relaxed', 'free'], description: `Espacio verde en el corazón de ${city.name} ideal para pasear.`, duration: 120, price: '€', rating: 4.4 },
                { name: `Centro Histórico`, category: 'culture', tags: ['culture', 'history', 'local'], description: `El casco antiguo de ${city.name} con arquitectura tradicional.`, duration: 150, price: '€', rating: 4.7 },
                { name: `Galería de Arte Contemporáneo`, category: 'art', tags: ['art', 'culture', 'modern'], description: `Exposiciones de artistas locales e internacionales.`, duration: 120, price: '€€', rating: 4.3 },
                { name: `Barrio Gastronómico`, category: 'food', tags: ['food', 'nightlife', 'local'], description: `Zona de restaurantes y bares con la mejor cocina local.`, duration: 120, price: '€€', rating: 4.5 },
                { name: `Mirador Panorámico`, category: 'nature', tags: ['nature', 'adventure'], description: `Las mejores vistas de ${city.name} y sus alrededores.`, duration: 60, price: '€', rating: 4.8 },
                { name: `Zona de Tiendas`, category: 'shopping', tags: ['shopping', 'local'], description: `Área comercial con tiendas locales y boutiques.`, duration: 90, price: '€€', rating: 4.2 }
            ];

            return placeTemplates.map((p, i) => ({
                ...p,
                id: i + 1,
                lat: lat + (Math.random() - 0.5) * 0.03,
                lng: lng + (Math.random() - 0.5) * 0.03,
                hours: '09:00-20:00'
            }));
        }

        // Generate events for any city
        generateEvents() {
            const city = this.cityMgr.getCity();
            const today = new Date();

            const eventTemplates = [
                { title: `Festival de Jazz en ${city.name}`, category: 'music', description: 'Conciertos íntimos con artistas locales e internacionales.', hidden: true, location: 'Centro Cultural' },
                { title: 'Mercado Nocturno Artesanal', category: 'market', description: 'Artesanía local, comida callejera y música en vivo.', hidden: false, location: 'Plaza Principal' },
                { title: 'Tour Gastronómico Secreto', category: 'food', description: 'Descubre los mejores restaurantes escondidos de la ciudad.', hidden: true, location: 'Punto de encuentro variable' },
                { title: 'Exposición de Arte Urbano', category: 'art', description: 'Murales y grafitis de artistas locales.', hidden: true, location: 'Barrio Artístico' },
                { title: 'Concierto al Atardecer', category: 'music', description: 'Música en vivo con vistas panorámicas.', hidden: false, location: 'Mirador Principal' },
                { title: 'Feria de Antigüedades', category: 'market', description: 'Objetos vintage y coleccionables únicos.', hidden: false, location: 'Mercado Central' }
            ];

            return eventTemplates.map((e, i) => ({
                ...e,
                id: i + 1,
                date: new Date(today.getTime() + (i + 1) * 86400000).toISOString().split('T')[0],
                time: ['18:00', '20:00', '19:00', '17:00', '21:00', '10:00'][i] || '19:00',
                coords: { lat: city.lat + (Math.random() - 0.5) * 0.02, lng: city.lng + (Math.random() - 0.5) * 0.02 }
            }));
        }

        // Generate transport for any city
        generateTransport() {
            const city = this.cityMgr.getCity();
            return {
                metro: [
                    { id: 'L1', name: 'Línea 1', color: '#e53935', route: `Centro - ${city.name} Norte`, frequency: 5 },
                    { id: 'L2', name: 'Línea 2', color: '#1e88e5', route: `Este - Oeste`, frequency: 6 }
                ],
                bus: [
                    { id: '01', name: 'Bus Circular', color: '#43a047', route: 'Recorrido centro ciudad', frequency: 10 },
                    { id: '10', name: 'Bus Turístico', color: '#fb8c00', route: 'Principales atracciones', frequency: 15 }
                ]
            };
        }

        getPlaces() { return this.generatePlaces(); }
        getEvents() { return this.generateEvents(); }
        getTransport() { return this.generateTransport(); }
    }

    // User Preferences Manager
    class UserPreferences {
        constructor() {
            this.data = this.load() || { interests: [], pace: null, budget: null, hours: 6 };
        }
        load() { const saved = localStorage.getItem('wandermind_prefs'); return saved ? JSON.parse(saved) : null; }
        save() { localStorage.setItem('wandermind_prefs', JSON.stringify(this.data)); }
        setInterests(interests) { this.data.interests = interests; this.save(); }
        setPace(pace) { this.data.pace = pace; this.save(); }
        setBudget(budget) { this.data.budget = budget; this.save(); }
        setHours(hours) { this.data.hours = hours; this.save(); }
        isConfigured() { return this.data.interests.length > 0 && this.data.pace && this.data.budget; }
        getMatchScore(place) {
            let score = 0;
            place.tags.forEach(tag => { if (this.data.interests.includes(tag)) score += 20; });
            if (this.data.budget === 'low' && place.price === '€') score += 15;
            if (this.data.budget === 'medium' && place.price === '€€') score += 15;
            if (this.data.budget === 'high' && place.price === '€€€') score += 15;
            return Math.min(100, score + 30);
        }
    }

    // Route Generator
    class RouteGenerator {
        constructor(prefs, contentGen) {
            this.prefs = prefs;
            this.contentGen = contentGen;
        }
        generate() {
            const places = this.contentGen.getPlaces();
            const scoredPlaces = places.map(p => ({ ...p, score: this.prefs.getMatchScore(p) })).sort((a, b) => b.score - a.score);
            const route = [];
            let totalDuration = 0;
            const maxStops = this.prefs.data.pace === 'relaxed' ? 3 : this.prefs.data.pace === 'intense' ? 6 : 4;
            const availableMinutes = this.prefs.data.hours * 60;

            for (const place of scoredPlaces) {
                if (route.length >= maxStops) break;
                if (totalDuration + place.duration > availableMinutes) continue;
                route.push(place);
                totalDuration += place.duration + 30;
            }
            return this.assignTimes(route);
        }
        assignTimes(route) {
            let currentTime = 10 * 60;
            return route.map(place => {
                const hours = Math.floor(currentTime / 60);
                const mins = currentTime % 60;
                currentTime += place.duration + 30;
                return { ...place, startTime: `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}` };
            });
        }
        getTimeOfDay(route) {
            if (!route.length) return 'all';
            const firstHour = parseInt(route[0].startTime.split(':')[0]);
            if (firstHour < 12) return 'morning';
            if (firstHour < 18) return 'afternoon';
            return 'evening';
        }
    }

    // Map Controller
    class MapController {
        constructor(cityMgr, contentGen) {
            this.cityMgr = cityMgr;
            this.contentGen = contentGen;
            this.map = null;
            this.markers = [];
            this.routeLine = null;
        }
        init() {
            const city = this.cityMgr.getCity();
            this.map = L.map('map').setView([city.lat, city.lng], 13);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '©OpenStreetMap, ©CartoDB', maxZoom: 19
            }).addTo(this.map);
            this.addPlaceMarkers();
        }
        updateCity() {
            const city = this.cityMgr.getCity();
            this.map.setView([city.lat, city.lng], 13);
            this.clearMarkers();
            this.addPlaceMarkers();
        }
        clearMarkers() {
            this.markers.forEach(m => this.map.removeLayer(m.marker));
            this.markers = [];
            if (this.routeLine) { this.map.removeLayer(this.routeLine); this.routeLine = null; }
        }
        addPlaceMarkers() {
            const places = this.contentGen.getPlaces();
            places.forEach(place => {
                const icon = L.divIcon({ className: 'custom-marker', html: `<div class="marker-dot" data-category="${place.category}"></div>`, iconSize: [20, 20] });
                const marker = L.marker([place.lat, place.lng], { icon }).addTo(this.map).on('click', () => this.showPlaceDetails(place));
                this.markers.push({ marker, place });
            });
        }
        showPlaceDetails(place) {
            document.getElementById('place-details').innerHTML = `
                <div class="place-info"><h4>${place.name}</h4><span class="place-category">${this.getCategoryName(place.category)}</span>
                <p class="place-desc">${place.description}</p>
                <div class="place-meta"><span>🕐 ${place.hours}</span><span>⭐ ${place.rating}</span><span>💰 ${place.price}</span><span>⏱️ ${place.duration} min</span></div></div>`;
        }
        getCategoryName(cat) {
            const names = { culture: 'Cultura', food: 'Gastronomía', nature: 'Naturaleza', art: 'Arte', nightlife: 'Vida Nocturna', shopping: 'Compras', local: 'Vida Local', adventure: 'Aventura' };
            return names[cat] || cat;
        }
        highlightRoute(route) {
            const coords = route.map(p => [p.lat, p.lng]);
            if (this.routeLine) this.map.removeLayer(this.routeLine);
            if (coords.length > 1) {
                this.routeLine = L.polyline(coords, { color: '#00d9ff', weight: 3, opacity: 0.8, dashArray: '10, 10' }).addTo(this.map);
                this.map.fitBounds(this.routeLine.getBounds(), { padding: [50, 50] });
            }
        }
    }

    // App Controller
    class App {
        constructor() {
            this.cityMgr = new CityManager();
            this.contentGen = new ContentGenerator(this.cityMgr);
            this.prefs = new UserPreferences();
            this.routeGen = new RouteGenerator(this.prefs, this.contentGen);
            this.mapCtrl = null;
            this.currentStep = 1;
            this.totalSteps = 4;
            this.generatedRoutes = [];
        }

        init() {
            this.setupCitySearch();
            this.setupEventListeners();
            this.renderWizardSteps();
            this.updatePreferencesDisplay();
            this.updateCurrentCityDisplay();
            this.renderEvents();
            this.renderTransport();
            setTimeout(() => { this.mapCtrl = new MapController(this.cityMgr, this.contentGen); this.mapCtrl.init(); }, 500);
            if (this.prefs.isConfigured()) this.generateAndDisplayRoutes();
        }

        setupCitySearch() {
            const input = document.getElementById('city-search');
            const results = document.getElementById('city-search-results');

            input.addEventListener('input', async (e) => {
                const query = e.target.value.trim();
                clearTimeout(this.searchTimeout);

                if (query.length < 2) {
                    results.classList.remove('active');
                    return;
                }

                results.innerHTML = '<div class="city-search-loading">🔍 Buscando...</div>';
                results.classList.add('active');

                this.searchTimeout = setTimeout(async () => {
                    const cities = await this.cityMgr.searchCities(query);
                    if (cities.length === 0) {
                        results.innerHTML = '<div class="city-search-loading">No se encontraron ciudades</div>';
                    } else {
                        results.innerHTML = cities.map(city => `
                            <div class="city-result" data-city='${JSON.stringify(city)}'>
                                <span class="city-result-icon">📍</span>
                                <div class="city-result-info">
                                    <div class="city-result-name">${city.name}</div>
                                    <div class="city-result-country">${city.country}</div>
                                </div>
                            </div>
                        `).join('');

                        results.querySelectorAll('.city-result').forEach(el => {
                            el.addEventListener('click', () => {
                                const city = JSON.parse(el.dataset.city);
                                this.selectCity(city);
                                input.value = '';
                                results.classList.remove('active');
                            });
                        });
                    }
                }, 500);
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.city-search-container')) {
                    results.classList.remove('active');
                }
            });
        }

        selectCity(city) {
            this.cityMgr.saveCity(city);
            this.updateCurrentCityDisplay();
            if (this.mapCtrl) this.mapCtrl.updateCity();
            this.renderEvents();
            this.renderTransport();
            if (this.prefs.isConfigured()) this.generateAndDisplayRoutes();
            this.updatePreferencesDisplay();
            this.showToast(`¡Explorando ${city.name}, ${city.country}!`, 'success');
        }

        updateCurrentCityDisplay() {
            const city = this.cityMgr.getCity();
            document.getElementById('current-city-name').textContent = `${city.name}, ${city.country}`;
        }

        setupEventListeners() {
            document.getElementById('nav-toggle').addEventListener('click', () => document.getElementById('nav-menu').classList.toggle('active'));
            ['start-wizard', 'setup-prefs-btn'].forEach(id => { const el = document.getElementById(id); if (el) el.addEventListener('click', () => this.openWizard()); });
            document.getElementById('close-wizard').addEventListener('click', () => this.closeWizard());
            document.getElementById('wizard-prev').addEventListener('click', () => this.wizardPrev());
            document.getElementById('wizard-next').addEventListener('click', () => this.wizardNext());
            document.getElementById('explore-routes').addEventListener('click', () => document.getElementById('routes').scrollIntoView({ behavior: 'smooth' }));
            document.getElementById('generate-route').addEventListener('click', () => {
                if (!this.prefs.isConfigured()) { this.openWizard(); return; }
                this.generateAndDisplayRoutes();
                this.showToast('¡Nueva ruta generada!', 'success');
            });
            document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterRoutes(e.target.dataset.filter);
            }));
            document.querySelectorAll('.event-filter').forEach(btn => btn.addEventListener('click', (e) => {
                document.querySelectorAll('.event-filter').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterEvents(e.target.dataset.category);
            }));
        }

        renderWizardSteps() {
            const container = document.getElementById('wizard-steps');
            container.innerHTML = `
                <div class="wizard-step active" data-step="1">
                    <h2 class="wizard-title">¿Qué te apasiona explorar?</h2>
                    <p class="wizard-desc">Selecciona tus intereses principales</p>
                    <div class="interests-grid">
                        ${[{ k: 'culture', i: '🏛️', n: 'Cultura' }, { k: 'food', i: '🍽️', n: 'Gastronomía' }, { k: 'nature', i: '🌿', n: 'Naturaleza' }, { k: 'art', i: '🎨', n: 'Arte' }, { k: 'nightlife', i: '🌙', n: 'Vida Nocturna' }, { k: 'adventure', i: '⛰️', n: 'Aventura' }, { k: 'shopping', i: '🛍️', n: 'Compras' }, { k: 'local', i: '🏘️', n: 'Vida Local' }]
                    .map(x => `<button class="interest-card${this.prefs.data.interests.includes(x.k) ? ' selected' : ''}" data-interest="${x.k}"><span class="interest-icon">${x.i}</span><span class="interest-name">${x.n}</span></button>`).join('')}
                    </div>
                </div>
                <div class="wizard-step" data-step="2">
                    <h2 class="wizard-title">¿Cuál es tu ritmo ideal?</h2>
                    <p class="wizard-desc">¿Prefieres días relajados o intensos?</p>
                    <div class="pace-options">
                        ${[{ k: 'relaxed', i: '🐢', t: 'Relajado', d: '2-3 lugares por día' }, { k: 'moderate', i: '🚶', t: 'Moderado', d: '4-5 lugares, equilibrio' }, { k: 'intense', i: '🏃', t: 'Intenso', d: '6+ lugares, aprovechar todo' }]
                    .map(x => `<button class="pace-card${this.prefs.data.pace === x.k ? ' selected' : ''}" data-pace="${x.k}"><span class="pace-icon">${x.i}</span><h3>${x.t}</h3><p>${x.d}</p></button>`).join('')}
                    </div>
                </div>
                <div class="wizard-step" data-step="3">
                    <h2 class="wizard-title">¿Cuál es tu presupuesto?</h2>
                    <p class="wizard-desc">Esto nos ayuda a sugerir experiencias acordes</p>
                    <div class="budget-options">
                        ${[{ k: 'low', i: '💰', t: 'Económico', d: 'Gratis y bajo costo' }, { k: 'medium', i: '💰💰', t: 'Moderado', d: 'Buen balance' }, { k: 'high', i: '💰💰💰', t: 'Premium', d: 'Las mejores experiencias' }]
                    .map(x => `<button class="budget-card${this.prefs.data.budget === x.k ? ' selected' : ''}" data-budget="${x.k}"><span class="budget-icon">${x.i}</span><h3>${x.t}</h3><p>${x.d}</p></button>`).join('')}
                    </div>
                </div>
                <div class="wizard-step" data-step="4">
                    <h2 class="wizard-title">¿Cuánto tiempo tienes?</h2>
                    <p class="wizard-desc">Planificaremos la ruta perfecta</p>
                    <div class="time-selector">
                        <label class="time-label">Horas disponibles por día:</label>
                        <div class="time-slider-container">
                            <input type="range" id="time-slider" min="2" max="12" value="${this.prefs.data.hours}" class="time-slider">
                            <span class="time-value" id="time-value">${this.prefs.data.hours} horas</span>
                        </div>
                    </div>
                    <div class="time-presets">
                        <button class="time-preset" data-hours="3">Mañana (3h)</button>
                        <button class="time-preset" data-hours="6">Medio día (6h)</button>
                        <button class="time-preset" data-hours="10">Día completo (10h)</button>
                    </div>
                </div>`;

            container.querySelectorAll('.interest-card').forEach(card => card.addEventListener('click', () => {
                card.classList.toggle('selected');
                this.prefs.setInterests([...container.querySelectorAll('.interest-card.selected')].map(c => c.dataset.interest));
            }));
            container.querySelectorAll('.pace-card').forEach(card => card.addEventListener('click', () => {
                container.querySelectorAll('.pace-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.prefs.setPace(card.dataset.pace);
            }));
            container.querySelectorAll('.budget-card').forEach(card => card.addEventListener('click', () => {
                container.querySelectorAll('.budget-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.prefs.setBudget(card.dataset.budget);
            }));
            const slider = container.querySelector('#time-slider'), timeValue = container.querySelector('#time-value');
            if (slider) slider.addEventListener('input', () => { timeValue.textContent = `${slider.value} horas`; this.prefs.setHours(parseInt(slider.value)); });
            container.querySelectorAll('.time-preset').forEach(btn => btn.addEventListener('click', () => {
                slider.value = btn.dataset.hours; timeValue.textContent = `${btn.dataset.hours} horas`; this.prefs.setHours(parseInt(btn.dataset.hours));
            }));
        }

        openWizard() { document.getElementById('preferences-modal').classList.add('active'); this.currentStep = 1; this.updateWizardUI(); }
        closeWizard() {
            document.getElementById('preferences-modal').classList.remove('active');
            this.updatePreferencesDisplay();
            if (this.prefs.isConfigured()) this.generateAndDisplayRoutes();
        }
        wizardPrev() { if (this.currentStep > 1) { this.currentStep--; this.updateWizardUI(); } }
        wizardNext() {
            if (this.currentStep < this.totalSteps) { this.currentStep++; this.updateWizardUI(); }
            else { this.closeWizard(); this.showToast('¡Preferencias guardadas!', 'success'); }
        }
        updateWizardUI() {
            document.querySelectorAll('.wizard-step').forEach((step, i) => step.classList.toggle('active', i + 1 === this.currentStep));
            document.getElementById('wizard-progress-bar').style.width = `${(this.currentStep / this.totalSteps) * 100}%`;
            document.getElementById('wizard-prev').disabled = this.currentStep === 1;
            document.getElementById('wizard-next').textContent = this.currentStep === this.totalSteps ? '¡Listo!' : 'Siguiente';
        }

        updatePreferencesDisplay() {
            const container = document.getElementById('preferences-display');
            if (!this.prefs.isConfigured()) {
                container.innerHTML = `<div class="pref-empty-state"><span class="empty-icon">✨</span><h3>Aún no has configurado tus preferencias</h3><button class="btn btn-primary" id="setup-prefs-btn">Configurar ahora</button></div>`;
                document.getElementById('setup-prefs-btn').addEventListener('click', () => this.openWizard());
                return;
            }
            const interestNames = { culture: 'Cultura', food: 'Gastronomía', nature: 'Naturaleza', art: 'Arte', nightlife: 'Vida Nocturna', adventure: 'Aventura', shopping: 'Compras', local: 'Vida Local' };
            const paceNames = { relaxed: 'Relajado 🐢', moderate: 'Moderado 🚶', intense: 'Intenso 🏃' };
            const budgetNames = { low: 'Económico 💰', medium: 'Moderado 💰💰', high: 'Premium 💰💰💰' };
            const city = this.cityMgr.getCity();
            container.innerHTML = `
                <div class="pref-grid">
                    <div class="pref-item"><div class="pref-label">Ciudad</div><div class="pref-value">📍 ${city.name}, ${city.country}</div></div>
                    <div class="pref-item"><div class="pref-label">Intereses</div><div class="pref-tags">${this.prefs.data.interests.map(i => `<span class="pref-tag">${interestNames[i]}</span>`).join('')}</div></div>
                    <div class="pref-item"><div class="pref-label">Ritmo</div><div class="pref-value">${paceNames[this.prefs.data.pace]}</div></div>
                    <div class="pref-item"><div class="pref-label">Presupuesto</div><div class="pref-value">${budgetNames[this.prefs.data.budget]}</div></div>
                </div>
                <div style="text-align:center;margin-top:24px"><button class="btn btn-secondary" id="edit-prefs-btn">Editar preferencias</button></div>`;
            document.getElementById('edit-prefs-btn').addEventListener('click', () => this.openWizard());
        }

        generateAndDisplayRoutes() {
            this.generatedRoutes = [];
            const city = this.cityMgr.getCity();
            const routeNames = [`Ruta Cultural en ${city.name}`, `Ruta Gastronómica`, `Ruta Explorador`];
            for (let i = 0; i < 3; i++) {
                const route = this.routeGen.generate();
                this.generatedRoutes.push({
                    id: i + 1, name: routeNames[i], timeOfDay: this.routeGen.getTimeOfDay(route), stops: route,
                    matchScore: route.length ? Math.round(route.reduce((sum, p) => sum + p.score, 0) / route.length) : 0
                });
            }
            this.renderRoutes(this.generatedRoutes);
        }

        renderRoutes(routes) {
            const grid = document.getElementById('routes-grid');
            if (!routes.length || !routes[0].stops.length) {
                grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px">Configura tus preferencias para generar rutas personalizadas</p>';
                return;
            }
            grid.innerHTML = routes.map(route => `
                <div class="route-card" data-time="${route.timeOfDay}">
                    <div class="route-header"><h3 class="route-title">${route.name}</h3><div class="route-meta"><span>📍 ${route.stops.length} paradas</span><span>⏱️ ${this.prefs.data.hours}h</span></div></div>
                    <div class="route-body"><ul class="route-stops">
                        ${route.stops.slice(0, 4).map(stop => `<li class="route-stop"><span class="stop-time">${stop.startTime}</span><div><div class="stop-name">${stop.name}</div><div class="stop-type">${this.mapCtrl?.getCategoryName(stop.category) || stop.category}</div></div></li>`).join('')}
                        ${route.stops.length > 4 ? `<li class="route-stop"><span class="stop-time">...</span><div class="stop-name">+${route.stops.length - 4} más</div></li>` : ''}
                    </ul></div>
                    <div class="route-footer"><span class="route-match">🎯 ${route.matchScore}% match</span><button class="btn btn-secondary" onclick="app.viewRoute(${route.id})">Ver en mapa</button></div>
                </div>
            `).join('');
        }

        viewRoute(routeId) {
            const route = this.generatedRoutes.find(r => r.id === routeId);
            if (route && this.mapCtrl) {
                this.mapCtrl.highlightRoute(route.stops);
                document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
            }
        }

        filterRoutes(filter) { document.querySelectorAll('.route-card').forEach(card => card.style.display = filter === 'all' || card.dataset.time === filter ? 'block' : 'none'); }

        renderEvents() {
            const events = this.contentGen.getEvents();
            document.getElementById('events-grid').innerHTML = events.map(event => `
                <div class="event-card" data-category="${event.category}">
                    ${event.hidden ? '<span class="event-badge">🔮 Secreto</span>' : ''}
                    <div class="event-date">📅 ${new Date(event.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })} · ${event.time}</div>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-desc">${event.description}</p>
                    <div class="event-location">📍 ${event.location}</div>
                </div>
            `).join('');
        }

        filterEvents(category) { document.querySelectorAll('.event-card').forEach(card => card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none'); }

        renderTransport() {
            const transport = this.contentGen.getTransport();
            const linesContainer = document.getElementById('transport-lines');
            const allLines = [...(transport.metro || []).map(l => ({ ...l, type: 'metro' })), ...(transport.bus || []).map(l => ({ ...l, type: 'bus' }))];

            linesContainer.innerHTML = allLines.map(line => `
                <div class="transport-line" data-line-id="${line.id}" data-frequency="${line.frequency}">
                    <div class="line-badge ${line.type}" style="background:${line.color}">${line.id}</div>
                    <div class="line-info"><h4>${line.name}</h4><p>${line.route}</p></div>
                </div>
            `).join('');

            linesContainer.querySelectorAll('.transport-line').forEach(el => el.addEventListener('click', () => {
                linesContainer.querySelectorAll('.transport-line').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                this.showSchedule(parseInt(el.dataset.frequency));
            }));
            document.getElementById('schedule-list').innerHTML = '<p class="schedule-empty">Selecciona una línea</p>';
        }

        showSchedule(frequency) {
            const now = new Date();
            const schedules = [];
            for (let i = 0; i < 5; i++) {
                const nextTime = new Date(now.getTime() + (i * frequency + Math.floor(Math.random() * 2)) * 60000);
                schedules.push({ time: `${nextTime.getHours().toString().padStart(2, '0')}:${nextTime.getMinutes().toString().padStart(2, '0')}`, eta: `${i * frequency} min` });
            }
            document.getElementById('schedule-list').innerHTML = schedules.map(s => `
                <div class="schedule-item"><div><div class="schedule-destination">Centro</div><div class="schedule-eta">en ${s.eta}</div></div><div class="schedule-time">${s.time}</div></div>
            `).join('');
        }

        showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            container.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    }

    // Custom marker styles
    const style = document.createElement('style');
    style.textContent = `.custom-marker { background: transparent; border: none; }
        .marker-dot { width: 16px; height: 16px; background: var(--accent-cyan); border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transition: transform 0.2s; }
        .marker-dot:hover { transform: scale(1.3); }
        .marker-dot[data-category="food"] { background: #f59e0b; }
        .marker-dot[data-category="culture"] { background: #8b5cf6; }
        .marker-dot[data-category="nature"] { background: #22c55e; }
        .marker-dot[data-category="art"] { background: #ec4899; }
        .marker-dot[data-category="shopping"] { background: #f97316; }`;
    document.head.appendChild(style);

    const app = new App();
    window.app = app;
    document.addEventListener('DOMContentLoaded', () => app.init());
})();
