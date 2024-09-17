import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ModalMessageProps {
  open: boolean;
  onClose: () => void;
}

const ModalMessage: React.FC<ModalMessageProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 5,
        p: 4,
        minWidth: '60%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography id="modal-modal-title" variant='h5' sx={{ fontWeight: 'bold' }}>
            Nuevo usuario
          </Typography>
          <Button onClick={onClose}>X</Button>
        </div>

        <Typography id="modal-modal-description" variant='h6' sx={{ mt: 1 }}>
          Detalles de Usuario
        </Typography>

        {/* Nombre, Apellidos y Dirección */}
        <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
                <Typography>Nombre/es*</Typography>
                <input type="text" style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
                <Typography>Apellidos*</Typography>
                <input type="text" style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
                <Typography>Dirección</Typography>
                <input type="text" style={{ width: '100%' }} />
            </div>
        </div>

        {/* Rol y Otros Detalles */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Rol*</Typography>
            <input type="text" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Fecha de nacimiento</Typography>
            <input type="date" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Número de teléfono o celular*</Typography>
            <input type="text" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Fechas */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Fecha de afiliación*</Typography>
            <input type="date" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Fecha de residencia</Typography>
            <input type="date" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Posee algún tipo de discapacidad?*</Typography>
            <select style={{ width: '100%' }}>
              <option value="0">Sí</option>
              <option value="1">No</option>
            </select>
          </div>
        </div>

        {/* Tipo de Documento */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Tipo de Documento*</Typography>
            <select style={{ width: '100%' }}>
              <option value="0">Cédula de ciudadanía</option>
              <option value="1">Cédula de extranjería</option>
              <option value="2">Pasaporte</option>
              <option value="3">Tarjeta de identidad</option>
              <option value="4">Registro civil</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Documento*</Typography>
            <input type="text" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Cual?</Typography>
            <input type="text" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Email y Grupo Étnico */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Email*</Typography>
            <input type="email" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Grupo étnico</Typography>
            <select style={{ width: '100%' }}>
              <option value="0">Indígenas</option>
              <option value="1">Afrocolombianos</option>
              <option value="2">Raizales del archipiélago de San Andrés</option>
              <option value="3">Rom o gitano</option>
            </select>
          </div>
        </div>

        {/* LGTBIQ+, Cargo y Nivel Académico */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Hace parte de la Comunidad LGTBIQ+*</Typography>
            <select style={{ width: '100%' }}>
              <option value="0">Sí</option>
              <option value="1">No</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Cargo*</Typography>
            <select style={{ width: '100%' }}>
              <option value="0">Presidente</option>
              <option value="1">Fiscal</option>
              <option value="2">Secretario</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Nivel académico</Typography>
            <select style={{ width: '100%' }}>
              <option value="0">Primaria</option>
              <option value="1">Bachiller</option>
              <option value="2">Profesional</option>
            </select>
          </div>
        </div>

        {/* Botón */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button style={{ background: "grey", color: 'white', width: '150px' }}>Crear Usuario</button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalMessage;