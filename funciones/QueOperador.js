export function QueOperador(operador){//validado
    const operadIncognito = String(operador);
    let op;
    if(operadIncognito==="AND"){
        op = "AND";
    }
    else if(operadIncognito==="OR"){
        op = "OR";
    }
    else if(operadIncognito==="IF"){
        op = "IF";
    }
    else if(operadIncognito==="THEN"){
        op = "THEN";
    }
    else if(operadIncognito==="NOT"){
        op="NOT"
    }else{
        console.log("ERROR al saber que operador es"+ operadIncognito)
        op="error"
    }
    return op;
}