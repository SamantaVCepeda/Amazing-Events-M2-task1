let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
let nameEvents = [];
let percentage = [];
let capacity = [];
let evento = [];

async function getDataEvents(){
    try{
        let response = await fetch(urlAPI);
        let data = await response.json();
        const dataProcesada = porsesData(data);
        writeTableEventStatics(
            `${dataProcesada.eventoMayorAsistencia.nombre} ${Math. trunc(dataProcesada.eventoMayorAsistencia.porsentaje)}%`,
            `${dataProcesada.eventoMenorAsistencia.nombre} ${Math. trunc(dataProcesada.eventoMenorAsistencia.porsentaje)}%`,
            `${dataProcesada.eventoMayorcapacidad.nombre} ${dataProcesada.eventoMayorcapacidad.capacidad}`)
        writeTablEventUpcoming(dataProcesada.categoriasEstimate)
        writeTableeventPast(dataProcesada.categorias)
    } catch (err) {
        console.log("ERROR TRAYENDO DATOS DE LA API", err)
        return
    }
}

// Esta funcion escribe la tabla de estadisticas
const writeTableEventStatics = (c1, c2, c3) => {
    let tbody = document.getElementById("eventStatics");
    const htmlTr = `<tr>
    <td>${c1}</td>
    <td>${c2}</td>
    <td>${c3}</td>
    </tr>`;
    tbody.innerHTML = htmlTr;
}

// Esta funcion escribe la tabla de futuros
const writeTablEventUpcoming = categorias => {
    let tbody = document.getElementById("eventUpcoming");
    let provHtml = ""

    categorias.map(c => {
        const htmlTr = `<tr>
            <td>${c.nombre}</td>
            <td>${c.ganancia}</td>
            <td>${Math. trunc(c.porsentajeDeAsistencia)} %</td>
            </tr>`;
        provHtml = provHtml + htmlTr
    })
    
    tbody.innerHTML = provHtml;
}

// Esta funcion escribe la tabla de pasados
const writeTableeventPast = categorias => {
    let tbody = document.getElementById("eventPast");
    let provHtml = ""

    categorias.map(c => {
        const htmlTr = `<tr>
            <td>${c.nombre}</td>
            <td>${c.ganancia}</td>
            <td>${Math. trunc(c.porsentajeDeAsistencia)} %</td>
            </tr>`;
        provHtml = provHtml + htmlTr
    })
    
    tbody.innerHTML = provHtml;
}

const porsesData = data => {
    const {currentDate, events} = data

    let eventoMayorAsistencia = {
        nombre: '',
        porsentaje: 0,
        asistencia: 0
    }
    let eventoMenorAsistencia = {
        nombre: '',
        porsentaje: 100,
        asistencia: 0
    }
    let eventoMayorcapacidad = {
        nombre: '',
        porsentaje: 0,
        capacidad: 0
    }
    let categorias = []
    let categoriasEstimate = []

    let dataProcesada = {
        eventoMayorAsistencia,
        eventoMenorAsistencia,
        eventoMayorcapacidad
    }

    data.events.map(e => {
        //DESTRUCTURAMOS
        const {name, capacity, estimate, assistance, category, price} = e

        //Nos fijamos si tiene assistance
        if(assistance) {

            //Calculamos el porsentaje de asistencia al evento
            const porsentajeAsistencia = 100 * assistance  / capacity

            //Vemos cual es el porsentaje mas alto y lo asignamos
            if(porsentajeAsistencia > eventoMayorAsistencia.porsentaje) {
                eventoMayorAsistencia.nombre = name
                eventoMayorAsistencia.porsentaje = porsentajeAsistencia
                eventoMayorAsistencia.asistencia = assistance
            } 

            //vemos cual es el porsentaje mas bajo y lo asignamos
            if(porsentajeAsistencia < eventoMenorAsistencia.porsentaje) {
                eventoMenorAsistencia.nombre = name
                eventoMenorAsistencia.porsentaje = porsentajeAsistencia
                eventoMenorAsistencia.asistencia = assistance
            }

            //Vemos cual es el evento de mayor capacidad y lo asignamos
            const mayorCapacidad = capacity
            if(mayorCapacidad > eventoMayorcapacidad.capacidad){
                eventoMayorcapacidad.nombre = name
                eventoMayorcapacidad.capacidad = mayorCapacidad
            }

            //Cargamos el array de categorias con categorias que no se repitan
            if(!categorias.some(c => c.nombre == category)) {
                const categoryAdd = {
                    nombre: category,
                    asistentes: assistance,
                    capacity,
                    //Asignamos la ganancia de la categoria con el precio del actual evento
                    ganancia: assistance * price,

                }
                categorias.push(categoryAdd)
            } 
            else {
                //Asignamos la ganancia de la categoria con el precio del actual evento
                //Buscamos en que pocision del array de categorias esta la categoria actual
                const index = categorias.findIndex(c => c.nombre == category )

                //Le sumamos la ganancia del event actual
                categorias[index].ganancia = categorias[index].ganancia + assistance * price
                categorias[index].asistentes = categorias[index].asistentes + assistance
                categorias[index].capacity = categorias[index].capacity + capacity
            }
        }
        else {
            //Cargamos el array de categorias con categorias que no se repitan
            if(!categoriasEstimate.some(c => c.nombre == category)) {
                const categoryAdd = {
                    nombre: category,
                    estimate: estimate,
                    capacity,
                    //Asignamos la ganancia de la categoria con el precio del actual evento
                    ganancia: estimate * price,

                }
                categoriasEstimate.push(categoryAdd)
            } 
            else {
                //Asignamos la ganancia de la categoria con el precio del actual evento
                //Buscamos en que pocision del array de categoriasEstimate esta la categoria actual
                const index = categoriasEstimate.findIndex(c => c.nombre == category )

                //Le sumamos la ganancia del event actual
                categoriasEstimate[index].ganancia = categoriasEstimate[index].ganancia + estimate * price
                categoriasEstimate[index].estimate = categoriasEstimate[index].estimate + estimate
                categoriasEstimate[index].capacity = categoriasEstimate[index].capacity + capacity
            }
        }
    })

    //Calculamos porsentaje de asistencia por categoria
    categorias = categorias.map(c => (
        {
            nombre: c.nombre,
            ganancia: c.ganancia,
            porsentajeDeAsistencia: 100 * c.asistentes  / c.capacity
        }
    ))

    categoriasEstimate = categoriasEstimate.map(c => (
        {
            nombre: c.nombre,
            ganancia: c.ganancia,
            porsentajeDeAsistencia: 100 * c.estimate  / c.capacity
        }
    ))
    
    //Le agregamos las categorias a dataProcesada
    dataProcesada = {...dataProcesada, categorias, categoriasEstimate}

    return dataProcesada
}

getDataEvents()
