const history = [];

document.getElementById("sortear-btn").addEventListener("click", sortear);
document.getElementById("export-btn").addEventListener("click", exportarHistorico);
document.getElementById("reset-btn").addEventListener("click", resetar);

function sortear() {
  const min = parseInt(document.getElementById("range-min").value);
  const max = parseInt(document.getElementById("range-max").value);
  const nome = document.getElementById("sorteio-nome").value || "Sorteio";

  if (isNaN(min) || isNaN(max) || min >= max) {
    alert("Por favor, insira um intervalo válido.");
    return;
  }

  const numeroSorteado = Math.floor(Math.random() * (max - min + 1)) + min;
  document.getElementById("result").textContent = `Resultado: ${numeroSorteado}`;

  const historicoItem = `${nome}: Número ${numeroSorteado}`;
  history.push(historicoItem);

  atualizarHistorico();
}


function atualizarHistorico() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function exportarHistorico() {
  if (history.length === 0) {
    alert("O histórico está vazio!");
    return;
  }

  const blob = new Blob([history.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "historico_sorteios.txt";
  a.click();
  URL.revokeObjectURL(url);
}


function resetar() {

  document.getElementById("range-min").value = 0;
  document.getElementById("range-max").value = 10;
  document.getElementById("sorteio-nome").value = "";

  document.getElementById("result").textContent = "";
  history.length = 0; 
  atualizarHistorico(); 
}
