const cart_items = document.getElementById('cart-items');
const cartTotal = document.getElementById("cart-total");
const buy_now = document.getElementById('buy-now');
const clear_cart = document.getElementById('clear-cart');

function loadCard() {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];
   console.log(cart)

   cart_items.innerHTML = "";
   let total = 0;

   console.log(cart);
   cart.forEach((item, index) => {
      // console.log(item.id)
      console.log(item)
      total += Number(item.price) * (item.quantity) || 1;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML += `
        <img src="${item.productImage}" alt="Product Image">
        <div class="details">
          <div class="name">${item.name.slice(0, 20)}</div>
          <div class="price">$${item.price}</div>
          <div class="quantity">${item.quantity}</div>
        </div>
        <button class="remove" data-index="${index}">Remove</button>
      `;
      cart_items.appendChild(cartItem);
   });
   cartTotal.textContent = total.toFixed(2);

   const removeCard = document.querySelectorAll('.remove');
   removeCard.forEach((clik) => {
      clik.addEventListener('click', cardRemove)
   })

   clear_cart.addEventListener('click', clearCart);
   buy_now.addEventListener('click', buyNow)

}

loadCard()

function cardRemove(e) {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];
   const index = e.target.getAttribute("data-index");
   let delCart = cart.forEach((item) => {
      Swal.fire({
         title: item.name.slice(0, 10),
         text: "Product deleted successfully!",
         icon: "success"
      })
      return
   })
   const removedItem = cart.splice(index, 1);
   localStorage.setItem("cart", JSON.stringify(cart));
   updateTotalAfterRemove(removedItem.price, removedItem.quantity || 1);

   loadCard()
}

function updateTotalAfterRemove(price, quantity) {
   let currentTotal = parseFloat(cartTotal.innerText);
   let newTotal = currentTotal - (Number(price) * quantity);

   cartTotal.innerText = newTotal.toFixed(2);
}

function clearCart() {
   Swal.fire({
      title: 'Delete',
      text: "Cart deleted successfully!",
      icon: "success"
   })
   localStorage.removeItem('cart');
   cartTotal.textContent = "0.00";
   loadCard()
}

function buyNow() {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];
   if (cart.length === 0) {
      alert('chl nikl')

   }
   else {
      let total = 0;
      cart.forEach(item => {
         total += Number(item.price) * (item.quantity || 1);
      });
      Swal.fire({
         title: 'Purchase',
         text: `Purchase successful! Total Amount: $${total.toFixed(2)}`,
         icon: "success"
      })
      localStorage.removeItem('cart');
      cartTotal.textContent = "0.00";
      window.location.href = "../index.html";
   }

}
