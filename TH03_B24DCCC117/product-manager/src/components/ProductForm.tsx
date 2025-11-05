import { useState, useEffect } from "react";
import type { Product } from "../types/product";

interface Props {
  initial?: Product;
  onSubmit: (data: Omit<Product, "id"> | Product) => void;
  onCancel?: () => void;
}

const categories = ["Điện tử", "Quần áo", "Đồ ăn", "Sách", "Khác"] as const;

export default function ProductForm({ initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [quantity, setQuantity] = useState(initial?.quantity ?? 0);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(initial?.name ?? "");
    setCategory(initial?.category ?? "");
    setPrice(initial?.price ?? 0);
    setQuantity(initial?.quantity ?? 0);
    setDescription(initial?.description ?? "");
    setError("");
  }, [initial]);

  const validate = (): string => {
    if (name.trim().length < 3) return "Tên sản phẩm phải ≥ 3 ký tự";
    if (!category) return "Vui lòng chọn danh mục";
    if (price <= 0) return "Giá phải > 0";
    if (quantity <= 0) return "Số lượng phải > 0";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    onSubmit({
      ...(initial ?? {}),
      name,
      category,
      price,
      quantity,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
      {error && <p style={{ color: "#d32f2f", margin: 0 }}>{error}</p>}

      <input
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
        <option value="">Chọn danh mục</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Giá"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value) || 0)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Số lượng"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value) || 0)}
        style={inputStyle}
      />

      <textarea
        placeholder="Mô tả"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...inputStyle, resize: "vertical" }}
      />

      <div style={{ display: "flex", gap: "8px" }}>
        <button type="submit" style={btnPrimary}>
          {initial ? "Cập nhật" : "Thêm"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={btnSecondary}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const btnPrimary: React.CSSProperties = {
  padding: "8px 16px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  padding: "8px 16px",
  background: "#e0e0e0",
  color: "#333",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};