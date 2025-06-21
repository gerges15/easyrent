// js/api.js
export default class API {
  constructor(baseURL, { apiKey = "", authToken = "" } = {}) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.authToken = authToken;
  }

  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    if (this.apiKey) {
      headers["x-api-key"] = this.apiKey;
    }

    if (this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  async handleResponse(res) {
    // حاول تفك JSON من الرد، لو ما ينفع خلي response null
    let data = null;
    try {
      data = await res.json();
    } catch {
      // رد غير JSON أو فارغ
    }

    if (!res.ok) {
      // رمي خطأ مع رسالة من السيرفر أو رسالة عامة
      const errorMessage =
        data?.message || `Error: ${res.status} ${res.statusText}`;
      throw new Error(errorMessage);
    }

    return data;
  }

  async get(endpoint) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: {
        ...this.getHeaders(),
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      credentials: "include",
    });
    return this.handleResponse(res);
  }

  async post(endpoint, data) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(res);
  }

  async put(endpoint, data) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(res);
  }

  async delete(endpoint) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.handleResponse(res);
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  setApiKey(key) {
    this.apiKey = key;
  }
}
