// src/components/ExpenseList.js
import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  return (
    <div>
      {expenses.map(exp => (
        <ExpenseItem
          key={exp._id}
          expense={exp}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
