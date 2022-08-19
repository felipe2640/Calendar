import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import Button from "@mui/material/Button";
import { createUserEndpoint } from "../Helpers/backend";

interface ICreateScreenProps {
  onCreateIn: () => void;
}

function CreateScreen(props: ICreateScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function createIn(evt: React.FormEvent) {
    evt.preventDefault();
    // console.log(email, password);
    createUserEndpoint(email, password, name).then(props.onCreateIn, (e) => {
      setError(`${e}`);
      console.error(e);
    });
  }
  return (
    <form onSubmit={createIn}>
      <TextField
        autoFocus
        margin="normal"
        label="Nomes"
        type={"name"}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        fullWidth
        variant="outlined"
        // error={!!errors.desc}
        // helperText={errors.desc}
      />
      <TextField
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
          Criar
        </Button>
      </Box>
    </form>
  );
}

export default CreateScreen;
