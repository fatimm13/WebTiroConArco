const torneos = [
    new Torneo("Torneo juvenil Amigos del Arco (12 rondas a 6 flechas)", "juvenil", "longbow", 12),
    new Torneo("Torneo juvenil Arqueros de Ronda (20 rondas a 3 flechas)","juvenil","longbow",20),
    new Torneo("Torneo juvenil Churriana en la Diana (12 rondas a 6 flechas)","juvenil","olimpico",12),
    new Torneo("Torneo juvenil Antequera Certera (20 rondas a 3 flechas)","juvenil","desnudo",20),
    new Torneo("Torneo juvenil Final Copa Mundial (20 rondas a 3 flechas)","juvenil","instintivo",20),
    new Torneo("Torneo senior Churriana en la Diana (20 rondas a 3 flechas)","senior","olimpico",20),
    new Torneo("Torneo senior Amigos del Arco (12 rondas a 6 flechas)","senior","longbow",12),
    new Torneo("Torneo senior Antequera Certera (20 rondas a 3 flechas)","senior","desnudo",20),
    new Torneo("Torneo senior Final Copa Nacional (12 rondas a 6 flechas)","senior","instintivo",12),
    new Torneo("Torneo veterano Final Copa Regional (12 rondas a 6 flechas)","veterano","instintivo",12),
    new Torneo("Torneo veterano Churriana en la Diana (20 rondas a 3 flechas)","veterano","olimpico",20),
    new Torneo("Torneo veterano Amigos del Arco (12 rondas a 6 flechas)","veterano","longbow",12),
    new Torneo("Torneo veterano Antequera Certera (20 rondas a 3 flechas)","veterano","desnudo",20)
];

function Torneo(nombre,edad,tipo,rondas){
    this.nombre = nombre;
    this.edad = edad;
    this.tipo = tipo;
    this.rondas = rondas;
}

function filtro(torneo){
    var getSelectedValue1 = document.querySelector('input[name="edad"]:checked');   
    var getSelectedValue2 = document.querySelector('input[name="modalidad"]:checked'); 
    var a = true;
    var b = true;
    if(getSelectedValue1!=null){
        a=torneo.edad== getSelectedValue1.value;
    }
    if(getSelectedValue2!=null){
        b=torneo.tipo==getSelectedValue2.value;
    }
    return  a && b;
}

function myFunction() {
    let e = document.getElementById("nombre");
    var lista = torneos.filter(filtro);
    let botones = document.getElementById("botones");
    botones.innerHTML = "";
    lista.forEach(e => agregarBoton(botones,e.nombre,"cargarPagina("+e.tipo+","+e.edad+","+e.rondas+")"));
}

function agregarBoton(elemento, texto, funcion) { 
    elemento.innerHTML+='<input type="button" class="btn btn-outline-dark btn-lg" value="'+texto+'" onclick="'+funcion+'">'; 
} 

function cargarPagina(tipo,edad,rondas){
    let e = document.getElementById("nombre");
    if(e.value==""){
        document.getElementById("error").hidden=false;
    }else{
        location.replace("./torneo.html?nombre="+e.value+"&tipo="+tipo.value+"&edad="+edad.value+"&rondas="+rondas);
    }
}