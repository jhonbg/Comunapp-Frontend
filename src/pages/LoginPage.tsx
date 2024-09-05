import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const LoginForm: React.FC = () => {
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
          <form>
            <Typography style={{textAlign:'start'}}>Usuario</Typography>
            <TextField
              label="Usuario"
              variant="outlined"
              style={{ marginBottom: '20px', width: '100%', backgroundColor: "white" }}
            />
            <Typography style={{textAlign:'start'}}>Contraseña</Typography>
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
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
</div> 
);
};

export default LoginForm;