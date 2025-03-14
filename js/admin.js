import { db, collection, addDoc, getDocs, deleteDoc, doc } from "./firebase-Config.js";
import { auth, signOut, onAuthStateChanged } from "./firebase-Config.js";

const mein_card = document.getElementById('mein-card');
const card = document.createElement('div');
const addProductForm = document.getElementById('addProductForm');
const btn = document.querySelector('.btn-success');

card.classList.add('cardes');

const user = "product";

addProductForm.addEventListener('submit', addProduct)

async function addProduct(e) {
   e.preventDefault();
   btn.disabled = true;
   try {
      let rateNum = (Math.random() * 4 + 1).toFixed(1);
      let countNum = Math.floor(Math.random() * 10) + 1
      console.log(countNum)

      const nam = document.getElementById('productName').value;
      const pri = document.getElementById('productPrice').value;
      const img = document.getElementById('productImage').value;
      // const rt = document.getElementById('productRate').value
      // const cot = document.getElementById('productCount').value;

      const docRef = await addDoc(collection(db, user), {
         item: nam,
         price: pri,
         image: img,
         rate: Number(rateNum),
         count: countNum,

      });
      Swal.fire({
         title: "Product Add",
         text: nam.slice(0, 20),
         icon: "success"
      })
      console.log(docRef)
      getProduct()
      console.log("Document written with ID: ", docRef.id);
   } catch (error) {
      console.error("Error adding document: ", error);
      Swal.fire({
         title: "Error",
         text: error.message,
         icon: "error"
      });
      btn.disabled = false;
   }
   addProductForm.reset();
   btn.disabled = false;
}


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
         console.log(stars)
         card.innerHTML += `
         <div class="card" id="product-${doc.id}">
          <img src="${data.image}" alt="">
          <div class="titel"><b>Titel:</b> ${data.item.slice(0, 20)}</div>
          <div class="price"><b>Price:</b> $${Number(data.price).toFixed(2)}</div>
          <div class="pm" style="display: flex; justify-content: space-between;">
            <div class="rate"><b>Rate:</b> ${data.rate}</div>
            <div class="count"><b>Count:</b> ${data.count}</div>
          </div>
          <div style="display: flex; justify-content: space-between;">
          <div class='star'>${stars}</div>
          <div>❤️</div>
          </div>
          <div class="btns d-flex justify-content-center">
          <button class="btn btn-danger"  data-id="${doc.id}">Delete</button>
          </div>
        </div>
         `
         mein_card.appendChild(card)
         console.log('hy')
      });
   } catch (error) {
      console.log(error)
   }
}

getProduct()

card.addEventListener('click', async (e) => {
   if (e.target.classList.contains("btn-danger")) {
      const productId = e.target.getAttribute("data-id")
      console.log(productId)
      Swal.fire({
         title: "Success",
         text: "Product deleted successfully!",
         icon: "success"
      })
      try {
         await deleteDoc(doc(db, user, productId));
         getProduct();
         //   const product = document.getElementById(`product-${productId}`);
         //   product.remove(); 
         // alert("Product deleted successfully!");
      } catch (error) {
         console.error("Error deleting product:", error);
      }
   }

})

onAuthStateChanged(auth, (user) => {
   if (user) {
      console.log("User logged in:", user.email);
   } else {
      console.log("User logged out");
      if (!window.location.href.includes("./login.html")) {
         window.location.href = "./login.html";
      }
   }
});



const logoutBtn = document.getElementById("logoutBtn")
logoutBtn.addEventListener("click", () => {
   signOut(auth)
   Swal.fire({
      title: "Log Out",
      text: "Logout successfully!",
      icon: "success"
   })
      .then(() => {
         console.log("User logged out");
         window.location.href = "./login.html";
      })
      .catch((error) => {
         console.error("Logout error:", error);
      });
});

