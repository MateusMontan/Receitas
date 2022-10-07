
type RECEITA = {
    Name: string;
    url: string;
    Description: string;
    Author: string;
    Ingredients: string[];
    Method: string[];
    urlImage: string;
}

let listaCompleta: RECEITA[] = [];

const divROOT = document.querySelector("#root");
const divBUTTON = document.querySelector("#div-pages");
const nameTxt = document.querySelector('#nameTXT');
const ingredientsTXT = document.querySelector('#ingredientTXT');


let listBTN: HTMLButtonElement[] = [];
let listItem: HTMLButtonElement[] = [];

(divROOT as HTMLDivElement).innerHTML = "";


let PAGINA = 1;
let ITEMS_POR_PAGE = 75;

let strName = "";
let strIngrediente = "";


const url = "https://receitas-server.vercel.app/api";

fetchList();
render();

async function fetchList() {
    try {
        const listaFetch: RECEITA[] = await (await fetch(url).then()).json();

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
            
            listaCompleta = listaCompleta.filter((item)=>{

                let ingredientsSplit = (ingredientsTXT as HTMLInputElement).value.split(",");
                let cont = 0;
                
                for(let i=0; i < ingredientsSplit.length; i++){
                    for(let j=0; j<item.Ingredients.length;j++){
                        if(item.Ingredients[j].toUpperCase().includes(ingredientsSplit[i].toUpperCase())){
                            cont += 1;
                            break;
                        }
                    }
                }
                if(cont == ingredientsSplit.length){
                    return item;
                }
            })

        }

        render();
        mandarItem()
    } catch {
    }
}

function render() {
    //Gerar os cards das receitas
    if (listaCompleta.length > 0) {
        renderReceita();
    } else {
        (divROOT as HTMLDivElement).innerHTML = "";
    }
    //Gerar os botões apenas se a quantidade de receitas forem maior que 50.
    if (listaCompleta.length > ITEMS_POR_PAGE) {
        gerarBtns();
    } else {
        (divBUTTON as HTMLDivElement).innerHTML = "";
    }
    eventTxt();

}

function renderReceita() {
    (divROOT as HTMLDivElement).innerHTML = "";
    for (let i = (PAGINA * ITEMS_POR_PAGE) - ITEMS_POR_PAGE; i < (ITEMS_POR_PAGE * (PAGINA)); i++) {
        if (i == listaCompleta.length) {
            break;
        }
        (divROOT as HTMLDivElement).innerHTML += `
                    <button id="item${i}" class="noneBtn" value="${i}"><div  class="item" >
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

        listItem[i] = document.querySelector("#item" + i) as HTMLButtonElement;

    }
    gerarBTNDiv();

}

function gerarBTNDiv() {



    for (let i = (PAGINA * ITEMS_POR_PAGE) - ITEMS_POR_PAGE; i < (ITEMS_POR_PAGE * (PAGINA)); i++) {
        if (i == listaCompleta.length) {
            break;
        }


        try {
            (listItem[i] as HTMLButtonElement).addEventListener("click", function () {
                localStorage.setItem("idReceita", this.value);
                window.location.assign("page-receita.html");
            });

        } catch {
        }

    }
}
function gerarBtns() {
    (divBUTTON as HTMLDivElement).innerHTML = "";
    for (let i = 0; i < (listaCompleta.length / ITEMS_POR_PAGE); i++) {


        if (divBUTTON) {
            if ((PAGINA - 1) == i) {

                (divBUTTON as HTMLDivElement).innerHTML += `<button style="background-color: gray" id="btn${i}" value="${i}">${i + 1}</button>`;
            } else {

                (divBUTTON as HTMLDivElement).innerHTML += `<button  id="btn${i}" value="${i}">${i + 1}</button>`;
            }
        }

    }
    for (let i = 0; i < (listaCompleta.length / ITEMS_POR_PAGE); i++) {

        listBTN[i] = (document.querySelector("#btn" + i) as HTMLButtonElement);
    }

    eventBtnList();
}

function eventBtnList() {

    for (let i = 0; i < listBTN.length; i++) {

        (listBTN[i] as HTMLButtonElement).addEventListener("click", function () {
            PAGINA = parseInt(this.value) + 1;
            render();
            scroll(0, 0);
        })
    }
}

function eventTxt() {
    (nameTxt as HTMLTextAreaElement).addEventListener("change", function () {

        strName = this.value;
        fetchList();
    });
    (ingredientsTXT as HTMLTextAreaElement).addEventListener("change", function () {

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


