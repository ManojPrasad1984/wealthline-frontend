import { useEffect, useState } from "react";
import {
  getAgents,
  getApplyData,
  createOrder,
  triggerReceiptDownload,
  verifyPayment,
} from "../services/api";

const rewardPoints = [
  "1000 Sqft Plot",
  "LCD TV",
  "10gm Silver Coin",
];

const contactNumber = "+917843045164";

export default function LuckyDraw() {
  const [config, setConfig] = useState({});
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([getApplyData(), getAgents()])
      .then(([applyData, agentData]) => {
        setConfig(applyData);

        if (Array.isArray(agentData)) {
          setAgents(agentData);
          return;
        }

        if (Array.isArray(agentData?.data)) {
          setAgents(agentData.data);
          return;
        }

        if (Array.isArray(agentData?.agents)) {
          setAgents(agentData.agents);
        }
      })
      .catch((error) => {
        console.error("Failed to load lucky draw form data:", error);
      });
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();

    const mobileRegex = /^[6-9][0-9]{9}$/;
    const aadhaarRegex = /^[0-9]{12}$/;

    if (!form.FullName) return alert("Enter name");
    if (!mobileRegex.test(form.MobileNumber)) return alert("Invalid mobile");
    if (!aadhaarRegex.test(form.AadhaarNumber)) return alert("Invalid Aadhaar");

    try {
      setLoading(true);

      const order = await createOrder();

      const options = {
        key: config.razorKey,
        amount: order.amount * 100,
        currency: "INR",
        name: "Wealthline Infrastructure",
        description: "Lucky Draw Entry",
        order_id: order.orderId,

        handler: async function (response) {
          try {
            const result = await verifyPayment({
              entry: form,
              ...response,
            });

            if (!result.success) {
              alert(result.message);
              return;
            }

            alert(`Payment successful. Card Number: ${result.card}. Your receipt will download now.`);
            triggerReceiptDownload(result.card);
          } catch (error) {
            console.error("Receipt flow failed:", error);
            alert("Payment was successful, but the receipt download could not be started.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Unable to start payment right now. Please try again.");
      setLoading(false);
    }
  };

  const handleCallNow = () => {
    window.location.href = `tel:${contactNumber}`;
  };

  return (
    <main className="page-shell lucky-draw-page">
      <section className="lucky-draw-hero">
        <div className="container">
          <div className="lucky-draw-shell">
            <div className="lucky-draw-intro reveal-left">
              <span className="section-kicker">Lucky Draw Entry</span>
              <h1 className="lucky-draw-title">Secure your entry into the premium reward pool</h1>
              <p className="lucky-draw-text">
                Complete your application in a refined, simple flow and move ahead with
                a secure payment step designed for fast participation.
              </p>

              <div className="lucky-draw-highlight">
                <span>Entry Amount</span>
                <strong>
                  {"\u20B9"}
                  {config.entryAmount ?? 1100}
                </strong>
              </div>

              <ul className="premium-list lucky-draw-list">
                {rewardPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <a
                href={`tel:${contactNumber}`}
                className="btn btn-scheme lucky-draw-call"
                onClick={handleCallNow}
              >
                Call Now
              </a>
            </div>

            <div className="lucky-draw-card reveal-right">
              <div className="lucky-draw-card-top">
                <span className="form-tag">Application Form</span>
                <h3>Wealthline Lucky Draw</h3>
                <p>Enter your details below to continue to payment.</p>
              </div>

              <form className="premium-form" onSubmit={handlePay}>
                <input
                  className="form-control premium-input"
                  placeholder="Full Name"
                  onChange={(e) => setForm({ ...form, FullName: e.target.value })}
                />

                <input
                  className="form-control premium-input"
                  placeholder="Mobile Number"
                  maxLength={10}
                  onChange={(e) => setForm({ ...form, MobileNumber: e.target.value })}
                />

                <textarea
                  className="form-control premium-input premium-textarea"
                  placeholder="Address"
                  onChange={(e) => setForm({ ...form, Address: e.target.value })}
                />

                <input
                  className="form-control premium-input"
                  placeholder="Aadhaar Number"
                  maxLength={12}
                  onChange={(e) => setForm({ ...form, AadhaarNumber: e.target.value })}
                />

                <select
                  className="form-select premium-input"
                  value={form.AgentId ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      AgentId: e.target.value ? e.target.value : null,
                    })
                  }
                >
                  <option value="">Select Agent</option>
                  {agents.map((agent) => {
                    const value =
                      typeof agent === "string"
                        ? agent
                        : agent.Id?.toString() ??
                          agent.id?.toString() ??
                          agent.AgentId?.toString() ??
                          "";
                    const label =
                      typeof agent === "string"
                        ? agent
                        : agent.AgentName ?? agent.agentName ?? agent.name ?? agent.AgentCode ?? value;

                    return (
                      <option key={value || label} value={value}>
                        {label}
                      </option>
                    );
                  })}
                </select>

                <select
                  className="form-select premium-input"
                  onChange={(e) => setForm({ ...form, PrizeChoice: e.target.value })}
                >
                  <option value="">Select Prize</option>
                  <option>1000 Sqft Plot</option>
                  <option>LCD TV</option>
                  <option>10gm Silver Coin</option>
                </select>

                <button className="btn btn-scheme btn-lg w-100" disabled={loading}>
                  {loading ? "Processing..." : `Pay \u20B9${config.entryAmount ?? 1100}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
