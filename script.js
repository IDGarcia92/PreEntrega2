
fetch('/products.json')
    .then(response => response.json())
    .then(data => {
    const source = document.getElementById('template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(data);

    // Inserta el HTML renderizado en tu documento
    document.getElementById('output').innerHTML = html;
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));