/*
  Contact page: turns the general-inquiry form into a pre-filled email draft.
  Nothing is submitted to a server. The form intentionally has no free-text
  field so visitors are not prompted to type medical information.
*/
(function () {
  const form = document.getElementById("contactInquiry");
  if (!form) return;

  const TO = "info@rockymountainhbot.com";
  const PHONE = "303-442-4124";
  const status = document.getElementById("inqStatus");
  const topicSelect = form.querySelector("#inqTopic");

  /* Pre-select the topic when arriving from e.g. ?topic=insurance */
  const TOPICS = {
    consultation: "General consultation request",
    insurance: "Insurance coverage question",
    referral: "Referral question",
    general: "General question",
  };
  const requested = new URLSearchParams(window.location.search).get("topic");
  if (requested && TOPICS[requested]) topicSelect.value = TOPICS[requested];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = form.querySelector("#inqName").value.trim();
    const email = form.querySelector("#inqEmail").value.trim();
    const phone = form.querySelector("#inqPhone").value.trim();
    const topic = topicSelect.value;

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

    /* Mail apps open outside the page, so confirm what should have happened
       and give a fallback for visitors without a mail app set up. */
    if (status) {
      status.innerHTML =
        "Your email app should now open with a pre-filled message. Nothing is sent until you press send. " +
        'If nothing opened, email us at <a href="mailto:' + TO + '">' + TO + "</a> " +
        'or call <a href="tel:' + PHONE.replace(/-/g, "") + '">' + PHONE + "</a>.";
      status.hidden = false;
    }
  });
})();
