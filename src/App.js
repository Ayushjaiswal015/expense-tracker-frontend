// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

// Env variable se base API URL le
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/expenses';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    const res = await axios.get(API_URL);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleFormSubmit = async (formData) => {
    if (editingExpense) {
      // Update existing
      await axios.put(`${API_URL}/${editingExpense._id}`, formData);
      setEditingExpense(null);
    } else {
      // Create new
      await axios.post(API_URL, formData);
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
