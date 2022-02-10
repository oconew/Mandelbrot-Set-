
function complex_multiply(num, other) {
    /**
     * Calculates the product of two complex numbers
     * @param {{r: number, i: number}} num The first number to multiply
     * @param {{r: number, i: number}} other the other number to multiply
     * @returns {{r: number, i: number}} Product of the two complex numbers
     */
    // (a+bi)(c+di) = ac + adi + bci + bdi2
    return {r: num.r*other.r - num.i*other.i,
        i: num.r*other.i + num.i*other.r}
}

function f(Z, C) {
    /**
     * Iterates the given point according to the mandelbrot function Zn+1 = Zn^2 + C
     * @param {{r: number, i: number}} current The point Zn
     * @param {{r: number, i: number}} C The constant to be added
     * @returns {{r: number, i: number}} Zn+1
     */
    // Zn+1 = Zn²+C
    Z = complex_multiply(Z, Z)
    Z.r += C.r
    Z.i += C.i
    return Z
}

function mandelbrot(C, MAX_ITERS) {
    /**
     * Calculates the number of iterations before a constant tends to infinity
     * @param {{r: number, i: number}} C The constant to be added on each iteration
     * @returns {number} number of iterations before escape
     */
    let Z = {r: 0, i: 0}, n = MAX_ITERS  // Set Z to start at origin
    for (let i = 0; i<MAX_ITERS; i++) {
        // If magnitude of point is greater than 2, it will tend to infinity
        if (Z.r**2 + Z.i**2 > 4) {
            n = i
            break;
        }
        Z = f(Z, C) // iterate Z
    }
    return n
}

function julia(Z) {
    /**
     * Calculates the number of iterations before a constant tends to infinity
     * @param {{r: number, i: number}} C The constant to be added on each iteration
     * @returns {number} number of iterations before escape
     */
    let C = {r: document.getElementById('center_r').valueAsNumber, i: document.getElementById('center_i').valueAsNumber}, n = MAX_ITERS
    for (let i = 0; i<MAX_ITERS; i++) {
        // If magnitude of point is greater than 2, it will tend to infinity
        if (Z.r**2 + Z.i**2 > 4) {
            n = i
            break;
        }
        Z = f(Z, C) // iterate Z
    }
    return n
}
