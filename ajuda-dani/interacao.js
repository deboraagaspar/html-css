let dadosPessoais = {};
let metodoPagamento = "pix"; // Define "pix" como o pagamento inicial

document.getElementById("btn-proximo-1").addEventListener("click", function() {
    // Armazena dados pessoais
    dadosPessoais.nome = document.getElementById("nome").value.trim();
    dadosPessoais.cpf = document.getElementById("cpf").value.trim();
    dadosPessoais.email = document.getElementById("email").value.trim();
    dadosPessoais.telefone = document.getElementById("telefone").value.trim();

    if (dadosPessoais.nome && dadosPessoais.cpf && dadosPessoais.email) {
        // Mostra o Passo 2
        document.getElementById("passo-1").style.display = "none";
        document.getElementById("passo-2").style.display = "block";

        // Define o método de pagamento "pix" como selecionado
        document.querySelector('input[name="pagamento"][value="pix"]').checked = true;
        mostrarCampos(); // Exibe as informações do Pix
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
});

function mostrarCampos() {
    const metodo = document.querySelector('input[name="pagamento"]:checked').value;
    const campoInfo = document.getElementById("campo-info");
    const btnFinalizar = document.getElementById("btn-finalizar");
    let html = "";

    // Exibe os campos correspondentes ao método de pagamento selecionado
    if (metodo === "pix") {
        // Exibe QR Code de Pix e opção para copiar código Pix
        html = '<div id="qr-pix">QR Code de Pix aqui</div>'; // Imagem ou código de QR Code
        html += '<button type="button" onclick="copiarCodigoPix()">Copiar código Pix</button>';
        btnFinalizar.style.display = "none"; // Não exibe o botão de finalizar para Pix
    } else if (metodo === "boleto") {
        // Exibe mensagem sobre boleto e botão de gerar boleto
        html = '<p>Pagamentos com boleto levam até 3 dias úteis para serem compensados.</p>';
        html += '<button type="button" id="btn-gerar-boleto" onclick="gerarBoleto()">Gerar Boleto</button>';
        btnFinalizar.style.display = "none"; // Não exibe o botão de finalizar para boleto
    } else if (metodo === "credito" || metodo === "debito") {
        // Exibe campos para Cartão de Crédito/Débito
        html = '<label for="num-cartao">Número do Cartão:</label><input type="text" id="num-cartao" name="num-cartao" placeholder="Digite o número do cartão" required>';
        html += '<label for="validade">Validade:</label><input type="text" id="validade" name="validade" placeholder="MM/AA" required>';
        html += '<label for="cvv">CVV:</label><input type="text" id="cvv" name="cvv" placeholder="Código de segurança" required>';
        
        // Exibe o botão de finalizar para Cartão de Crédito ou Cartão de Débito
        btnFinalizar.style.display = "inline-block";
    } else if (metodo === "bitcoin") {
        // Exibe QR Code de Bitcoin e opção para copiar código Bitcoin
        html = '<div id="qr-bitcoin">QR Code de Bitcoin aqui</div>';
        html += '<button type="button" onclick="copiarCodigoBitcoin()">Copiar código Bitcoin</button>';
        btnFinalizar.style.display = "none"; // Não exibe o botão de finalizar para Bitcoin
    }

    // Atualiza os campos do método de pagamento
    campoInfo.innerHTML = html;
}

function copiarCodigoPix() {
    // Ação para copiar código Pix (simulando o código de Pix)
    const codigoPix = "1234567890abcdef"; // Código Pix simulado
    navigator.clipboard.writeText(codigoPix).then(function() {
        alert("Código Pix copiado para a área de transferência!");
    }, function(err) {
        alert("Erro ao copiar o código Pix: " + err);
    });
}

function copiarCodigoBitcoin() {
    // Ação para copiar código Bitcoin (simulando o código de Bitcoin)
    const codigoBitcoin = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"; // Código Bitcoin simulado
    navigator.clipboard.writeText(codigoBitcoin).then(function() {
        alert("Código Bitcoin copiado para a área de transferência!");
    }, function(err) {
        alert("Erro ao copiar o código Bitcoin: " + err);
    });
}

function gerarBoleto() {
    // Exemplo de ação ao gerar boleto
    alert("Boleto gerado com sucesso!");
}

function verificarPreenchimento() {
    const nome = dadosPessoais.nome;
    const cpf = dadosPessoais.cpf;
    const email = dadosPessoais.email;
    const metodoSelecionado = metodoPagamento;
    const btnFinalizar = document.getElementById("btn-finalizar");

    // Verifica se os campos de pagamento estão preenchidos corretamente
    if (nome && cpf && email && metodoSelecionado) {
        btnFinalizar.style.display = "inline-block"; // Exibe o botão de finalizar compra
    } else {
        btnFinalizar.style.display = "none"; // Esconde o botão se não estiver tudo preenchido
    }
}
