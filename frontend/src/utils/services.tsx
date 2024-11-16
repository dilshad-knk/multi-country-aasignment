
import instance from '../axios/axios';


export const logout = async () => {
  try {
    await instance.post('/api/v1/logout');
    
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
  } catch (error) {
    console.error('Error during logout:', error);
  }
};