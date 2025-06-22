const baseURL = "https://easyrentapi0.runasp.net";

async function _get(urlPath) {
  const response = await fetch(`${baseURL}${urlPath}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
  });
  return await response.json();
}

async function _post(urlPath, data) {
  const response = await fetch(`${baseURL}${urlPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return text || null;
  }
}

async function _put(urlPath, data) {
  const response = await fetch(`${baseURL}${urlPath}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("API Error:", error);
    throw new Error("Something went wrong!");
  }

  return await response.json();
}

async function _delete(urlPath, data) {
  const response = await fetch(`${baseURL}${urlPath}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export { _get, _post, _put, _delete };
