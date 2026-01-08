import { Relacion } from "./claseRel.js";

export class Grafo extends Relacion{
  constructor(relacion,codominio,render_funs,mount){
    super(relacion,codominio);
    this.mount= mount;
    this.renderer= render_funs;
    this.centro={ x: 300, y: 300 };
    this.radio=260;

    this.config={
      context:null,
      dimens:null
    };
  }
  async vista(){
      /*
      necesitamos obtener true or false 
      para cada elemento
      si se relaciona consigo mismo y o 
      con otro elemento y cual
      tmb ordenar cada elemento circularmente poner un punto para cada elemento
      tal vez crear las img de cada numero a partir de una plantilla
      todo numero debe estar fuera del circulo
      toda relacion difrente de xRx debe estar dentro del circulo
      toda relacion xRx debe estar fuera de el circulo y a lado del elemento
      tal vez hacer unas funciones que creen los elementos visuales
      */
    const context = await this.renderer.iniciar(this.mount);
    let dims = {
      cx: this.centro.x,
      cy: this.centro.y,
      r: this.radio,
      puntos:this.codominio.length
    }

    this.config.context=context;
    this.config.dimens= dims;
    
    //primero generamos los nodod
    this.codominio.forEach(element => {
      this.renderer.nodo(element,this.config);
    });

    for(let [x, rel_de_x] of this.Dominio){
        for(let y of rel_de_x){
            const rel_de_y = this.Dominio.get(y);
            if(x===y){
                //crear lazo
                this.renderer.lazo(x,this.config);
            }else{
                if(rel_de_y.has(x)){//simetrica
                    if(x<y){
                        //crear arista
                        this.renderer.arista(x,y,this.config);
                    }
                }
                else{
                    //crear flecha de x a y
                    this.renderer.flecha(x,y,this.config);
                }
            }
        }
    }
    //finalizar y agregarr extras
    this.renderer.fin(this.config);
    return true;
  }
}