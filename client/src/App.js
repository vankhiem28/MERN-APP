import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./Components/Page/Auth";
import Home from "./Components/Home";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes navigate="/login">
              <Home></Home>
            </PrivateRoutes>
          }
        ></Route>
        <Route path="/login" element={<AuthPage authRoute="login"></AuthPage>}></Route>
        <Route path="/register" element={<AuthPage authRoute="register"></AuthPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
