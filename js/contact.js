/**
 * contact.js — contact form
 * ---------------------------------------------------------------
 * This site has no server, so the form opens the visitor's email
 * app with the message already written in.
 *
 * Want messages delivered without an email app? Sign up at
 * formspree.io, then set FORM_ENDPOINT to your form URL, e.g.
 *   const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
 * ---------------------------------------------------------------
 */

const CONTACT_EMAIL = "marcnathanvaldez@gmail.com";
const FORM_ENDPOINT = ""; // optional — see note above

const form = document.querySelector("#contact-form");
const statusEl = document.querySelector("#form-status");

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("is-error", isError);
}

async function sendWithEndpoint(data) {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: data,
  });
  if (!response.ok) throw new Error("Request failed");
}

function sendWithEmailApp(data) {
  const subject = data.get("subject") || "Hello from your website";
  const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* Paper plane flies off the button, then comes back */
function playSentAnimation(button) {
  button.classList.remove("is-sent");
  void button.offsetWidth; // restarts the animation if clicked again
  button.classList.add("is-sent");
  setTimeout(() => button.classList.remove("is-sent"), 1400);
}

/* Little shake when a required field is empty */
function shakeInvalidFields() {
  form.querySelectorAll(":invalid").forEach((field) => {
    const wrapper = field.closest(".field");
    wrapper.classList.remove("shake");
    void wrapper.offsetWidth;
    wrapper.classList.add("shake");
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    shakeInvalidFields();
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;

  try {
    if (FORM_ENDPOINT) {
      setStatus("Sending…");
      await sendWithEndpoint(data);
      setStatus("Message sent. I’ll get back to you soon.");
      playSentAnimation(button);
      form.reset();
    } else {
      sendWithEmailApp(data);
      setStatus("Your email app is opening with the message filled in.");
      playSentAnimation(button);
    }
  } catch (error) {
    setStatus(`Message not sent. Check your connection, or email ${CONTACT_EMAIL} directly.`, true);
  } finally {
    button.disabled = false;
  }
});
