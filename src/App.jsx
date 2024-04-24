import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Auth from "./auth/index"
import ExpenseTracker from "./expenseTracker/index"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />  // Change to JSX syntax
          <Route path="/expensetracker" element={<ExpenseTracker />} />  // Ensure this is a JSX element
        </Routes>
      </Router>
    </div>
  );
}

export default App;
