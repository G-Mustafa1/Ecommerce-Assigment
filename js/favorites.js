const cart_items = document.getElementById('cart-items');
const buy_now = document.getElementById('buy-now');

function loadCard() {
   let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
   console.log(favorites)

   cart_items.innerHTML = "";

   console.log(favorites);
   favorites.forEach((item, index) => {
      // console.log(item.id)
      console.log(item)

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML += `
        <img src="${item.productImage}" alt="Product Image">
        <div class="details">
          <div class="name">${item.name.slice(0, 20)}</div>
          <div class="price">$${item.price}</div>
        </div>
        <button class="remove" data-index="${index}">Un Favorites</button>
      `;
      cart_items.appendChild(cartItem);
   });

   const removeCard = document.querySelectorAll('.remove');
   removeCard.forEach((clik) => {
      clik.addEventListener('click', cardRemove)
   })

   buy_now.addEventListener('click', clearCart)
}

loadCard()

function cardRemove(e) {
   let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
   const index = e.target.getAttribute("data-index");
   const unFovorites = favorites.forEach((item) => {
      Swal.fire({
         title: item.name.slice(0,10),
         text: "Product Un Fovorites successfully!",
         icon: "success"
      })
   })
   console.log(favorites)
   favorites.splice(index, 1);
   localStorage.setItem("favorites", JSON.stringify(favorites));
   loadCard()
}

function clearCart() {
   Swal.fire({
      title: "Favorites",
      text: "Clear Fovorites List successfully!",
      icon: "success"
   })
   localStorage.removeItem('favorites');
   loadCard()
}
