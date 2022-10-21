const mario =  document.querySelector('.mario');
const pipe =  document.querySelector('.pipe');
const over =  document.querySelector('.game-over');
const btn = document.querySelector(".game-over button");
let pontuacao = document.querySelector(".pontuacao h1").innerText;
document.getElementById('pontos').innerText = 'Pontos: '+ 0;

let score = 10;
let gameover = false;

btn.addEventListener("click", function() {
    
    location.reload();
});

const jump = () =>{
    mario.classList.add('jump')

    setTimeout(()=>{
        mario.classList.remove('jump')
    }, 500);
}

const scoreFinal = setInterval(() => {
    
    if(gameover){
        return
    }
    document.getElementById('pontos').innerText = `Pontos: ${score += 1}`;
    console.log(score += 1 )
    score++
}, 1000);

const loop = setInterval(() =>{
    const pipePosition = pipe.offsetLeft;
    const marioPosition = window.getComputedStyle(mario).bottom.replace('px', '');
    
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './imagens/game-over.png';
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        over.style.display = 'block'
        gameover = true;
        
    }

    

}, 10)

document.addEventListener('keydown', jump)
document.addEventListener("touchstart", jump, false);