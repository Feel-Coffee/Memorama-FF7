let iconos
let selecciones = []
let puntos
let cantidadTarjetas = 16

var seconds = 0;
var minutes = 0;
var timerElement = document.getElementById('timer');


generarTablero()

function cargarIconos() 
{   
    iconos =
    [
        '<img src="Imagenes a usar/Tifa.png" alt="">',
        '<img src="Imagenes a usar/Aerith.png" alt="">',
        '<img src="Imagenes a usar/Cloud.png" alt="">',
        '<img src="Imagenes a usar/Vincent.png" alt="">',
        '<img src="Imagenes a usar/CaithSith.png" alt="">',
        '<img src="Imagenes a usar/Barret.png" alt="">',
        '<img src="Imagenes a usar/Yuffie.png" alt="">',
        '<img src="Imagenes a usar/Cid.png" alt="">',
    ]
}

function generarTablero()
{ 
    puntos = 0
    document.getElementById("puntos").innerHTML = "Puntos: " + puntos
    cargarIconos()
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    let len = iconos.length * 2;
    for (let i = 0; i < cantidadTarjetas; i++) 
    {
        tarjetas.push(
            `<div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                <div class="tarjeta" id="tarjeta${i}">
                    <div class="cara trasera" id="trasera${i}">
                        ${iconos[0]}
                     </div>
                    <div class="cara delantera">
                        <img src="Imagenes a usar/Icono.png" alt="">
                    </div>

                </div>
            </div>`
        )

        if(i % 2 == 1)
        {
            iconos.splice(0, 1)
        }
        
    }
    
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")

}



function seleccionarTarjeta(i) 
{
    let tarjeta = document.getElementById("tarjeta" + i)
    if(tarjeta.style.transform != "rotateY(180deg)")
    {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if(selecciones.length == 2)
    {
        deseleccionar(selecciones)
        selecciones = []
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
        }else{
            trasera1.style.background = "grey"
            trasera1.style.opacity = 0.1
            trasera2.style.background = "grey"
            trasera2.style.opacity = 0.1
            puntos++
            document.getElementById("puntos").innerHTML = "Puntos: " + puntos
        }

        if (verificarFin())
        {
            swal.fire({
                title: `El juego ha finalizado`,
                text: `Felicitaciones`,
                icon: `success`
            })
        }

    }, 1000);
}

function verificarFin()
{
    for (let i = 0; i < cantidadTarjetas; i++) 
    {
        let trasera = document.getElementById("trasera" + i)
        if (trasera.style.background != "grey")
        {
            return false
        }
        
    }
    return true;
}




