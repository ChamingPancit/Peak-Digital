export default function Services() {
  const services = [
    {
      icon: "🎨",
      title: "Frontend Development",
      description:
        "Creating responsive, intuitive user interfaces using React, Next.js, and modern CSS frameworks.",
      features: [
        "React & Next.js applications",
        "Responsive design & mobile-first",
        "Performance optimization",
        "Accessibility (A11y)",
      ],
    },
    {
      icon: "⚙️",
      title: "Backend Development",
      description:
        "Building robust, scalable server-side solutions with Node.js, Express, and databases.",
      features: [
        "REST & GraphQL APIs",
        "Database design & optimization",
        "Authentication & security",
        "Cloud deployment",
      ],
    },
    {
      icon: "🗄️",
      title: "Database Design",
      description:
        "Designing efficient, normalized database schemas with PostgreSQL and MongoDB.",
      features: [
        "Schema optimization",
        "Data modeling",
        "Query optimization",
        "Backup & recovery",
      ],
    },
    {
      icon: "🚀",
      title: "DevOps & Deployment",
      description:
        "Managing deployments, CI/CD pipelines, and cloud infrastructure for seamless scaling.",
      features: [
        "Docker & Kubernetes",
        "GitHub Actions CI/CD",
        "AWS deployment",
        "Monitoring & logging",
      ],
    },
    {
      icon: "🔒",
      title: "Security & Compliance",
      description:
        "Implementing security best practices and ensuring compliance with industry standards.",
      features: [
        "OWASP top 10 prevention",
        "Data encryption",
        "Penetration testing",
        "Compliance audits",
      ],
    },
    {
      icon: "📊",
      title: "Consulting & Strategy",
      description:
        "Strategic guidance on technology choices, architecture, and best practices.",
      features: [
        "Tech stack selection",
        "Architecture planning",
        "Performance audits",
        "Team mentoring",
      ],
    },
  ];

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Services Offered</h2>
          <p className="section-subtitle">
            Comprehensive web development solutions tailored to your needs
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
