"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let idReceita = localStorage.getItem("idReceita");
let id = parseInt(idReceita);
let receitaEscolhida;
function fetchList2() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listaFetch = yield (yield fetch("https://receitas-server.vercel.app/api").then()).json();
            let aux = listaFetch;
            receitaEscolhida = aux[id];
            console.log(receitaEscolhida);
            gerarIngreMet(receitaEscolhida);
            eventList();
            titleValue.innerHTML = receitaEscolhida.Name;
            nomeDaReceita.innerHTML += receitaEscolhida.Name;
            nomeDoAutor.innerHTML += receitaEscolhida.Author;
            descricaoReceita.innerHTML += receitaEscolhida.Description;
            divImg.innerHTML = `<img  src="${receitaEscolhida.urlImage}">`;
        }
        catch (_a) {
        }
    });
}
fetchList2();
const nomeDaReceita = document.querySelector("#nomeDaReceita");
const nomeDoAutor = document.querySelector("#nomeDoAutor");
const descricaoReceita = document.querySelector("#descricaoReceita");
const divImg = document.querySelector("#gerarImage");
const ingredientesLista = document.querySelector('#ingredientesList');
const metodoLista = document.querySelector('#metodosList');
const returnPage = document.querySelector('#returnPage');
const titleValue = document.querySelector('#titleName');
function gerarIngreMet(receitaEscolhida) {
    ingredientesLista.innerHTML = "";
    receitaEscolhida.Ingredients.forEach((vle) => {
        ingredientesLista.innerHTML +=
            "<li>" + vle + "</li>";
    });
    receitaEscolhida.Method.forEach((vle) => {
        metodoLista.innerHTML +=
            "<li>" + vle + "</li>";
    });
}
function eventList() {
    returnPage.addEventListener("click", function () {
        window.location.assign("index.html");
    });
}
