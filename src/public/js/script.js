const div_container = document.getElementById("card");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    // Iteramos sobre los productos y los agregamos al contenedor
    json.forEach((element) => {
      const img = document.createElement("img");
      img.className = "product";
      img.src = element.image;
      div_container.appendChild(img);
    });})
  .catch((err) => {
    console.error("error al conectar la api", err);
  });
