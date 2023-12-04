export async function loginAction({ request }: any) {
  const formData: FormData = await request.formData();
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

  return data;
}