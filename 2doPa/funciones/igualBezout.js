import {algEucl} from "./algEucl.js" ;
import {mod_n} from "./modulo.js";

export function igu_Bezout(a,b){
    console.log("Si esta")
    //despejemos r del penultimo: r = a - b*(q)
    //r0 = r - r1*q
    //de esa ecuacion tomamos el siguiente r= ... [de forma que sustituimos en la anterior]
    let a0=a;
    let b0=b;
    if(a<b){//para asegurar que a sea el mayor
        b0=a;
        a0=b;
    }
    
    const eucl= {...algEucl(a0,b0)};//obtenemos los pasos de alg_eucl
    console.log(eucl)
    let proceso = {
        a: [],
        x0:[],
        b: [],
        y0: [],
        d:eucl.resultado
    }

    let formula={
        general: {
            d:0,
            a:0,
            x0:0,
            bk:0,
            b:0,
            y0:0,
            ak:0
        },
        particular: {
            d:0,
            a:0,
            x0:0,
            b:0,
            y0:0
        }
    }

    let atemp=0; //a + b(-q)=r
    let btemp=0;
    let y0temp=0;
    let x0temp=1;
    let aux=0;

    let arrB={
        a:0,
        b:0,
        q:0
    }
    let cont=0;
    let cont_pasos=0;
    if(eucl.r.length-2<0){
        return {proceso,formula}
    }

    for(let i=eucl.r.length-2; i>0;i--){
        cont++;
        if(cont===1){
            cont_pasos++;
            atemp= eucl.a[i];//primero el ultimo antes del residuo =0
            btemp= eucl.b[i];//guardamos para usar despues
            y0temp= eucl.q[i]*(-1);

            proceso.a.push(atemp);//guardamos en proceso
            proceso.x0.push(x0temp);
            proceso.b.push(btemp);
            proceso.y0.push(y0temp);
        }
        //segundo paso
        //reemplazamos el r(b) por la igualdad dentro de ucl
        cont_pasos++;
        arrB.a=(eucl.a[i-1]);
        arrB.b=(eucl.b[i-1]);
        arrB.q=(eucl.q[i-1]*(-1));

        proceso.a.push(atemp);
        proceso.x0.push(x0temp);
        proceso.b.push({...arrB});
        proceso.y0.push(y0temp);

        //tercer paso
        //a(algun q(x0))+ [a+b(q2)](q3)
        //b=a(q1)+ b(q2)(q3), b=a 
        // -> b= (a)[(q2)(q3)+q1] //Mayonesa
        //a=a(q3)
        //b el mas chico
        cont_pasos++;
        proceso.a.push(arrB.a);
        proceso.x0.push(y0temp);//el q anterior
        
        proceso.b.push(atemp);
        proceso.y0.push(y0temp*arrB.q + x0temp);// q2*q3 +q1

        btemp=atemp;//guardamos
        atemp=arrB.a; 

        aux=y0temp;
        y0temp=(y0temp*arrB.q + x0temp);
        x0temp=aux;
        if(i===1){//si es la ultma vuelta
            formula.general.d=proceso.d;//generamos formula general(primera parte)
            formula.general.a=proceso.a[cont_pasos-1];
            formula.general.x0=proceso.x0[cont_pasos-1];
            formula.general.b=proceso.b[cont_pasos-1];
            formula.general.y0=proceso.y0[cont_pasos-1];
        }
    }
    formula.general.bk=formula.general.b.toString()+"k";
    formula.general.ak=formula.general.a.toString()+"k";//completar formula

    formula.particular.d=proceso.d;//generamos fomula particulas
    formula.particular.a=formula.general.a;
    formula.particular.x0=formula.general.x0;
    formula.particular.b=formula.general.b;
    formula.particular.y0=formula.general.y0;
    console.log(proceso)
    console.log(formula)

    return {proceso,formula};//regreasmos proceso y formulas
}






















export function diofantica(a, b, c) {
    const { proceso, formula } = igu_Bezout(a, b); 
    const d = formula.particular.d;

    if (mod_n(c,b) !== 0) {//si no teine solucion
        return false;
    }

    const k = c / d;

    const x0 = formula.particular.x0 * k;
    const y0 = formula.particular.y0 * k;

    //general
    //x= x0 + (b/d)t
    //y= y0 - (a/d)t
    const x_gen = `${x0} +${(b/d)}t`;
    const y_gen = `${y0} -${(a/d)}t`;

    let resultado={
        solParticular: { x0, y0 },
        solGeneral: { 
            x: x_gen, 
            y: y_gen 
        }
    }
    console.log(resultado)
    return resultado;
}
