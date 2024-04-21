const div_container = document.getElementById('card');
// consumimos Fake_API
fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(json=>{
    json.forEach(element => {
        const img = document.createElement('img');
        img.className = 'product';
        img.src = element.image;
        div_container.appendChild(img);
    });
});

