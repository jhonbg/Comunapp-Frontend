import {Typography, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ModalHousing from './components/ModalHousing';
import NavBar from './components/NavBar';
import axios from 'axios';
import { HousePlus } from 'lucide-react'

interface Vivienda {
  id: number;
  direccion: string;
  fechaCreacion: string;
  codigoUsuarioCrea: string;
}

const housingpage: React.FC = () => {
  const location = useLocation();
  location.state?.user;
  const [openModalPedido, setOpenModalPedido] = useState(false);
  const [viviendas, setViviendas] = useState<Vivienda[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'https://comunapp-api.azurewebsites.net/api/vivienda?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D';

  useEffect(() => {
    const fetchViviendas = async () => {
      try {
        const response = await axios.get(API_URL);
        setViviendas(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
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

  const refetchViviendas = async () => {
    try {
      setIsUpdating(true);
      const response = await axios.get(API_URL);
      setViviendas(response.data);
    } catch (error) {
      console.error('Error al actualizar las viviendas:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddVivienda = async (nuevaVivienda: { direccion: string; fechaCreacion: string; codigoUsuarioCrea: string }) => {
    try {
      setIsUpdating(true);
      await axios.post(API_URL, nuevaVivienda);
      alert('Vivienda creada exitosamente');
      await refetchViviendas(); 
      handleCloseModal();
    } catch (error) {
      console.error('Error al agregar vivienda:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const filteredViviendas = viviendas.filter(vivienda =>
    vivienda.direccion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavBar/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          height: '100vh',
          padding: 2,
        }}
      >
        <Paper elevation={4}
          sx={{
            width: '100%',
            maxWidth: '1200px',
            padding: 2,
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', margin: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '40%' }}>
              <Typography style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '1.5rem'}}>Buscar Por Dirección</Typography>
                <input
                  type="text"
                  style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Ingrese dirección"
              />
            </div>
            <Button
              variant="contained"
              style={{
                background: 'rgb(34, 197, 94)',
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = 'rgb(22, 163, 74)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = 'rgb(34, 197, 94)';
             }}
             onClick={handleOpenModal}
            >
              <HousePlus style={{marginRight:'4px'}} size={18}/>
                Crear
            </Button>
          </div>
        </Paper>
        <Paper elevation={4}
          sx={{
            width: '100%',
            maxWidth: '1200px',
            padding: 2,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="xl" style={{ flex: "200", width: "100%" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
              <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                <Typography variant="h5" style={{ marginBottom: '10px' }}>
                  Lista de Viviendas
                </Typography>
                {isUpdating && <div style={{ color: 'blue', marginBottom: '10px' }}>Actualizando datos...</div>}
                <TableContainer component={Paper} style={{ maxHeight: 'auto', overflow: 'auto', maxWidth: '100%' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{background:'rgb(22, 163, 74)', color: 'white'}}>ID</TableCell>
                        <TableCell style={{background:'rgb(22, 163, 74)', color: 'white'}}>Dirección</TableCell>
                        <TableCell style={{background:'rgb(22, 163, 74)', color: 'white'}}>Fecha de Creación</TableCell>
                        <TableCell style={{background:'rgb(22, 163, 74)', color: 'white'}}>Usuario Creador</TableCell>
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
      <ModalHousing open={openModalPedido} onClose={handleCloseModal} onAddVivienda={handleAddVivienda}/>
    </div>
  );
};

export default housingpage;
