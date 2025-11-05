import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface Props {
  product: Product;
  onDelete: (id: number) => void;
}

export default function ProductItem({ product, onDelete }: Props) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p><strong>Giá:</strong> {formatCurrency(product.price)}</p>
      <p><strong>Danh mục:</strong> {product.category}</p>

      <div className="actions">
        <Link to={`/product/${product.id}`}>
          <button className="btn-view">Xem</button>
        </Link>
        <Link to={`/product/${product.id}/edit`}>
          <button className="btn-edit">Sửa</button>
        </Link>
        <button className="btn-delete" onClick={() => onDelete(product.id)}>
          Xóa
        </button>
      </div>
    </div>
  );
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);