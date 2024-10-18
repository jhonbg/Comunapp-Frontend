import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUser } from '../../UserContext';

interface ModalHousingProps {
  open: boolean;
  onClose: () => void;
  onAddVivienda: (nuevaVivienda: { direccion: string; fechaCreacion: string; codigoUsuarioCrea: string }) => void;
}

  const ModalHousing: React.FC<ModalHousingProps> = ({ open, onClose, onAddVivienda}) => {
    const [direccion, setDireccion] = useState('');
    const { user } = useUser();
    const obtenerFechaActual = (): string => {
        const hoy = new Date();
        const año = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
      
        return `${año}-${mes}-${dia}`;
      };

      const handleCrearVivienda = () => {
        const nuevaVivienda = {
          direccion,
          fechaCreacion: obtenerFechaActual(),
          codigoUsuarioCrea: user?.name || ''
        };
    
        onAddVivienda(nuevaVivienda);
      };
    
      const handleTextoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const upperCaseValue = e.target.value.toUpperCase();
        setDireccion(upperCaseValue);
      };
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
        minWidth: '20%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="modal-modal-title" variant='h5' sx={{ fontWeight: 'bold' }}>
            Nueva vivienda
          </Typography>
          <Button onClick={onClose}>X</Button>
        </div>

        <Typography id="modal-modal-description" variant='h6' sx={{ mt: 1 }}>
          Detalles de la vivienda
        </Typography>

        <div style={{ display:'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Typography>Dirección*</Typography>
            <input type="text" style={{ minWidth: '100%'}} value={direccion} onChange={(e) => handleTextoChange(e)}/>
          </div>
        </div>
        <Button variant="contained" onClick={handleCrearVivienda}>Crear Usuario</Button>
      </Box>
    </Modal>
  );
};

export default ModalHousing;