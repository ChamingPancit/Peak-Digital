export default function Portfolio() {
  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A selection of recent projects and accomplishments
        </p>

        <div className="portfolio-grid">
          <div className="portfolio-card">
            <div className="portfolio-image">
              <div className="portfolio-placeholder">🛍️</div>
            </div>
            <div className="portfolio-content">
              <h3>E-Commerce Platform</h3>
              <p>Full-stack e-commerce solution</p>
            </div>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-image">
              <div className="portfolio-placeholder">📊</div>
            </div>
            <div className="portfolio-content">
              <h3>SaaS Dashboard</h3>
              <p>Analytics dashboard for tracking metrics</p>
            </div>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-image">
              <div className="portfolio-placeholder">📱</div>
            </div>
            <div className="portfolio-content">
              <h3>Mobile App API</h3>
              <p>High-performance REST API</p>
            </div>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-image">
              <div className="portfolio-placeholder">📝</div>
            </div>
            <div className="portfolio-content">
              <h3>Content Management System</h3>
              <p>Custom CMS with drag-and-drop</p>
            </div>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-image">
              <div className="portfolio-placeholder">💬</div>
            </div>
            <div className="portfolio-content">
              <h3>Real-time Chat</h3>
              <p>Scalable chat platform</p>
            </div>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-image">
              <div className="portfolio-placeholder">🤖</div>
            </div>
            <div className="portfolio-content">
              <h3>AI-Powered Tool</h3>
              <p>Machine learning integration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
