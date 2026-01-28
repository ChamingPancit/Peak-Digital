export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">About Our Services</h2>
        <p className="section-subtitle">
          Expert in AI automation and web development solutions
        </p>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h3>AI Automation & Web Development Services</h3>
          <p>
            Combining artificial intelligence and modern web technologies to
            transform your business. We build intelligent systems that work
            smarter, faster, and more efficiently.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">30+</div>
            <div className="stat-label">Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5+</div>
            <div className="stat-label">Years</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
