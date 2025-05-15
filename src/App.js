// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

// Env variable se base API URL le
const API_URL = 'https://expense-tracker-backend-vgn3.onrender.com/api/expenses';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API_URL);
      setExpenses(res.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      // You might want to show an error message to the user here
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingExpense) {
        await axios.put(`${API_URL}/${editingExpense._id}`, formData);
        setEditingExpense(null);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchExpenses();
    } catch (error) {
      console.error('Error saving expense:', error);
      // You might want to show an error message to the user here
    }
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
