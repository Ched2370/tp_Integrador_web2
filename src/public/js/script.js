const div_container = document.getElementById("card");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    json.forEach((element) => {


      const div_card = document.createElement('div');
      div_card.className = 'card d-flex col-xxl-2 col-xl-3 col-lg-4 col-md-6 justify-content-center aling-items-center p-5';
      const img = document.createElement("img");
      img.className = "product card-img-top mx-auto";
      img.src = element.image;
/*    const title = document.createElement('h6');
      title.className = 'card-title mt-3';
      title.textContent = element.title;
      const descripcion = document.createElement('p');
      descripcion.className = 'card-text overflow-auto';
      descripcion.textContent = element.description; */
      div_container.appendChild(div_card);
      div_card.appendChild(img);
     // div_card.appendChild(title);
     // div_card.appendChild(descripcion);
    });})
  .catch((err) => {
    throw new Error(`error al conectar la api: ${err.message}`);
  });
