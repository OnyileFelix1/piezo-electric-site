export function postNotification(data) {
  let div = document.createElement("div");
  div.classList.add("main-item");
  div.innerHTML = `
  <i class="fa-solid fa-bell"></i>
  <p class="main-title">Power Generation Master</p>
        <p class="main-info">
        ${data}</p>
        `;

  let mainList = document.querySelector(".main-list");
  mainList.appendChild(div);

  mainList.scrollTop = mainList.scrollHeight;
}
export function changeBatteryVoltage(voltageLevel) {
  let color = null;
  if (voltageLevel < 20) {
    color = "red";
  } else if (voltageLevel < 70) {
    color = "var(--accent-color)";
  } else if (voltageLevel <= 100) {
    color = "green";
  }
  document.querySelector(".battery i").style.color = color;
  document.querySelector(".battery p").style.color = color;
  document.querySelector(".battery .inner-title").textContent =
    String(voltageLevel) + "%";

  if (voltageLevel === 100) {
    postNotification("Battery is full, stop charge");
  } else if (voltageLevel < 30) {
    postNotification("Battery is Low, please plug in");
  }
}

export function toggleCharging(value) {
  let color = value === "CHARGING" ? "green" : "#000";
  document.querySelector(".charging i").style.color = color;
  document.querySelector(".charging .inner-title").style.color = color;
  document.querySelector(".charging .inner-title").textContent = value;
  postNotification(
    value === "CHARGING"
      ? "Battery is currently Charging"
      : "Battery has stopped charging"
  );
}

export function toggleLamp(state) {
  let color = state ? "var(--accent-color)" : "#000";

  document.querySelector(".light i").style.color = color;
  document.querySelector(".light .inner-title").style.color = color;
  document.querySelector(".light .inner-title").textContent = state
    ? "Turned ON"
    : "Turned OFF";

  postNotification(
    state ? "Bulb has been turned on" : "Bulb has been turned off"
  );
}

export function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} Hour${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} Minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `${seconds} Second${seconds !== 1 ? "s" : ""}`;
  }
}
