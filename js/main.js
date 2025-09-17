
// main.js

// Remove preload class when page finishes loading
window.addEventListener("load", () => {
  document.body.classList.remove("is-preload");
});

// Disable touch move (⚠️ disables all scrolling!)
window.addEventListener("touchmove", (e) => {
  e.preventDefault();
}, { passive: false });

// Reset scroll on orientation change using matchMedia
const mq = window.matchMedia("(orientation: portrait)");

mq.addEventListener("change", () => {
  document.body.scrollTop = 0;      // Chrome, Firefox
  document.documentElement.scrollTop = 0; // Safari, Edge
});

  
  
  
  const form = document.getElementById("contact-form");
  const status = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent normal form submission

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (response.ok) {
        status.textContent = "Thanks! Your message was sent.";
        form.reset();
      } else {
        status.textContent = result.error || "Oops! There was a problem.";
      }
    } catch (error) {
      status.textContent = "Oops! There was a problem.";
    }
  });


  