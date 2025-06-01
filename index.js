import init, { mandelbrot } from './pkg/rust_wasm_test.js';

let zoom = 1.0;
let maxIter = 7;

function incrementMaxIter() {   
    maxIter++;
    document.getElementById('maxIterValue').textContent = maxIter;
    renderMandelbrot();
}

function decrementMaxIter() {
    maxIter--;
    document.getElementById('maxIterValue').textContent = maxIter;
    renderMandelbrot();
}

async function run() {
    await init();
    // Add event listeners to sliders
    document.getElementById('width').addEventListener('input', handleSliderChange);
    document.getElementById('height').addEventListener('input', handleSliderChange);
    document.getElementById('maxIterDecrement').addEventListener('click', decrementMaxIter);
    document.getElementById('maxIterIncrement').addEventListener('click', incrementMaxIter);
    // Initial render
    renderMandelbrot();
}

function handleSliderChange(e) {
    // Update the label for the slider that changed
    if (e.target.id === 'width') {
        document.getElementById('widthValue').textContent = e.target.value;
    } else if (e.target.id === 'height') {
        document.getElementById('heightValue').textContent = e.target.value;
    } else if (e.target.id === 'maxIter') {
        document.getElementById('maxIterValue').textContent = e.target.value;
    }
    // Always re-render
    renderMandelbrot();
}

function renderMandelbrot() {
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    // Use the JS variable, not the DOM
    const max_iter = maxIter;

    const canvas = document.getElementById('mandelbrotCanvas');
    canvas.width = width;
    canvas.height = height;

    const imgData = mandelbrot(width, height, max_iter, zoom);
    const ctx = canvas.getContext('2d');
    const imageData = new ImageData(new Uint8ClampedArray(imgData), width, height);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the Mandelbrot set in black
    ctx.fillStyle = 'black';
    ctx.putImageData(imageData, 0, 0);

    // Update labels (in case of programmatic changes)
    document.getElementById('widthValue').textContent = width;
    document.getElementById('heightValue').textContent = height;
    document.getElementById('maxIterValue').textContent = max_iter;
    const zoomValue = document.getElementById('zoomValue');
    if (zoomValue) zoomValue.textContent = zoom.toFixed(2) + 'x';
}

// Zoom button handlers
window.zoomIn = function () {
    zoom *= 1.5;
    renderMandelbrot();
}
window.zoomOut = function () {
    zoom /= 1.5;
    renderMandelbrot();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('maxIterValue').textContent = maxIter;
    run();
}); 