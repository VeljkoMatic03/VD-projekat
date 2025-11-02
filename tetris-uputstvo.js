$(document).ready(function() {

    $("#rez").click(function() {
        window.location.replace("tetris-rezultati.html");
    })

    $("#igra").click(function() {
        let nivo = parseInt(document.getElementById("slider").value);
        localStorage.setItem("nivo", JSON.stringify(nivo));

        let Ifig = document.getElementById("Ifigura").checked;
        let Lfig = document.getElementById("Lfigura").checked;
        let Jfig = document.getElementById("Jfigura").checked;
        let Sfig = document.getElementById("Sfigura").checked;
        let Zfig = document.getElementById("Zfigura").checked;
        let Tfig = document.getElementById("Tfigura").checked;
        let Ofig = document.getElementById("Ofigura").checked;

        let boje = [];

        if(Ifig) boje.push("Ifigura");
        if(Lfig) boje.push("Lfigura");
        if(Jfig) boje.push("Jfigura");
        if(Sfig) boje.push("Sfigura");
        if(Zfig) boje.push("Zfigura");
        if(Tfig) boje.push("Tfigura");
        if(Ofig) boje.push("Ofigura");

        localStorage.setItem("boje", JSON.stringify(boje));

        window.location.replace("tetris-igra.html");
    })

    $("#all").change(function () {
        if(document.getElementById("all").checked){
            document.getElementById("Ifigura").checked = true;
            document.getElementById("Lfigura").checked = true;
            document.getElementById("Jfigura").checked = true;
            document.getElementById("Sfigura").checked = true;
            document.getElementById("Zfigura").checked = true;
            document.getElementById("Tfigura").checked = true;
            document.getElementById("Ofigura").checked = true;
        }
        else{
            document.getElementById("Ifigura").checked = false;
            document.getElementById("Lfigura").checked = false;
            document.getElementById("Jfigura").checked = false;
            document.getElementById("Sfigura").checked = false;
            document.getElementById("Zfigura").checked = false;
            document.getElementById("Tfigura").checked = false;
            document.getElementById("Ofigura").checked = false;
        }
    })

})