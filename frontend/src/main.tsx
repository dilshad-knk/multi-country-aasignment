import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage.tsx'
import SignUp from './components/Signup.tsx'
import Login from './components/Signin.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import { Toaster } from 'react-hot-toast';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App/>

      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(

  <RecoilRoot>
       <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <RouterProvider router={router} />
    </RecoilRoot>,

)
