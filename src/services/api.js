// ✅ Dynamic BASE URL (works for local + Azure)
const BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:7100/api"
    : "https://wealthlineapi-bwf6g3fjcmhmfzea.centralindia-01.azurewebsites.net/api";

// ✅ Common fetch wrapper (better error handling)
const fetchJson = async (url, options = {}) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error (${res.status}): ${text}`);
  }

  return res.json();
};

// ✅ APIs
export const getApplyData = async () =>
  fetchJson(`${BASE}/GetApplyData`);

export const createOrder = async () =>
  fetchJson(`${BASE}/CreateOrder`, {
    method: "POST"
  });

export const verifyPayment = async (data) =>
  fetchJson(`${BASE}/VerifyPayment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });