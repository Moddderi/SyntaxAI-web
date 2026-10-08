type SectionAmbientTone = 'features' | 'pricing' | 'team' | 'cta';

interface SectionAmbientProps {
  tone?: SectionAmbientTone;
}

export function SectionAmbient({ tone = 'features' }: SectionAmbientProps) {
  return (
    <div
      className={`section-ambient section-ambient--${tone} pointer-events-none absolute inset-0`}
      aria-hidden
    >
      <div className="section-ambient__grid" />
      <div className="section-ambient__orb section-ambient__orb-a" />
      <div className="section-ambient__orb section-ambient__orb-b" />
    </div>
  );
}
