import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../hooks/useProducts";

export default function ProductAdd() {
  const navigate = useNavigate();
  const { add } = useProducts();

  const handleSubmit = (data: any) => {
    add(data);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Thêm sản phẩm mới</h2>
      <ProductForm onSubmit={handleSubmit} onCancel={() => navigate("/")} />
    </div>
  );
}