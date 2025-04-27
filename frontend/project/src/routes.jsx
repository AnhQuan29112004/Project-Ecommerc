import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import VendorList from './pages/VendorList';
import ProtectedRoute from './guard/ProtectedRoute';
import Store from './pages/Store'; // Thêm trang Store
import Categories from './pages/ProductCategory'; // Thêm trang Categories
import Category from './pages/Category'; // Thêm trang Category
import Cart from './pages/Cart'; // Thêm trang Cart
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout  />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <Home />,  // Truy cập "/" sẽ vào Home
          },
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'store',
            element: <Store />,
          },
          {
            path: 'categories',
            element: <Categories />,
          },
          {
            path: 'categories/:slug',
            element: <Category />,
          },
          {
            path: 'product/:slug',
            element: <ProductDetail />,
          },
          {
            path: 'vendors',
            element: <VendorList />,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
        ],
      },
      {
        path: '/home/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  
]);

export default router;