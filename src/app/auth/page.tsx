"use client";
import { CiLock } from "react-icons/ci";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useRouter } from "next/navigation";
import { postReq } from "@/components/Menu";
import { Loader } from "@/components/Loader";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Auth() {
  const { push } = useRouter();
  const [isLoading, setLoading] = React.useState(false);
  const [isSignIn, setIsSignIn] = React.useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      name: (data.get("name") as string).trim(),
      password: (data.get("password") as string).trim(),
    };
    if (values.name && values.password) {
      setLoading(true);
      (async () => {
        const resp = await postReq("auth", { isSignIn, ...values });
        if ("token" in resp) {
          cookies.set("token", resp.token as string, {
            maxAge: 604800,
          });
          push("/");
        } else {
          alert(resp.msg as string);
        }
        setLoading(false);
      })();
    } else {
      alert("Values sholdn't be null");
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <Container maxWidth="xs">
        <Box
          sx={{
            height:"90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",
          }}
        >
          <Avatar className="user-bage__avatar" sizes="lg">
            <CiLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignIn ? "Sign in" : "Sign up"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              className="input"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              className="input"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignIn ? "Sign in" : "Sign up"}
            </Button>
            <Typography
              className="signup_signin"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign in"}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
