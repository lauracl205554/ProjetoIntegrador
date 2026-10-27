DROP TABLE IF EXISTS atleta;
DROP TABLE IF EXISTS clube;

CREATE TABLE IF NOT EXISTS clube (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  ano_fundacao INT NOT NULL
);

CREATE TABLE IF NOT EXISTS atleta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  posicao VARCHAR(100) NOT NULL,
  pe_dominante VARCHAR(50) NOT NULL,      -- ex: "Direito", "Esquerdo", "Ambidestro"
  ano_nascimento INT NOT NULL
);

INSERT INTO clube (nome, cidade, ano_fundacao) VALUES
  ('Flamengo', 'Rio de Janeiro', 1895),
  ('Palmeiras', 'São Paulo', 1914),
  ('Corinthians', 'São Paulo', 1910),
  ('Santos', 'Santos', 1912),
  ('Grêmio', 'Porto Alegre', 1903);

INSERT INTO atleta (nome, posicao, pe_dominante, ano_nascimento) VALUES
  ('Carlos Mendes', 'Goleiro', 'Direito', 1992),
  ('Rafael Souza', 'Zagueiro', 'Direito', 1995),
  ('Lucas Almeida', 'Lateral', 'Esquerdo', 1998),
  ('Pedro Barbosa', 'Volante', 'Direito', 1994),
  ('Thiago Ribeiro', 'Meia', 'Esquerdo', 2000),
  ('Gabriel Teixeira', 'Atacante', 'Direito', 2001),
  ('Mateus Carvalho', 'Atacante', 'Ambidestro', 1999),
  ('Diego Fernandes', 'Zagueiro', 'Esquerdo', 1990),
  ('Bruno Lima', 'Meia', 'Direito', 1997),
  ('André Costa', 'Goleiro', 'Direito', 2003);
