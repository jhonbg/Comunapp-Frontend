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
      p: 5,
      minWidth: 'auto',
      width: 'auto'}}>
        <Typography id="modal-modal-title" variant='h5' sx={{fontWeight: 'bold'}}>
          Nuevo usuario
        </Typography>
        <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
            <Typography id="modal-modal-description" variant='h6' sx={{ mt: 2 }}>
            Detalles de Usuario
            </Typography>
            <Button onClick={onClose}>X</Button>
        </div>
        <div style={{display: 'flex', flexDirection:'row', gap: '16px'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography>Nombre/es*</Typography>
                    <input type="text" />
                </div>
                <div>
                    <Typography>Apellidos*</Typography>
                    <input type="text" />
                </div>
                <div>
                    <Typography>Dirección</Typography>
                    <input type='text'/>
                </div>
            </div>
        <div id='RolFecha' style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex' ,flexDirection:'row', gap: '16px'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography>Rol*</Typography>
                    <input type="text" />
                </div>
                <div>
                    <Typography>Fecha de nacimiento</Typography>
                    <input type="date" />
                </div>
                <div>
                    <Typography>Número de teléfono o celular*</Typography>
                    <input type="text" />
                </div>
            </div>
            <div style={{display:'flex' ,flexDirection:'row', gap: '16px'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography>Fecha de afiliación*</Typography>
                    <input type="date" />
                </div>
                <div>
                    <Typography>Fecha de residencia</Typography>
                    <input type="date" />
                </div>
                <div>
                    <Typography>Posee algún tipo de discapacidad?*</Typography>
                    <select>
                        <option value="0">si</option>
                        <option value="1">no</option>
                    </select>
                </div>
            </div>
            <div style={{display: 'flex',flexDirection:'row', gap: '16px'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography>Tipo de Documento*</Typography>
                    <select>
                        <option value="0">Cedula de ciudadania</option>
                        <option value="1">Cedula de extrangeria</option>
                        <option value="2">Pasaporte</option>
                        <option value="3">Targeta de identidad</option>
                        <option value="4">Registro civil</option>
                    </select>
                </div>
                <div>
                    <Typography>Documento*</Typography>
                    <input type="text" />
                </div>
                <div>
                    <Typography>Cual?</Typography>
                    <input type='text'/>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection:'row', gap: '16px'}}>
                <div>
                    <Typography>Email*</Typography>
                    <input type="text" />
                </div>
                <div>
                    <Typography>Grupo étnico</Typography>
                    <select>
                        <option value="0">Indígenas</option>
                        <option value="1">Afrocolombianos </option>
                        <option value="2">⁠Raizales del archipiélago de San Andrés y providencia</option>
                        <option value="3">⁠Rom o gitano</option>
                    </select>
                </div> 
            </div>
            <div style={{display: 'flex', flexDirection:'row', gap: '16px'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography>Hace parte de la Comunidad LGTBIQ+*</Typography>
                    <select>
                        <option value="0">si</option>
                        <option value="1">no</option>
                    </select>
                </div>
                <div>
                    <Typography>Cargo*</Typography>
                    <select>
                        <option value="0">Presidente</option>
                        <option value="1">Fiscal</option>
                        <option value="1">Secretario</option>
                    </select>
                </div>
                <div>
                    <Typography>Nivel académico</Typography>
                    <select>
                        <option value="0">Primaria</option>
                        <option value="1">Bachiller</option>
                        <option value="2">Profecional</option>
                    </select>
                </div>
            </div>
            <div style={{justifyContent: 'center',alignItems: 'center'}}>
                <button style={{background:"grey", color: 'white', width: '150px'}}>Crea Usuario</button>
            </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalMessage;