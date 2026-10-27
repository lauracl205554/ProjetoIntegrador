const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const path = require("path");
const conexao = require("./conexao");

const testarConexaoBanco = () => {
  try {
    conexao.connect((erro) => {
      if (erro) {
        console.error("Erro assíncrono ao conectar ao MySQL:", erro.message);
        if (dialog) {
          dialog.showErrorBox(
            "Erro de conexão com o banco",
            `Não foi possível conectar ao MySQL.\n\nDetalhes: ${erro.message}`,
          );
        }
        return;
      }
      console.log("Conectado ao MySQL com sucesso!");
    });
  } catch (excecao) {
    console.error("Erro síncrono fatal ao tentar conectar:", excecao);
    if (dialog) {
      dialog.showErrorBox(
        "Falha Crítica",
        `O código quebrou antes de tentar a conexão:\n\n${excecao.message}`,
      );
    }
  }
};

const abrirModalClube = (janelaPai, clube_ = null) => {
  const janelaModal = new BrowserWindow({
    width: 500,
    height: 600,
    parent: janelaPai,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  janelaModal.loadFile(path.join(__dirname, "../renderer/frmClube.html"));
  janelaModal.webContents.openDevTools();

  // Só existe clube quando estamos ABRINDO EM MODO EDIÇÃO
  if (clube_) {
    janelaModal.webContents.once("did-finish-load", () => {
      janelaModal.webContents.send("clube:preencher", clube_);
    });
  }
};

const abrirModalAtleta = (janelaPrincipal, atleta = null) => {
  const janelaModal = new BrowserWindow({
    width: 400,
    height: 600,
    parent: janelaPrincipal,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  janelaModal.removeMenu();
  janelaModal.loadFile(path.join(__dirname, "../renderer/frmAtleta.html"));
  janelaModal.webContents.openDevTools();

  // Só existe atleta quando estamos ABRINDO EM MODO EDIÇÃO
  if (atleta) {
    janelaModal.webContents.once("did-finish-load", () => {
      janelaModal.webContents.send("atleta:preencher", atleta);
    });
  }
};

const criarJanelaPrincipal = () => {
  const janelaPrincipal = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  janelaPrincipal.loadFile(
    path.join(__dirname, "../renderer/frmPrincipal.html"),
  );
  janelaPrincipal.webContents.openDevTools();
  return janelaPrincipal;
};

const criarMenuPrincipal = (janelaPrincipal) => {
  const templateDoMenu = [
    {
      label: "Cadastros",
      submenu: [
        { label: "Clube", click: () => abrirModalClube(janelaPrincipal) },
        { label: "Atleta", click: () => abrirModalAtleta(janelaPrincipal) },
      ],
    },
    {
      label: "Sistema",
      submenu: [
        {
          label: "Sair Imediatamente",
          role: "quit",
          accelerator: "CmdOrCtrl+Q",
        },
      ],
    },
  ];

  const menuReal = Menu.buildFromTemplate(templateDoMenu);
  Menu.setApplicationMenu(menuReal);
};

app.whenReady().then(() => {
  testarConexaoBanco();

  const janelaPrincipal = criarJanelaPrincipal();

  criarMenuPrincipal(janelaPrincipal);

  // ============================================================
  // CRUD DE CLUBE -- completo, use como referencia pro de Atleta
  // ============================================================

  ipcMain.handle("clube:criar", (evento, clube_) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO clube (nome, cidade, ano_fundacao) VALUES (?, ?, ?)";

      conexao.query(
        sql,
        [clube_.nome, clube_.cidade, clube_.ano_fundacao],
        (erro, resultado) => {
          if (erro) {
            reject(erro);
            return;
          }
          resolve({ id: resultado.insertId, ...clube_ });
        },
      );
    });
  });

  ipcMain.handle("clube:listar", () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM clube ORDER BY nome";

      conexao.query(sql, (erro, resultado) => {
        if (erro) {
          reject(erro);
          return;
        }
        resolve(resultado);
      });
    });
  });

  ipcMain.handle("clube:atualizar", (evento, clube_) => {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE clube SET nome = ?, cidade = ?, ano_fundacao = ? WHERE id = ?";
      const valores = [
        clube_.nome,
        clube_.cidade,
        clube_.ano_fundacao,
        clube_.id,
      ];

      conexao.query(sql, valores, (erro, resultado) => {
        if (erro) {
          reject(erro);
        } else {
          resolve(resultado);
        }
      });
    });
  });

  ipcMain.on("clube:abrirEdicao", (evento, clube_) => {
    abrirModalClube(janelaPrincipal, clube_);
  });

  ipcMain.handle("clube:excluir", (evento, id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM clube WHERE id = ?";

      conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
          reject(erro);
          return;
        }
        resolve(resultado);
      });
    });
  });

  // ============================================================
  // CRUD DE ATLETA
  // ============================================================

  ipcMain.handle("atleta:criar", (evento, atleta) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO atleta (nome, posicao, pe_dominante, ano_nascimento) VALUES (?, ?, ?, ?)";

      conexao.query(
        sql,
        [atleta.nome, atleta.posicao, atleta.pe_dominante, atleta.ano_nascimento],
        (erro, resultado) => {
          if (erro) {
            reject(erro);
            return;
          }
          resolve({ id: resultado.insertId, ...atleta });
        },
      );
    });
  });

  ipcMain.handle("atleta:listar", () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM atleta ORDER BY nome";

      conexao.query(sql, (erro, resultado) => {
        if (erro) {
          reject(erro);
          return;
        }
        resolve(resultado);
      });
    });
  });

  ipcMain.handle("atleta:atualizar", (evento, atleta) => {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE atleta SET nome = ?, posicao = ?, pe_dominante = ?, ano_nascimento = ? WHERE id = ?";
      const valores = [
        atleta.nome,
        atleta.posicao,
        atleta.pe_dominante,
        atleta.ano_nascimento,
        atleta.id,
      ];

      conexao.query(sql, valores, (erro, resultado) => {
        if (erro) {
          reject(erro);
        } else {
          resolve(resultado);
        }
      });
    });
  });

  ipcMain.on("atleta:abrirEdicao", (evento, atleta) => {
    abrirModalAtleta(janelaPrincipal, atleta);
  });

  ipcMain.handle("atleta:excluir", (evento, id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM atleta WHERE id = ?";

      conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
          reject(erro);
          return;
        }
        resolve(resultado);
      });
    });
  });
});
