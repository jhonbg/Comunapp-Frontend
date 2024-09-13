import { Container, Button, Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import ModalMessage from './components/Modal'; // Asegúrate de que la ruta sea correcta

const Users: React.FC = () => {
  const [openModalPedido, setOpenModalPedido] = useState(false);

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
          height: '100vh',
        }}
      >
        <Paper elevation={6} style={{ padding: '20px', textAlign: 'center' }}>
          <Container maxWidth="xl" style={{ flex: "200", width: "100%" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
              <Typography variant="h4" style={{ marginBottom: '20px' }}>
                Crear Acción
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '40%' }}
                onClick={handleOpenModal} // Al hacer clic, se abrirá el modal
              >
                Crear
              </Button>
            </div>
          </Container>
        </Paper>
      </Box>
      <ModalMessage
        open={openModalPedido}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Users;