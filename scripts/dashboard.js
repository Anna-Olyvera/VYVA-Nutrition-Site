
  async function carregarDados() {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const localId = usuario.localId;

    if (!token || !localId) {
      alert("Usuário não autenticado. Faça login novamente.");
      window.location.href = "login.html";
      return;
    }

    try {
      const resposta = await fetch(`https://banco-de-dados-a6728-default-rtdb.firebaseio.com/usuarios/${localId}.json?auth=${token}`);
      const data = await resposta.json();

      if (!data || !data.vendas || !data.associacoes || data.cashback === undefined) {
        alert("Dados incompletos ou não encontrados.");
        return;
      }

      document.getElementById("total-associacoes").textContent = data.associacoes;
      document.getElementById("total-vendas").textContent = data.vendas;
      document.getElementById("total-cashback").textContent = "R$ " + data.cashback.toFixed(2).replace(".", ",");
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      alert("Erro de conexão com o servidor.");
    }
  }
  carregarDados();