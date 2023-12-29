//Santiago Blanco (282654) y Maria Agustina Diaz (282825)

class Empleado{
	constructor(nombre,CI,departamento,edad){
		this.nom=nombre;
		this.CI=CI;
		this.dep=departamento;
		this.edad=edad;
		this.can=0;
	}
	toString(){
		return this.nom+" ("+this.CI+")";
	}
	
}

class Rubro{
	constructor(nombre,descripcion){
		this.nom=nombre;
		this.des=descripcion;
	}
	toString(){
		return this.nom;
	}
	toString2(){
		return (this.nom+", "+this.des);
	}	
}

class Oferta{
	constructor (empleado,rubro,detalle,precio){
		this.emp=empleado;
		this.rub=rubro;
		this.det=detalle;
		this.pre=precio;
		this.tipo="-";
	}
	toString(){
		return this.emp+", "+this.rub+", $"+this.pre;
	}
	
}

class Sistema{
	constructor(){
		this.listaEmpleado=[];
		this.listaRubro=[];
		this.listaOferta=[];
	}
	
	agregarEmpleado(empleado){
		this.listaEmpleado.push(empleado);
	}
	darListaEmpleado(){
		return this.listaEmpleado;
	}
	
	buscarEmpleadoPorCedula(cedula){
		let empleadoConEsaCedula=null;
		let todosEmpleados=this.listaEmpleado;
		for(let empleado of todosEmpleados){
			if(cedula==empleado.CI){
				empleadoConEsaCedula=empleado;
			}
		}
		return empleadoConEsaCedula;
	}
	
	buscarRubroPorNombre(nombreRubro){
		let todosRubros=this.listaRubro;
		let rubroConEseNombre=null;
		for(let rubro of todosRubros){
			if(nombreRubro==rubro.nom){
				 rubroConEseNombre=rubro;
			}
		}
		return rubroConEseNombre;
	}
	
	cedulaNoExistente(cedula){
		let cedulaNoExiste = true;
		for (let emp of this.listaEmpleado){
			if (emp.CI == cedula){
				cedulaNoExiste = false;
			}
		}
		return cedulaNoExiste;
	}
	
	rubroNoExistente(nombreRubro){
		let rubroNoExiste = true;
		for (let rubro of this.listaRubro){
			if (rubro.nom == nombreRubro){
				rubroNoExiste = false;
			}
		}
		return rubroNoExiste;
	}
	
	condicionOferta(ciEmp,nombreRubro,detalle){
		let cumpleCondicion = true;
		for(let oferta of this.listaOferta){
			if(oferta.emp.CI==ciEmp&&oferta.rub.nom==nombreRubro&&oferta.det==detalle){
				cumpleCondicion=false;
			}
		}
		return cumpleCondicion;
	}
	
	tresOfertas(empleado){
		let ofertaEmpleado=true;
		if(empleado.can>=3){
			let ofertaEmpleado=true;
		}
		
		return ofertaEmpleado;
	}
	
	agregarRubro(rubro){
		this.listaRubro.push(rubro);
	}
	darListaRubro(){
		return this.listaRubro;
	}
	agregarOferta(oferta){
		this.listaOferta.push(oferta);
	}
	darListaOferta(){
		return this.listaOferta;
	}
	eliminar(posicion){
		this.listaOferta.splice(posicion,1);
	}
	darOrdenadoPorPrecio(nombreRubro){
		
		this.tipoPrecio();
		
		let listaOrdenadaPorPrecio=[];
		
		for(let i=0; i<this.listaOferta.length;i++)
		{
			let oferta=this.listaOferta[i];
			if(oferta.rub.nom==nombreRubro)
			{
				listaOrdenadaPorPrecio.push(oferta);
			}
		}
		
		listaOrdenadaPorPrecio= listaOrdenadaPorPrecio.sort(function(a,b){
		return a.pre-b.pre;
		});
		return listaOrdenadaPorPrecio;
	}
	ordenarNombreDepartamento(nombreRubro){
		
		
		this.tipoPrecio();
		
		let listaOrdenadaPorPrecio=[];
		
		for(let i=0; i<this.listaOferta.length;i++)
		{
			let oferta=this.listaOferta[i];
			if(oferta.rub.nom==nombreRubro)
			{
				listaOrdenadaPorPrecio.push(oferta);
			}
		}
		
		
		return listaOrdenadaPorPrecio.sort(function(a,b){
			return a.emp.dep.localeCompare(b.emp.dep);
		});
	}
	
	rubrosSinOferta(){
		let rubrosSin=[];
		for(let rubro of this.listaRubro){
			let tiene=false;
			for(let oferta of this.listaOferta){
				if(oferta.rub==rubro){
					tiene=true;
				}
			}
			if(!tiene){
				rubrosSin.push(rubro);
			}
		}
		return rubrosSin;
	}
	
	empleadosSinOferta(){
		let empleadoSin=[];
		for(let rubro of this.listaEmpleado){
			let tiene=false;
			for(let oferta of this.listaOferta){
				if(oferta.emp==rubro){
					tiene=true;
				}
			}
			if(!tiene){
				empleadoSin.push(rubro);
			}
		}
		return rubrosSin;
	}
	
	tipoPrecio(){
		let valorMax=0;
		let valorMin=Number.MAX_VALUE;
		let todasOfertas=this.listaOferta;
		for(let oferta of todasOfertas){
			let precio=oferta.pre;
			if(precio>valorMax){
				valorMax=parseInt(precio);
			}
			if(precio<valorMin){
				valorMin=parseInt(precio);
			}
		}
		let rango=valorMax-valorMin;
		let divisionRango=(rango/4);
		let limite1=(divisionRango+valorMin);
		let limite2=((2*divisionRango)+valorMin);
		let limite3=((3*divisionRango)+valorMin);
		if(rango>0){
			for(let oferta of todasOfertas){
				if(valorMin<=oferta.pre && oferta.pre<limite1)
					oferta.tipo="$";
				else
					if(limite1<=oferta.pre && oferta.pre<limite2)
						oferta.tipo="$$";
					else
						if(limite2<=oferta.pre && oferta.pre<limite3)
							oferta.tipo="$$$";
						else
							oferta.tipo="$$$$";
			}
		}
		return todasOfertas;
	}
	rubrosMaximaOferta()
	{
		let retorno=[];
		let maximo=0;
		for(let i=0;i<this.listaRubro.length;i++)
		{
			let rubro=this.listaRubro[i];
			let contador=0;
			for(let j=0;j<this.listaOferta.length;j++)
			{
				let oferta=this.listaOferta[j];
				
				if(oferta.rub.nom==rubro.nom)
				{
					contador++;
				}
			}
			if(maximo<contador)
			{
				retorno=[];
				retorno.push(rubro);
				maximo=contador;
			}	
			else{
				if(maximo==contador)
				{
					retorno.push(rubro);
				}
			}
		}
		if(this.listaOferta.length==0){
			retorno=[];
		}
		return retorno;
	}
	
	actualizarEmpleado()
	{
		for(let i=0;i<this.listaEmpleado.length; i++)
		{
			let empleado=this.listaEmpleado[i];
			let contador=0;
			
			for(let j=0;j<this.listaOferta.length; j++)
			{
				let oferta=this.listaOferta[j];
				if(oferta.emp.CI==empleado.CI)
					contador++;
			}
			this.listaEmpleado[i].can=contador;
		
		}
		
	}
	
	ordenarNombreEmpleado(){
		this.actualizarEmpleado();
		let retorno=this.listaEmpleado.sort(function(a,b){
			return a.nom.localeCompare(b.nom);
		});
		return retorno;
	}
	
	promedio(nombreRubro){
		let contador=0;
		let suma=0;
		let promedio=0;
		for(let oferta of this.listaOferta){
			if(nombreRubro==oferta.rub.nom){
				contador++;
				suma+=parseInt(oferta.pre);
			}
		}
		promedio=parseInt(suma/contador);
		let retorno=promedio;
		if(contador==0){
			retorno="Sin datos";
		}
		return retorno;
	}
}
