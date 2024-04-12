export async function initiateSite() {
  let sessionId = sessionStorage.getItem("PiEeMoSi");
  if (!sessionId) {
    alert("Your login session has expired");
    location.href = "./authentication.html";
  }
}
