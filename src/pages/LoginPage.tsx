import { Box, Button, Card, CardContent, Container, Divider, Stack, TextField, Typography } from "@mui/material"
import { useContext, useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom"
import { GlobalContext, GlobalContextInterface } from "../contexts/global";



export default function LoginPage() {
  const data = useActionData() as any;
  const error = data?.error;

  const {global, setGlobal} = useContext(GlobalContext) as GlobalContextInterface;

  const navigate = useNavigate();
  const errorMessages = Array.isArray(error?.details?.errors) ? 
    error.details.errors
      .map((err: any) => err.message || '') : 
    [error?.message];

  useEffect(() => {
    if (global.isAuthenticated) {
      navigate('/');
    }
  
    if (data && !error) {
      setGlobal({
        ...global,
        user: data.user,
        isAuthenticated: true
      });
  
      navigate('/');
    }

  }, [data, error, global, navigate, setGlobal]);

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

                  { errorMessages ? 
                    errorMessages
                      .map((message: string, index: number) => <Typography key={index} fontSize="1.125rem" color="error.main" mb={2}>{message}</Typography>) 
                    : ''
                  }

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