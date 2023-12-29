//Santiago Blanco (282654) y Maria Agustina Diaz (282825)

window.addEventListener("load",inicio);

let sistema = new Sistema();

function inicio(){
	document.getElementById("agregarEmpleado").addEventListener("click",agregarAltaEmpleado);
	document.getElementById("agregarRubro").addEventListener("click",agregarAltaRubro);
	document.getElementById("agregarOferta").addEventListener("click",agregarAltaOferta);
	document.getElementById("borrarOferta").addEventListener("click",borrarBajaOferta);
	document.getElementById("consultar").addEventListener("click",consultarOfertas);
	//cargarListaRubrosSinOferta();
	//cargarListaRubrosMaximaOferta();
	//cargarSegundaTabla();
}

function agregarAltaEmpleado(){
	let nom=document.getElementById("nombreEmpleado").value;
	let ced=document.getElementById("CI").value;
	let dep=document.getElementById("dep").value;
	let edad=document.getElementById("edad").value;
	if (document.getElementById("formAltaEmpleados").reportValidity()){ 
		if(sistema.cedulaNoExistente(ced)){
		
		let empleado = new Empleado(nom,ced,dep,edad);
	
		sistema.agregarEmpleado(empleado);
		
		document.getElementById("formAltaEmpleados").reset();
		
		cargarSelectEmpleados();
		}
		else{
		alert("Cedula Repetida, intente nuevamente");
		document.getElementById("formAltaEmpleados").reset();
		}
	}
	cargarSegundaTabla();
}

function cargarSelectEmpleados(){
	let selectEmpleado=document.getElementById("listaEmpleados");
	selectEmpleado.innerHTML="";
	let todosEmpleados = sistema.darListaEmpleado();
	for (elemento of todosEmpleados){
		let opcion=document.createElement("option");
		opcion.value = elemento.CI;
		let nodo=document.createTextNode(elemento);
		opcion.appendChild(nodo);
		selectEmpleado.appendChild(opcion);
	}
}



function agregarAltaRubro(){
	if (document.getElementById("formAltaRubro").reportValidity()){
		let nom=document.getElementById("nombreRubro").value;
		let des=document.getElementById("descripcion").value;
		
		if(sistema.rubroNoExistente(nom)){
		
		let rubro = new Rubro(nom,des);
	
		sistema.agregarRubro(rubro);
		
		document.getElementById("formAltaRubro").reset();
		
		cargarSelectRubros();
		cargarSelectConsultar();
		cargarListaRubrosSinOferta();
		cargarListaRubrosMaximaOferta();
		}
		else{
			alert("Rubro ya existente");
		}
		
	}
}

function cargarSelectRubros(){
	let selectRubro=document.getElementById("listaRubro");
	selectRubro.innerHTML="";
	let todosRubros = sistema.darListaRubro();
	for (elemento of todosRubros){
		let opcion=document.createElement("option");
		opcion.value=elemento.nom;
		let nodo=document.createTextNode(elemento);
		opcion.appendChild(nodo);
		selectRubro.appendChild(opcion);
	}
}

function cargarSelectConsultar(){
	let selectRubro=document.getElementById("ofertaRubro");
	selectRubro.innerHTML="";
	let todosRubros = sistema.darListaRubro();
	for (elemento of todosRubros){
		let opcion=document.createElement("option");
		opcion.value=elemento.nom;
		let nodo=document.createTextNode(elemento);
		opcion.appendChild(nodo);
		selectRubro.appendChild(opcion);
	}
}

function agregarAltaOferta(){
	if (document.getElementById("formAltaOferta").reportValidity()){
		let ciEmp=document.getElementById("listaEmpleados").value;
		let nombreRubro=document.getElementById("listaRubro").value;
		let detalle=document.getElementById("detalle").value;
		let precio=document.getElementById("precio").value;
		
		let empleado = sistema.buscarEmpleadoPorCedula(ciEmp);
		
		if(sistema.tresOfertas(empleado)){
		
		if(sistema.condicionOferta(ciEmp,nombreRubro,detalle)){
			
		let rubro = sistema.buscarRubroPorNombre(nombreRubro);
		
		let oferta = new Oferta(empleado,rubro,detalle,precio);
	
		sistema.agregarOferta(oferta);
		
		document.getElementById("formAltaOferta").reset();
		
		cargarSelectOfertas();
		cargarListaRubrosSinOferta();
		cargarListaRubrosMaximaOferta();
		cargarSegundaTabla();
		}
		else{
			alert("El empleado tiene 3 ofertas");
		}
		}
		else{
			alert("El empleado tiene 3 ofertas");
		}
	}
}

function cargarSelectOfertas(){
	let selectOferta=document.getElementById("listaOferta");
	selectOferta.innerHTML="";
	let todasOfertas = sistema.darListaOferta();
	let i=0; 
	for (elemento of todasOfertas){
		let opcion=document.createElement("option");
		opcion.value=i;
		i++;
		let nodo=document.createTextNode(elemento);
		opcion.appendChild(nodo);
		selectOferta.appendChild(opcion);
	}
	if (todasOfertas.length==0){
		let opcion=document.createElement("option");
		let nodo=document.createTextNode("Sin datos");
		opcion.appendChild(nodo);
		selectOferta.appendChild(opcion);
	}
}

function borrarBajaOferta(){
	let elegido = document.getElementById("listaOferta").selectedIndex;
	sistema.eliminar(elegido);
	cargarSelectOfertas();
	cargarSegundaTabla();
	cargarListaRubrosSinOferta();
	cargarListaRubrosMaximaOferta();
}

function consultarOfertas(){
	
	if(document.getElementById("ordenPrecio").checked){ 
		cargarTablaPorPrecio();
	}
	else{
		cargarTablaPorDepartamento();
	}
	
	let captionRubro=document.getElementById("capTablaRubro");
	captionRubro.innerHTML=document.getElementById("ofertaRubro").value;
	let captionPromedio=document.getElementById("capTablaProm");
	let nombreParaPromedio=document.getElementById("ofertaRubro").value;
	captionPromedio.innerHTML=sistema.promedio(nombreParaPromedio);
}

function cargarTablaPorPrecio(){
	let tabla = document.getElementById("tablaOfertas");
	tabla.innerHTML="";
	let nombreRubro=document.getElementById("ofertaRubro").value;
	let datos=sistema.darOrdenadoPorPrecio(nombreRubro);
	for(let oferta of datos){
		let fila = tabla.insertRow();
		let celdaNom = fila.insertCell();
		celdaNom.innerHTML=oferta.emp.nom;
		let celdaDep = fila.insertCell();
		celdaDep.innerHTML=oferta.emp.dep;
		let celdaDetalle = fila.insertCell();
		celdaDetalle.innerHTML=oferta.det;
		let celdaPrecio = fila.insertCell();
		celdaPrecio.innerHTML=oferta.pre;
		let celdaTipo = fila.insertCell();
		celdaTipo.innerHTML=oferta.tipo;
	}
}

function cargarTablaPorDepartamento(){
	let tabla = document.getElementById("tablaOfertas");
	tabla.innerHTML="";
	let nombreRubro=document.getElementById("ofertaRubro").value;
	let datos=sistema.ordenarNombreDepartamento(nombreRubro);
	for(let oferta of datos){
		let fila = tabla.insertRow();
		let celdaNom = fila.insertCell();
		celdaNom.innerHTML=oferta.emp.nom;
		let celdaDep = fila.insertCell();
		celdaDep.innerHTML=oferta.emp.dep;
		let celdaDetalle = fila.insertCell();
		celdaDetalle.innerHTML=oferta.det;
		let celdaPrecio = fila.insertCell();
		celdaPrecio.innerHTML=oferta.pre;
		let celdaTipo = fila.insertCell();
		celdaTipo.innerHTML=oferta.tipo;
	}
}



function cargarListaRubrosSinOferta(){
	document.getElementById("listaSinOfertas").innerHTML = "";
	let datos = sistema.rubrosSinOferta();
	for (let i=0; i<datos.length; i++){
		let nodo = document.createElement("li");
		let nodoTexto = document.createTextNode(datos[i].nom+", "+datos[i].des);
		nodo.appendChild(nodoTexto);
		document.getElementById("listaSinOfertas").appendChild(nodo);
	}
}

function cargarListaRubrosMaximaOferta(){
	let listaRubro = document.getElementById("listaMaxOfertas");
	listaRubro.innerHTML = ""
	let datos = sistema.rubrosMaximaOferta();
	for (let i=0; i<datos.length; i++){
		let nodo = document.createElement("li");
		let nodoTexto = document.createTextNode(datos[i].nom+", "+datos[i].des);
		nodo.appendChild(nodoTexto);
		listaRubro.appendChild(nodo);
	}
}

function cargarListaEmpleadosSinOferta(){
	let listaRubro = document.getElementById("listaSinEmpleados");
	listaRubro.innerHTML = ""
	let datos = sistema.rubrosMaximaOferta();
	for (let i=0; i<datos.length; i++){
		let nodo = document.createElement("li");
		let nodoTexto = document.createTextNode(datos[i].nom+", "+datos[i].des);
		nodo.appendChild(nodoTexto);
		listaRubro.appendChild(nodo);
	}
}

function cargarSegundaTabla(){
	let tabla = document.getElementById("tablaEmpleados");
	tabla.innerHTML="";
	let datos=sistema.ordenarNombreEmpleado();
	for(let empleado of datos){
		let fila = tabla.insertRow();
		let celdaNom = fila.insertCell();
		celdaNom.innerHTML=empleado.nom;
		let celdaCed = fila.insertCell();
		celdaCed.innerHTML=empleado.CI;
		let celdaDep = fila.insertCell();
		celdaDep.innerHTML=empleado.dep;
		let celdaEdad = fila.insertCell();
		celdaEdad.innerHTML=empleado.edad;
		let celdaCantOfertas = fila.insertCell();
		celdaCantOfertas.innerHTML=empleado.can;
	}
}