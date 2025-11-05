import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import ProductAdd from "../pages/ProductAdd";
import ProductDetail from "../pages/ProductDetail";
import ProductEdit from "../pages/ProductEdit";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/add" element={<ProductAdd />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/:id/edit" element={<ProductEdit />} />
      </Routes>
    </BrowserRouter>
  );
}