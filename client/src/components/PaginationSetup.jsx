import React from 'react';
import { Pagination } from 'react-bootstrap';

//Sets up Pagination
const PaginationSetup = ({ products, currentIndex, onChange }) => {
  var pages = products && Math.ceil(products.length / 5);
  var active = currentIndex + 1;
  var prods = [];

  for (let number = 1; number <= pages; number++) {
    prods.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          console.log('on change');
          onChange(number - 1);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div className="pagination">
      <Pagination size="lg">{prods}</Pagination>
    </div>
  );

  return paginationBasic;
};

export default PaginationSetup;
