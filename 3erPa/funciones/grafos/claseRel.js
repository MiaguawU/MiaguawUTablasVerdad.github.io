//relacion AxA, no aceptamos por ahora pq no es necesario AxB
export class Relacion{//usaremos clase, para tener propiedades especificas y poder hacer metodos para verificar las relaciones
    constructor(relacion,codominio) {//estos no cambian
        this.relacion = relacion;//string
        this.codominio = Relacion.validar_cod(codominio);//array
        this.Dominio = this._gen_mapa();//mapa con set
    }
    //metodos
    static validar_cod(cod){
        if (!Array.isArray(cod)) {
            throw new Error("ERROR, el codominio no es un arreglo");
        }
        if (cod.length === 0) {
            throw new Error("ERROR, el codominio no tiene longitud");
        }

        const todo_val = cod.every(el => typeof el === 'number' || typeof el === 'string');
        if (!todo_val) {
            throw new Error("ERROR, todo el codomio debe ser solo de numeros o solo de letras");
        }
        
        return cod;
    }
    _gen_mapa(){//el subconjunto de AxA x → Set { x, y, z } 
        try{
            const cumple = new Function("x", "y", `return ${this.relacion};`);//asi puedo mandar el nombre de la funcion o verficar la fucking condicon
            const dominio=new Map();
            for (let x of this.codominio){
                const rel_con_x = new Set();
                for (let y of this.codominio) {
                    if (cumple(x, y)) rel_con_x.add(y);
                }
                dominio.set(x, rel_con_x);
            }
            return dominio;
        }
        catch(error){
            console.error("Error real de JS:", error);
            throw new Error(`La relacion "${this.relacion}" no es una expresion valida.`);
        }
    }
    //metodos get
    get Simetrica(){// xRy -> rRx 
        for(let [x, rel_de_x] of this.Dominio){
            for(let y of rel_de_x){
                const rel_de_y = this.Dominio.get(y)
                if(!rel_de_y.has(x)){
                    return{
                        es:false,
                        porque:`porque existe ${x}R${y} pero no ${y}R${x}`
                    }
                }
            }
        }
        return {
            es:true,
            porque: `Es simetrica`
        };
    }
    get Reflexiva(){// xRx 
        for(let[x, rel_de_x] of this.Dominio){
            if(!rel_de_x.has(x)){
                return{
                    es:false,
                    porque:`porque ${x} no se relaciona consigo mismo`
                }
            };
        } 
        return {
            es:true,
            porque: `Es reflexiva`
        };
    }
    get Transitiva(){// xRy and yRz -> xRz
        for(let [x, rel_de_x] of this.Dominio){
            for(let y of rel_de_x){
                const rel_de_y = this.Dominio.get(y);
                for(let z of rel_de_y){
                    if(!rel_de_x.has(z)){
                        return{
                            es:false,
                            porque:`porque tenemos ${x}R${y} y ${y}R${z} pero no ${x}R${z}`
                        }
                    }
                }
            }
        }
        return {
            es:true,
            porque: `Es transitiva`
        };
    }
    get Antisimetrica(){// xRy and yRx -> x=y
        for(let [x, rel_de_x] of this.Dominio){
            for(let y of rel_de_x){
                const rel_de_y = this.Dominio.get(y)
                if(rel_de_y.has(x)) {
                    if(x!==y){
                        return{
                            es:false,
                            porque:`porque existe ${x}R${y} y ${y}R${x} pero ${x} no es igual que ${y}`
                        }
                    }
                }
            }
        }
        return {
            es:true,
            porque: `Es antisimetrica`
        };
    }
}