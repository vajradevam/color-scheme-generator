document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const img = document.getElementById('uploadedImage');
    img.src = URL.createObjectURL(file);
    img.onload = function() {
        generateColorScheme(img);
        URL.revokeObjectURL(img.src);
    };
});

function generateColorScheme(image) {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image, 5);

    const colorPalette = document.getElementById('colorPalette');
    colorPalette.innerHTML = '';

    palette.forEach(color => {
        const hexColor = rgbToHex(color[0], color[1], color[2]);
        const colorBlock = document.createElement('div');
        colorBlock.className = 'color-block';
        colorBlock.style.backgroundColor = hexColor;
        colorBlock.textContent = hexColor;
        colorPalette.appendChild(colorBlock);
    });
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
