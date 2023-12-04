import { redirect } from "react-router-dom";
import { store } from "../app/store";
import { setUser } from "../app/user-slice";

export async function rootLoader() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/me/`);
  
  if (!response.ok) {
    return redirect('/login/');
  }
  
  const data = await response.json();
  const me = data.data;

  return { me };
}