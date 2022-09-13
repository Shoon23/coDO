import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { Register } from "./pages/Register";
import PrivateRoutes from "./utils/PrivateRoutes";
import { PersistLogin } from "./utils/PersistLogin";
import { useAuthContext } from "./hooks/useAuthContext";
import { CheckAccess } from "./utils/CheckAccess";
function App() {
  return (
    <Router>
      <Routes>
        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
        {/* public routes */}
        <Route element={<CheckAccess />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" index element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
