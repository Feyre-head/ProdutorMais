// Aplicativo Produtor +
class ProdutorPlusApp {
    constructor() {
        this.currentScreen = 'education';
        this.cattleData = JSON.parse(localStorage.getItem('cattleData')) || [];
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupEducationModule();
        this.setupResultsModule();
        this.setupFinancialModule();
        this.setupCattleModule();
        this.loadSavedData();
    }

    // Sistema de Navegação
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const screens = document.querySelectorAll('.screen');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetScreen = button.dataset.screen;
                this.switchScreen(targetScreen);
                
                // Atualizar botões ativos
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    switchScreen(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
            
            // Animações específicas por tela
            this.animateScreenEntry(screenId);
        }
    }

    animateScreenEntry(screenId) {
        const screen = document.getElementById(screenId);
        screen.style.opacity = '0';
        screen.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            screen.style.transition = 'all 0.3s ease';
            screen.style.opacity = '1';
            screen.style.transform = 'translateY(0)';
        }, 50);
    }

    // Módulo de Educação
    setupEducationModule() {
        // Vídeo placeholder
        const videoPlaceholder = document.querySelector('.video-placeholder');
        if (videoPlaceholder) {
            videoPlaceholder.addEventListener('click', () => {
                this.playVideo();
            });
        }

        // Checklist interativo
        const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateProgress();
                this.saveProgress();
            });
        });

        // Botão próximo conteúdo
        const nextButton = document.querySelector('#education .btn-primary');
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                this.nextContent();
            });
        }
    }

    playVideo() {
        const videoContainer = document.querySelector('.video-placeholder');
        videoContainer.innerHTML = `
            <div style="background: #000; border-radius: 8px; padding: 2rem; color: white; text-align: center;">
                <i class="fas fa-play" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Reproduzindo: Fundamentos da Nutrição Bovina</p>
                <div style="background: #333; height: 4px; border-radius: 2px; margin: 1rem 0;">
                    <div style="background: #4CAF50; height: 100%; width: 0%; border-radius: 2px; transition: width 2s ease;" id="videoProgress"></div>
                </div>
                <p style="font-size: 0.8rem; color: #ccc;">Simulação de vídeo em andamento...</p>
            </div>
        `;

        // Simular progresso do vídeo
        setTimeout(() => {
            const progress = document.getElementById('videoProgress');
            if (progress) {
                progress.style.width = '100%';
            }
        }, 500);

        // Restaurar após 5 segundos
        setTimeout(() => {
            videoContainer.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #4CAF50; margin-bottom: 1rem;"></i>
                <p style="color: #4CAF50; font-weight: bold;">Vídeo concluído!</p>
                <span class="duration">8:30 min</span>
            `;
        }, 5000);
    }

    updateProgress() {
        const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
        const checkedBoxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked');
        const progressFill = document.querySelector('.progress-fill');
        
        const baseProgress = 30; // 3/10 módulos já completos
        const checklistProgress = (checkedBoxes.length / checkboxes.length) * 10; // 10% adicional para checklist
        const totalProgress = Math.min(baseProgress + checklistProgress, 100);
        
        if (progressFill) {
            progressFill.style.width = `${totalProgress}%`;
        }

        // Atualizar texto do progresso
        const progressInfo = document.querySelector('.progress-info span:last-child');
        if (progressInfo && checkedBoxes.length === checkboxes.length) {
            progressInfo.textContent = '4/10 módulos';
        }
    }

    nextContent() {
        this.showNotification('Próximo módulo desbloqueado!', 'success');
        // Simular carregamento do próximo conteúdo
        setTimeout(() => {
            this.switchScreen('results');
        }, 1000);
    }

    // Módulo de Resultados
    setupResultsModule() {
        const compareButton = document.querySelector('#results .btn-secondary');
        if (compareButton) {
            compareButton.addEventListener('click', () => {
                this.showDetailedResults();
            });
        }

        // Animar gráficos quando a tela for exibida
        this.animateCharts();
    }

    animateCharts() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateBarChart();
                    this.animateHealthMetrics();
                }
            });
        });

        const resultsSection = document.getElementById('results');
        if (resultsSection) {
            observer.observe(resultsSection);
        }
    }

    animateBarChart() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transform = 'scaleY(0)';
                bar.style.transformOrigin = 'bottom';
                bar.style.transition = 'transform 0.8s ease';
                
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1)';
                }, 100);
            }, index * 200);
        });
    }

    animateHealthMetrics() {
        const healthFills = document.querySelectorAll('.health-fill');
        healthFills.forEach((fill, index) => {
            setTimeout(() => {
                const targetWidth = fill.style.width;
                fill.style.width = '0%';
                fill.style.transition = 'width 1s ease';
                
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 100);
            }, index * 300);
        });
    }

    showDetailedResults() {
        const modal = this.createModal('Comparação Detalhada', `
            <div style="text-align: center;">
                <h4 style="color: var(--primary-color); margin-bottom: 1rem;">Evolução nos últimos 3 meses</h4>
                <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px;">
                        <strong>Produção de Leite:</strong><br>
                        <span style="color: #666;">Antes: 180L/dia</span><br>
                        <span style="color: #4CAF50;">Depois: 221L/dia (+23%)</span>
                    </div>
                    <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px;">
                        <strong>Qualidade do Leite:</strong><br>
                        <span style="color: #666;">Antes: 3.2% gordura</span><br>
                        <span style="color: #4CAF50;">Depois: 3.8% gordura (+19%)</span>
                    </div>
                    <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px;">
                        <strong>Saúde do Rebanho:</strong><br>
                        <span style="color: #666;">Antes: 78% vacinação</span><br>
                        <span style="color: #4CAF50;">Depois: 95% vacinação (+22%)</span>
                    </div>
                </div>
                <p style="color: #666; font-size: 0.9rem;">
                    Estes resultados são baseados na aplicação dos conhecimentos adquiridos nos módulos educacionais.
                </p>
            </div>
        `);
    }

    // Módulo Financeiro
    setupFinancialModule() {
        const advancedButton = document.querySelector('#financial .btn-primary');
        const shareButton = document.querySelector('#financial .btn-share');

        if (advancedButton) {
            advancedButton.addEventListener('click', () => {
                this.showAdvancedContent();
            });
        }

        if (shareButton) {
            shareButton.addEventListener('click', () => {
                this.shareEvolution();
            });
        }

        // Animar valor de receita
        this.animateRevenueValue();
    }

    animateRevenueValue() {
        const revenueValue = document.querySelector('.revenue-value');
        if (revenueValue) {
            const targetValue = 1250;
            let currentValue = 0;
            const increment = targetValue / 50;
            
            const animation = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(animation);
                }
                revenueValue.textContent = `+R$ ${Math.floor(currentValue).toLocaleString('pt-BR')}`;
            }, 50);
        }
    }

    showAdvancedContent() {
        const modal = this.createModal('Conteúdo Avançado', `
            <div style="text-align: center;">
                <h4 style="color: var(--primary-color); margin-bottom: 1rem;">Módulos Avançados Disponíveis</h4>
                <div style="display: grid; gap: 1rem; text-align: left;">
                    <div style="border: 1px solid #ddd; padding: 1rem; border-radius: 8px;">
                        <strong>🧬 Genética e Melhoramento</strong><br>
                        <small>Seleção de reprodutores e técnicas de IA</small>
                    </div>
                    <div style="border: 1px solid #ddd; padding: 1rem; border-radius: 8px;">
                        <strong>📊 Gestão Financeira Avançada</strong><br>
                        <small>Análise de custos e margem de lucro</small>
                    </div>
                    <div style="border: 1px solid #ddd; padding: 1rem; border-radius: 8px;">
                        <strong>🌱 Sustentabilidade</strong><br>
                        <small>Práticas sustentáveis e certificações</small>
                    </div>
                    <div style="border: 1px solid #ddd; padding: 1rem; border-radius: 8px;">
                        <strong>🤖 Tecnologia na Pecuária</strong><br>
                        <small>IoT, sensores e automação</small>
                    </div>
                </div>
                <p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">
                    Desbloqueie estes módulos completando os módulos básicos!
                </p>
            </div>
        `);
    }

    shareEvolution() {
        if (navigator.share) {
            navigator.share({
                title: 'Minha evolução no Produtor +',
                text: 'Aumentei minha produção em 23% e meu faturamento em R$ 1.250/mês com o Produtor +!',
                url: window.location.href
            });
        } else {
            // Fallback para dispositivos que não suportam Web Share API
            const text = 'Aumentei minha produção em 23% e meu faturamento em R$ 1.250/mês com o Produtor +!';
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Texto copiado para a área de transferência!', 'success');
            });
        }
    }

    // Módulo de Cadastro do Rebanho
    setupCattleModule() {
        const form = document.getElementById('cattleForm');
        const photoUpload = document.querySelector('.photo-placeholder');
        const photoInput = document.getElementById('animalPhoto');
        const duplicateButton = document.querySelector('.btn-secondary');

        // Upload de foto
        if (photoUpload && photoInput) {
            photoUpload.addEventListener('click', () => {
                photoInput.click();
            });

            photoInput.addEventListener('change', (e) => {
                this.handlePhotoUpload(e);
            });
        }

        // Formulário
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveCattleData();
            });
        }

        // Botão duplicar
        if (duplicateButton) {
            duplicateButton.addEventListener('click', () => {
                this.duplicateLastEntry();
            });
        }

        // Validação em tempo real
        this.setupFormValidation();
    }

    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const photoPlaceholder = document.querySelector('.photo-placeholder');
                photoPlaceholder.innerHTML = `
                    <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                    <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem;">
                        <i class="fas fa-camera"></i>
                    </div>
                `;
                photoPlaceholder.style.position = 'relative';
            };
            reader.readAsDataURL(file);
        }
    }

    setupFormValidation() {
        const requiredFields = document.querySelectorAll('input[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
        });
    }

    validateField(field) {
        const isValid = field.value.trim() !== '';
        if (isValid) {
            field.style.borderColor = 'var(--success-color)';
        } else {
            field.style.borderColor = 'var(--error-color)';
        }
    }

    saveCattleData() {
        const formData = new FormData(document.getElementById('cattleForm'));
        const data = {};
        
        // Coletar dados do formulário
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Adicionar dados dos radio buttons
        const lactationStatus = document.querySelector('input[name="lactationStatus"]:checked');
        const reproductiveStatus = document.querySelector('input[name="reproductiveStatus"]:checked');
        
        data.lactationStatus = lactationStatus ? lactationStatus.value : '';
        data.reproductiveStatus = reproductiveStatus ? reproductiveStatus.value : '';
        data.id = Date.now(); // ID único
        data.createdAt = new Date().toISOString();

        // Salvar no localStorage
        this.cattleData.push(data);
        localStorage.setItem('cattleData', JSON.stringify(this.cattleData));

        this.showNotification('Animal cadastrado com sucesso!', 'success');
        this.resetForm();
        this.updateCattleStats();
    }

    duplicateLastEntry() {
        if (this.cattleData.length === 0) {
            this.showNotification('Nenhum animal cadastrado para duplicar.', 'warning');
            return;
        }

        const lastEntry = this.cattleData[this.cattleData.length - 1];
        const form = document.getElementById('cattleForm');
        
        // Preencher formulário com dados do último animal
        Object.keys(lastEntry).forEach(key => {
            const field = form.querySelector(`[name="${key}"], #${key}`);
            if (field && key !== 'id' && key !== 'createdAt' && key !== 'animalId') {
                if (field.type === 'radio') {
                    const radioButton = form.querySelector(`input[name="${key}"][value="${lastEntry[key]}"]`);
                    if (radioButton) radioButton.checked = true;
                } else {
                    field.value = lastEntry[key];
                }
            }
        });

        // Limpar campos únicos
        document.getElementById('animalId').value = '';
        document.getElementById('animalName').value = '';
        
        this.showNotification('Dados duplicados! Ajuste os campos únicos.', 'info');
    }

    resetForm() {
        const form = document.getElementById('cattleForm');
        form.reset();
        
        // Resetar foto
        const photoPlaceholder = document.querySelector('.photo-placeholder');
        photoPlaceholder.innerHTML = `
            <i class="fas fa-camera"></i>
            <p>Tirar foto ou selecionar</p>
        `;
        
        // Resetar estilos de validação
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.style.borderColor = 'var(--border)';
        });
    }

    updateCattleStats() {
        // Atualizar estatísticas do rebanho na tela de resultados
        const totalAnimals = this.cattleData.length;
        const lactatingAnimals = this.cattleData.filter(animal => 
            animal.lactationStatus === 'lactating'
        ).length;

        // Atualizar interface se necessário
        console.log(`Total de animais: ${totalAnimals}, Em lactação: ${lactatingAnimals}`);
    }

    // Utilitários
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 1rem;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                border-radius: 16px;
                padding: 2rem;
                max-width: 500px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
            ">
                <button style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                " onclick="this.closest('.modal').remove()">×</button>
                <h3 style="margin-bottom: 1.5rem; color: var(--primary-color);">${title}</h3>
                ${content}
            </div>
        `;

        modal.className = 'modal';
        document.body.appendChild(modal);

        // Fechar ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        return modal;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: '#4CAF50',
            error: '#F44336',
            warning: '#FF9800',
            info: '#2196F3'
        };

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 1rem;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        notification.textContent = message;
        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    saveProgress() {
        const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
        const progress = {};
        
        checkboxes.forEach(checkbox => {
            progress[checkbox.id] = checkbox.checked;
        });
        
        localStorage.setItem('educationProgress', JSON.stringify(progress));
    }

    loadSavedData() {
        // Carregar progresso da educação
        const savedProgress = localStorage.getItem('educationProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            Object.keys(progress).forEach(id => {
                const checkbox = document.getElementById(id);
                if (checkbox) {
                    checkbox.checked = progress[id];
                }
            });
            this.updateProgress();
        }

        // Atualizar estatísticas do rebanho
        this.updateCattleStats();
    }
}

// Inicializar aplicativo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ProdutorPlusApp();
});

// Service Worker para funcionalidade offline (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}

