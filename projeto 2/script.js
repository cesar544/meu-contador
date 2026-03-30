let numero = 0

const botao = document.getElementById('botao');
const textoNumero = document.getElementById('numero');
const reiniciar = document.getElementById('reiniciar');

botao.addEventListener('click', function() {
    numero++;
    textoNumero.innerText = numero;
})
reiniciar.addEventListener('click', function() {
    numero = 0;
    textoNumero.innerText = numero;
})

console.log('')