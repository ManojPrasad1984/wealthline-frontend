const BASE = "http://localhost:7100/api";

export const getApplyData = async () =>
  fetch(`${BASE}/GetApplyData`).then(r => r.json());

export const createOrder = async () =>
  fetch(`${BASE}/CreateOrder`, { method: "POST" }).then(r => r.json());

export const verifyPayment = async (data) =>
  fetch(`${BASE}/VerifyPayment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());