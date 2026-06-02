export interface Movie {
  id: string;
  titulo: string;
  ano: number;
  duracao: string;
  sinopse: string;
  classificacao: string;
  direcao: string;
  producao: string;
  roteiro: string;
  elenco: string[];
  genero: string[];
  arquivoFilme?: string;
  linkFilme?: string;
  arquivoTrailer?: string;
  linkTrailer?: string;
  capa: string;
}