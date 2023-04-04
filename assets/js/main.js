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


const   rows_10             = 10; 
const   rows_9              = 9;
const   rows_7              = 7;
let     rows_nr             = rows_10;

const   release_random      = true;
const   release_ordered     = false;
let     release_numbers     = release_ordered;

const   bombs_0             = "Nessuna";
const   bombs_easy          = "10%";
const   bombs_medium        = "25%";
const   bombs_hard          = "50%";
let     bombs_str           = bombs_0;   
let     bombs_number        = 0;  
const   bomb_fa_icon        = '<i class="fa-solid fa-bomb fa-beat fa-2xl" style="color: #ff0000;"></i>';

let     score               = 0; 
let     cells_total         = 0; 
let     cells_valid         = 0; 
let     cells_clicked       = 0;
let     game_grid_exists    = false;
let     game_on_going       = false;
const   value_available     = true;
let     boolean_array       = []; 
let     play_ground;
// let     mouse_hold_pressed  = false;

function set_row_nr_css()
{
    let css_root = document.querySelector(":root");
    css_root.style.setProperty("--rows", rows_nr);
}

function new_element(what, class_array, value_)
{
    let item = document.createElement(what);
    for (let i = 0; i < class_array.length; i++)
    {
        item.classList.add(class_array[i]);
    }
    item.innerHTML = `<h6 class="d_none">${value_}</h6>`;
    return item;
}

function reset_game()
{
    play_ground.remove();
    hide_menu_bar();
    hide_info_bar();
    game_grid_exists = false;
}

function check_clicked_nr()
{
    if (cells_clicked == cells_valid)
    {
        // Termina partita
        show_message(`Complimenti, hai vinto, totalizzando ${score} punti`);
        game_on_going = false;
        reset_game();
    }
}

function hide_menu_bar()
{
    let menu_bar = document.getElementById("side_menu_bar");
    menu_bar.classList.remove("d_flex","flex_main_center");
    menu_bar.classList.add("d_none");
}

function show_menu_bar()
{
    let menu_bar = document.getElementById("side_menu_bar");
    menu_bar.classList.remove("d_none");
    menu_bar.classList.add("d_flex","flex_main_center");
}

function hide_info_bar()
{
    let info_bar = document.getElementById("side_info_bar");
    info_bar.classList.remove("d_flex","flex_main_center");
    info_bar.classList.add("d_none");
}

function show_info_bar()
{
    let info_bar = document.getElementById("side_info_bar");
    info_bar.classList.remove("d_none");
    info_bar.classList.add("d_flex","flex_main_center");
}

function show_score()
{
    document.getElementById("score_info").innerText = score;
}

function random_int(max)
{
    return Math.floor(Math.random() * max);
}

function create_boolean_array()
{
    boolean_array = [];
    for (let index = 0; index < cells_total; index++)
    {
        boolean_array.push(value_available);
    }
}

function randomize_value(index)
{
    if (release_numbers == release_ordered)
    {
        return index;
    }
    else
    {
        let random_value = 0;
        let bool_value = !value_available;
        while (bool_value == !value_available)
        {
            random_value = random_int(cells_total) + 1;
            bool_value = boolean_array[random_value];
        }
        boolean_array[random_value] = !value_available;
        return random_value;
    }
}

function load_bombs()
{
    let counter = 0;
    let random_position = 0;
    let cells_array = play_ground.querySelectorAll(".cell");
    let random_item;
    do
    {
         counter++;
         do
         {
             random_position = random_int(cells_total);
             random_item = cells_array[random_position];
             console.log(cells_array[random_position]);
         }
         while (random_item.classList.contains("with_bomb"));
         random_item.classList.add("with_bomb");
         random_item.innerHTML = `<h6 class="d_none">${bomb_fa_icon}</h6>`;
    }
    while (counter < bombs_number);
}

function create_game_grid()
{
    score = 0;
    cells_clicked = 0;
    cells_total = Math.pow(rows_nr, 2);
    if (release_numbers == release_random)
    {
        create_boolean_array();
    }
    switch (document.getElementById("random_number_select").value)
    {
        case "random_nr_no":
            release_numbers = release_ordered;
            break;
        case "random_nr_yes":
            release_numbers = release_random;
            break;
    }
    switch (document.getElementById("bombs_number_select").value)
    {
        case "no_bombs":
            bombs_str = bombs_0;
            bombs_number = 0;
            break;
        case "bombs_10":
            bombs_str = bombs_easy;
            bombs_number = Math.floor(cells_total * 0.1);
            break;
        case "bombs_25":
            bombs_str = bombs_medium;
            bombs_number = Math.floor(cells_total * 0.25);
            break;
        case "bombs_50":
            bombs_str = bombs_hard;
            bombs_number = Math.floor(cells_total * 0.5);
            break;
    }
    cells_valid = cells_total - bombs_number;
    game_grid_exists = true;
    game_on_going = true;
    play_ground = document.createElement("div");
    play_ground.setAttribute("id", "game_grid");
    play_ground.classList.add("d_flex", "flex_wrap", "flex_main_btw");
    show_menu_bar();
    show_info_bar();
    show_score();
    for (let i = 1; i <= cells_total; i++)
    {
        let free_value = randomize_value(i);
        let element = new_element("div", ["cell", "d_flex", "flex_center"], free_value);
        element.addEventListener("click", function()
        {
            if (!this.classList.contains("clicked_cell"))
            {
                this.classList.add("clicked_cell");
                score++;
                show_score();
                cells_clicked++;
                check_clicked_nr();
            }
        });
        play_ground.append(element);
    }
    if (bombs_number != 0) 
    {
        load_bombs();
    }
    document.querySelector("#main_core").append(play_ground);
}

msg_btn.addEventListener("click", function()
{    
    let msg_box = document.getElementById("message_box");
    msg_box.classList.remove("d_flex", "flex_column", "flex_cross_center");
    msg_box.classList.add("d_none");
    let page_overlay = document.getElementById("overlay");
    page_overlay.classList.toggle("d_none");
});

function show_message(message)
{
    let page_overlay = document.getElementById("overlay");
    page_overlay.classList.toggle("d_none");
    let msg_box = document.getElementById("message_box");
    msg_box.classList.remove("d_none");
    msg_box.classList.add("d_flex", "flex_column", "flex_cross_center");
    msg_box.firstElementChild.innerHTML = `<h2>${message}</h2>`;
}

function go_to_game()
{
    if (!game_grid_exists)
    {
        // Significa che la griglia non c'e' e che non si sta giocando, quindi si puo' iniziare
        switch (document.getElementById("rows_number_select").value)
        {
            case "r_10":
                rows_nr = rows_10;
                break;
            case "r_9":
                rows_nr = rows_9;
                break;
            case "r_7":
                rows_nr = rows_7;
                break;
        }
        show_message(`Ok, puoi iniziare una nuova partita con ${rows_nr} righe e ${rows_nr} colonne`);
        set_row_nr_css();
        create_game_grid();
    }
    else 
        if (!game_on_going)
        {
            show_message("Ok, ricominciamo");
            reset_game();
            go_to_game();
        }
        else
        {
            show_message("La partita è ancora in corso. <br> Premi sull'icona (Stop) per terminarla.");
            // Significa che e' in corso un gioco e che non e' ancora terminato
        }
}

help_btn.addEventListener("mousedown",function()
{
    if (game_grid_exists)
    {
        let cell_content = document.querySelectorAll("#game_grid h6");
        mouse_hold_pressed = true;
        for (let i = 0; i < cells_total; i++)
        {
            cell_content[i].classList.remove("d_none");
        }
    }
});

// Ricordarsi di sistemare la questione del mouse drag

help_btn.addEventListener("mouseup",function()
{
    if (game_grid_exists)
    {
        let cell_content = document.querySelectorAll("#game_grid h6");
        mouse_hold_pressed = false;
        for (let i = 0; i < cells_total; i++)
        {
            cell_content[i].classList.add("d_none");
        }
    }
});


