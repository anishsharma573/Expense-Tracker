import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddTransactions from '../hooks/useAddTransaction';
import useGetTransactions from '../hooks/useGetTransaction';
import getUserInfo from '../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS

const ExpenseTracker = () => {
  const navigate = useNavigate();
  const { addTransactions } = useAddTransactions();
  const { transactions, transactionstotal } = useGetTransactions();
  const { name, profilePhoto } = getUserInfo();
  const [theme, setTheme] = useState('light'); // State for theme toggling
  const [description, setDescription] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('expense');
  
const { balance, income, expense } = transactionstotal;

  // Handle theme switching
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTransactions({
      description,
      transactionAmount,
      transactionType,
    });
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await deleteDoc(doc(db, 'transactions', transactionId));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const userSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
      <div className={`container mt-5 p-4 ${theme === 'light' ? 'bg-light' : 'bg-dark text-white'}`}>
        <div className='d-flex justify-content-between align-items-center mb-4'>
        {profilePhoto && (
              <img src={profilePhoto} alt={`${name}'s profile`} className='img-thumbnail' />
            )}
          <h1>{name}'s Expense Tracker</h1>
          <button className='btn btn-secondary' onClick={toggleTheme}>
            Toggle Theme
          </button>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card mb-3'>
              <div className='card-body'>
                <h3 className='card-title'>Your Balance</h3>
                <p className={`card-text ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
                  ${balance >= 0 ? balance : `-${Math.abs(balance)}`}
                </p>
                <div className='d-flex justify-content-between'>
                  <div>
                    <h4>Income</h4>
                    <p className='text-success'>${income}</p>
                  </div>
                  <div>
                    <h4>Expense</h4>
                    <p className='text-danger'>${expense}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <form onSubmit={onSubmit} className='mb-3'>
              <input type='text' className='form-control mb-2' placeholder='Description' required onChange={(e) => setDescription(e.target.value)} />
              <input type='number' className='form-control mb-2' placeholder='Amount' required onChange={(e) => setTransactionAmount(Number(e.target.value))} />
              <div className='btn-group' role='group' aria-label='Transaction Type'>
                <input type='radio' className='btn-check' name='transactionType' id='expense' autoComplete='off' checked={transactionType === 'expense'} onChange={() => setTransactionType('expense')} />
                <label className='btn btn-outline-danger' htmlFor='expense'>Expense</label>

                <input type='radio' className='btn-check' name='transactionType' id='income' autoComplete='off' checked={transactionType === 'income'} onChange={() => setTransactionType('income')} />
                <label className='btn btn-outline-success' htmlFor='income'>Income</label>
              </div>
              <button type='submit' className='btn btn-primary mt-2'>Add Transaction</button>
            </form>
          
            <button onClick={userSignOut} className='btn btn-danger'>Sign Out</button>
          </div>
        </div>
        <div className='card overflow-auto' style={{ maxHeight: '400px' }}>
          <div className='card-body'>
            <h2 className='card-title'>Transactions</h2>
            <ul className='list-group list-group-flush'>
              {transactions.map(transaction => (
                <li key={transaction.id} className='list-group-item d-flex justify-content-between align-items-center'>
                  <div>
                    <h4 className='mb-1'>{transaction.description}</h4>
                    <small>${transaction.transactionAmount}</small>
                  </div>
                  <div>
                    <span className={`badge ${transaction.transactionType === 'expense' ? 'bg-danger' : 'bg-success'}`}>{transaction.transactionType}</span>
                    <button onClick={() => deleteTransaction(transaction.id)} className='btn btn-sm btn-outline-danger ms-2'>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;

