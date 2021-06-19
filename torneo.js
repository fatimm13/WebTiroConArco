var nombre = getQuery("nombre");
var tipo = getQuery("tipo");
var edad = getQuery("edad");
var rondas = getQuery("rondas");

var usuario = new Persona(nombre,0,0,0);

var participantes = ["Magdalena","Francisco","Emilia","Pedro"]
var puntuaciones = new Array();

var rondaActual = 1;
var tiroRonda = 0;

function Persona(nombre, puntuacion, nueves, dieces){
    this.nombre = nombre;
    this.puntuacion = puntuacion;
    this.nueves = nueves;
    this.dieces = dieces;
}

function comparePersona(a,b) {
    let i = a.puntuacion-b.puntuacion;

    if(i==0){
        i = a.dieces - b.dieces;
        if(i==0){
            i=a.nueves - b.nueves;
        }
    }

    return -i;
};

function getQuery(q) {
    return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

function cargaNombre(){
    document.body.innerHTML=nombre;
}

function load(){
    for(var i = 0;i<participantes.length;i++){
        puntuaciones.push(new Persona(participantes[i],0,0,0));
    }

    puntuaciones.push(usuario);
    puntuaciones.sort(comparePersona);
    cargarTabla();
    inicializarTextArea();
}

function inicializarTextArea(){
    let ta = document.getElementById("listaPuntuaciones");
    let e = edad.charAt(0).toUpperCase() + edad.slice(1);
    let t = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    ta.innerHTML = "Jugador: "+nombre+"\n" + "Categoría: "+e+"\n"+"Modalidad: "+t+"\n";
    ta.innerHTML += "__________________________\n";
}

function actualizarTextArea(valor){
    let ta = document.getElementById("listaPuntuaciones");

    tiroRonda++;
    let y = 1;

    if(rondas==12){
        y = 6;
    }else if(rondas==20){
        y = 3;
    }

    var r = tiroRonda % y;
    rondaActual += (tiroRonda - r) / y;

    if(tiroRonda==1){
        ta.innerHTML += "Ronda "+rondaActual+"\n";
        ta.innerHTML += "__________________________\n";
    }

    ta.innerHTML += "Tiro "+tiroRonda+": "+valor+" puntos. \n";

    if(r==0){
        ta.innerHTML += "__________________________\n";
    }

    if(rondaActual>rondas){
        ta.innerHTML += "Fin del torneo.\n";
        ta.innerHTML += "Has quedado en el puesto "+posicion();
        document.getElementById("boton").disabled = true;
    }
    tiroRonda = r;
    ta.scrollTop = ta.scrollHeight;
}

function posicion(){
    var i = 0;
    while(i<puntuaciones.length && usuario!==puntuaciones[i]){
        i++;
    }
    return i+1;
}

function borrarTabla(){
    let table = document.getElementById("tabla");
    let n = table.rows.length;
    for(var i = 1; i<n;i++){
        table.deleteRow(1);
    }
    var r =document.createElement('TR');
    table.tBodies[0].appendChild(r);
}

function cargarTabla(){
    let table = document.getElementById("tabla");
    for(var i = 1;i<=puntuaciones.length;i++){
        let row = table.insertRow(i);
        row.insertCell(0).innerHTML = i;
        row.insertCell(1).innerHTML = puntuaciones[i-1].nombre;
        row.insertCell(2).innerHTML = puntuaciones[i-1].puntuacion;
        if (i == 1) {
            row.classList.add("table-warning");
            row.classList.remove("table-striped");
        } else if (i == 2) {
            row.classList.add("table-danger");
            row.classList.remove("table-striped");
        } else if (i == 3) {
            row.classList.add("table-info");
            row.classList.remove("table-striped");
        }
        if (puntuaciones[i-1] === usuario) {
            row.classList.add("fw-bold");
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function incluirPuntuacion(){
    let valor = parseInt(document.getElementById("puntuacion").value,10);
    if(valor>=0 && valor<=10){
        document.getElementById("error").hidden=true;
        for(var i = 0;i<puntuaciones.length;i++){
            let n = getRandomInt(0,10);

            if(puntuaciones[i]===usuario){
                n = valor;  
            }

            if(n==10){
                puntuaciones[i].dieces += 1;
            }else if(n==9){
                puntuaciones[i].nueves += 1;
            }

            puntuaciones[i].puntuacion += n;
            
        }

        puntuaciones.sort(comparePersona);
        borrarTabla();
        cargarTabla();
        actualizarTextArea(valor);
        document.getElementById("nueves").innerHTML=usuario.nueves;
        document.getElementById("dieces").innerHTML=usuario.dieces;
        document.getElementById("total").innerHTML=usuario.puntuacion;
    }else{
        document.getElementById("error").hidden=false;
    }
}

window.onload = load;