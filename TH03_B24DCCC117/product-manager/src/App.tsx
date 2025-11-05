import { ProductProvider } from "./context/ProductContext";
import AppRoutes from "./routes";
import "./styles.css";

export default function App() {
  return (
    <ProductProvider>
      <AppRoutes />
    </ProductProvider>
  );
}