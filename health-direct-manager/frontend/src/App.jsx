import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ManagerSignIn from "./pages/ManagerSignIn";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Patients from "./pages/Patients";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/manager-signin" />;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/manager-signin" element={<ManagerSignIn />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/patients" element={<Patients />} />
          <Route
            path="/manager-dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/" element={<Navigate to="/manager-signin" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
