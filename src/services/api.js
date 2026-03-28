const BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:7100/api"
    : "https://wealthlineapi-bwf6g3fjcmhmfzea.centralindia-01.azurewebsites.net/api";

const fetchJson = async (url, options = {}) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error (${res.status}): ${text}`);
  }

  return res.json();
};

export const getApplyData = async () => fetchJson(`${BASE}/GetApplyData`);

export const getAgents = async () => fetchJson(`${BASE}/GetAgents`);

export const getDownloadReceiptUrl = (card) =>
  `${BASE}/DownloadReceipt?card=${encodeURIComponent(card)}`;

export const triggerReceiptDownload = (card) => {
  const receiptUrl = getDownloadReceiptUrl(card);
  const link = document.createElement("a");

  // Let the browser handle the attachment response directly.
  // This avoids popup blockers and cross-origin fetch/download issues.
  link.href = receiptUrl;
  link.target = "_self";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const createOrder = async () =>
  fetchJson(`${BASE}/CreateOrder`, {
    method: "POST",
  });

export const verifyPayment = async (data) =>
  fetchJson(`${BASE}/VerifyPayment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
