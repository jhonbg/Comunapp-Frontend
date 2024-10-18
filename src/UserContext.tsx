import React, { createContext, useContext, useState } from 'react';

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
  name: string;
}

const UserContext = createContext<{ user: User | null; setUser: (user: User | null) => void }>({ user: null, setUser: () => {} });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);