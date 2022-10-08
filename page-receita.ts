let chave = localStorage.getItem("chavePrimaria") as string;
let receitaEscolhida: RECEITA[];

async function fetchList2() {
    try {
        const listaFetch = await (await fetch("https://receitas-server.vercel.app/api").then()).json();
        let aux: RECEITA[] = listaFetch;
        receitaEscolhida = aux.filter((item)=>{
            return item.Name.toUpperCase().includes(chave.toUpperCase());
        });
        console.log(receitaEscolhida);
        gerarIngreMet(receitaEscolhida[0] as RECEITA);
        eventList();

        (titleValue as HTMLTitleElement).innerHTML = receitaEscolhida[0].Name;
        (nomeDaReceita as HTMLHeadingElement).innerHTML += receitaEscolhida[0].Name;
        (nomeDoAutor as HTMLHeadingElement).innerHTML += receitaEscolhida[0].Author;
        (descricaoReceita as HTMLHeadingElement).innerHTML += receitaEscolhida[0].Description;
        (divImg as HTMLDivElement).innerHTML = `<img  src="${receitaEscolhida[0].urlImage}">`;
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