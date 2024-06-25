class Usuario{
    constructor(nombre,documento,contraseña,tipoUsuario){
        this.nombre = nombre.toLowerCase();
        this.documento = documento;
        this.contraseña =  contraseña;
        this.tipoUsuario = tipoUsuario; 
    }
}

const ListaDeUsuarios = [
    new Usuario("Gabriela","1010","1111","1"),
    new Usuario("Olmar","7777","2222","2"),
    new Usuario("Yoimar","1025","3333","1"),
    new Usuario("Pulgas","232323","4444","1")
]

let cajero = [
    { denominacion: 100000, cantidad: 0 },
    { denominacion: 50000, cantidad: 0 },
    { denominacion: 20000, cantidad: 0 },
    { denominacion: 10000, cantidad: 0 },
    { denominacion: 5000, cantidad: 0 }
];




function ValidarUsuarios(documento,contraseña){
    for (let i = 0; i < ListaDeUsuarios.length; i++) {
        if(ListaDeUsuarios[i].documento == documento && ListaDeUsuarios[i].contraseña == contraseña){
            return ListaDeUsuarios[i];
        }
    }
    return null;

}


function calcularTotalDinero(cajero) {
    return cajero.reduce((total, billete) => total + billete.cantidad * billete.denominacion, 0);
}


function cargarCajero(){
    for (let i = 0; i < cajero.length; i++) {
        cajero[i].cantidad += parseInt(prompt(`Ingrese la cantidad de billetes de ${cajero[i].denominacion}`,10));
    }
    const totalDineroCaja = calcularTotalDinero(cajero);
    console.log("Estado actualizado del cajero:", cajero);
    console.log("Total de dinero en el cajero:", totalDineroCaja);
}

function retirarDinero() {
    const cantidad = parseInt(prompt("Ingrese la cantidad de dinero a retirar"), 10);
    let cantidadRestante = cantidad;
    let billetesEntregados = [];

    for (let i = 0; i < cajero.length; i++) {
        let billetesAEntregar = Math.floor(cantidadRestante / cajero[i].denominacion);
        billetesAEntregar = Math.min(billetesAEntregar, cajero[i].cantidad);

        if (billetesAEntregar > 0) {
            cajero[i].cantidad -= billetesAEntregar;
            cantidadRestante -= billetesAEntregar * cajero[i].denominacion;
            billetesEntregados.push({ denominacion: cajero[i].denominacion, cantidad: billetesAEntregar });
        }
    }

    if (cantidadRestante > 0) {
        console.log(`No se pudo retirar la cantidad completa. Se entregaron $${cantidad - cantidadRestante}.`);
    } else {
        console.log(`Se retiraron $${cantidad}.`);
    }

    console.log("Billetes entregados:");
    billetesEntregados.forEach(billete => {
        console.log(`Denominación: ${billete.denominacion}, Cantidad: ${billete.cantidad}`);
    });

    console.log("Dinero restante en el cajero:");
    cajero.forEach(billete => {
        console.log(`Denominación: ${billete.denominacion}, Cantidad: ${billete.cantidad}`);
    });
}



function preguntarCredencial(){
    let documento = prompt("Ingrese su documento");
    let contraseña = prompt("Ingrese su contraseña");
    const usuariovalido = ValidarUsuarios(documento,contraseña);
    console.log(usuariovalido);
    if(usuariovalido){
        if(usuariovalido.tipoUsuario==1){
        console.log(`¡Bienvenido administrador`);
        cargarCajero();
        preguntarCredencial();
    
        }else{
            console.log(`¡Bienvenido cliente`);
            const totalDineroCaja = calcularTotalDinero(cajero);
            if (totalDineroCaja === 0) {
                console.log("Cajero en mantenimiento, vuelva pronto.");
                preguntarCredencial(); // Reiniciar desde el inicio
            } else {
                retirarDinero();
                preguntarCredencial(); // Volver a solicitar credenciales
                // Aquí puedes agregar lógica adicional para las transacciones del cliente
            }
        }
    }else{
        console.error("El usuario no existe");
        preguntarCredencial();
    }
}


preguntarCredencial();
