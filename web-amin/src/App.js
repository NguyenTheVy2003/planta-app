// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './user/Login';
import Add from './product/Add'
import Edit from './product/Edit'
import List from './product/List'
import ListCategory from './category/ListCategory';
import Verify from './user/Verify';
import ResetPassword from './user/ResetPass';
import React, { useState }  from 'react';
import {
  BrowserRouter as Router , Routes, Route, 
  Navigate, Outlet
} from 'react-router-dom';
import AddCategory from './category/AddCategory';
import EditCategory from './category/EditCategory';

function App() {
  const getUserInfoFromLocalStorage = () =>{
    const userInfo = localStorage.getItem('user');
    if(userInfo){
      return JSON.parse(userInfo)
    }
    return null;
  }

  const saveUserInfoToLocalStorage = (userInfo) =>{
    if(!userInfo){
      localStorage.removeItem('user')
      setUser(null);
    }else{
      localStorage.setItem('user',JSON.stringify(userInfo));
      setUser(userInfo);
    }
  }

  const [user, setUser] = useState(getUserInfoFromLocalStorage);

  // các trang không cần login
  const PublicRoute = () => {
    if(user){
      return <Navigate to="/"/> // đã login vào thẳng trang chủ
    }
    return <Outlet />
  }

   // các trang không cần login
   const PrivateRoute = () => {
    if(!user){
      return <Navigate to="/Login"/> // chưa login thì cho vào trang login
    }
    return <Outlet />
  }
  
  return (
    <div>
     <Router>
        <Routes>
        <Route path="/Verify-user/:id" element={<Verify />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route element={<PublicRoute />} >
            <Route path="/login" 
                element={<Login saveUserInfo={saveUserInfoToLocalStorage} />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<List setUser={saveUserInfoToLocalStorage}/>}/>
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/category" element={<ListCategory />} />
            <Route path="/category/add" element={<AddCategory />} />
            <Route path="/category/edit/:id" element={<EditCategory />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
