import { AppBar, Toolbar, IconButton, Typography, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ModalMessage from './components/Modal';

interface Vivienda {
  id: number;
  direccion: string;
  fechaCreacion: string;
  codigoUsuarioCrea: string;
}

const housingpage: React.FC = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [openModalPedido, setOpenModalPedido] = useState(false);
  const [viviendas, setViviendas] = useState<Vivienda[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'https://comunapp-api.azurewebsites.net/api/vivienda?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D';

  useEffect(() => {
    const fetchViviendas = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        const data = await response.json();
        setViviendas(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchViviendas();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModalPedido(true);
  };

  const handleCloseModal = () => {
    setOpenModalPedido(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const filteredViviendas = viviendas.filter(vivienda =>
    vivienda.direccion.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Paper elevation={4} style={{ padding: '10px', textAlign: 'center' }}>
          <Container maxWidth="xl" style={{ flex: "200", width: "100%" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
              <AppBar position="static">
                <Toolbar style={{ backgroundColor: 'white' }}>
                  <IconButton edge="start" color="inherit" aria-label="menu" sx={{ width: '40px', height: '50px', borderRadius: '0', mr: 2, backgroundColor: 'gray' }}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'gray', fontWeight: 'bold' }}>
                    Junta de Acción Comunal Santo Tomás
                  </Typography>
                  <Box display="flex" flexDirection="column" alignItems="flex-end">
                    <Typography variant="body1" style={{ color: 'gray' }}>{user?.nombres} {user?.apellidos}</Typography>
                    <Typography variant="body2" style={{ color: 'gray' }}>{user?.idCargo}</Typography>
                  </Box>
                </Toolbar>
              </AppBar>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', margin: '10px' }}>
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
                  <Typography style={{ marginBottom: '5px' }}>Buscar Por Dirección</Typography>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Ingrese dirección"
                  />
                </div>
              </div>
              <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                <Typography variant="h5" style={{ marginBottom: '10px' }}>
                  Lista de Viviendas
                </Typography>
                <TableContainer component={Paper} style={{ maxHeight: 'auto', overflow: 'auto', maxWidth: '100%' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Dirección</TableCell>
                        <TableCell>Fecha de Creación</TableCell>
                        <TableCell>Usuario Creador</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredViviendas.map((vivienda) => (
                        <TableRow key={vivienda.id}>
                          <TableCell>{vivienda.id}</TableCell>
                          <TableCell>{vivienda.direccion}</TableCell>
                          <TableCell>{vivienda.fechaCreacion}</TableCell>
                          <TableCell>{vivienda.codigoUsuarioCrea}</TableCell>
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

export default housingpage;
