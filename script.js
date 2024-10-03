// Initial Data -------------------------------------------------------------------------
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset();
// Events -------------------------------------------------------------------------
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach( item => {
    item.addEventListener('click', boardClick);
});


// Functions -------------------------------------------------------------------------

function boardClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === ''){ //verifico se o jogo está rolando (playing) e o espaço nao estiver preenchido
        square [item] = player;
        renderSquare();
        togglePlayer();
    }
}

// Limpa os estilos de background e as células
function reset() {
    warning = '';

    // Decidindo aleatóriamente quem começa, se X ou O
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'X' : 'O';

    // Resetando o tabuleiro
    for (let i in square) {
        square[i] = '';
    }

    // Resetando o estilo das casas (background)
    setBoardBackgroundColor(''); // Remove a cor de fundo de todas as células

    // Iniciando o jogo novamente
    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare(){ //colocando X ou O nos espaços
    for(let i in square){ //percorre todo o "tabuleiro"
        let item = document.querySelector(`div[data-item=${i}]`); // cria a variavel item contendo NADA, X ou O
            item.innerHTML = square[i]; //coloca vazio, X ou O no lugar; (nao precisa de if e else pois se tiver vazio, vai preencher com vazio e nada muda, mas se tiver X ou O, preenche com eles)
    }

    checkGame();
}

function renderInfo(){
    document.querySelector('.turn').innerHTML = player;
    document.querySelector('.result').innerHTML = warning;
}

// alterna entre os players O e X
function togglePlayer(){ 
    player = (player === 'X') ? 'O' : 'X' ;
    renderInfo(); //atualiza na tela de quem é a vez
}

// Função checkGame atualizada para garantir que a combinação vencedora seja válida
function checkGame() {
    let winningCombination = getWinningCombination('X');
    if (winningCombination) {
        warning = 'X';
        playing = false;
        winningCells(winningCombination, '#ee2cd190'); // Aplica cor nas células vencedoras
        showEndMessage('Player X venceu!');
    } else {
        winningCombination = getWinningCombination('O');
        if (winningCombination) {
            warning =  'O';
            playing = false;
            winningCells(winningCombination, '#ee2cd190');
            showEndMessage('Player O venceu!');
        } else if (isFull()) {
            warning = 'Empate!';
            playing = false;
            showEndMessage('O jogo Empatou!');
        }
    }
}

// verifica se alguem ganhou
function getWinningCombination(player){ 
    let possib = [
        'a1,a2,a3', //array 1
        'b1,b2,b3', //array 2
        'c1,c2,c3',
        
        'a1,b1,c1',
        'a2,b2,c2', //array 5
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let i in possib){
        let possibArray = possib[i].split(','); // recebe um array e separa em 3, usando a VIRGULA como divisor. exemplos: se tiver percorrendo o array 5 (a2, b2, c2), separa e transforma em 3 arrays: [a2] [c2] [b2]
        let winner = possibArray.every( option => square[option] === player);
        // EVERY retorna true ou false se TODOS os elementos satisfazerem determinada condição. no exemploa  cima esses elementos são: [a2] [b2] [c2] 
        // enquanto OPTION passa como parametro cada uma das minhas opções 
        // verifico se no square[a1] === player (pode ser 'X' ou 'O') caso sim, retorna true. depois verifica o [b2], depois o [c2], se todos os 3 forem TRUE, então a função retorna TRUE e armazena em WINNER
        if (winner){
            return possibArray;
        }
    }

    return null; //caso nignuem tenha vencido, retorna NULL
}

// verifica se todos os campos estão preenchidos e empatou
function isFull(){ 
    for (let i in square){
        if (square[i] === ''){
            return false;
        }
    }
    return true;
}

// Função para aplicar o background nas casas vencedoras
function winningCells(cells, color) {
    if (cells) { // Certifica-se de que a combinação vencedora existe
        cells.forEach(cell => {
            let item = document.querySelector(`div[data-item=${cell}]`);
            item.style.backgroundColor = color;
        });
    }
}

// Função para pintar o tabuleiro inteiro de uma cor caso EMPATE
function setBoardBackgroundColor(color) {
    document.querySelectorAll('.item').forEach(item => {
        item.style.backgroundColor = color;
    });
}

//caixa coma  mensagem de fim de jogo
function showEndMessage(message) {
    document.querySelector('.textbox .end-message').innerHTML = message;
    document.querySelector('.textbox').style.display = 'flex'; // Exibe a mensagem de fim de jogo
}

// Função para esconder a textbox e resetar o jogo
document.querySelector('.reset-box').addEventListener('click', () => {
    document.querySelector('.textbox').style.display = 'none'; // Oculta a mensagem
    reset(); // Reseta o jogo
});


// MUSICA
const playButton = document.getElementById('playButton');
const backgroundMusic = document.getElementById('backgroundMusic');

// Função para tocar/pausar a música quando o botão for clicado
playButton.addEventListener('click', () => {
    // Se a música estiver tocando, pause-a, caso contrário, toque-a
    const playButton = document.getElementById('playButton');
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        playButton.innerHTML = 'Pause Music';
        playButton.style.backgroundColor = '#4b37ba82';
        playButton.addEventListener('mouseover', () => {
            playButton.style.backgroundColor = '#ee2cd190';
        });
        playButton.addEventListener('mouseout', () => {
            playButton.style.backgroundColor = '#4b37ba82'; // Cor original
        });
    } else {
        backgroundMusic.pause();
        playButton.innerHTML = 'Play Music';        
        playButton.style.backgroundColor = '#ee2cd190';
        playButton.addEventListener('mouseover', () => {
            playButton.style.backgroundColor = '#4b37ba82';
        });
        playButton.addEventListener('mouseout', () => {
            playButton.style.backgroundColor = '#ee2cd190';
        });
    }
});