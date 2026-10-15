import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'EscSimulados - Simulados Gratuitos com Gabarito Comentado',
  description: 'Simulados reais e gratuitos para ENEM, FUVEST, SARESP, Provão Paulista, OBMEP, OBA e Concursos Públicos. Cronometragem real, gabarito explicado e simulador SISU.',
  openGraph: {
    title: 'EscSimulados - Plataforma Aberta de Simulados Brasileiros',
    description: 'Simulados reais e gratuitos para ENEM, FUVEST, SARESP, Provão Paulista, OBMEP, OBA e Concursos Públicos. Cronometragem real e gabarito comentado.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EscSimulados - Plataforma Aberta de Simulados Brasileiros',
    description: 'Simulados reais e gratuitos para ENEM, FUVEST, SARESP, Provão Paulista, OBMEP, OBA e Concursos Públicos.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
