let numeroSecreto;
let tentativas;
let inicio;
let fim;
const MAX_TENTATIVAS = 10;

function iniciarJogo() {
    const nivelSelecionado = document.querySelector('input[name="nivel"]:checked').value;
    if (nivelSelecionado === "1") {
        inicio = 1;
        fim = 100;
    } else {
        inicio = 1;
        fim = 1000;
    }

    numeroSecreto = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
    tentativas = 0;
    document.getElementById("inicio-selecionado").textContent = inicio;
    document.getElementById("fim-selecionado").textContent = fim;
    document.getElementById("mensagem").textContent = "";
    document.getElementById("tentativas-restantes").textContent = `Tentativas restantes: ${MAX_TENTATIVAS}`;
    document.getElementById("progresso-tentativas").value = 0;
    document.getElementById("dica").disabled = false;
    document.getElementById("palpite").disabled = false;
    document.getElementById("verificar").disabled = false;
    document.getElementById("dica-texto").textContent = "";
    document.getElementById("palpite").value = "";
    document.getElementById("palpite").classList.remove("correto", "errado");
}

function verificarPalpite() {
    const palpiteInput = document.getElementById("palpite");
    const mensagem = document.getElementById("mensagem");
    const palpite = parseInt(palpiteInput.value);

    if (isNaN(palpite)) {
        mensagem.textContent = "Por favor, digite um número válido.";
        return;
    }

    tentativas++;
    const progressoTentativas = document.getElementById("progresso-tentativas");
    progressoTentativas.value = tentativas;

    if (palpite === numeroSecreto) {
        mensagem.textContent = `Parabéns! Você acertou o número em ${tentativas} tentativa(s). O número secreto era ${numeroSecreto}.`;
        palpiteInput.disabled = true;
        document.getElementById("verificar").disabled = true;
        document.getElementById("dica").disabled = true;
    } else if (tentativas >= MAX_TENTATIVAS) {
        mensagem.textContent = `Acabaram as tentativas! O número secreto era ${numeroSecreto}.`;
        palpiteInput.disabled = true;
        document.getElementById("verificar").disabled = true;
        document.getElementById("dica").disabled = true;
    } else if (palpite < numeroSecreto) {
        mensagem.textContent = "O número é maior. Tente novamente.";
        palpiteInput.classList.add("errado");
    } else {
        mensagem.textContent = "O número é menor. Tente novamente.";
        palpiteInput.classList.add("errado");
    }

    document.getElementById("tentativas-restantes").textContent = `Tentativas restantes: ${MAX_TENTATIVAS - tentativas}`;
    palpiteInput.value = "";
}

function desistir() {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = `Você desistiu! O número secreto era ${numeroSecreto}.`;
    document.getElementById("palpite").disabled = true;
    document.getElementById("verificar").disabled = true;
    document.getElementById("dica").disabled = true;
    const progressoTentativas = document.getElementById("progresso-tentativas");
    progressoTentativas.value = MAX_TENTATIVAS;
}

function obterDica() {
    const dicaTexto = document.getElementById("dica-texto");
    if (numeroSecreto % 2 === 0) {
        dicaTexto.textContent = "Dica: O número secreto é par.";
    } else {
        dicaTexto.textContent = "Dica: O número secreto é ímpar.";
    }
}

function reiniciarJogo() {
    document.getElementById("inicio").value = "";
    document.getElementById("fim").value = "";
    iniciarJogo();
}
