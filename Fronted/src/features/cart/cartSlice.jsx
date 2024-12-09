import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items:[],
    totalPrice:0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { seat, price } = action.payload;

            // Validate input
            if (typeof seat === "string" && seat.length >2) {
                const type = seat.slice(0,2); // Extract type (e.g., "A1")
                const number = seat.slice(-2); // Extract number (e.g., "3")
                console.log(number)
                console.log(type)

                // Check if an item with the same type and number already exists
                const itemExists = state.items.some((item) => {
                    const [itemType, itemNumber] = item.split('-'); // Extract type and number from "type-number-price"
                    return itemType === type && itemNumber === number; // Match both type and number
                });

                if (!itemExists) {
                    // Add the new item if it doesn't exist
                    state.items.push(`${type}-${number}-${price}`); // Store as "type-number-price"
                    state.totalPrice += parseFloat(price); // Update total price
                }
               
            } 
        },
        removeItem : (state, action) => {
            const index = action.payload;
            const removeItem = state.items[index];
            if(removeItem){
                const price = removeItem.split('-')[2]
                state.totalPrice -= parseFloat(price);
            }
            state.items.splice(index,1);
        },
        clearCart : (state) => {
            state.items = [];
            state.totalPrice = 0;
        }

    }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;   