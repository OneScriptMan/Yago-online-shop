import {cart, removeFromCart, calculateCartQuantity, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

function updateCartQuantity() {
  document.querySelector('.js-checkout-quantity').innerHTML = calculateCartQuantity() + ' items';
}

function clickUpdate(productId){
  document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('is-editing-quantity');

  document.querySelector(`.js-quantity-input-${productId}`).classList.remove('is-editing-quantity');
}

function saveUpdate(productId){
  document.querySelector(`.js-save-quantity-link-${productId}`).addEventListener('click', () => {
    document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('is-editing-quantity');
    document.querySelector(`.js-quantity-input-${productId}`).classList.add('is-editing-quantity');

    let selectValue = 0;

    selectValue = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

    addToCart(productId, selectValue);

    console.log(selectValue);

    cart.forEach((cartItem)=>{
      if (cartItem.productId === productId) {
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItem.quantity;
      }
    });//render quanity

    updateCartQuantity();

  });
}

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  

  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += 
  `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div> 
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">
            ${cartItem.quantity}
            </span>
          </span>

          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
            Update
          </span>

          <span class="delete-quantity-link link-primary js-delete-link"
          data-product-id="${matchingProduct.id}"
          >
            Delete
          </span>

        </div>
  
        <input type="number" min="0" value="${1}" class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id} is-editing-quantity" data-product-id = "${matchingProduct.id}">

        <span class="save-quantity-link js-save-quantity-link js-save-quantity-link-${matchingProduct.id}
        link-primary is-editing-quantity" data-product-id = "${matchingProduct.id}">Save</span>

      </div>
      <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

});


document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    let productId = link.dataset.productId;
    
    //clickUpdate(productId);
    document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('is-editing-quantity');

    document.querySelector(`.js-quantity-input-${productId}`).classList.remove('is-editing-quantity');  

    //saveUpdate(productId);
      
  });
});

document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    let productId = link.dataset.productId;
    document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('is-editing-quantity');
    document.querySelector(`.js-quantity-input-${productId}`).classList.add('is-editing-quantity');

    let selectValue = 0;
    selectValue = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

    addToCart(productId, selectValue);

    cart.forEach((cartItem)=>{
      if (cartItem.productId === productId) {
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItem.quantity;
      }
    });//render quanity
  
    updateCartQuantity();
  })
})

document.querySelectorAll('.js-quantity-input').forEach((link) => {
  link.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
    let productId = link.dataset.productId;
    document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('is-editing-quantity');
    document.querySelector(`.js-quantity-input-${productId}`).classList.add('is-editing-quantity');

    let selectValue = 0;
    selectValue = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

    addToCart(productId, selectValue);

    cart.forEach((cartItem)=>{
      if (cartItem.productId === productId) {
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItem.quantity;
      }
    });//render quanity
  
    updateCartQuantity();
    }

    

  })
})


document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    updateCartQuantity();

    container.remove();
    
  })// команда link.dataset.data "преобразовывает" 'data-product-id' в 'productId'
  
});

updateCartQuantity();