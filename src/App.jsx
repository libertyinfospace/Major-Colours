import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import './App.css'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage';
import Layout from './components/Layout';
import AboutPage from './page/AboutPage';
import { Provider } from 'react-redux';
import store from './store/store';
import OtpPage from './page/OtpPage';
import ForgotPasswordPage from './page/ForgotPasswordPage';
import CreateNewPasswordPage from './page/CreateNewPasswordPage';
import RegisterPage from './page/RegisterPage';
import RegisterVideoSubmission from './page/RegisterVideoSubmission';
import VideoUploadFailure from './page/VideoUploadFailure';

function App() {


  const router = createBrowserRouter([

    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        }
      ]
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/otp",
      element: <OtpPage />,
    },
    {
      path: "/forgot",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/newPassword",
      element: <CreateNewPasswordPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/register-video",
      element: <RegisterVideoSubmission />,
    },
    {
      path: "/upload-failed",
      element: <VideoUploadFailure />,
    }



  ] );

  return (
    <Provider store={store}>

    <RouterProvider router={router}>
    </RouterProvider>
    </Provider>
  )
}

export default App
