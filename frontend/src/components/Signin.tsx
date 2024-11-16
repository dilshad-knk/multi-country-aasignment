
import { useState } from 'react';
import instance from '../axios/axios';
import { useNavigate } from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import { userState } from '../store/atom';
import toast from 'react-hot-toast';

const Login = () => {
 
  const [email, setEmail] = useState<any>('admin@example.com');
  const [password, setPassword] = useState<any>('adminpwd');
  const setUser = useSetRecoilState<any>(userState);

  const navigate =useNavigate()

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await instance.post('/api/v1/login', {
        email,
        password
      });

      navigate('/')

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);

      setUser(user);

     

      toast.success("Signed In Successfully")
      
      
    } catch (err) {
      
      toast.error("Login failed")

    }
  };


  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" id="email"  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input type="password" id="password"  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {/* {error && <div className="text-red-500 text-sm mb-4">{error}</div>} */}
          <button type="submit" className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600">Login</button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">Don't have an account?</p>
          <button
          onClick={handleSignUpRedirect}
          className="text-indigo-500 font-semibold hover:underline mt-2"
        >
          Sign Up
        </button>
        </div>
      </div>
      </div>
  );
};

export default Login;
