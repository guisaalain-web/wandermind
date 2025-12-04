"""
Script to merge Skyscanner design with full functionality
"""

# Read the backup file to get functional sections
with open('index-backup.html', 'r', encoding='utf-8') as f:
    backup_content = f.read()

# Read the demo file to get the new hero section
with open('demo-skyscanner.html', 'r', encoding='utf-8') as f:
    demo_content = f.read()

# Extract sections from backup
import re

# Find preferences section
prefs_match = re.search(r'(<section id="preferences".*?</section>)', backup_content, re.DOTALL)
preferences_section = prefs_match.group(1) if prefs_match else ""

# Find routes section  
routes_match = re.search(r'(<section id="routes".*?</section>)', backup_content, re.DOTALL)
routes_section = routes_match.group(1) if routes_match else ""

# Find map section
map_match = re.search(r'(<section id="map-section".*?</section>)', backup_content, re.DOTALL)
map_section = map_match.group(1) if map_match else ""

# Find events section
events_match = re.search(r'(<section id="events".*?</section>)', backup_content, re.DOTALL)
events_section = events_match.group(1) if events_match else ""

# Find transport section
transport_match = re.search(r'(<section id="transport".*?</section>)', backup_content, re.DOTALL)
transport_section = transport_match.group(1) if transport_match else ""

# Find modal
modal_match = re.search(r'(<!-- Modal Wizard -->.*?</div>\s*</div>\s*</div>)', backup_content, re.DOTALL)
modal_section = modal_match.group(1) if modal_match else ""

# Find affiliate section
affiliate_match = re.search(r'(<!-- 🏨 AFILIADOS.*?</section>)', backup_content, re.DOTALL)
affiliate_section = affiliate_match.group(1) if affiliate_match else ""

# Find ad sections
ad1_match = re.search(r'(<!-- 📢 ANUNCIO 1.*?</div>\s*</div>)', backup_content, re.DOTALL)
ad1_section = ad1_match.group(1) if ad1_match else ""

ad2_match = re.search(r'(<!-- 📢 ANUNCIO 2.*?</div>\s*</div>)', backup_content, re.DOTALL)
ad2_section = ad2_match.group(1) if ad2_match else ""

ad3_match = re.search(r'(<!-- 📢 ANUNCIO 3.*?</div>\s*</div>)', backup_content, re.DOTALL)
ad3_section = ad3_match.group(1) if ad3_match else ""

# Find footer
footer_match = re.search(r'(<footer.*?</footer>)', backup_content, re.DOTALL)
footer_section = footer_match.group(1) if footer_match else ""

# Find toast container
toast_match = re.search(r'(<div class="toast-container".*?</div>)', backup_content, re.DOTALL)
toast_section = toast_match.group(1) if toast_match else ""

# Find scripts
scripts_match = re.search(r'(<script src="https://unpkg.com/leaflet.*?</body>)', backup_content, re.DOTALL)
scripts_section = scripts_match.group(1) if scripts_match else ""

print("Sections extracted successfully!")
print(f"Preferences: {len(preferences_section)} chars")
print(f"Routes: {len(routes_section)} chars")
print(f"Map: {len(map_section)} chars")
print(f"Events: {len(events_section)} chars")
print(f"Transport: {len(transport_section)} chars")
print(f"Modal: {len(modal_section)} chars")
print(f"Scripts: {len(scripts_section)} chars")

# Now build the new index.html
# Get head from backup
head_match = re.search(r'(<!DOCTYPE html>.*?</head>)', backup_content, re.DOTALL)
head_section = head_match.group(1) if head_match else ""

# Add skyscanner CSS to head
head_section = head_section.replace('</head>', '    <link rel="stylesheet" href="skyscanner-style.css">\n</head>')

# Get header from backup
header_match = re.search(r'(<header>.*?</header>)', backup_content, re.DOTALL)
header_section = header_match.group(1) if header_match else ""

# Get hero from demo
hero_match = re.search(r'(<section id="home".*?</section>)', demo_content, re.DOTALL)
hero_section = hero_match.group(1) if hero_match else ""

# Build complete HTML
new_html = f"""{head_section}

<body>
    <a href="#main-content" class="skip-link">Saltar al contenido</a>

    {header_section}

    <main id="main-content">
        {hero_section}

        {ad1_section}

        {affiliate_section}

        {modal_section}

        {preferences_section}

        {routes_section}

        {ad2_section}

        {map_section}

        {events_section}

        {transport_section}

        {ad3_section}
    </main>

    {footer_section}

    {toast_section}

    {scripts_section}
"""

# Write to new file
with open('index-new.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("\n✅ New index-new.html created successfully!")
print("Review it and then rename to index.html")
