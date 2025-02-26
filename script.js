document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;  // Se o alvo não existir, não faz nada
            
            const targetPosition = targetElement.offsetTop;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 2000; // Tempo de duração da animação
            let startTime = null;

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return (c / 2) * t * t + b;
                t--;
                return (-c / 2) * (t * (t - 2) - 1) + b;
            }

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);  // Corrigido: garantimos que a rolagem aconteça para cima
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);
        });
    });
});










(function(){
    emailjs.init("ypOMFcrv23rFsgZlJ");  // Substitua pelo seu USER_ID do EmailJS
})();

document.getElementById("enviar").addEventListener("click", function(event) {
    event.preventDefault();  // Evita o comportamento padrão do botão (caso esteja em um formulário)
    
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem").value;

    if (!nome || !email || !mensagem) {
        alert("Preencha todos os campos!");
        return;
    }

    let templateParams = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };

    emailjs.send("service_nwn8vqo", "template_z5u79oj", templateParams)
        .then(function(response) {
            alert("Mensagem enviada com sucesso!");
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            document.getElementById("mensagem").value = "";
        }, function(error) {
            console.error("Erro ao enviar a mensagem:", error);  // Adicione um log mais detalhado
            alert("Falha ao enviar a mensagem. Tente novamente.");
        });
});