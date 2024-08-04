import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

const ShoppingListPage = () => {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, category: '' });
  
  useEffect(() => {
    const loadItems = async () => {
      if (user) {
        try {
          const itemsList = await getItems(user.uid);
          setItems(itemsList);
        } catch (error) {
          console.error("Error loading items: ", error);
        }
      }
    };

    loadItems();
  }, [user]);

  const handleAddItem = async () => {
    if (!user) return;

    try {
      const newItemId = await addItem(user.uid, newItem);
      setItems([...items, { ...newItem, id: newItemId }]);
      setNewItem({ name: '', quantity: 1, category: '' }); // Reset form
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  if (!user) {
    return <p>Please log in to view your shopping list.</p>;
  }

  return (
    <div>
      <h1>Shopping List</h1>
      <div>
        <h2>Add New Item</h2>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Item Name"
        />
        <input
          type="number"
          name="quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
        />
        <input
          type="text"
          name="category"
          value={newItem.category}
          onChange={handleInputChange}
          placeholder="Category"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} - {item.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListPage;
