import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/404Handler";
import { LandingPage } from "./pages/LandingPage";
import { SharedBrainPage } from "./pages/SharedBrainPage";
import type { JSX } from "react/jsx-dev-runtime";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/brain/:hash" element={<SharedBrainPage />} /> {/* ← add this */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path = "*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;