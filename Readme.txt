FreeUnApp Website – README

Overview
- This repository contains the public website for FreeUnApp, built as a responsive, static site using Bootstrap 5.3. It includes polished UI components, animated sections, a brand preloader, and optimized favicon support.

Quick Start
- Option A: Open locally
  - Double-click index.html to open in your browser.
- Option B: Serve with a local web server (recommended for best behavior)
  - Python: python3 -m http.server 5500
  - Then visit: http://localhost:5500/
  - VS Code: Use “Live Server” extension

Project Structure
- index.html                 Home page
- about.html                 About page
- pricing.html               Pricing + Terms and Privacy sections
- Services.html              Services page
- trainers.html              Team/Trainers page
- events.html                Events page
- contact.html               Contact page (static form UI)
- assets/css/main.css        Main stylesheet (colors, layout, animations)
- assets/js/main.js          Behavior (nav, AOS, Swiper, preloader)
- assets/vendor/...          Third‑party libraries (Bootstrap, AOS, GLightbox, Swiper, PureCounter)
- assets/img/                Images and icons (includes logo, favicon, apple touch icon)
- forms/                     Placeholder endpoints (AJAX/PHP form is pro-version only)

Key Features
- Responsive layout with Bootstrap 5.3
- Animated on scroll (AOS), sliders (Swiper), lightbox (GLightbox)
- PureCounter stats support
- Brand‑focused preloader with smooth fade‑out
- Optimized favicon and Apple touch icon for crisp tab/shortcut icons

Brand & Identity
- Header/logo image: assets/img/FUA LOGO withNoBg.png
  - Header sizing is controlled in assets/css/main.css under .header .logo img
- Favicon: assets/img/favicon.png (PNG)
- Apple touch icon: assets/img/apple-touch-icon.png (PNG)
  - Recommended sizes:
    - Favicon PNG: 48–64 px exported from a square logo (a 512×512 master is ideal)
    - Apple touch icon PNG: 180×180
- Favicon links are already wired on all pages’ <head>:
  - <link href="assets/img/favicon.png" rel="icon" type="image/png" />
  - <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

Preloader
- What it is: A full‑screen overlay showing the FreeUnApp logo with a clean spinner and subtle “breathe” animation.
- Where defined:
  - Markup: Each page near the bottom contains:
    <div id="preloader" aria-hidden="true">
      <div class="preloader-inner">
        <div class="preloader-logo">
          <img src="assets/img/FUA LOGO withNoBg.png" alt="FreeUnApp" />
        </div>
        <div class="preloader-spinner" aria-label="Loading"></div>
      </div>
    </div>
  - Styles: assets/css/main.css (look for “# Preloader” section)
  - Behavior: assets/js/main.js (add class preloader-fade on load, then remove)
- How it works:
  - On window load, the script adds .preloader-fade to #preloader to trigger a CSS opacity/visibility transition, then removes it from the DOM.
- Customize:
  - Logo: replace the img src in the preloader markup or swap the asset.
  - Spinner speed: adjust animation: preloader-spin 0.8s linear infinite in CSS.
  - Breathe effect: adjust @keyframes preloader-logo-breathe scale values.
  - Fade duration: change transition timing on #preloader in CSS.
- Disable:
  - Remove the #preloader markup from pages and/or remove the Preloader block in assets/js/main.js.

Colors & Theme
- Global color tokens are defined at the top of assets/css/main.css under :root (e.g., --accent-color, --heading-color, --background-color).
- Change these to re‑theme the site consistently.

Animations & Libraries
- AOS (Animate On Scroll): initialized in assets/js/main.js → adjust duration/easing or disable as needed.
- Swiper: each slider block includes a <script type="application/json" class="swiper-config"> for per‑slider config.
- GLightbox: initialized with selector .glightbox.
- PureCounter: auto‑initialized for stats.

Images & Performance
- Place all images in assets/img/.
- Use compressed images (JPG/WEBP where possible) for better load times.
- Keep hero/background images under sensible sizes; aim < 300–500 KB where possible.

SEO Tips
- Update <title>, meta description, and keywords per page.
- Consider Open Graph/Twitter meta tags for rich sharing.
- Provide meaningful alt text for images.

Accessibility
- Preloader and animations respect prefers‑reduced‑motion (CSS included).
- Ensure all decorative images have empty alt or role="presentation"; content images need descriptive alt.

Deploying
- GitHub Pages
  - Push this folder to a GitHub repo
  - In repo Settings → Pages, set Source to main branch, root folder (or /docs if you move files)
  - Wait for the URL to be provisioned
- Netlify
  - Drag & drop the project folder into the Netlify dashboard, or connect the Git repo
  - Publish directory: the project root
- cPanel/Shared Hosting
  - Upload all files/folders to public_html (or your site root)

Contact Form
- The included forms are UI-only. A working PHP/AJAX contact form is part of the template’s pro version. See forms/Readme.txt for details.
- To integrate your own backend, point form action to your endpoint and handle POST submissions server‑side.

Maintenance
- Vendor libraries are included locally under assets/vendor. Update only if needed and test carefully.
- Keep images optimized and remove unused assets to keep the site light.

Credits & License
- Base Template: BootstrapMade “FreeUnApp” (free version)
  - Template URL: https://bootstrapmade.com/FreeUnApp-free-education-bootstrap-theme/
  - License: https://bootstrapmade.com/license/
- Customizations: FreeUnApp team (branding, preloader, content, styling, structure)

Support & Contact
- General inquiries: info@freeunapp.org
- Website issues/requests: open a ticket in your project tracker or contact the web maintainer.
