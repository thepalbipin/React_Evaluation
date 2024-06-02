import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import PrivateRoute from './PrivateRoute';

export default function AllRoutes() {
  return (
    <Routes>

      <Route path='/login' element={<Login />} />

      <Route 
        path='/' 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } 
      />

      <Route 
        path='/product/view/:id' 
        element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}
