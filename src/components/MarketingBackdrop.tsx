interface MarketingBackdropProps {
  /** Where the glow sits vertically — pricing hero vs landing */
  variant?: 'landing' | 'pricing';
}

export function MarketingBackdrop({ variant = 'landing' }: MarketingBackdropProps) {
  const variantClass =
    variant === 'pricing' ? 'marketing-backdrop--pricing' : 'marketing-backdrop--landing';

  return (
    <div
      className={`marketing-backdrop pointer-events-none ${variantClass}`}
      aria-hidden
    >
      <div className="marketing-backdrop__disc">
        <div className="marketing-backdrop__disc-inner" />
        <div className="marketing-backdrop__disc-inner marketing-backdrop__disc-inner--b" />
      </div>
      <div className="marketing-backdrop__halo" />
      <div className="marketing-backdrop__halo marketing-backdrop__halo--b" />
      <div className="marketing-backdrop__beam" />
      <div className="marketing-backdrop__edge-fade" />
    </div>
  );
}
