import React, {useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUser } from '../../UserContext';

interface ModalTeamsProps {
    open: boolean;
    onClose: () => void;
  }

const ModalTeams: React.FC<ModalTeamsProps> = ({ open, onClose}) => {
    const { user } = useUser();
    const [titulo, setTitulo] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [ordenDia, setOrdenDia] = useState('');

    const handleCreateReunion = async () => {
        if (!titulo || !fechaInicio || !fechaFin || !ordenDia) {
          alert('Por favor completa todos los campos.');
          return;
        }
    
        const formatDateTime = (dateString: string): string => {
            const date = new Date(dateString);
            const [month, day, year] = [
              (date.getMonth() + 1).toString().padStart(2, '0'),
              date.getDate().toString().padStart(2, '0'),
              date.getFullYear(),
            ];
            const [hours, minutes, seconds] = [
              date.getHours().toString().padStart(2, '0'),
              date.getMinutes().toString().padStart(2, '0'),
              date.getSeconds().toString().padStart(2, '0'),
            ];
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
          };

        const payload = {
          titulo,
          fechaInicioReunion: formatDateTime(fechaInicio),
          fechaFinReunion: formatDateTime(fechaFin),
          ordenDia,
          codigoUsuarioCrea: user?.name || 'usuario_desconocido',
          estado: "A"
        };
    
        try {
          const response = await fetch(
            'https://comunapp-api.azurewebsites.net/api/reunion?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }
          );
    
          if (response.ok) {
            alert('Reunión creada exitosamente.');
            onClose();
          } else {
            const errorData = await response.json();
            console.error('Error al crear la reunión:', errorData);
            console.log(payload)
            alert('Ocurrió un error al crear la reunión.');
          }
        } catch (error) {
          console.error('Error al hacer POST:', error);
          alert('Error de conexión al crear la reunión.');
        }
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
        minWidth: '50%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="modal-modal-title" variant='h5' sx={{ fontWeight: 'bold', fontSize: '1.5rem'}}>
            Nuevo reunion
          </Typography>
          <Button style={{color:'#059669'}} onClick={onClose}>X</Button>
        </div>

        <Typography id="modal-modal-description" variant='h6' sx={{ color:'#059669'}}>
          Detalles de la reunion
        </Typography>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Titulo*</Typography>
            <input type="text" placeholder='Ingrese nombre' style={{ width: '100%', border:'1px solid #A7f3D0'}} onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Fecha Fin De La Reunion*</Typography>
            <input type='datetime-local' value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} style={{ width: '100%', border:'1px solid #A7f3D0' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Fecha Inicio De La Reunion*</Typography>
            <input type='datetime-local' value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} style={{ width: '100%', border:'1px solid #A7f3D0' }} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
        <Typography>Orden del día*</Typography>
          <textarea
            value={ordenDia}
            onChange={(e) => setOrdenDia(e.target.value)} placeholder="Ingrese el orden de la reunión" style={{ width: '100%', border: '1px solid #A7f3D0', height: '80px' }}/>
        </div>
        <Button variant="contained" style={{ width:"100%", backgroundColor:'#059669'}} onClick={handleCreateReunion}>Crear Reunion</Button>
      </Box>
    </Modal>
  )
}

export default ModalTeams
