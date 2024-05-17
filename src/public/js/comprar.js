const btnCompra = document.getElementById('btnComprar');
btnCompra.addEventListener('click', () => {
    let storageData = JSON.parse(localStorage.getItem('lista'));
    if (!storageData || storageData.length === 0) {
        alert('No hay elementos en la lista de compra');
        return;
    }

    storageData.forEach(e => {
        console.log(e);
    });

    fetch('/compra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(storageData)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Error en la respuesta del servidor: ${response.status} - ${response.statusText}: ${text}`);
            });
        }
        return response.json();
    })
    .then(data => {
        alert('Compra realizada con éxito: ' + JSON.stringify(data));
        localStorage.removeItem('lista');
    })
    .catch(error => {
        console.error('Error en la compra:', error);
        alert('Hubo un error al realizar la compra: ' + error.message);
    });
});
