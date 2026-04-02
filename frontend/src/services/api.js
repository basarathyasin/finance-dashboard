const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8008/api";

function handleUnauthorized() {
  window.dispatchEvent(new CustomEvent("auth:unauthorized"));
}

async function request(method, url, body) {
  const token = localStorage.getItem("finance_dashboard_token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    if (response.status === 401) {
      handleUnauthorized();
    }

    const error = new Error(data?.message || "Something went wrong");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

const api = {
  get(url) {
    return request("GET", url);
  },
  post(url, body) {
    return request("POST", url, body);
  },
  patch(url, body) {
    return request("PATCH", url, body);
  },
  delete(url) {
    return request("DELETE", url);
  },
};

export default api;
