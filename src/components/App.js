import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import MovieList from './movies/MovieList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<MovieList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
