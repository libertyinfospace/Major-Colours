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
import SelectedRankAndUploadVideo from './page/SelectedRankAndUploadVideo';
import RegisterVideoSubmission from './page/RegisterVideoSubmission';
import VideoUploadFailure from './page/VideoUploadFailure';
import ProfilePage from './page/ProfilePage';
import RegisterPage from './page/RegisterPage';
import DressingRoomPage from './page/DressingRoomPage';
import CartPage from './page/CartPage';
import ScrollToTop from './components/ScrollToTop';
import PasswordPage from './page/PasswordPage';

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
      element: <ScrollToTop><LoginPage /></ScrollToTop>,
    },
    {
      path: "/otp",
      element: <ScrollToTop><OtpPage /></ScrollToTop>,
    },
    {
      path: "/password",
      element: <ScrollToTop><PasswordPage /></ScrollToTop>,
    },
    {
      path: "/forgot",
      element: <ScrollToTop><ForgotPasswordPage /></ScrollToTop>,
    },
    {
      path: "/newPassword",
      element: <ScrollToTop><CreateNewPasswordPage /></ScrollToTop>,
    },
    {
      path: "/select-rank",
      element: <ScrollToTop><SelectedRankAndUploadVideo /></ScrollToTop>,
    },
    {
      path: "/register-video",
      element: <ScrollToTop><RegisterVideoSubmission /></ScrollToTop>,
    },
    {
      path: "/profile",
      element: <ScrollToTop><ProfilePage /></ScrollToTop>,
    },
    {
      path: "/upload-failed",
      element: <ScrollToTop><VideoUploadFailure /></ScrollToTop>,
    },
    {
      path: "/register",
      element: <ScrollToTop><RegisterPage /></ScrollToTop>,
    },
    {
      path: "/dressing-room",
      element: <ScrollToTop><DressingRoomPage /></ScrollToTop>,
    },
    {
      path: "/cart",
      element: <ScrollToTop><CartPage /></ScrollToTop>,
    }
  ], {
    scrollBehavior: "auto"
  });

  return (
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  )
}

export default App
