use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn mandelbrot(width: usize, height: usize, max_iter: usize, zoom: f64) -> Vec<u8> {
    let mut img = vec![0; width * height * 4]; // 4 bytes per pixel (RGBA)
    let (x_min, x_max) = (-2.0, 1.0);
    let (y_min, y_max) = (-1.5, 1.5);

    let center_x = (x_min + x_max) / 2.0;
    let center_y = (y_min + y_max) / 2.0;
    let view_width = (x_max - x_min) / zoom;
    let view_height = (y_max - y_min) / zoom;
    let new_x_min = center_x - view_width / 2.0;
    let new_x_max = center_x + view_width / 2.0;
    let new_y_min = center_y - view_height / 2.0;
    let new_y_max = center_y + view_height / 2.0;

    for x in 0..width {
        for y in 0..height {
            let real = new_x_min + (x as f64) * (new_x_max - new_x_min) / (width as f64);
            let imag = new_y_min + (y as f64) * (new_y_max - new_y_min) / (height as f64);
            let mut z_real = real;
            let mut z_imag = imag;

            let mut iter = 0;
            while z_real * z_real + z_imag * z_imag <= 4.0 && iter < max_iter {
                let temp_real = z_real * z_real - z_imag * z_imag + real;
                z_imag = 2.0 * z_real * z_imag + imag;
                z_real = temp_real;
                iter += 1;
            }

            let pixel_index = (y * width + x) * 4;
            if iter == max_iter {
                // Inside Mandelbrot set: black, opaque
                img[pixel_index] = 0;
                img[pixel_index + 1] = 0;
                img[pixel_index + 2] = 0;
                img[pixel_index + 3] = 255;
            } else {
                // Outside: transparent
                img[pixel_index] = 0;
                img[pixel_index + 1] = 0;
                img[pixel_index + 2] = 0;
                img[pixel_index + 3] = 0;
            }
        }
    }

    img
}
