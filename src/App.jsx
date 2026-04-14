import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Introduce from "./pages/Introduce";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/introduce" element={<Introduce />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
