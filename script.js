document.addEventListener("DOMContentLoaded", () => {
  // ================== MENU RESPONSIVO ==================
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navbar.classList.toggle("active");
  });

  document.querySelectorAll(".menu li a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const section = document.getElementById(targetId);

      section.scrollIntoView({ behavior: "smooth" });
      menuToggle.classList.remove("active");
      navbar.classList.remove("active");
    });
  });

  // ================== BOTÃO VOLTAR AO TOPO ==================
  const topButton = document.getElementById("topButton");
  window.addEventListener("scroll", () => {
    topButton.style.display = window.scrollY > 300 ? "block" : "none";
  });
  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ================== ANIMAÇÃO FADE-IN ==================
  const faders = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  faders.forEach(el => observer.observe(el));

  // ================== CARROSSEL DE FOTOS ==================
  const track = document.querySelector(".carousel-track");
  const items = Array.from(track.children);
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  const totalItems = items.length;
  let index = 0;

  // Define quantas imagens aparecem por vez (3 no desktop, 1 no mobile)
  const getVisibleCount = () => (window.innerWidth < 768 ? 1 : 3);

  // Atualiza a posição do carrossel
  const updateCarousel = () => {
    const itemWidth = items[0].getBoundingClientRect().width + 10;
    const translateValue = index * itemWidth;
    track.style.transform = `translateX(-${translateValue}px)`;
  };

  // Avança ou retrocede 3 imagens (ou 1 no mobile)
  const changeSlide = (direction) => {
    const visibleCount = getVisibleCount();
    index += direction * visibleCount;

    // Volta ao início ou fim quando ultrapassa os limites
    if (index >= totalItems) index = 0;
    if (index < 0) index = Math.max(totalItems - visibleCount, 0);

    updateCarousel();
  };

  // Botões de navegação
  nextButton.addEventListener("click", () => changeSlide(1));
  prevButton.addEventListener("click", () => changeSlide(-1));

  // Troca automática a cada 4 segundos
  setInterval(() => changeSlide(1), 4000);

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
});
