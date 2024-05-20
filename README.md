
<div>
  <pre>
                                  <img src="https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/255631c9-846d-475e-b960-80517d271c71" width="100">  <img src="https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/96140020-03bb-4c93-ae9a-7ddb0d11107b" width="100">  <img src="https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/7b46786a-8eea-41dc-8a9a-4de1835b8466" width="100">  
                                  <img src="https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/f67b7f44-290a-4a39-a2a6-7f44f7c40b92" width="100">  <img src="https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/80fda7df-e178-4fa1-8999-53e7869d1b28" width="100">  <img src="https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/ccd6252b-6818-4777-a883-5b26a24fa91f" width="100">  
                                  <img src="https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/18950c51-2073-4c96-a10d-20ae277ace65" width="100">  <img src="https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/4188f1f0-5817-435c-96d5-85d8ab5acd51" width="100">  <img src="https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/e38fbc4b-b7f1-43f2-946f-7eb6c9aadbec" width="100">  
  </pre>
</div>

#### Descripción

Se desarrollo una SPA con SSR, implementando las tecnologías "Pug, JavaScript, Sass, CSS, Bootstrap, Node.js, Express, Git y GItHub" 

---

#### Directorios del proyecto

![Pasted image 20240519231231](https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/9e41da5c-de6a-4472-8038-4a871bea2c54)

#### crearOfertasPersistentes.js
![Pasted image 20240519231601](https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/a7ff9e66-d6dc-4a1f-b0d4-faae23096e00)

    el archivo se utilizo para cargar las ofertas, se encuentra deshabilitado. 

![Pasted image 20240519231817](https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/e355c1a6-165a-4f6e-ac64-3d8a2838027e)

    en caso que se quiera habilitar se deberá des comentar el archivo agregarOfertas.js

#### Vistas

![Pasted image 20240520010630](https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/dfb4c71b-5792-41e1-8afb-c9a5e1e0f086)

![Pasted image 20240520010750](https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/2d76f8c0-efbf-468d-895e-061e8da959b7)

![Pasted image 20240520010926](https://github.com/Ched2370/tp_Integrador_web2/assets/127058951/888d11d2-b404-451d-960c-e94217ae6dc2)

## Consignas

#### Programación Web II – Desarrollador de Software

## Práctico Integrador Web II

Desarrolle una página que consuma el listado de productos provisto por la API
https://fakestoreapi.com/.

Los artículos deben mostrarse en una grilla de 4 columnas. Cada producto debe mostrarse
como una card con su respectiva imagen del producto, título, descripción (máximo 30
caracteres), categoría y precio.

El usuario podrá ver la descripción completa del artículo pasando el mouse por arriba de la
descripción.

La aplicación se conectará al servidor para obtener el listado de artículos que esta de oferta
La info de este listado estará almacenada en un repositorio persistente (json, texto plano,
BD, etc) y contendrá al menos el id y porcentaje de descuento del artículo.

Los productos en oferta deben resaltarse con una banda “de oferta” que cruce la imagen del
artículo. Para estos productos debe mostrarse el precio origina, el descuento, el monto
descontado y el precio final.

Los títulos y descripciones de los artículos deben mostrarse en el idioma español. Para tal
fin se debe utilizar un endpoint en el servidor que permita la traducción. Puede utilizar el
paquete de node node-google-translate-skidz (https://github.com/statickidz/node-googletranslate-skidz)

El usuario podrá agregar a un carrito de compra el producto de interés a través de un botón.
La página debe tener un enlace a una página de gestión del carrito donde se mostrará todos
los productos agregados al carrito y donde el usuario podrá eliminar y modificar la cantidad
deseada. Esta página debe tener un botón comprar el cual enviará la información de la
compra al servidor para que esta sea registrada de forma permanente.

Nota: Las compras no dispondrán de información vinculada al usuario.
