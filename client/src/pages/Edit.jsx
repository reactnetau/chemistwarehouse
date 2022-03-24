import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UPDATE_PRODUCT } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);

  const [UpdateProduct, { error }] = useMutation(UPDATE_PRODUCT);

  const updateProduct = () => {
    UpdateProduct({
      variables: {
        id: product.id,
        name: name,
        price: Number(price),
        description: description,
      },
    }).then(() => {
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
        <input type="button" value="Update" onClick={updateProduct} />
      </div>
    </div>
  );
};

export default Edit;
