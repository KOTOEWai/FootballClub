import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Shoppingitems: JSON.parse(localStorage.getItem("cart")) || [], // Initialize as an array
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'Shopcart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { name, img, price, id } = action.payload;
          
            // Check if item already exists in the cart
            const existingItem = state.Shoppingitems.find((item) => item.id === id);
            if (!existingItem) {
                // Add item as an object
                state.Shoppingitems.push({ name, img, price, id });
                state.totalPrice += price; // Update the total price
            }
            localStorage.setItem("cart", JSON.stringify(state.Shoppingitems)); // Save to local storage
        },
        removeShopItem: (state, action) => {
            const index = action.payload;
            const removeItem = state.Shoppingitems[index];
            
            if (removeItem) {
                // Update total price by subtracting the removed item’s price
                state.totalPrice -= removeItem.price;
                // Remove item from Shoppingitems array
                state.Shoppingitems.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(state.Shoppingitems)); // Save to local storage
        },
        clearShopCart: (state) => {
            state.Shoppingitems = []; // Clear all items
            state.totalPrice = 0; // Reset total price
            localStorage.removeItem("cart"); // Remove from local storage
        },
        update: (state, action) => {
            const { id, increment } = action.payload;
            console.log(id, increment)
            const item = state.Shoppingitems[id];
           
            if (item) {
              item.quantity = increment
                ? (item.quantity || 1) + 1
                : Math.max((item.quantity || 1) - 1 ,1);
            state.totalPrice = state.Shoppingitems.reduce(
                (total, item) => total + item.price * (item.quantity || 1),
                0
              );
            }
            localStorage.setItem("quantity", JSON.stringify(state.Shoppingitems)); // Save to local storage
        },
    }
});

export const { addItem, removeShopItem, clearShopCart ,update} = cartSlice.actions;

export default cartSlice.reducer;
