import {config} from './config.js';
import {setupcanvas} from './canvas.js';
import{createParticle,updateParticle,drawParticle} from './particles.js';

import {handleCollisions} from './physics.js';


const canvas = document.querySelector('#particle-canvas');
const {ctx, resize} = setupcanvas(canvas); 

let ball = [];
let lastTime = 0;
let spawnTimer = 0;

function getSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

function spawnInitalBalls() {
    const {width, height} = getSize();

    balls = Array.from(
        {length: config.initialBalls},
        () => createparticle(
            Math.random() * width,
            Math.random() * height
        )
    );
}

function animation(time){
   const dt = Math.min(time - (lastTime || time) / 16.67,2 );
   lastTime = time;

   const{width, height} = getSize();

   ctx.clearRect(0, 0, width, height);

   for (const ball of balls) {
       updateParticle(ball, dt, width, height);
   }

    balls = handleCollisions(balls);

    balls = balls.filter(ball => ball.age < ball.life);

    // Add new balls if  the previous ball disappeared

    spawnTimer += dt;

    if (ball.length === 0 || (ball.length < 8 && spawnTimer > 120))

      const count = Math.min(3, CONFIG.maxBalls - balls.length);
         for(let i = 0; i < count; i++){
            balls.push(createParticle(
                Math.random() * width,
                Math.random() * height
            ));
            spawnTimer = 0;
         }

     for (const ball of balls) {
        drawParticle(ctx, ball);
     }  
     requestAnimationFrame(animation);

}

spawnInitalBalls();
requestAnimationFrame(animation);