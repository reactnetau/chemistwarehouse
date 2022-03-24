import React, { useEffect, useState } from 'react';
import { DELETE_PRODUCT } from '../GraphQL/Mutations';
import { LOAD_PRODUCTS } from './../GraphQL/Queries';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const Table = ({ products }) => {
  const [data, setData] = useState([]);
  const [nameSorted, setNameSorted] = useState(false);
  const [priceSorted, setPriceSorted] = useState(false);
  const [descriptionSorted, setDescriptionSorted] = useState(false);

  const [DeleteProduct] = useMutation(DELETE_PRODUCT);

  const deleteProduct = (product) => {
    if (window.confirm(`Delete ${product.name}?`) === true) {
      DeleteProduct({
        variables: {
          id: product.id,
        },
        refetchQueries: [{ query: LOAD_PRODUCTS }],
      });
    }
  };

  useEffect(() => {
    setData(products);
  }, [products]);

  const sortData = (sortBy) => {
    var newProducts = [];
    if (sortBy === 'name') {
      if (!nameSorted) {
        newProducts = data.slice().sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

        setNameSorted(true);
        setPriceSorted(false);
        setDescriptionSorted(false);
        setData(newProducts);
      } else {
        newProducts = data.reverse();
        setNameSorted(false);
        setData(newProducts);
      }
    } else if (sortBy === 'price') {
      if (!priceSorted) {
        newProducts = data.slice().sort((a, b) => {
          return a.price - b.price;
        });
        setPriceSorted(true);
        setNameSorted(false);
        setDescriptionSorted(false);
        setData(newProducts);
      } else {
        newProducts = data.reverse();
        setPriceSorted(false);
        setData(newProducts);
      }
    } else if (sortBy === 'description') {
      if (!descriptionSorted) {
        newProducts = data.slice().sort((a, b) => {
          let fa = a.description.toLowerCase(),
            fb = b.description.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

        setDescriptionSorted(true);
        setNameSorted(false);
        setPriceSorted(false);
        setData(newProducts);
      } else {
        newProducts = data.reverse();
        setDescriptionSorted(false);
        setData(newProducts);
      }
    }
  };
  const orderByName = () => {
    sortData('name');
  };

  const orderByPrice = () => {
    sortData('price');
  };

  const orderByDescription = () => {
    sortData('description');
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="button"
                className="btn"
                value="Name"
                onClick={orderByName}
              />
            </th>
            <th>
              <input
                type="button"
                className="btn"
                value="Price"
                onClick={orderByPrice}
              />
            </th>
            <th>
              <input
                type="button"
                className="btn"
                value="Description"
                onClick={orderByDescription}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index} className="table-row">
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td className="btn-data">
                    <Link
                      to="/edit"
                      state={{ product: item }}
                      className="btn-link"
                    >
                      Edit
                    </Link>
                    <input
                      type="button"
                      className="btn-link"
                      value="Delete"
                      onClick={() => deleteProduct(item)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
