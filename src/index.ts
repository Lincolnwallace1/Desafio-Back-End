import express,{ Request, Response } from  'express';
const fs = require('fs');

export interface Autores {
  nomeAutor: string;
  idAutor: number;
  siglaPartidoAutor: string;
}

export interface banco {
  id: number;
  descricaoTipo: string;
  ementa: string;
  dataApresentacao: Date;
  autores: Autores[];
}

const app = express();
const routes = express.Router();
app.use(express.json());
app.use(routes);

const listartodos = () => {
  const dados = fs.readFileSync('./dados.json', "utf-8");
  return dados;
}

routes.get('/listartodos', (req: Request, res: Response) => {
  res.send(JSON.parse(listartodos()));
})


routes.get('/listarporautor/:autor', (req: Request, res: Response) => {
  const dadosArquivo = JSON.parse(listartodos());
  const autorparametro = req.params.autor;
  var autorescolhido:banco[] = [];

  dadosArquivo.dados.map((dado: banco) => {dado.autores.forEach((autores:Autores)=>{
      if(autores.nomeAutor===autorparametro){
        autorescolhido.push(dado)
      }
    })
   })

  res.send(autorescolhido);
})

routes.get('/listarportipo/:tipo', async (req: Request, res: Response) => {
  const banco = JSON.parse(listartodos());
  const tipo = req.params.tipo;
  const tiposelecionado = await banco.dados.filter((dado: banco) => dado.descricaoTipo === tipo)
  res.send(tiposelecionado);
})


app.listen(3333, () => { console.log("Servidor rodando na porta 3333") });