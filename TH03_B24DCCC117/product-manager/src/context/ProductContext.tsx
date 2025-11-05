import { createContext, useReducer} from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/product";

type State = { products: Product[] };
type Action =
  | { type: "SET"; payload: Product[] }
  | { type: "ADD"; payload: Product }
  | { type: "UPDATE"; payload: Product }
  | { type: "DELETE"; payload: number };

const initialState: State = { products: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET":
      return { products: action.payload };
    case "ADD":
      return { products: [...state.products, action.payload] };
    case "UPDATE":
      return {
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE":
      return {
        products: state.products.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const ProductContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => {},
});

export function ProductProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}