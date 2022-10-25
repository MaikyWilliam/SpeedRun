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

if (recordeSalvo) {
    recordeSalvo = JSON.parse(recordeSalvo)
    ordena = ordenaRank();
    recorde.innerText = ordena;
}

function ordenaRank() {
    for (const i in recordeSalvo) {
        ordena = recordeSalvo[i].pontos
        for (const j in recordeSalvo) {
            ordenaP = recordeSalvo[j].pontos;
            if (ordena > ordenaP) {
                ordenaRecorde = recordeSalvo[i]
            }
        }
    }
    return ordena
}

function aguardaIncio() {
    setInterval(() => {
        aguarda.classList.remove("aguarda");
    }, 3000);
}

btn.addEventListener("click", function (e) {
    e.preventDefault();
    var nome = document.getElementById('nome');
    nome = nome.value
    salvar(nome);
    location.reload();
});

const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500);
}

async function salvar(nome) {

    if (gameover) {
        var localRecorde = [];
        var nome = document.getElementById('nome');
        nomeRecorde = nome.value
        recorde = recorde.innerText = score - 1;

        ordena = ordenaRank();

        if (recordeSalvo) {

            if (recorde > ordena) {

                let lRecorde = {
                    nome: nomeRecorde,
                    pontos: recorde
                }

                recordeSalvo.push(lRecorde);
                localStorage.setItem("recorde", JSON.stringify(recordeSalvo))
            } else {
                nome.style.display = 'none';
            }
        } else {
            console.log('else')
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

function loop() {
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

go.addEventListener('click', function () {
    start.style.display = "none";
    inicio.style.display = "block";
    loop();
})

rec.addEventListener('click', function () {
    start.style.display = "none";
    classRecordes.style.display = "block";
    div_voltar.style.display = 'block';

    classRecordes.innerHTML = `
    <table border="0">
        <tr>
            <th>Jogador</th>
            <th>Pontos</th>
        </tr>
        <tr>
            <td>${ordenaRecorde.nome}</td>
            <td>${ordenaRecorde.pontos}</td>
        </tr>
         
        </table>
    `
})

voltar.addEventListener('click', function () {
    div_voltar.style.display = 'none'
    classRecordes.style.display = "none";
    start.style.display = "block";
})

document.addEventListener('keydown', jump)
document.addEventListener("touchstart", jump);