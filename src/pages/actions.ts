export async function loginAction({ request }: any) {
  const formData: FormData = await request.formData();
  new URLSearchParams()
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/local`, {
    method: 'POST',
    body: JSON.stringify({
      identifier: formData.get('email'),
      password: formData.get('password')
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  const data = await res.json();

  if (!data) {
    return {
      error: {
        message: 'An error has occurred while contacting the server, please try again later.'
      }
    }
  }

  return data;
}