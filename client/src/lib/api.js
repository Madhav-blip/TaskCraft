const API_URL = import.meta.env.VITE_API_URL

// token gets saved here after login so every request can use it
let token = null

export function setToken(t) {
  token = t
}

async function request(path, method = "GET", body) {
  const headers = { "Content-Type": "application/json" }
  if (token) {
    headers["Authorization"] = "Bearer " + token
  }

  const res = await fetch(API_URL + path, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong")
  }
  return data
}

export const api = {
  register: (form) => request("/auth/register", "POST", form),
  login: (form) => request("/auth/login", "POST", form),
  getTasks: () => request("/tasks"),
  createTask: (task) => request("/tasks", "POST", task),
  updateTask: (id, task) => request("/tasks/" + id, "PUT", task),
  deleteTask: (id) => request("/tasks/" + id, "DELETE"),
  getUsers: () => request("/users"),
}
