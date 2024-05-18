const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const botonLargo = document.querySelector('.app__card-button--largo');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque'); 
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const tiempoEnPantalla = document.querySelector('#timer');

const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3')
const musica = new Audio('./sonidos/luna-rise-part-one.mp3'); 

let tiempoTranscurridoEnSegundos = 1500;
let IdIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
});

botonLargo.addEventListener('click', () => {
//     html.setAttribute('data-contexto', 'descanso-largo');
//      banner.setAttribute('src','./imagenes/descanso-largo.png')
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
})

botonCorto.addEventListener('click', () => { 
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
})

botonEnfoque.addEventListener('click', () => {    
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active');
})

function cambiarContexto(contexto) {
    mostrarTiempo()
    botones.forEach(function(contexto){
    contexto.classList .remove('active');  
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src',`./imagenes/${contexto}.png`)
    switch(contexto) {
    case 'descanso-largo':
        titulo.innerHTML = `
            Hora de volver a la superficie<br>
            <strong class="app__title-strong">¡Haz una pausa larga!</strong>  
            `;  
        break;
    case 'descanso-corto':
        titulo.innerHTML = `
        ¿Qué tal tomar un respiro?  <br>
        <strong class="app__title-strong">¡Haz una pausa!</strong>  
        `;
        break;
    case 'enfoque':
        titulo.innerHTML = `
        Optimiza tu productividad,<br>
        <strong class="app__title-strong">sumérgete en lo que importa.</strong>  
        `;
    break;
    }
}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0) {
        audioTiempoFinalizado .play()
        alert('Tiempo finalizado')
        reiniciar()
        return
    }
    textoIniciarPausar.textContent = 'Pausar'
    iconoIniciarPausar.setAttribute('src', './imagenes/pause.png')
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
    // console.log('Tiempo: ' + tiempoTranscurridoEnSegundos) // Muestra el tiempo actual
    // console.log('Id: ' + IdIntervalo) // Muestra el ID actual
}

botonIniciarPausar.addEventListener('click', iniciarPausar );

function iniciarPausar() {
    if(IdIntervalo) {
        audioPausa.play()
        reiniciar()
        return
    }
    audioPlay.play()
    IdIntervalo = setInterval(cuentaRegresiva, 1000);
} 
function reiniciar(){
    clearInterval(IdIntervalo);
    textoIniciarPausar.textContent = 'Comenzar'
    iconoIniciarPausar.setAttribute('src', './imagenes/play_arrow.png')
    IdIntervalo = null; 
}
function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-Mx',{minute: '2-digit', second: '2-digit'})  
    tiempoEnPantalla.innerHTML =`${tiempoFormateado}` 
} 
mostrarTiempo()  