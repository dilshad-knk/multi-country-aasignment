
import { useRecoilState } from 'recoil';
import { userState } from "../store/atom.ts";
import { Navigate } from 'react-router-dom';
import { CountrySelector } from './CountrySelector';
import { LogOut, User as UserIcon } from 'lucide-react';
import {logout} from "../utils/services"
import toast from 'react-hot-toast';

export const Header = () => {
  const [user, setUser] = useRecoilState(userState);


  

  const handleLogout = async () => {
    try {
     
      await logout();
      toast.error("Logged out successfully")
      
      setUser(null);
      <Navigate to="/login" />

    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <CountrySelector  />
            
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <UserIcon className="h-4 w-4" />
              <span>{user?.username}</span>
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                {user?.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};