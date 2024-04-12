import { verifyEmail } from "./database.js";

let emailDom = document.querySelector(".email-in");
let passwordDom = document.querySelector(".password-in");
let authBtn = document.querySelector(".auth-btn");

authBtn.addEventListener("click", async () => {
  let email = emailDom.value;
  let password = passwordDom.value;

  if (!email || !password) {
    alert("Complete Field before proceeding");
    return;
  }

  let verified = await verifyEmail({ email, password });
  if (verified) {
    sessionStorage.setItem("PiEeMoSi", "Logged in");
    location.href = "./home.html";
  }
});
