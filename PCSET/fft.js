const arr = [0, 1, 2, 7];

function Complex(re, im) {
    this.re = re;
    this.im = im || 0.0;
}

function counts(array) {
    const result = new Array(12).fill(0);
    for (const value of array) {
        result[value]++;
    }
    return result;
}

// X[k] = sum_n x[n] * e^(-2πi k n / N)
function DFT(x) {
    const N = x.length;
    const result = new Array(N);
    for (let k = 0; k < N; ++k) {
        let re = 0;
        let im = 0;
        for (let n = 0; n < N; ++n) {
            const angle = -2 * Math.PI * k * n / N;
            re += x[n] * Math.cos(angle);
            im += x[n] * Math.sin(angle);
        }
        result[k] = new Complex(re, im);
    }
    return result;
}

function transform(signal) {
    return DFT(counts(signal));
}

function abs(signal) {
    const result = [];
    for (const c of signal) {
        result.push(Math.round(((Math.sqrt(c.re * c.re + c.im * c.im))*100))/100);
    }
    const sliced = result.slice(1, 7);
    return sliced;
}

console.log(transform(arr));
console.log(abs(transform(arr)))