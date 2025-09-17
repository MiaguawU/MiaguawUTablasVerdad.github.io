export function SinParentesisArrayConOperadores(expresion,conParent){//valido
    let colmOrg = String(expresion);
    let arrTemp;
    if(conParent===0){
        arrTemp = colmOrg.match(/AND|OR|NOT|IF|THEN|[A-Za-z]/g) || [];
    }
    else{
        let sinParen = (colmOrg ?? "").replace(/[()]/g, ""); 
        sinParen = sinParen.replace(/\s+/g, ""); //sin espacios

        arrTemp = sinParen.match(/AND|OR|NOT|IF|THEN|[A-Za-z]/g) || [];
    }

    return arrTemp;
}
