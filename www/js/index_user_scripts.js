/*jshint browser:true */
/*global $ */(function()
{
 "use strict";

     //funcao somente para fins de teste
     function c(msg){
         window.console.log(msg);
     }

//////////////FUNCOES PADROES USADAS PELO HARDWARE DO APARELHO E ELEMENTOS HTML/////////////////////////

//fecha o menu hamburguer
function escondeMenuHamburguer(item){

 if($('.botaoMenu').is(':visible')){
    if($(item).is(':visible')){
        $(item).collapse('hide');
        return true;
    }
 return false;
 }

}

///fecha o app
function fecharApp(){
     navigator.notification.confirm(
            'Deseja fechar o app?', // message
            function(buttonIndex) {
                if(buttonIndex == 2){
                    navigator.app.exitApp();
                }
            },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Cancelar', 'Fechar']     // buttonLabels
         );

}

//function requisicao(url, envio, metodo){
function requisicao(url, envio, callback) {

  //testa se nescessita de painel de carregando
//    if(painelCarregando){
        window.spinnerplugin.show();
//    }
        //alert(JSON.stringify(envio));
       $.ajax({
            type: 'POST',
            url: window.ipServidor+"/servico/"+url,
            data: JSON.stringify(envio),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            success: function(retorno){
                callback(retorno);
            },
            error: function() {
//                if(painelCarregando){
                    window.spinnerplugin.hide();
//                }
                navigator.notification.alert("Alerta!", "Sem conexão com o servidor!", function(){
                },"Alerta!", "OK");
            }
        });


}

/////////ABRIR PAGINA AMOSTRAGEM////////
function abrirPageAmostragem(tituloAmostragem, tituloBoxAmostragem, corpoAmostragem){
    //popula a pagina amostragem
    $('#tituloAmostragem').empty().text(tituloAmostragem);
    //nome do cultivar na pagina amostragem
    $('#tituloBoxAmostragem').empty().append(tituloBoxAmostragem);
    //adiciona itens ao corpo da pagina
    $("#corpoAmostragem").empty().append(corpoAmostragem);
    //retira o painel loading
    window.spinnerplugin.hide();
    //ativa a pagina
    activate_page("#page_amostragem");
}
///////////FIM ABRIR PAGINA AMOSTRAGEM//////

///BUSCAR CULTIVAR E MOSTRAR NA PAGINA AMOSTRAGEM//////
function mostrarCultivar(idClicado){
    var envio = {
    metodo: "GET_CULTIVAR",
    idcultivar: idClicado
    };

    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("cultivar/buscar", envio, function(dadosRetorno) {
//            $('#listaDeMembros').empty();
        if(dadosRetorno.sucesso){

            //chama a funcao que mostra a pagina amostragem
            abrirPageAmostragem('Cultivar', dadosRetorno.data.nomecultivar+'<i class="fa fa-leaf button-icon-right" data-position="top"></i>', '<div class="widget-container content-area vertical-col"><div class="widget scale-image d-margins marginTopoImg" data-uib="media/img" data-ver="0"><figure class="figure-align"><img height="200" width="200" src='+dadosRetorno.data.imagem+'><figcaption data-position="bottom"></figcaption></figure></div></div>            <span class="uib_shim"></span>                <div class="col single-col" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><div class="tarea widget d-margins" data-uib="media/text" data-ver="0" ><div class="widget-container left-receptacle"></div><div class="widget-container right-receptacle"></div><div class="text-container">          <hr><p class="backgroundCinza">Biofortificado: '+dadosRetorno.data.biofortificado+'</p><p class="backgroundBranco">Unidade de medida: '+dadosRetorno.data.grandeza+'</p><p class="backgroundCinza">Descrição: '+dadosRetorno.data.peso_saca+'</p><p class="backgroundBranco">Ciclo de produção: '+dadosRetorno.data.tempodecolheita+' dia(s)</p><p class="backgroundCinza">Periodo de armazenamento/destinação: '+dadosRetorno.data.tempodestinacao+' dia(s)</p><p  class="backgroundBranco" >Descrição: '+dadosRetorno.data.descricao+'</p><p class="backgroundCinza">Valor nutricional: '+dadosRetorno.data.valornutricional+'</p><hr>       </div></div><span class="uib_shim"></span></div></div>');

        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){
                iniciarGerenciador();
            },"Aviso!", "Sair");

        }

    });
}
////FIM BUSCAR CULTIVAR E MOSTRAR NA PAGINA AMOSTRAGEM/////

///////INICIO BUSCAR AGRICULTOR E MOSTRAR NA PAGINA AMOSTRAGEM//////////
function mostarAgricultor(idClicado){
    window.spinnerplugin.show();
    var envio = {
        metodo: "BUSCA_POR_ID_AGRICULTOR",
        idpessoa: idClicado
    };

    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("agricultor/buscar", envio, function(dadosRetorno) {
//            $('#listaDeMembros').empty();
        if(dadosRetorno.sucesso){

            //chama a funcao que mostra a pagina amostragem
            abrirPageAmostragem('Agricultor', dadosRetorno.data.nome+' '+dadosRetorno.data.sobrenome+'<i class="fa fa-user button-icon-right" data-position="top"></i>', '<div class="col single-col" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><div class="tarea widget d-margins" data-uib="media/text" data-ver="0" ><div class="widget-container left-receptacle"></div><div class="widget-container right-receptacle"></div><div class="text-container">             <p  class="backgroundBranco" >CPF: '+dadosRetorno.data.cpf+'</p><p class="backgroundCinza">RG: '+dadosRetorno.data.rg+'</p><p  class="backgroundBranco" >Apelido: '+dadosRetorno.data.apelido+'</p><p class="backgroundCinza">Data nascimento: '+dadosRetorno.data.datanascimento+'</p><p  class="backgroundBranco" >Sexo: '+dadosRetorno.data.sexo+'</p><p class="backgroundCinza">Telefone1: '+dadosRetorno.data.telefone1+'</p><p  class="backgroundBranco" >Telefone2: '+dadosRetorno.data.telefone2+'</p><p class="backgroundCinza">Email: '+dadosRetorno.data.email+'</p><p  class="backgroundBranco" >Estado civíl: '+dadosRetorno.data.estadocivil+'</p><p class="backgroundCinza">Escolaridade: '+dadosRetorno.data.escolaridade+'</p><p  class="backgroundBranco" >Qtd integrante(s) na família: '+dadosRetorno.data.qtdintegrantes+'</p><p class="backgroundCinza">Qtd crianças: '+dadosRetorno.data.qtdcriancas+'</p><p  class="backgroundBranco" >Qtd grávidas: '+dadosRetorno.data.qtdgravidas+'</p><hr>  <div class="text-container" id="MostrarPropriedadesAgricultor" value="'+dadosRetorno.data.idpessoa+'"><div class="panelPropriedades">Propriedades<i class="amarelo glyphicon glyphicon-chevron-up button-icon-right" data-position="top"></i></div></div><div id="propriedadesDoAgricultor" hidden=""></div>      </div></div><span class="uib_shim"></span></div></div>');



            window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){
                iniciarGerenciador();
            },"Aviso!", "Sair");

        }

    });
}


///////////FUNCAO QUE LISTA AS PROPRIEDADES DO AGRICULTOR///////////////////


///FUNCAO QUE VERIFICA QUAL A PAGINA QUE ESTA VISIVEL
function verificarPagina(){
     if($('#mainpage').is(":visible")){
         return '#mainpage';

     }else if($('#page_gerenciador').is(":visible")){
         return '#page_gerenciador';

     }else if($('#page_entrevistador').is(":visible")){
         return '#page_entrevistador';

     }else if($('#page_agricultor').is(":visible")){
        return '#page_agricultor';

     }else if($('#page_login').is(":visible")){
        return '#page_login';

     }else if($('#page_erro').is(":visible")){
        return '#page_erro';

     }else if($('#page_amostragem').is(":visible")){
        return '#page_amostragem';
     }
}


 //INICIAR ENTREVISTADOR
 function iniciarEntrevistador(){

     listarEstoqueEntrevistador();
     window.activate_page("#page_entrevistador");
     $("#page_entrevistador").scrollTop(0);
     //desativa o painel central para dar efeito fade
     $('#uib_w_600').hide();
     //desativa os paineis
     $('.paineisEntrevistador').hide();
     //ativa o painel inicial que eh o de estoque
     $("#uib_w_601").show();
     //inicia o painel central
     $('#uib_w_600').fadeIn();
     window.spinnerplugin.hide();
 }

function iniciarAgricultor(){

     listarPropriedades();

     window.activate_page("#page_agricultor");
     $("#page_agricultor").scrollTop(0);
     //desativa o painel central para dar efeito fade
     $('#uib_w_149').hide();
    //desativa os paineis
     $('.paineisAgricultor').hide();
     //ativa o painel inicial que eh o de cultivares recebidos
     $("#uib_w_265").show();
     //inicia o painel central
     $('#uib_w_149').fadeIn();

}

//FUNCAO QUE LISTA A PROPRIEDADE
function listarPropriedades(){

    window.spinnerplugin.show();

    var Sessao = window.getSessao();
    var envio = {
            metodo: "POR_USUARIO_E_IDUNIDADE",
            usuario: Sessao.usuario,
            idunidade: Sessao.unidade_idunidade
        };

    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("propriedade/listar", envio, function(dadosRetorno) {
        if(dadosRetorno.sucesso){


            $('#listaPropriedades').empty();
            //percorre a lista de propriedades e lista em abas
            $.each(dadosRetorno.data, function(i, valor){

                $('#listaPropriedades').append('<li value="'+valor.idpropriedade+'" role="presentation" class="widget active" data-uib="twitter%20bootstrap/tab_item" data-ver="1"><a role="tab" data-toggle="tab">'+valor.nomepropriedade+'</a></li>');

                //funcao que lista os cultivares recebidos
                listarCultivarRecebidos(valor.idpropriedade);
            });


            //retira o painel loading
             window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){},"Aviso!", "Sair");

        }

    });






//    var item;
//    var itemP;
//    $(".uib_w_286").empty();
//    $(".uib_w_357").empty();
//
//    var propriedades = JSON.parse(localStorage.getItem("propriedades"));
//
//    if(propriedades.length > 0){
//
//        $.each(propriedades, function(i){
//            item = '<li role="presentation" class="widget uib_w_287" data-uib="twitter%20bootstrap/tab_item" data-ver="1"><a role="tab" data-toggle="tab">'+propriedades[i]+'</a></li>';
//
//            itemP = '<li role="presentation" class="widget uib_w_358" data-uib="twitter%20bootstrap/tab_item" data-ver="1"><a role="tab" data-toggle="tab">'+propriedades[i]+'</a></li>';
//
//            $(".uib_w_286").append(item);
//            $(".uib_w_357").append(itemP);
//
//        });
//
//
//        //marca o ultima propriedade como ativa
//        $('.uib_w_287').last().addClass("active");
//        $('.uib_w_358').last().addClass("active");
//
//
//        //chama a funcao de listar cultivares recebidos
//        listarCultivarRecebidos(propriedades[propriedades.length - 1]);
//
//    }else{
//        $("#cultivarRecebido").empty();
//
////        item = '<a class="list-group-item allow-badge widget uib_w_267" data-uib="twitter%20bootstrap/list_item" data-ver="1"><span class="badge fa fa-rotate-left"> </span><h4 class="list-group-item-heading">Atualizar lista</h4><p class="list-group-item-text">data recebimento/quantidade</p></a>';
////
////        $("#cultivarRecebido").append(item);
//
//        navigator.notification.alert("Nenhum cultivar recebido!\nReceba cultivares biofortificados em uma unidade de distribuição mais próxima de você,\nmais dúvidas entre em contato com inovacao@fundetec.org.br",function(){},"Alerta","OK");
//    }
}
///////////FIM DA FUNCAO LISTAR PROPRIEDADES PAPEL AGRICULTORES/////////////////////////

///////////INICIO FUNCAO LISTAR CULTIVARES RECEBIDOS PAPEL AGRICULTORES//////////
function listarCultivarRecebidos(idPropriedade){


    var envio = {
            metodo: "CULTIVARES_RECEBIDOS",
            idpropriedade: idPropriedade
        };

    //chama a requisicao do servidor que lista os cultivares recebidos de uma propriedade
    requisicao("safra/listar", envio, function(dadosRetorno) {
        if(dadosRetorno.sucesso){


            $('#cultivaresRecebidos').empty();
            //percorre a lista de propriedades e lista em abas
            $.each(dadosRetorno.data, function(i, valor){

                $('#cultivaresRecebidos').append('<a value="'+valor.idsafra+'" class="list-group-item allow-badge widget" data-uib="twitter%20bootstrap/list_item" data-ver="1">'+ prazoRelatar(valor.statussafra)+'<h4 class="list-group-item-heading">'+ valor.nomecultivar +'</h4><p class="list-group-item-text">Safra: '+ valor.safra +'</p></a>');

            });


            //retira o painel loading
             window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){},"Aviso!", "Sair");

        }

    });


//        $("#cultivarRecebido").empty();
//        var cultivaresRecebidos = JSON.parse(localStorage.getItem("cultivaresRecebidos"));
//
//        //se nao conter os dados redireciona para acesso no servidor, armazena na localStorage e depois chama novamente o metotodo listarCultivarRecebidos
//        if(cultivaresRecebidos === null){
//            clearGoMainPage();
//        //acessa o localStorge e cria a lista
//        }else{
//            var a;
//            //percore o tamanho do cultivares recebidos e cria um novo item
//            $.each(cultivaresRecebidos, function(i){
//                a = cultivaresRecebidos[i];
//                //teste a propriedade
//                if(a.nomepropriedade === nomePropriedade){
//                     // var item ='<a id="'+i+'" class="list-group-item allow-badge widget uib_w_268" data-uib="twitter%20bootstrap/list_item" data-ver="1">'+ prazoRelatar(a.statussafra_idstatussafra)+'<h4 class="list-group-item-heading">'+ a.nomecultivar +'</h4><p class="list-group-item-text">Safra: '+ a.safra +'</p><p class="list-group-item-text">'+statusColheita(a.statussafra_idstatussafra)+ a.prazo_colheita+'</p><p class="list-group-item-text">'+statusDestinacao(a.statussafra_idstatussafra)+a.prazo_destinacao+'</p></a>';
//                     var item ='<a id="'+i+'" class="list-group-item widget uib_w_268" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+ a.nomecultivar + prazoRelatar(a.statussafra_idstatussafra)+'</h4><p class="list-group-item-text">Safra: '+ a.safra +'</p><p class="list-group-item-text">'+statusColheita(a.statussafra_idstatussafra)+ a.prazo_colheita+'</p><p class="list-group-item-text">'+statusDestinacao(a.statussafra_idstatussafra)+a.prazo_destinacao+'</p></a>';
//                    $("#cultivarRecebido").append(item);
//                }
//            });
//        }

}
///////////FIM FUNCAO LISTAR CULTIVARES RECEBIDOS PAPEL AGRICULTORES//////////

////////////////////////INICIAR FUNCAO DE ICONE DE SAFRA//////////////////////
    function prazoRelatar(status){

    if(status === 7 || status === 8){
        //return '<span class="vermelho badge fa fa-thumbs-o-down"><span class="vermelho badge fa fa-chevron-right"> </span></span>';
        return '<i class="vermelho fa fa-thumbs-o-down button-icon-right" data-position="top"></i>';
    }else if(status === 6 ){
        return '<i class="verde fa fa-thumbs-o-up button-icon-right" data-position="top"></i>';
        //return '<span class="verde badge fa fa-thumbs-o-up"><span class="verde badge fa fa-chevron-right"> </span></span>';
    }else if(status === 1){
        return '<i class="laranja fa fa-hand-o-right button-icon-right" data-position="top"></i>';
        // return ' <span class="laranja badge fa fa-chevron-right"> </span>';
    }else{
        //return ' <span class="amarelo badge fa fa-chevron-right"> </span>';
        return '<i class="amarelo fa fa-hand-o-right button-icon-right" data-position="top"></i>';
    }

}
//////////////FIM FUNCAO DE ICONE DE SAFRA//////////////////


//function statusColheita(statussafra){
//    if(statussafra <= 3){
//        return 'Relatar colheita até: ';
//    }else{
//        return 'Colheita ';
//    }
//
//}
//function statusDestinacao(statussafra){
//    if(statussafra <= 5){
//        return 'Relatar destinação até: ';
//    }else{
//        return 'Destinação ';
//    }
//
//}
    ////////////////////////FIM FUNCAO

////////////////////INICIO MOSTRAR O CULTIVAR RECEBIDO EM UMA SAFRA PAPEL AGRICULTOR////////////

function mostrarCultivarRecebido(idsafra){
    var envio = {
    metodo: "GET_POR_IDSAFRA",
    idsafra: idsafra
    };

    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("safra/buscar", envio, function(dadosRetorno) {
//            $('#listaDeMembros').empty();
        if(dadosRetorno.sucesso){

            c(JSON.stringify(dadosRetorno.data));
            //chama a funcao que mostra a pagina amostragem
            abrirPageAmostragem('Cultivar recebido', dadosRetorno.data.nomecultivar+'<i class="fa fa-leaf button-icon-right" data-position="top"></i>', '<div class="widget-container content-area vertical-col"><div class="widget scale-image d-margins marginTopoImg" data-uib="media/img" data-ver="0"><figure class="figure-align"><img src='+dadosRetorno.data.imagem+'><figcaption data-position="bottom"></figcaption></figure></div></div>            <span class="uib_shim"></span>                <div class="col single-col" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><div class="tarea widget d-margins" data-uib="media/text" data-ver="0" ><div class="widget-container left-receptacle"></div><div class="widget-container right-receptacle"></div><div class="text-container">          <hr><p class="backgroundCinza">Safra: '+dadosRetorno.data.safra+'</p><p  class="backgroundBranco" >Data recebimento: '+dadosRetorno.data.datareceb+'</p><p class="backgroundCinza">Qtd recebida: '+dadosRetorno.data.qtdrecebida+' '+dadosRetorno.data.grandeza+'</p><p  class="backgroundBranco" >Status da safra: '+dadosRetorno.data.descricao_status+'</p><hr> '+botoesRelatarSafra(dadosRetorno.data.statussafra)+'       </div></div><span class="uib_shim"></span></div></div>');

        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){
                iniciarGerenciador();
            },"Aviso!", "Sair");

        }

    });
}

////////////////////FIM MOSTRAR O CULTIVAR RECEBIDO EM UMA SAFRA PAPEL AGRICULTOR////////////

/////////INICIO TESTE SE A SAFRA ESTA EM ABERTA AINDA//////////////
function botoesRelatarSafra(status){

    var retorno = "";

    switch(status){
        case 1:
            retorno =  '<button id="relatarColheita" class="btn widget d-margins btn-warning" data-uib="twitter%20bootstrap/button" data-ver="1"><i class="fa fa-cube button-icon-left" data-position="left"></i>Relatar colheita</button>';
            break;
        case 2:
        case 3:
            retorno =  '<button id="relatarColheita" class="btn widget d-margins btn-warning" data-uib="twitter%20bootstrap/button" data-ver="1"><i class="fa fa-cube button-icon-left" data-position="left"></i>Relatar colheita</button> <button id="relatarDestinacao" class="btn widget d-margins btn-warning" data-uib="twitter%20bootstrap/button" data-ver="1"><i class="fa fa-truck button-icon-left" data-position="left"></i>Relatar destinação</button>';
            break;
        case 4:
        case 5:
            retorno =  '<button id="relatarDestinacao" class="btn widget d-margins btn-warning" data-uib="twitter%20bootstrap/button" data-ver="1"><i class="fa fa-truck button-icon-left" data-position="left"></i>Relatar destinação</button>';
            break;
        default:
            retorno = "";
            break;
    }


    return retorno;
}
/////////FIM INICIO TESTE SE A SAFRA ESTA EM ABERTA AINDA//////////////

////////// FIM FUNCOES PADROES USADAS PELO HARDWARE DO APARELHO E ELEMENTOS HTML///////////////////////

//////////////////// FUNCOES USADAS PELO GERENCIADOR//////////////////////////////////////////
//INICIAR GERENCIADOR
 function iniciarGerenciador(){

     listarEstoqueGerenciador();
     window.activate_page("#page_gerenciador");
     $("#page_gerenciador").scrollTop(0);
     //desativa o painel central para dar efeito fade
     $('#uib_w_154').hide();
     //desativa os paineis
     $('.paineisGerenciador').hide();
     //ativa o painel inicial que eh o de estoque
     $("#uib_w_123").show();
     //inicia o painel central
     $('#uib_w_154').fadeIn();
     window.spinnerplugin.hide();
 }

//LISTA ESTOQUE DA UNIDADE PAPEL GERENCIADOR
function listarEstoqueGerenciador(){

    var Sessao = window.getSessao();
    var envio = {
            metodo: "TODOS",
            idunidade: Sessao.unidade_idunidade
        };

    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("estoque/listar", envio, function(dadosRetorno) {
        if(dadosRetorno.sucesso){

            $('#itensEstoqueGerenciador').empty();
            $.each(dadosRetorno.data, function(i, valor){
//                items += "<tr><td>"+valor.idcultivar+"</td><td>"+valor.nomecultivar+"</td><td>"+valor.quantidade+"</td><td>"+valor.grandeza+"</td></tr>";
                $('#itensEstoqueGerenciador').append('<a value="'+valor.idcultivar+'" class="list-group-item widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+valor.nomecultivar+'<i class="amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text">'+valor.quantidade+' '+valor.grandeza+'</p></a>');
            });

            //retira o painel loading
             window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){},"Aviso!", "Sair");

        }

    });


}
//FIM LISTA ESTOQUE DA UNIDADE PAPEL GERENCIADOR

//LISTA ESTOQUE DA UNIDADE PAPEL ENTREVISTADOR
function listarEstoqueEntrevistador(){

    var Sessao = window.getSessao();
    var envio = {
            metodo: "TODOS",
            idunidade: Sessao.unidade_idunidade
        };

    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("estoque/listar", envio, function(dadosRetorno) {
        if(dadosRetorno.sucesso){
            $('#itensEstoqueEntrevistador').empty();
            $.each(dadosRetorno.data, function(i, valor){
//                items += "<tr><td>"+valor.idcultivar+"</td><td>"+valor.nomecultivar+"</td><td>"+valor.quantidade+"</td><td>"+valor.grandeza+"</td></tr>";
                $('#itensEstoqueEntrevistador').append('<a value="'+valor.idcultivar+'" class="list-group-item widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+valor.nomecultivar+'<i class="amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text">'+valor.quantidade+' '+valor.grandeza+'</p></a>');
            });

            //retira o painel loading
//             window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){},"Aviso!", "Sair");

        }

    });

}
//FIM LISTA ESTOQUE DA UNIDADE PAPEL ENTREVISTADOR

//LISTA OS AGRICULTORES DA UNIDADE GERENCIADOR
function listarAgricultoresUnidade(lista){

    var Sessao = window.getSessao();
    var envio = {
        metodo: "TODOS_DA_UNIDADE",
        usuario: Sessao.usuario,
        sessao: Sessao.sessao,
        idunidade: Sessao.unidade_idunidade
    };

    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("agricultor/listar", envio, function(dadosRetorno) {

        if(dadosRetorno.sucesso){

//            sessionStorage.setItem('listaAgricultores', JSON.stringify(listaAgricultores));
            $(lista).empty();

            $.each(dadosRetorno.data, function(i, valor){
                $(lista).append( '<a value="'+valor.idpessoa+'" class="list-group-item widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+valor.nome+'<i class="amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text"> '+valor.sobrenome+'</p><p class="list-group-item-text"> RG: '+valor.rg+'</p><p class="list-group-item-text">CPF: '+valor.cpf+'</p></a>');

            });

//item += "<tr><td>"+valor.idpessoa+"</td><td>"+valor.nome+"</td><td>"+valor.sobrenome+"</td><td>"+valor.rg+"</td><td>"+valor.cpf+"</td><td>"+valor.telefone1+"</td><td>"+valor.nomeunidade+"</td></tr>";


             //retira o painel loading
             window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){},"Aviso!", "Sair");

        }

    });


}
//FIM LISTA OS AGRICULTORES DA UNIDADE

    //function listarPropriedadesBackup(){
//    var backupPropriedades = [];
//    var item;
//
//    $('.uib_w_363').empty();
//    if(localStorage.getItem('backupPropriedades')){
//        backupPropriedades = JSON.parse(localStorage.getItem('backupPropriedades'));
//
//        $.each(backupPropriedades, function(i){
//
//            item = '<a class="list-group-item widget uib_w_364" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><span class="fa fa-briefcase">&nbsp;</span>'+backupPropriedades[i].nomepropriedade+'<i class=" amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text idpropriedadeBackup" hidden> '+backupPropriedades[i].idpropriedade+'</p></a>';
//
//            $('.uib_w_363').append(item);
//        });
//    }else{
//        item = '<a id="infoSemBackup" class="list-group-item widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><span class="glyphicon glyphicon-info-sign"></span>&nbsp;&nbsp;&nbsp;Não contém propriedades armazenadas!</h4></a>';
//
//        $('.uib_w_363').append(item);
//    }
//
//
//}

////////////////////////////////FIM FUNCOES USADAS PELO GERENCIADOR///////////////////////

//////////////FUNCAO HARDWARE, CAPTURA DO BOTAO VOLTAR/////////////////////////////////////////////////
 function onBackKeyDown()
 {
     switch(verificarPagina()){
         //pagina inicial
         case '#mainpage':
             fecharApp();
             break;

         //pagina login
         case '#page_login':
             activate_page("#mainpage");
             break;

         //pagina gerenciador
         case '#page_gerenciador':
             if(!escondeMenuHamburguer("#bs-navbar-2")){
                 //se estiver no inicio pede para sair do gerenciador
                 if($('.paineisGerenciador:visible').attr("id") === 'uib_w_123'){
                    fecharApp();

                 }else{
                    iniciarGerenciador();
                 }
             }

             break;

         //pagina entrevistador
         case '#page_entrevistador':
             if(!escondeMenuHamburguer("#bs-navbar-3")){
                 //se estiver no inicio pede para sair do gerenciador
                 if($('.paineisEntrevistador:visible').attr("id") === 'uib_w_601'){
                     fecharApp();
                 }else{
                     iniciarEntrevistador();
                 }
             }
             break;

         case '#page_agricultor':
             if(!escondeMenuHamburguer("#bs-navbar-1")){
                 //se estiver no inicio pede para sair do gerenciador
                 if($('.paineisAgricultor:visible').attr("id") === 'uib_w_265'){
                    fecharApp();
                 }else{
                     iniciarAgricultor();
                 }
             }
             break;
         case '#page_amostragem':
             history.go(-1);
             break;

         case '#page_erro':
             activate_page("#page_login");
             break;

         default:
             navigator.notification.alert("Função não disponível!", function(){},"Alerta!", "Sair");
             break;
     }

 }



/////////////////////////EVENTOS DOS ELEMENTOS HTML//////////////////////////////////////////////
 function register_event_handlers()
 {



//////////////FUNCOES PADROES USASAS EM TODOS OS NIVEIS DE USUARIOS//////////////////

//     $(document).on("click", "#page_agricultor", function(evt)
//     {
//         if($('#bs-navbar-1').is(":visible")){
//             $('#bs-navbar-1').collapse("hide");
//         }
//
//         return false;
//     });
//


 //verificar qual navbar esta aberta
 function verificarNavBar(){
    if($('#bs-navbar-1').is(':visible')){
         return '#bs-navbar-1';
    }else if($('#bs-navbar-2').is(':visible')){
         return '#bs-navbar-2';
    }else{
         return '#bs-navbar-3';
    }
 }
//////////////FIM DE FUNCOES PADROES USASAS EM TODOS OS NIVEIS DE USUARIOS//////////////////

 //////////////INICIO PAGINA CONFIGURACOES//////////////////

     //botao do navbar sair
     $(document).on("click", ".sair", function(evt)
     {
         escondeMenuHamburguer(verificarNavBar());

         navigator.notification.confirm(
            'Deseja sair?', // message
            function(buttonIndex) {
                if(buttonIndex === 2){

                    //chama a funcao que limpa a localStorage e abre mainpage
                    window.clearGoMainPage();

                }else if(buttonIndex == 1){
                    navigator.app.exitApp();
                }
            },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Sair App', 'Deslogar', 'Cancelar']     // buttonLabels
         );

         return false;
     });


     //botao do navbar configuracoes
     $(document).on("click", ".configuracoes", function(evt)
     {
         escondeMenuHamburguer(verificarNavBar());

         //chama a funcao que mostra a pagina amostragem
         abrirPageAmostragem('Configurações', 'Sistema <i class="fa fa-info-circle button-icon-right" data-position="top"></i>', '<div class="col  single-col" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><div class="table-thing widget d-margins" data-uib="twitter%20bootstrap/select" data-ver="1"><label class="narrow-control label-top-left">Papel de Parede:</label><select id="papelDeParede" class="wide-control form-control default input-lg"><option>Papel de parede 1</option><option>Papel de parede 2</option><option>Papel de parede 3</option><option>Papel de parede 4</option><option>Papel de parede 5</option><option>Papel de parede 6</option><option>Papel de parede 7</option><option>Papel de parede 8</option></select></div><div class="table-thing widget d-margins" data-uib="twitter%20bootstrap/select" data-ver="1"><label class="narrow-control label-top-left">Localidade:</label><select class="wide-control form-control default input-lg"><option>Brasil</option></select></div><div class="table-thing widget d-margins" data-uib="twitter%20bootstrap/select" data-ver="1"><label class="narrow-control label-top-left">Linguagem:</label><select class="wide-control form-control default"><option>Português-BR</option></select></div><span class="uib_shim"></span></div></div>');


         return false;
     });


     //botao do navbar sobre
     $(document).on("click", ".sobre", function(evt)
     {

        escondeMenuHamburguer(verificarNavBar());

        //chama a funcao que mostra a pagina amostragem
        abrirPageAmostragem('BioID', 'Sobre <i class="fa fa-info-circle button-icon-right" data-position="top"></i>', '<div class="text-container"><p>BioID applicativo de gerenciamento de produtos biofortificados.</p><hr><p>Desenvolvido pela Fundetec em parceria com a Embrapa, dentro do projeto BioFORT.</p><hr><p>Versão: 0.0.91 (Build Teste Alfa)</p><p>Sistema Operacional: Android</p></div><hr><div class="widget scale-image d-margins" data-uib="media/img" data-ver="0"><figure class="figure-align"><img src="images/LOGOS.png"><figcaption data-position="bottom"></figcaption></figure></div>');


        return false;
     });




    /* button  selecionar um papel de parede */
    $(document).on("change", "#papelDeParede", function(evt){

        switch($(this)[0].selectedIndex){
            case 0:
                $(".backgroundInicial").css("background-image", 'url("images/background1.jpg")');
                break;
            case 1:
                $(".backgroundInicial").css("background-image", 'url("images/background2.jpg")');
                break;
            case 2:
                $(".backgroundInicial").css("background-image", 'url("images/background3.jpg")');
                break;
            case 3:
                $(".backgroundInicial").css("background-image", 'url("images/background4.jpg")');
                break;
            case 4:
                $(".backgroundInicial").css("background-image", 'url("images/background5.jpg")');
                break;
            case 5:
                $(".backgroundInicial").css("background-image", 'url("images/background6.jpg")');
                break;
            case 6:
                $(".backgroundInicial").css("background-image", 'url("images/background7.jpg")');
                break;
            case 7:
                $(".backgroundInicial").css("background-image", 'url("images/background8.jpg")');
                break;
            default:
                $(".backgroundInicial").css("background-image", 'url("images/background1.jpg")');
                break;
        }

    });




/////////FIM DA PAGINA CONFIGURACOES///////////////////

//////////////PAGINA INICIAL////////////
    /* botao carregar pagina login*/
    $(document).on("click", "#uib_w_3", function(evt)
    {

        activate_page("#page_login");
        $("#username").val("");
        $("#password").val("");
        $("#formLogin").validator();
        $('#alerta').hide();
//         $('#uib_w_7').fadeIn(100);

         return false;
    });

    /* button  cadastrar novo agricultor*/
    $(document).on("click", "#uib_w_4", function(evt)
    {

         activate_page("#page_cadastro");
         $('#uib_w_156').hide();
         $('#uib_w_156').fadeIn(400);

         return false;
    });

/////////////////FIM PAGINA INICIAL///////////////////////////

 ////////////////////////////INICIO PAGINA CADASTRO///////////////////////
     /* botao na janela de cadastro e o evento direciona para a pagina inicial */
    $(document).on("click", "#uib_w_32", function(evt)
    {
        var logSessao = JSON.parse(localStorage.getItem("logSessao"));
//        if(logSessao.grupo === "entrevistadores"){
        if(logSessao !== null){
            if(logSessao.grupo === "entrevistadores"){
                $('#uib_w_600').hide();
                activate_page("#page_entrevistador");
                mostrarSelecionadoEntrevistador('#uib_w_602');

            }else{
                 activate_page("#mainpage");
                $('#uib_w_133').hide();
                $('#uib_w_133').fadeIn(400);
            }
        }else{
             activate_page("#mainpage");
            $('#uib_w_133').hide();
            $('#uib_w_133').fadeIn(400);
        }

         return false;

    });
 ////////////////////////////FIM PAGINA CADASTRO///////////////////////////



 //////////////////PAGINA LOGIN///////////////////////////////

    /* botao na janela de login e o evento direciona para a pagina inicial */
    $(document).on("click", "#uib_w_31", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage");
         $('#uib_w_133').hide();
         $('#uib_w_133').fadeIn(400);
//         $("#inputSenha").val("");
         return false;
    });

     //submit que ira fazer a requisicao para o login
$(document).on("submit", "#formLogin", function(e){



    if(!e.isDefaultPrevented()){

        window.spinnerplugin.show();

        var envio = {usuario: $("#username").val(),
                    senha: $.sha256($("#password").val()),
                    metodo: "VALIDACAO"
                    };
        $.when(

            $.ajax({
                type: 'POST',
                url: window.ipServidor+"/servico/outros/validacao",
                data: JSON.stringify(envio),
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            })


        ).then(function(dadosRetorno) {

                if(dadosRetorno.sucesso){

                    localStorage.setItem('logSessao', JSON.stringify(dadosRetorno.data));

                    $.ajax({
                        type: 'POST',
                        url : window.ipServidor+'/j_security_check',
                        data: $('.login').serialize()


                    }).done(function (){
                        switch(dadosRetorno.data.grupo){
                            case "administradores":
                                //chama a funcao que mostra a pagina amostragem
                                abrirPageAmostragem('BioID', 'Segurança<i class="fa fa-shield button-icon-right" data-position="top"></i>', '<div class="text-container text-center"><hr><span class="fa fa-lock amarelo" aria-hidden="true" style="font-size: 100px;"></span><hr><h4>O app não suporta este nível de acesso!</h4><hr></div>');
                                break;
                            case "gerenciadores":
                                iniciarGerenciador();
                                break;
                            case "entrevistadores":
                                iniciarEntrevistador();
                                break;
                            case "agricultores":
                                iniciarAgricultor();
                                break;
                            default:
                                navigator.notification.alert("Erro em estabelecer o grupo!", function(){
                                    window.clearGoMainPage();
                                },"Erro!", "Sair");

                                break;
                        }
                    });


                }else{
                    $("#alerta").empty().append('<a href="#" id="fecharAlert" class="close">&times;</a><strong>Aviso!</strong> Usuário ou senha incorreta!').fadeIn();
                }
        });
        window.spinnerplugin.hide();


    }

         return false;
    });


    //fecha a janela de erro senha incorreta
    $(document).on("click", "#fecharAlert", function(evt)
    {
        $("#alerta").fadeOut(400);

        return false;
    });


     /* botao fechar app na pagina inicial */
    $(document).on("click", "#uib_w_197", function(evt)
    {

        navigator.notification.confirm(
            'Deseja fechar o app?', // message
            function(buttonIndex) {
                if(buttonIndex == 2){
                    navigator.app.exitApp();
                }
            },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Cancelar', 'Fechar']     // buttonLabels
         );

         return false;
    });

    //esqueceu a senha
     $(document).on("click", "#esqueceuSenha", function(evt){
//         navigator.notification.alert("(usuario=gerenciador,senha=gerenciador) (usuario=entrevistador,senha=entrevistador) (usuario=agricultor,senha=agricultor) ou entre em contato daniel@fundetec.org.br",function(){},"Suporte(Teste alfa)", "Sair");




         navigator.notification.confirm(
             'Abrir link externo? - (usuario=gerenciador,senha=gerenciador) (usuario=entrevistador,senha=entrevistador) (usuario=agricultor,senha=agricultor)', // message
             function(buttonIndex) {
                 if(buttonIndex === 2){
                     navigator.app.loadUrl(window.ipServidor+'/seguranca/recuperarsenha.html', { openExternal:true });
                 }
             },            // callback to invoke with index of button pressed
             'Suporte',           // title
             ['Não', 'Sim']     // buttonLabels
         );





     });

 ///////////FIM PAGINA LOGIN///////////////////



////////////INICIO EVENTOS PAGINA GERENCIADOR//////////////

    //funcao que verifica o box e mostra o qual foi selecionado
    function mostrarSelecionadoGerenciador(selecionado){

         $('#uib_w_154').fadeOut(400, function(evt){
             $(".paineisGerenciador").hide();
             $(selecionado).show();
             $("#uib_w_154").fadeIn(400);

         });
    }

    //funcao de inicio do usuario gerenciador
    function retornaInicioGerenciador(){
        //lista o estoque, funcao no script app.js
        listarEstoqueGerenciador();
        mostrarSelecionadoGerenciador('#uib_w_123');
     }

    /* button  do rodape equipe */
    $(document).on("click", "#uib_w_50", function(evt)
    {
         listarEquipe();
         mostrarSelecionadoGerenciador('#uib_w_361');
         return false;
    });

    /* button  botao do rodape estoque */
    $(document).on("click", "#uib_w_51", function(evt)
    {
         retornaInicioGerenciador();

         return false;
    });


    /* button  do rodate agricultores */
    $(document).on("click", "#uib_w_52", function(evt)
    {

//         mostrarPainelAgricultor();

         listarAgricultoresUnidade('#listaAgricultoresGerenciador');
         mostrarSelecionadoGerenciador('#uib_w_116');
         return false;
    });


     //listar usuarios
function listarEquipe(){

    var Sessao = window.getSessao();
    var envio = {
        metodo: "EQUIPE",
        usuario: Sessao.usuario,
        sessao: Sessao.sessao,
        idunidade: Sessao.unidade_idunidade
    };
    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("usuario/listar", envio, function(dadosRetorno) {
        $('#listaDeMembros').empty();
        if(dadosRetorno.sucesso){

            $.each(dadosRetorno.data, function(i, valor){

                $('#listaDeMembros').append( '<a value="'+valor.idpessoa+'" class="list-group-item widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+valor.nome+'<i class="amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text"> '+valor.sobrenome+'</p><p class="list-group-item-text">Grupo: '+valor.grupo+'</p></a>');

            });

            //retira o painel loading
            window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            $('#listaDeMembros').append('<a class="list-group-item allow-badge widget" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><span class="glyphicon glyphicon-refresh"></span>&nbsp;&nbsp;&nbsp;Atualizar!</h4></a>');
            navigator.notification.alert(dadosRetorno.mensagem, function(){},"Aviso!", "Sair");

        }

    });
}



     /* click em um item na lista de cultivares no estoque da unidade */
    $(document).on("click", "#itensEstoqueGerenciador > a", function(evt)
    {
        mostrarCultivar($(this).attr("value"));
        return false;
    });

     /* click em um item na lista de agricultores pagina gerenciador */
    $(document).on("click", "#listaAgricultoresGerenciador > a", function(evt)
    {

        mostarAgricultor($(this).attr("value"));

        return false;
    });

    /* click em um item na lista da equipe pagina gerenciador */
    $(document).on("click", "#listaDeMembros > a", function(evt)
    {

        var envio = {
        metodo: "GET_MEMBRO",
        idpessoa: $(this).attr("value")
        };

        //chama a requisicao do servidor, o resultado é listado em uma tabela
        requisicao("usuario/buscar", envio, function(dadosRetorno) {
//            $('#listaDeMembros').empty();
            if(dadosRetorno.sucesso){
                //popula a pagina amostragem
                $('#tituloAmostragem').empty().text('Membro da equipe');
                //nome do cultivar na pagina amostragem
                $('#tituloBoxAmostragem').empty().append(dadosRetorno.data.nome+' '+dadosRetorno.data.sobrenome+'<i class="fa fa-user button-icon-right" data-position="top"></i>');


                $("#corpoAmostragem").empty().append('<div class="col single-col" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><div class="tarea widget d-margins" data-uib="media/text" data-ver="0" ><div class="widget-container left-receptacle"></div><div class="widget-container right-receptacle"></div><div class="text-container">          <p  class="backgroundBranco" >Grupo: '+dadosRetorno.data.grupo+'</p><p class="backgroundCinza">Unidade de atuação: '+dadosRetorno.data.nomeunidade+'</p><p  class="backgroundBranco" >CPF: '+dadosRetorno.data.cpf+'</p><p class="backgroundCinza">RG: '+dadosRetorno.data.rg+'</p><p  class="backgroundBranco" >Apelido: '+dadosRetorno.data.apelido+'</p><p class="backgroundCinza">Data nascimento: '+dadosRetorno.data.datanascimento+'</p><p  class="backgroundBranco" >Sexo: '+dadosRetorno.data.sexo+'</p><p class="backgroundCinza">Telefone1: '+dadosRetorno.data.telefone1+'</p><p  class="backgroundBranco" >Telefone2: '+dadosRetorno.data.telefone2+'</p><p class="backgroundCinza">Email: '+dadosRetorno.data.email+'</p><p  class="backgroundBranco" >Estado civíl: '+dadosRetorno.data.estadocivil+'</p><p class="backgroundCinza">Escolaridade: '+dadosRetorno.data.escolaridade+'</p><hr>       </div></div><span class="uib_shim"></span></div></div>');


                //retira o painel loading
                window.spinnerplugin.hide();
                //ativa a pagina
                activate_page("#page_amostragem");

            }else{
                //retira o painel loading
                window.spinnerplugin.hide();
                navigator.notification.alert(dadosRetorno.mensagem, function(){
                    iniciarGerenciador();
                },"Erro!", "Sair");

            }

        });
        return false;
    });


////////////FIM PAGINA GERENCIADOR////////////


//////////// PAGINA ENTREVISTADOR///////////////


    //funcao que verifica o box e mostra o qual foi selecionado
    function mostrarSelecionadoEntrevistador(selecionado){

         $('#uib_w_600').fadeOut(400, function(evt){
             $('.paineisEntrevistador').hide();
             $(selecionado).show();
             $("#uib_w_600").fadeIn(400);
             window.spinnerplugin.hide();
         });
    }

     //funcao de inicio do usuario gerenciador
    function retornaInicioEntrevistador(){
        //lista o estoque, funcao no script app.js
        listarEstoqueEntrevistador();
        mostrarSelecionadoEntrevistador("#uib_w_601");
     }

     /* button  do rodape estoque */
    $(document).on("click", "#uib_w_5", function(evt)
    {
        retornaInicioEntrevistador();
        return false;
    });


    /* button  cadastrar novo agricultor*/
    $(document).on("click", "#uib_w_603", function(evt)
    {

         activate_page("#page_cadastro");
         $('#uib_w_156').hide();
         $('#uib_w_156').fadeIn(400);

         return false;
    });

     /* button  do rodape agricultores */
    $(document).on("click", "#uib_w_6", function(evt)
    {
        listarAgricultoresUnidade("#listaAgricultoresEntrevistador");
        mostrarSelecionadoEntrevistador("#uib_w_602");
        return false;
    });

     /* button  do rodape entrevista */
    $(document).on("click", "#uib_w_7", function(evt)
    {
        listarEntrevista();
        mostrarSelecionadoEntrevistador("#uib_w_606");
         return false;
    });

    /* click em um item na lista de cultivares no estoque da unidade */
    $(document).on("click", "#itensEstoqueEntrevistador > a", function(evt)
    {
        mostrarCultivar($(this).attr("value"));
        return false;
    });

     /* click em um item na lista de agricultores pagina entrevistador */
    $(document).on("click", "#listaAgricultoresEntrevistador > a", function(evt)
    {

        mostarAgricultor($(this).attr("value"));

        return false;
    });

/* icone de backup da propriedade do agricultor */
$(document).on("click", ".backupPropriedade", function(evt)
    {
    var fazenda = $(this);
     navigator.notification.confirm(
            'Deseja realmenta fazer o backup da propriedade '+fazenda.parent().text()+' ?',
            function(buttonIndex) {
                if(buttonIndex === 2){
                    salvarPropriedadeStorage(fazenda);
                    fazenda.removeClass('backupPropriedade');
                }
            },
                'Confirmação',
                ['Não', 'Sim']
            );

 });

 ///////////FUNCAO PARA SALVAR A PROPRIEDADE NO LOCAL STORAGE/////////////
 function salvarPropriedadeStorage(fazenda){

     var Sessao = window.getSessao();
     var envio = {
        metodo: "POR_IDPROPRIEDADE_BACKUP",
        usuario: Sessao.usuario,
        idpropriedade: fazenda.parent().attr('value')
     };


    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("propriedade/backup", envio, function(dadosRetorno) {

        if(dadosRetorno.sucesso){
            //grava a safra no localstorage
            //salva os atributos da propriedade no localstorage


            if(localStorage.getItem("safras")){
                var listaSafras = [];
                listaSafras = JSON.parse(localStorage.getItem("safras"));

                $.each(dadosRetorno.data_safra, function(i, valor){
                    listaSafras.push(valor);
                });
                localStorage.setItem("safras", JSON.stringify(listaSafras));

            }else{
                localStorage.setItem("safras", JSON.stringify(dadosRetorno.data_safra));
            }



            //salva os atributos da propriedade no localstorage
            var listaPropriedades = [];

            if(localStorage.getItem("propriedades")){
                listaPropriedades = JSON.parse(localStorage.getItem("propriedades"));
                listaPropriedades.push(dadosRetorno.data);
                localStorage.setItem("propriedades", JSON.stringify(listaPropriedades));

            }else{
                listaPropriedades.push(dadosRetorno.data);
                localStorage.setItem("propriedades", JSON.stringify(listaPropriedades));
            }

            //remove os atributos que dao suporte ao backup da propriedade
            fazenda.removeClass('fa-cloud-download').addClass('fa-database').removeClass('laranja').addClass('vermelho');
           //retira o painel loading
            window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){},"Aviso!", "Sair");
        }


    });



 }


/* icone de amostragem do agricultor que lista as propriedades */
$(document).on("click", "#MostrarPropriedadesAgricultor", function(evt)
    {
        if($('#propriedadesDoAgricultor').is(':visible')){
            $('#propriedadesDoAgricultor').fadeOut(200);
            $('.panelPropriedades').children("i").removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }else{
            $('.panelPropriedades').children("i").removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            listarPropriedadesParaEntrev($(this).attr("value"));
        }
        return false;

 });
   //FUNCAO QUE LISTA A PROPRIEDADE
function listarPropriedadesParaEntrev(idAgricultor){

    var envio = {
            metodo: "POR_IDPESSOA",
            idpessoa: idAgricultor
        };

    var propriedades = "";
    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("propriedade/listar", envio, function(dadosRetorno) {

        if(dadosRetorno.sucesso){
            $('#propriedadesDoAgricultor').empty();
            //percorre a lista de propriedades e lista em abas
            $.each(dadosRetorno.data, function(i, valor){

                    $('#propriedadesDoAgricultor').append('<p class="backgroundCinza" value="'+valor.idpropriedade+'">'+valor.nomepropriedade+''+ testePropriedadeGravada(valor.status_backup)+'<p style="padding-left:15px;">Bairro/Distrito: '+valor.bairro+'</p><p style="padding-left:15px;">Número/Lote: '+valor.numero+'</p><p style="padding-left:15px;">Complemento/Comunidade: '+valor.complemento+'</p></p><hr>');

            });

            //retira o painel loading
            window.spinnerplugin.hide();

        }else{

            $('#propriedadesDoAgricultor').append('<p>Sem propriedades</p>');
            //retira o painel loading
            window.spinnerplugin.hide();
        }

    });

    $('#propriedadesDoAgricultor').fadeIn(400);

}
//////////////FIM FUNCAO QUE LISTA AS PROPRIEDADES DO AGRICULTOR/////////////

/////////////INICIO FUNCAO QUE VERIFICA SE A PROPRIEDADE ESTA ARMAZENADA//////////////////////
function testePropriedadeGravada(status_backup){

     if(!status_backup){
        return '<i style="padding-right:10px;" class="laranja backupPropriedade fa fa-cloud-download button-icon-right" data-position="top"></i>';
     }else{
        return '<i style="padding-right:10px;" class="verde fa fa-anchor button-icon-right" data-position="top"></i>';
     }
}

//////////////FIM FUNCAO QUE VERIFICA SE A PROPRIEDADE ESTA ARMAZENADA//////////////////////////////


 //////////////INICIO FUNCAO QUE LISTA AS PROPRIEDADES ARMAZENADAS//////////////////////
function listarEntrevista(){
    var listaPropriedade = JSON.parse(localStorage.getItem('propriedades'));

    if(listaPropriedade !== null){
        $("#safrasArmazenadas").empty();

        $.each(listaPropriedade, function(i, valor){
           $("#safrasArmazenadas").append('<a value="'+valor.idpropriedade+'" class="list-group-item allow-badge widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><i class="amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i>'+valor.nomepropriedade+'</h4></a>');
        });
    }

}
 //////////////FIM FUNCAO QUE LISTA AS PROPRIEDADES ARMAZENADAS//////////////////////


/* clicando em um item na lista de propriedades para listar a safra */
$(document).on("click", "#safrasArmazenadas > a ", function(evt)
{
    var idPropriedade = $(this).attr("value");

    var safras = [];
    var safrasPropriedade = [];

    safras = JSON.parse(localStorage.getItem("safras"));
    var item = '';

    $.each(safras, function(i, valor){
       if(valor.idpropriedade == idPropriedade){
           item += '<a value="'+valor.idcultivar+'"class="list-group-item allow-badge widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><i class=" amarelo glyphicon glyphicon-chevron-up button-icon-right" data-position="top"></i>'+valor.nomecultivar+'</h4><div class="atributosSafra text-container" hidden="">          <p  class="backgroundCinza" >Safra: '+valor.safra+'</p><p class="backgroundCinza" >Qtd recebida: '+valor.qtdrecebida+' '+valor.grandeza+'</p><p  class="backgroundCinza" >Data recebimento: '+valor.datareceb+'</p><div class="btn-group uib-bs-flex widget d-margins" data-uib="twitter%20bootstrap/button_group" data-ver="1"><button id="buttonRelatarColheita" class="btn widget btn-xs btn-warning" data-uib="twitter%20bootstrap/button" data-ver="1"><i class="fa fa-cube button-icon-top" data-position="top"></i>Relatar colheita</button><button id="buttonRelatarDestinacao" class="btn widget btn-xs btn-warning" data-uib="twitter%20bootstrap/button" data-ver="1"><i class="fa fa-truck button-icon-top" data-position="top"></i>Relatar destinação</button></div></div></a>';

       }
    });


    //popula a pagina amostragem
    $('#tituloAmostragem').empty().text('Relatar safra');
    //nome do cultivar na pagina amostragem
    $('#tituloBoxAmostragem').empty().append($(this).children('h4').text()+'<i class="fa fa-home button-icon-right" data-position="top"></i>');

    $("#corpoAmostragem").empty().append('<div id="listaSafras" class="list-group widget d-margins" data-uib="twitter%20bootstrap/list_group" data-ver="1">'+item+'</div>');

    //ativa a pagina
    activate_page("#page_amostragem");


    return false;
});


/* clicando em um item na lista de safra */
$(document).on("click", "#listaSafras > a ", function(evt)
{

     var icone = $(this).children('h4').children('i');

    if(icone.hasClass('glyphicon-chevron-up')){
        icone.removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        $(this).children('.atributosSafra').fadeIn(200);
    }else{
        icone.removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        $(this).children('.atributosSafra').fadeOut(200);
    }

    return false;
});

/*botao relatar colheita safra*/
$(document).on("click", "#buttonRelatarColheita", function(evt)
{

     $('#tituloModal').empty().append('<span class="fa fa-cube"></span>&nbsp;Colheita '+$(this).parent().parent().parent().children('h4').text());

     $('#corpoModal').empty().append('<div class="table-thing widget d-margins" data-uib="twitter%20bootstrap/input" data-ver="1"><label class="narrow-control label-top-left" for="">Quantidade:</label><input class="wide-control form-control default input-lg " type="tel"  id=""></div>');

     $('#rodapeModal').empty().append('<button data-dismiss="modal" class="btn btn-warning" type="button" id=""><i class="fa fa-close" data-position="icon only"></i></button><button data-dismiss="modal" class="btn btn-warning" type="button" id=""><i class="fa fa-save" data-position="icon only"></i></button>');

     $(".uib_w_310").modal("toggle");

    return false;
});

 /*botao relatar destinacao safra*/
$(document).on("click", "#buttonRelatarDestinacao", function(evt)
{

    $('#tituloModal').empty().append('<span class="fa fa-truck"></span>&nbsp;Destinação '+$(this).parent().parent().parent().children('h4').text());

    $('#corpoModal').empty().append('<label class="narrow-control label-top-left" for="">Destino:</label><select class="wide-control form-control default input-lg" id=""><option>Consumo</option><option>Replantio</option><option>Venda</option><option>Merenda Escolar</option><option>Doação</option><option>Perda</option></select><div class="table-thing widget d-margins" data-uib="twitter%20bootstrap/input" data-ver="1"><label class="narrow-control label-top-left" for="irg">Quantidade:</label><input class="wide-control form-control default input-lg " type="tel"  id=""></div>');

    $('#rodapeModal').empty().append('<button data-dismiss="modal" class="btn btn-warning" type="button" id=""><i class="fa fa-close" data-position="icon only"></i></button><button data-dismiss="modal" class="btn btn-warning" type="button" id=""><i class="fa fa-save" data-position="icon only"></i></button>');

    $(".uib_w_310").modal("toggle");

    return false;
});


////////////FIM PAGINA ENTREVISTADOR////////////





 //////////////////////INICIO PAGINA AGRICULTORES////////////////////

    //funcao que verifica o box e mostra o qual foi selecionado
    function mostrarSelecionadoAgricultor(selecionado){

         $('#uib_w_149').fadeOut(400, function(evt){
             $(".paineisAgricultor").hide();
             $(selecionado).show();
             $("#uib_w_149").fadeIn(400);
//             window.spinnerplugin.hide();
         });
    }

 /* clicando em um item na lista */
    $(document).on("click", "#cultivaresRecebidos > a ", function(evt)
    {
        mostrarCultivarRecebido($(this).attr("value"));

        return false;
    });

    /* button rodape cultivares recebidos */
    $(document).on("click", "#uib_w_44", function(evt)
    {
        iniciarAgricultor();

         return false;
    });

     /* button rodape socio economico */
    $(document).on("click", "#uib_w_46", function(evt)
    {

       mostrarSelecionadoAgricultor("#uib_w_610");

        return false;
    });

    /* button  rodape safra */
    $(document).on("click", "#uib_w_45", function(evt)
    {

        mostrarSelecionadoAgricultor("#uib_w_110");


         return false;
    });


 /////////////////////FIM PAGINA AGRICULTORES///////////////////////



    }
 document.addEventListener("app.Ready", register_event_handlers, false);
 document.addEventListener("backbutton", onBackKeyDown, false);

})();


