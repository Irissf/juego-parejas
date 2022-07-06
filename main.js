//https://www.youtube.com/watch?v=TMWkKPlUUJ4

let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let tiempoRegresivoId = null;

//Apuntando a documento html
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");


const numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

//ordena segun le indicamos con una funcion
numero = numeros.sort(()=>{
    return Math.random()-0.5;
});

console.log(numeros);

function contarTiempo() {
    //setTimeOut se ejecuta solo una vez, para mñas veces es setInterval
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId); // para detener el interval
            bloquearTarjetas();
        }
    },1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);   
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;  
    }
}

function destapar(id) {

    if(!temporizador){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if(tarjetasDestapadas==1){
        //Mostrar el primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;

        //deshabilitar el primer botón
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas==2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;
         
        tarjeta2.disabled = true;

        //al pulsar el segundo boton incrementamos el número de movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        tarjetasDestapadas = 0;
        if(primerResultado == segundoResultado){

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `😱`;
                mostrarTiempo.innerHTML = `Fine`;
            }
        }else{
            //volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ` `;
                tarjeta2.innerHTML = ` `;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
            },500);
        }
    }
}


