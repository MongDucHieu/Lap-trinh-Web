import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductItem from "../components/ProductItem";

const PAGE_SIZE = 6;

export default function ProductPage() {
  const { products, remove, loading } = useProducts();   // DÒNG QUAN TRỌNG

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category ? p.category === category : true;
      const matchMin = priceMin ? p.price >= Number(priceMin) : true;
      const matchMax = priceMax ? p.price <= Number(priceMax) : true;
      return matchName && matchCat && matchMin && matchMax;
    });
  }, [products, search, category, priceMin, priceMax]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  useEffect(() => setPage(1), [search, category, priceMin, priceMax]);

  const handleDelete = (id: number) => {
    if (window.confirm("Xóa sản phẩm này?")) remove(id);
  };

  if (loading) {
    return <div className="container"><p>Đang tải dữ liệu...</p></div>;
  }

  return (
    <div className="container">
      <h1>Danh sách sản phẩm ({products.length})</h1>

      <div style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 12 }}>
        <input placeholder="Tìm kiếm tên..." value={search} onChange={(e) => setSearch(e.target.value)} style={inputStyle} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
          <option value="">Tất cả danh mục</option>
          {["Điện tử", "Quần áo", "Đồ ăn", "Sách", "Khác"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="number" placeholder="Giá từ" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Giá đến" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} style={inputStyle} />
        <Link to="/add"><button style={btnPrimary}>Thêm sản phẩm</button></Link>
      </div>

      {currentProducts.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        currentProducts.map((p) => (
          <ProductItem key={p.id} product={p} onDelete={handleDelete} />
        ))
      )}

      {totalPages > 1 && (
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1} style={btnSecondary}>Previous</button>
          <span>Trang {page} / {totalPages} (Tổng: {filtered.length})</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} style={btnSecondary}>Next</button>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = { padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "140px" };
const btnPrimary: React.CSSProperties = { padding: "8px 16px", background: "#1976d2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" };
const btnSecondary: React.CSSProperties = { padding: "8px 16px", background: "#e0e0e0", color: "#333", border: "none", borderRadius: "4px", cursor: "pointer" };