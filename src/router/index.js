import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DetailRecipe from '../pages/DetailRecipe';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Addrecipe from '../pages/AddRecipe';
import Searchrecipe from '../pages/Search';
import EditRecipe from '../pages/EditRecipe';
// -------
import LandingPage from '../pages/LandingPage';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

const route = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/:id" element={<PrivateRoute />}>
          <Route index element={<DetailRecipe />} />
        </Route>

        <Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<Profile />} />
        </Route>

        <Route path="/addrecipe" element={<PrivateRoute />}>
          <Route index element={<Addrecipe />} />
        </Route>

        <Route path="/recipe" element={<PrivateRoute />}>
          <Route index element={<Searchrecipe />} />
        </Route>

        <Route path="/editrecipe" element={<PrivateRoute />}>
          <Route index element={<EditRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default route;
