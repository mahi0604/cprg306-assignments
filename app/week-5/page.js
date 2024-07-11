
import React from 'react';
import ItemList from './item-list';

const Page = () => {
  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping List</h1>
      <ItemList />
    </main>
  );
};

export default Page;
