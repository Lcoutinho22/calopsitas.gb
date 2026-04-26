// --- ANIMAÇÃO SCROLL (REVEAL) ---
        document.addEventListener("DOMContentLoaded", () => {
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        });

        // --- COMPARTILHAMENTO ---
        function toggleShare() {
            document.getElementById('shareWrapper').classList.toggle('active');
        }

        document.addEventListener('click', function(event) {
            const wrapper = document.getElementById('shareWrapper');
            if (!wrapper.contains(event.target)) {
                wrapper.classList.remove('active');
            }
        });

        function shareTo(platform) {
            const currentUrl = encodeURIComponent(window.location.href);
            let shareUrl = '';

            if (platform === 'whatsapp') {
                shareUrl = `https://api.whatsapp.com/send?text=Olha que incrível este criatório de Calopsitas: ${currentUrl}`;
                window.open(shareUrl, '_blank');
            } else if (platform === 'facebook') {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
                window.open(shareUrl, '_blank', 'width=600,height=400');
            } else if (platform === 'tiktok') {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert("Link copiado! Você pode colar onde quiser.");
                });
            }
            document.getElementById('shareWrapper').classList.remove('active');
        }

        // --- TROCA DE TEMA COM TROCA DE LOGO ---
        function toggleTheme() {
            const body = document.body;
            const icon = document.querySelector('.theme-toggle i');
            const logoImage = document.getElementById('logo-image'); // Localiza a logo
            body.classList.toggle('light-theme');
            
            if (body.classList.contains('light-theme')) {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme-calopsitas', 'light');
                logoImage.src = '../image/logo-branca.jpeg'; // Troca para a logo de tema claro
            } else {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme-calopsitas', 'dark');
                logoImage.src = '../image/logo-preta.jpeg'; // Troca para a logo de tema escuro
            }
        }

        // Verifica preferência salva e define a logo inicial
        if (localStorage.getItem('theme-calopsitas') === 'light') {
            document.body.classList.add('light-theme');
            document.querySelector('.theme-toggle i').classList.replace('fa-sun', 'fa-moon');
            document.getElementById('logo-image').src = 'image_2.png'; // Garante a logo correta ao carregar
        }

        // --- WHATSAPP FUNCTIONS ---
        const numeroZap = "5511932000154"; // Substituir pelo número real

        function abrirWhatsApp(assunto) {
            const msg = encodeURIComponent(`Olá Calopsitas GB! Tenho interesse em saber mais sobre: *${assunto}*.`);
            window.open(`https://wa.me/${numeroZap}?text=${msg}`, '_blank');
        }

        function enviarFormulario(event) {
            event.preventDefault(); 
            const interesse = document.getElementById('interesse').value;
            const nome = document.getElementById('nome').value;
            const cidade = document.getElementById('cidade').value;
            const experiencia = document.getElementById('experiencia').value;
            const sexo = document.getElementById('sexo').value;
            const mensagem = document.getElementById('mensagem').value || 'Sem preferências específicas.';

            const textoBase = `Olá Calopsitas GB! Vim pelo site.%0A%0A*--- MEUS DADOS ---*%0A*Nome:* ${nome}%0A*Cidade:* ${cidade}%0A*Já teve ave?:* ${experiencia}%0A*Interesse:* ${interesse}%0A*Preferência:* ${sexo}%0A%0A*--- MENSAGEM ---*%0A${mensagem}`;
            
            window.open(`https://wa.me/${numeroZap}?text=${textoBase}`, '_blank');
        }

        // --- ACORDEÃO (FAQ) ---
        document.querySelectorAll('.faq-btn').forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.parentElement;
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) item.classList.remove('active');
                });
                faqItem.classList.toggle('active');
            });
        });