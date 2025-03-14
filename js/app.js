import { auth, onAuthStateChanged, signOut } from "./firebase-Config.js";

onAuthStateChanged(auth, (user) => {
   if (user) {
     console.log("User logged in:", user.email);
 
     if (user.email === "admin@example.com") {
       window.location.href = "pages/admin.html";
     }
   } else {
     console.log("User logged out");
 
     if (!window.location.href.includes("pages/login.html")) {
       window.location.href = "pages/login.html";
     }
   }
 });

const logoutBtn = document.getElementById("logoutBtn")
logoutBtn.addEventListener("click", () => {
   signOut(auth)
     .then(() => {
       console.log("User logged out");
       window.location.href = "pages/login.html";
     })
     .catch((error) => {
       console.error("Logout error:", error);
     });
 });
 