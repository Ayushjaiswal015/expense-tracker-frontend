// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    const res = await axios.get('http://localhost:5000/api/expenses');
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    fetchExpenses();
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleFormSubmit = async (formData) => {
    if (editingExpense) {
      // Update existing
      await axios.put(`http://localhost:5000/api/expenses/${editingExpense._id}`, formData);
      setEditingExpense(null);
    } else {
      // Create new
      await axios.post('http://localhost:5000/api/expenses', formData);
    }
    fetchExpenses();
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm onSubmit={handleFormSubmit} editingExpense={editingExpense} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;
