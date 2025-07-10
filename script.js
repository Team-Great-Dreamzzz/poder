// Activar modo oscuro por defecto
document.body.classList.add('dark');
// Desplazamiento al contenido
function scrollToContent() {
  document.getElementById('contenido').scrollIntoView({ behavior: 'smooth' });
}
// Modo oscuro/claro
const toggleBtn = document.getElementById('toggle-dark');
const icon = toggleBtn.querySelector('i');

function alternarModoOscuro() {
  document.body.classList.toggle('dark');

  // Cambiar ícono
  if (document.body.classList.contains('dark')) {
    icon.classList.replace('fa-sun', 'fa-moon');
  } else {
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  // Animación visual
  toggleBtn.classList.add('animate');
  setTimeout(() => toggleBtn.classList.remove('animate'), 500);
}

toggleBtn.addEventListener('click', alternarModoOscuro);

// Establecer ícono correcto al cargar
document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('dark')) {
    icon.classList.replace('fa-moon', 'fa-sun');
  }
});


// FAQ animado
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    answer.classList.toggle('open');
  });
});

// Mostrar secciones al hacer scroll
const sections = document.querySelectorAll('main section, .scroll-left, .scroll-right, .scroll-top, .scroll-bottom');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => observer.observe(section));

//Lanzar gatitos función

function lanzarGatito() {
  const track = document.getElementById('gatoTrack');
  const gato = document.createElement('img');

  const caminando = [
    'gato1.gif', 'gato2.gif', 'gato3.gif',
    'gato4.gif', 'gato5.gif', 'gato6.gif'
  ];
  const sentados = [
    'gato1_sit.gif', 'gato2_sit.gif', 'gato3_sit.gif',
    'gato4_sit.gif', 'gato5_sit.gif', 'gato6_sit.gif'
  ];

  const i = Math.floor(Math.random() * caminando.length);
  const archivoCaminar = caminando[i];
  const archivoSentado = sentados[i];

  const haciaDerecha = Math.random() < 0.5;
  const duracion = 5 + Math.random() * 5;
  const pausa = 1500 + Math.random() * 500;

  const startX = haciaDerecha ? -60 : window.innerWidth + 60;
  const endX = haciaDerecha ? window.innerWidth + 60 : -60;

  // Gato visible
  gato.src = `assets/${archivoCaminar}`;
  gato.classList.add('gato');
  gato.style.left = '0px';
  gato.style.transform = `scaleX(${haciaDerecha ? 1 : -1})`;

  track.appendChild(gato);

  const tl = gsap.timeline();

  // Movimiento completo
  tl.fromTo(gato,
    { x: startX },
    {
      x: startX + (endX - startX) * 0.3,
      duration: duracion * 0.3,
      ease: 'linear'
    }
  );

  // Pausa opcional con gato sentado
  if (Math.random() < 0.5) {
    tl.add(() => {
      gato.src = `assets/${archivoSentado}`;
    });
    tl.to({}, { duration: pausa / 1000 });
    tl.add(() => {
      gato.src = `assets/${archivoCaminar}`;
    });
  }

  // Continuación del recorrido
  tl.to(gato, {
    x: endX,
    duration: duracion * 0.7,
    ease: 'linear',
    onComplete: () => gato.remove()
  });
}


// Lanzar gatitos aleatorios cada cierto tiempo
setInterval(lanzarGatito, 2500);

//botón descarga
const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', () => {
  downloadBtn.classList.add('shrinking');

  setTimeout(() => {
    downloadBtn.classList.add('success');
    downloadBtn.innerHTML = '<i class="fas fa-check"></i>';

    const enlace = document.createElement('a');
    enlace.href = 'assets/Documentacion_Extendida_ProgramyX.docx';
    enlace.download = 'Documentacion_Extendida_ProgramyX.docx';
    enlace.click();
  }, 400);

  setTimeout(() => {
    downloadBtn.innerHTML = '<i class="fas fa-download"></i><span>Documentación extendida</span>';
    downloadBtn.classList.remove('success');

    // Agrega clase de restauración suave
    downloadBtn.classList.add('restoring');

    // Luego de que la transición se vea, limpia clases
    setTimeout(() => {
      downloadBtn.classList.remove('shrinking', 'restoring');
    }, 400);
  }, 1900);
});
// Visor de imágenes - Versión definitiva
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-visor');
  const track = document.querySelector('.carousel-track-visor');
  const items = document.querySelectorAll('.carousel-visor-list img');
  const btnPrev = document.querySelector('.carousel-btn.left');
  const btnNext = document.querySelector('.carousel-btn.right');
  
  let currentIndex = 0;
  const itemCount = items.length;
  const itemWidth = 860; // Ancho fijo de las imágenes
  const gap = 32; // Espacio entre imágenes (2rem)

  // Inicializar el carrusel
  function initCarousel() {
    // Ajustar el ancho del track para contener todas las imágenes
    track.style.width = `${(itemWidth + gap) * itemCount - gap}px`;
    
    // Posicionar las imágenes correctamente
    positionItems();
    updateCarousel();
  }

  // Posicionar las imágenes en el track
  function positionItems() {
    items.forEach((item, index) => {
      const position = index * (itemWidth + gap);
      item.style.left = `${position}px`;
      item.style.transform = 'scale(0.75)';
      item.style.opacity = '0.3';
      item.style.zIndex = '1';
    });

    // Imagen activa (centro)
    items[currentIndex].style.transform = 'scale(1)';
    items[currentIndex].style.opacity = '1';
    items[currentIndex].style.zIndex = '3';

    // Imagen previa (izquierda)
    const prevIndex = (currentIndex - 1 + itemCount) % itemCount;
    items[prevIndex].style.transform = 'scale(0.8)';
    items[prevIndex].style.opacity = '0.6';
    items[prevIndex].style.zIndex = '2';

    // Imagen siguiente (derecha)
    const nextIndex = (currentIndex + 1) % itemCount;
    items[nextIndex].style.transform = 'scale(0.8)';
    items[nextIndex].style.opacity = '0.6';
    items[nextIndex].style.zIndex = '2';
  }

  // Actualizar el carrusel
  function updateCarousel() {
    // Calcular la posición de desplazamiento para centrar la imagen activa
    const scrollPosition = currentIndex * (itemWidth + gap) - (track.parentElement.offsetWidth / 2) + (itemWidth / 2);
    
    track.style.transform = `translateX(${-scrollPosition}px)`;
    positionItems();
  }

  // Navegación
  function goToPrev() {
    currentIndex = (currentIndex - 1 + itemCount) % itemCount;
    updateCarousel();
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % itemCount;
    updateCarousel();
  }

  // Event listeners
  btnPrev.addEventListener('click', goToPrev);
  btnNext.addEventListener('click', goToNext);

  // Inicializar el carrusel
  initCarousel();

  // Opcional: Auto-avance cada 5 segundos
  let autoSlideInterval = setInterval(goToNext, 5000);

  // Pausar auto-avance al interactuar
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  carousel.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(goToNext, 5000);
  });

  // Opcional: Soporte para touch
  let touchStartX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoSlideInterval);
  }, {passive: true});

  track.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    if (diff > 50) goToNext(); // Deslizar izquierda
    if (diff < -50) goToPrev(); // Deslizar derecha
    
    autoSlideInterval = setInterval(goToNext, 5000);
  }, {passive: true});
});