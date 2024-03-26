import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import MovieList from './pages/MovieList';
import './App.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/movie-list">Movie List</Link>
        </li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Frontend React Test</h1>
        </header>
        <Sidebar />
        <div className="content">
          <main>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/movie-list" element={<MovieList />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
