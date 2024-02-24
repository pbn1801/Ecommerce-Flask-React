import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter, Route, Routes, Router} from 'react-router-dom'
import SignupPage from './Pages/SignupPage/SignupPage';
import SigninPage from './Pages/SigninPage/SigninPage';
import HomePage from './Pages/HomePage/HomePage';
import CartPage from './Pages/Cart/CartPage';
import { useState } from 'react';
import ProductList from './Components/ProductList/ProductList';
import Aside from './Components/Aside/Aside';
import Banner from './Components/Banner/Banner';
import Footer from './Components/Footer/Footer';
import Admin from './Admin/Admin'



function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
      setSearchTerm(term);
  };
  
  return (
    <div className="app">
    <BrowserRouter>
      <Header onSearch={handleSearch}/>
      <Routes>
        <Route path='/dangnhap' element={<SigninPage/>}/>
        <Route path='/dangky' element={<SignupPage/>}/>
        <Route path='/'element={
          <div className="container d-flex">
          <Aside />
          <div className="banner-product col-10">
            <Banner />
            <ProductList searchTerm={searchTerm} />
          </div>
        </div>
        }/>
        <Route path='/giohang' element={<CartPage/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
      <Footer/> 
    </BrowserRouter>

    {/* <div className="container d-flex">
      <Aside/>
      <div className="banner-product col-10">
        <Banner/>
        <ProductList searchTerm={searchTerm}/>
      </div>
    </div> */}
    {/* <Header/> */}
    {/* <div className="container d-flex">
      <Aside/>
      <div className="banner-product col-10">
        <Banner/>
        <ProductList/>
      </div>
    </div> */}
  </div>
  );
}

export default App;
