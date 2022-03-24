import React, { useState } from 'react';
import { CREATE_PRODUCT } from '../GraphQL/Mutations';

import { LOAD_PRODUCTS } from './../GraphQL/Queries';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [CreateProduct, { error }] = useMutation(CREATE_PRODUCT);

  const createProduct = () => {
    CreateProduct({
      variables: {
        name: name,
        price: Number(price),
        description: description,
      },
      refetchQueries: [
        {
          query: LOAD_PRODUCTS,
        },
      ],
    }).then((data) => {
      navigate('/');
    });

    if (error) {
      return console.log(error.message);
    }
  };
  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <div className="edit-form-section">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="edit-form-section">
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="edit-form-section">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <br />
      <div className="edit-form-section">
        <input type="button" value="Save Product" onClick={createProduct} />
      </div>
    </div>
  );
};

export default Add;
