import { setBearerToken } from '@/http';

export const setHeaderToken = token => setBearerToken(token);

export const getLocalToken = () => localStorage.getItem('os_token');
export const deleteLocalToken = () => localStorage.removeItem('os_token');
export const setLocalToken = token => localStorage.setItem('os_token', token);

export const getLocalUsuario = () => JSON.parse(localStorage.getItem('os_usuario'));
export const deleteLocalUsuario = () => localStorage.removeItem('os_usuario');
export const setLocalUsuario = usuario => localStorage.setItem('os_usuario', JSON.stringify(usuario));