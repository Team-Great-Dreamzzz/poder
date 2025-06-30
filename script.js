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
    enlace.href = 'assets/Documentacion_Extendida_ProgramyX_AU.docx';
    enlace.download = 'Documentacion_Extendida_ProgramyX_AU.docx';
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
