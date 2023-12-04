import { Box, Button, Card, CardContent, Container, Divider, Stack, TextField, Typography } from "@mui/material"
import { useContext } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom"
import { GlobalContext, GlobalContextInterface } from "../main";



export default function LoginPage() {
  const data = ( useActionData() || {}) as { error?: string, data?: User };
  const { error } = data;

  const {global, setGlobal} = useContext(GlobalContext) as GlobalContextInterface;

  const navigate = useNavigate();

  if (global.user) {
    navigate('/');
  }

  if (!error && data.data) {
    setGlobal({
      ...global,
      user: data.data
    });

    navigate('/');
  }

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