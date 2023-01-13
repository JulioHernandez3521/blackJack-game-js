/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck       = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias HTML
const btnNuevo   = document.querySelector('#btnNuevo');
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const jugadorCartas = document.querySelector('#jugador-cartas');
const computadoraCartas = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');
//Funcion para crear las cartas aleatorias
const crearDeck = ()=>{
    
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push( i + tipo);
        }
    }
    
    for (const tipo of tipos) {
        for(let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);

    return deck;


}

crearDeck()

//funcion para tomar una carta

const pedirCarta = ()=>{
    if(deck.length === 0){
         throw 'Ya no hay cartas';
    }
    
    const carta= deck.pop();
    
    // // carta = deck[Math.floor(Math.random() * (deck.length -1))];
    // // const posicion = deck.indexOf(carta);
    // // deck.splice( posicion, 1);
    // console.log(deck);
    // console.log(carta)

    return carta;

}

//pedirCarta();

//Funcoin para obtener el valor de la carta del
const valorCarta = ( carta ) => {
    const valor = carta.substring(0 , carta.length - 1);
    return ( (isNaN(valor) ? (valor ==='A') ? 11 : 10 : valor * 1 ) )

}

//Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {
    //LLamar a pedir uyna carta

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        //Crear la carta
        nuevaCarta = document.createElement('img');
        nuevaCarta.src = `./cartas/${carta}.png`;
        nuevaCarta.classList.add('carta')
        computadoraCartas.append(nuevaCarta);
        if( puntosMinimos > 21 ) {
            break;
        }

    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana')
        }
    }, 100 );
}


// console.log(valorCarta('AD'));

//Eventos
btnPedir.addEventListener('click', () =>{
    //LLamar a pedir uyna carta
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    //Crear la carta
    nuevaCarta = document.createElement('img');
    nuevaCarta.src = `./cartas/${carta}.png`;
    nuevaCarta.classList.add('carta')
    jugadorCartas.append(nuevaCarta);

    //Validar los puntos
    if( puntosJugador > 21){
        console.warn('Lo siento perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }else if( puntosJugador === 21){
        console.warn('21, Genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }



    // console.log(puntosJugador)
});
btnDetener.addEventListener('click', () =>{
    btnPedir.disabled   = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );
});
btnNuevo.addEventListener('click', () =>{
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    jugadorCartas.innerHTML = '';
    computadoraCartas.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
});




