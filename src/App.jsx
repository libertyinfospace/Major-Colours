import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import './App.css'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage';
import Layout from './components/Layout';
import AboutPage from './page/AboutPage';
import { Provider } from 'react-redux';
import store from './store/store';

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
