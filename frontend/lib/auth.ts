import api from "./axios";

export async function login(email: string, password: string) {
  try {
    const res = await api.post("/login", { email, password });
    const token = res.data?.token;
    if (!token) return false;

    localStorage.setItem("token", token);
    document.cookie = `api_token=${token}; path=/`;

    return true;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        return false;
      }
    }
    throw err;
  }
}

export async function getMe() {
  try {
    const res = await api.get("/me");
    return res.data.user;
  } catch {
    return null;
  }
}

export async function logout() {
  try {
    await api.post("/logout", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (e) {
    console.error(e);
  } finally {
    localStorage.removeItem("token");

    document.cookie = "api_token=; path=/; max-age=0";

    window.location.replace("/login");
  }
}


