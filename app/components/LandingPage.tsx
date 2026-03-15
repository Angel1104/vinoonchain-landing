'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type HeroStat = {
  label: string;
  value: string;
};

type TimelineStep = {
  title: string;
  description: string;
  detail: string;
};

const heroStats: HeroStat[] = [
  { label: 'Red', value: 'Stellar Network' },
  { label: 'Activo', value: '1 Token = 1 Botella' },
  { label: 'Origen', value: 'Samaipata, Bolivia' },
  { label: 'Modelo', value: 'Non-Custodial' },
];

const timeline: TimelineStep[] = [
  {
    title: 'El Viñedo Emite el Activo',
    description:
      'Viñedo 1970 crea un activo nativo en Stellar. Cada token representa una botella real de vino en producción.',
    detail: 'Detalle técnico: Asset nativo Stellar con cuenta issuer + distributor',
  },
  {
    title: 'Compra en Pre-Venta',
    description:
      'Adquiere tokens a precio preferencial usando USDC. Tu compra financia directamente la producción y embotellado.',
    detail: 'Detalle técnico: Pago asegurado con escrow vía Trustless Work SDK',
  },
  {
    title: 'Tu Token Gana Valor',
    description:
      'A medida que avanza la producción, el valor de referencia de tu token aumenta por hitos completados.',
    detail: 'Detalle: +20% al embotellar · +10% al inicio de ventas oficiales',
  },
  {
    title: 'Canjea Tu Botella',
    description:
      'Presenta tu token en el viñedo o un punto autorizado. Recibes tu botella física y el token se quema (sale de circulación).',
    detail: 'Detalle técnico: Burn transaction verificable en Stellar',
  },
  {
    title: 'Escanea y Verifica',
    description:
      'Cada botella incluye un código QR. Escanéalo para ver el historial completo: hash de transacción, metadata y cadena de transferencias.',
    detail: 'Detalle técnico: Enlace directo a Stellar Explorer + metadata on-chain',
  },
];

const producerBenefits = [
  'Financiamiento antes de la cosecha, sin deuda',
  'Eliminación de intermediarios',
  'Relación directa con el consumidor final',
  'Promoción internacional del vino boliviano',
  'Datos reales de demanda antes de producir',
];

const buyerBenefits = [
  'Precio preferencial en pre-venta',
  'Apreciación de valor por hitos de producción',
  'Garantía de autenticidad y trazabilidad total',
  'Redención por producto físico real',
  'Participación directa en la cadena de valor',
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => {
      if (window.innerWidth > 1100) {
        setMenuOpen(false);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="logo">DRINKS ON CHAIN</div>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`} id="primary-navigation">
          <li>
            <a href="#proyecto" onClick={() => setMenuOpen(false)}>
              Proyecto
            </a>
          </li>
          <li>
            <a href="#funciona" onClick={() => setMenuOpen(false)}>
              Cómo Funciona
            </a>
          </li>
          <li>
            <a href="#beneficios" onClick={() => setMenuOpen(false)}>
              Beneficios
            </a>
          </li>
          <li>
            <a href="#trazabilidad" onClick={() => setMenuOpen(false)}>
              Trazabilidad
            </a>
          </li>
          <li>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>
              Contacto
            </a>
          </li>
        </ul>

        <button
          className="mobile-menu-btn"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          MENU
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="uppercase-label hero-label">Real World Assets · Stellar Network</div>
          <h1 className="serif">
            El Vino Ahora Vive
            <br />
            en la Blockchain
          </h1>
          <p className="hero-subtitle">
            Compra tokens que representan botellas reales de vino boliviano. Financia la producción. Observa cómo
            crece su valor. Redime tu botella.
          </p>

          <div className="hero-ctas">
            <a href="#preventa" className="btn btn-primary">
              Explorar Pre-Venta →
            </a>
            <a href="#funciona" className="btn btn-secondary">
              Ver Cómo Funciona →
            </a>
          </div>

          <div className="hero-stats">
            {heroStats.map((stat) => (
              <div className="hero-stat-item" key={stat.label}>
                <p>{stat.label}</p>
                <p>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-light" id="proyecto">
        <div className="container">
          <div className="uppercase-label margin-x-auto text-center" style={{ color: 'var(--primary-dark)' }}>
            El Problema
          </div>
          <h2 className="text-center serif" style={{ color: 'var(--primary-dark)' }}>
            El 80% de los pequeños viñedos
            <br />
            no acceden a financiamiento temprano
          </h2>

          <div className="problem-grid">
            <div>
              <h4 style={{ color: 'var(--primary-dark)' }}>Para el Productor</h4>
              <p>
                Los viñedos pequeños y medianos en Bolivia dependen de intermediarios, enfrentan costos financieros
                altos y no pueden vender su producción antes de embotellar. Esto limita su crecimiento y los deja
                vulnerables ante cada temporada.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-dark)' }}>Para el Consumidor</h4>
              <p>
                Los consumidores pagan el precio final sin beneficiarse de la apreciación del producto. No pueden
                verificar el origen, el proceso de producción ni la autenticidad de lo que compran. La cadena de valor
                es opaca.
              </p>
            </div>
          </div>

          <div className="problem-cards">
            <div className="problem-card">
              <h4>Sin financiamiento</h4>
              <p>Los viñedos no acceden a capital antes de la cosecha</p>
            </div>
            <div className="problem-card">
              <h4>Intermediarios</h4>
              <p>Múltiples intermediarios encarecen el producto final</p>
            </div>
            <div className="problem-card">
              <h4>Sin transparencia</h4>
              <p>El consumidor no puede verificar origen ni autenticidad</p>
            </div>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Image
              src="/assets/images/problem_split_1773283494195.png"
              alt="Problema visual"
              width={1200}
              height={800}
              style={{ maxWidth: '100%', borderRadius: '8px', marginInline: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      <section className="section bg-dark" id="solucion">
        <div className="container">
          <div className="uppercase-label text-center" style={{ color: 'var(--accent-gold)' }}>
            La Solución
          </div>
          <h2 className="text-center serif">
            Tokenizamos Cada Botella
            <br />
            en la Red Stellar
          </h2>
          <p className="text-center margin-x-auto" style={{ color: 'var(--light-neutral)' }}>
            DRINKS ON CHAIN convierte botellas reales de vino en activos digitales sobre la blockchain de Stellar. Cada
            token es respaldado 1:1 por una botella producida por Viñedo 1970 en Samaipata, Bolivia.
          </p>

          <div className="solution-content">
            <div className="solution-image">
              <Image
                src="/assets/images/solution_bottle_1773283508261.png"
                alt="Wine bottle tokenized"
                width={1200}
                height={1200}
              />
            </div>
            <div className="solution-cards">
              <div className="glass-card solution-card-inner">
                <div>
                  <h4>Pre-Venta Tokenizada</h4>
                  <p>
                    Compra tokens durante la fase de producción a precio preferencial. Financia directamente al viñedo
                    sin intermediarios.
                  </p>
                </div>
              </div>
              <div className="glass-card solution-card-inner">
                <div>
                  <h4>Trazabilidad On-Chain</h4>
                  <p>
                    Cada botella tiene un QR que enlaza a su historial completo en Stellar: origen, producción,
                    transferencias y autenticidad.
                  </p>
                </div>
              </div>
              <div className="glass-card solution-card-inner">
                <div>
                  <h4>Redención Real</h4>
                  <p>
                    Cuando estés listo, canjea tu token por una botella física en el viñedo o puntos autorizados. El
                    token se retira de circulación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light" id="funciona">
        <div className="container">
          <div className="uppercase-label text-center" style={{ color: 'var(--primary-dark)' }}>
            Cómo Funciona
          </div>
          <h2 className="text-center serif" style={{ color: 'var(--primary-dark)' }}>
            De la Cepa a Tu Wallet
            <br />
            en 5 Pasos
          </h2>

          <div className="timeline">
            {timeline.map((step, index) => (
              <div className="timeline-item" key={step.title}>
                <div className="timeline-icon">{index + 1}</div>
                <div className="timeline-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  <div className="timeline-tech-detail">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Image
              src="/assets/images/how_it_works_1773283533504.png"
              alt="Flow infography"
              width={1200}
              height={900}
              style={{ maxWidth: '100%', borderRadius: '8px', marginInline: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      <section className="section bg-burgundy" id="trazabilidad">
        <div className="container text-center">
          <h2 className="serif">Números que Hablan</h2>

          <div className="stats-grid">
            <div>
              <span className="stat-number">1:1</span>
              <span className="stat-label">Cada Token = 1 Botella Real</span>
            </div>
            <div>
              <span className="stat-number">+30%</span>
              <span className="stat-label">Apreciación Potencial por Ciclo</span>
            </div>
            <div>
              <span className="stat-number">0</span>
              <span className="stat-label">Intermediarios en la Cadena</span>
            </div>
            <div>
              <span className="stat-number">100%</span>
              <span className="stat-label">Trazable desde la Cepa</span>
            </div>
          </div>

          <p className="margin-x-auto" style={{ color: 'var(--light-neutral)' }}>
            Cada transacción es verificable en la blockchain de Stellar.
            <br />
            Sin custodia de terceros. Sin opacidad. Sin letra pequeña.
          </p>
        </div>
      </section>

      <section className="section bg-light" id="origen">
        <div className="container">
          <div className="uppercase-label text-center" style={{ color: 'var(--primary-dark)' }}>
            El Origen
          </div>
          <h2 className="text-center serif" style={{ color: 'var(--primary-dark)' }}>
            Viñedo 1970
            <br />
            Samaipata, Bolivia
          </h2>

          <div className="origin-content">
            <div className="text-center">
              <Link className="btn btn-primary origin-more-link" href="/origen">
                Ver descripción completa
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-dark" id="tecnologia">
        <div className="container">
          <div className="uppercase-label text-center" style={{ color: 'var(--accent-gold)' }}>
            Tecnología
          </div>
          <h2 className="text-center serif">
            Construido Sobre Stellar.
            <br />
            Seguro por Diseño.
          </h2>
          <p className="text-center margin-x-auto" style={{ color: 'var(--light-neutral)' }}>
            Usamos la infraestructura de Stellar Network porque ofrece transacciones rápidas, de bajo costo y con el
            estándar de seguridad que los activos reales requieren.
          </p>

          <div className="tech-grid">
            <div className="glass-card tech-card">
              <h4>Assets Nativos de Stellar</h4>
              <p>
                Los tokens son activos nativos de la red, no smart contracts complejos. Esto garantiza velocidad, bajo
                costo y compatibilidad con todo el ecosistema Stellar.
              </p>
            </div>
            <div className="glass-card tech-card">
              <h4>Non-Custodial</h4>
              <p>
                Nunca tocamos tus llaves privadas. El backend construye la transacción (XDR), pero solo tú firmas desde
                tu wallet personal (Freighter, Lobstr o Albedo).
              </p>
            </div>
            <div className="glass-card tech-card">
              <h4>Escrow Verificable</h4>
              <p>
                Los pagos de pre-venta están asegurados mediante Trustless Work SDK. Fondos liberados por hitos
                verificables, no por confianza ciega.
              </p>
            </div>
            <div className="glass-card tech-card">
              <h4>Metadata On-Chain</h4>
              <p>
                Cada activo incluye metadata vinculada: varietal, cosecha, lote, proceso de producción. Todo verificable
                y público siguiendo estándares SEP-1.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light" id="beneficios">
        <div className="container">
          <div className="uppercase-label text-center" style={{ color: 'var(--primary-dark)' }}>
            Beneficios
          </div>
          <h2 className="text-center serif" style={{ color: 'var(--primary-dark)' }}>
            Ganan Todos
          </h2>

          <div className="benefits-grid">
            <div className="benefit-column">
              <h3>Para el Productor (Viñedo)</h3>
              <ul className="benefit-list" style={{ color: 'var(--text-dark)' }}>
                {producerBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="benefit-column">
              <h3>Para el Comprador (Consumidor/Inversor)</h3>
              <ul className="benefit-list" style={{ color: 'var(--text-dark)' }}>
                {buyerBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-dark" id="vision">
        <div className="container">
          <div className="uppercase-label text-center" style={{ color: 'var(--accent-gold)' }}>
            Visión
          </div>
          <h2 className="text-center serif">Más Allá del Vino</h2>
          <p className="text-center margin-x-auto" style={{ color: 'var(--light-neutral)' }}>
            El modelo de DRINKS ON CHAIN es replicable. Cualquier producto con denominación de origen puede
            beneficiarse de la tokenización.
          </p>

          <div className="vision-grid">
            <div className="vision-card">
              <h4>Café de Especialidad</h4>
              <p>Yungas, Bolivia</p>
            </div>
            <div className="vision-card">
              <h4>Cacao Orgánico</h4>
              <p>Alto Beni, Bolivia</p>
            </div>
            <div className="vision-card">
              <h4>Productos con D.O.</h4>
              <p>Cualquier origen verificable</p>
            </div>
          </div>

          <p
            className="text-center margin-x-auto"
            style={{ marginTop: '4rem', maxWidth: '600px', color: 'var(--light-neutral)' }}
          >
            DRINKS ON CHAIN es una infraestructura, no solo un producto. Estamos construyendo el puente entre los
            productos reales de Latinoamérica y la economía digital global.
          </p>
        </div>
      </section>

      <section className="final-cta" id="preventa">
        <div className="container">
          <h2 className="serif">Sé Parte de la Primera Cosecha Tokenizada de Bolivia</h2>
          <p className="hero-subtitle">
            La pre-venta tiene cupo limitado. Cada token es una botella real, y cada cosecha es única.
          </p>

          <div className="cta-buttons">
            <a href="#" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '18px 40px' }}>
              Reservar Mis Tokens →
            </a>
            <a href="#" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '18px 40px' }}>
              Hablar con el Equipo
            </a>
          </div>
        </div>
      </section>

      <footer className="footer" id="contacto">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>DRINKS ON CHAIN</h3>
              <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Tokenizando la riqueza real boliviana en la red Stellar.</p>
            </div>
            <div className="footer-col">
              <h4>Proyecto</h4>
              <ul className="footer-project-links">
                <li>
                  <a href="#funciona">Cómo Funciona</a>
                </li>
                <li>
                  <a href="#beneficios">Beneficios</a>
                </li>
                <li>
                  <a href="#tecnologia">Tecnología</a>
                </li>
                <li>
                  <a href="#vision">Visión</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 DRINKS ON CHAIN - Samaipata, Bolivia</p>
            <p>Construido sobre Stellar Network</p>
          </div>
        </div>
      </footer>
    </>
  );
}