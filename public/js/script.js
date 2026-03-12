document.addEventListener('DOMContentLoaded', () => {
  const setText = (element, text) => {
    if (element && typeof text === 'string') {
      element.textContent = text;
    }
  };

  const setHTML = (element, html) => {
    if (element && typeof html === 'string') {
      element.innerHTML = html;
    }
  };

  const setNodeTexts = (nodes, values) => {
    if (!nodes || !values) return;
    nodes.forEach((node, index) => {
      if (values[index] !== undefined) {
        setText(node, values[index]);
      }
    });
  };

  const translations = {
    es: {
      pageTitle: 'DRINKS ON CHAIN',
      logo: 'DRINKS ON CHAIN',
      switcherLabel: 'Idioma',
      nav: {
        links: ['Proyecto', 'Como Funciona', 'Beneficios', 'Trazabilidad', 'Contacto'],
        cta: 'Unete a la Pre-Venta',
        menu: 'Menu'
      },
      hero: {
        label: 'Real World Assets - Stellar Network',
        title: 'El Vino Ahora Vive<br>en la Blockchain',
        subtitle: 'Compra tokens que representan botellas reales de vino boliviano. Financia la produccion. Observa como crece su valor. Redime tu botella.',
        ctas: ['Explorar Pre-Venta ->', 'Ver Como Funciona ->'],
        stats: [
          ['Red', 'Stellar Network'],
          ['Activo', '1 Token = 1 Botella'],
          ['Origen', 'Samaipata, Bolivia'],
          ['Modelo', 'Non-Custodial']
        ]
      },
      problem: {
        label: 'El Problema',
        title: 'El 80% de los pequenos vinedos<br>no acceden a financiamiento temprano',
        producerTitle: 'Para el Productor',
        producerText: 'Los vinedos pequenos y medianos en Bolivia dependen de intermediarios, enfrentan costos financieros altos y no pueden vender su produccion antes de embotellar. Esto limita su crecimiento y los deja vulnerables ante cada temporada.',
        consumerTitle: 'Para el Consumidor',
        consumerText: 'Los consumidores pagan el precio final sin beneficiarse de la apreciacion del producto. No pueden verificar el origen, el proceso de produccion ni la autenticidad de lo que compran. La cadena de valor es opaca.',
        cards: [
          ['Sin financiamiento', 'Los vinedos no acceden a capital antes de la cosecha'],
          ['Intermediarios', 'Multiples intermediarios encarecen el producto final'],
          ['Sin transparencia', 'El consumidor no puede verificar origen ni autenticidad']
        ]
      },
      solution: {
        label: 'La Solucion',
        title: 'Tokenizamos Cada Botella<br>en la Red Stellar',
        description: 'DRINKS ON CHAIN convierte botellas reales de vino en activos digitales sobre la blockchain de Stellar. Cada token es respaldado 1:1 por una botella producida por Vinedo 1970 en Samaipata, Bolivia.',
        cards: [
          ['Pre-Venta Tokenizada', 'Compra tokens durante la fase de produccion a precio preferencial. Financia directamente al vinedo sin intermediarios.'],
          ['Trazabilidad On-Chain', 'Cada botella tiene un QR que enlaza a su historial completo en Stellar: origen, produccion, transferencias y autenticidad.'],
          ['Redencion Real', 'Cuando estes listo, canjea tu token por una botella fisica en el vinedo o puntos autorizados. El token se retira de circulacion.']
        ]
      },
      works: {
        label: 'Como Funciona',
        title: 'De la Cepa a Tu Wallet<br>en 5 Pasos',
        steps: [
          ['El Vinedo Emite el Activo', 'Vinedo 1970 crea un activo nativo en Stellar. Cada token representa una botella real de vino en produccion.', 'Detalle tecnico: Asset nativo Stellar con cuenta issuer + distributor'],
          ['Compra en Pre-Venta', 'Adquiere tokens a precio preferencial usando USDC. Tu compra financia directamente la produccion y embotellado.', 'Detalle tecnico: Pago asegurado con escrow via Trustless Work SDK'],
          ['Tu Token Gana Valor', 'A medida que avanza la produccion, el valor de referencia de tu token aumenta por hitos completados.', 'Detalle: +20% al embotellar / +10% al inicio de ventas oficiales'],
          ['Canjea Tu Botella', 'Presenta tu token en el vinedo o un punto autorizado. Recibes tu botella fisica y el token se quema (sale de circulacion).', 'Detalle tecnico: Burn transaction verificable en Stellar'],
          ['Escanea y Verifica', 'Cada botella incluye un codigo QR. Escanealo para ver el historial completo: hash de transaccion, metadata y cadena de transferencias.', 'Detalle tecnico: Enlace directo a Stellar Explorer + metadata on-chain']
        ]
      },
      stats: {
        title: 'Numeros que Hablan',
        labels: ['Cada Token = 1 Botella Real', 'Apreciacion Potencial por Ciclo', 'Intermediarios en la Cadena', 'Trazable desde la Cepa'],
        description: 'Cada transaccion es verificable en la blockchain de Stellar.<br>Sin custodia de terceros. Sin opacidad. Sin letra pequena.'
      },
      origin: {
        label: 'El Origen',
        title: 'Vinedo 1970<br>Samaipata, Bolivia',
        paragraphs: [
          'Enclavado en los valles de Samaipata, a 1.750 metros sobre el nivel del mar, Vinedo 1970 produce vino artesanal con uvas cultivadas en uno de los terroirs mas singulares de Sudamerica.',
          'Con decadas de tradicion vinicola, el vinedo combina metodos ancestrales con innovacion. DRINKS ON CHAIN es el puente entre esa tradicion y la tecnologia blockchain, permitiendo que el mundo participe directamente en cada cosecha.',
          'Este proyecto nace para demostrar que la tokenizacion de activos reales no es solo teoria: es una herramienta concreta para financiar, transparentar y democratizar el acceso a productos con denominacion de origen.'
        ],
        data: [
          ['Ubicacion', 'Samaipata, Santa Cruz, Bolivia'],
          ['Altitud', '1.750 msnm'],
          ['Producto', 'Vino artesanal de altura'],
          ['Tradicion', 'Decadas de produccion vinicola']
        ]
      },
      tech: {
        label: 'Tecnologia',
        title: 'Construido Sobre Stellar.<br>Seguro por Diseno.',
        description: 'Usamos la infraestructura de Stellar Network porque ofrece transacciones rapidas, de bajo costo y con el estandar de seguridad que los activos reales requieren.',
        cards: [
          ['Assets Nativos de Stellar', 'Los tokens son activos nativos de la red, no smart contracts complejos. Esto garantiza velocidad, bajo costo y compatibilidad con todo el ecosistema Stellar.'],
          ['Non-Custodial', 'Nunca tocamos tus llaves privadas. El backend construye la transaccion (XDR), pero solo tu firmas desde tu wallet personal (Freighter, Lobstr o Albedo).'],
          ['Escrow Verificable', 'Los pagos de pre-venta estan asegurados mediante Trustless Work SDK. Fondos liberados por hitos verificables, no por confianza ciega.'],
          ['Metadata On-Chain', 'Cada activo incluye metadata vinculada: varietal, cosecha, lote, proceso de produccion. Todo verificable y publico siguiendo estandares SEP-1.']
        ],
        walletsLabel: 'Wallets compatibles'
      },
      benefits: {
        label: 'Beneficios',
        title: 'Ganan Todos',
        producerTitle: 'Para el Productor (Vinedo)',
        producerItems: [
          'Financiamiento antes de la cosecha, sin deuda',
          'Eliminacion de intermediarios',
          'Relacion directa con el consumidor final',
          'Promocion internacional del vino boliviano',
          'Datos reales de demanda antes de producir'
        ],
        buyerTitle: 'Para el Comprador (Consumidor/Inversor)',
        buyerItems: [
          'Precio preferencial en pre-venta',
          'Apreciacion de valor por hitos de produccion',
          'Garantia de autenticidad y trazabilidad total',
          'Redencion por producto fisico real',
          'Participacion directa en la cadena de valor'
        ]
      },
      vision: {
        label: 'Vision',
        title: 'Mas Alla del Vino',
        description: 'El modelo de DRINKS ON CHAIN es replicable. Cualquier producto con denominacion de origen puede beneficiarse de la tokenizacion.',
        cards: [
          ['Cafe de Especialidad', 'Yungas, Bolivia'],
          ['Cacao Organico', 'Alto Beni, Bolivia'],
          ['Productos con D.O.', 'Cualquier origen verificable']
        ],
        closing: 'DRINKS ON CHAIN es una infraestructura, no solo un producto. Estamos construyendo el puente entre los productos reales de Latinoamerica y la economia digital global.'
      },
      cta: {
        title: 'Se Parte de la Primera Cosecha Tokenizada de Bolivia',
        subtitle: 'La pre-venta tiene cupo limitado. Cada token es una botella real, y cada cosecha es unica.',
        buttons: ['Reservar Mis Tokens ->', 'Hablar con el Equipo'],

      },
      footer: {
        brandText: 'Tokenizando la riqueza real boliviana en la red Stellar.',
        columns: [
          {
            title: 'Proyecto',
            items: ['Como Funciona', 'Beneficios', 'Tecnologia', 'Roadmap']
          },
          {
            title: 'Recursos',
            items: ['Whitepaper (proximamente)', 'Documentacion Tecnica', 'Stellar Network', 'Trustless Work']
          },
          {
            title: 'Comunidad',
            items: ['Twitter / X', 'Discord (proximamente)', 'GitHub', 'Contacto']
          }
        ],
        bottom: ['(c) 2026 DRINKS ON CHAIN - Samaipata, Bolivia', 'Construido sobre Stellar Network']
      }
    },
    en: {
      pageTitle: 'DRINKS ON CHAIN',
      logo: 'DRINKS ON CHAIN',
      switcherLabel: 'Language',
      nav: {
        links: ['Project', 'How It Works', 'Benefits', 'Traceability', 'Contact'],
        cta: 'Join the Pre-Sale',
        menu: 'Menu'
      },
      hero: {
        label: 'Real World Assets - Stellar Network',
        title: 'Wine Now Lives<br>on the Blockchain',
        subtitle: 'Buy tokens that represent real Bolivian wine bottles. Fund production. Watch their value grow. Redeem your bottle.',
        ctas: ['Explore Pre-Sale ->', 'See How It Works ->'],
        stats: [
          ['Network', 'Stellar Network'],
          ['Asset', '1 Token = 1 Bottle'],
          ['Origin', 'Samaipata, Bolivia'],
          ['Model', 'Non-Custodial']
        ]
      },
      problem: {
        label: 'The Problem',
        title: '80% of small vineyards<br>cannot access early financing',
        producerTitle: 'For Producers',
        producerText: 'Small and medium vineyards in Bolivia depend on intermediaries, face high financial costs, and cannot sell production before bottling. This limits growth and leaves them vulnerable every season.',
        consumerTitle: 'For Consumers',
        consumerText: 'Consumers pay final prices without benefiting from product appreciation. They cannot verify origin, production process, or authenticity. The value chain is opaque.',
        cards: [
          ['No financing', 'Vineyards cannot access capital before harvest'],
          ['Intermediaries', 'Multiple intermediaries increase final product cost'],
          ['No transparency', 'Consumers cannot verify origin or authenticity']
        ]
      },
      solution: {
        label: 'The Solution',
        title: 'We Tokenize Every Bottle<br>on Stellar Network',
        description: 'DRINKS ON CHAIN converts real wine bottles into digital assets on the Stellar blockchain. Each token is backed 1:1 by a bottle produced by Vinedo 1970 in Samaipata, Bolivia.',
        cards: [
          ['Tokenized Pre-Sale', 'Buy tokens during production at a preferred price. Fund the vineyard directly without intermediaries.'],
          ['On-Chain Traceability', 'Each bottle has a QR code linked to its full Stellar history: origin, production, transfers, and authenticity.'],
          ['Real Redemption', 'When you are ready, redeem your token for a physical bottle at the vineyard or authorized pickup points. The token is removed from circulation.']
        ]
      },
      works: {
        label: 'How It Works',
        title: 'From Vine to Wallet<br>in 5 Steps',
        steps: [
          ['The Vineyard Issues the Asset', 'Vinedo 1970 creates a native Stellar asset. Each token represents one real bottle currently in production.', 'Technical detail: Native Stellar asset with issuer + distributor accounts'],
          ['Buy During Pre-Sale', 'Get tokens at a preferred price using USDC. Your purchase directly funds production and bottling.', 'Technical detail: Secured payment with escrow via Trustless Work SDK'],
          ['Your Token Gains Value', 'As production progresses, the reference value of your token increases as milestones are completed.', 'Detail: +20% at bottling / +10% at official sales launch'],
          ['Redeem Your Bottle', 'Present your token at the vineyard or an authorized point. You receive your physical bottle and the token is burned (removed from circulation).', 'Technical detail: Verifiable burn transaction on Stellar'],
          ['Scan and Verify', 'Every bottle includes a QR code. Scan it to view the full history: transaction hash, metadata, and transfer chain.', 'Technical detail: Direct link to Stellar Explorer + on-chain metadata']
        ]
      },
      stats: {
        title: 'Numbers That Matter',
        labels: ['Each Token = 1 Real Bottle', 'Potential Appreciation Per Cycle', 'Intermediaries in the Chain', 'Traceable from the Vine'],
        description: 'Every transaction is verifiable on the Stellar blockchain.<br>No third-party custody. No opacity. No fine print.'
      },
      origin: {
        label: 'Origin',
        title: 'Vinedo 1970<br>Samaipata, Bolivia',
        paragraphs: [
          'Located in the Samaipata valleys at 1,750 meters above sea level, Vinedo 1970 produces handcrafted wine with grapes grown in one of South America\'s most unique terroirs.',
          'With decades of winemaking tradition, the vineyard blends ancestral methods with innovation. DRINKS ON CHAIN is the bridge between that tradition and blockchain technology, enabling direct participation in every harvest.',
          'This project proves that real-world asset tokenization is not just theory: it is a practical tool to finance production, increase transparency, and democratize access to origin-based products.'
        ],
        data: [
          ['Location', 'Samaipata, Santa Cruz, Bolivia'],
          ['Altitude', '1,750 masl'],
          ['Product', 'High-altitude artisanal wine'],
          ['Tradition', 'Decades of winemaking production']
        ]
      },
      tech: {
        label: 'Technology',
        title: 'Built on Stellar.<br>Secure by Design.',
        description: 'We use Stellar Network infrastructure because it offers fast, low-cost transactions with the security standards required by real-world assets.',
        cards: [
          ['Native Stellar Assets', 'Tokens are native network assets, not complex smart contracts. This ensures speed, low cost, and ecosystem-wide compatibility.'],
          ['Non-Custodial', 'We never touch your private keys. The backend builds the transaction (XDR), but only you sign from your wallet (Freighter, Lobstr, or Albedo).'],
          ['Verifiable Escrow', 'Pre-sale payments are secured through Trustless Work SDK. Funds are released through verifiable milestones, not blind trust.'],
          ['On-Chain Metadata', 'Each asset includes linked metadata: varietal, harvest, lot, and production process. Everything is public and verifiable under SEP-1 standards.']
        ],
        walletsLabel: 'Supported wallets'
      },
      benefits: {
        label: 'Benefits',
        title: 'Everyone Wins',
        producerTitle: 'For Producers (Vineyard)',
        producerItems: [
          'Financing before harvest, without debt',
          'Removal of intermediaries',
          'Direct relationship with end customers',
          'International promotion of Bolivian wine',
          'Real demand data before production'
        ],
        buyerTitle: 'For Buyers (Consumer/Investor)',
        buyerItems: [
          'Preferred pre-sale pricing',
          'Value appreciation through production milestones',
          'Full authenticity and traceability guarantee',
          'Redemption for a real physical product',
          'Direct participation in the value chain'
        ]
      },
      vision: {
        label: 'Vision',
        title: 'Beyond Wine',
        description: 'The DRINKS ON CHAIN model is replicable. Any origin-based product can benefit from tokenization.',
        cards: [
          ['Specialty Coffee', 'Yungas, Bolivia'],
          ['Organic Cacao', 'Alto Beni, Bolivia'],
          ['Products with D.O.', 'Any verifiable origin']
        ],
        closing: 'DRINKS ON CHAIN is an infrastructure, not just one product. We are building the bridge between real Latin American products and the global digital economy.'
      },
      cta: {
        title: 'Be Part of Bolivia\'s First Tokenized Harvest',
        subtitle: 'The pre-sale has limited capacity. Each token is a real bottle, and every harvest is unique.',
        buttons: ['Reserve My Tokens ->', 'Talk to the Team'],

      },
      footer: {
        brandText: 'Tokenizing real Bolivian value on the Stellar network.',
        columns: [
          {
            title: 'Project',
            items: ['How It Works', 'Benefits', 'Technology', 'Roadmap']
          },
          {
            title: 'Resources',
            items: ['Whitepaper (coming soon)', 'Technical Documentation', 'Stellar Network', 'Trustless Work']
          },
          {
            title: 'Community',
            items: ['Twitter / X', 'Discord (coming soon)', 'GitHub', 'Contact']
          }
        ],
        bottom: ['(c) 2026 DRINKS ON CHAIN - Samaipata, Bolivia', 'Built on Stellar Network']
      }
    }
  };

  const applyTranslation = (lang) => {
    const t = translations[lang] || translations.es;
    document.documentElement.lang = lang;
    document.title = t.pageTitle;

    setText(document.querySelector('.logo'), t.logo);
    setText(document.querySelector('.language-switcher-label'), t.switcherLabel);

    const navLinksList = document.querySelectorAll('.nav-links a');
    setNodeTexts(navLinksList, t.nav.links);
    setText(document.querySelector('.cta-nav'), t.nav.cta);
    setText(document.querySelector('.mobile-menu-btn'), t.nav.menu);

    const heroSection = document.querySelector('.hero');
    setText(heroSection?.querySelector('.hero-label'), t.hero.label);
    setHTML(heroSection?.querySelector('h1'), t.hero.title);
    setText(heroSection?.querySelector('.hero-subtitle'), t.hero.subtitle);
    const heroCtaButtons = heroSection?.querySelectorAll('.hero-ctas .btn');
    setNodeTexts(heroCtaButtons, t.hero.ctas);
    const heroStats = heroSection?.querySelectorAll('.hero-stat-item');
    heroStats?.forEach((item, index) => {
      const statData = t.hero.stats[index];
      const rows = item.querySelectorAll('p');
      if (statData && rows.length >= 2) {
        setText(rows[0], statData[0]);
        setText(rows[1], statData[1]);
      }
    });

    const problemSection = document.getElementById('proyecto');
    setText(problemSection?.querySelector('.uppercase-label'), t.problem.label);
    setHTML(problemSection?.querySelector('h2'), t.problem.title);
    const problemPanels = problemSection?.querySelectorAll('.problem-grid > div');
    if (problemPanels && problemPanels.length >= 2) {
      setText(problemPanels[0].querySelector('h4'), t.problem.producerTitle);
      setText(problemPanels[0].querySelector('p'), t.problem.producerText);
      setText(problemPanels[1].querySelector('h4'), t.problem.consumerTitle);
      setText(problemPanels[1].querySelector('p'), t.problem.consumerText);
    }
    const problemCards = problemSection?.querySelectorAll('.problem-card');
    problemCards?.forEach((card, index) => {
      const cardData = t.problem.cards[index];
      if (!cardData) return;
      setText(card.querySelector('h4'), cardData[0]);
      setText(card.querySelector('p'), cardData[1]);
    });

    const solutionSection = document.getElementById('solucion');
    setText(solutionSection?.querySelector('.uppercase-label'), t.solution.label);
    setHTML(solutionSection?.querySelector('h2'), t.solution.title);
    setText(solutionSection?.querySelector('.container > p.text-center'), t.solution.description);
    const solutionCards = solutionSection?.querySelectorAll('.solution-card-inner');
    solutionCards?.forEach((card, index) => {
      const cardData = t.solution.cards[index];
      if (!cardData) return;
      setText(card.querySelector('h4'), cardData[0]);
      setText(card.querySelector('p'), cardData[1]);
    });

    const worksSection = document.getElementById('funciona');
    setText(worksSection?.querySelector('.uppercase-label'), t.works.label);
    setHTML(worksSection?.querySelector('h2'), t.works.title);
    const timelineItems = worksSection?.querySelectorAll('.timeline-item');
    timelineItems?.forEach((item, index) => {
      const step = t.works.steps[index];
      if (!step) return;
      setText(item.querySelector('h4'), step[0]);
      setText(item.querySelector('p'), step[1]);
      setText(item.querySelector('.timeline-tech-detail'), step[2]);
    });

    const statsSection = document.querySelector('.bg-burgundy');
    setText(statsSection?.querySelector('h2'), t.stats.title);
    const statLabels = statsSection?.querySelectorAll('.stat-label');
    setNodeTexts(statLabels, t.stats.labels);
    setHTML(statsSection?.querySelector('.container > p.margin-x-auto'), t.stats.description);

    const originSection = document.getElementById('origen');
    setText(originSection?.querySelector('.uppercase-label'), t.origin.label);
    setHTML(originSection?.querySelector('h2'), t.origin.title);
    const originParagraphs = originSection?.querySelectorAll('.origin-content > div:first-child > p');
    setNodeTexts(originParagraphs, t.origin.paragraphs);
    const originDataItems = originSection?.querySelectorAll('.origin-data .data-item');
    originDataItems?.forEach((item, index) => {
      const data = t.origin.data[index];
      if (!data) return;
      setText(item.querySelector('span'), data[0]);
      setText(item.querySelector('strong'), data[1]);
    });

    const techSection = document.getElementById('tecnologia');
    setText(techSection?.querySelector('.uppercase-label'), t.tech.label);
    setHTML(techSection?.querySelector('h2'), t.tech.title);
    setText(techSection?.querySelector('.container > p.text-center'), t.tech.description);
    const techCards = techSection?.querySelectorAll('.tech-card');
    techCards?.forEach((card, index) => {
      const techCard = t.tech.cards[index];
      if (!techCard) return;
      setText(card.querySelector('h4'), techCard[0]);
      setText(card.querySelector('p'), techCard[1]);
    });
    setText(techSection?.querySelector('.wallets-container p'), t.tech.walletsLabel);

    const benefitsSection = document.getElementById('beneficios');
    setText(benefitsSection?.querySelector('.uppercase-label'), t.benefits.label);
    setText(benefitsSection?.querySelector('h2'), t.benefits.title);
    const benefitColumns = benefitsSection?.querySelectorAll('.benefit-column');
    if (benefitColumns && benefitColumns.length >= 2) {
      setText(benefitColumns[0].querySelector('h3'), t.benefits.producerTitle);
      const producerItems = benefitColumns[0].querySelectorAll('li');
      setNodeTexts(producerItems, t.benefits.producerItems);

      setText(benefitColumns[1].querySelector('h3'), t.benefits.buyerTitle);
      const buyerItems = benefitColumns[1].querySelectorAll('li');
      setNodeTexts(buyerItems, t.benefits.buyerItems);
    }

    const visionSection = document.getElementById('vision');
    setText(visionSection?.querySelector('.uppercase-label'), t.vision.label);
    setText(visionSection?.querySelector('h2'), t.vision.title);
    setText(visionSection?.querySelector('.container > p.text-center'), t.vision.description);
    const visionCards = visionSection?.querySelectorAll('.vision-card');
    visionCards?.forEach((card, index) => {
      const cardData = t.vision.cards[index];
      if (!cardData) return;
      setText(card.querySelector('h4'), cardData[0]);
      setText(card.querySelector('p'), cardData[1]);
    });
    setText(visionSection?.querySelector('p[style*="margin-top: 4rem"]'), t.vision.closing);

    const ctaSection = document.getElementById('preventa');
    setText(ctaSection?.querySelector('h2'), t.cta.title);
    setText(ctaSection?.querySelector('.hero-subtitle'), t.cta.subtitle);
    const ctaButtons = ctaSection?.querySelectorAll('.cta-buttons .btn');
    setNodeTexts(ctaButtons, t.cta.buttons);
    setText(ctaSection?.querySelector('.cta-footer'), t.cta.footer);

    const footerSection = document.querySelector('.footer');
    setText(footerSection?.querySelector('.footer-brand h3'), t.logo);
    setText(footerSection?.querySelector('.footer-brand p'), t.footer.brandText);
    const footerCols = footerSection?.querySelectorAll('.footer-col');
    footerCols?.forEach((column, index) => {
      const data = t.footer.columns[index];
      if (!data) return;
      setText(column.querySelector('h4'), data.title);
      const links = column.querySelectorAll('li a');
      setNodeTexts(links, data.items);
    });
    const footerBottom = footerSection?.querySelectorAll('.footer-bottom p');
    setNodeTexts(footerBottom, t.footer.bottom);
  };

  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Language Switcher
  const languageButtons = document.querySelectorAll('.lang-btn');
  const setActiveLanguageButton = (lang) => {
    languageButtons.forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  };

  let initialLang = document.documentElement.lang === 'en' ? 'en' : 'es';
  try {
    const savedLang = window.localStorage.getItem('doc-language');
    if (savedLang === 'es' || savedLang === 'en') {
      initialLang = savedLang;
    }
  } catch {
    // Skip localStorage on restricted environments
  }

  applyTranslation(initialLang);
  setActiveLanguageButton(initialLang);

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.dataset.lang;
      if (lang !== 'es' && lang !== 'en') return;
      applyTranslation(lang);
      setActiveLanguageButton(lang);
      try {
        window.localStorage.setItem('doc-language', lang);
      } catch {
        // Skip localStorage on restricted environments
      }
    });
  });

  // Initialize GSAP ScrollTrigger if available (Placeholder logic)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up animations
    const fadeElements = document.querySelectorAll('.gsap-fade-up');
    fadeElements.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      let finalVal = parseFloat(stat.getAttribute('data-val'));
      let textContent = stat.innerText;
      let suffix = textContent.replace(/[0-9.]/g, ''); 
      
      gsap.fromTo(stat, 
        { innerText: 0 }, 
        {
          innerText: finalVal,
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
          },
          duration: 2,
          snap: { innerText: 1 },
          onUpdate: function() {
            stat.innerText = Math.ceil(this.targets()[0].innerText) + suffix;
          }
        }
      );
    });
  }
});
