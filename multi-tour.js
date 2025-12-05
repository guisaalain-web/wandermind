// WanderMind Multi-Tour Manager
// Handles multi-city selection and professional itinerary generation

(function () {
    'use strict';

    // Multi-City Tour Manager
    class MultiTourManager {
        constructor() {
            this.selectedCities = [];
            this.maxCities = 5;
            this.init();
        }

        init() {
            this.setupQuickCityButtons();
            this.setupCitySearch();
            this.setupGenerateButton();
            console.log('MultiTourManager initialized');
        }

        setupQuickCityButtons() {
            document.querySelectorAll('.quick-city-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const cityKey = btn.dataset.city;
                    if (this.selectedCities.includes(cityKey)) {
                        this.removeCity(cityKey);
                        btn.classList.remove('selected');
                    } else {
                        this.addCity(cityKey);
                        btn.classList.add('selected');
                    }
                });
            });
        }

        setupCitySearch() {
            const searchInput = document.getElementById('city-search');
            const resultsContainer = document.getElementById('city-search-results');

            if (!searchInput) return;

            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                if (query.length < 2) {
                    resultsContainer.innerHTML = '';
                    resultsContainer.style.display = 'none';
                    return;
                }

                // Search in CITIES_TRANSPORT
                const matches = Object.keys(CITIES_TRANSPORT).filter(key => {
                    const city = CITIES_TRANSPORT[key];
                    return city.name.toLowerCase().includes(query) ||
                        city.country.toLowerCase().includes(query);
                });

                if (matches.length > 0) {
                    resultsContainer.innerHTML = matches.map(key => {
                        const city = CITIES_TRANSPORT[key];
                        const isSelected = this.selectedCities.includes(key);
                        return `
                            <div class="city-result ${isSelected ? 'selected' : ''}" data-city="${key}">
                                <span class="city-name">${city.name}</span>
                                <span class="city-country">${city.country}</span>
                                ${isSelected ? '<span class="check">✓</span>' : ''}
                            </div>
                        `;
                    }).join('');
                    resultsContainer.style.display = 'block';

                    // Add click handlers
                    resultsContainer.querySelectorAll('.city-result').forEach(result => {
                        result.addEventListener('click', () => {
                            const cityKey = result.dataset.city;
                            if (this.selectedCities.includes(cityKey)) {
                                this.removeCity(cityKey);
                            } else {
                                this.addCity(cityKey);
                            }
                            searchInput.value = '';
                            resultsContainer.style.display = 'none';
                        });
                    });
                } else {
                    resultsContainer.innerHTML = '<div class="no-results">No se encontraron ciudades</div>';
                    resultsContainer.style.display = 'block';
                }
            });

            // Close results on click outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.city-search-container')) {
                    resultsContainer.style.display = 'none';
                }
            });
        }

        setupGenerateButton() {
            const generateBtn = document.getElementById('generate-tour');
            if (generateBtn) {
                generateBtn.addEventListener('click', () => this.generateItinerary());
            }
        }

        addCity(cityKey) {
            if (this.selectedCities.length >= this.maxCities) {
                this.showToast('Máximo ' + this.maxCities + ' ciudades permitidas', 'warning');
                return;
            }

            if (!this.selectedCities.includes(cityKey)) {
                this.selectedCities.push(cityKey);
                this.updateCityChips();
                this.updateQuickButtons();
                this.showTourConfig();
            }
        }

        removeCity(cityKey) {
            this.selectedCities = this.selectedCities.filter(c => c !== cityKey);
            this.updateCityChips();
            this.updateQuickButtons();

            if (this.selectedCities.length === 0) {
                this.hideTourConfig();
            }
        }

        updateCityChips() {
            const container = document.getElementById('cities-chips');
            const hint = document.getElementById('cities-hint');

            if (this.selectedCities.length === 0) {
                container.innerHTML = '';
                hint.style.display = 'block';
                return;
            }

            hint.style.display = 'none';
            container.innerHTML = this.selectedCities.map(cityKey => {
                const city = CITIES_TRANSPORT[cityKey];
                return `
                    <div class="city-chip" data-city="${cityKey}">
                        <span class="chip-name">${city.name}</span>
                        <button class="chip-remove" data-city="${cityKey}">×</button>
                    </div>
                `;
            }).join('<span class="chip-arrow">→</span>');

            // Add remove handlers
            container.querySelectorAll('.chip-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.removeCity(btn.dataset.city);
                });
            });
        }

        updateQuickButtons() {
            document.querySelectorAll('.quick-city-btn').forEach(btn => {
                const cityKey = btn.dataset.city;
                if (this.selectedCities.includes(cityKey)) {
                    btn.classList.add('selected');
                } else {
                    btn.classList.remove('selected');
                }
            });
        }

        showTourConfig() {
            const config = document.getElementById('tour-config');
            if (config) {
                config.style.display = 'block';
            }
        }

        hideTourConfig() {
            const config = document.getElementById('tour-config');
            if (config) {
                config.style.display = 'none';
            }
        }

        generateItinerary() {
            if (this.selectedCities.length === 0) {
                this.showToast('Selecciona al menos una ciudad', 'error');
                return;
            }

            const days = parseInt(document.getElementById('tour-days').value);
            const style = document.getElementById('tour-style').value;

            // Generate using ProfessionalItineraryGenerator
            const generator = new ProfessionalItineraryGenerator(this.selectedCities, days, style);
            const itinerary = generator.generate();

            // Render itinerary
            this.renderItinerary(itinerary);

            // Scroll to itinerary section
            document.getElementById('itinerary').scrollIntoView({ behavior: 'smooth' });
        }

        renderItinerary(itinerary) {
            const emptyState = document.getElementById('itinerary-empty');
            const contentContainer = document.getElementById('itinerary-content');

            emptyState.style.display = 'none';
            contentContainer.style.display = 'block';

            // Generate HTML
            let html = `
                <div class="itinerary-header">
                    <h3 class="itinerary-title">${itinerary.title}</h3>
                    <div class="itinerary-meta">
                        <span class="meta-item">📅 ${itinerary.totalDays} días</span>
                        <span class="meta-item">${itinerary.style.icon} ${itinerary.style.name}</span>
                        <span class="meta-item">💰 ~${Math.round(itinerary.totalEstimatedCost)}€ estimado</span>
                    </div>
                </div>

                <div class="transport-links">
                    <h4>🚇 Enlaces de Transporte Oficial</h4>
                    <div class="transport-grid">
                        ${itinerary.transportLinks.map(t => this.renderTransportLinks(t)).join('')}
                    </div>
                </div>

                <div class="days-container">
                    ${itinerary.dailyPlans.map(day => this.renderDay(day)).join('')}
                </div>
            `;

            contentContainer.innerHTML = html;
        }

        renderTransportLinks(transportInfo) {
            const t = transportInfo.transport;
            let linksHtml = '';

            if (t.metro) {
                linksHtml += `
                    <a href="${t.metro.url}" target="_blank" class="transport-link metro">
                        <span class="transport-icon">🚇</span>
                        <span class="transport-name">${t.metro.name}</span>
                        <span class="transport-price">${t.metro.ticketPrice}</span>
                    </a>
                `;
            }
            if (t.bus) {
                linksHtml += `
                    <a href="${t.bus.url}" target="_blank" class="transport-link bus">
                        <span class="transport-icon">🚌</span>
                        <span class="transport-name">${t.bus.name}</span>
                        <span class="transport-price">${t.bus.ticketPrice || 'Ver web'}</span>
                    </a>
                `;
            }
            if (t.train) {
                linksHtml += `
                    <a href="${t.train.url}" target="_blank" class="transport-link train">
                        <span class="transport-icon">🚆</span>
                        <span class="transport-name">${t.train.name}</span>
                        <span class="transport-price">${t.train.ticketPrice}</span>
                    </a>
                `;
            }
            if (t.tram) {
                linksHtml += `
                    <a href="${t.tram.url}" target="_blank" class="transport-link tram">
                        <span class="transport-icon">🚊</span>
                        <span class="transport-name">${t.tram.name || 'Tram'}</span>
                        <span class="transport-price">${t.tram.ticketPrice}</span>
                    </a>
                `;
            }

            return `
                <div class="city-transport">
                    <h5>${transportInfo.city}</h5>
                    <div class="transport-links-list">
                        ${linksHtml}
                    </div>
                </div>
            `;
        }

        renderDay(day) {
            return `
                <div class="day-card">
                    <div class="day-header">
                        <span class="day-number">Día ${day.day}</span>
                        <span class="day-city">${day.city}, ${day.country}</span>
                        <span class="day-date">${day.date}</span>
                    </div>
                    <div class="day-sections">
                        ${day.sections.map(section => this.renderSection(section)).join('')}
                    </div>
                </div>
            `;
        }

        renderSection(section) {
            if (section.timeOfDay === 'lunch') {
                return `
                    <div class="day-section lunch-section">
                        <div class="section-header">
                            <span class="section-icon">${section.icon}</span>
                            <span class="section-title">${section.title}</span>
                            <span class="section-time">${section.timeRange}</span>
                        </div>
                        <div class="section-content">
                            <div class="food-recommendation">
                                <strong>🍽️ ${section.recommendation.name}</strong>
                                <p>📍 ${section.recommendation.where}</p>
                                <span class="food-price">${section.recommendation.price}</span>
                            </div>
                        </div>
                    </div>
                `;
            }

            return `
                <div class="day-section ${section.timeOfDay}-section">
                    <div class="section-header">
                        <span class="section-icon">${section.icon}</span>
                        <span class="section-title">${section.title}</span>
                        <span class="section-time">${section.timeRange}</span>
                    </div>
                    <div class="section-content">
                        ${section.activities ? section.activities.map(act => this.renderActivity(act)).join('') : ''}
                        ${section.transport ? this.renderTransportTip(section.transport) : ''}
                    </div>
                </div>
            `;
        }

        renderActivity(activity) {
            const priceClass = activity.price === 0 ? 'free' : 'paid';
            const priceText = activity.price === 0 ? 'GRATIS' : `${activity.price}€`;

            return `
                <div class="activity-item">
                    <div class="activity-main">
                        <span class="activity-name">${activity.name}</span>
                        <span class="activity-duration">⏱️ ${activity.duration} min</span>
                    </div>
                    <div class="activity-details">
                        <span class="activity-price ${priceClass}">${priceText}</span>
                        ${activity.freeDay ? `<span class="free-tip">💡 Gratis: ${activity.freeDay}</span>` : ''}
                        ${activity.rating ? `<span class="activity-rating">⭐ ${activity.rating}</span>` : ''}
                    </div>
                    ${activity.tip ? `<p class="activity-tip">💡 ${activity.tip}</p>` : ''}
                </div>
            `;
        }

        renderTransportTip(transport) {
            return `
                <div class="transport-tip">
                    <span class="transport-label">🚇 Cómo llegar:</span>
                    <a href="${transport.url}" target="_blank" class="transport-link-inline">
                        ${transport.name} (${transport.estimatedTime}, ${transport.price})
                    </a>
                </div>
            `;
        }

        showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            container.appendChild(toast);

            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        window.multiTourManager = new MultiTourManager();
    });

})();
