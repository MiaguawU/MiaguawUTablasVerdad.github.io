// app.js - Importar todas las funciones
import algDiv from '../algDiv.js';
import { mod_n } from './mod_n.js';
import MCD, { MCD3, MCD4, MCD5 } from '../mcd.js';
import MCM, { MCM3, MCM4, MCM5 } from '../mcm.js';
import { base_N, a_base_10 } from './bases.js';
import algEucl from '../algEucl.js';
import { igu_Bezout, diofantica } from './bezout_diofantica.js';
import esPrimo from './esPrimo.js';

// ========== VALIDACIONES ==========

function validarNumeroEntero(valor, nombreCampo) {
    if (valor === '' || valor === null || valor === undefined) {
        throw new Error(`${nombreCampo} es requerido`);
    }
    const num = Number(valor);
    if (isNaN(num)) {
        throw new Error(`${nombreCampo} debe ser un número válido`);
    }
    if (!Number.isInteger(num)) {
        throw new Error(`${nombreCampo} debe ser un número entero`);
    }
    return num;
}

function validarNumeroPositivo(valor, nombreCampo) {
    const num = validarNumeroEntero(valor, nombreCampo);
    if (num <= 0) {
        throw new Error(`${nombreCampo} debe ser positivo`);
    }
    return num;
}

function validarDivisor(valor) {
    const num = validarNumeroEntero(valor, 'Divisor');
    if (num === 0) {
        throw new Error('El divisor no puede ser cero');
    }
    return num;
}

function validarBase(valor, nombreCampo) {
    const base = validarNumeroEntero(valor, nombreCampo);
    if (base < 2 || base > 36) {
        throw new Error(`${nombreCampo} debe estar entre 2 y 36`);
    }
    return base;
}

function validarNumeroEnBase(numero, base) {
    if (!numero || numero.trim() === '') {
        throw new Error('El número es requerido');
    }
    
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numStr = numero.toString().toUpperCase();
    
    for (let char of numStr) {
        let valor;
        if (char >= '0' && char <= '9') {
            valor = parseInt(char);
        } else if (letras.includes(char)) {
            valor = letras.indexOf(char) + 10;
        } else {
            throw new Error(`Carácter inválido '${char}' para base ${base}`);
        }
        
        if (valor >= base) {
            throw new Error(`El dígito '${char}' no es válido en base ${base}`);
        }
    }
    return numStr;
}

function validarArrayNumeros(array, cantidad, nombreCampo) {
    if (array.length !== cantidad) {
        throw new Error(`Se requieren exactamente ${cantidad} números`);
    }
    
    return array.map((val, index) => 
        validarNumeroEntero(val, `${nombreCampo} ${index + 1}`)
    );
}

// ========== FUNCIONES DE CÁLCULO CON VALIDACIÓN ==========

export function calcularDivision(a, b) {
    try {
        const dividendo = validarNumeroEntero(a, 'Dividendo');
        const divisor = validarDivisor(b);
        
        const resultado = algDiv(dividendo, divisor);
        
        return {
            success: true,
            data: resultado,
            formula: `${dividendo} = ${divisor} × ${resultado.cociente} + ${resultado.residuo}`
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export function calcularModulo(a, n) {
    try {
        const numero = validarNumeroEntero(a, 'Número');
        const modulo = validarDivisor(n);
        
        const resultado = mod_n(numero, modulo);
        
        return {
            success: true,
            data: resultado,
            formula: `${numero} ≡ ${resultado} (mod ${modulo})`
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export function calcularMCD(numeros) {
    try {
        const cantidad = numeros.length;
        if (cantidad < 2 || cantidad > 5) {
            throw new Error('Se requieren entre 2 y 5 números');
        }
        
        const nums = validarArrayNumeros(numeros, cantidad, 'Número');
        
        let resultado;
        switch (cantidad) {
            case 2: resultado = MCD(nums[0], nums[1]); break;
            case 3: resultado = MCD3(nums[0], nums[1], nums[2]); break;
            case 4: resultado = MCD4(nums[0], nums[1], nums[2], nums[3]); break;
            case 5: resultado = MCD5(nums[0], nums[1], nums[2], nums[3], nums[4]); break;
        }
        
        return {
            success: true,
            data: resultado,
            numeros: nums,
            formula: `MCD(${nums.join(', ')}) = ${resultado}`
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export function calcularMCM(numeros) {
    try {
        const cantidad = numeros.length;
        if (cantidad < 2 || cantidad > 5) {
            throw new Error('Se requieren entre 2 y 5 números');
        }
        
        const nums = validarArrayNumeros(numeros, cantidad, 'Número');
        
        // Validar que no todos sean cero
        if (nums.every(n => n === 0)) {
            throw new Error('Al menos un número debe ser diferente de cero');
        }
        
        let resultado;
        switch (cantidad) {
            case 2: resultado = MCM(nums[0], nums[1]); break;
            case 3: resultado = MCM3(nums[0], nums[1], nums[2]); break;
            case 4: resultado = MCM4(nums[0], nums[1], nums[2], nums[3]); break;
            case 5: resultado = MCM5(nums[0], nums[1], nums[2], nums[3], nums[4]); break;
        }
        
        return {
            success: true,
            data: resultado,
            numeros: nums,
            formula: `MCM(${nums.join(', ')}) = ${resultado}`
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export function calcularConversionBase(numero, baseOrigen, baseDestino) {
    try {
        const baseOrig = validarBase(baseOrigen, 'Base origen');
        const baseDest = validarBase(baseDestino, 'Base destino');
        const numValidado = validarNumeroEnBase(numero, baseOrig);
        
        const resultado = base_N(numValidado, baseOrig, baseDest);
        
        return {
            success: true,
            data: resultado,
            numeroOriginal: numValidado,
            baseOrigen: baseOrig,
            baseDestino: baseDest,
            decimal: baseOrig !== 10 ? a_base_10(numValidado, baseOrig) : numValidado
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export function calcularEuclides(a, b) {
    try {
        const num1 = validarNumeroPositivo(a, 'Número a');
        const num2 = validarNumeroPositivo(b, 'Número b');
        
        const proceso = algEucl(num1, num2);
        
        // Generar pasos del proceso
        const pasos = proceso.a.map((val, i) => ({
            dividendo: proceso.a[i],
            divisor: proceso.b[i],
            cociente: proceso.q[i],
            residuo: proceso.r[i],
            formula: `${proceso.a[i]} = ${proceso.b[i]} × ${proceso.q[i]} + ${proceso.r[i]}`
        }));
        
        return {
            success: true,
            data: proceso.resultado,
            proceso: pasos,
            formula: `MCD(${num1}, ${num2}) = ${proceso.resultado}`
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export function calcularBezout(a, b) {
    try {
        const num1 = validarNumeroPositivo(a, 'Número a');
        const num2 = validarNumeroPositivo(b, 'Número b');
        
        const { proceso, formula } = igu_Bezout(num1, num2);
        
        // Generar pasos del proceso
        const pasos = [];
        for (let i = 0; i < proceso.a.length; i++) {
            const bValue = typeof proceso.b[i] === 'object' 
                ? `(${proceso.b[i].a} + ${proceso.b[i].b}(${proceso.b[i].q}))`
                : proceso.b[i];
            
            pasos.push({
                paso: i + 1,
                expresion: `${proceso.d} = ${proceso.a[i]}(${proceso.x0[i]}) + ${bValue}(${proceso.y0[i]})`
            });
        }
        
        return {
            success: true,
            data: {
                x: formula.particular.x0,
                y: formula.particular.y0,
                d: formula.particular.d
            },
            proceso: pasos,
            formula: `${num1}(${formula.particular.x0}) + ${num2}(${formula.particular.y0}) = ${formula.particular.d}`,
            formulaGeneral: {
                d: formula.general.d,
                expresion: `${formula.general.d} = ${formula.general.a}(${formula.general.x0}) + ${formula.general.bk}(${formula.general.y0}) + ${formula.general.ak}`
            }
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export function calcularDiofantica(a, b, c) {
    try {
        const coefA = validarNumeroEntero(a, 'Coeficiente a');
        const coefB = validarNumeroEntero(b, 'Coeficiente b');
        const terminoC = validarNumeroEntero(c, 'Término c');
        
        if (coefA === 0 && coefB === 0) {
            throw new Error('Al menos uno de los coeficientes debe ser diferente de cero');
        }
        
        const resultado = diofantica(coefA, coefB, terminoC);
        
        if (!resultado || !resultado.tiene_solucion) {
            return {
                success: false,
                error: `La ecuación ${coefA}x + ${coefB}y = ${terminoC} no tiene solución entera`,
                razon: `${terminoC} no es divisible por MCD(${coefA}, ${coefB})`
            };
        }
        
        return {
            success: true,
            data: resultado,
            ecuacion: `${coefA}x + ${coefB}y = ${terminoC}`,
            solucionParticular: {
                x: resultado.solParticular.x0,
                y: resultado.solParticular.y0
            },
            solucionGeneral: {
                x: resultado.solGeneral.x,
                y: resultado.solGeneral.y
            },
            mcd: resultado.gcd
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export function verificarPrimalidad(num) {
    try {
        const numero = validarNumeroEntero(num, 'Número');
        const numAbs = Math.abs(numero);
        
        if (numAbs < 2) {
            return {
                success: true,
                esPrimo: false,
                numero: numAbs,
                razon: 'Los números menores a 2 no son primos'
            };
        }
        
        const primo = esPrimo(numAbs);
        
        return {
            success: true,
            esPrimo: primo,
            numero: numAbs,
            razon: primo 
                ? 'No tiene divisores propios además de 1 y sí mismo'
                : 'Tiene divisores propios'
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ========== FUNCIONES DE UI ==========

export function mostrarResultado(elementId, resultado) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (!resultado.success) {
        element.innerHTML = `
            <h3>❌ Error</h3>
            <p>${resultado.error}</p>
            ${resultado.razon ? `<p style="margin-top: 10px; font-size: 0.9em; color: #666;">${resultado.razon}</p>` : ''}
        `;
        element.className = 'result show error';
        return;
    }
    
    element.className = 'result show';
    return resultado;
}

export function generarPasosEuclides(pasos) {
    return pasos.map(paso => 
        `<div class="proceso-line">${paso.formula}</div>`
    ).join('');
}

export function generarPasosBezout(pasos) {
    return pasos.map(paso => 
        `<div class="proceso-line">Paso ${paso.paso}: ${paso.expresion}</div>`
    ).join('');
}