
function suma_base_N(sumando1,sumando2,base_del_resultado){
    let sum1=sumando1;
    let sum2=sumando2;
    let base=base_del_resultado-1;
    if(base_del_resultado>10){
        sum1=a_base_10(sumando1,base_del_resultado);
        sum2=a_base_10(sumando2,base_del_resultado);
        base=9;
    }
    let arrN1= Array.from(String(sum1), Number);
    let arrN2= Array.from(String(sum2), Number);

    let long= arrN1.length>arrN2.length?arrN1.length:arrN2.length;

    let N1 = [];
    let N2=[];
    let aux=0;
    let aux2=0;
    for(i=long;i>=0;i--){
        if(i<arrN1.length){
            N1.push(arrN1[aux]);
            aux++;
        }
        else{
            N1.push(0);
        }

        if(i<arrN2.length){
            N2.push(arrN2[aux2]);
            aux2++;
        }
        else{
            N2.push(0);
        }
    }

    let arr_suma=[];
    let acarreo=0;
    let cont=0;
    let suma;
    let arr_resu=[];
    let resultado;

    for(let j=long;j>=0;j--){
        suma=N1[j]+N2[j]+acarreo;
        if(suma>base){
            suma=suma-base-1;
            acarreo=1;
        }
        else{
            acarreo=0;
        }
        arr_suma.push(suma);
        i--;
        cont++;
    }

    for(let j=arr_suma.length-1;j>=0;j--){
        arr_resu.push(arr_suma[j]);
    }

    resultado=Number(arr_resu.join(''));
    return resultado;    
}

function resta_base_N(minuendo,sustraendo,base_del_resultado){
    let min=minuendo;
    let sus=sustraendo;
    let base=base_del_resultado-1;
    if(base_del_resultado>10){
        min=a_base_10(minuendo,base_del_resultado);
        sus=a_base_10(sustraendo,base_del_resultado);
        base=9;
    }
    // minuendo = sustraendo + A
    // m = s +A
    //buscamos el limite, que llegue a 1111
    //sumamos eso a los dos lados m+c=s+c+A
    //Ahora sumamos 1
    let arrN1= Array.from(String(min), Number);
    let arrN2= Array.from(String(sus), Number);
    let aux=0;
    let porSumar=[];
    let N2=[];

    for(let i=arrN1.length-1;i>=0;i--){
        if(i<arrN2.length){
            N2.push(arrN2[aux]);
            aux++;
        }
        else{
            N2.push(0);
        }
    }

    for(let i=0;i<=N2.length;i++){
            console.log(N2[i])
        for(let j=0;j<=base;j++){
            if(N2[i]+j===base){
                porSumar.push(j);
            }
        }
    }

    let sumar=Number(porSumar.join(''));
    let resultado=suma_base_N(sumar,minuendo,0,0,base+1);

    resultado=suma_base_N(resultado,1,0,0,base+1);
    
    let arr_r = Array.from(String(resultado), Number);
    let arr_resu = arr_r.slice(1);

    resultado=Number(arr_resu.join(""));

    return resultado;
}

function mult_base_N(multiplicando, multiplicador, base) {


}

function div_base_N(dividendo, divisor, base) {
    
}

console.log(div_base_N("454","14",6))