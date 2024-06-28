class Pollito{
    constructor(){
        // aquí estarán todas las propiedades de cada pollo
        this.node = document.createElement("img");
        this.node.src ="./images/flappy.png"
        gameBoxNode.append(this.node);

        this.x = 50;
        this.y = 50;
        this.w = 40;
        this.h = 35;

        //configuración inicial del elemento

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
        this.node.style.position = "absolute";
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;

        this.gravitySpeed = 2;
        this.jumpSpeed = 35;

        this.node.style.transition = "transform 0.1s"
    }

    //aquí estarán todos los métodos de cada pollo

    gravity(){
        this.y += this.gravitySpeed;
        // SIEMPRE QUE MODIFICAMOS UN VALOR NÚMERICO DE POSICIÓN O DIMENSIÓN, ACTUALIZAMOS TAMBIÉN EL DOM(LEFT,TOP,WIDTH,HEIGHT)
        this.node.style.top = `${this.y}px`

        if((this.y + this.h) >= gameBoxNode.offsetHeight){
            gameOver();
        }
    }


    jump(){
        // console.log("intentando saltar")
        if(this.y >= 0){
            this.y -= this.jumpSpeed;
            this.node.style.top = `${this.y}px`

            this.node.style.transform = "rotate(-30deg)"

            setTimeout(() => {
                this.node.style.transform = "rotate(50deg)"
            }, 100)
        }



    }


}