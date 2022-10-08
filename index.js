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
let listaCompleta = [];
const divROOT = document.querySelector("#root");
const divBUTTON = document.querySelector("#div-pages");
const nameTxt = document.querySelector('#nameTXT');
const ingredientsTXT = document.querySelector('#ingredientTXT');
let listBTN = [];
let listItem = [];
divROOT.innerHTML = "";
let PAGINA = 1;
let ITEMS_POR_PAGE = 75;
let strName = "";
let strIngrediente = "";
const url = "https://receitas-server.vercel.app/api";
fetchList();
render();
function fetchList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listaFetch = yield (yield fetch(url).then()).json();
            listaCompleta = [];
            listaFetch.forEach((item) => {
                listaCompleta.push(item);
            });
            if (strName.length > 0) {
                listaCompleta = listaCompleta.filter((item) => {
                    return item.Name.toUpperCase().includes(strName.toUpperCase());
                });
            }
            if (strIngrediente.length > 0) {
                listaCompleta = listaCompleta.filter((item) => {
                    let ingredientsSplit = ingredientsTXT.value.split(",");
                    let cont = 0;
                    console.log(ingredientsSplit.length);
                    for (let i = 0; i < ingredientsSplit.length; i++) {
                        for (let j = 0; j < item.Ingredients.length; j++) {
                            if (item.Ingredients[j].toUpperCase().includes(ingredientsSplit[i].toUpperCase())) {
                                cont += 1;
                                console.log(cont);
                                break;
                            }
                        }
                    }
                    if (cont == ingredientsSplit.length) {
                        return item;
                    }
                });
            }
            render();
            mandarItem();
        }
        catch (_a) {
        }
    });
}
function render() {
    //Gerar os cards das receitas
    if (listaCompleta.length > 0) {
        renderReceita();
    }
    else {
        divROOT.innerHTML = "";
    }
    //Gerar os botões apenas se a quantidade de receitas forem maior que 50.
    if (listaCompleta.length > ITEMS_POR_PAGE) {
        gerarBtns();
    }
    else {
        divBUTTON.innerHTML = "";
    }
    eventTxt();
}
function renderReceita() {
    divROOT.innerHTML = "";
    for (let i = (PAGINA * ITEMS_POR_PAGE) - ITEMS_POR_PAGE; i < (ITEMS_POR_PAGE * (PAGINA)); i++) {
        if (i == listaCompleta.length) {
            break;
        }
        divROOT.innerHTML += `
                    <button id="item${i}" class="noneBtn" value="${listaCompleta[i].Name}"><div  class="item" >
                        <div class="div-img" style="background-image: url(${listaCompleta[i].urlImage}); background-size: 280px 180px;">
                            <div class="div-info style="filter: blur(8px);"">
                                <h1> ${listaCompleta[i].Name} </h1>
                                <p style="height: ">${listaCompleta[i].Description}</p>
                            </div>
                        </div>
                    </div></button>`;
    }
    listItem = [];
    for (let i = (PAGINA * ITEMS_POR_PAGE) - ITEMS_POR_PAGE; i < (ITEMS_POR_PAGE * (PAGINA)); i++) {
        if (i == listaCompleta.length) {
            break;
        }
        listItem[i] = document.querySelector("#item" + i);
    }
    gerarBTNDiv();
}
function gerarBTNDiv() {
    for (let i = (PAGINA * ITEMS_POR_PAGE) - ITEMS_POR_PAGE; i < (ITEMS_POR_PAGE * (PAGINA)); i++) {
        if (i == listaCompleta.length) {
            break;
        }
        try {
            listItem[i].addEventListener("click", function () {
                localStorage.setItem("chavePrimaria", this.value);
                window.location.assign("page-receita.html");
            });
        }
        catch (_a) {
        }
    }
}
function gerarBtns() {
    divBUTTON.innerHTML = "";
    for (let i = 0; i < (listaCompleta.length / ITEMS_POR_PAGE); i++) {
        if (divBUTTON) {
            if ((PAGINA - 1) == i) {
                divBUTTON.innerHTML += `<button style="background-color: gray" id="btn${i}" value="${i}">${i + 1}</button>`;
            }
            else {
                divBUTTON.innerHTML += `<button  id="btn${i}" value="${i}">${i + 1}</button>`;
            }
        }
    }
    for (let i = 0; i < (listaCompleta.length / ITEMS_POR_PAGE); i++) {
        listBTN[i] = document.querySelector("#btn" + i);
    }
    eventBtnList();
}
function eventBtnList() {
    for (let i = 0; i < listBTN.length; i++) {
        listBTN[i].addEventListener("click", function () {
            PAGINA = parseInt(this.value) + 1;
            render();
            scroll(0, 0);
        });
    }
}
function eventTxt() {
    nameTxt.addEventListener("change", function () {
        strName = this.value;
        fetchList();
    });
    ingredientsTXT.addEventListener("change", function () {
        strIngrediente = this.value;
        fetchList();
    });
}
function mandarItem() {
    let nameReceita = listaCompleta[0].Name;
    let authorReceita = listaCompleta[0].Author;
    let descriptionReceita = listaCompleta[0].Description;
    let urlReceita = listaCompleta[0].urlImage;
    localStorage.setItem("nameReceita", nameReceita);
    localStorage.setItem("authorReceita", authorReceita);
    localStorage.setItem("descriptionReceita", descriptionReceita);
    localStorage.setItem("urlReceita", urlReceita);
}
