import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeMetas} from './cadastrodemetas'; 
import {Turmas} from './turmas'
import {Matricula} from '../common/matricula'
import {Meta} from '../ta-gui/src/app/metas/meta'

var taserver = express();

var cadastro: CadastroDeMetas = new CadastroDeMetas();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {

})

//recebe um identificador de turma e retorna a mesma
taserver.get('/turmas', function (req: express.Request, res: express.Response){

})

//recebe um identificador de turma e de aluno e retorna uma matricula
taserver.get('/matriculas', function (req: express.Request, res: express.Response){

})

taserver.get('/metas', function (req: express.Request, res: express.Response){
    res.send(JSON.stringify(cadastro.getMetas()));
})

taserver.post('/meta', function (req: express.Request, res: express.Response) {
    var meta: Meta = <Meta> req.body;
    meta = cadastro.cadastrar(meta);
    if (meta) {
        res.send({'success': "Meta cadastrada com sucesso"});
    } else {
        res.send({'failure': "Meta não pode ser cadastrada"});
    }
})

taserver.put('/meta', function (req: express.Request, res: express.Response) {
    var meta: Meta = <Meta> req.body;
    meta = cadastro.atualizar(meta);
    if (meta) {
        res.send({'success': "A meta foi atualizada com sucesso"});
    } else {
        res.send({'failure': "A meta não pode ser atualizada"});
    }
}) 

taserver.delete('/meta', function (req: express.Request, res: express.Response) {
    var meta: Meta = <Meta> req.body;
    cadastro.remover(meta);
    if (meta) {
        res.send({'success': "Meta removida com sucesso"});
    } else {
        res.send({'failure': "Meta não pode ser removida"});
    }
    
})

var server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
  
function closeServer(): void {
    server.close();
}
  
export { server, closeServer }