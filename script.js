let currentSection = 0;
const sections = Array.from(document.querySelectorAll('section'));
const footer = document.querySelector('footer');

function showSection(index) {
    sections.forEach((section, i) => {
        section.classList.toggle('active', i === index);
    });
    
    // Mostrar footer apenas na última seção
    footer.classList.toggle('visible', index === sections.length - 1);
}

document.querySelectorAll('.nav-links a').forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentSection = index;
        showSection(currentSection);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentSection < sections.length - 1) {
            sections[currentSection].classList.remove('active');
            currentSection++;
            sections[currentSection].classList.add('active');
            updateActiveNav();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentSection > 0) {
            sections[currentSection].classList.remove('active');
            currentSection--;
            sections[currentSection].classList.add('active');
            updateActiveNav();
        }
    }

    // Atualizar footer
    footer.classList.toggle('visible', currentSection === sections.length - 1);
});

// Garantir ordem correta das seções
sections.sort((a, b) => {
    return Array.from(a.parentNode.children).indexOf(a) - Array.from(b.parentNode.children).indexOf(b);
});

function typeWriter() {
    const text = "Hey, I'm Gabriel";
    const elem = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    let i = 0;
    
    elem.innerHTML = '';
    cursor.style.opacity = '1';

    function type() {
        if (i < text.length) {
            elem.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 150);
        } else {
            cursor.style.animation = 'blink 0.7s infinite';
        }
    }
    
    type();
}

// Executar ao carregar
window.addEventListener('load', typeWriter);

// Reiniciar ao clicar em Home
document.querySelector('a[href="#home"]').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Mostrar seção home
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById('home').classList.add('active');
    
    // Atualizar navegação
    updateActiveNav();
});

// Inicialização
showSection(0);