let modoEdicao = false;
let idEmEdicao = null;

// Se o main mandar um atleta pra editar, preenche o formulario (send/on)
window.api.aoReceberAtletaParaEditar((atleta) => {
  document.querySelector("#nome").value = atleta.nome;
  document.querySelector("#posicao").value = atleta.posicao;
  document.querySelector("#pe_dominante").value = atleta.pe_dominante;
  document.querySelector("#ano_nascimento").value = atleta.ano_nascimento;
  document.querySelector("h4").textContent = "Editar Atleta";

  modoEdicao = true;
  idEmEdicao = atleta.id;
});

document.querySelector("#formAtleta").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita o piscar da tela

  const dados = Object.fromEntries(new FormData(e.target));

  try {
    if (modoEdicao) {
      await window.api.atualizarAtleta({ id: idEmEdicao, ...dados });
    } else {
      const resultado = await window.api.criarAtleta(dados);
      console.log("Atleta cadastrado:", resultado);
    }
  } catch (erro) {
    console.error("Erro ao salvar o atleta:", erro);
    return; // mantém o modal aberto para o usuário ver/corrigir
  }

  window.close(); // fecha o modal; frmPrincipal recarrega quando o foco voltar
});
