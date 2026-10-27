const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // CRUD de Clube -- ja implementado por completo, use como referencia
  criarClube: (clube_) => ipcRenderer.invoke('clube:criar', clube_),
  listarClubes: () => ipcRenderer.invoke('clube:listar'),
  editarClube: (clube_) => ipcRenderer.send('clube:abrirEdicao', clube_),
  atualizarClube: (clube_) => ipcRenderer.invoke('clube:atualizar', clube_),
  excluirClube: (id) => ipcRenderer.invoke('clube:excluir', id),

  aoReceberClubeParaEditar: (callback) =>
    ipcRenderer.on('clube:preencher', (evento, clube_) => callback(clube_)),

  // CRUD de Atleta
  criarAtleta: (atleta) => ipcRenderer.invoke('atleta:criar', atleta),
  listarAtletas: () => ipcRenderer.invoke('atleta:listar'),
  editarAtleta: (atleta) => ipcRenderer.send('atleta:abrirEdicao', atleta),
  atualizarAtleta: (atleta) => ipcRenderer.invoke('atleta:atualizar', atleta),
  excluirAtleta: (id) => ipcRenderer.invoke('atleta:excluir', id),

  aoReceberAtletaParaEditar: (callback) =>
    ipcRenderer.on('atleta:preencher', (evento, atleta) => callback(atleta)),
});
