const expresso = require('express'); //requisitando o pacote "express"
const server = expresso();

server.use(expresso.json()); //diz que ira utilizar a forma de comunicação "JSON"

const CategoriaLista =   [
    {
        id: 1,
        descricao: "Comida"
    }

];//Categorias

const ReceitaLista =   [
    {
        id: 1,
        descricao: "Salário",
        valor: 30000,
        categoriaId: Categorias[0].id
    }
];//Receitas

const DespesaLista =   [
    {
        id: 1,
        descricao: "Comida",
        valor: 100,
        categoriaId: Categorias[0].id
    }
];//Despesas

//********************************************************************//

server.get('/categorias', (req, res) => {//get CATEGORIAS
    console.log(req.body);

    let respostaCategorias = '';

    for (let i = 0; i < CategoriaLista.length; i++){
        const categoria = CategoriaLista[i];
        
        respostaCategorias += '<p>';
        respostaCategorias += categoria.id;
        respostaCategorias += '       '; 
        respostaCategorias += categoria.descricao;
        respostaCategorias += '</p>'
        }//for
    
    res.send();
});

server.get('/receitas', (req, res) => {//get DESPESAS
    console.log(req.body);

    let respostaReceitas = '';

    for (let i = 0; i < ReceitaLista.length; i++){
        const receita = ReceitaLista[i];
        
        respostaReceitas += '<p>';
        respostaReceitas += receita.id;
        respostaReceitas += '       '; 
        respostaReceitas += receita.descricao;
        respostaReceitas += '       '; 
        respostaReceitas += receita.valor;
        respostaReceitas += '       '; 
        respostaReceitas += receita.categoriaId;
        respostaReceitas += '</p>'
        }//for


    res.send();
});

server.get('/despesas', (req, res) => {//get DESPESAS
    console.log(req.body);

    let respostaDespesas = '';

    for (let i = 0; i < DespesaLista.length; i++){
        const despesa = DespesaLista[i];
        
        respostaDespesas += '<p>';
        respostaDespesas += despesa.id;
        respostaDespesas += '       '; 
        respostaDespesas += despesa.descricao;
        respostaDespesas += '       '; 
        respostaDespesas += despesa.valor;
        respostaDespesas += '       '; 
        respostaDespesas += despesa.categoriaId;
        respostaDespesas += '</p>'
        }//for


    res.send();
});

//**********************************************************************//

server.post('/categorias', (req, res) => {//post CATEGORIAS

    const descricao  =  req.body.descricao;

    let codigo = -99999999999999999999999999;
    for(let i = 0; i < CategoriaLista.length; i++){

        const categoria = CategoriaLista[i];

        if (categoria.id > codigo){
            codigo = categoria.id;
        }
    }
    
    //if para obrigar o código a ser sempre positivo
    if(codigo < 0){
        codigo = 0;
    }
    
    const categoria = {
        id: codigo+1, //corrige a sequência correta de códigos dos usuários
        descricao: descricao
    };

    CategoriaLista.push(categoria);
    res.send();
});

server.post('/receitas', (req, res) => {//post RECEITAS

    const descricao  =  req.body.descricao;
    const valor  =  req.body.valor;
    const categoriaId  =  req.body.categoriaId;

    let codigo = -99999999999999999999999999;
    for(let i = 0; i < ReceitaLista.length; i++){

        const receita = ReceitaLista[i];

        if (receita.id > codigo){
            codigo = receita.id;
        }
    }
    
    //if para obrigar o código a ser sempre positivo
    if(codigo < 0){
        codigo = 0;
    }
    
    const receita = {
        id: codigo+1, //corrige a sequência correta de códigos dos usuários
        descricao: descricao,
        valor: valor,
        categoriaId: categoriaId
    };

    ReceitaLista.push(receita);
    res.send();
});

server.post('/despesas', (req, res) => {//post RECEITAS

    const descricao  =  req.body.descricao;
    const valor  =  req.body.valor;
    const categoriaId  =  req.body.categoriaId;

    let codigo = -99999999999999999999999999;
    for(let i = 0; i < DespesaLista.length; i++){

        const despesa = DespesaLista[i];

        if (despesa.id > codigo){
            codigo = despesa.id;
        }
    }
    
    //if para obrigar o código a ser sempre positivo
    if(codigo < 0){
        codigo = 0;
    }
    
    const despesa = {
        id: codigo+1, //corrige a sequência correta de códigos dos usuários
        descricao: descricao,
        valor: valor,
        categoriaId: categoriaId
    };

    DespesaLista.push(despesa);
    res.send();
});



//servidor se hospeda na porta 4300 para poder estar rodando
//esta função "listen" TEM QUE SER a última do arquivo/projeto/código
server.listen(4300, () =>{
    console.log("Connection estabilished at the door 4300.");
});