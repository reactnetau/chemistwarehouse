import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_PRODUCTS } from './../GraphQL/Queries';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import PaginationSetup from '../components/PaginationSetup';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data } = useQuery(LOAD_PRODUCTS);

  useEffect(() => {
    if (data) {
      setup(data.products);
      setProducts(data.products);
      setCurrentIndex(0);
    }
  }, [data]);

  const handleChange = (index) => {
    setCurrentIndex(index);
  };

  function setup(prods) {
    let pages = [];
    var i,
      j,
      temporary,
      chunk = 5;
    for (i = 0, j = prods && prods.length; i < j; i += chunk) {
      temporary = prods.slice(i, i + chunk);
      pages.push(temporary);
    }

    setPages(pages);
  }

  return (
    <div className="home">
      <input
        type="button"
        value="Add Product"
        className="btn-add"
        onClick={() => navigate('/add')}
      />
      <Table products={pages[currentIndex]} />
      <PaginationSetup
        products={products}
        currentIndex={currentIndex}
        onChange={handleChange}
      />
    </div>
  );
};

export default Home;
