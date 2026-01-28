export default function Services() {
  const services = [
    {
      icon: "🤖",
      title: "AI Automation Solutions",
      description:
        "Implement intelligent automation using machine learning and AI to streamline workflows and reduce manual tasks.",
      features: [
        "Process automation with AI",
        "Data analysis & insights",
        "Chatbots & virtual assistants",
        "Workflow optimization",
      ],
    },
    {
      icon: "🎨",
      title: "Custom Web Development",
      description:
        "Creating responsive, intuitive web applications using React, Next.js, and modern technologies.",
      features: [
        "React & Next.js applications",
        "Responsive design & mobile-first",
        "Performance optimization",
        "SEO optimization",
      ],
    },
    {
      icon: "⚙️",
      title: "Backend & API Development",
      description:
        "Building robust, scalable server-side solutions with Node.js, Express, and cloud databases.",
      features: [
        "REST & GraphQL APIs",
        "Database design & optimization",
        "Authentication & security",
        "Microservices architecture",
      ],
    },
    {
      icon: "🧠",
      title: "Machine Learning Integration",
      description:
        "Integrate ML models into your applications for predictive analytics and intelligent decision-making.",
      features: [
        "Model integration & deployment",
        "Predictive analytics",
        "Computer vision solutions",
        "NLP implementations",
      ],
    },
    {
      icon: "🚀",
      title: "Cloud Deployment & DevOps",
      description:
        "Deploy applications with CI/CD pipelines and manage cloud infrastructure for scalability.",
      features: [
        "AWS & cloud deployment",
        "GitHub Actions automation",
        "Docker & containerization",
        "Monitoring & logging",
      ],
    },
    {
      icon: "🔒",
      title: "Security & Data Protection",
      description:
        "Ensure your data and applications are secure with industry-standard security practices.",
      features: [
        "OWASP security standards",
        "Data encryption",
        "Access control & authentication",
        "Compliance audits",
      ],
    },
  ];

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Services Offered</h2>
          <p className="section-subtitle">
            AI automation and web development solutions to transform your business
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
