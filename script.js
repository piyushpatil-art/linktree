// Firebase click tracking function
function trackClick(linkName) {
  if (typeof database === 'undefined') {
    console.log("Database not initialized yet");
    return;
  }

  const now = new Date();
  const timestamp = now.toISOString();
  
  database.ref('clicks').push({
    link: linkName,
    timestamp: timestamp,
    userAgent: navigator.userAgent
  }).catch(err => console.log("Tracking error:", err));
}

// Copy email to clipboard functionality
function copyEmail(e) {
  e.preventDefault();
  const email = "piyushpatil2230@email.com";
  navigator.clipboard.writeText(email).then(() => {
    alert("Email copied to clipboard!");
  });
}

const bg = document.getElementById("bg");
const symbols = ["</>", "✦", "○", "▲", "AI", "{}", "∞"];

const elements = [];

for (let i = 0; i < 40; i++) {
  const el = document.createElement("span");
  el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  el.style.position = "absolute";
  el.style.left = Math.random() * 100 + "%";
  el.style.top = Math.random() * 100 + "%";
  el.style.color = "rgba(0, 255, 255, 0.3)";
  el.style.fontSize = Math.random() * 24 + 12 + "px";

  bg.appendChild(el);

  elements.push({
    el,
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
  });
}

// Random floating animation
function animate() {
  elements.forEach((obj) => {
    obj.x += obj.vx;
    obj.y += obj.vy;

    // Wrap around edges
    if (obj.x < 0) obj.x = 100;
    if (obj.x > 100) obj.x = 0;
    if (obj.y < 0) obj.y = 100;
    if (obj.y > 100) obj.y = 0;

    obj.el.style.left = obj.x + "%";
    obj.el.style.top = obj.y + "%";
  });

  requestAnimationFrame(animate);
}

animate();

// Mouse parallax for background elements
document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  elements.forEach((obj, i) => {
    obj.el.style.transform = `translate(${x * i * 0.3}px, ${y * i * 0.3}px)`;
  });
});
