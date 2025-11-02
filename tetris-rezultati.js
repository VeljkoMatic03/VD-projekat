

$(document).ready(function() {

    let data = [
        {
            ime: "-",
            rezultat: 0
        },
        {
            ime: "-",
            rezultat: 0
        },
        {
            ime: "-",
            rezultat: 0
        },
        {
            ime: "-",
            rezultat: 0
        },
        {
            ime: "-",
            rezultat: 0
        }
    ]

    let velika = document.querySelectorAll("#rezultati tr td");
    let mala = document.querySelectorAll("#poslednji tr td");

    inicijalizuj();
    
    //this simple game uses local storage for saving previous high scores
    function inicijalizuj() {
        let res = localStorage.getItem("top5");
        let zadnji = localStorage.getItem("zadnji");

        if(zadnji == null) {
            zadnji = [
                {
                    ime: "-",
                    rezultat: 0
                }
            ]
        }
        else{
            zadnji = JSON.parse(zadnji);
        }

        if(res != null){
            data = JSON.parse(res);
            //alert(JSON.stringify(data));
            if(zadnji != null){
                data.push(zadnji[0]);
                for(let i = 0; i < 5; i++){
                    for(let j = i + 1; j < 6; j++){
                        if(data[i].rezultat < data[j].rezultat){
                            let x = data[i];
                            data[i] = data[j];
                            data[j] = x;
                        }
                    }
                }
                data.pop();
            }
            localStorage.setItem("top5", JSON.stringify(data));
        }
        else{
            data[0] = zadnji[0];
            localStorage.setItem("top5", JSON.stringify(data));
        }

        mala[0].innerHTML = zadnji[0].ime;
        mala[1].innerHTML = zadnji[0].rezultat;

        for(let i = 0; i < 5; i++){
            velika[2*i].innerHTML = data[i].ime;
            velika[2*i + 1].innerHTML = data[i].rezultat;
        }

        let zadnji1 = [
            {
                ime: "-",
                rezultat: 0
            }
        ]

        localStorage.setItem("zadnji", JSON.stringify(zadnji1));
        
    }

    $("#dugme").click( function() {
        window.location.replace("tetris-uputstvo.html");
    })

})