import { AuthContext } from '../contexts/AuthContext';
import React from 'react';

export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}