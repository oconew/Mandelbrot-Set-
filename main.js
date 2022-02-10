let canvas = document.getElementById('mandelbrot_canvas')
let ctx = canvas.getContext('2d')
canvas.width = window.outerWidth; canvas.height = window.outerHeight
let WIDTH = canvas.width, HEIGHT = canvas.height
if (canvas.width%2 !== 0) {WIDTH -= 1}
if (canvas.height%2 !== 0) {HEIGHT -= 1}
//ctx.translate(WIDTH/2, HEIGHT/2)
let img = ctx.getImageData(0, 0, WIDTH, HEIGHT)
let pix = img.data

function $(id) {return document.getElementById(id)}

let center = {r: $('center_r').valueAsNumber,
    i: $('center_i').valueAsNumber}
//center = {r: 0, i: 0}
//console.log(center)
let scale = $('scale').value

function canv_to_cart(x, y, scale, center) {
    const real_length = 5 * 1/scale
    const im_length = 3 * 1/scale
    return {r: center.r + (x-WIDTH/2)/WIDTH * real_length, i: center.i + (y-HEIGHT/2)/HEIGHT * im_length}
}

function plot_mandelbrot() {
    let iters, C, ppos, col, MAX_ITERS = $('max_iters').valueAsNumber,scale = Math.exp($('scale').valueAsNumber)
    let center = {r: $('center_r').valueAsNumber, i: $('center_i').valueAsNumber}
    for (let x = 0; x<WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            C = canv_to_cart(x, y, scale, center)
            iters = mandelbrot(C, MAX_ITERS)
            ppos = y * (WIDTH*4) + x*4
            if (iters === MAX_ITERS || iters === 1) {
                pix[ppos] = 0
                pix[ppos+1] = 0
                pix[ppos+2] = 0
            }

            else {
                col = 3 * Math.log(iters) / Math.log(MAX_ITERS-1)
                if (col < 1) {
                    pix[ppos] = 255 * col;
                    pix[ppos + 1] = 0;
                    pix[ppos + 2] = 0;
                }
                else if (col < 2 ) {
                    pix[ppos] = 255;
                    pix[ppos + 1] = 255 * (col - 1);
                    pix[ppos + 2] = 0;
                } else {
                    pix[ppos] = 255;
                    pix[ppos + 1] = 255;
                    pix[ppos + 2] = 255 * (col - 2);
                }
            }
            pix[ppos + 3] = 255
        }
    }
    ctx.putImageData(img, 0, 0)
}

function plot_julia() {
    let iters, Z, ppos, col, x=0, y=0
    while (x<WIDTH) {
        y = 0
        while (y < HEIGHT) {
        Z = canv_to_cart(x, y)
        iters = julia(Z)
        ppos = y * (WIDTH * 4) + x * 4
        if (iters === MAX_ITERS || iters === 1) {
            pix[ppos] = 0
            pix[ppos + 1] = 0
            pix[ppos + 2] = 0
        } else {
            col = 3 * Math.log(iters) / Math.log(MAX_ITERS - 1)
            if (col < 1) {
                pix[ppos] = 255 * col;
                pix[ppos + 1] = 0;
                pix[ppos + 2] = 0;
            } else if (col < 2) {
                pix[ppos] = 255;
                pix[ppos + 1] = 255 * (col - 1);
                pix[ppos + 2] = 0;
            } else {
                pix[ppos] = 255;
                pix[ppos + 1] = 255;
                pix[ppos + 2] = 255 * (col - 2);
            }
        }
        pix[ppos + 3] = 255
        y++
        }
    x++
    }
    ctx.putImageData(img, 0, 0)
}

document.getElementById('center_r').addEventListener('change', plot_mandelbrot)
document.getElementById('center_i').addEventListener('change', plot_mandelbrot)
document.getElementById('max_iters').addEventListener('change', plot_mandelbrot)
document.getElementById('scale').addEventListener('change', plot_mandelbrot)
plot_mandelbrot()