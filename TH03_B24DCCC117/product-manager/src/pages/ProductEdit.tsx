import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../hooks/useProducts";

export default function ProductEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, update } = useProducts();
  const product = getById(Number(id));

  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  const handleSubmit = (data: any) => {
    update(data);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Chỉnh sửa sản phẩm</h2>
      <ProductForm initial={product} onSubmit={handleSubmit} onCancel={() => navigate("/")} />
    </div>
  );
}