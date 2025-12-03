
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Navbar from './components/Navbar';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import AddPost from './page/AddPost';
import Profile from './page/Profile';
import EditPost from './page/EditPost';

import { UsersProvider } from './context/UserContext';
import { PostProvider } from './context/PostContext';


function App() {
  return (
    <>
      <UsersProvider>
        <PostProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/addpost" element={<AddPost />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/editpost/:id" element={<EditPost />}></Route>
            </Routes>
          </Router>
        </PostProvider>
      </UsersProvider>
    </>
  )
}

export default App
