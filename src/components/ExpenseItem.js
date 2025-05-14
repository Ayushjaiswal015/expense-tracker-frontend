// src/components/ExpenseItem.js
import React from 'react';

const ExpenseItem = ({ expense, onDelete, onEdit }) => {
  const { _id, amount, category, description, date } = expense;

  return (
    <div className="expense-item">
      <p><strong>₹{amount}</strong> - {category}</p>
      <p>{description}</p>
      <p>{new Date(date).toLocaleDateString()}</p>
      <button onClick={() => onEdit(expense)}>Edit</button>
      <button onClick={() => onDelete(_id)} style={{ marginLeft: '10px' }}>Delete</button>
    </div>
  );
};

export default ExpenseItem;
