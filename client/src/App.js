import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import LoginPage from "./pages/LoginPage";
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
