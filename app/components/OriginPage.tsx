import Image from 'next/image';
import Link from 'next/link';

export default function OriginPage() {
  return (
    <main className="section bg-light origin-detail-page">
      <div className="container">
        <Link className="btn btn-secondary origin-detail-back" href="/#origen">
          ← Volver
        </Link>
        <h1 className="serif origin-detail-title">
          Viñedo 1970
          <br />
          Samaipata, Bolivia
        </h1>

        <div className="origin-detail-text">
          <p>
            Enclavado en los valles de Samaipata, a 1.750 metros sobre el nivel del mar, Viñedo 1970 produce vino
            artesanal con uvas cultivadas en uno de los terroirs más singulares de Sudamérica.
          </p>
          <p>
            Con décadas de tradición vinícola, el viñedo combina métodos ancestrales con innovación. DRINKS ON CHAIN
            es el puente entre esa tradición y la tecnología blockchain, permitiendo que el mundo participe
            directamente en cada cosecha.
          </p>
          <p>
            Este proyecto nace para demostrar que la tokenización de activos reales no es solo teoría: es una
            herramienta concreta para financiar, transparentar y democratizar el acceso a productos con denominación de
            origen.
          </p>
        </div>

        <div className="origin-detail-images">
          <Image src="/assets/images/vineyard_pano_1773283547052.png" alt="Valle de Samaipata" width={900} height={900} />
          <Image src="/assets/images/vineyard_hands_1773283570399.png" alt="Cosecha de uvas" width={900} height={900} />
        </div>

        <div className="origin-data origin-detail-card">
          <div className="origin-data-grid">
            <div className="data-item">
              <span>Ubicación</span>
              <strong>Samaipata, Santa Cruz, Bolivia</strong>
            </div>
            <div className="data-item">
              <span>Altitud</span>
              <strong>1.750 msnm</strong>
            </div>
            <div className="data-item">
              <span>Producto</span>
              <strong>Vino artesanal de altura</strong>
            </div>
            <div className="data-item">
              <span>Tradición</span>
              <strong>Décadas de producción vinícola</strong>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}