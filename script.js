const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const clearBtn = document.getElementById("clearBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const logo = document.getElementById("logo");
const cat = document.getElementById("cat");

let isDrawing = false;
let darkMode = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 70;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.lineJoin = "round";


canvas.addEventListener("pointerdown", (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(
        e.clientX - rect.left,
        e.clientY - rect.top
    );
});


canvas.addEventListener("pointermove", (e) => {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(
        e.clientX - rect.left,
        e.clientY - rect.top
    );
    ctx.stroke();
});


canvas.addEventListener("pointerup", () => {
    isDrawing = false;
});

canvas.addEventListener("pointerleave", () => {
    isDrawing = false;
});


clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


darkModeBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    if (darkMode) {
        canvas.style.background = "var(--black-color)";
        ctx.strokeStyle = "white";
        document.querySelector("header").style.background = "var(--black-color)";
        document.querySelector("header").style.color = "var(--white-color)";
        logo.src = "light.png";
    } else {
        canvas.style.background = "var(--white-color)";
        ctx.strokeStyle = "black";
        document.querySelector("header").style.background = "var(--white-color)";
        document.querySelector("header").style.color = "var(--black-color)";
        logo.src = "dark.png";
    }
});

if ("serviceWorker" in navigator) {
 window.addEventListener("load", () => {
  navigator.serviceWorker.register("./sw.js")
   .then(reg => console.log("Service Worker registered:", reg.scope))
   .catch(err => console.error("Service Worker registration failed:", err));
 });
}