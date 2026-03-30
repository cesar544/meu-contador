// 🔥 IMPORTS DO FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

// 🔐 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "meu-jogo-clicker.firebaseapp.com",
  projectId: "meu-jogo-clicker",
  storageBucket: "meu-jogo-clicker.firebasestorage.app",
  messagingSenderId: "497841163403",
  appId: "1:497841163403:web:aad01daacc76613c75188e"
};

// 🚀 INICIALIZA
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🧠 VARIÁVEIS
let numero = 0;
let nome = "";

// 🎯 ELEMENTOS
const botao = document.getElementById('botao');
const textoNumero = document.getElementById('numero');
const reiniciar = document.getElementById('reiniciar');
const inputNome = document.getElementById('nome');
const botaoNome = document.getElementById('salvarNome');

// 👤 SALVAR NOME + ESCONDER INPUT
botaoNome.addEventListener('click', function() {
    nome = inputNome.value;

    if (nome === "") {
        alert("Digite um nome!");
    } else {
        alert("Nome salvo: " + nome);

        inputNome.style.display = "none";
        botaoNome.style.display = "none";
    }
});

// 💾 SALVAR PONTUAÇÃO
function salvarPontuacao() {
    if (nome === "") return;

    set(ref(db, 'jogadores/' + nome), {
        nome: nome,
        pontos: numero
    });
}

// 🏆 RANKING ORDENADO + MEDALHAS
function carregarRanking() {
    const rankingRef = ref(db, 'jogadores');

    onValue(rankingRef, (snapshot) => {
        const data = snapshot.val();

        // 🔥 evita erro se vazio
        if (!data) {
            document.getElementById("ranking").innerHTML = "Sem jogadores ainda";
            return;
        }

        // 🔥 transforma em array
        let jogadores = Object.values(data);

        // 🔥 ordena do maior pro menor
        jogadores.sort((a, b) => b.pontos - a.pontos);

        let lista = "";

        jogadores.forEach((jogador, index) => {

            let posicao;

            if (index === 0) {
                posicao = "🥇";
            } else if (index === 1) {
                posicao = "🥈";
            } else if (index === 2) {
                posicao = "🥉";
            } else {
                posicao = (index + 1) + "º";
            }

            lista += `<p>${posicao} ${jogador.nome} - ${jogador.pontos}</p>`;
        });

        document.getElementById("ranking").innerHTML = lista;
    });
}

// 🚀 INICIA RANKING
carregarRanking();

// 🖱️ CLIQUE
botao.addEventListener('click', function() {
    numero++;
    textoNumero.innerText = numero;

    salvarPontuacao();
});

// 🔄 REINICIAR
reiniciar.addEventListener('click', function() {
    numero = 0;
    textoNumero.innerText = numero;

    salvarPontuacao();
});