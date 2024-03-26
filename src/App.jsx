import React from 'react'
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Add from './components/Add';
import Edit from './components/Edit';
import Read from './components/Read';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add"  element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/read/:id" element={<Read />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App