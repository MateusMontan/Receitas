let idReceita = localStorage.getItem("idReceita") as string;
let id = parseInt(idReceita);
let receitaEscolhida: RECEITA

async function fetchList2() {
    try {
        const listaFetch = await (await fetch("https://receitas-server.vercel.app/api").then()).json();
        let aux: RECEITA[] = listaFetch;
        receitaEscolhida = aux[id];
        console.log(receitaEscolhida);
        gerarIngreMet(receitaEscolhida as RECEITA);
        eventList();

        (titleValue as HTMLTitleElement).innerHTML = receitaEscolhida.Name;
        (nomeDaReceita as HTMLHeadingElement).innerHTML += receitaEscolhida.Name;
        (nomeDoAutor as HTMLHeadingElement).innerHTML += receitaEscolhida.Author;
        (descricaoReceita as HTMLHeadingElement).innerHTML += receitaEscolhida.Description;
        (divImg as HTMLDivElement).innerHTML = `<img  src="${receitaEscolhida.urlImage}">`;
    } catch {

    }
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



function gerarIngreMet(receitaEscolhida: RECEITA) {
    (ingredientesLista as HTMLUListElement).innerHTML = "";
    receitaEscolhida.Ingredients.forEach((vle) => {
        (ingredientesLista as HTMLUListElement).innerHTML +=
            "<li>" + vle + "</li>";
    });
    receitaEscolhida.Method.forEach((vle) => {
        (metodoLista as HTMLUListElement).innerHTML +=
            "<li>" + vle + "</li>";
    })
}

function eventList() {
    (returnPage as HTMLButtonElement).addEventListener("click", function () {
        window.location.assign("index.html");
    })
}