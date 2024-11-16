import { useRecoilState } from 'recoil';
import { userState } from "../store/atom.ts";
import { useNavigate } from 'react-router-dom';
import { CountrySelector } from './CountrySelector';
import { LogOut, User as UserIcon, Menu } from 'lucide-react';
import { logout } from "../utils/services"
import toast from 'react-hot-toast';
import { useState } from 'react';

export const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.error("Logged out successfully")
      setUser(null);
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        
          <div className="flex items-center">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <CountrySelector />
            
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <UserIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{user?.username}</span>
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                {user?.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg z-50">
          <div className="px-4 py-3 space-y-4">
            <div className="flex justify-center">
              <CountrySelector />
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-700 border-t border-gray-100 pt-3">
              <UserIcon className="h-4 w-4" />
              <span>{user?.username}</span>
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                {user?.role}
              </span>
            </div>
            
            <div className="flex justify-center border-t border-gray-100 pt-3">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};