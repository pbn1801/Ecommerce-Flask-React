import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupPage from './Pages/SignupPage/SignupPage';
import SigninPage from './Pages/SigninPage/SigninPage';
import HomePage from './Pages/HomePage/HomePage';
import CartPage from './Pages/Cart/CartPage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/'element={<HomePage/>}/>
          <Route path='/dangnhap' element={<SigninPage/>}/>
          <Route path='/dangky' element={<SignupPage/>}/>
          <Route path='/giohang' element={<CartPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
