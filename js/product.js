import { db, collection, getDocs } from "./firebase-Config.js";

const mein_card = document.getElementById('mein-card');
const logoutBtn = document.getElementById("logoutBtn");
const card = document.createElement('div');
card.classList.add('cardes');
console.log(db, 'hy')
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const user = "product"
async function getProduct() {
   try {
      card.innerHTML = "";
      const querySnapshot = await getDocs(collection(db, user));
      querySnapshot.forEach((doc) => {
         const data = doc.data();
         console.log(`${doc.id} =>`);
         let starIcon = Math.floor(data.rate);

         let stars = "";
         for (let i = 0; i < starIcon; i++) {
            stars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
         }
         card.innerHTML += `
         <div class="card">
          <img src="${data.image}" alt="">
          <div class="titel"><b>Titel:</b> ${data.item.slice(0, 20)}</div>
          <div class="price"><b>Price:</b> $${Number(data.price).toFixed(2)}</div>
          <div class="pm" style="display: flex; justify-content: space-between;">
            <div class="rate"><b>Rate:</b> ${data.rate}</div>
            <div class="count"><b>Count:</b> ${data.count}</div>
          </div>
          <div style="display: flex; justify-content: space-between;">
          <div class='star'>${stars}</div>
          <button class="add-to-fav" data-id="${doc.id}" data-name="${data.item}" data-price="${data.price}" data-image="${data.image}">❤️ Favorite</button>
          </div>
          <div class="btns d-flex justify-content-center">
          <button class="btn1 add-to-cart" data-id="${doc.id}" data-name="${data.item}" data-price="${data.price}" data-image="${data.image}">Add to Cart</button>
          </div>
        </div>
         `
         mein_card.appendChild(card)
      });
   } catch (error) {
      console.log(error)
   }
}

card.addEventListener('click', (e) => {
   if (e.target.classList.contains('add-to-cart')) {
      addToCart(e);
   }
})

function addToCart(e) {
   const productId = e.target.getAttribute("data-id");
   const productName = e.target.getAttribute("data-name");
   const productPrice = e.target.getAttribute("data-price");
   const productImage = e.target.getAttribute("data-image");

   const item = {
      id: productId,
      name: productName,
      price: Number(productPrice).toFixed(2.0),
      productImage: productImage,
      quantity: 1,
   }
   console.log(item)
   const existingItem = cart.find((p) => p.id === productId);
   console.log(existingItem)

   if (existingItem) {
      existingItem.quantity += 1;
      Swal.fire({
         title: productName.slice(0,10),
         text: "Product Add To successfully!",
         icon: "success"
      })
   } else {
      cart.push(item);
   }

   localStorage.setItem('cart', JSON.stringify(cart));
}


card.addEventListener('click', (e) => {
   if (e.target.classList.contains('add-to-fav')) {
      addToFav(e)
   }
})

function addToFav(e) {
   const productId = e.target.getAttribute("data-id");
   const productName = e.target.getAttribute("data-name");
   const productPrice = e.target.getAttribute("data-price");
   const productImage = e.target.getAttribute("data-image");

   const item = {
      id: productId,
      name: productName,
      price: Number(productPrice).toFixed(2.0),
      productImage: productImage,
   }
   const existingItem = favorites.find((p) => p.id === productId);
    if (!existingItem) {
        favorites.push(item);
        Swal.fire({
         title: productName.slice(0,10),
         text: "Product Add To favorites!",
         icon: "success"
      })
    }
    else{
      Swal.fire({
         title: productName.slice(0,10),
         text: "Already in Favorites!",
         icon: "error"
      })
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
   //  alert(`${productName} added to favorites!`);

}



getProduct()



