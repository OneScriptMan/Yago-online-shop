
//using export
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {

}


export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify (cart));
}

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

  saveToStorage();

};

export function removeFromCart (productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}