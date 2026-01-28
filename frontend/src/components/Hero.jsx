export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Building Scalable Web Solutions That Drive Growth</h1>
          <p className="hero-tagline">
            Full-Stack Developer specializing in Node.js, React & PostgreSQL
          </p>
          <p className="hero-description">
            Transforming ideas into powerful, enterprise-grade applications that
            scale with your business.
          </p>
          <div className="hero-buttons">
            <button onClick={scrollToContact} className="btn btn-primary">
              Start Your Project
            </button>
            <button onClick={scrollToPortfolio} className="btn btn-secondary">
              View My Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
