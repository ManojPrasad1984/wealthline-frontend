import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import Home from "./pages/Home";
import LuckyDraw from "./pages/LuckyDraw";

export default function App() {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LuckyDraw/Apply" element={<LuckyDraw />} />
      </Routes>
    </BrowserRouter>
  );
}
