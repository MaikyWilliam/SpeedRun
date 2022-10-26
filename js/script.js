const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const aguarda = document.querySelector('.aguarda');
const inicio = document.querySelector('.inicio');
const over = document.querySelector('.game-over');
const btn = document.querySelector(".game-over button");

const classRecordes = document.querySelector(".recordes");
const voltar = document.getElementById('voltar');
const rec = document.getElementById('rec');
const go = document.getElementById('go');
const start = document.querySelector('.start');
const div_voltar = document.querySelector('.div-voltar');

var recorde = document.getElementById('recorde');
var recordeSalvo = localStorage.getItem('recorde');

let score = 0;
let gameover = false;

var ordena;
var ordenaP;
var ordenaRecorde;

if (isNaN(recordeSalvo) && recordeSalvo.length > 0) {
    recordeSalvo = JSON.parse(recordeSalvo)
    recordeSalvo = ordenaRank();
    recorde.innerText = recordeSalvo[0].pontos;
}

// Função para ordenar o localStorage de acordo com as Maiores pontuações
function ordenaRank() {
    // exemplo de ordenação de array
    if(recordeSalvo){
        recordeSalvo.sort(function(a,b) {
            if(a.pontos > b.pontos) return -1;
            if(a.pontos < b.pontos) return 1;
            return 0;
        });

        if(recordeSalvo.length > 3){
            let recordeSalvo = localStorage.getItem('recorde')
            recordeSalvo = JSON.parse(recordeSalvo);
            recordeSalvo.pop()
            localStorage.setItem("recorde", JSON.stringify(recordeSalvo))
        }

        return recordeSalvo
    }
}

// Mecanica principal do jogo 
function loop() {
    // rank();
    aguardaIncio();
    scoreFinal();
    setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './imagens/game-over.png';
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'

            over.style.display = 'block'
            gameover = true;
            return
        }
    }, 10)
}

// Contagem de 3 segundos antes de iniciar o game
function aguardaIncio() {
    setInterval(() => {
        aguarda.classList.remove("aguarda");
    }, 3000);
}

function rank() {
    // setInterval(()=>{
        recordeSalvo = ordenaRank();
        localStorage.setItem('recorde', JSON.stringify(recordeSalvo)) 
    // },1000); 
}

async function salvar(nome) {

    if (gameover) {
        var localRecorde = [];
        var nome = document.getElementById('nome');
        nomeRecorde = nome.value
        recorde = recorde.innerText = score - 1;

        recordeSalvo = ordenaRank();

        if (recordeSalvo) {
            let isMaior = false;
            for (let i = 0; i < recordeSalvo.length; i++) {
                if(recorde > recordeSalvo[i].pontos){
                    isMaior = true;
                }
            }

            console.log(recordeSalvo.length)
            if (isMaior || recordeSalvo.length <= 3) {

                let lRecorde = {
                    nome: nomeRecorde,
                    pontos: recorde
                }

                recordeSalvo.unshift(lRecorde);
                localStorage.setItem("recorde", JSON.stringify(recordeSalvo))
                recordeSalvo =[]
            } else {
                nome.style.display = 'none';
            }
        } else {

            localRecorde = [{
                nome: nomeRecorde,
                pontos: recorde
            }]

            localStorage.setItem("recorde", JSON.stringify(localRecorde))
        }
        return
    }

}

function scoreFinal() {

    setInterval(() => {

        if (gameover) {
            return
        }

        if (inicio.innerHTML == 1) {
            inicio.style.display = 'none';
        } else if (inicio.innerHTML < 5 && inicio.innerHTML > 0) {
            inicio.innerHTML -= 1
        } else {
            inicio.style.display = 'none';
        }

        if (score > 300) {
            pipe.style.animation = 'pipe-animation 0.6s linear infinite';
            score += 3
        } else if (score > 200) {
            score += 2
            pipe.style.animation = 'pipe-animation 0.7s linear infinite';
        } else if (score > 100) {
            score += 1
            pipe.style.animation = 'pipe-animation 0.8s linear infinite';
        }

        document.getElementById('pontos').innerText = `Pontos: ${score += 1}`;
        score++
    }, 1000);

}


// Botão de confirmar o nome do game over
btn.addEventListener("click", function (e) {
    e.preventDefault();
    var nome = document.getElementById('nome');
    nome = nome.value
    salvar(nome);
    recordeSalvo = [];
    // Recarregar a pagina quando concluir
    // location.reload();
});

// Botão de iniciar o jogo
go.addEventListener('click', function () {
    start.style.display = "none";
    inicio.style.display = "block";
    loop();
})

// Botão de exibir recordes
rec.addEventListener('click', function () {
    start.style.display = "none";
    classRecordes.style.display = "block";
    div_voltar.style.display = 'block';

    rank();
  
    // tabela.appendChild(corpo);
    let tbody = document.querySelector('.tbody')
    tbody.innerText ="";
    
    for (const i in recordeSalvo) {
        let tr = tbody.insertRow();
        let td_jogador = tr.insertCell();
        let td_pontos = tr.insertCell();

        td_jogador.innerHTML = recordeSalvo[i].nome
        td_pontos.innerHTML = recordeSalvo[i].pontos
    }
        
})

// Botão de voltar da tela de recordes
voltar.addEventListener('click', function () {
    div_voltar.style.display = 'none'
    classRecordes.style.display = "none";
    start.style.display = "block";
})

// Função do pulo
const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500);
}

// Chamada do evento do pulo
document.addEventListener('keydown', jump)
document.addEventListener("touchstart", jump);