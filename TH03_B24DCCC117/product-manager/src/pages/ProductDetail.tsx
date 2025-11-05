import { useParams, Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useProducts();
  const product = getById(Number(id));

  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <div className="container">
      <h2>Chi tiết sản phẩm</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {[
            ["Tên", product.name],
            ["Danh mục", product.category],
            ["Giá", new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)],
            ["Số lượng", product.quantity],
            ["Mô tả", product.description || "-"],
          ].map(([label, value]) => (
            <tr key={label}>
              <td style={{ padding: "8px 0", fontWeight: "bold", width: "150px" }}>{label}:</td>
              <td style={{ padding: "8px 0" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Link to={`/product/${product.id}/edit`}>
          <button style={{ ...btnPrimary, background: "#ff9800" }}>Sửa</button>
        </Link>
        <Link to="/">
          <button style={btnSecondary}>Quay lại</button>
        </Link>
      </div>
    </div>
  );
}

const btnPrimary: React.CSSProperties = { padding: "8px 16px", background: "#1976d2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" };
const btnSecondary: React.CSSProperties = { padding: "8px 16px", background: "#e0e0e0", color: "#333", border: "none", borderRadius: "4px", cursor: "pointer" };