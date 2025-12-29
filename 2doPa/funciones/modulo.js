export function mod_n(a, n) {
    const bigA = BigInt(a);
    const bigN = BigInt(n);

    if (bigN === 0n) {
        throw new Error("El divisor no puede ser 0");
    }

    let q = bigA / bigN;

    const r_temp = bigA - (q * bigN);
    // 11 - (-4*-2)

    if (r_temp !== 0n && ((bigA < 0n) !== (bigN < 0n))) {
        q -= 1n; 
    }

    const r = bigA - (q * bigN);//a= bq +r -> r= a-bq

    return r;
}