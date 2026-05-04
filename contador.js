function atualizarContador() {
        // Data de início: 25 de Março de 2026
        const dataInicio = new Date(2026, 2, 25); 
        const agora = new Date();
        
        let diff = agora - dataInicio;

        if (diff < 0) {
            document.getElementById('display-contador').innerHTML = "A data ainda não chegou!";
            return;
        }

        // Cálculos detalhados
        let anos = agora.getFullYear() - dataInicio.getFullYear();
        let meses = agora.getMonth() - dataInicio.getMonth();
        let dias = agora.getDate() - dataInicio.getDate();

        // Ajuste de meses/anos
        if (meses < 0) {
            anos--;
            meses += 12;
        }
        
        // Ajuste de dias
        if (dias < 0) {
            meses--;
            const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
            dias += ultimoDiaMesAnterior;
        }

        // Somar anos aos meses para ter o total de meses
        const totalMeses = (anos * 12) + meses;
        
        const horas = agora.getHours();
        const minutos = agora.getMinutes();
        const segundos = agora.getSeconds();

        // Monta a frase formatada
        document.getElementById('display-contador').innerHTML = 
            `${totalMeses} meses, ${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
    }

    // Atualiza a cada 1 segundo para você ver o tempo mudando
    setInterval(atualizarContador, 1000);
    
    // Executa imediatamente ao abrir
    atualizarContador();