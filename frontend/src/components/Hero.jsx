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
          <h1>Automate Your Business with AI & Web Development</h1>
          <p className="hero-tagline">
            AI Automation Solutions & Full-Stack Web Development
          </p>
          <p className="hero-description">
            Harness the power of artificial intelligence and modern web
            technologies to streamline operations, increase efficiency, and
            drive growth.
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
