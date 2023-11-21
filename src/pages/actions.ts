import { redirect } from "react-router-dom";
import { store } from "../app/store";
import { setUser } from "../components/user/user-slice";

export async function loginAction({ request }: any) {
  let formData: FormData = await request.formData();
  new URLSearchParams()
  const res = await fetch('/api/login/', {
    method: 'POST',
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password')
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  const data = await res.json();

  if (!res.ok) {
    return data;
  }

  const user = data.data;
  
  store.dispatch(setUser(user));

  return redirect('/');
}