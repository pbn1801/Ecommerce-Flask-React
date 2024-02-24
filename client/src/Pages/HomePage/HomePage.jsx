import React from 'react'
import ProductList from '../../Components/ProductList/ProductList'
import Aside from '../../Components/Aside/Aside';
import Banner from '../../Components/Banner/Banner';
import Footer from '../../Components/Footer/Footer';
import { useState } from 'react';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
      setSearchTerm(term);
  };
  return (
    <div className="container d-flex">
    <Aside/>
    <div className="banner-product col-10">
      <Banner/>
      <ProductList searchTerm={searchTerm}/>
    </div>
  </div>
  )
}

export default HomePage