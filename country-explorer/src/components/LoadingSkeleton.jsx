export default function LoadingSkeleton() {
  return (
    <div className="countries-grid">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-img pulse"></div>
          <div className="skeleton-text pulse" style={{ width: '80%', height: '24px' }}></div>
          <div className="skeleton-text pulse" style={{ width: '60%' }}></div>
          <div className="skeleton-text pulse" style={{ width: '40%' }}></div>
        </div>
      ))}
    </div>
  );
}