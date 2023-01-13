const miModulo = (()=>{
    'use strict'

    /**
     * 2C = Two of Clubs
     * 2D = Two of Diamonds
     * 2H = Two of Hearts
     * 2S = Two of Spades
     */

    let deck       = [];
    const tipos      = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];
    let puntosJugador = 0;
    //     puntosComputadora = 0;

    let puntosJugadores = [];
    //Referencias HTML
    const btnNuevo   = document.querySelector('#btnNuevo'),
          btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener');

    // const jugadorCartas = document.querySelector('#jugador-cartas'),
    //       computadoraCartas = document.querySelector('#computadora-cartas'),
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 2 )=> {
        deck = crearDeck();
        
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHTML.forEach(ele => ele.innerText = 0);
        divCartasJugadores.forEach(ele => ele.innerHTML ='');

        btnPedir.disabled = false;
        btnDetener.disabled = false;


    }
          //Funcion para crear las cartas aleatorias
    const crearDeck = ()=>{
        deck = [];

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
        return _.shuffle(deck);
    }

    //funcion para tomar una carta

    const pedirCarta = ()=>{
        if(deck.length === 0){
            throw 'Ya no hay cartas';
        }
        
        // // carta = deck[Math.floor(Math.random() * (deck.length -1))];
        // // const posicion = deck.indexOf(carta);
        // // deck.splice( posicion, 1);
        return  deck.pop();
    }

    //pedirCarta();

    //Funcoin para obtener el valor de la carta del
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0 , carta.length - 1);
        return ( (isNaN(valor) ? (valor ==='A') ? 11 : 10 : valor * 1 ) )

    }

    //Turno:  0 = Primer jugador y el ultimo es la computadora
    const acumularPuntos = ( carta, turno ) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }
    const crearCarta = (carta, turno) => {
        const nuevaCarta = document.createElement('img');
        nuevaCarta.src = `./cartas/${carta}.png`;
        nuevaCarta.classList.add('carta')
        divCartasJugadores[turno].append(nuevaCarta);
    }
    const determinaGanador = ()=>{
        //TODO: Hacer un ciclo para el if
        const [puntosMinimos, puntosComputadora]  = puntosJugadores;
        
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

    //Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        //LLamar a pedir uyna carta
        let puntosComputadora = 0 ;
        do {
            const carta = pedirCarta();
            const turno = puntosJugadores.length-1;
            puntosComputadora = acumularPuntos(carta, turno);
            crearCarta(carta, turno);
            // puntosComputadora = puntosComputadora + valorCarta(carta);
            // puntosHTML[1].innerText = puntosComputadora;

            //Crear la carta
            // const nuevaCarta = document.createElement('img');
            // nuevaCarta.src = `./cartas/${carta}.png`;
            // nuevaCarta.classList.add('carta')
            // computadoraCartas.append(nuevaCarta);

            if( puntosMinimos > 21 ) {
                break;
            }

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );
        determinaGanador();
       
    }


    // console.log(valorCarta('AD'));

    //Eventos
    btnPedir.addEventListener('click', () =>{
        //LLamar a pedir uyna carta
        const carta = pedirCarta();
        puntosJugador = acumularPuntos(carta,0);
        //Crear la carta
       crearCarta(carta, 0);

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
        inicializarJuego();
    });


    return {
        nuevoJuego: inicializarJuego
    }
})();

