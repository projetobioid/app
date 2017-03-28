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


function getSessao(){
    var logSessao = JSON.parse(localStorage.getItem("logSessao"));
    return logSessao;
}

function updateSessao(novaSessao){
    var logSessao = JSON.parse(localStorage.getItem("logSessao"));
    logSessao.sessao = novaSessao;
    localStorage.setItem("logSessao", JSON.stringify(logSessao));
}

//limpa a memoria do app e redireciona para tela de login
function clearGoMainPage(){
    window.activate_page("#mainpage");
    sessionStorage.clear();
    localStorage.clear();
}


