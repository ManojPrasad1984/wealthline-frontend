import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LuckyDraw from "./pages/LuckyDraw";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LuckyDraw/Apply" element={<LuckyDraw />} />
      </Routes>
    </BrowserRouter>
  );
}