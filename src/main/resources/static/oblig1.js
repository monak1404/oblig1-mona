let liste= [] //Variablen må være global slik at den kan endres i begge funksjonene

function kjopBillett (){

    const film =document.getElementById("film-liste").value;  //Henter verdier
    const antall= document.getElementById("antall-felt").value;
    const fornavn = document.getElementById("fornavn-felt").value;
    const etternavn = document.getElementById("etternavn-felt").value;
    const telefonnr= document.getElementById("telefonnr-felt").value;
    const epost= document.getElementById("epost-felt").value;
    const feilAntall = document.getElementById("tom-antall");
    const feilFornavn =document.getElementById("tom-fornavn");
    const feilEtternavn =document.getElementById("tom-etternavn");
    const feilTelefonnr=document.getElementById("tom-telefonnr");
    const feilEpost=document.getElementById("tom-epost");


    let kunde = {       // Oppretter objektet

        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        telefonnummer: telefonnr,
        epost:epost

    }

    console.log(kunde)
    /*
    $.post("/lagre", kunde, function (){
        hentAlle();
    })

    function hentAlle(){
        $.get("/hent",function (data){
            formaterBilett(data)
        })
    }

     */

    if (kunde.antall === "")
    {feilAntall.innerHTML = "Må skrive noe i antall"}  //Sjekker om det skrives noe i feltet
    else (feilAntall.innerHTML = "")                   // Dersom feltet er tomt sendes deilmeldingen, og når feltet
                                                       // blir fylt  fjernes den

    if (kunde.fornavn === "")
    {feilFornavn.innerHTML = "Må skrive noe i fornavn"}
    else(feilFornavn.innerHTML ="")

    if(kunde.etternavn === "")
    {feilEtternavn.innerHTML = "Må skrive noe i etternavn"}
    else(feilEtternavn.innerHTML="")

    if(kunde.telefonnummer === "")
    {feilTelefonnr.innerHTML = "Må skrive telefonnummer"}
    else(feilTelefonnr.innerHTML="")

    if(kunde.epost === "")
    {feilEpost.innerHTML = "Må skrive e-postadressen"}
    else(feilEpost.innerHTML="")


    if(                                             //Her sjekkes det om alle feltene har fått en verdi,
        kunde.antall !== "" &&                      // og hvis de har fått en verdi så dyttes objektet inn i listen.
        kunde.fornavn !== "" &&                     // I tillegg kjøres utMelding funksjonen som presenterer objektet på en fin måte.
        kunde.etternavn !== "" &&                   // Til slutt tømmes feltene slik at neste kunde blir fylt inn.
        kunde.telefonnummer !== "" &&
        kunde.epost !== ""){
        liste.push (kunde)
        formaterBilett()


        document.getElementById("film-liste").value = "";
        document.getElementById("antall-felt").value = "";
        document.getElementById("fornavn-felt").value = "";
        document.getElementById("etternavn-felt").value= "";
        document.getElementById("telefonnr-felt").value ="";
        document.getElementById("epost-felt").value= "";

    }
    console.log(liste);

}
function formaterBilett(){

    let ut =
        "<tr>" + "<th>Film</th>" +                // Setter opp visningen av bestillinger slik vist i oppgaven
        "<th>Antall</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Telefonnr</th>" +
        "<th>Epost</th>" +
        " </tr>";

    for (let bestilling of liste) {
        ut += "<tr>"
        ut += "<td>" + bestilling.film + "</td>" +           //Henter ut alle bestillingene fra listen
            "<td>" + bestilling.antall + "</td>" +
            "<td>" + bestilling.fornavn + "</td>" +
            "<td>" + bestilling.etternavn + "</td>" +
            "<td>" + bestilling.telefonnummer + "</td>" +
            "<td>" + bestilling.epost + "</td>" + "<br>"
        ut += "<tr>"
    }

    document.getElementById("utskrift").innerHTML= ut;           //Til slutt skriver jeg ut på siden.

}

function slettBiletter(){
    const slett =confirm ("Vil du slette?")
    if(slett){
        $.get("/slett", function (data){
            formaterBilett(data);
            $("#utskrift").html("");

        })
    }
    liste = [] // Her setter jeg listen til å være tom.
    formaterBilett();  //Dette tømmer tabellen som viser bestilling/bestillingene.


}