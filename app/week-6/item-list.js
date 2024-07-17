import React, { useState } from "react";
import Item from "./item";

const ItemList = ({ items }) => {
  const [sortBy, setSortBy] = useState("name");

  const groupByCategory = (items) => {
    return items.reduce((groups, item) => {
      const group = groups[item.category] || [];
      group.push(item);
      groups[item.category] = group;
      return groups;
    }, {});
  };

  const sortedItems = () => {
    if (sortBy === "name") {
      return [...items]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => <Item key={item.id} {...item} />);
    } else if (sortBy === "category") {
      return [...items]
        .sort((a, b) => a.category.localeCompare(b.category))
        .map((item) => <Item key={item.id} {...item} />);
    } else if (sortBy === "grouped") {
      const grouped = groupByCategory(items);
      return Object.keys(grouped).map((category) => (
        <div key={category}>
          <h3 className="capitalize mt-4 mb-2 text-lg font-semibold">{category}</h3>
          {grouped[category]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <Item key={item.id} {...item} />
            ))}
        </div>
      ));
    }
  };

  return (
    <div className="max-w-7xl mx-6 w-100 px-4">
      <h2 className="font-extrabold text-center bg-clip-padding">Shopping List</h2>
      <div className="flex justify-center space-x-2 my-4">
        <label id="sort">Sort by:</label>
        <button
          className={`rounded-lg px-4 border-neutral-600 ${
            sortBy === "name" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>

        <button
          className={`rounded-lg px-4 border-neutral-600 ${
            sortBy === "category" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setSortBy("category")}
        >
          Category
        </button>
      </div>

      <ul className="list-none m-4 p-4">{sortedItems()}</ul>
    </div>
  );
};

export default ItemList;
