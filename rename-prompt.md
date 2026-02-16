You are a naming assistant. Given a list of file paths and minimal context from a static website, suggest a new filename (basename only, same extension) for each file. Rules:
- Lowercase, kebab-case, no spaces. SEO-friendly and human-readable.
- For HTML: use page purpose (e.g. about-us.html, contact.html). Keep index.html as index.html.
- For CSS/JS: use purpose (e.g. main-styles.css, analytics.js).
- For images: use content (e.g. logo-infygate.webp, hero-banner.webp). Use alt/title when provided.
- Return a JSON object: keys = exact original path strings, values = new basename only (e.g. "main.css"). Preserve extension.
- Do not change path prefix (e.g. css/ stays css/ by returning "name.css" not "css/name.css").

Files and context:
[
  {
    "path": "404.html",
    "context": {
      "title": "",
      "first_heading": "404"
    }
  },
  {
    "path": "FAQ.html",
    "context": {
      "title": "FAQ",
      "first_heading": "FAQ"
    }
  },
  {
    "path": "about.html",
    "context": {
      "title": "About Us - MotoRover",
      "first_heading": "Our Story"
    }
  },
  {
    "path": "blog-riga-was-rocking.html",
    "context": {
      "title": "Riga was rocking",
      "first_heading": "MotoRover"
    }
  },
  {
    "path": "blog.html",
    "context": {
      "title": "",
      "first_heading": "BLOG"
    }
  },
  {
    "path": "blog_riga-was-rocking.html",
    "context": {
      "title": "Riga was rocking",
      "first_heading": "Riga was rocking"
    }
  },
  {
    "path": "car-balkan-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-balkan-brochure.html",
    "context": {
      "title": "Balkan Road Trip Brochure",
      "first_heading": "Balkan Self-Drive Road Trip Brochure"
    }
  },
  {
    "path": "car-balkan.html",
    "context": {
      "title": "Balkan Road Trip",
      "first_heading": "Balkan Self-Drive Road Trip 2026"
    }
  },
  {
    "path": "car-georgia-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-georgia-brochure.html",
    "context": {
      "title": "Georgia Self- Drive Road Trip Brochure",
      "first_heading": "Georgia Self-Drive Road Trip Brochure"
    }
  },
  {
    "path": "car-georgia-winter-adventure-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-georgia-winter-adventure-brochure.html",
    "context": {
      "title": "Georgia Snow Drive Brochure",
      "first_heading": "Georgia Snow Drive Brochure"
    }
  },
  {
    "path": "car-georgia-winter-adventure.html",
    "context": {
      "title": "Georgia Snow Drive",
      "first_heading": "Georgia Snow Drive 2026"
    }
  },
  {
    "path": "car-georgia.html",
    "context": {
      "title": "Georgia Self- Drive Road Trip",
      "first_heading": "Georgia Self-Drive Road Trip 2026"
    }
  },
  {
    "path": "car-kyrgyzstan-spring-edition-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation and Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-kyrgyzstan-spring-edition-brochure.html",
    "context": {
      "title": "Silk Route Self-Drive Road Trip Brochure",
      "first_heading": "Kyrgyzstan - The Silk Road Drive Brochure"
    }
  },
  {
    "path": "car-kyrgyzstan-spring-edition.html",
    "context": {
      "title": "Silk Route Self-Drive Car Road Trip",
      "first_heading": "Kyrgyzstan Self-Drive Road Trip 2026"
    }
  },
  {
    "path": "car-morocco-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-morocco-brochure.html",
    "context": {
      "title": "Morocco Self-Drive Car Road Trip Brochure",
      "first_heading": "Morocco Car Tour Brochure"
    }
  },
  {
    "path": "car-morocco.html",
    "context": {
      "title": "Morocco Self-Drive Car Tour",
      "first_heading": "Morocco Self- Drive Road Trip 2026"
    }
  },
  {
    "path": "car-new-zealand-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-new-zealand-brochure.html",
    "context": {
      "title": "New Zealand Road Trip Brochure",
      "first_heading": "New Zealand Road Trip Brochure"
    }
  },
  {
    "path": "car-new-zealand.html",
    "context": {
      "title": "New Zealand Road Trip",
      "first_heading": "New Zealand Road Trip 2024"
    }
  },
  {
    "path": "car-northeast-india-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-northeast-india-brochure.html",
    "context": {
      "title": "Morocco Self-Drive Car Road Trip 2019 Brochure",
      "first_heading": "Northeast India Road Trip Brochure"
    }
  },
  {
    "path": "car-northeast-india.html",
    "context": {
      "title": "Northeast India Road Trip",
      "first_heading": "Northeast India Road Trip 2023"
    }
  },
  {
    "path": "car-northern-europe-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-northern-europe-brochure.html",
    "context": {
      "title": "Northern Europe Self-Drive Road Trip Brochure",
      "first_heading": "Northern Europe Self-Drive Road Trip Brochure"
    }
  },
  {
    "path": "car-northern-europe.html",
    "context": {
      "title": "Northern Europe Self-Drive Road Trip",
      "first_heading": "Northern Europe Self-Drive Road Trip 2024"
    }
  },
  {
    "path": "car-scotland-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-scotland-coming-soon.html",
    "context": {
      "title": "Scotland Self-Drive Road Trip: Coming Soon",
      "first_heading": "Coming Soon"
    }
  },
  {
    "path": "car-scotland.html",
    "context": {
      "title": "Scotland Self-Drive Car Road Trip",
      "first_heading": "Scotland Self-Drive Road Trip 2018"
    }
  },
  {
    "path": "car-silk-route-autumn-edition-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation and Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-silk-route-autumn-edition-brochure.html",
    "context": {
      "title": "Silk Route Self-Drive Road Trip Brochure",
      "first_heading": "Kyrgyzstan - The Silk Road Drive Brochure"
    }
  },
  {
    "path": "car-silk-route-autumn-edition.html",
    "context": {
      "title": "Silk Route Self-Drive Car Road Trip",
      "first_heading": "Kyrgyzstan - The Silk Road Drive 2025"
    }
  },
  {
    "path": "car-silk-route-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation and Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-silk-route-brochure.html",
    "context": {
      "title": "Silk Route Self-Drive Road Trip Brochure",
      "first_heading": "Kyrgyzstan - The Silk Road Drive Brochure"
    }
  },
  {
    "path": "car-silk-route-snow-drive-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation and Age Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-silk-route-snow-drive-brochure.html",
    "context": {
      "title": "Kyrgyzstan Snow Drive Brochure",
      "first_heading": "Silk Route Snow Drive Brochure"
    }
  },
  {
    "path": "car-silk-route-snow-drive.html",
    "context": {
      "title": "Silk Route Snow Drive Car Road Trip",
      "first_heading": "Kyrgyzstan Snow Drive 2025"
    }
  },
  {
    "path": "car-silk-route-spring-edition-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation and Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-silk-route-spring-edition-brochure.html",
    "context": {
      "title": "Silk Route Self-Drive Road Trip Brochure",
      "first_heading": "Kyrgyzstan Self-Drive Road Trip Brochure"
    }
  },
  {
    "path": "car-silk-route-spring-edition.html",
    "context": {
      "title": "Silk Route Self-Drive Car Road Trip",
      "first_heading": "Kyrgyzstan Self-Drive Road Trip 2026"
    }
  },
  {
    "path": "car-silk-route.html",
    "context": {
      "title": "Silk Route Self-Drive Car Road Trip",
      "first_heading": "Kyrgyzstan - The Silk Road Drive 2025"
    }
  },
  {
    "path": "car-south-africa-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-south-africa-brochure.html",
    "context": {
      "title": "South Africa Road Trip Brochure",
      "first_heading": "South Africa Road Trip Brochure"
    }
  },
  {
    "path": "car-south-africa.html",
    "context": {
      "title": "South Africa Self- Drive Road Trip",
      "first_heading": "South Africa Self- Drive Road Trip 2025"
    }
  },
  {
    "path": "car-spain-and-france-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation and Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "car-spain-and-france-brochure.html",
    "context": {
      "title": "Spain & France Car Tour Brochure",
      "first_heading": "Spain and France Car Tour Brochure"
    }
  },
  {
    "path": "car-spain-and-france.html",
    "context": {
      "title": "Spain & France Self-Drive Car Road Trip",
      "first_heading": "Spain & France Self-Drive Road Trip 2018"
    }
  },
  {
    "path": "contactus.html",
    "context": {
      "title": "Contact",
      "first_heading": "CONTACT"
    }
  },
  {
    "path": "css/internal-styles.css",
    "context": {
      "path": "css/internal-styles.css"
    }
  },
  {
    "path": "css/styles.css",
    "context": {
      "path": "css/styles.css"
    }
  },
  {
    "path": "index.html",
    "context": {
      "title": "MotoRover - Motorcycle Tours & Self-Drive Car Road Trips",
      "first_heading": "Georgia"
    }
  },
  {
    "path": "js/main.js",
    "context": {
      "path": "js/main.js"
    }
  },
  {
    "path": "js/theme.js",
    "context": {
      "path": "js/theme.js"
    }
  },
  {
    "path": "media.html",
    "context": {
      "title": "Media",
      "first_heading": "MEDIA"
    }
  },
  {
    "path": "motorcycle-andalucia-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-andalucia-brochure.html",
    "context": {
      "title": "Southern Spain & Portugal Motorcycle Tour Brochure",
      "first_heading": "Southern Spain & Portugal Motorcycle Tour Brochure"
    }
  },
  {
    "path": "motorcycle-andalucia.html",
    "context": {
      "title": "Southern Spain & Portugal Motorcycle Tour",
      "first_heading": "Southern Spain & Portugal Motorcycle Tour 2025"
    }
  },
  {
    "path": "motorcycle-balkan-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-balkan-brochure.html",
    "context": {
      "title": "Balkan Motorcycle Tour Brochure",
      "first_heading": "Balkan Motorcycle Tour Brochure"
    }
  },
  {
    "path": "motorcycle-balkan.html",
    "context": {
      "title": "Balkan Motorcycle Tour",
      "first_heading": "Balkan Motorcycle Tour 2026"
    }
  },
  {
    "path": "motorcycle-georgia-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-georgia-brochure.html",
    "context": {
      "title": "Georgia Motorcycle Tour Brochure",
      "first_heading": "Georgia Motorcycle Tour Brochure"
    }
  },
  {
    "path": "motorcycle-georgia.html",
    "context": {
      "title": "Georgia Motorcycle Tour",
      "first_heading": "Georgia Motorcycle Tour 2026"
    }
  },
  {
    "path": "motorcycle-morocco-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-morocco-brochure.html",
    "context": {
      "title": "Morocco Motorcycle Tour 2019 Brochure",
      "first_heading": "Morocco Motorcycle Tour Brochure"
    }
  },
  {
    "path": "motorcycle-morocco.html",
    "context": {
      "title": "Morocco Motorcycle Tour",
      "first_heading": "Morocco Motorcycle Tour 2026"
    }
  },
  {
    "path": "motorcycle-new-zealand-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-new-zealand-brochure.html",
    "context": {
      "title": "New Zealand Motorcycle Tour Brochure",
      "first_heading": "New Zealand Motorcycle Tour Brochure"
    }
  },
  {
    "path": "motorcycle-new-zealand.html",
    "context": {
      "title": "New Zealand Motorcycle Tour",
      "first_heading": "New Zealand Motorcycle Tour 2024"
    }
  },
  {
    "path": "motorcycle-northern-europe-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-northern-europe-brochure.html",
    "context": {
      "title": "Northern Europe Motorcycle Tour Brochure",
      "first_heading": "Northern Europe Motorcycle Tour\u00a0Brochure"
    }
  },
  {
    "path": "motorcycle-northern-europe.html",
    "context": {
      "title": "Northern Europe Motorcycle Tour",
      "first_heading": "Northern Europe Motorcycle Tour 2024"
    }
  },
  {
    "path": "motorcycle-scotland-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-scotland.html",
    "context": {
      "title": "Scotland Motorcycle Tour",
      "first_heading": "Scotland Motorcycle Tour 2018"
    }
  },
  {
    "path": "motorcycle-silk-route-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation and Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-silk-route-brochure.html",
    "context": {
      "title": "Silk Route Motorcycle Tour Brochure",
      "first_heading": "Silk Route Motorcycle Tour Brochure"
    }
  },
  {
    "path": "motorcycle-silk-route.html",
    "context": {
      "title": "Silk Route Motorcycle Tour",
      "first_heading": "Kyrgyzstan Motorcycle Tour 2025"
    }
  },
  {
    "path": "motorcycle-south-africa-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-south-africa-brochure.html",
    "context": {
      "title": "South Africa Motorcycle Tour Brochure",
      "first_heading": "South Africa Motorcycle Tour Brochure"
    }
  },
  {
    "path": "motorcycle-south-africa.html",
    "context": {
      "title": "South Africa Motorcycle Tour",
      "first_heading": "South Africa Motorcycle Tour 2025"
    }
  },
  {
    "path": "motorcycle-spain--france-brochure-thanks.html",
    "context": {
      "title": "MotoRover - Motorcycle Tours & Self-Drive Car Road Trips",
      "first_heading": ""
    }
  },
  {
    "path": "motorcycle-spain--france-enquiry-thanks.html",
    "context": {
      "title": "MotoRover - Motorcycle Tours & Self-Drive Car Road Trips",
      "first_heading": ""
    }
  },
  {
    "path": "motorcycle-spain-and-france-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation and Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-spain-and-france-brochure.html",
    "context": {
      "title": "Spain & France Motorcycle Tour Brochure",
      "first_heading": "Spain and France Motorcycle Tour Brochure"
    }
  },
  {
    "path": "motorcycle-spain-and-france.html",
    "context": {
      "title": "Spain & France Motorcycle Tour",
      "first_heading": "Spain & France Motorcycle Tour 2025"
    }
  },
  {
    "path": "motorcycle-ultimate-alps-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation & Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "motorcycle-ultimate-alps-brochure.html",
    "context": {
      "title": "Ultimate Alps Motorcycle Tour Brochure",
      "first_heading": "Ultimate Alps Motorcycle Tour Brochure"
    }
  },
  {
    "path": "motorcycle-ultimate-alps.html",
    "context": {
      "title": "Ultimate Alps Motorcycle Tour",
      "first_heading": "Ultimate Alps Motorcycle Tour 2026"
    }
  },
  {
    "path": "payment.html",
    "context": {
      "title": "Online Payment",
      "first_heading": "MAKE A PAYMENT"
    }
  },
  {
    "path": "privacy-terms-refund-pricing.html",
    "context": {
      "title": "Website Terms And conditions",
      "first_heading": ""
    }
  },
  {
    "path": "russia-winter-adventure-booking-policy.html",
    "context": {
      "title": "Booking, Cancellation and Child Policy",
      "first_heading": "MOTOROVER BOOKING POLICY"
    }
  },
  {
    "path": "russia-winter-adventure-brochure.html",
    "context": {
      "title": "Silk Route Self-Drive Road Trip Brochure",
      "first_heading": "Russia Winter Adventure Brochure"
    }
  },
  {
    "path": "russia-winter-adventure.html",
    "context": {
      "title": "Russia Winter Adventure",
      "first_heading": "Russia Winter Adventure 2026"
    }
  },
  {
    "path": "silk-route-brochure-thank-you.html",
    "context": {
      "title": "MotoRover - Motorcycle Tours & Self-Drive Car Road Trips",
      "first_heading": ""
    }
  },
  {
    "path": "silk-route-enquiry-may-thank-you.html",
    "context": {
      "title": "MotoRover - Motorcycle Tours & Self-Drive Car Road Trips",
      "first_heading": ""
    }
  },
  {
    "path": "the-team.html",
    "context": {
      "title": "Motorover | The Team",
      "first_heading": "TEAM"
    }
  },
  {
    "path": "tours.html",
    "context": {
      "title": "Motorcycle Group Tours",
      "first_heading": "MOTORCYCLE GROUP TOURS"
    }
  },
  {
    "path": "why-us.html",
    "context": {
      "title": "Why Us",
      "first_heading": "WHY US"
    }
  }
]

Return only a JSON object mapping each path to its new basename (same extension). No other text.