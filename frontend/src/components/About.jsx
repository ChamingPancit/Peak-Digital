export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          Passionate about crafting exceptional digital experiences
        </p>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h3>Hi, I'm a Full-Stack Web Developer</h3>
          <p>
            With over 5 years of experience building modern web applications
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
