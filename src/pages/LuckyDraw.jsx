import { useEffect, useState } from "react";
import { getApplyData, createOrder, verifyPayment } from "../services/api";

export default function LuckyDraw() {

  const [config, setConfig] = useState({});
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getApplyData().then(setConfig);
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();

    const mobileRegex = /^[6-9][0-9]{9}$/;
    const aadhaarRegex = /^[0-9]{12}$/;

    if (!form.FullName) return alert("Enter name");
    if (!mobileRegex.test(form.MobileNumber)) return alert("Invalid mobile");
    if (!aadhaarRegex.test(form.AadhaarNumber)) return alert("Invalid Aadhaar");

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

        const result = await verifyPayment({
          entry: form,
          ...response
        });

        if (result.success) {
          alert("Card Number: " + result.card);

          window.open(
            `http://localhost:7100/api/DownloadReceipt?card=${result.card}`
          );
        } else {
          alert(result.message);
          setLoading(false);
        }
      }
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h3 className="text-center mb-4">
          Wealthline Lucky Draw
        </h3>

        <form onSubmit={handlePay}>

          <input className="form-control mb-2" placeholder="Full Name"
            onChange={e => setForm({ ...form, FullName: e.target.value })} />

          <input className="form-control mb-2" placeholder="Mobile"
            maxLength={10}
            onChange={e => setForm({ ...form, MobileNumber: e.target.value })} />

          <textarea className="form-control mb-2" placeholder="Address"
            onChange={e => setForm({ ...form, Address: e.target.value })} />

          <input className="form-control mb-2" placeholder="Aadhaar"
            maxLength={12}
            onChange={e => setForm({ ...form, AadhaarNumber: e.target.value })} />

          <select className="form-select mb-3"
            onChange={e => setForm({ ...form, PrizeChoice: e.target.value })}>
            <option value="">Select Prize</option>
            <option>1000 Sqft Plot</option>
            <option>LCD TV</option>
            <option>10gm Silver Coin</option>
          </select>

          <button className="btn btn-warning w-100" disabled={loading}>
            Pay ₹{config.entryAmount}
          </button>

        </form>

      </div>

    </div>
  );
}