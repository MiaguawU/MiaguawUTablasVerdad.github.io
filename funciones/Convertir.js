export function Convertir(array){//validado
    let arr = array;
    for (let i=0; i< arr.length; i++){
        if(arr[i]==="¬"){
            arr[i]="NOT"
        }
        if(arr[i]==="v"){
            arr[i]="OR"
        }
        if(arr[i]==="∧"){
            arr[i]="AND"
        }
        if(arr[i]==="→"){
            arr[i]="THEN"
        }
        if(arr[i]==="↔"){
            arr[i]="IF"
        }
    }
    return arr;
}