import { renderByUpdate, toggleLampDB } from "./database.js";
import { initiateSite } from "./initiate-site.js";
import {
  changeBatteryVoltage,
  postNotification,
  toggleCharging,
  toggleLamp,
} from "./web-assist.js";

initiateSite();

let lampButtonDOM = document.querySelector(".light");

renderByUpdate();

lampButtonDOM.addEventListener("click", async () => {
  if (
    document.querySelector(".light .inner-title").textContent === "Turned ON"
  ) {
    await toggleLampDB(false);
  } else {
    await toggleLampDB(true);
  }
});
