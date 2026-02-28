# VINOONCHAIN 1970 — Arquitectura y Stack Tecnológico

## Plataforma de Tokenización de Vino (RWA) sobre Stellar Network

**Versión:** 1.0
**Fecha:** 2026-02-28
**Red:** Stellar (Testnet para Bootcamp, arquitectura Mainnet-ready)

---

## Tabla de Contenidos

1. Resumen Ejecutivo
2. Arquitectura del Sistema
3. Stack Tecnológico Completo
4. Frontend — Arquitectura
5. Backend / API — Arquitectura
6. Blockchain Layer (Stellar)
7. Base de Datos
8. Sistema QR / Trazabilidad
9. Seguridad
10. Infraestructura y DevOps
11. Escalabilidad Multi-Producto
12. Flujos de Datos
13. Fases de Implementación

---

## 1. Resumen Ejecutivo

VINOONCHAIN 1970 convierte botellas de vino del Viñedo 1970 (Samaipata, Bolivia) en activos nativos de Stellar. La plataforma permite financiamiento de producción mediante pre-venta tokenizada, con trazabilidad on-chain verificable vía QR y redención por botellas físicas.

### Principios Arquitectónicos

- **Non-custodial por diseño:** El backend nunca posee, almacena ni transmite llaves privadas. Todas las transacciones se construyen como XDR sin firmar y se firman exclusivamente en el wallet del usuario.
- **Blockchain como fuente de verdad:** Toda emisión, transferencia, burn y trazabilidad se registra en Stellar. Los datos off-chain son complementarios, nunca autoritativos para la propiedad.
- **Separación de responsabilidades:** Límites claros entre capa de marketing (Landing), aplicación (DApp), API (construcción de transacciones) y blockchain (operaciones en Stellar).
- **Pagos asegurados por escrow:** Los fondos de pre-venta fluyen a través de contratos de escrow de Trustless Work en Soroban, con liberación por hitos verificables.

---

## 2. Arquitectura del Sistema

```
╔══════════════════════════════════════════════════════════════════════╗
║                          CLIENT LAYER                               ║
║                                                                      ║
║  ┌───────────────────┐    ┌──────────────────────────────────────┐   ║
║  │ LANDING PAGE      │    │ DApp (Aplicación)                    │   ║
║  │ (Next.js SSG)     │    │ (Next.js App Router)                 │   ║
║  │                   │    │                                      │   ║
║  │ - Contenido mktg  │    │ - Conexión de Wallet                 │   ║
║  │ - SEO optimizado  │    │   (Freighter / Lobstr / Albedo)      │   ║
║  │ - Animaciones GSAP│    │ - Flujo de Compra (Pre-Venta)        │   ║
║  │ - CTA → DApp      │    │ - Dashboard / Portfolio              │   ║
║  └───────────────────┘    │ - Interfaz de Redención              │   ║
║                           │ - Visor de Trazabilidad              │   ║
║                           │ - Panel de Administración            │   ║
║                           └──────────────────────────────────────┘   ║
║                                       │                              ║
║                              Firma via Wallet (XDR)                  ║
║                         Freighter / Lobstr / Albedo                  ║
╚══════════════════════════════════════════════════════════════════════╝
                                       │
                                  HTTPS / REST
                                       │
╔══════════════════════════════════════════════════════════════════════╗
║                           API LAYER                                  ║
║                                                                      ║
║  ┌────────────────────────────────────────────────────────────────┐  ║
║  │ Backend API (Node.js 22 + Hono)                               │  ║
║  │                                                                │  ║
║  │  ┌────────────────┐  ┌──────────────────┐  ┌───────────────┐  │  ║
║  │  │ Transaction    │  │ Metadata &       │  │ QR Code       │  │  ║
║  │  │ Builder        │  │ Wine Registry    │  │ Service       │  │  ║
║  │  │ (XDR Factory)  │  │ Service          │  │               │  │  ║
║  │  └────────────────┘  └──────────────────┘  └───────────────┘  │  ║
║  │                                                                │  ║
║  │  ┌────────────────┐  ┌──────────────────┐  ┌───────────────┐  │  ║
║  │  │ Escrow         │  │ Webhook &        │  │ Admin         │  │  ║
║  │  │ Orchestrator   │  │ Event Processor  │  │ Panel API     │  │  ║
║  │  │ (Trustless Wk) │  │                  │  │               │  │  ║
║  │  └────────────────┘  └──────────────────┘  └───────────────┘  │  ║
║  └────────────────────────────────────────────────────────────────┘  ║
╚══════════════════════════════════════════════════════════════════════╝
                     │                           │
         Stellar SDK (js-stellar-sdk)    Trustless Work SDK
                     │                           │
╔══════════════════════════════════════════════════════════════════════╗
║                      BLOCKCHAIN LAYER                                ║
║                                                                      ║
║  ┌────────────────────────┐   ┌──────────────────────────────────┐  ║
║  │ Stellar Network        │   │ Soroban (Smart Contracts)        │  ║
║  │ (Assets Nativos)       │   │                                  │  ║
║  │                        │   │ - Trustless Work Escrow          │  ║
║  │ - Issuer Account       │   │   Contract                      │  ║
║  │   (locked post-emisión)│   │ - Liberación por milestones      │  ║
║  │ - Distributor Account  │   │ - USDC como moneda de pago      │  ║
║  │ - VINO1970 Asset       │   │                                  │  ║
║  │ - Trustlines           │   └──────────────────────────────────┘  ║
║  │ - Payments / Burns     │                                          ║
║  │ - SEP-1 stellar.toml  │                                          ║
║  │ - manageData (hashes)  │                                          ║
║  └────────────────────────┘                                          ║
║                                                                      ║
║  ┌────────────────────────────────────────────────────────────────┐  ║
║  │   Horizon API                    Soroban RPC                  │  ║
║  └────────────────────────────────────────────────────────────────┘  ║
╚══════════════════════════════════════════════════════════════════════╝
                                       │
╔══════════════════════════════════════════════════════════════════════╗
║                        DATA LAYER                                    ║
║                                                                      ║
║  ┌───────────────────────┐    ┌──────────────────────────────────┐  ║
║  │ PostgreSQL (Neon)     │    │ Stellar Ledger                   │  ║
║  │                       │    │ (Fuente de verdad: propiedad)    │  ║
║  │ - Catálogo de vinos   │    │                                  │  ║
║  │ - Etapas producción   │    │ - Balances de tokens             │  ║
║  │ - Mapeo de QR codes   │    │ - Historial de transacciones     │  ║
║  │ - Compras/Redemptions │    │ - Trustlines                     │  ║
║  │ - Audit logs          │    │ - Estado de escrow (Soroban)     │  ║
║  │ - Cache de estado     │    │ - Metadata hashes (manageData)   │  ║
║  └───────────────────────┘    └──────────────────────────────────┘  ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Límites Arquitectónicos

| Límite | Lado Izquierdo | Lado Derecho | Protocolo |
|--------|----------------|--------------|-----------|
| Usuario ↔ Frontend | Navegador | Next.js DApp | HTTPS |
| Frontend ↔ Backend | DApp | Hono API | REST/HTTPS |
| Frontend ↔ Wallet | DApp | Freighter/Lobstr/Albedo | Browser Extension API |
| Backend ↔ Stellar | Hono API | Horizon API | HTTPS (Stellar SDK) |
| Backend ↔ Escrow | Hono API | Trustless Work | REST + Soroban RPC |
| Backend ↔ Database | Hono API | PostgreSQL | TCP/SSL (Drizzle ORM) |

---

## 3. Stack Tecnológico Completo

### Frontend

| Tecnología | Versión | Propósito | Justificación |
|------------|---------|-----------|---------------|
| **Next.js** | 15.x (App Router) | Framework | Server Components para SEO en landing, App Router para DApp, Turbopack para builds rápidos. Estándar de la industria. |
| **TypeScript** | 5.x | Lenguaje | Tipado seguro en todo el stack, crítico para tipos de transacciones blockchain y manejo de XDR. |
| **Tailwind CSS** | 4.x | Styling | Utility-first CSS para desarrollo rápido y consistente. Compatible con el design system definido. |
| **GSAP** | 3.x + SplitText | Animaciones landing | Text reveal por caracteres, parallax, scroll-driven timelines, counter animations. Superior para animaciones complejas tipo FarmMinerals. |
| **Framer Motion** | 11.x | Animaciones DApp | Animaciones declarativas en React para transiciones de página, reveals de cards, estados de carga. |
| **Zustand** | 5.x | Estado cliente | Ligero, TypeScript-first, sin boilerplate. Para estado de wallet, flujo de compra y UI. |
| **TanStack Query** | 5.x | Estado servidor | Cache, revalidación y actualizaciones optimistas para llamadas API (precios, portfolio, milestones). |
| **@stellar/freighter-api** | latest | Wallet Freighter | Paquete oficial de SDF para extensión de navegador. |
| **@lobstr/signer** | latest | Wallet Lobstr | WalletConnect para usuarios móviles de Lobstr. |
| **albedo-link** | latest | Wallet Albedo | Firma web sin extensión — menor fricción. |
| **Lucide React** | latest | Iconografía | Iconos consistentes y tree-shakeable. |
| **react-qr-code** | latest | Render QR | Mostrar QR codes en el visor de trazabilidad. |

### Backend

| Tecnología | Versión | Propósito | Justificación |
|------------|---------|-----------|---------------|
| **Node.js** | 22 LTS | Runtime | Soporte nativo de TypeScript, excelente compatibilidad con Stellar SDK. |
| **Hono** | 4.x | Framework HTTP | Ultra-rápido, TypeScript-native, soporta Web Standard APIs (portable a edge). 3-4x más rápido que Express. |
| **@stellar/stellar-sdk** | latest | Interacción Stellar | SDK oficial para Horizon API, construcción de transacciones, codificación/decodificación XDR. |
| **Trustless Work SDK** | latest | Operaciones escrow | Hooks de React + cliente API para inicializar, fondear y liberar escrow por milestones. |
| **Drizzle ORM** | latest | Acceso a DB | Type-safe, SQL-first, zero overhead en runtime. Genera y valida tipos desde el schema. |
| **Zod** | 3.x | Validación | Schema validation para todos los inputs API. Compartido entre frontend y backend. |
| **jose** | latest | JWT | Tokens de autenticación para panel admin. Ligero. |
| **qrcode** | latest | Generación QR | Generación server-side de QR codes como SVG/PNG por botella. |
| **BullMQ** | latest | Cola de jobs | Tareas asíncronas: generación batch de QR, verificación de milestones, indexado de eventos. |

### Base de Datos y Storage

| Tecnología | Propósito | Justificación |
|------------|-----------|---------------|
| **PostgreSQL (Neon)** | DB principal | Serverless, scale-to-zero (económico para bootcamp), branching para dev/staging. Modelo relacional ideal para catálogo, producción, compras, redenciones. |
| **Upstash Redis** | Cache + Queue backend | Serverless Redis para BullMQ y caching de datos frecuentes. |
| **Cloudinary** | Storage de imágenes | QR codes generados, fotos de producto. API de transformación incluida. |

### Blockchain

| Tecnología | Propósito | Justificación |
|------------|-----------|---------------|
| **Stellar Network** | Red blockchain | Transacciones rápidas (~5s), bajo costo (~$0.00001), diseñada para assets financieros. |
| **Assets Nativos Stellar** | Token VINO1970 | Más rápidos que smart contracts, universalmente soportados por wallets y explorers. `credit_alphanum12`. |
| **Soroban** | Escrow solamente | Usado vía Trustless Work para lógica de escrow. No para el token mismo. |
| **SEP-1** | stellar.toml | Transparencia y metadata del asset según estándares del ecosistema. |

### Infraestructura

| Tecnología | Propósito | Justificación |
|------------|-----------|---------------|
| **Vercel** | Frontend hosting | Soporte nativo Next.js, preview deploys automáticos, CDN global, tier gratis generoso. |
| **Railway** | Backend hosting | Container hosting simple desde GitHub, env vars encriptadas, auto-scaling, networking privado. |
| **Turborepo** | Monorepo | Gestión eficiente de monorepo, builds incrementales, cache compartido. |
| **GitHub Actions** | CI/CD | Lint, type check, tests por PR. Deploy automático a Vercel/Railway en merge a main. |
| **Sentry** | Monitoreo | Error tracking para frontend y backend. Integración nativa con Next.js. |

---

## 4. Frontend — Arquitectura

### Estructura del Proyecto

```
apps/web/
├── app/
│   ├── (landing)/                    # Route group: Landing page
│   │   ├── page.tsx                  # Landing home (SSG)
│   │   └── layout.tsx               # Layout landing (dark theme, GSAP)
│   ├── (dapp)/                       # Route group: DApp
│   │   ├── layout.tsx               # Layout DApp (wallet provider, sidebar)
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Portfolio overview
│   │   ├── presale/
│   │   │   └── page.tsx             # Flujo de compra de tokens
│   │   ├── redeem/
│   │   │   └── page.tsx             # Interfaz de redención
│   │   ├── trace/
│   │   │   └── [tokenId]/
│   │   │       └── page.tsx         # Visor de trazabilidad por botella
│   │   └── admin/
│   │       ├── page.tsx             # Dashboard admin
│   │       └── milestones/
│   │           └── page.tsx         # Gestión de milestones
│   └── api/                          # BFF routes (proxy ligero opcional)
├── components/
│   ├── landing/                      # Componentes de landing
│   ├── dapp/                         # Componentes de DApp
│   ├── shared/                       # UI compartida (buttons, cards, modals)
│   └── wallet/                       # Conexión de wallet
├── hooks/
│   ├── useWallet.ts                  # Abstracción multi-wallet
│   ├── useStellar.ts                 # Helpers de transacciones Stellar
│   └── useEscrow.ts                  # Integración Trustless Work
├── lib/
│   ├── stellar/                      # Utilidades cliente Stellar
│   └── wallet-adapters/              # Adaptadores Freighter, Lobstr, Albedo
└── styles/
    ├── globals.css
    └── fonts.ts                      # Playfair Display + Inter
```

### Arquitectura de Conexión de Wallet

Patrón adaptador para normalizar la API entre tres wallets:

```
WalletProvider (Context)
  │
  ├── WalletAdapter (Interface)
  │     ├── FreighterAdapter    → Browser extension, signTransaction
  │     ├── LobstrAdapter       → WalletConnect, signTransaction
  │     └── AlbedoAdapter       → Web popup, firma via albedo-link
  │
  └── useWallet() hook
        - connect(): Promise<string>                    // Retorna public key
        - disconnect(): void
        - signTransaction(xdr: string): Promise<string> // Retorna XDR firmado
        - publicKey: string | null
        - isConnected: boolean
        - walletType: 'freighter' | 'lobstr' | 'albedo'
        - network: 'TESTNET' | 'PUBLIC'
```

**Decisión clave:** `signTransaction` recibe un XDR sin firmar del backend y retorna un XDR firmado. El frontend **nunca construye transacciones** — delega eso completamente al backend API.

---

## 5. Backend / API — Arquitectura

### Estructura

```
backend/src/
├── index.ts                          # Hono app entry, middleware
├── routes/
│   ├── presale.ts                    # Endpoints de pre-venta
│   ├── tokens.ts                     # Info de tokens, balances, metadata
│   ├── redeem.ts                     # Flujo de redención/burn
│   ├── trace.ts                      # Endpoints de trazabilidad
│   ├── qr.ts                         # Generación y resolución de QR
│   ├── admin.ts                      # Admin: milestones, escrow, redenciones
│   └── health.ts                     # Health check
├── services/
│   ├── stellar/
│   │   ├── transaction-builder.ts    # Fábrica de XDR (CORE del backend)
│   │   ├── asset-manager.ts          # Emisión de assets, operaciones trustline
│   │   ├── account-service.ts        # Consultas de cuenta via Horizon
│   │   └── network.ts               # Config de red (testnet/public)
│   ├── escrow/
│   │   ├── trustless-work.ts         # Integración Trustless Work SDK
│   │   └── milestone-manager.ts      # Tracking y aprobación de milestones
│   ├── wine/
│   │   ├── catalog-service.ts        # Catálogo de productos
│   │   └── production-tracker.ts     # Gestión de etapas de producción
│   └── qr/
│       ├── generator.ts              # Generación de QR codes
│       └── resolver.ts               # QR code → datos de trazabilidad
├── db/
│   ├── schema.ts                     # Definiciones de schema Drizzle
│   ├── migrations/                   # Migraciones de DB
│   └── index.ts                      # Conexión a base de datos
├── middleware/
│   ├── cors.ts                       # CORS estricto
│   ├── rate-limit.ts                 # Rate limiting
│   ├── auth.ts                       # Protección de rutas admin
│   └── error-handler.ts             # Manejo centralizado de errores
└── lib/
    ├── stellar-config.ts             # Network, asset codes, cuentas
    └── types.ts                      # Tipos TypeScript compartidos
```

### Endpoints de API

#### Pre-Venta

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/presale/info` | Estado actual, precio, supply restante | Público |
| `POST` | `/api/presale/initiate` | Construir XDR sin firmar de escrow | Público (wallet) |
| `POST` | `/api/presale/submit` | Enviar XDR firmado a Stellar | Público |
| `GET` | `/api/presale/status/:txHash` | Estado de confirmación de tx | Público |

#### Tokens

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/tokens/info` | Metadata VINO1970, supply total y circulante | Público |
| `GET` | `/api/tokens/balance/:publicKey` | Balance VINO1970 del usuario (query Horizon) | Público |
| `POST` | `/api/tokens/trustline` | Construir XDR de trustline para VINO1970 | Público |

#### Redención

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `POST` | `/api/redeem/initiate` | Construir XDR de burn | Público (wallet) |
| `POST` | `/api/redeem/submit` | Enviar burn firmado, registrar redención | Público |
| `GET` | `/api/redeem/status/:id` | Estado de cumplimiento físico | Público |

#### Trazabilidad

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/trace/:bottleId` | Historia completa de producción + cadena | Público |
| `GET` | `/api/trace/qr/:code` | Resolver QR code a datos de trazabilidad | Público |

#### Admin

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `POST` | `/api/admin/milestone` | Registrar milestone de producción | JWT Admin |
| `POST` | `/api/admin/escrow/release` | Aprobar liberación de milestone en escrow | JWT Admin |
| `GET` | `/api/admin/redemptions` | Listar redenciones pendientes de cumplimiento | JWT Admin |
| `POST` | `/api/admin/qr/generate` | Generar QR codes en batch para botellas | JWT Admin |

### Transaction Builder Service (Servicio Core)

El servicio más crítico del backend. Construye transacciones XDR sin firmar que se envían al frontend para firma del usuario.

**Tipos de transacción que construye:**

1. **Trustline:** Operación `changeTrust` para el asset VINO1970 en la cuenta del usuario
2. **Pre-Venta (Escrow Funding):** Integra con Trustless Work SDK para construir XDR de fondeo donde el usuario envía USDC al contrato escrow
3. **Distribución de Tokens:** Después de aprobación de milestone, operación `payment` desde distributor enviando VINO1970 al comprador (firmada por la key del distributor, no por el usuario)
4. **Burn/Redención:** Operación `payment` desde la cuenta del usuario enviando VINO1970 de vuelta a la cuenta issuer (destruye el token)
5. **Metadata Anchoring:** Operaciones `manageData` en la cuenta distributor para hashes de etapas de producción

**Patrón del Transaction Builder:**

```typescript
class TransactionBuilderService {
  async buildTrustlineXDR(userPublicKey: string): Promise<string> {
    const account = await server.loadAccount(userPublicKey);
    const tx = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase })
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: new StellarSdk.Asset('VINO1970', ISSUER_PUBLIC_KEY),
      }))
      .setTimeout(300)
      .build();
    return tx.toXDR();  // XDR sin firmar → al frontend
  }

  async buildBurnXDR(userPublicKey: string, amount: string): Promise<string> {
    const account = await server.loadAccount(userPublicKey);
    const tx = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase })
      .addOperation(StellarSdk.Operation.payment({
        destination: ISSUER_PUBLIC_KEY,  // Enviar al issuer = burn
        asset: new StellarSdk.Asset('VINO1970', ISSUER_PUBLIC_KEY),
        amount: amount,
      }))
      .setTimeout(300)
      .build();
    return tx.toXDR();
  }
}
```

---

## 6. Blockchain Layer (Stellar)

### Topología de Cuentas

```
ISSUER ACCOUNT (G...ISSUER)
┌──────────────────────────────────────────────┐
│ - Home domain: vinoonchain.com               │
│ - Emite asset VINO1970                       │
│ - BLOQUEADO después de emisión (weight = 0)  │
│ - No puede emitir más tokens post-bloqueo    │
│ - Recibe burns (pago al issuer = destrucción)│
│ - manageData: hashes de metadata producción  │
└──────────────────────────────────────────────┘
                    │
           Emite VINO1970 a
                    │
DISTRIBUTOR ACCOUNT (G...DIST)
┌──────────────────────────────────────────────┐
│ - Trustline a VINO1970                       │
│ - Posee el supply vendible de tokens         │
│ - Controlado por backend (key encriptada)    │
│ - Distribuye tokens post liberación escrow   │
│ - Multi-sig opcional: 2-de-3 para ops grandes│
└──────────────────────────────────────────────┘
                    │
          Distribuye VINO1970 a
                    │
BUYER ACCOUNTS (G...BUYER1, G...BUYER2, ...)
┌──────────────────────────────────────────────┐
│ - Wallet non-custodial del usuario           │
│ - Debe establecer trustline antes de recibir │
│ - Posee VINO1970 tokens (prueba de propiedad)│
│ - Puede quemar enviando de vuelta al ISSUER  │
│ - También tiene trustline USDC para comprar  │
└──────────────────────────────────────────────┘
```

### Configuración del Asset

| Propiedad | Valor |
|-----------|-------|
| **Asset Code** | `VINO1970` |
| **Asset Type** | `credit_alphanum12` (8 caracteres) |
| **Issuer** | Cuenta dedicada (bloqueada post-emisión) |
| **Supply Total** | Fijo, igual al total de botellas en lote (ej: 500) |
| **Decimales** | 0 (1 token = 1 botella entera, sin fracciones) |
| **Home Domain** | `vinoonchain.com` |

### Secuencia de Emisión (Setup único)

1. **Crear cuenta Issuer** — Fondear con XLM mínimo
2. **Crear cuenta Distributor** — Fondear con XLM mínimo
3. **Setear Home Domain en Issuer** — `setOptions({ homeDomain: 'vinoonchain.com' })`
4. **Distributor establece trustline** — `changeTrust` para VINO1970
5. **Issuer envía supply total al Distributor** — `payment` de 500 VINO1970 (esto crea el asset en la red)
6. **Bloquear Issuer** — `setOptions({ masterWeight: 0 })` — Previene nueva emisión permanentemente
7. **Publicar stellar.toml** — Hostear SEP-1 en `vinoonchain.com/.well-known/stellar.toml`

**Nota importante:** El paso 6 es irreversible. Toda metadata vía `manageData` debe anclarse ANTES del bloqueo. Alternativa recomendada: usar multi-sig en el issuer (2-de-3) para poder agregar metadata progresivamente, y bloquear solo al final del ciclo de producción.

### SEP-1 stellar.toml

Hosteado en: `https://vinoonchain.com/.well-known/stellar.toml`

```toml
ACCOUNTS = [
  "G...ISSUER_PUBLIC_KEY",
  "G...DISTRIBUTOR_PUBLIC_KEY"
]

VERSION = "2.7.0"

[DOCUMENTATION]
ORG_NAME = "VINOONCHAIN 1970"
ORG_URL = "https://vinoonchain.com"
ORG_LOGO = "https://vinoonchain.com/logo.png"
ORG_DESCRIPTION = "Tokenización de activos reales para vino artesanal boliviano"
ORG_PHYSICAL_ADDRESS = "Samaipata, Santa Cruz, Bolivia"
ORG_OFFICIAL_EMAIL = "contact@vinoonchain.com"

[[CURRENCIES]]
code = "VINO1970"
issuer = "G...ISSUER_PUBLIC_KEY"
display_decimals = 0
name = "VINOONCHAIN 1970 Wine Token"
desc = "Cada token VINO1970 representa una botella de vino artesanal de Viñedo 1970, Samaipata, Bolivia. Los tokens son canjeables por botellas físicas."
conditions = "Los poseedores pueden canjear por una botella física en el viñedo o puntos autorizados. La redención quema el token permanentemente."
image = "https://vinoonchain.com/vino1970-token.png"
is_asset_anchored = true
anchor_asset_type = "other"
anchor_asset = "Botella de Vino Artesanal - Viñedo 1970"
```

### Integración de Escrow (Trustless Work)

Ciclo de vida del escrow para pre-venta:

```
Fase 1: INICIALIZACIÓN
  Admin crea escrow via Trustless Work API
  Parámetros:
    - amount: total USDC para el lote de producción
    - milestones: [
        { name: "Cosecha Completa",       porcentaje: 30% },
        { name: "Fermentación Completa",  porcentaje: 30% },
        { name: "Embotellado Completo",   porcentaje: 25% },
        { name: "QA & Etiquetado",        porcentaje: 15% }
      ]
    - receiver: Public key del viñedo
    - releaseSigner: Admin VINOONCHAIN o multi-sig

Fase 2: FONDEO
  Compradores envían USDC al contrato escrow
  Cada contribución es rastreada
  Frontend construye XDR de fondeo via Trustless Work SDK
  Usuario firma con su wallet

Fase 3: APROBACIÓN DE MILESTONES
  Conforme avanza la producción, admin registra milestones
  Cada aprobación desbloquea un porcentaje de fondos
  Contrato marca milestone como approved: true

Fase 4: LIBERACIÓN
  Milestone aprobado → release signer trigger payout
  USDC fluye del escrow a la cuenta del viñedo
  Simultáneamente, tokens VINO1970 se distribuyen a compradores

Fase 5: COMPLETADO
  Todos los milestones aprobados y liberados
  Todos los tokens distribuidos
  Contrato escrow completado
```

### Mecanismo de Burn/Redención

Burn en Stellar es simple: enviar un asset nativo de vuelta a su cuenta issuer lo remueve de circulación (las cuentas issuer no pueden tener balances de su propio asset).

**Estructura de la transacción:**
- **Source Account:** Wallet del usuario (firma la tx)
- **Operation:** `payment`
- **Destination:** Public key del issuer
- **Asset:** VINO1970
- **Amount:** Cantidad de tokens a redimir

Post-burn, el backend: registra tx hash en DB, crea registro de redención con status `pending_fulfillment`, notifica admin para cumplimiento físico.

---

## 7. Base de Datos

### Schema

```sql
-- Catálogo de vinos
TABLE wine_products
  id                UUID PRIMARY KEY
  asset_code        VARCHAR(12)           -- 'VINO1970'
  name              VARCHAR(255)          -- 'Viñedo 1970 Reserva 2025'
  varietal          VARCHAR(100)          -- 'Tannat'
  vintage_year      INTEGER               -- 2025
  origin            VARCHAR(255)          -- 'Samaipata, Bolivia'
  altitude_masl     INTEGER               -- 1750
  total_supply      INTEGER               -- 500
  presale_price     DECIMAL(10,2)         -- 15.00 USDC
  current_price     DECIMAL(10,2)         -- Actualizado por milestones
  description       TEXT
  metadata_json     JSONB
  created_at        TIMESTAMP

-- Etapas de producción
TABLE production_stages
  id                UUID PRIMARY KEY
  wine_product_id   UUID → wine_products
  stage_name        VARCHAR(100)          -- 'harvest', 'fermentation'...
  stage_order       INTEGER               -- 1, 2, 3, 4, 5
  status            VARCHAR(20)           -- pending, in_progress, completed
  started_at        TIMESTAMP
  completed_at      TIMESTAMP
  metadata_json     JSONB                 -- Temperatura, humedad, notas
  metadata_hash     VARCHAR(64)           -- SHA-256 anclado on-chain
  tx_hash           VARCHAR(64)           -- Tx Stellar del anclaje
  evidence_urls     TEXT[]                -- Fotos, documentos

-- Registros de escrow
TABLE escrow_records
  id                UUID PRIMARY KEY
  wine_product_id   UUID → wine_products
  escrow_address    VARCHAR(56)           -- Dirección contrato Soroban
  total_amount_usdc DECIMAL(15,2)
  status            VARCHAR(20)           -- initialized, funded, releasing, completed
  milestones_json   JSONB
  trustless_work_id VARCHAR(255)

-- Compras
TABLE purchases
  id                UUID PRIMARY KEY
  wine_product_id   UUID → wine_products
  buyer_public_key  VARCHAR(56)           -- Public key Stellar
  quantity          INTEGER
  price_per_token   DECIMAL(10,2)
  total_usdc        DECIMAL(15,2)
  escrow_tx_hash    VARCHAR(64)
  distribution_tx   VARCHAR(64)
  status            VARCHAR(20)           -- pending, funded, tokens_distributed

-- Redenciones
TABLE redemptions
  id                UUID PRIMARY KEY
  wine_product_id   UUID → wine_products
  redeemer_key      VARCHAR(56)
  quantity          INTEGER
  burn_tx_hash      VARCHAR(64)           -- Tx de burn en Stellar
  delivery_method   VARCHAR(20)           -- 'pickup' | 'delivery'
  delivery_details  JSONB
  status            VARCHAR(20)           -- pending_fulfillment, shipped, completed
  fulfilled_at      TIMESTAMP

-- Códigos QR
TABLE qr_codes
  id                UUID PRIMARY KEY
  wine_product_id   UUID → wine_products
  bottle_number     INTEGER               -- 1 de 500, 2 de 500...
  qr_code           VARCHAR(100) UNIQUE   -- Código único en el QR
  qr_image_url      VARCHAR(500)
  resolved_url      VARCHAR(500)          -- app.vinoonchain.com/trace/{code}
  status            VARCHAR(20)           -- generated, assigned, redeemed

-- Referencias de wallet (opcional)
TABLE wallet_references
  id                UUID PRIMARY KEY
  public_key        VARCHAR(56) UNIQUE
  display_name      VARCHAR(100)
  email             VARCHAR(255)          -- Para notificaciones de redención

-- Admin
TABLE admin_users
  id                UUID PRIMARY KEY
  email             VARCHAR(255) UNIQUE
  password_hash     VARCHAR(255)
  role              VARCHAR(20)

-- Log de auditoría
TABLE audit_log
  id                UUID PRIMARY KEY
  action            VARCHAR(100)          -- 'milestone_approved', 'escrow_released'
  actor             VARCHAR(255)
  details_json      JSONB
  created_at        TIMESTAMP
```

### On-Chain vs Off-Chain

| Dato | On-Chain (Stellar) | Off-Chain (PostgreSQL) |
|------|--------------------|------------------------|
| Propiedad de tokens/balances | SI (fuente de verdad) | Cache para consultas rápidas |
| Historial de transacciones | SI (ledger inmutable) | Indexado para queries rápidos |
| Supply total/circulante | SI (derivado del ledger) | Cache |
| Metadata de producción | Solo hash (manageData) | JSON completo |
| Catálogo de vinos | No | SI (primario) |
| Mapeo de QR codes | No | SI (primario) |
| Estado de escrow | SI (contrato Soroban) | Snapshot en cache |
| Logística de redención | No | SI (primario) |

---

## 8. Sistema QR / Trazabilidad

### Flujo

```
BOTELLA FÍSICA
┌──────────────────┐
│  QR Code Label   │ ──codifica──→ https://app.vinoonchain.com/trace/VN1970-0042
│  (en la botella) │
└──────────────────┘
         │
         │ (consumidor escanea con cámara del celular)
         ▼
VISOR DE TRAZABILIDAD PÚBLICO (sin wallet necesaria)
┌──────────────────────────────────────────────────────┐
│                                                      │
│   VINOONCHAIN 1970 — Botella #42 de 500              │
│                                                      │
│   Producto: Viñedo 1970 Reserva Tannat 2025          │
│   Origen: Samaipata, Bolivia (1.750 msnm)            │
│   Varietal: Tannat                                   │
│                                                      │
│   TIMELINE DE PRODUCCIÓN:                            │
│   [x] Cosecha .......... 2025-03-15  [Verificado]    │
│   [x] Fermentación ..... 2025-04-20  [Verificado]    │
│   [x] Barrica .......... 2025-08-01  [Verificado]    │
│   [x] Embotellado ...... 2025-11-10  [Verificado]    │
│   [x] QA & Etiquetado .. 2025-12-01  [Verificado]    │
│                                                      │
│   VERIFICACIÓN ON-CHAIN:                             │
│   Asset: VINO1970 (Stellar Native Asset)             │
│   Issuer: G...ISSUER                                 │
│   Metadata Hash: 3f7a...9c2d                         │
│   Tx Hash: abc1...ef23                               │
│   [Ver en Stellar Explorer]                          │
│                                                      │
│   Estado Actual: Activo / Redimido                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Estructura del QR

```
URL: https://app.vinoonchain.com/trace/{bottleCode}
Ejemplo: https://app.vinoonchain.com/trace/VN1970-0042

Formato bottleCode: VN1970-{NNNN}
  VN1970 = Prefijo del proyecto
  NNNN   = Número de botella zero-padded (0001-0500)
```

### Pipeline de Generación

1. **Trigger:** Admin inicia generación batch después del milestone de embotellado
2. **Backend genera:** Para cada botella, crea `bottleCode` único, genera imagen QR (SVG + PNG), almacena en Cloudinary
3. **Base de datos:** Cada QR mapeado a su `wine_product_id` y `bottle_number`
4. **Etiquetado físico:** Imágenes QR exportadas para impresión
5. **Resolución:** Al escanear, la URL enruta al visor público que obtiene datos del API

### Verificación de Datos

El visor compara el hash SHA-256 del JSON de metadata off-chain con el hash almacenado on-chain vía `manageData`. Si coinciden → badge "Verificado".

---

## 9. Seguridad

### Modelo Non-Custodial

```
COSAS QUE EL BACKEND NUNCA TIENE:
  ✗ Llaves privadas de usuarios
  ✗ Seed phrases de usuarios
  ✗ Capacidad de mover tokens de usuarios
  ✗ Capacidad de firmar en nombre de usuarios

COSAS QUE EL BACKEND SÍ TIENE:
  ✓ Signing key del distributor (encriptada en reposo)
  ✓ Capacidad de construir transacciones XDR sin firmar
  ✓ Capacidad de enviar transacciones ya firmadas a Stellar
  ✓ Credenciales de autenticación admin
```

### Gestión de Keys

| Key | Storage | Patrón de Acceso |
|-----|---------|------------------|
| **Issuer secret** | Cold storage encriptado / HSM. Post-bloqueo es inerte. | Solo durante setup inicial. Puede destruirse post-bloqueo. |
| **Distributor secret** | Variable de entorno encriptada (Railway KMS). | Backend firma distribuciones post-escrow. Nunca expuesta al frontend. |
| **JWT secret** | Variable de entorno, rotación periódica. | Firma tokens de auth admin. |
| **User keys** | Wallet del usuario. Nunca en nuestra infraestructura. | Usuario firma en su propio wallet. |

### Seguridad de API

| Capa | Implementación |
|------|----------------|
| **HTTPS** | TLS en edge (Vercel / Railway). Todo el tráfico encriptado. |
| **CORS** | Allowlist estricta: `vinoonchain.com`, `app.vinoonchain.com`. |
| **Rate Limiting** | 60 req/min endpoints públicos, 10/min endpoints de transacción. |
| **Input Validation** | Schemas Zod en cada endpoint. Public keys validadas con regex `^G[A-Z2-7]{55}$`. |
| **Admin Auth** | JWT con expiración corta (1h), httpOnly secure cookie. |
| **XDR Validation** | Backend decodifica y valida que el XDR firmado coincida con el original antes de enviar a Stellar. |

### Patrón de Validación XDR (Seguridad Crítica)

```
1. Backend construye XDR sin firmar, almacena hash en cache
2. Frontend firma XDR, retorna versión firmada
3. Backend decodifica XDR firmado
4. Backend verifica:
   - Operaciones coinciden con las construidas originalmente
   - Source account es el usuario esperado
   - Destinos son los correctos
   - Montos son los esperados
   - No se inyectaron operaciones adicionales
5. Solo entonces: envía a Stellar network
```

---

## 10. Infraestructura y DevOps

### Topología de Deploy

```
CDN / EDGE
┌──────────────────────────────────────────────────┐
│  Vercel                                          │
│  - Next.js frontend (SSG landing, SSR DApp)      │
│  - Preview deployments automáticos por PR         │
│  - CDN global para assets estáticos              │
│  - stellar.toml servido desde /public/.well-known│
└──────────────────────────────────────────────────┘
                        │
BACKEND                 │
┌──────────────────────────────────────────────────┐
│  Railway                                         │
│  - Container Node.js Hono API                    │
│  - Auto-scaling, zero-config deploys desde GitHub│
│  - Variables de entorno encriptadas              │
│  - Networking privado a base de datos            │
└──────────────────────────────────────────────────┘
                        │
DATABASE                │
┌──────────────────────────────────────────────────┐
│  Neon (PostgreSQL Serverless)                    │
│  - Autoscaling, scale-to-zero                    │
│  - Database branching para dev/staging           │
│  - Connection pooling built-in                   │
└──────────────────────────────────────────────────┘

SERVICIOS EXTERNOS
┌──────────────────────────────────────────────────┐
│  Stellar Horizon (SDF público)                   │
│  Soroban RPC (SDF público)                       │
│  Trustless Work API                              │
│  Cloudinary (storage de imágenes QR)             │
└──────────────────────────────────────────────────┘
```

### Pipeline CI/CD

```
GitHub Repository (monorepo)
  │
  ├── Push a feature branch
  │     ├── GitHub Actions: Lint + Type Check + Unit Tests
  │     ├── Vercel: Preview deployment (frontend)
  │     └── Railway: Preview environment (backend)
  │
  ├── Merge a main
  │     ├── GitHub Actions: Suite completa de tests
  │     ├── Vercel: Deploy a producción (frontend)
  │     ├── Railway: Deploy a producción (backend)
  │     └── Neon: Branch principal (auto-migration Drizzle)
  │
  ├── Stellar Testnet (default para desarrollo)
  └── Stellar Mainnet (promoción manual, switch por env var)
```

### Variables de Entorno

```env
# Stellar Network
STELLAR_NETWORK=TESTNET
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

# Asset
VINO1970_ASSET_CODE=VINO1970
VINO1970_ISSUER_PUBLIC=G...
VINO1970_DISTRIBUTOR_PUBLIC=G...
VINO1970_DISTRIBUTOR_SECRET=S...  # ENCRIPTADO via Railway/KMS

# Trustless Work
TRUSTLESS_WORK_API_URL=https://api.trustlesswork.com
TRUSTLESS_WORK_API_KEY=tw_...

# Database
DATABASE_URL=postgresql://...@neon.tech/vinoonchain

# Auth
JWT_SECRET=...

# Services
CLOUDINARY_URL=...
SENTRY_DSN=...
```

---

## 11. Escalabilidad Multi-Producto

### Modelo de Replicación

```
VINOONCHAIN PLATFORM (infraestructura compartida)
┌──────────────────────────────────────────────────────┐
│  Compartido:                                         │
│  - Framework frontend y shell de DApp                │
│  - Backend API (parametrizado por producto)           │
│  - Transaction builder (asset-agnostic)              │
│  - Capa de integración de wallets                    │
│  - Motor de QR / trazabilidad                        │
│  - Orquestación de escrow                            │
└──────────────────────────────────────────────────────┘
                        │
INSTANCIAS DE PRODUCTO
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ VINO1970       │  │ CAFE2026       │  │ CACAO2026      │
│ Token de Vino  │  │ Token de Café  │  │ Token de Cacao │
│ Samaipata, BOL │  │ Yungas, BOL    │  │ Alto Beni, BOL │
│ Issuer: G...A  │  │ Issuer: G...B  │  │ Issuer: G...C  │
└────────────────┘  └────────────────┘  └────────────────┘
```

Cada producto tiene su propio issuer/distributor en Stellar pero comparte toda la infraestructura.

### Consideraciones de Escala

| Dimensión | Bootcamp (actual) | Producción |
|-----------|-------------------|------------|
| Token supply | 500 por lote | 10,000+ entre productos |
| Usuarios concurrentes | ~50 | ~5,000 |
| Base de datos | Neon free tier | Neon Pro + connection pooling |
| Backend | 1 instancia Railway | Auto-scaling (2-5 instancias) |
| Queries Stellar | Horizon público SDF | Horizon dedicado o API key |
| Resolución QR | On-demand | CDN-cached (ISR en Next.js) |

---

## 12. Flujos de Datos

### Flujo Completo de Pre-Venta

```
USUARIO              FRONTEND (DApp)         BACKEND (API)           STELLAR         TRUSTLESS WORK
  │                       │                       │                     │                   │
  │ 1. Conectar Wallet    │                       │                     │                   │
  │──────────────────────>│                       │                     │                   │
  │                       │                       │                     │                   │
  │ 2. Seleccionar qty    │                       │                     │                   │
  │    (ej: 5 tokens)     │                       │                     │                   │
  │──────────────────────>│                       │                     │                   │
  │                       │                       │                     │                   │
  │                       │ 3. POST /presale/     │                     │                   │
  │                       │    initiate            │                     │                   │
  │                       │ { publicKey, qty: 5 } │                     │                   │
  │                       │──────────────────────>│                     │                   │
  │                       │                       │                     │                   │
  │                       │                       │ 4. Check trustline  │                   │
  │                       │                       │──────────────────-->│                   │
  │                       │                       │ <── has/no trustline│                   │
  │                       │                       │                     │                   │
  │                       │                       │ 5. Build escrow XDR │                   │
  │                       │                       │    via Trustless Wk │                   │
  │                       │                       │────────────────────────────────────────>│
  │                       │                       │ <── unsigned XDR    │                   │
  │                       │                       │                     │                   │
  │                       │ 6. Return unsigned XDR│                     │                   │
  │                       │<──────────────────────│                     │                   │
  │                       │                       │                     │                   │
  │ 7. Wallet popup:      │                       │                     │                   │
  │    "Firmar tx?"        │                       │                     │                   │
  │<──────────────────────│                       │                     │                   │
  │                       │                       │                     │                   │
  │ 8. Aprueba y firma    │                       │                     │                   │
  │──────────────────────>│                       │                     │                   │
  │                       │                       │                     │                   │
  │                       │ 9. POST /presale/     │                     │                   │
  │                       │    submit              │                     │                   │
  │                       │ { signedXDR }          │                     │                   │
  │                       │──────────────────────>│                     │                   │
  │                       │                       │                     │                   │
  │                       │                       │ 10. Validar XDR     │                   │
  │                       │                       │     vs original      │                   │
  │                       │                       │                     │                   │
  │                       │                       │ 11. Submit a Stellar│                   │
  │                       │                       │──────────────────-->│                   │
  │                       │                       │ <── tx confirmada   │                   │
  │                       │                       │                     │                   │
  │                       │                       │ 12. Registrar compra│                   │
  │                       │                       │     en base de datos│                   │
  │                       │                       │                     │                   │
  │                       │ 13. Confirmación      │                     │                   │
  │                       │ { txHash, status }    │                     │                   │
  │                       │<──────────────────────│                     │                   │
  │                       │                       │                     │                   │
  │ 14. Mostrar éxito +   │                       │                     │                   │
  │     link a Explorer    │                       │                     │                   │
  │<──────────────────────│                       │                     │                   │
```

### Flujo de Milestones y Distribución de Tokens

```
ADMIN                 BACKEND (API)           STELLAR         TRUSTLESS WORK
  │                       │                     │                   │
  │ 1. Registrar milestone│                     │                   │
  │    "Embotellado OK"    │                     │                   │
  │──────────────────────>│                     │                   │
  │                       │                     │                   │
  │                       │ 2. Hash SHA-256     │                   │
  │                       │    de metadata       │                   │
  │                       │                     │                   │
  │                       │ 3. Anclar hash      │                   │
  │                       │    on-chain          │                   │
  │                       │    (manageData)      │                   │
  │                       │──────────────────-->│                   │
  │                       │                     │                   │
  │                       │ 4. Aprobar milestone│                   │
  │                       │    en Trustless Work│                   │
  │                       │────────────────────────────────────────>│
  │                       │ <── milestone aprobado                 │
  │                       │                     │                   │
  │                       │ 5. Trigger release  │                   │
  │                       │    de escrow         │                   │
  │                       │────────────────────────────────────────>│
  │                       │ <── USDC liberado al viñedo            │
  │                       │                     │                   │
  │                       │ 6. Actualizar precio│                   │
  │                       │    (+20% por embot.)│                   │
  │                       │                     │                   │
  │                       │ 7. Distribuir       │                   │
  │                       │    VINO1970 a buyers│                   │
  │                       │    (firma distributor key)             │
  │                       │──────────────────-->│                   │
  │                       │                     │                   │
  │ 8. Status actualizado │                     │                   │
  │<──────────────────────│                     │                   │
```

### Flujo de Redención (Burn)

```
USUARIO              FRONTEND (DApp)         BACKEND (API)           STELLAR
  │                       │                       │                     │
  │ 1. Ir a /redeem       │                       │                     │
  │──────────────────────>│                       │                     │
  │                       │                       │                     │
  │                       │ 2. GET /tokens/       │                     │
  │                       │    balance/:key        │                     │
  │                       │──────────────────────>│                     │
  │                       │                       │ 3. Query Horizon    │
  │                       │                       │──────────────────-->│
  │                       │                       │ <── balance: 5      │
  │                       │ <── balance: 5        │                     │
  │                       │                       │                     │
  │ 4. Seleccionar 2      │                       │                     │
  │    + pickup viñedo     │                       │                     │
  │──────────────────────>│                       │                     │
  │                       │                       │                     │
  │                       │ 5. POST /redeem/      │                     │
  │                       │    initiate            │                     │
  │                       │ { key, qty: 2,        │                     │
  │                       │   delivery: 'pickup' }│                     │
  │                       │──────────────────────>│                     │
  │                       │                       │                     │
  │                       │                       │ 6. Build burn XDR   │
  │                       │                       │    (payment 2       │
  │                       │                       │     VINO1970→issuer)│
  │                       │                       │                     │
  │                       │ <── unsigned burn XDR │                     │
  │                       │                       │                     │
  │ 7. Wallet: "Firmar    │                       │                     │
  │    burn?"              │                       │                     │
  │<──────────────────────│                       │                     │
  │                       │                       │                     │
  │ 8. Firma              │                       │                     │
  │──────────────────────>│                       │                     │
  │                       │                       │                     │
  │                       │ 9. POST /redeem/      │                     │
  │                       │    submit              │                     │
  │                       │ { signedXDR }          │                     │
  │                       │──────────────────────>│                     │
  │                       │                       │ 10. Validar + submit│
  │                       │                       │──────────────────-->│
  │                       │                       │ <── burn confirmado │
  │                       │                       │                     │
  │                       │                       │ 11. Crear registro  │
  │                       │                       │     de redención    │
  │                       │                       │                     │
  │                       │                       │ 12. Notificar admin │
  │                       │                       │                     │
  │                       │ <── { redeemId, hash }│                     │
  │                       │                       │                     │
  │ 13. "Burn confirmado!"│                       │                     │
  │     "Tus botellas     │                       │                     │
  │      estarán listas"  │                       │                     │
  │<──────────────────────│                       │                     │
```

---

## 13. Fases de Implementación

| Fase | Días | Tareas |
|------|------|--------|
| **1. Foundation** | 1-3 | Inicializar monorepo Turborepo (Next.js 15 + Hono), configurar Tailwind con design system, setup Neon PostgreSQL + schema Drizzle, crear cuentas Stellar testnet (issuer + distributor), emitir VINO1970 en testnet, publicar stellar.toml |
| **2. Core Blockchain** | 4-6 | Construir Transaction Builder (trustline, payment, burn XDRs), implementar wallet adapter pattern (Freighter primero, luego Lobstr/Albedo), integrar Trustless Work SDK para escrow, test end-to-end: trustline → escrow fund → distribución → burn |
| **3. DApp** | 7-10 | UI de pre-venta completa + integración API, dashboard portfolio (balance, historial), interfaz de redención, panel admin (gestión de milestones, release de escrow) |
| **4. Trazabilidad + Landing** | 11-13 | Pipeline de generación QR, visor público de trazabilidad, landing page con animaciones GSAP, verificación SEP-1 |
| **5. Polish y Presentación** | 14-15 | Error handling, loading states, edge cases, responsive mobile, Sentry, demo walkthrough completo en testnet |

---

## Apéndice: Justificación de Decisiones Técnicas

**Hono vs Express:** Hono es TypeScript-native, 3-4x más rápido, soporta Web Standard APIs (portable a edge). Express es legacy para proyectos nuevos.

**Drizzle vs Prisma:** Drizzle genera zero overhead en runtime (compila a SQL raw). Prisma genera un query engine binario grande. Para blockchain donde cada milisegundo importa, Drizzle es mejor.

**Zustand vs Redux:** Zustand no tiene boilerplate, funciona fuera de componentes React, es TypeScript-first. El estado de esta app es relativamente simple. Redux sería overkill.

**PostgreSQL vs MongoDB:** El modelo de datos es altamente relacional (productos → etapas → QR → compras → redenciones). JSONB de PostgreSQL provee flexibilidad de documentos donde se necesita sin sacrificar integridad referencial.

**Railway vs AWS/GCP:** Para bootcamp/hackathon, Railway da el nivel de abstracción correcto: deploy desde GitHub en minutos, sin configuración de infraestructura. AWS requeriría overhead de DevOps significativo sin beneficio a esta escala.

**Assets Nativos Stellar vs Soroban Token Contracts:** Los assets nativos son más rápidos (sin invocación de smart contract), más baratos (solo fees base), y universalmente soportados por todos los wallets y explorers. Soroban se usa solo donde agrega valor: la lógica de escrow vía Trustless Work.

---

*Documento de arquitectura desarrollado para VINOONCHAIN 1970 — Bootcamp Stellar / Hackathon Dorahacks*
