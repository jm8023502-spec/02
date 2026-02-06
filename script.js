// Dados do cardápio
const menuItems = [
    {
        name: "Pamonha Doce Tradicional",
        price: "R$ 8,50",
        description: "Pamonha doce feita com milho fresco, leite de coco e açúcar cristal. Receita tradicional da família.",
        tags: ["vegetariano", "tradicional"],
        category: "vegetariano"
    },
    {
        name: "Pamonha Doce com Coco",
        price: "R$ 9,50",
        description: "Nossa pamonha doce especial com coco ralado fresco e leite condensado.",
        tags: ["vegetariano", "coco"],
        category: "vegetariano"
    },
    {
        name: "Pamonha Salgada com Queijo",
        price: "R$ 10,00",
        description: "Pamonha salgada recheada com queijo coalho derretido e temperos especiais.",
        tags: ["queijo", "salgada"],
        category: "salgada"
    },
    {
        name: "Pamonha Salgada com Frango",
        price: "R$ 12,00",
        description: "Pamonha salgada com frango desfiado temperado e legumes frescos.",
        tags: ["frango", "proteína"],
        category: "salgada"
    },
    {
        name: "Suco de Açaí",
        price: "R$ 6,00",
        description: "Suco natural de açaí batido com guaraná e açúcar. Refrescante e energético.",
        tags: ["natural", "açaí", "energético"],
        category: "bebidas"
    },
    {
        name: "Água de Coco Gelada",
        price: "R$ 4,50",
        description: "Água de coco natural, gelada e refrescante. Direto do coco verde.",
        tags: ["natural", "refrescante"],
        category: "bebidas"
    },
    {
        name: "Pudim de Tapioca",
        price: "R$ 7,00",
        description: "Sobremesa tradicional feita com tapioca, leite de coco e açúcar mascavo.",
        tags: ["tradicional", "tapioca"],
        category: "sobremesas"
    },
    {
        name: "Cocada Queimada",
        price: "R$ 5,50",
        description: "Cocada artesanal queimada no ponto certo, doce tradicional amazônico.",
        tags: ["coco", "artesanal"],
        category: "sobremesas"
    }
];

// Dados da galeria com as imagens reais
const galleryImages = [
    {
        title: "Bolo de Cupuaçu",
        description: "O sabor capaz de arrancar suspiros!",
        image: "./images/bolo-cupuacu.jpg"
    },
    {
        title: "Prato Executivo",
        description: "Refeição completa com arroz, salada e molho especial",
        image: "./images/prato-executivo.jpg"
    },
    {
        title: "Hambúrguer Artesanal",
        description: "Pão tostado com hambúrguer suculento",
        image: "./images/hamburguer.jpg"
    },
    {
        title: "Suco Verde Detox",
        description: "Refrescante e saudável com abacaxi e couve",
        image: "./images/suco-verde.jpg"
    },
    {
        title: "Café Especial",
        description: "Café cremoso preparado com carinho",
        image: "./images/cafe.jpg"
    },
    {
        title: "Tapioca Recheada",
        description: "Tapioca quentinha e saborosa",
        image: "./images/tapioca.jpg"
    },
    {
        title: "Pamonha Tradicional",
        description: "Nossa deliciosa pamonha com coco ralado",
        image: "./images/pamonha.jpg"
    }
];

let currentImageIndex = 0;

// Função para criar card do item
function createMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.dataset.category = item.category;
    menuItem.setAttribute('role', 'listitem');
    menuItem.setAttribute('tabindex', '0');
    menuItem.style.cursor = 'pointer';
    
    menuItem.innerHTML = `
        <div class="menu-item-header">
            <h3>${item.name}</h3>
            <span class="price" aria-label="Preço: ${item.price}">${item.price}</span>
        </div>
        <p>${item.description}</p>
        <div class="tags" aria-label="Categorias">
            ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="whatsapp-order">
            <span>💬 Clique para pedir pelo WhatsApp</span>
        </div>
    `;
    
    // Redirecionar para WhatsApp ao clicar
    const handleOrder = function() {
        const message = `Olá! Gostaria de pedir: *${item.name}* (${item.price})`;
        const whatsappUrl = `https://wa.me/5592981570727?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
    menuItem.addEventListener('click', handleOrder);
    menuItem.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOrder();
        }
    });
    
    return menuItem;
}

// Renderizar menu
function renderMenu(filter = 'all') {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    const filteredItems = filter === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === filter);
    
    filteredItems.forEach(item => {
        menuGrid.appendChild(createMenuItem(item));
    });
    
    // Animação de entrada
    const items = menuGrid.querySelectorAll('.menu-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Filtros
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Atualizar estado aria-pressed para acessibilidade
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        
        const filter = this.dataset.filter;
        renderMenu(filter);
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Função para criar item da galeria
function createGalleryItem(item, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('tabindex', '0');
    galleryItem.setAttribute('role', 'button');
    galleryItem.setAttribute('aria-label', `Ver imagem: ${item.title}`);
    
    galleryItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;
    
    // Abrir modal ao clicar
    galleryItem.addEventListener('click', () => openModal(index));
    galleryItem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(index);
        }
    });
    
    return galleryItem;
}

// Renderizar galeria
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((item, index) => {
        galleryGrid.appendChild(createGalleryItem(item, index));
    });
}

// Criar modal
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.id = 'galleryModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Visualização de imagem em tamanho grande');
    
    modal.innerHTML = `
        <button class="modal-nav modal-prev" aria-label="Imagem anterior">‹</button>
        <div class="modal-content">
            <button class="modal-close" aria-label="Fechar modal">&times;</button>
            <img src="" alt="" id="modalImage">
            <div class="modal-info">
                <h3 id="modalTitle"></h3>
                <p id="modalDescription"></p>
            </div>
        </div>
        <button class="modal-nav modal-next" aria-label="Próxima imagem">›</button>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners do modal
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-prev').addEventListener('click', () => navigateModal(-1));
    modal.querySelector('.modal-next').addEventListener('click', () => navigateModal(1));
    
    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigateModal(-1);
        if (e.key === 'ArrowRight') navigateModal(1);
    });
    
    // Suporte para gestos de swipe em mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modalContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - próxima imagem
                navigateModal(1);
            } else {
                // Swipe right - imagem anterior
                navigateModal(-1);
            }
        }
    }
}

// Abrir modal
function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('galleryModal');
    const item = galleryImages[index];
    
    document.getElementById('modalImage').src = item.image;
    document.getElementById('modalImage').alt = item.title;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalDescription').textContent = item.description;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Navegar no modal
function navigateModal(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    const item = galleryImages[currentImageIndex];
    document.getElementById('modalImage').src = item.image;
    document.getElementById('modalImage').alt = item.title;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalDescription').textContent = item.description;
}

// Inicializar
renderMenu();
renderGallery();
createModal();

// Destacar botão de navegação ativo baseado na rolagem
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 100; // Offset para o header fixo
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Adicionar listener de scroll com throttle para performance
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
        highlightActiveSection();
    });
});

// Chamar uma vez ao carregar
highlightActiveSection();

// Verificar status de funcionamento (Aberto/Fechado)
function updateBusinessStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;
    
    const statusIndicator = document.getElementById('statusIndicator');
    if (!statusIndicator) return;
    
    let isOpen = false;
    
    // Segunda a Sexta (1-5): 8h - 19h
    if (day >= 1 && day <= 5) {
        if (currentTime >= 8 && currentTime < 19) {
            isOpen = true;
        }
    }
    // Sábado (6): 8h - 14h
    else if (day === 6) {
        if (currentTime >= 8 && currentTime < 14) {
            isOpen = true;
        }
    }
    // Domingo (0): Fechado
    
    if (isOpen) {
        statusIndicator.innerHTML = '<span class="status-open">🟢 Aberto agora</span>';
        statusIndicator.className = 'status-indicator open';
    } else {
        statusIndicator.innerHTML = '<span class="status-closed">🔴 Fechado agora</span>';
        statusIndicator.className = 'status-indicator closed';
    }
}

// Atualizar status ao carregar e a cada minuto
updateBusinessStatus();
setInterval(updateBusinessStatus, 60000); // Atualiza a cada 1 minuto

// Animação da tela de carregamento
let progress = 0;
const loadingPercentage = document.querySelector('.loading-percentage');
const loadingScreen = document.getElementById('loadingScreen');

const progressInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    if (loadingPercentage) {
        loadingPercentage.textContent = Math.floor(progress) + '%';
    }
    
    if (progress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 500);
    }
}, 200);
