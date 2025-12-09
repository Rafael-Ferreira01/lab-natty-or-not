// Tema claro/escuro
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? "🌙" : "☀️";
});

// Elementos
const dropZone = document.getElementById("drop-zone");
const imgInput = document.getElementById("image-input");
const preview = document.getElementById("preview");
const resultDiv = document.getElementById("image-analysis-result");
const btnUpload = document.getElementById("btnUpload");

// Botão abre seletor
btnUpload.addEventListener("click", () => imgInput.click());
dropZone.addEventListener("click", () => imgInput.click());

// Drag & drop
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});
dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});

imgInput.addEventListener("change", (e) => {
  if (e.target.files[0]) handleFile(e.target.files[0]);
});

// --- ANÁLISE SIMULADA ---
function simulateAIAnalysis(imgWidth, imgHeight) {
  let verdict = "uncertain";
  let confidence = Math.floor(Math.random() * 41) + 60; // 60–100%

  // Heurísticas fictícias apenas para simular lógica "inteligente"
  if (imgWidth > 2000 || imgHeight > 2000) {
    verdict = "ai";
  } else if (imgWidth < 600 || imgHeight < 600) {
    verdict = "real";
  } else {
    verdict = Math.random() > 0.5 ? "real" : "ai";
  }

  const explanations = {
    real: "A imagem apresenta ruídos naturais e variação de luz.",
    ai: "A imagem possui suavidade incomum e padrões artificiais.",
    uncertain: "Não há detalhes suficientes para uma conclusão segura."
  };

  return {
    verdict,
    confidence,
    explanation: explanations[verdict]
  };
}

function handleFile(file) {
  if (!file.type.startsWith("image/")) {
    alert("Envie uma imagem válida.");
    return;
  }

  const url = URL.createObjectURL(file);

  preview.innerHTML = `<img src="${url}" />`;

  resultDiv.textContent = "Analisando...";

  const img = new Image();
  img.src = url;

  img.onload = () => {
    const analysis = simulateAIAnalysis(img.width, img.height);

    resultDiv.innerHTML = `
      <strong>Veredito:</strong> ${analysis.verdict}<br>
      <strong>Confiança:</strong> ${analysis.confidence}%<br>
      <strong>Explicação:</strong> ${analysis.explanation}
    `;
  };
}
