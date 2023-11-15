import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Stack, TextField, Typography } from "@mui/material"
import { Form } from "react-router-dom"

export async function loginAction({ _params, request }: any) {
  let formData = await request.formData();
  console.log(formData);
  const res = await fetch('/api/login/', {
    method: 'POST'
  });
  const data = await res.json();
  console.log(data)
  return {};
}

export default function LoginPage() {
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