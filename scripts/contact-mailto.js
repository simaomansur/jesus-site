/*
  Contact page: turns the general-inquiry form into a pre-filled email draft.
  Nothing is submitted to a server. The form intentionally has no free-text
  field so visitors are not prompted to type medical information.
*/
(function () {
  const form = document.getElementById("contactInquiry");
  if (!form) return;

  const TO = "info@rockymountainhbot.com";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = form.querySelector("#inqName").value.trim();
    const email = form.querySelector("#inqEmail").value.trim();
    const phone = form.querySelector("#inqPhone").value.trim();
    const topic = form.querySelector("#inqTopic").value;

    const subject = "Website inquiry: " + topic;
    const body = [
      "Hello RMHI,",
      "",
      `I would like the office to contact me regarding: ${topic}.`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      "",
      "(No medical or insurance information included.)",
    ].join("\n");

    window.location.href =
      "mailto:" + TO +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
})();
