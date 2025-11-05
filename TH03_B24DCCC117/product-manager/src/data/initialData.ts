import type { Product } from "../types/product";

export const initialProducts: Omit<Product, "id">[] = [
  { name: "iPhone 15 Pro", category: "Điện tử", price: 25000000, quantity: 10, description: "Mới 100%" },
  { name: "Áo Thun Nam", category: "Quần áo", price: 150000, quantity: 50, description: "Cotton thoáng mát" },
  { name: "Bánh mì pate", category: "Đồ ăn", price: 25000, quantity: 100, description: "Nóng hổi" },
  { name: "JS Cho Người Mới Bắt Đầu", category: "Sách", price: 320000, quantity: 20, description: "Robert C. Martin" },
  { name: "Tai nghe Bluetooth", category: "Điện tử", price: 890000, quantity: 30, description: "Chống ồn" },
  { name: "Quần jeans nam", category: "Quần áo", price: 450000, quantity: 40, description: "Size 28-34" },
  { name: "Trà sữa trân châu", category: "Đồ ăn", price: 35000, quantity: 200, description: "Full topping" },
  { name: "Lập trình React", category: "Sách", price: 280000, quantity: 15, description: "Từ cơ bản đến nâng cao" },
  { name: "Đồng hồ thông minh", category: "Điện tử", price: 1590000, quantity: 25, description: "Theo dõi sức khỏe" },
  { name: "Mũ lưỡi trai", category: "Quần áo", price: 120000, quantity: 80, description: "Unisex" },
];