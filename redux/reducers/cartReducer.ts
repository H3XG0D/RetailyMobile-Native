// export const initialState = {
//   cart: [],
//   total: 0,
// };

// export const cartReducer = (state: initialState, action: any) => {
//   switch (action.type) {
//     case 'INSERT_CART':
//       return {
//         ...state,
//         cart: [...state.cart, action.payload],
//         total: state.cart.length + 1,
//       };

//     case 'REMOVE_CART':
//       return {
//         ...state,
//         cart: state.cart.filter((item: any) => item.id !== action.payload),
//         total: state.cart.length - 1,
//       };

//     default:
//       return state;
//   }
// };

// export default cartReducer;
