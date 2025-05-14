// src/components/ExpenseForm.js
import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ onSubmit, editingExpense }) => {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: ''
  });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        amount: editingExpense.amount,
        category: editingExpense.category,
        description: editingExpense.description,
        date: editingExpense.date.split('T')[0], // yyyy-mm-dd
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ amount: '', category: '', description: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <button type="submit">{editingExpense ? 'Update' : 'Add'} Expense</button>
    </form>
  );
};

export default ExpenseForm;
