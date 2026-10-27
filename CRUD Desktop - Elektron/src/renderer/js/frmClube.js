let modoEdicao = false;
let idEmEdicao = null;

// Se o main mandar um clube pra editar, preenche o formulario (send/on)
window.api.aoReceberClubeParaEditar((clube_) => {
  document.querySelector("#nome").value = clube_.nome;
  document.querySelector("#cidade").value = clube_.cidade;
  document.querySelector("#ano_fundacao").value = clube_.ano_fundacao;

  modoEdicao = true;
  idEmEdicao = clube_.id;
});

document
  .querySelector("#formClube")
  .addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const dados = Object.fromEntries(new FormData(evento.target));

    if (modoEdicao) {
      await window.api.atualizarClube({ id: idEmEdicao, ...dados });
    } else {
      try {
        const resultado = await window.api.criarClube(dados);
        console.log("Clube cadastrado:", resultado);
      } catch (erro) {
        console.error("Deu ruim ao cadastrar o clube:", erro);
      }
    }

    window.close(); // fecha o modal; frmPrincipal recarrega quando o foco voltar
  });
