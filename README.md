# rust-wasm-test

## Goal of the Project
This project demonstrates how to use Rust and WebAssembly (WASM) to perform high-performance computations in the browser. The main goal is to render the Mandelbrot set fractal interactively, leveraging Rust for computation and WASM for seamless integration with web technologies. Users can adjust parameters and zoom in/out to explore the fractal in real time.

## What is the Mandelbrot Set and Why is it Computationally Expensive?
The Mandelbrot set is a famous mathematical fractal defined by a simple iterative equation:

    z = z^2 + c

where both z and c are complex numbers. For each point c in the complex plane, the equation is iterated starting from z = 0. If the value of z remains bounded (does not escape to infinity) after many iterations, the point c is considered to be in the Mandelbrot set.

**Why is it computationally expensive?**
- For each pixel in the image, the program must perform this iterative calculation, often hundreds or thousands of times, to determine if the point belongs to the set.
- High-resolution images and deep zooms require millions of such calculations.
- The boundary of the Mandelbrot set is infinitely complex, so more iterations reveal more detail, but also require more computation.

This makes rendering the Mandelbrot set a perfect demonstration of the power of WebAssembly for heavy computation in the browser.

## Project Architecture
- **Rust (src/lib.rs):** Implements the Mandelbrot set computation and exposes it to JavaScript via WASM using `wasm-bindgen`.
- **WebAssembly (WASM):** The Rust code is compiled to WASM, enabling fast execution in the browser.
- **JavaScript (index.js):** Handles UI interactions, slider updates, and calls the WASM-compiled Mandelbrot function. Updates the HTML canvas with the generated image.
- **HTML/CSS (index.html):** Provides the user interface, including sliders for width, height, and max iterations, zoom controls, and a canvas for rendering. Tailwind CSS is used for styling.

## Prerequisites
- [Rust](https://www.rust-lang.org/tools/install)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- [Node.js](https://nodejs.org/) (for running a local web server, if needed)
- A modern web browser (Chrome, Firefox, Edge, Safari)

## Installation Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/anubhavitis/rust-wasm-test
   cd rust-wasm-test
   ```
2. **Build the WASM package:**
   ```sh
   wasm-pack build --target web
   ```
   This will generate the `pkg/` directory with the WASM and JS bindings.
3. **Serve the project locally:**
   You need to use a local web server to load WASM in the browser. For example, with Python:
   ```sh
   # Python 3.x
   python3 -m http.server 8080
   # or with Node.js (if installed)
   npx serve .
   ```
   Then open [http://localhost:8080](http://localhost:8080) in your browser.
4. **Explore the Mandelbrot set:**
   - Use the sliders to adjust width, height, and max iterations.
   - Use the zoom buttons to zoom in and out of the fractal.
   - The computation is performed in Rust and rendered instantly in your browser via WASM.

---

**Enjoy exploring high-performance fractals with Rust and WebAssembly!**
