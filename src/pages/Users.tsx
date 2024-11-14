import { Typography, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ModalEditUser from './components/ModalEditUser'
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

interface Cargo {
  id: number;
  descripcion: string;
}

const Users: React.FC = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openModalPedido, setOpenModalPedido] = useState(false);
  const [OpenModalHousing, setOpenModalHousing] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number | null>(null);

  const API_URL_USERS = 'https://comunapp-api.azurewebsites.net/api/persona?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D';
  const API_URL_CARGOS = 'https://comunapp-api.azurewebsites.net/api/cargo?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL_USERS);
        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchCargos = async () => {
      try {
        const response = await fetch(API_URL_CARGOS);
        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        const data = await response.json();
        setCargos(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
    fetchCargos();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    console.log(userId);
    if (!userId) {
      console.error("Error: El ID de usuario es nulo o indefinido.");
      setMessage("No se pudo eliminar el usuario porque el ID es inválido.");
      setOpenMessageModal(true);
      return;
    }
  
    setSelectedUsers(userId); // Selecciona el usuario al hacer clic en "Eliminar"
  
    const confirmDelete = window.confirm('¿Está seguro de que desea eliminar este usuario?');
    if (!confirmDelete) return;
  
    try {
      const deleteUrl = `https://comunapp-api.azurewebsites.net/api/persona/${userId}?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D`;
      const response = await axios.delete(deleteUrl);
  
      if (response.status === 200) {
        // Remueve el usuario del estado local
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setMessage('Usuario eliminado exitosamente.');
      } else {
        setMessage('No se pudo eliminar el usuario.');
      }
    } catch (error) {
      setMessage('Error al eliminar el usuario.');
      console.error('Error en la eliminación:', error);
    } finally {
      setOpenMessageModal(true);
      setSelectedUsers(null); // Reinicia el usuario seleccionado
    }
  }

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

  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false); 
    setSelectedUser(null);
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

  const getCargoDescription = (id: number): string => {
    const cargo = cargos.find(c => c.id === id);
    return cargo ? cargo.descripcion : 'Desconocido';
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
                        <TableCell>Cargo</TableCell>
                        <TableCell>Fecha de Nacimiento</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Eliminar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers.filter((user) => user.estado === 'A').map((user) => (
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
                          <TableCell>{getCargoDescription(user.idCargo)}</TableCell>
                          <TableCell>{user.fechaNacimiento}</TableCell>
                          <TableCell>{user.telefono}</TableCell>
                          <TableCell>{user.correo}</TableCell>
                          <TableCell><button onClick={() => handleOpenEditModal(user)}>Editar</button></TableCell>
                          <TableCell><button onClick={() => handleDeleteUser(user.id)}>Eliminar</button></TableCell>
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
      <ModalEditUser open={openEditModal} onClose={handleCloseEditModal} user={selectedUser}/>
    </div>
  );
};

export default Users;