import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart")

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }
    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      // TODO
      const updatedCart = [...cart]
      const stock = await api.get<Stock>(`stock/${productId}`)
      const stockAmount = stock.data.amount

      const productIsInTheCart = updatedCart.find(item => item.id === productId)

      const currentAmount = productIsInTheCart ? productIsInTheCart.amount : 0;
      const desiredAmount = currentAmount + 1;

      if (desiredAmount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return
      }

      if (productIsInTheCart) {
        productIsInTheCart.amount = desiredAmount
      } else {
        const product = await api.get(`products/${productId}`)
        const newProduct = {
          ...product.data,
          amount: 1
        }
        updatedCart.push(newProduct)
      }


      localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart))

      setCart(updatedCart)

    } catch {
      // TODO
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
      const filteredProducts = cart.filter(product => product.id !== productId);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(filteredProducts))

      setCart(filteredProducts)
    } catch {
      // TODO
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
      if(amount <= 0) return

      const updatedCart = [...cart];
      const product = updatedCart.find(item => item.id === productId)

      const stock = await api.get(`stock/${productId}`)
      const stockAmount = stock.data.amount

      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return
      }

      if (product) {
        product.amount = amount
        localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart))
        setCart(updatedCart)
      } else {
        throw new Error();
      }

    } catch {
      // TODO
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
