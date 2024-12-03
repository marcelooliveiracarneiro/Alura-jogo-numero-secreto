let numerosSorteados = [];
let numeroSecreto = 0;
let numeroTentativas = 0;
let numeroMaximo = 4;

novoJogo();

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    numeroTentativas = 0;
    
    setSelectorInnerHTML('h1', 'Jogo do número secreto');
    setSelectorInnerHTML('p', 'Escolha um número entre 1 e 10');
    document.getElementById('reiniciar').setAttribute('disabled',true);
    limparCampo();
}

function verificarChute() { 
    numeroTentativas ++;
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        setSelectorInnerHTML('h1', 'Acertou!');
        setSelectorInnerHTML('p', `Você descobriu o número secreto com ${numeroTentativas} tentativa${((numeroTentativas > 1) ? 's':'' )}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        limparCampo();
        setSelectorInnerHTML('p', `:( O número é ${((chute < numeroSecreto) ? 'maior' : 'menor')} que ${chute}`);
    }
}

function gerarNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * numeroMaximo + 1);
    if (numerosSorteados.length == numeroMaximo) {
        numerosSorteados = [];
    }
    if (numerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroAleatorio);
        console.log(numerosSorteados);
        return numeroAleatorio;
    }
    return parseInt(Math.random() * 10 + 1);
}

function limparCampo() {
    document.querySelector('input').value = '';
}

function setSelectorInnerHTML(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    
    speakText( texto, 1 ); 
}

function speakText( text, library ) {
    if (library == 1) {
    responsiveVoice.speak( text, 'Brazilian Portuguese Female', {rate:1.2});
    }
    else
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; 
        SpeechSynthesisVoice
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}










