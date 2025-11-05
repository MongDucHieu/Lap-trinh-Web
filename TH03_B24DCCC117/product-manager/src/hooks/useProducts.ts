import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { initialProducts } from "../data/initialData";
import type { Product } from "../types/product";

const STORAGE_KEY = "products";

export function useProducts() {
  const { state, dispatch } = useContext(ProductContext);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      dispatch({ type: "SET", payload: JSON.parse(saved) });
    } else {
      const withId = initialProducts.map((p, i) => ({ ...p, id: i + 1 }));
      dispatch({ type: "SET", payload: withId });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(withId));
    }
    setLoading(false);   
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
    }
  }, [state.products, loading]);

  const add = (data: Omit<Product, "id">) => {
    const newProduct: Product = { ...data, id: Date.now() };
    dispatch({ type: "ADD", payload: newProduct });
  };

  const update = (data: Product) => dispatch({ type: "UPDATE", payload: data });
  const remove = (id: number) => dispatch({ type: "DELETE", payload: id });
  const getById = (id: number) => state.products.find(p => p.id === id);

  return {
    products: state.products,
    loading,
    add,
    update,
    remove,
    getById,
  };
}