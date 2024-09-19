import { AppBar, Toolbar, IconButton, Typography, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import ModalMessage from './components/Modal';

interface User {
  id: 1,
  nombres: string,
  apellidos: string,
  tipoIdentificacion: 1,
  identificacion: string,
  correo: string,
  direccion: string,
  celular: string,
  telefono: string,
  idCargo: 0,
  fechaNacimiento: string,
  fechaInicioResidencia: string,
  discapacidad: false,
  idGrupoEtnico: 2,
  lgtbiq: boolean,
  idNivelAcademico: 4,
  estado: string

}

const Users: React.FC = () => {
  const [openModalPedido, setOpenModalPedido] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://comunapp-api.azurewebsites.net/api/persona?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenModal = () => {
    setOpenModalPedido(true);
  };

  const handleCloseModal = () => {
    setOpenModalPedido(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

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
        <Paper elevation={4} style={{ padding: '10px', textAlign: 'center', height:'100vh'}}>
          <Container maxWidth="xl" style={{ flex: "200", width: "100%" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
            <AppBar position="static">
              <Toolbar style={{backgroundColor:'white'}}>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ width: '40px',
                height: '50px',  
                borderRadius: '0', 
                mr: 2, backgroundColor:'gray' }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'gray', fontWeight: 'bold'}}>
                  Junta de Acción Comunal Santo Tomás
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="flex-end">
                  <Typography variant="body1" style={{color:'gray'}}>Juan Pérez</Typography>
                  <Typography variant="body2" style={{color:'gray'}}>Administrador</Typography>
                </Box>
              </Toolbar>
            </AppBar>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', margin:'10px'}}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'darkgray',
                  color: 'black',
                }}
                onClick={handleOpenModal}
              >
                Crear
              </Button>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
                <Typography style={{ marginBottom: '5px' }}>Buscar Por Documento</Typography>
                <input type="text" style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
              </div>
              
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'darkgray',
                  color: 'black',
                }}
              >
                Buscar
              </Button>
            </div>
              <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                <Typography variant="h5" style={{ marginBottom: '10px' }}>
                  Lista de Usuarios
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Dirección</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Fecha de Nacimiento</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.nombres}</TableCell>
                          <TableCell>{user.apellidos}</TableCell>
                          <TableCell>{user.direccion}</TableCell>
                          <TableCell>{user.idCargo}</TableCell>
                          <TableCell>{user.fechaNacimiento}</TableCell>
                          <TableCell>{user.telefono}</TableCell>
                          <TableCell>{user.correo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </div>
          </Container>
        </Paper>
      </Box>
      <ModalMessage open={openModalPedido} onClose={handleCloseModal} />
    </div>
  );
};

export default Users;