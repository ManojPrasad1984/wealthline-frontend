import { Link } from "react-router-dom";
import scheme from "../assets/image/scheme.jpeg";
import layout from "../assets/image/layout.jpeg";
import terms from "../assets/image/web_SchemeConditions.jpeg";

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="hero-title">
            Invest in Premium Plots in Nagpur
          </h1>

          <p className="hero-subtitle">
            Wealthline Infrastructure – Creating Wealth for Your Future
          </p>

          <Link className="btn btn-scheme btn-lg mt-3" to="/LuckyDraw/Apply">
            Join ₹1100 Lucky Draw Scheme
          </Link>
        </div>
      </section>

      <section className="scheme-section">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <img src={scheme} className="img-fluid shadow" />
            </div>

            <div className="col-lg-6">
              <h2 className="scheme-title">Lucky Draw Investment Scheme</h2>

              <p>
                Participate in Wealthline Infrastructure lucky draw scheme.
                Entry only ₹1100.
              </p>

              <ul>
                <li>1000 Sqft Plot</li>
                <li>LCD TV</li>
                <li>10 Gram Silver Coin</li>
              </ul>

              <h3 className="scheme-price">Entry ₹1100</h3>

              <Link className="btn btn-primary btn-lg" to="/LuckyDraw/Apply">
                Join Scheme
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="layout-section">
        <div className="container">
          <h2 className="section-title">Project Layout</h2>
          <img src={layout} className="img-fluid shadow rounded" />
        </div>
      </section>

      <section className="terms-section">
        <div className="container">
          <h2 className="section-title">Terms & Conditions</h2>
          <img src={terms} className="img-fluid" />
        </div>
      </section>

      <section className="contact-section text-center">
        <h2>Contact for Booking</h2>
        <h3>Pravin</h3>
        <p>+91 7843045164</p>
        <a href="tel:+917843045164" className="btn btn-scheme btn-lg">
          Call Now
        </a>
      </section>
    </>
  );
}