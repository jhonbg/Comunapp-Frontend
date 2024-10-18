import { Typography, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import SelectHousing from './components/SelectHousing';
import ModalError from './components/ModalError'
import NavBar from './components/NavBar';

interface User {
  id: number;
  nombres: string;
  apellidos: string;
  tipoIdentificacion: number;
  identificacion: string;
  correo: string;
  direccion: string;
  celular: string;
  telefono: string;
  idCargo: number;
  fechaNacimiento: string;
  fechaInicioResidencia: string;
  discapacidad: boolean;
  idGrupoEtnico: number;
  lgtbiq: boolean;
  idNivelAcademico: number;
  estado: string;
}

const Users: React.FC = () => {
  const [openModalPedido, setOpenModalPedido] = useState(false);
  const [OpenModalHousing, setOpenModalHousing] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number | null>(null);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModalPedido(true);
  };

  const handleCloseModal = () => {
    setOpenModalPedido(false);
  };

  const handleCloseModalHousing = () => {
    setOpenModalHousing(false);
  };

  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
  };

  const handleRowClick = (id: number) => {
    setSelectedUsers(id === selectedUsers ? null : id);
};

  if (loading) {
    return <div>Cargando...</div>;
  }

  const filteredUsers = users.filter(user =>
    user.identificacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignHousing = () => {
    if (selectedUsers === null) {
      setMessage('Por favor, seleccione un usuario para asignar o actualizar la vivienda.');
      setOpenMessageModal(true);
    } else {
      setOpenModalHousing(true);
    }
  };

  return (
    <div>
      <NavBar/>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper elevation={4} style={{ padding: '10px', textAlign: 'center'}}>
          <Container maxWidth="xl" style={{ flex: "200", width: "100%" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
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
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} 
                  value={searchTerm} 
                  onChange={handleSearchChange} 
                  placeholder="Ingrese documento"
                />
              </div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'darkgray',
                  color: 'black',
                }}
                onClick={handleAssignHousing}
              >
                Asignar/Actualizar Vivienda
              </Button>
            </div>
              <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                <Typography variant="h5" style={{ marginBottom: '10px' }}>
                  Lista de Usuarios
                </Typography>
                <TableContainer component={Paper} style={{maxHeight: 'auto', overflow: 'auto', maxWidth: '100%'}}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Dirección</TableCell>
                        <TableCell>Cargo</TableCell>
                        <TableCell>Fecha de Nacimiento</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow 
                        key={user.id}
                        onClick={() => handleRowClick(user.id)}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: selectedUsers === user.id ? '#e0e0e0' : 'transparent'
                        }}
                        >
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
      <Modal open={openModalPedido} onClose={handleCloseModal} />
      <SelectHousing open={OpenModalHousing} onClose={handleCloseModalHousing} idUsuario={selectedUsers}/>
      <ModalError open={openMessageModal} onClose={handleCloseMessageModal} message={message} />
    </div>
  );
};

export default Users;