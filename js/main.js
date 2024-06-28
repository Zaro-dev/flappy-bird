//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


const scoreNode = document.querySelector("h3 span");

//* VARIABLES GLOBALES DEL JUEGO

let pollitoObj = null; // esto significa que el pollito no existe aún
/* let tuberiaObj = null; */
let tuberiasArray = []; // al inicio no habrá ninguna pero se irán añadiendo conforme avance el juego

let mainIntervalId = null;
let tuberiasIntervalId = null;



//* FUNCIONES GLOBALES DEL JUEGO

function startGame(){
    console.log("iniciando juego");

    // 1. Ocultar la pantalla de inicio

    splashScreenNode.style.display = "none";

    // 2. Mostrar la pantalla de juego

    gameScreenNode.style.display = "flex";

    // 3. Añadir todos los elementos iniciales del juego

     pollitoObj = new Pollito();
     /* tuberiaObj = new Tubería(); */

    // 4. Iniciar el intervalo inicial del juego (gameLoop)

    mainIntervalId = setInterval(() => {
        gameLoop();
    }, Math.round(1000/60));

    tuberiasIntervalId = setInterval(() => {
        tuberiasAppear();
        
    }, 2000)
}

function gameLoop(){
    // lo que hay en esta función se ejecuta 60 veces por segundo
    // aqui colocamos movimientos automáticos, checkeos de colisiones y animaciones.

    pollitoObj.gravity();
    
    tuberiasArray.forEach((eachTuberia) => {
        eachTuberia.automaticMovement();
    })

    colisionPollitoTuberias();
    checkTuberiasDisappear();
}

function tuberiasAppear() {

    let randomPositionY = Math.floor(Math.random() * -200);
    let distanciaEntreTuberias = 350;

    let tuberiaObjArriba = new Tubería(randomPositionY, "arriba");
    tuberiasArray.push(tuberiaObjArriba);
    

    let tuberiaObjAbajo = new Tubería(randomPositionY + distanciaEntreTuberias, "abajo");
    tuberiasArray.push(tuberiaObjAbajo);
    
}

function checkTuberiasDisappear(){
    let firstTuberia = tuberiasArray[0];
    if(firstTuberia && firstTuberia.x <= (0 - firstTuberia.w)){
        // IMPORTANTE: cuando quitamos un elemento de nuestro juego hay que eliminar 2 cosas.
        // 1. El objeto
        tuberiasArray.shift();
        // 2. El nodo del DOM
        firstTuberia.node.remove();

        scoreNode.innerText = Number(scoreNode.innerText) + 0.5;
    }

    
}

function colisionPollitoTuberias(){
    tuberiasArray.forEach((eachTuberia) => {
        if (
            pollitoObj.x < eachTuberia.x + eachTuberia.w &&
            pollitoObj.x + pollitoObj.w > eachTuberia.x &&
            pollitoObj.y < eachTuberia.y + eachTuberia.h &&
            pollitoObj.y + pollitoObj.h > eachTuberia.y
          ) {
            // Collision detected!
            gameOver();
          } 

          
        });

    
    
}

function gameOver(){
    clearInterval(mainIntervalId);
    clearInterval(tuberiasIntervalId);
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
}


//* EVENT LISTENERS

startBtnNode.addEventListener("click", () => {
    startGame();
})

gameBoxNode.addEventListener("click", () => {
    pollitoObj.jump();
})

window.addEventListener("keydown", (event) =>{
    if(event.code === "Space"){
        pollitoObj.jump();
    }
})

// * PLANIFICACION

// - el fondo
// - el pollito
//    - nodo (img)
//    - x, y, w, h
//    - gravity()
//    - colisionAbajo()
//    - jump() => con su addEventListener
// - las tuberias
//    - nodo (img)
//    - x, y, w, h
//    - tuberiasAppear()
//    - automaticMovement()
// - colisionPollitoTuberias()
// - score
// - subirScore()
// - gameOver()
