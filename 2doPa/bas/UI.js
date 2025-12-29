// ui.js - Manejo de la interfaz de usuario
import {
    calcularDivision,
    calcularMCD,
    calcularMCM,
    calcularConversionBase,
    calcularEuclides,
    calcularBezout,
    calcularDiofantica,
    verificarPrimalidad,
    mostrarResultado,
    generarPasosEuclides,
    generarPasosBezout
} from './app.js';

// ========== NAVEGACIÓN DE TABS ==========

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.dataset.tab;
        
        // Remover active de todos
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.function-section').forEach(s => s.classList.remove('active'));
        
        // Activar el seleccionado
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// ========== MANEJADORES DE EVENTOS ==========

window.handleDivision = function() {
    const a = document.getElementById('div_a').value;
    const b = document.getElementById('div_b').value;
    
    const resultado = calcularDivision(a, b);
    mostrarResultado('result_div', resultado);
    
    if (resultado.success) {
        document.getElementById('result_div').innerHTML = `
            <h3>✓ Resultado</h3>
            <p class="formula">${resultado.formula}</p>
            <div class="details">
                <p><strong>Cociente:</strong> ${resultado.data.cociente}</p>
                <p><strong>Residuo:</strong> ${resultado.data.residuo}</p>
            </div>
        `;
    }
};

window.handleMCD = function() {
    const count = parseInt(document.getElementById('mcd_count').value);
    const numeros = [];
    
    for (let i = 0; i < count; i++) {
        numeros.push(document.getElementById(`mcd_${i}`).value);
    }
    
    const resultado = calcularMCD(numeros);
    mostrarResultado('result_mcd', resultado);
    
    if (resultado.success) {
        document.getElementById('result_mcd').innerHTML = `
            <h3>✓ Resultado</h3>
            <p class="formula">${resultado.formula}</p>
            <div class="details">
                <p><strong>Números:</strong> ${resultado.numeros.join(', ')}</p>
                <p><strong>MCD:</strong> ${resultado.data}</p>
            </div>
        `;
    }
};

window.handleMCM = function() {
    const count = parseInt(document.getElementById('mcm_count').value);
    const numeros = [];
    
    for (let i = 0; i < count; i++) {
        numeros.push(document.getElementById(`mcm_${i}`).value);
    }
    
    const resultado = calcularMCM(numeros);
    mostrarResultado('result_mcm', resultado);
    
    if (resultado.success) {
        document.getElementById('result_mcm').innerHTML = `
            <h3>✓ Resultado</h3>
            <p class="formula">${resultado.formula}</p>
            <div class="details">
                <p><strong>Números:</strong> ${resultado.numeros.join(', ')}</p>
                <p><strong>MCM:</strong> ${resultado.data}</p>
            </div>
        `;
    }
};

window.handleConversionBase = function() {
    const numero = document.getElementById('base_num').value;
    const baseOrigen = document.getElementById('base_orig').value;
    const baseDestino = document.getElementById('base_dest').value;
    
    const resultado = calcularConversionBase(numero, baseOrigen, baseDestino);
    mostrarResultado('result_base', resultado);
    
    if (resultado.success) {
        document.getElementById('result_base').innerHTML = `
            <h3>✓ Conversión de Bases</h3>
            <div class="conversion-display">
                <div class="conversion-step">
                    <span class="conversion-label">Base ${resultado.baseOrigen}:</span>
                    <span class="conversion-value">${resultado.numeroOriginal}</span>
                </div>
                ${resultado.baseOrigen !== 10 ? `
                <div class="conversion-step">
                    <span class="conversion-label">Base 10 (intermedia):</span>
                    <span class="conversion-value">${resultado.decimal}</span>
                </div>
                ` : ''}
                <div class="conversion-arrow">↓</div>
                <div class="conversion-step highlight">
                    <span class="conversion-label">Base ${resultado.baseDestino}:</span>
                    <span class="conversion-value">${resultado.data}</span>
                </div>
            </div>
        `;
    }
};

window.handleEuclides = function() {
    const a = document.getElementById('eucl_a').value;
    const b = document.getElementById('eucl_b').value;
    
    const resultado = calcularEuclides(a, b);
    mostrarResultado('result_eucl', resultado);
    
    if (resultado.success) {
        const pasosHTML = generarPasosEuclides(resultado.proceso);
        
        document.getElementById('result_eucl').innerHTML = `
            <h3>✓ Algoritmo de Euclides</h3>
            <div class="proceso">
                <h4>Proceso paso a paso:</h4>
                ${pasosHTML}
            </div>
            <p class="formula">${resultado.formula}</p>
        `;
    }
};

window.handleBezout = function() {
    const a = document.getElementById('bez_a').value;
    const b = document.getElementById('bez_b').value;
    
    const resultado = calcularBezout(a, b);
    mostrarResultado('result_bez', resultado);
    
    if (resultado.success) {
        const pasosHTML = generarPasosBezout(resultado.proceso);
        
        document.getElementById('result_bez').innerHTML = `
            <h3>✓ Identidad de Bezout</h3>
            <div class="proceso">
                <h4>Proceso de sustituciones:</h4>
                ${pasosHTML}
            </div>
            <div class="details">
                <p class="formula">${resultado.formula}</p>
                <p><strong>x =</strong> ${resultado.data.x}</p>
                <p><strong>y =</strong> ${resultado.data.y}</p>
                <p><strong>MCD =</strong> ${resultado.data.d}</p>
            </div>
            <div class="formula-general">
                <h4>Fórmula General:</h4>
                <p>${resultado.formulaGeneral.expresion}</p>
            </div>
        `;
    }
};

window.handleDiofantica = function() {
    const a = document.getElementById('diof_a').value;
    const b = document.getElementById('diof_b').value;
    const c = document.getElementById('diof_c').value;
    
    const resultado = calcularDiofantica(a, b, c);
    mostrarResultado('result_diof', resultado);
    
    if (resultado.success) {
        document.getElementById('result_diof').innerHTML = `
            <h3>✓ Ecuación Diofántica</h3>
            <p class="formula">${resultado.ecuacion}</p>
            <div class="details">
                <h4>Solución Particular:</h4>
                <p><strong>x₀ =</strong> ${resultado.solucionParticular.x}</p>
                <p><strong>y₀ =</strong> ${resultado.solucionParticular.y}</p>
                
                <h4 style="margin-top: 20px;">Solución General:</h4>
                <p><strong>x =</strong> ${resultado.solucionGeneral.x}</p>
                <p><strong>y =</strong> ${resultado.solucionGeneral.y}</p>
                <p style="margin-top: 10px; font-size: 0.9em; color: #666;">donde t ∈ ℤ</p>
                
                <p style="margin-top: 15px;"><strong>MCD(${a}, ${b}) =</strong> ${resultado.mcd}</p>
            </div>
        `;
    }
};

window.handlePrimalidad = function() {
    const num = document.getElementById('primo_num').value;
    
    const resultado = verificarPrimalidad(num);
    mostrarResultado('result_primo', resultado);
    
    if (resultado.success) {
        const icono = resultado.esPrimo ? '✓' : '✗';
        const clase = resultado.esPrimo ? 'primo-si' : 'primo-no';
        
        document.getElementById('result_primo').innerHTML = `
            <h3>${icono} Test de Primalidad</h3>
            <div class="primalidad ${clase}">
                <p style="font-size: 1.5em; margin-bottom: 10px;">
                    <strong>${resultado.numero}</strong> 
                    ${resultado.esPrimo ? '<span class="es-primo">ES PRIMO</span>' : '<span class="no-primo">NO ES PRIMO</span>'}
                </p>
                <p>${resultado.razon}</p>
            </div>
        `;
    }
};

// ========== GENERACIÓN DINÁMICA DE INPUTS ==========

window.updateMCDInputs = function() {
    const count = parseInt(document.getElementById('mcd_count').value);
    const container = document.getElementById('mcd_inputs');
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        container.innerHTML += `
            <div class="input-group">
                <label>Número ${i + 1}:</label>
                <input type="number" id="mcd_${i}" placeholder="Ej: ${(i+1)*12}">
            </div>
        `;
    }
};

window.updateMCMInputs = function() {
    const count = parseInt(document.getElementById('mcm_count').value);
    const container = document.getElementById('mcm_inputs');
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        container.innerHTML += `
            <div class="input-group">
                <label>Número ${i + 1}:</label>
                <input type="number" id="mcm_${i}" placeholder="Ej: ${(i+1)*3}">
            </div>
        `;
    }
};

// Inicializar
updateMCDInputs();
updateMCMInputs();