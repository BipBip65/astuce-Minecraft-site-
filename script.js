const tips = [
  {
    title: "Astuce du jour",
    body:
    "Utilise des trappes en bois pour respirer sous l'eau et créer un tunnel de minage aquatique sans potions.",
    tags: ["Survie", "Débutant", "V*: 1.20 et plus"],
  },
{
  title: "Astuce du jour",
  body:
  "Place des blocs transparents et/ou non plein (dalles/feuilles) sur les portails du Nether pour éviter les spawns indésirables.",
  tags: ["Sécurité", "Nether", "Solo/multijoueur", "V*: 1.2 et plus"],
},
{
  title: "Astuce du jour",
  body:
  "Un comparateur derrière un coffre détecte le niveau de remplissage pour un tri plus fiable.",
  tags: ["Redstone", "Tri", "Tech", "V*: 1.5 et plus"],
},
{
  title: "Astuce du jour",
  body:
  "Varie les textures (bûches, escaliers, dalles...) pour donner du relief aux façades.",
  tags: ["Build", "Design", "Créatif/suvie", "V*: all"],
},
];

const tipTitle = document.querySelector("[data-tip-title]");
const tipBody = document.querySelector("[data-tip-body]");
const tipTags = document.querySelector("[data-tip-tags]");
const tipButton = document.querySelector("[data-tip-button]");
const externalLinkButton = document.querySelector("[data-external-link-button]");
const form = document.querySelector("[data-newsletter-form]");
const formMessage = document.querySelector("[data-form-message]");
const backgroundLayers = document.querySelectorAll("[data-bg-layer]");

let currentTipIndex = 0;
let currentBackgroundIndex = 0;
let activeLayerIndex = 0;

const backgroundImages = [
  "asset/OIP-3195566269.jpg",
"asset/OIP-3173353105.jpg",
"asset/OIP-3596269389.jpg",
"asset/OIP-821552191.jpg",
"asset/OIP-1264746749.jpg",
"asset/OIP-1111661187.jpg",
"asset/OIP-997267148.jpg",
"asset/OIP-972275151.jpg",
"asset/OIP-1266832285.jpg",
"asset/OIP-1377883632.jpg",
"asset/OIP-1496674447.jpg",
"asset/OIP-305966106.jpg",
"asset/OIP-497697733.jpg",
"asset/OIP-1565011513.jpg",
];
const backgroundChangeDelayMs = 4000;

const renderTip = (tip) => {
  if (!tipTitle || !tipBody || !tipTags) {
    return;
  }

  tipTitle.textContent = tip.title;
  tipBody.textContent = tip.body;
  tipTags.innerHTML = "";

  tip.tags.forEach((tag) => {
    const pill = document.createElement("span");
    pill.textContent = tag;
    tipTags.appendChild(pill);
  });
};

const showNextTip = () => {
  currentTipIndex = (currentTipIndex + 1) % tips.length;
  renderTip(tips[currentTipIndex]);
};

if (tipButton) {
  tipButton.addEventListener("click", showNextTip);
}

if (externalLinkButton) {
  externalLinkButton.addEventListener("click", () => {
    window.open("https://minecraft.wiki/", "_blank", "noopener,noreferrer");
  });
}

renderTip(tips[currentTipIndex]);

const backgroundOverlay = "linear-gradient(rgba(33, 20, 6, 0.58), rgba(18, 12, 4, 0.72))";

const applyBackgroundImage = (initial = false) => {
  if (backgroundLayers.length === 0) {
    return;
  }

  const imagePath = backgroundImages[currentBackgroundIndex];
  const nextLayerIndex = initial ? activeLayerIndex : (activeLayerIndex + 1) % backgroundLayers.length;
  const nextLayer = backgroundLayers[nextLayerIndex];

  nextLayer.style.backgroundImage = `${backgroundOverlay}, url("${imagePath}")`;
  nextLayer.classList.add("is-visible");

  if (!initial) {
    backgroundLayers[activeLayerIndex].classList.remove("is-visible");
    activeLayerIndex = nextLayerIndex;
  }
};

const showNextBackground = () => {
  currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
  applyBackgroundImage();
};

if (backgroundImages.length > 0) {
  applyBackgroundImage(true);
}

if (backgroundImages.length > 1) {
  setInterval(showNextBackground, backgroundChangeDelayMs);
}
