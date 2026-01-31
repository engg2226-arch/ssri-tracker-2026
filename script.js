import { db } from "./firebase-config.js";
import { ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const tbody = document.getElementById("tracker-body");
const startDate = new Date("2026-02-01");
const daysInYear = 365;

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / (1000 * 60 * 60 * 24));
}

for (let i = 0; i < daysInYear - 31; i++) {
  const current = new Date(startDate);
  current.setDate(startDate.getDate() + i);

  const dateStr = current.toDateString();
  const dayNum = dayOfYear(current);

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${dateStr}</td>
    <td>${dayNum}</td>
    <td><input type="checkbox" id="day-${dayNum}" /></td>
  `;
  tbody.appendChild(row);

  const checkbox = row.querySelector("input");
  const dayRef = ref(db, `days/${dayNum}`);

  checkbox.addEventListener("change", () => {
    set(dayRef, checkbox.checked);
  });

  onValue(dayRef, (snapshot) => {
    checkbox.checked = snapshot.val() === true;
  });
}
