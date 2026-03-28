import { Link } from "react-router-dom";
import scheme from "../assets/image/scheme.jpeg";
import layout from "../assets/image/layoutPlan.jpeg";
import terms from "../assets/image/web_SchemeConditions.jpeg";

const highlights = [
  { value: "Prime", label: "Nagpur Location" },
  { value: "1000 Sqft", label: "Featured Plot Option" },
  { value: "\u20B91100", label: "Lucky Draw Entry" },
];

const featureCards = [
  {
    eyebrow: "Planned Growth",
    title: "Designed for families and future-focused investors",
    text: "A layout that combines clear road access, residential plotting, and a practical long-term ownership opportunity.",
  },
  {
    eyebrow: "Simple Entry",
    title: "Low-cost participation with high-aspiration rewards",
    text: "The lucky draw model keeps entry accessible while still offering meaningful prizes that feel worth pursuing.",
  },
  {
    eyebrow: "Trusted Process",
    title: "Straightforward application and booking support",
    text: "From scheme details to direct contact, the journey is intentionally simple so visitors can move with confidence.",
  },
];

const contactNumber = "+917843045164";

export default function Home() {
  const handleCallNow = () => {
    window.location.href = `tel:${contactNumber}`;
  };

  return (
    <div className="home-page">
      <main className="page-shell">
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="hero-kicker reveal-fade">Premium Land Investment Opportunity</span>
              <h1 className="hero-title reveal-up">
                Invest in Premium Plots in Nagpur
              </h1>

              <p className="hero-subtitle reveal-up reveal-delay-1">
                Wealthline Infrastructure is creating a polished path to land ownership
                with a modern project presentation, accessible scheme entry, and direct
                support for serious buyers.
              </p>

              <div className="hero-actions reveal-up reveal-delay-2">
                <Link className="btn btn-scheme btn-lg" to="/LuckyDraw/Apply">
                  Join {"\u20B9"}1100 Lucky Draw Scheme
                </Link>
                <a className="hero-secondary-link" href="#project-layout">
                  Explore Project Layout
                </a>
              </div>

              <div className="hero-stats reveal-up reveal-delay-3">
                {highlights.map((item) => (
                  <div key={item.label} className="hero-stat-card">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual reveal-fade reveal-delay-2">
              <div className="hero-visual-frame">
                <img src={layout} alt="Premium plotted layout in Nagpur" />
                <div className="hero-visual-badge badge-primary">
                  <span>Wealthline Signature Layout</span>
                  <strong>Future-ready planning</strong>
                </div>
                <div className="hero-visual-badge badge-secondary">
                  <span>Investor Entry</span>
                  <strong>{"\u20B9"}1100 scheme access</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-overview-section">
          <div className="container">
            <div className="overview-panel reveal-up">
              {featureCards.map((card, index) => (
                <article
                  key={card.title}
                  className={`overview-card reveal-up reveal-delay-${index + 1}`}
                >
                  <span className="overview-eyebrow">{card.eyebrow}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="scheme" className="scheme-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="premium-media-card reveal-left">
                  <img
                    src={scheme}
                    className="img-fluid"
                    alt="Lucky draw scheme details"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="premium-copy-card reveal-right">
                  <span className="section-kicker">Lucky Draw Scheme</span>
                  <h2 className="scheme-title">A more aspirational way to begin your journey</h2>

                  <p className="section-body">
                    Participate in the Wealthline Infrastructure lucky draw scheme with
                    an affordable entry that opens the door to valuable rewards and a
                    stronger connection to the project.
                  </p>

                  <ul className="scheme-list premium-list">
                    <li>1000 Sqft Plot opportunity for a meaningful ownership leap</li>
                    <li>LCD TV reward for practical lifestyle value</li>
                    <li>10 Gram Silver Coin for a tangible premium prize</li>
                  </ul>

                  <div className="scheme-footer">
                    <div className="price-pill">
                      <span>Entry Amount</span>
                      <strong>{"\u20B9"}1100</strong>
                    </div>

                    <Link className="btn btn-scheme btn-lg" to="/LuckyDraw/Apply">
                      Join Scheme
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="project-layout" className="layout-section">
          <div className="container">
            <div className="section-heading text-center reveal-up">
              <span className="section-kicker">Project Layout</span>
              <h2 className="section-title">A clear view of the project plan</h2>
              <p className="section-body section-body-centered">
                Review the plotted structure, road planning, and arrangement to better
                understand the vision behind the development.
              </p>
            </div>

            <div className="premium-media-card layout-media-card reveal-up reveal-delay-1">
              <img src={layout} className="img-fluid" alt="Project layout" />
            </div>
          </div>
        </section>

        <section className="terms-section">
          <div className="container">
            <div className="section-heading text-center reveal-up">
              <span className="section-kicker">Terms & Conditions</span>
              <h2 className="section-title">Transparent details, presented clearly</h2>
            </div>

            <div className="premium-media-card reveal-up reveal-delay-1">
              <img src={terms} className="img-fluid" alt="Terms and conditions" />
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container">
            <div className="contact-panel reveal-up">
              <div className="contact-copy">
                <span className="section-kicker section-kicker-light">Direct Assistance</span>
                <h2>Speak with our booking contact</h2>
                <p>
                  For booking guidance, scheme details, or next-step clarification,
                  connect directly and move forward with confidence.
                </p>
              </div>

              <div className="contact-card">
                <span>Booking Contact</span>
                <h3>Pravin</h3>
                <p>+91 7843045164</p>
                <a
                  href={`tel:${contactNumber}`}
                  className="btn btn-scheme btn-lg"
                  onClick={handleCallNow}
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
