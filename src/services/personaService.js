const API_URL = "/api/personas";

export async function createUser(persona) {
  const res = await fetch(
        API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(persona),
        }
    );

  if (!res.ok) {
    throw new Error("Error al crear usuario");
  }

  return res.json();
}

export async function findUser(email, password) {
    const res = await fetch(
        `${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
        }
    );

    if (res.ok) {
        return res.json();
    } else {
        return null;
    }
}