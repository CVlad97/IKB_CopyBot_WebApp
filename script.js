function copybotValue(id) {
  var field = document.getElementById(id);
  return field ? field.value.trim() : "";
}

function prepareCopybotLead(event) {
  event.preventDefault();
  var lead = {
    name: copybotValue("lead-name"),
    contact: copybotValue("lead-contact"),
    need: copybotValue("lead-need"),
    context: copybotValue("lead-context"),
    createdAt: new Date().toISOString()
  };
  var current = JSON.parse(localStorage.getItem("ikb_copybot_leads") || "[]");
  localStorage.setItem("ikb_copybot_leads", JSON.stringify([lead].concat(current).slice(0, 50)));

  var message = [
    "Bonjour IKB, je souhaite cadrer une demande CopyBot controlee.",
    "Nom/projet : " + (lead.name || "non renseigne"),
    "Contact : " + (lead.contact || "non renseigne"),
    "Besoin : " + lead.need,
    "Contexte : " + (lead.context || "a preciser"),
    "Je confirme qu'aucune action reelle ne doit etre executee sans validation humaine."
  ].join("\n");

  var feedback = document.getElementById("lead-feedback");
  if (feedback) feedback.textContent = "Demande sauvegardee localement. WhatsApp prepare.";
  window.open("https://wa.me/596696653589?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
}
