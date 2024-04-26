
// seguir viendo esto para que ande
async function cargarCarrusel() {
    try {
      const data = await cargarCarruselDesdeAPI();
      const carouselInner = document.querySelector('.carousel-inner');
      carouselInner.innerHTML = '';
  
      data.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
          carouselItem.classList.add('active');
        }
        
        const img = document.createElement('img');
        img.classList.add('d-block', 'w-100');
        img.src = item.src;
        img.alt = item.alt;
  
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  