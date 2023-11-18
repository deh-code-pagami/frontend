import { Box, Button, Card, CardContent, Container, Divider, Stack, TextField, Typography } from "@mui/material"
import { Form, redirect, useActionData } from "react-router-dom"
import { setUser } from "../components/user/user-slice";
import { store } from "../app/store";

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

export default function LoginPage() {
  const { error } = ( useActionData() || {}) as { error?: string };

  return (
    <main>
      <Container sx={{ py: 2 }}>
        <Card sx={{ width: '100%', p: 1 }}>
          <CardContent sx={{ color: 'text.primary' }}>
            <Box >
              <Typography variant="h4" component="h1" mb={1}>
                Login
              </Typography>
              <Typography sx={{ color: 'text.primary' }}>
                Please login to continue
              </Typography>
            </Box>
            <Divider sx={{ mt: 2, mb: 4 }} />
            <Box>
              <Form method="post">
                <Stack spacing={3}>
                  <Box>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      fullWidth />

                  </Box>
                  <Box>
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      fullWidth />
                  </Box>
                  {error ? <Typography fontSize="1.125rem" color="error.main" mb={2}>{error}</Typography> : ''}
                  <Box mt={2}>
                    <Button type="submit"
                      variant="outlined" >
                      Login
                    </Button>
                  </Box>
                </Stack>
              </Form>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}