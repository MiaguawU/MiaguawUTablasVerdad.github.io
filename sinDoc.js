
/*let arr=[]
arr.push("(")
arr.push("p")
arr.push("AND")
arr.push("q")
arr.push(")")
let pp=[];
pp.push("p")
pp.push("q")
let arr3=[];
let res = GenerarColumnasDeTabla(arr,2,pp);
console.log(res)*/

/*let arr=[]
arr.push("(")
arr.push("p")
arr.push("AND")
arr.push("q")
arr.push(")")
let pp=[];
pp.push("p")
pp.push("q")
let arr3=[];
let res = MandarAResolverSoloC(arr,2,pp,0);
console.log(res)*/ 

/*let arr=[]
arr.push("p")
arr.push("THEN")
arr.push("q")
arr.push("AND")
arr.push("r")
arr.push("OR")
arr.push("q")
let pp=[];
pp.push("p")
pp.push("q")
let arr3=[];
let res = OrdenEspecial(arr);
//let res = Generar("(¬pv¬q)↔s");
console.log(res)*/

/*function OrdenEspecial(arrTemp){
    const array = Array.isArray(arrTemp) ? [...arrTemp] : ["null"];
    let termino= false;
    const abc = [
        "a","b","c","d","e","f","g","h","i","j","k","l","m",
        "n","o","p","q","r","s","t","u","w","x","y","z"
    ];
    const operadores = ["NOT","AND", "OR", "THEN", "IF"];
    let orden = new Array(array.length).fill(0);
    let contOrden =0;

    for(let i=0; i<operadores.length;i++){
        if(array[0]==="null"){
            throw new Error("el array es invalido")
        }
            for(let j =0; j<orden.length;j++){
                let aStr = String(array[j]);
                if(orden[j]!==0)continue;

                if(aStr.length===1&&abc.includes(aStr.toLowerCase())){
                    orden[j]=-1;
                }else{
                    if(array[j]===operadores[i]){
                        contOrden++;
                        orden[j]=contOrden;
                    }
                } 
                
            }
                 
    }
    return orden;
}*/
/*const tabla = [
  ['p','V','V','V','V','F','F','F'],
  ['q','V','V','F','F','V','V','F','F'],
  ['r','V','F','V','F','V','F','V','F'],
  ['¬'],
  ['((pvq)','V','V','V','V','V','V','F','F'],
  ['v'],
  ['(pvr))','V','V','V','V','V','F','V','F'],
  ['=c']
];

console.log(DondeAbreParentesis(5, tabla)); // null si no se puede abrir suficientes paréntesis
console.log(DondeCierraParentesis(4, tabla)); // null si no se cierran todos los '('
console.log(DondeCierraParentesis(5, tabla)); // devuelve 6 (cierra todos los paréntesis)
*/
let arr=[]
arr.push(")")
arr.push(")")
arr.push(")")
arr.push("AND")
arr.push("r")
arr.push(")")
arr.push(")")
let pp=[];
pp.push("p")
pp.push("q")
let arr3=[];
let res = CuantosParentCerrarHay(arr,5);
//let res = Generar("(¬pv¬q)↔s");
//¬(pv(rv(qv¬s)))
console.log(res)
function CuantosParentCerrarHay(array,lugar){
    const arr = array;
    let lug= lugar;
    let contpar=0;
    let resultado=0;
    if (!Array.isArray(arr) || arr.length === 0) return null;
    console.log(arr)

    for(let i=lug; i<arr.length; i++){
        console.log("Vuelta: "+arr[i]);
        if(arr[i]===")"){
            if(i===lug){
                contpar++;
                console.log("pasa 1 cuenta: "+contpar);
            }
            else if(i===(arr.length-1)){
                resultado = i;
                console.log("no ):"+contpar)
                console.log(arr[i])
                break;
            } 
            else{
                contpar++;
                console.log("hay )): "+contpar)
            }
        }
        else{
            resultado = i-1;
            console.log("no ):"+contpar)
            console.log(arr[i-1])
            break;
        }       
    }

    return resultado;
}
/*function Generar(expresion) {
    const original = expresion;
    const arrOrg = original.split("");
    const arrbs = Convertir(arrOrg);

    let n = 0; //numero de prep primnitvas
    let pp = [];
    const abc = [
        "a","b","c","d","e","f","g","h","i","j","k","l","m",
        "n","o","p","q","r","s","t","u","w","x","y","z"
    ];

    for (let i = 0; i < arrbs.length; i++) {
        let bslower = (arrbs[i] ?? "").toLowerCase();
        if (abc.includes(bslower) && !pp.includes(bslower)) {
            n++;
            pp.push(bslower);
        }
    }
    //console.log(arrbs);
    //console.log(pp)
    let colmOrg =[...GenerarColumnasDeTabla(arrbs,n,pp)];
    let ap4=0;
    let columnaEspecial =[];
        
    for (let i=0; i< colmOrg.length; i++){
        ap= i+1;
        ap4=i-1;
        if((colmOrg[i][0].match(/[()]/g) || []).length >= 2){//contamos cuantos parentesis hay, si hay mas de 2 ...
            //primero ver cuales pp hay
            let contpp=0;
            let arrTemp = [...SinParentesisArrayConOperadores(colmOrg[i][0])];// [""p", "AND", "g"] ejemplo
            let arrT2=[];
            for(let j=0; j<arrTemp.length; j++){
                if(arrTemp[j].length === 1 && abc.includes(arrTemp[j].toLowerCase())){
                    contpp++;
                }
            }
            //si hay mas de 2 pp, 
            if(contpp>2){
                let arrOrden = UltimaColumnaEnResolver(arrTemp,0,arrT2.length-1,0);//sacamos el orden de resolucion
                let expresion=agregarParentesis(arrTemp,arrOrden);//agregar parentesis para un mejor orden
                arrT2=SinParentesisArrayConOperadores(expresion,0);//crearmos columnas
                //mandamos a resolver las columnas y el reultado lo ponemos en esta (eso lo hago cuando termine este while)
                columnaEspecial=[...MandarAResolverSoloC(arrT2,n,pp,null,1)];
            }
        }
        
    }

    let tabla = [...MandarAResolverSoloC(arrbs,n,pp,columnaEspecial,0)];
    tabla = [...DesConvertir(tabla)];
    return tabla;

    //const tabla = document.getElementById("tabla");
    //tabla.style.display = "table"; 
}


/*let arr=[]
arr.push("p")
arr.push("AND")
arr.push("q")
arr.push("OR")
arr.push("r")
let arr2=[];
arr2.push("p")
arr2.push("q")
arr2.push("r")
let arr3=[];
let nose = UltimaColumnaEnResolver(arr,0,arr.length-1,0);
console.log(nose)
let res = agregarParentesis(arr,nose);
console.log(res) 
let sim = GenerarColumnas(res,arr);
console.log(sim)
/*let arr=[]
arr.push("(")
arr.push("p")
arr.push("AND")
arr.push("q")
arr.push(")")
arr.push("OR")
arr.push("r")
let arr2=[];
arr2.push("p")
arr2.push("q")
arr2.push("r")
let arr3=[];
let res = GenerarColumnas(arr,arr3);
console.log(res) 
/*let arrPrueba = [];
arrPrueba.push(["((qANDpORrTHENs)"]);
arrPrueba[0].push("0");

console.log(arrPrueba);
let res=UltimaColumnaEnResolver(arrPrueba,0,2);
console.log(res);*/

/*let arrPrueba = [];
arrPrueba.push(["p"]);
arrPrueba.push(["q"]);
arrPrueba.push(["((pANDq)"]);
arrPrueba.push(["IF"]);
arrPrueba.push(["(pORq))"]);
arrPrueba.push(["IF"]);
arrPrueba.push(["((pANDq)"]);
arrPrueba.push(["IF"]);
arrPrueba.push(["(pORq))"]);
let pp=[];
pp.push("p");
pp.push("q");

console.log(arrPrueba);
let res=DondeAbreParentesis(5,arrPrueba);
console.log(res);
res=DondeCierraParentesis(5,arrPrueba);
console.log(res);

/*let arrPrueba = [];
arrPrueba.push(0);
arrPrueba.push(3);
arrPrueba.push(2);
console.log(arrPrueba);
let res=VerifSiEstaLlenoLasigColmsinfilas(arrPrueba,1,0,0);
console.log(res);
*/
