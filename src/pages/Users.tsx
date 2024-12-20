import { Typography, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ModalEditUser from './components/ModalEditUser'
import Modal from './components/Modal';
import SelectHousing from './components/SelectHousing';
import ModalError from './components/ModalError'
import NavBar from './components/NavBar';
import { Pencil, Trash2, UserPlus} from 'lucide-react'
import "../styles/globals.css"

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
    if (!userId) {
      console.error("Error: El ID de usuario es nulo o indefinido.");
      setMessage("No se pudo eliminar el usuario porque el ID es inválido.");
      setOpenMessageModal(true);
      return;
    }
  
    setSelectedUsers(userId);
  
    const confirmDelete = window.confirm('¿Está seguro de que desea eliminar este usuario?');
    if (!confirmDelete) return;
  
    try {
      const deleteUrl = `https://comunapp-api.azurewebsites.net/api/persona/${userId}?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D`;
      const response = await axios.delete(deleteUrl);
  
      if (response.status === 200) {
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
      setSelectedUsers(null);
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
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
        }}
      >
        <Paper elevation={4} style={{ padding: '10px', textAlign: 'center', width: '100%', maxWidth: '1200px', margin:'20px'}}>
          <Container>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                margin: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '40%',
                }}
              >
                <Typography style={{ marginBottom: '5px', fontSize:'1.5rem', fontWeight:'bold'}}>Buscar Por Documento</Typography>
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
                  backgroundColor: 'rgb(34, 197, 94)',
                  color: 'white',
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
                <UserPlus style={{marginRight:'4px'}}/>
                Crear
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'rgb(59, 130, 246)',
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = 'rgb(37, 99, 235)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = 'rgb(59, 130, 246)';
                }}
                onClick={handleAssignHousing}
              >
                Asignar/Actualizar Vivienda
              </Button>
            </div>
          </Container>
        </Paper>
  
        <Paper elevation={4} style={{ padding: '10px', textAlign: 'center', width: '100%', maxWidth: '1200px' }}>
          <Container maxWidth="xl" style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Container maxWidth="lg" style={{ marginTop: '20px', textAlign:'left'}}>
                <Typography variant="h5" style={{ marginBottom: '10px', fontWeight:'bold',fontSize:'1.5rem'}}>
                  Lista de Usuarios
                </Typography>
                <TableContainer component={Paper} style={{ maxHeight: 'auto', overflow: 'auto', maxWidth: '100%' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Nombre</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Apellido</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Cargo</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Fecha de Nacimiento</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Teléfono</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Email</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Editar</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Eliminar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers
                        .filter((user) => user.estado === 'A')
                        .map((user) => (
                          <TableRow
                            key={user.id}
                            onClick={() => handleRowClick(user.id)}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: selectedUsers === user.id ? '#e0e0e0' : 'transparent',
                            }}
                          >
                            <TableCell>{user.nombres}</TableCell>
                            <TableCell>{user.apellidos}</TableCell>
                            <TableCell>{getCargoDescription(user.idCargo)}</TableCell>
                            <TableCell>{user.fechaNacimiento}</TableCell>
                            <TableCell>{user.telefono}</TableCell>
                            <TableCell>{user.correo}</TableCell>
                            <TableCell>
                              <Button style={{
                                color: 'rgb(59, 130, 246)',
                              }}
                              onMouseEnter={(e) => {
                                const target = e.target as HTMLButtonElement;
                                target.style.color = 'rgb(37, 99, 235)';
                              }}
                              onMouseLeave={(e) => {
                                const target = e.target as HTMLButtonElement;
                                target.style.color = 'rgb(59, 130, 246)';
                              }} onClick={() => handleOpenEditModal(user)}><Pencil size={18}/></Button>
                            </TableCell>
                            <TableCell>
                            <Button
                              onClick={() => handleDeleteUser(user.id)}
                              style={{color:'rgb(220, 38, 38)'}}
                              onMouseEnter={(e) => {
                                const target = e.target as HTMLButtonElement;
                                target.style.color = 'rgb(220, 38, 38)';
                              }}
                              onMouseLeave={(e) => {
                                const target = e.target as HTMLButtonElement;
                                target.style.color = 'rgb(239, 68, 68)';
                              }}
                            >
                              <Trash2 size={18} />
                            </Button>
                            </TableCell>
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
      <SelectHousing open={OpenModalHousing} onClose={handleCloseModalHousing} idUsuario={selectedUsers} />
      <ModalError open={openMessageModal} onClose={handleCloseMessageModal} message={message} />
      <ModalEditUser open={openEditModal} onClose={handleCloseEditModal} user={selectedUser} />
    </div>
  );      
};

export default Users;