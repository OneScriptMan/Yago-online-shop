
//using export
export const cart = [];

export function addToCart(productId, selectValue){
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if (matchingItem){
    matchingItem.quantity += selectValue;
  }
  else {
    cart.push({
      productId: productId,
      quantity: selectValue
    });
  };
};