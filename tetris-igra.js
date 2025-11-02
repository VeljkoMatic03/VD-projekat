let rezultati = [];

$(document).ready(function() {

    //matrix of individual fields representing playing grid
    let polja = document.querySelectorAll("#polje tr td");

    //matrix of individual fields representing incoming shape
    let nextPolja = document.querySelectorAll(".next tr td");

    let zadnjiRes = [
        {
            ime: "-",
            rezultat: 0
        }
    ]

    for(let i = 0; i < polja.length; i++) polja[i].classList.add("empty");

    //event triggered by keyboard, specifically arrow buttons
    document.onkeydown = function (event) {
        let dugme = event.key;
        if(dugme == "ArrowLeft" && active) levo();
        if(dugme == "ArrowRight" && active) desno();
        if(dugme == "ArrowUp" && active) rotiraj();
        if(dugme == "ArrowDown" && active) {
            let res = dole();
            score += 1 * (res + 1);
            proveriNivo();
            document.getElementById("score").innerHTML = score;
        }
    }

    //in case somebody uses buttons on webpage
    document.getElementById("rot").onclick = rotiraj;
    document.getElementById("levo").onclick = levo;
    document.getElementById("desno").onclick = desno;
    document.getElementById("dole").onclick = function() {
        let res = dole();
            score += 1 * (res + 1);
            proveriNivo();
            document.getElementById("score").innerHTML = score;
    };

    let active = true;

    let nivo = 1;
    let stariNivo = 1;

    let score = 0;

    let boje = [];

    let pPolje = 5;
    let sirina = 10;
    let rotacija = 0;

    //representation of each type of shape

    let Ifigura = [
        [0, 0 + sirina, 0 + 2*sirina, 0 + 3*sirina],
        [-1, 0, 1, 2]
    ];

    let Lfigura = [
        [0, sirina, sirina * 2, sirina * 2 + 1],
        [sirina - 1, -1, 0, 1],
        [-1, 0, sirina, sirina * 2],
        [sirina-1, sirina, sirina + 1, 1]
    ]

    let Jfigura = [
        [sirina * 2 - 1, 0, sirina, sirina * 2],
        [sirina - 1, -1,  sirina, sirina + 1],
        [sirina * 2, sirina, 0, 1],
        [sirina - 1, sirina, sirina + 1, 2*sirina + 1]
    ]

    let Sfigura = [
        [sirina - 1, sirina, 0, 1],
        [0, sirina, sirina + 1, 2 * sirina + 1]
    ]

    let Zfigura = [
        [-1, 0, sirina, sirina + 1],
        [2*sirina - 1, sirina - 1, sirina, 0]
    ]

    let Tfigura = [
        [-1, 0, sirina, 1],
        [sirina - 1, 0, sirina, sirina * 2],
        [sirina - 1, sirina, 0, sirina + 1],
        [0, sirina, sirina * 2, sirina + 1]
    ]

    let Ofigura = [
        [0, sirina, 1, sirina + 1]
    ]

    function initialize() {
        nivo = parseInt(localStorage.getItem("nivo"));
        stariNivo = nivo;
        boje = JSON.parse(localStorage.getItem("boje"));
        console.log(boje);
    }

    initialize();

    let figure = [];
    //grouping shapes that user selected
    for(let i = 0; i < boje.length; i++){
        if(boje[i] == "Ifigura") figure.push(Ifigura);
        if(boje[i] == "Lfigura") figure.push(Lfigura);
        if(boje[i] == "Jfigura") figure.push(Jfigura);
        if(boje[i] == "Sfigura") figure.push(Sfigura);
        if(boje[i] == "Zfigura") figure.push(Zfigura);
        if(boje[i] == "Tfigura") figure.push(Tfigura);
        if(boje[i] == "Ofigura") figure.push(Ofigura);
    }

    let random = 0;
    let nextRandom = parseInt(Math.floor(Math.random() * figure.length));

    //function for generating a shape
    function genFiguru() {
        document.getElementById("nivo").innerHTML = nivo;
        pPolje = 3 + Math.floor(Math.random() * 4);
        rotacija = 0;
        random = nextRandom;
        nextRandom = parseInt(Math.floor(Math.random() * figure.length));
        prikaziNextRandom();
        for(let i = 0; i < 4; i++){
            let indeks = figure[random][rotacija][i] + pPolje;
            if(polja[indeks].classList.contains("taken")){
                //izbaci game over jer ne moze da se generise figura;
                clearInterval(pocetak);
                active = false;
                finish();
                return;
            }
        }
        crtaj();
    }

    //draw a shape
    function crtaj () {
        for(let i = 0; i < 4; i++){            
            let indeks = figure[random][rotacija][i] + pPolje;
            if(indeks < 0 || indeks >= 200) return -1;
        }
        for(let i = 0; i < 4; i++){            
            let indeks = figure[random][rotacija][i] + pPolje;
            polja[indeks].classList.remove("empty");
            polja[indeks].classList.add(boje[random], "taken");
        }
        return 0;
    }

    //removing a shape from the grid
    function brisi () {
        for(let i = 0; i < 4; i++){            
            let indeks = figure[random][rotacija][i] + pPolje;
            polja[indeks].classList.remove(boje[random], "taken");
            polja[indeks].classList.add("empty");
        }
    }

    //moving a shape to the left
    function levo () {
        let arr = []
        for(let i = 0; i < 4; i++){
            let indeks = figure[random][rotacija][i] + pPolje;
            arr.push(indeks);
        }
        for(let i = 0; i < 4; i++){            
            if(arr[i] % 10 == 0) return;
            if(polja[arr[i] - 1].classList.contains("taken") && !arr.includes(arr[i] - 1)) return;
        }
        for(let i = 0; i < 4; i++){            
            let indeks = figure[random][rotacija][i] + pPolje;
            polja[indeks - 1].classList.add(boje[random], "taken");
            polja[indeks - 1].classList.remove("empty");
            polja[indeks].classList.remove(boje[random], "taken");
            polja[indeks].classList.add("empty");
        }
        pPolje--;
        //provera da l je doslo do kraja
        provera();
    }

    //moving a shape to the right
    function desno () {
        let arr = []
        for(let i = 0; i < 4; i++){
            let indeks = figure[random][rotacija][i] + pPolje;
            arr.push(indeks);
        }
        for(let i = 0; i < 4; i++){            
            if(arr[i] % 10 == 9) return;
            if(polja[arr[i] + 1].classList.contains("taken") && !arr.includes(arr[i] + 1)) return;
        }
        for(let i = 3; i >= 0; i--){            
            let indeks = figure[random][rotacija][i] + pPolje;
            polja[indeks + 1].classList.add(boje[random], "taken");
            polja[indeks + 1].classList.remove("empty");
            polja[indeks].classList.remove(boje[random], "taken");
            polja[indeks].classList.add("empty");
        }
        pPolje++;
        //provera da l je doslo do kraja
        provera();
    }

    //rotating a shape clockwise
    function rotiraj () {
        let levaIvica = false, desnaIvica = false;
        let arr = [];
        for(let i = 0; i < 4; i++){
            let indeks = figure[random][rotacija][i] + pPolje;
            arr.push(indeks);
        }
        for(let i = 0; i < 4; i++){
            let indeks = figure[random][rotacija][i] + pPolje;
            if(indeks % 10 == 0 || (polja[indeks - 1].classList.contains("taken") && !arr.includes(indeks - 1))){
                levaIvica = true;
                break;
            }
            if(indeks % 10 == 9 || (indeks % 10 < 9 && polja[indeks+1].classList.contains("taken") && !arr.includes(indeks + 1))) {
                desnaIvica = true;
                break;
            }
            if((indeks % 10 == 8 && random == 0) || (indeks % 10 < 8 && random == 0 && polja[indeks + 2].classList.contains("taken")
                                                        && !arr.includes(indeks + 2))){
                desnaIvica = true;
                break;
            }
        }
        //in case a shape is next to the left border
        //and cant rotate lest it goes out of bounds
        if(levaIvica == true){
            if(boje[random] == "Sfigura" && rotacija == 1) return;
            if(boje[random] == "Ifigura" && rotacija == 0) return;
            if(boje[random] == "Lfigura" && rotacija == 0) return;
            if(boje[random] == "Jfigura" && rotacija == 2) return;
            if(boje[random] == "Tfigura" && rotacija == 3) return;
        }
        //same as previous, just for the right border
        if(desnaIvica == true){
            if(boje[random] == "Ifigura" && rotacija == 0) return;
            if(boje[random] == "Lfigura" && rotacija == 2) return;
            if(boje[random] == "Jfigura" && rotacija == 0) return;
            if(boje[random] == "Zfigura" && rotacija == 1) return;
            if(boje[random] == "Tfigura" && rotacija == 1) return;
        }
        let x = figure[random].length;
        brisi();
        let stara = rotacija;
        rotacija = (rotacija + 1) % x;
        let res = crtaj();
        
    }

    //going one row closer to the bottom
    function dole () {
        let res = provera();
        if(res == -1) return -1;
        brisi();
        pPolje += sirina;
        crtaj();
        return 0;
    }

    //function for validation of our grid
    function provera () {
        //proveriScore();
        let arr = []
        for(let i = 0; i < 4; i++){
            let indeks = figure[random][rotacija][i] + pPolje;
            arr.push(indeks);
        }
        for(let i = 0; i < 4; i++){
            if(Math.floor(arr[i] / 10) == 19){
                proveriScore();
                genFiguru();
                return -1;
            }
            if(polja[arr[i] + sirina].classList.contains("taken") && !arr.includes(arr[i] + sirina)){
                proveriScore();
                genFiguru();
                return -1;
            }
        }
        return 0;
    }

    //function for updating our score
    function proveriScore () {
        //let stari = score;
        let novi = 0;
        for(let i = 19; i > 0; ){
            let flag = true;
            for(let j = 0; j < 10; j++){
                if(!polja[i * 10 + j].classList.contains("taken")) {
                    flag = false;
                    break;
                }
            }
            if(flag == true){
                for(let j = i; j > 0; j--){
                    for(let x  = 0; x < 10; x++){
                        polja[j * 10 + x].removeAttribute("class");
                        let lista = polja[(j-1) * 10 + x].classList;
                        lista.forEach(e => {polja[j * 10 + x].classList.add(e);})
                    }
                }
                novi = novi == 0 ? 100 : novi * 2;

            }
            else i--;
        }
        score += novi;
        document.getElementById("score").innerHTML = score;
        if(score > stariNivo * 1000){
            console.log("DA");
            nivo += 1;
            stariNivo += 1;
            clearInterval(pocetak);
            if(nivo == 2) pocetak = setInterval(dole, 2000);
            else if(nivo == 3) pocetak = setInterval(dole, 1500);
            else pocetak = setInterval(dole, 1000 / (nivo - 3));
        }
    }
    
    //function for updating our level of difficulty
    function proveriNivo() {
        if(score > stariNivo * 1000){
            console.log("DA");
            nivo += 1;
            stariNivo += 1;
            clearInterval(pocetak);
            if(nivo == 2) pocetak = setInterval(dole, 2000);
            else if(nivo == 3) pocetak = setInterval(dole, 1500);
            else pocetak = setInterval(dole, 1000 / (nivo - 3));
        }
    }

    //simple game over function
    function finish () {
        alert("Game Over!");
        let imeK;
        imeK = prompt("Unesite vase ime: ");
        let newRes = [
            {
                ime: imeK,
                rezultat: score
            }
        ]
        zadnjiRes = newRes;
        localStorage.setItem("zadnji", JSON.stringify(zadnjiRes));
        window.location.replace("tetris-rezultati.html");
    }

    //drawing next-to-be shape in its place, next shape grid
    function prikaziNextRandom () {
        for(let i = 0; i < 16; i++){
            nextPolja[i].classList.remove(boje[random]);
        }
        if(boje[nextRandom] == "Ifigura"){
            for(let i = 1; i < 16; i += 4){
                nextPolja[i].classList.add("Ifigura");
            }
        }
        else if(boje[nextRandom] == "Lfigura"){
            for(let i = 1; i < 12; i += 4) nextPolja[i].classList.add("Lfigura");
            nextPolja[10].classList.add("Lfigura");
        }
        else if(boje[nextRandom] == "Jfigura"){
            for(let i = 2; i < 12; i += 4) nextPolja[i].classList.add("Jfigura");
            nextPolja[9].classList.add("Jfigura");
        }
        else if(boje[nextRandom] == "Sfigura"){
            nextPolja[5].classList.add("Sfigura");
            nextPolja[6].classList.add("Sfigura");
            nextPolja[8].classList.add("Sfigura");
            nextPolja[9].classList.add("Sfigura");
        }
        else if(boje[nextRandom] == "Zfigura"){
            nextPolja[5].classList.add("Zfigura");
            nextPolja[6].classList.add("Zfigura");
            nextPolja[10].classList.add("Zfigura");
            nextPolja[11].classList.add("Zfigura");
        }
        else if(boje[nextRandom] == "Tfigura"){
            nextPolja[5].classList.add("Tfigura");
            nextPolja[6].classList.add("Tfigura");
            nextPolja[4].classList.add("Tfigura");
            nextPolja[9].classList.add("Tfigura");
        }
        else if(boje[nextRandom] == "Ofigura"){
            nextPolja[5].classList.add("Ofigura");
            nextPolja[6].classList.add("Ofigura");
            nextPolja[10].classList.add("Ofigura");
            nextPolja[9].classList.add("Ofigura");
        }
    }

    genFiguru();
    let pocetak = setInterval(dole, 2500/nivo);
    
})