import api from "./axios";

export async function getFlipbooks() {
  const response = await api.get("/flipbooks");
  return response.data.data; 
}
