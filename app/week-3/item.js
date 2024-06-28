import React from 'react';

const Item = ({ name, quantity, category }) => {
  return (
    <li className="p-2 border-b border-gray-200">
      <div className="font-bold">{name}</div>
      <div className="text-gray-600">{quantity} ({category})</div>
    </li>
  );
};

export default Item;

