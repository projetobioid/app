/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


// ...additional event handlers here...

//variaveis globais
//var papel;

//id da propriedade
//var idpropriedade = 4;

//ip do servidor

var ipServidor = "http://bioid.ddns.net:8088/Projeto_BioID-war";//acesso fora com dns
//var ipServidor = "http://10.2.10.200:8080/Projeto_BioID-war"; //sistema em producao


//funcao mudar background aleatorio
function mudarBackground(){
    switch(Math.floor((Math.random() * 8) + 1)){
        case 1:
            $(".backgroundInicial").css("background-image", 'url("images/background1.jpg")');
            break;
        case 2:
            $(".backgroundInicial").css("background-image", 'url("images/background2.jpg")');
            break;
        case 3:
            $(".backgroundInicial").css("background-image", 'url("images/background3.jpg")');
        break;
            case 4:
            $(".backgroundInicial").css("background-image", 'url("images/background4.jpg")');
        break;
            case 5:
            $(".backgroundInicial").css("background-image", 'url("images/background5.jpg")');
            break;
        case 6:
            $(".backgroundInicial").css("background-image", 'url("images/background6.jpg")');
            break;
        case 7:
            $(".backgroundInicial").css("background-image", 'url("images/background7.jpg")');
            break;
        case 8:
            $(".backgroundInicial").css("background-image", 'url("images/background8.jpg")');
            break;
        default:
            $(".backgroundInicial").css("background-image", 'url("images/background1.jpg")');
            break;

    }
}




function verificarConexao(){

    if(navigator.connection.type == 'none'){


        navigator.notification.alert('Detectamos que o dispositivo está sem conexão à internet, Algumas informações e funções dependem do servidor. Conecte-se a internet se possível!', function(){
        },"Alerta!", "OK");
    }
}


//verifica se existe sessao na localStorage
//inicia pela ultima sessao ou abre tela de login
//function verificaSession(){
//
//    try{
//        if(localStorage.getItem("logSessao")){
//             carregaDados();
//            //verificarDataLogin();
//        }else{
//            //limpa o localstorage e inicia o app da pagina de login
//            localStorage.clear();
//            window.activate_page("#mainpage");
//        }
//    }catch(e){
//        window.alert("Erro verificaSession: " + e.message);
//        clearGoMainPage();
//    }
//}


////funcao para verificar a data referente ao ultimo acesso, se estiver mais de 7 dias sem se conectar redireciona para login
//function verificarDataLogin(){
//
//    try{
//
//        var dataAtual = new Date().getTime() - (5 * 24 * 60 * 60 * 1000);
//        var tempoLogin = JSON.parse(localStorage.getItem("logSessao")).tempoLogin;
//
//        if(dataAtual > tempoLogin){
//            console.log(dataAtual);
//            console.log(tempoLogin);
//        }
//
//
//        var data = new Date(),
//            dia = data.getDate(),
//            mes = data.getMonth() + 1,
//            ano = data.getFullYear();
//
//
//        //teste os dias logado com ultimo login armazenado no localStorage
//        if((730 * mes) - (730 - (dia*24)) > JSON.parse(localStorage.getItem("logSessao")).logTempo){
//            //alerta, redireciona para pagina login e limpa a localStorage
//            navigator.notification.alert("Por motivos de segurança pedimos que faça o login novamente!",function(){},"Alerta","OK");
//            clearGoMainPage();
//        //o app foi aberto antes de 7 dias, entao carrega informacoes da localStorage
//        }else{
//
//            carregaDados();
//        }
//    }catch(e){
//        window.alert("Erro verificarDataLogin: "+ e.message);
//        clearGoMainPage();
//    }
//}

//carrega os dados de cada usuario
//function carregaDados(){
//    try{
//        var dadosSessao = JSON.parse(localStorage.getItem("logSessao"));
//        papel = dadosSessao.papel;
//
//        if(papel === "a"){
//            //usuario agricultor
//            window.activate_page("#page_agricultor");
//            iniciarAgricultor();
//            //verifica se tem conexao com a internet, se tem conexao baixa as atualizacoes
//            verificarConexao();
//            listarPropriedades();
//            listarSafras();
//
//        }else if(papel === "g" || papel === "e" || papel === "d"){
//            //usuario gerenciador e entrevistador
//            window.activate_page("#page_4");
////            iniciarGerEntrev();
////            listarEstoque();
//            //listarAgricultoresUnidade();
//        }else{
//            clearGoMainPage();
//        }
//    }catch(e){
//        window.alert("Erro carregaDados: "+ e.message);
//        clearGoMainPage();
//    }
//
//}





function getSessao(){
    var logSessao = JSON.parse(localStorage.getItem("logSessao"));
    return logSessao;
}

function updateSessao(novaSessao){
    var logSessao = JSON.parse(localStorage.getItem("logSessao"));
    logSessao.sessao = novaSessao;
    localStorage.setItem("logSessao", JSON.stringify(logSessao));
}

////servico de busca dos dados no servidor, consome dados de internet e armazena no localStorage
//function servArmazenarCulRecebdo(idpessoa, sessao){
//
//    var cultivaresRecebidos = [];
//    var propriedades = [];
//    var cultivares = [];
//    var safras = [];
//
//
//    $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/cultivar/listarrecebidos", "idpessoa="+idpessoa+'&sessao='+sessao, function(dados){
//        window.spinnerplugin.show();
//        //armazena no localStorge
//        if(dados.sucesso){
//
//            //armazena os cultivares recebidos
//            cultivaresRecebidos = dados.cultivaresrecebidos;
//            //armazena as imagens dos cultivares em um array
//            cultivares = dados.cultivares;
//
//            //adiciona as propriedades e as safras em arrays
//            $.each(dados.cultivaresrecebidos, function(i, valor){
//
//                if(propriedades.indexOf(valor.nomepropriedade) < 0){
//                    propriedades.push(valor.nomepropriedade);
//                }
//
//                if(safras.indexOf(valor.safra) < 0){
//                    safras.push(valor.safra);
//                }
//
//            });
//            window.updateSessao(dados.sessao);
//        }
//    }, "json")
//    //Tratamento de erro da requisicao servico RESt login
//    .fail(function(){
//        window.spinnerplugin.hide();
//        verificarConexao();
//    })
//    .done(function(){
//        //armazena no localstorage
//        localStorage.removeItem("cultivaresRecebidos");
//        localStorage.setItem("cultivaresRecebidos", JSON.stringify(cultivaresRecebidos));
//        //armazena propriedades no localstorage
//        localStorage.removeItem("propriedades");
//        localStorage.setItem("propriedades", JSON.stringify(propriedades));
//        //armazena imagens no localstorage
//        localStorage.removeItem("cultivares");
//        localStorage.setItem("cultivares", JSON.stringify(cultivares));
//        //armazena safra no localstorage
//        localStorage.removeItem("safras");
//        localStorage.setItem("safras", JSON.stringify(safras));
//        //armazena safra no localstorage
//        //localStorage.removeItem("perguntas");
//        //localStorage.setItem("perguntas", JSON.stringify(perguntas));
//        //chama o metodo que popula o item de propriedades
//        window.listarPropriedades();
//        //chama o metodo que lista as safras
//        listarSafras();
//        window.spinnerplugin.hide();
//    });
//
//
//}



//limpa a memoria do app e redireciona para tela de login
function clearGoMainPage(){
    window.activate_page("#mainpage");
    sessionStorage.clear();
    localStorage.clear();
}

//function listarSafras(){
//    if(localStorage.getItem("safras")){
//        var safras = JSON.parse(localStorage.getItem("safras"));
//        var item;
//
//
//        $(".uib_w_353").empty();
//
//        $.each(safras, function(i){
//            item ='<a id="safra_'+i+'" class="list-group-item widget" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+safras[i]+'<i class="amarelo glyphicon glyphicon-chevron-up button-icon-right" data-position="top"></i></h4></a>';
//
//
//            $(".uib_w_353").append(item);
//
//            listarCultivarSafras(safras[i], i);
//            $('#safra_'+i+' pre').hide();
//
//        });
//
//    }else{
//        navigator.notification.confirm(
//            'Não existe safras!',
//            function() {
//                //clearGoMainPage();
//            },
//            'Erro',
//            ['OK']
//        );
//    }
//function listarCultivarSafras(safra, classSafra){
//
//
//    var cultivaresRecebidos = JSON.parse(localStorage.getItem("cultivaresRecebidos"));
//    var item;
//    var a;
//
//    $.each(cultivaresRecebidos, function(i){
//
//        if(safra === cultivaresRecebidos[i].safra){
//            a = cultivaresRecebidos[i];
//
//            item = '<pre class="itensPre"><h5 class=" list-group-item-text">'+a.nomecultivar+'</h5><p class="list-group-item-text">Data recebimento: '+a.datareceb+'</p><p class="list-group-item-text">Propriedade: '+a.nomepropriedade+'</p><p class="list-group-item-text">Quantidade recebida: '+a.qtdrecebida+' '+a.grandeza_recebida+'</p><p class="list-group-item-text">'+statusColheita(a.statussafra_idstatussafra)+ a.prazo_colheita+'</p><p class="list-group-item-text">Quantidade colhida: '+a.qtdcolhida+' kilo(s)</p><p class="list-group-item-text">'+statusDestinacao(a.statussafra_idstatussafra)+a.prazo_destinacao+'</p><p class="list-group-item-text">Quantidade destinada: '+a.qtddestinada+' kilo(s)</p> </pre>';
//
//
//            $("#safra_"+classSafra).append(item);
//        }
//    });
//
//}









