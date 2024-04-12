import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import {
  changeBatteryVoltage,
  formatTime,
  toggleCharging,
  toggleLamp,
} from "./web-assist.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDgZBEubPs6KqOY5iN-mkoRicv6W0VmoQ",
  authDomain: "iot-project-354fc.firebaseapp.com",
  databaseURL: "https://iot-project-354fc-default-rtdb.firebaseio.com",
  projectId: "iot-project-354fc",
  storageBucket: "iot-project-354fc.appspot.com",
  messagingSenderId: "796002751171",
  appId: "1:796002751171:web:ac97b2623a5a9ebd688876",
  measurementId: "G-C1W5DTHKCP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export async function run() {
  const db = getDatabase();
  // set(ref(db, "/"), {
  //   data: "TRY IT OUT",
  // });
  // const dbRef = ref(getDatabase());
  // let snapshot = await get(child(dbRef, "/email"));
  // if (snapshot.exists()) {
  //   console.log(snapshot.val());
  // }
  const starCountRef = ref(db, "/email");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

export async function verifyEmail({ email, password }) {
  return new Promise(async (resolve, reject) => {
    let dbEmail = null;
    let dbPassword = null;

    const dbRef = ref(getDatabase());
    let snapshot = await get(child(dbRef, "/email"));
    if (snapshot.exists()) {
      dbEmail = snapshot.val();
    }
    snapshot = await get(child(dbRef, "/password"));
    if (snapshot.exists()) {
      dbPassword = snapshot.val();
    }

    if (dbEmail === email && dbPassword === password) {
      resolve(true);
    } else {
      reject(false);
    }
  });
}

export function renderByUpdate() {
  const db = getDatabase();
  const chargingTimeRef = ref(db, "/chargingTime");
  const ledStateRef = ref(db, "/lampState");
  const batteryLevelRef = ref(db, "/batteryLevel");
  onValue(chargingTimeRef, (snapshot) => {
    let data = snapshot.val();
    toggleCharging(data === "CHARGING" ? data : formatTime(data));
  });
  onValue(batteryLevelRef, (snapshot) => {
    let data = snapshot.val();
    changeBatteryVoltage(data);
  });
  onValue(ledStateRef, (snapshot) => {
    let data = snapshot.val();
    toggleLamp(data === "ON" ? true : false);
  });
}

export function toggleLampDB(state) {
  return new Promise(async (resolve, reject) => {
    const db = getDatabase();
    await update(ref(db, "/"), {
      webInstruction: state ? "LAMP:ON" : "LAMP:OFF",
    });
  });
}

export async function getEmail() {
  return new Promise(async (resolve, reject) => {
    const dbRef = ref(getDatabase());
    let snapshot = await get(child(dbRef, "/email"));
    if (snapshot.exists()) {
      const dbEmail = snapshot.val();
      resolve(dbEmail);
    } else {
      reject("Error");
    }
  });
}
