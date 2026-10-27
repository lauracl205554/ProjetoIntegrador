let clubesCarregados = [];
let idParaExcluirClube = null;

// ============================================================
// CLUBE -- CRUD completo, use como referencia pro de Atleta
// ============================================================

const carregarClubes = async () => {
  clubesCarregados = await window.api.listarClubes();

  const linhas = clubesCarregados
    .map(
      (clube_) => `
      <tr>
      <td>${clube_.nome}</td>
      <td>${clube_.cidade}</td>
      <td>${clube_.ano_fundacao}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editarClube(${clube_.id})">
          Editar
        </button>
        <button class="btn btn-sm btn-danger" onclick="abrirConfirmacaoExclusaoClube(${clube_.id})">
          Excluir
        </button>
        </td>
    </tr>`,
    )
    .join("");

  document.querySelector("#tbodyClubes").innerHTML = linhas;
};

const editarClube = (id) => {
  const clube_ = clubesCarregados.find((c) => c.id === id);
  window.api.editarClube(clube_);
};

const abrirConfirmacaoExclusaoClube = (id) => {
  const clube_ = clubesCarregados.find((item) => item.id === id);

  document.querySelector("#nomeClubeExcluir").textContent = clube_.nome;
  idParaExcluirClube = id;

  const modal = new bootstrap.Modal(
    document.querySelector("#modalConfirmarExclusaoClube"),
  );
  modal.show();
};

document
  .querySelector("#btnConfirmarExclusaoClube")
  .addEventListener("click", async () => {
    await window.api.excluirClube(idParaExcluirClube);

    const modal = bootstrap.Modal.getInstance(
      document.querySelector("#modalConfirmarExclusaoClube"),
    );
    modal.hide();

    carregarClubes();
  });

carregarClubes();

// ============================================================
// ATLETA -- CRUD completo
// ============================================================

let atletasCarregados = [];
let idParaExcluirAtleta = null;

const carregarAtletas = async () => {
  atletasCarregados = await window.api.listarAtletas();

  const linhas = atletasCarregados
    .map(
      (atleta) => `
      <tr>
      <td>${atleta.nome}</td>
      <td>${atleta.posicao}</td>
      <td>${atleta.pe_dominante}</td>
      <td>${atleta.ano_nascimento}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editarAtleta(${atleta.id})">
          Editar
        </button>
        <button class="btn btn-sm btn-danger" onclick="abrirConfirmacaoExclusaoAtleta(${atleta.id})">
          Excluir
        </button>
        </td>
    </tr>`,
    )
    .join("");

  document.querySelector("#tbodyAtletas").innerHTML = linhas;
};

const editarAtleta = (id) => {
  const atleta = atletasCarregados.find((j) => j.id === id);
  window.api.editarAtleta(atleta);
};

const abrirConfirmacaoExclusaoAtleta = (id) => {
  const atleta = atletasCarregados.find((item) => item.id === id);

  document.querySelector("#nomeAtletaExcluir").textContent = atleta.nome;
  idParaExcluirAtleta = id;

  const modal = new bootstrap.Modal(
    document.querySelector("#modalConfirmarExclusaoAtleta"),
  );
  modal.show();
};

document
  .querySelector("#btnConfirmarExclusaoAtleta")
  .addEventListener("click", async () => {
    await window.api.excluirAtleta(idParaExcluirAtleta);

    const modal = bootstrap.Modal.getInstance(
      document.querySelector("#modalConfirmarExclusaoAtleta"),
    );
    modal.hide();

    carregarAtletas();
  });

carregarAtletas();

window.addEventListener("focus", () => {
  carregarClubes();
  carregarAtletas();
});
