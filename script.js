let topScreen = bottomScreen = "";
const operators = ["+", "-", "*", "/"];

// Verifica se o input é um operador.
const checkOperator = input => {
    for (let op of operators)
        if (input === op)
            return true;
};

// Verifica se há mais de 2 operadores numa string (Usado em "del()", geralmente na tela de cima e pula o primeiro valor).
function countOperators(string) {
    for (let i = theAmount = 0; i < operators.length; i++) {
        for (let j = 1; j < string.length; j++) {
            if (theAmount >= 2)
                return true;
            else if (string[j] === operators[i])
                theAmount++;
        }
    }
};

// Verifica se há um ponto na string.
const checkPoint = string => string.includes(".");

// Corta a conta até encontrar um operador/sinal.
function sliceCanvas(string) {
    // Começa pela direta e pula o primeiro caractere (é um sinal/operador da conta de cima).
    for (let i = string.length - 2; i > 0; i--) {
        // Quando encontra um sinal, envia fatia percorrida da string(conta).
        if (checkOperator(string[i]))
            return string.slice(i + 1, -1);
    }
    // Se não encontrar sinal, retorna a string sem sinal (Necessário para evitar mais linhas de códigos na função "del()").
    return string.slice(0, -1);
};

// Adiciona o valor na conta, trata operadores e ponto.
function input(value) {
    // Precisa ter limite para não ultrapassar a tela.
    if (bottomScreen.length < 8 && topScreen.length < 17) {
        // Não pode ser operador ou apenas "-" se não houver operador em cima e a tela de baixo precisa estar vazia.
        if (!checkOperator(value) || value === "-" && !checkOperator(topScreen.slice(-1)) && bottomScreen.length === 0) {
            // Caso ".", só adiciona se já não houver um. Ou simplesmente adiciona o valor na conta.
            if (value === "." && !checkPoint(bottomScreen) || !checkPoint(value)) {
                document.getElementById("bottomScreen").innerHTML = bottomScreen += value;
            }
        }
        // Processa os operadores/sinais. Só aceita negativo em cima se não houver um sinal no final ou se já for um valor positivo.
        else if (bottomScreen < 0 && !checkOperator(topScreen.slice(-1)) || bottomScreen > 0) {
            document.getElementById("topScreen").innerHTML = topScreen += bottomScreen += value;
            document.getElementById("bottomScreen").innerHTML = "0";
            bottomScreen = "";
        }
    }
};

// Processa a string e depois imprime o resultado da conta.
function result() {
    if (bottomScreen.length > 0) {
        bottomScreen = String(eval(topScreen + bottomScreen));
        topScreen = "";
        if (bottomScreen === "0") {
            clean();
        } else if (bottomScreen.length >= 8) { // Implementa precisão para não ultrapassar a tela.
            document.getElementById("topScreen").innerHTML = "0";
            document.getElementById("bottomScreen").innerHTML = bottomScreen = Number(bottomScreen).toPrecision(4);
        } else { // Apenas imprime o resultado sem ultrapassar a tela.
            document.getElementById("topScreen").innerHTML = "0";
            document.getElementById("bottomScreen").innerHTML = bottomScreen;
        }
    }
};

// Limpa tudo.
function clean() {
    topScreen = bottomScreen = "";
    document.getElementById("topScreen").innerHTML = document.getElementById("bottomScreen").innerHTML = "0";
};

// Deleta o último caractere.
function del() {
    // Apaga apenas um caractere.
    if (bottomScreen.length > 1) {
        document.getElementById("bottomScreen").innerHTML = bottomScreen = bottomScreen.slice(0, -1);
    }
    // Se houver dois operadores em cima, fatia até o operador e manda o pedaço para baixo.
    else if (countOperators(topScreen)) {
        bottomScreen = sliceCanvas(topScreen);
        topScreen = topScreen.slice(0, topScreen.length - bottomScreen.length - 1);
        document.getElementById("topScreen").innerHTML = topScreen;
        document.getElementById("bottomScreen").innerHTML = bottomScreen;
    }
    // Se houver apenas um operador em cima, manda para baixo.
    else if (!countOperators(topScreen) && topScreen.length > 0) {
        bottomScreen = sliceCanvas(topScreen);
        topScreen = "";
        document.getElementById("topScreen").innerHTML = "0";
        document.getElementById("bottomScreen").innerHTML = bottomScreen;
    }
    // Apenas limpa em baixo. (Para quando o tamanho da string for 1)
    else {
        bottomScreen = "";
        document.getElementById("bottomScreen").innerHTML = "0";
    }
};
