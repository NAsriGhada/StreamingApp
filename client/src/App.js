import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import Profile from "./pages/user/Profile";
import StreamerPage from "./pages/streamer/StreamerPage";
import AdminPage from "./pages/admin/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateAcount from "./pages/user/UpdateAcount";
import ErrorPage from "./pages/error/ErrorPage";
import MainPage from "./pages/user/MainPage";
import Profile from "./pages/user/profile/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route
            path="/main-page"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile/:userId"
            element={
              <ProtectedRoute>
                <UpdateAcount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/streamer"
            element={
              <ProtectedRoute>
                <StreamerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
