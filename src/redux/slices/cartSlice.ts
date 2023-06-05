import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IAutopart } from "../../interfaces/autopartInterface";
import { toast } from "react-toastify";

interface CartSliceState {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
}

interface CartItem extends IAutopart {
  quantity: number;
}

const initialState: CartSliceState = {
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IAutopart>) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        if (existingItem.quantity >= existingItem.amount) {
          toast.error(`Превышено допустимое количество товара!`, {
            position: "bottom-left",
          });
          existingItem.quantity = existingItem.amount;
        } else {
          existingItem.quantity += 1;
          toast.info(`Добавлен еще один товар`, {
            position: "bottom-left",
          });
        }
      } else {
        const newCartItem: CartItem = {
          ...newItem,
          quantity: 1,
        };
        // state.totalQuantity += 1;
        state.cartItems.push(newCartItem);
        toast.success(`${action.payload.name} добавлен в корзину`, {
          position: "bottom-left",
        });
      }

      // state.totalPrice += newItem.price;
      // state.totalQuantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      const cartItems: CartItem[] = action.payload.map((item) => ({
        ...item,
        quantity: item.quantity,
      }));
      state.cartItems = cartItems;
      state.totalPrice = calculateTotalPrice(cartItems);
      // state.totalQuantity = cartItems.length;
    },
    removeFromCart(state, action: PayloadAction<IAutopart>) {
      // const itemToRemove = action.payload;
      // const existingItem = state.cartItems.find(
      //   (item) => item.id === itemToRemove.id
      // );

      // if (existingItem) {
      //   if (existingItem.quantity > 1) {
      //     existingItem.quantity -= 1;
      //   } else {
      //     const itemIndex = state.cartItems.indexOf(existingItem);
      //     state.cartItems.splice(itemIndex, 1);
      //   }

      //   state.totalPrice -= itemToRemove.price;
      //   state.totalQuantity -= 1;
      //   localStorage.setItem("cart", JSON.stringify(state.cartItems));
      // }
      const itemToRemove = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === itemToRemove.id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];
        // state.totalPrice -= existingItem.price * existingItem.quantity;
        // state.totalQuantity -= 1;
        state.cartItems.splice(existingItemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        toast.error(`${action.payload.name} удален (-a) из корзины`, {
          position: "bottom-left",
        });
      }
    },
    decreaseCartItem(state, action: PayloadAction<IAutopart>) {
      const itemInd = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemInd].quantity > 1) {
        state.cartItems[itemInd].quantity -= 1;
        // state.totalPrice -= state.cartItems[itemInd].price;
        // state.totalQuantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        toast.error(`${action.payload.name} удален (-a) из корзины`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemInd].quantity === 1) {
        const nextItem = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        toast.error(`${action.payload.name} удален (-a) из корзины`, {
          position: "bottom-left",
        });
        // state.totalPrice -= state.cartItems[itemInd].price;
        state.cartItems = nextItem;
        // state.totalQuantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      toast.error(`Корзина очищена`, {
        position: "bottom-left",
      });
      state.totalPrice = 0;
      state.totalQuantity = 0;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.totalQuantity = quantity;
      state.totalPrice = total;
    },
  },
});

const calculateTotalPrice = (cartItems: CartItem[]) => {
  let totalPrice = 0;
  for (const item of cartItems) {
    totalPrice += item.price * item.quantity;
  }
  return totalPrice;
};

export const {
  addToCart,
  setCart,
  removeFromCart,
  decreaseCartItem,
  clearCart,
  getTotals,
} = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;
export const selectCartSlice = (state: RootState) => state.cart;
