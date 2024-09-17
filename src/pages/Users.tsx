import { AppBar, Toolbar, IconButton, Typography, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import ModalMessage from './components/Modal';

interface User {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  rol: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
}

const Users: React.FC = () => {
  const [openModalPedido, setOpenModalPedido] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const mockUsers: User[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', direccion: 'Calle Falsa 123', rol: 'Administrador', fechaNacimiento: '1985-05-10', telefono: '555-1234', email: 'juan.perez@example.com' },
    { id: 2, nombre: 'Ana', apellido: 'Gómez', direccion: 'Av. Siempre Viva 742', rol: 'Usuario', fechaNacimiento: '1990-07-20', telefono: '555-5678', email: 'ana.gomez@example.com' },
    { id: 3, nombre: 'Luis', apellido: 'Martínez', direccion: 'Calle 8', rol: 'Moderador', fechaNacimiento: '1983-09-15', telefono: '555-8765', email: 'luis.martinez@example.com' }
  ];

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const handleOpenModal = () => {
    setOpenModalPedido(true);
  };

  const handleCloseModal = () => {
    setOpenModalPedido(false);
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
                          <TableCell>{user.nombre}</TableCell>
                          <TableCell>{user.apellido}</TableCell>
                          <TableCell>{user.direccion}</TableCell>
                          <TableCell>{user.rol}</TableCell>
                          <TableCell>{user.fechaNacimiento}</TableCell>
                          <TableCell>{user.telefono}</TableCell>
                          <TableCell>{user.email}</TableCell>
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