export class Circuito_Logico{// ABC'+A'BC+AB'C
    constructor(boolean_f,config,funciones,mount){
        this.funcion_booleana=boolean_f;
        this.renderer=funciones;
        this.config=config;
        this.mount=mount;
    }

    _obj_del_circuito(formula){

        const circ = new Map();
        let cont_NOT = 0, cont_AND = 0, cont_OR = 0;
        const esFNC = formula.includes('·') || (formula.includes('(') && formula.includes('+'));
        const sepExterno = esFNC ? '·' : '+';
        const comp_inter = esFNC ? "OR" : "AND";
        const comp_final = esFNC ? "AND" : "OR";

        let term_No_proceso = formula.split(sepExterno).map(t => t.trim().replace(/[()]/g, ''));
        let outs_inter = [];
        let all_variables = new Set();

        term_No_proceso.forEach((termino) => {
            let patron = /[a-zA-Z]\d*'?/g;
            let variables = termino.match(patron);
            if (!variables) return;

            let inputs_comp = [];
            variables.forEach(v => {
                const nombreLimpio = v.replace("'", "");
                all_variables.add(nombreLimpio);
                inputs_comp.push(v);
            });

            if(inputs_comp.length > 1) {
                let id = comp_inter === "AND" ? `AND_${++cont_AND}` : `OR_${++cont_OR}`;
                circ.set(id, { 
                    tipo: comp_inter, 
                    inputs: inputs_comp 
                }
                );
                outs_inter.push(id);
            } 
            else {
                outs_inter.push(inputs_comp[0]);
            }
        });

        if(outs_inter.length > 1) {
            let id_final = comp_final === "OR" ? `OR_FINAL` : `AND_FINAL`;
            circ.set(
                id_final, { 
                    tipo: comp_final, 
                    inputs: outs_inter, 
                    esFinal: true 
                }
            );
        }

        return { mapa: Object.fromEntries(circ), vars: Array.from(all_variables).sort() };
    }

    async vista(){
        const { mapa, vars } = this._obj_del_circuito(this.funcion_booleana);
        const context = await this.renderer.inicio(this.mount, vars, mapa,this.config);

        this.config.svg=context;
        this.renderer.input(vars, this.config);

        Object.keys(mapa).forEach(id => {
            const comp = mapa[id];
            const esFinal = comp.esFinal;
            
            let info;
            if(comp.tipo === "AND") {
                info = this.renderer.and(esFinal, comp, id,this.config);
            }
            else{ 
                info = this.renderer.or(esFinal, comp, id,this.config);
            }

            comp.inputs.forEach((inId, i) => {
                this.renderer.conexion(inId, esFinal, info,i,this.config);
            });

            if(esFinal) {
                this.renderer.fin(id,"F",this.config);
            }
        });
    }
}