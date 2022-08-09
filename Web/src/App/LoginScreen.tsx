import { Container, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import Button from "@mui/material/Button";
import { IUser, signInEndpoint } from "./backend";

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

function LoginScreen(props: ILoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    // console.log(email, password);
    signInEndpoint(email, password).then(props.onSignIn, (e) => {
      setError(
        "E-mail não encontrado ou senha incorreta. Tente email: felipe@email.com password: 1234"
      );
      console.error(e);
    });
  }
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="div" margin={2}>
        Agenda React
      </Typography>
      <Typography variant="body1" margin={2}>
        Digite e-mail e senha para entrar no sistema .{" "}
      </Typography>
      <form onSubmit={signIn}>
        <TextField
          autoFocus
          margin="normal"
          label="E-mail"
          type={"email"}
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          fullWidth
          variant="outlined"
          // error={!!errors.desc}
          // helperText={errors.desc}
        />
        <TextField
          margin="normal"
          label="Senha"
          type="password"
          variant="outlined"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          fullWidth
          // error={!!errors.desc}
          // helperText={errors.desc}
        />
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        <Box sx={{ textAlign: "end", marginTop: 4 }}>
          <Button type="submit" variant="contained">
            Salvar
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default LoginScreen;
