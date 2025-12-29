import {mod_n} from "./funciones/modulo.js";
import { algDiv } from "./funciones/algDiv.js";
import {MCD,MCD3,MCD4,MCD5} from "./funciones/mcd.js";
import { base_N } from "./funciones/camBase.js";
import { esPrimo } from "./funciones/primo.js";
import { igu_Bezout } from "./funciones/igualBezout.js";
import { algEucl } from "./funciones/algEucl.js";
import {MCM,MCM3,MCM4,MCM5} from "./funciones/mcm.js";

const funciones = {
    algDiv: (a, b) => algDiv(Number(a), Number(b)),
    algEucl: (a, b) => algEucl(Number(a), Number(b)),
    igualBezout: (a, b) => igu_Bezout(Number(a), Number(b)),

    modulo: (a, n) => mod_n(BigInt(a), BigInt(n)),
    primo: (n) => esPrimo(BigInt(n)),

    mcd: (numeros) => {
        const nums = numeros.map(n => Number(n));
        const [n1, n2, n3, n4, n5] = nums;
        
        switch (nums.length) {
            case 2: return MCD(n1, n2);
            case 3: return MCD3(n1, n2, n3);
            case 4: return MCD4(n1, n2, n3, n4);
            case 5: return MCD5(n1, n2, n3, n4, n5);
            default: return "Solo de 2 a 5 números";
        }
    },
    
    mcm: (numeros) => {
        const nums = numeros.map(n => Number(n));
        const [n1, n2, n3, n4, n5] = nums;

        switch (nums.length) {
            case 2: return MCM(n1, n2);
            case 3: return MCM3(n1, n2, n3);
            case 4: return MCM4(n1, n2, n3, n4);
            case 5: return MCM5(n1, n2, n3, n4, n5);
            default: return "Solo de 2 a 5 números";
        }
    },

    camBase: (n, b1, b2) => {
        return base_N(String(n), Number(b1), Number(b2));
    }
};

const selector = document.getElementById('algoSelector');
const inputArea = document.getElementById('inputArea');
const btnCalcular = document.getElementById('btnCalcular');
const resultArea = document.getElementById('resultArea');
const resultOutput = document.getElementById('resultOutput');

const config = {
    algDiv: { labels: ['Dividendo (a)', 'Divisor (b)'], types: ['text', 'text'] },
    camBase: { labels: ['Numero', 'Base Origen', 'Base Destino'], types: ['text', 'number', 'number'] },
    igualBezout: { labels: ['Numero A', 'Numero B'], types: ['text', 'text'] },
    modulo: { labels: ['Numero (a)', 'Modulo (n)'], types: ['text', 'text'] },
    primo: { labels: ['Numero a verificar'], types: ['text'] },
    algEucl: {labels: ['Dividendo (a)', 'Divisor (b)'], types: ['text', 'text']}, 
    mcd: { dynamic: true, min: 2, max: 5, label: 'Numero', type: 'text' },
    mcm: { dynamic: true, min: 2, max: 5, label: 'Numero', type: 'text' }
};

function procesarInput(valorTexto, tipoInput) {
    if(!valorTexto) return null;
    
    if(tipoInput === 'number') {
        const num = Number(valorTexto);
        
        if (isNaN(num)) throw new Error("Debes ingresar un numero valido");

        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            throw new Error(`El numero excede el limite seguro (${Number.MAX_SAFE_INTEGER}). Usa funciones BigInt para numeros tan grandes.`);
        }
        
        return num;
    }

    let texto = valorTexto.toString().trim();

    try {
        texto = texto.replace(/\^/g, '**');

        const caracteresValidos = /^[0-9n\s+\-*/%()**]+$/;
        
        if (caracteresValidos.test(texto)) {
             const codigoBigInt = texto.replace(/(\d+)(?![n])/g, "$1n");
             const resultado = new Function(`return ${codigoBigInt}`)();
             return resultado;
        }
        return texto; 
    } catch (e) {
        return texto; 
    }
}

selector.addEventListener('change', (e) => {
    const alg = e.target.value;
    renderInputs(alg);
    resultArea.classList.add('hidden');
});

function renderInputs(alg) {

    inputArea.innerHTML = '';
    inputArea.classList.remove('hidden');
    btnCalcular.classList.remove('hidden');

    const cfg = config[alg];

    if (!cfg) {

        console.warn(`No se encontro configuración para el algoritmo: "${alg}"`);
        inputArea.innerHTML = '<p style="color:red">Selecciona una opcion válida</p>';
        btnCalcular.classList.add('hidden'); 
        return;
    }

    if (cfg.dynamic) {
        const divSelect = document.createElement('div');
        divSelect.className = 'input-group';
        divSelect.innerHTML = `<label>¿Cuantos numeros? (2-5)</label>
                               <select id="numCount" onchange="updateDynamicInputs('${alg}', this.value)">
                                   <option value="2">2</option>
                                   <option value="3">3</option>
                                   <option value="4">4</option>
                                   <option value="5">5</option>
                               </select>`;
        inputArea.appendChild(divSelect);
        
        const container = document.createElement('div');
        container.id = 'dynamicContainer';
        inputArea.appendChild(container);
        
        updateDynamicInputs(alg, 2); 
    } 
    else {
        cfg.labels.forEach((label, index) => {
            const div = document.createElement('div');
            div.className = 'input-group';
            div.innerHTML = `
                <label>${label}</label>
                <input type="${cfg.types[index]}" class="data-input" data-type="${cfg.types[index]}" required placeholder="Ingresa valor">
            `;
            inputArea.appendChild(div);
        });
    }
}

window.updateDynamicInputs = (alg, count) => {
    const container = document.getElementById('dynamicContainer');
    if(!container) return;
    container.innerHTML = ''; 
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `<label>Numero ${parseInt(i) + 1}</label>
                         <input type="text" class="data-input" data-type="text" required>`;
        container.appendChild(div);
    }
};

btnCalcular.addEventListener('click', () => {
    const alg = selector.value;
    const inputs = document.querySelectorAll('.data-input');
    const values = [];
    
    try {
        for (const input of inputs) {
            if (!input.value) throw "Por favor llena todos los campos.";
            
            const tipo = input.getAttribute('data-type') || input.type;
            const valorProcesado = procesarInput(input.value, tipo);
            values.push(valorProcesado);
        }

        let resultado = ""; 
        let res_obj;
        let datos;

        if (alg === 'mcd' || alg === 'mcm') {
             resultado = funciones[alg](values).toString();
        } 
        else if(alg === 'algDiv'){
            res_obj = funciones[alg](...values);
            resultado = `${res_obj.dividendo} = ${res_obj.divisor}(${res_obj.cociente}) + ${res_obj.residuo}`;
        }
        else if(alg === 'algEucl'){
            res_obj = funciones[alg](...values);
            resultado += `MCD: ${res_obj.resultado}\n\n`;
            resultado += "Pasos: \n";
            if(res_obj.pasos) {
                res_obj.pasos.forEach((paso, index) => {
                    resultado += `Paso ${index + 1}: ${paso}\n`;
                });
            }
        }
        else if(alg === 'igualBezout'){
            datos = funciones[alg](...values);
            
            resultado += "RESULTADOS BEZOUT\n\n";
            resultado += "Solucion Particular:\n";
            resultado += `  ${datos.formula.particular.a}(${datos.formula.particular.x0}) + ${datos.formula.particular.b}(${datos.formula.particular.y0}) = ${datos.formula.particular.d}\n`;

            resultado += "\nSolucion General:\n";
            resultado += `  ${datos.formula.general.d} = ${datos.formula.general.a}(${datos.formula.general.x0} + ${datos.formula.general.ak}) + ${datos.formula.general.b}(${datos.formula.general.y0} - ${datos.formula.general.bk})\n`;
            
            resultado += "\nProceso:\n";
            const p = datos.proceso;

            if(p && p.a) {
                for(let i = 0; i < p.a.length; i++) {
                    
                    let valorB = p.b[i];
                    let textoB = "";

                    if (typeof valorB === 'object') {
                        textoB = `[ ${valorB.a} + ${valorB.b}(${valorB.q}) ]`;
                    } else {
                        textoB = valorB;
                    }

                    resultado += `Paso ${i+1}: ${p.d} = ${p.a[i]}(${p.x0[i]}) + ${textoB}(${p.y0[i]})\n`;
                }
            }
        }
        else {
            const res = funciones[alg](...values); 
            resultado = (typeof res === 'object') ? JSON.stringify(res) : res.toString();
        }

        resultOutput.innerText = resultado; 
        resultArea.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        alert("Error en el calculo: " + (error.message || error));
    }
});

renderInputs(selector.value);