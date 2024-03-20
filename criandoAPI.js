const expresso = require('express'); //requisitando o pacote "express"
const myServer = expresso();

myServer.use(expresso.json()); //diz que ira utilizar a forma de comunicação "JSON"

const ListaUsuarios = [
    //criação de um objeto
    {
        id: 1,
        nome: 'Talles',
        idade: 21,
        CPF: '12345678911'
    }

]; //lista de usuários (como se fosse um banco de dados)


//configurando uma rota para a API 
                                 //é utilizada a arrow function (=>) para mais facilidade
                                 //recebe um objeto JS do tipo REQUISICAO e um do tipo RESPOSTA
                                 //
myServer.get('/usuarios', (requisicao, resposta) => {
    console.log(requisicao.body);

    let respostaUsuarios = '';

    for (let i = 0; i < ListaUsuarios.length; i++){
        const usuario = ListaUsuarios[i];
        
        respostaUsuarios += '<p>';
        respostaUsuarios += usuario.id;
        respostaUsuarios += '       '; 
        respostaUsuarios += usuario.nome;
        respostaUsuarios += ' ';
        respostaUsuarios += usuario.idade;
        respostaUsuarios += ' ';
        respostaUsuarios += usuario.CPF;
        respostaUsuarios += ' ';
        respostaUsuarios += '</p>'
        }

    resposta.send(respostaUsuarios);
});

myServer.post('/usuarios', (requisicao, resposta) => {

    const nome  =  requisicao.body.nome;
    const idade =  requisicao.body.idade;
    const cpf   =  requisicao.body.cpf;

    let codigo = -99999999999999999999999999;
    for(let i = 0; i < ListaUsuarios.length; i++){

        const usuario = ListaUsuarios[i];

        if (usuario.id > codigo){
            codigo = usuario.id;
        }
    }
    
    //if para obrigar o código a ser sempre positivo
    if(codigo < 0){
        codigo = 0;
    }
    
    const usuario = {
        id: codigo+1, //corrige a sequência correta de códigos dos usuários
        nome: nome,
        idade: idade,
        CPF: cpf
    };

    ListaUsuarios.push(usuario);
    resposta.send();
});

//método para atualização do objeto "usuário"
myServer.put('/usuarios/:usuarioId', (requisicao, resposta) => {

    const codigoUsuario = requisicao.params.usuarioId; //params = PARÂMETROS
    //
    const UsuarioEncontrado = ListaUsuarios.find((usuarioAtual) =>{
        if (usuarioAtual.id == codigoUsuario){
            return true;
        }
        else {
            return false;
        }
    });

    const nome = requisicao.body.nome;
    const idade = requisicao.body.idade;
    const cpf = requisicao.body.cpf;

    UsuarioEncontrado.nome = nome;
    UsuarioEncontrado.idade = idade;
    UsuarioEncontrado.CPF = cpf;
    console.log(UsuarioEncontrado);
    resposta.send();
});

//método para deletar um usuário de acordo com o ID inserido do lado do "usuarios/"
myServer.delete('/usuarios/:usuariosId', (requisicao, resposta) =>{

    // Extrai o codigoUsuario dos parâmetros da requisição
    const codigoUsuario = requisicao.params.usuariosId;

    // Encontrando o índice do usuário no array 'ListaUsuarios' com base no codigoUsuario
    const indiceUsuario = ListaUsuarios.findIndex((usuarioAtual) => {
        // Esta função itera por cada usuarioAtual no array ListaUsuarios
        // e retorna o índice do usuário cujo 'id' corresponde a 'codigoUsuario'
        return usuarioAtual.id == codigoUsuario;
    });

    // Removendo o usuário do array 'ListaUsuarios' usando o método splice
    // O método splice remove 1 elemento no índice especificado por 'indiceUsuario'
    ListaUsuarios.splice(indiceUsuario, 1);

    // Enviando uma resposta vazia indicando exclusão bem-sucedida
    resposta.send();

});




//servidor se hospeda na porta 4300 para poder estar rodando
//esta função "listen" TEM QUE SER a última do arquivo/projeto/código
myServer.listen(4300, () =>{
    console.log("My first server on the door 4300.");
});