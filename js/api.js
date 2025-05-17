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

  async get(endpoint) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    return res.json();
  }

  async post(endpoint, data) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async put(endpoint, data) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(endpoint) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return res.json();
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  setApiKey(key) {
    this.apiKey = key;
  }
}
