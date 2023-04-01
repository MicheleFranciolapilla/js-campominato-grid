// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
// Consigli del giorno:  :party_wizard:
// Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.

// COSTANTI E VARIABILI GLOBALI


const   rows_easy       = 10; 
const   rows_medium     = 9;
const   rows_hard       = 7;
let     rows_nr         = rows_easy;
let     cells           = 0; 
let     bombs_nr        = 0;
let     random_cells    = false;
let     play_ground;

function new_element(what, class_array, value_)
{
    let item = document.createElement(what);
    for (let i = 0; i < class_array.length; i++)
    {
        item.classList.add(class_array[i]);
    }
    item.innerText = value_;
    console.log(item);
    return item;
}

function create_game_grid()
{
    cells = Math.pow(rows_nr, 2);
    play_ground = document.createElement("div");
    play_ground.setAttribute("id", "game_grid");
    play_ground.classList.add("d_flex", "flex_wrap", "flex_main_btw");
    for (let i = 1; i <= cells; i++)
    {
        let element = new_element("div", ["cell", "d_flex", "flex_center"], i);
        play_ground.append(element);
    }
    document.querySelector("main").append(play_ground);
    console.log(cells);
    console.log(play_ground);
    console.log(document.querySelector("main"));
}

create_game_grid();