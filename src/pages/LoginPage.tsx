import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ModalError from './components/ModalError'
import { useUser } from '../UserContext';

const LoginForm: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();


  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const jsonLogin = {
        usuario: username,
        clave: password,
      };

      const loginResponse = await axios.post(
        'https://comunapp-api.azurewebsites.net/api/login?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D',
        jsonLogin
      );

      if (loginResponse.data) {
        const userResponse = await axios.get(
          `https://comunapp-api.azurewebsites.net/api/persona?usuario=${username}&code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D`
        );

        const userData = {
          ...userResponse.data,
          name:username
        }

        setUser(userData);
        navigate('/Users');
      } else {
        setError('Usuario o contraseña inválidos');
        setIsModalOpen(true);
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      setIsModalOpen(true);
    }
  };

return (
    <div>
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',        
      justifyContent: 'center', 
      alignItems: 'center',
    }}
  >
    <Paper elevation={6} style={{ padding: '20px',paddingLeft:'100px',paddingRight: '100px', textAlign: 'center' }}>
      <Container maxWidth="xl" style={{ flex: "200", width: "100%" }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center"}}>
          <Typography variant="h4" style={{margin:'5%', marginBottom: '15%'}}>Iniciar de sesión</Typography>
          <form onSubmit={handleSumit}>
            <Typography style={{textAlign:'start'}}>Usuario</Typography>
            <TextField
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ marginBottom: '20px', width: '100%', backgroundColor: "white" }}
            />
            <Typography style={{textAlign:'start'}}>Contraseña</Typography>
            <TextField
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '20px', width: '100%', backgroundColor: "white" }}
            />
            <Button
              variant="contained"
              color="inherit"
              type="submit"
              style={{ width: '40%', backgroundColor:'#92c5FC'}}
            >
              iniciar
            </Button>
          </form>
        </div>
      </Container>
      </Paper>
  </Box>

  <ModalError open={isModalOpen} onClose={() => setIsModalOpen(false)} message={error}/>
</div> 
);
};

export default LoginForm;