// objeto ManagerCorporation
function ManagerCorporation(){
	this.trabajadores = [ ]; // Array vacio de trabajadores, Director, Actor o Representante
	this.producciones = [ ]; // Array vacio de producciones
	this.contratos = [ ]; // Array vacio de contratos
	this.contratosDadosDeBaja = [ ]; // Array vacio de contratos
	this.castings = [ ]; // Array vacio de contratos
	this.pagos = [ ]; // Array vacio de pagos
}



/*---------------------COMIENZO CLASES DEL OBJETO TRABAJADOR-------------------------------------*/
// objeto Trabajador
function Trabajador(sDni,sNombre,sTelefono,sNaciolanidad){
	this.dni = sDni;
	this.nombre = sNombre;
	this.telefono = sTelefono;
	this.nacionalidad = sNaciolanidad;
}

// objeto Director
function Director(sDni,sNombre,sTelefono,sNaciolanidad){
	Trabajador.call(this,sDni,sNombre,sTelefono,sNaciolanidad);
	this.listaProducciones = new Array();
}

Director.prototype = Object.create(Trabajador.prototype);
Director.prototype.constructor = Director;

// objeto Actor
function Actor(sDni,sNombre,sTelefono,sNaciolanidad,sEstatus,sRepresentante){
	Trabajador.call(this,sDni,sNombre,sTelefono,sNaciolanidad);
	this.representante = sRepresentante;
	this.estatus = sEstatus;
}
Actor.prototype = Object.create(Trabajador.prototype);
Actor.prototype.constructor = Actor;

// objeto Representante
function Representante(sDni,sNombre,sTelefono,sNaciolanidad){
	Trabajador.call(this,sDni,sNombre,sTelefono,sNaciolanidad);
	this.listaActores = new Array();
}

Representante.prototype = Object.create(Trabajador.prototype);
Representante.prototype.constructor = Representante;
/*-----------------------FIN CLASES DEL OBJETO TRABAJADOR-------------------------------------*/

/*----------------------COMIENZO CLASE DEL OBJETO PRODUCCIÓN-------------------------------------*/

// objeto Producción
function Produccion(sNombre,sDirector){
	this.nombre = sNombre;
	this.director = sDirector;
}

// objeto Serie
function Serie(sNombre,sDirector,sNumCapitulos){
	Produccion.call(this,sNombre,sDirector);
	this.numCapitulos = sNumCapitulos;
	this.listaCasting = new Array();
	
}

Serie.prototype = Object.create(Produccion.prototype);
Serie.prototype.constructor = Serie;

// objeto Pelicula
function Pelicula(sNombre,sDirector,sFechaEstreno){
	Produccion.call(this,sNombre,sDirector);
	this.fechaEstreno = sFechaEstreno;
	this.listaCasting = new Array();
}
Pelicula.prototype = Object.create(Produccion.prototype);
Pelicula.prototype.constructor = Pelicula;

// objeto Obra
function Obra(sNombre,sDirector,sTipo){
	Produccion.call(this,sNombre,sDirector);
	this.tipo = sTipo;
	this.listaCasting = new Array();
}
Obra.prototype = Object.create(Produccion.prototype);
Obra.prototype.constructor = Obra;

/*----------------------FIN CLASE DEL OBJETO PRODUCCIÓN-------------------------------------*/
/*----------------------COMIENZO CLASE DEL OBJETO CONTRATO-------------------------------------*/
// objeto Contrato
function Contrato(sId,sFechaInicio,sFechaFin,sPapel,sActor,sProduccion,sRepresentante,sPago, sCasting){
	this.id = sId;
	this.fechaInicio = sFechaInicio;
	this.fechaFin = sFechaFin;
	this.papel = sPapel;
	this.actor = sActor;
	this.produccion = sProduccion;
	this.representante = sRepresentante;
	this.pago = sPago;
	this.casting = sCasting;
}
/*----------------------FIN CLASE DEL OBJETO CONTRATO-------------------------------------*/

/*----------------------COMIENZO CLASE DEL OBJETO CASTING-------------------------------------*/
// objeto Casting fechaInicio,fechaFin,nombre,produccion
function Casting(sFechaInicio,sFechaFin,sNombre,sProduccion){
	this.fechaInicio = sFechaInicio;
	this.fechaFin = sFechaFin;
	this.nombre = sNombre;
	this.produccion = sProduccion;
	this.listaActores = new Array();
}
/*----------------------FIN CLASE DEL OBJETO CASTING-------------------------------------*/
/*----------------------COMIENZO CLASE DEL OBJETO PAGO-------------------------------------*/
// objeto Pago
function Pago(sIdPago,sFechaPago,sImportePago,sContrato){
	this.idPago = sIdPago;
	this.fechaPago = sFechaPago;
	this.importePago = sImportePago;
	this.contrato = sContrato;
}
/*----------------------FIN CLASE DEL OBJETO PAGO-------------------------------------*/

var listadoTrabajadores;
ManagerCorporation.prototype.getListadoPorTipoTrabajadores = function (tipoTrabajador){
	var cabeceraCreada = false;
	var primeraCabecera = "";
	var estiloFila = "";
	if(tipoTrabajador=="Actor"){
		primeraCabecera="ACTORES";
		estiloFila="warning";
	}else{
		if(tipoTrabajador=="Director"){
			primeraCabecera="DIRECTORES";
			estiloFila="info";
		}else{
			primeraCabecera="REPRESENTANTES";
			estiloFila="success";
		}
	}
	var selectSql = "Select * from trabajadores";
	var sParametros = "datos="+selectSql;
	var sURL = "php/ejecutaSelect.php";

	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	table.className = "table table-hover";
	var header = table.createTHead();
	$.ajax({url:sURL,
		data : "datos=" + selectSql,
		dataType: "json",
		complete: function (oRespuesta) {
		listadoTrabajadores= JSON.parse(oRespuesta.responseText);
		for(var i=0; i<listadoTrabajadores.length; i++){
		if(listadoTrabajadores[i].TIPO==tipoTrabajador){
			if(!cabeceraCreada){
				var primeraLinea = header.insertRow(-1);
				var celda = document.createElement('th');
				if (listadoTrabajadores[i].TIPO=="Actor") 
					celda.colSpan = Object.keys(listadoTrabajadores[i]).length-1;
				else
					celda.colSpan = Object.keys(listadoTrabajadores[i]).length-3;
				var texto = document.createTextNode(primeraCabecera);
				celda.appendChild(texto);
				primeraLinea.appendChild(celda);
				header.appendChild(primeraLinea);
				header.appendChild(obtenerCabeceraCorrespondiente(header, listadoTrabajadores[i]));
				cabeceraCreada = true;
				table.appendChild(header);
			}
			var linea = tbody.insertRow(-1);
			for(var j=0; j<Object.keys(listadoTrabajadores[i]).length;j++){
				linea = obtenerCeldaCorrespondiente(j+1,listadoTrabajadores[i],linea);
				linea.className=estiloFila;
			}
		}
	}
	table.appendChild(tbody);
	
		}
	});

	
	return table;
}

ManagerCorporation.prototype.getListadoContratos = function (){
	var cabeceraCreada = false;
	var primeraCabecera = "";
	var estiloFila = "success";
	var primeraCabecera="CONTRATOS";

	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	table.className = "table table-hover";
	var header = table.createTHead();

	for(var i=0; i<this.contratos.length; i++){
		if(!cabeceraCreada){
			var primeraLinea = header.insertRow(-1);
			var celda = document.createElement('th');
			celda.colSpan = Object.keys(this.contratos[i]).length;
			var texto = document.createTextNode(primeraCabecera);
			celda.appendChild(texto);
			primeraLinea.appendChild(celda);
			header.appendChild(primeraLinea);
			header.appendChild(obtenerCabeceraCorrespondienteContrato(header, this.contratos[i]));
			cabeceraCreada = true;
			table.appendChild(header);
		}
		var linea = tbody.insertRow(-1);
		for(var j=0; j<Object.keys(this.contratos[i]).length;j++){
			linea = obtenerCeldaCorrespondienteContrato(j+1,this.contratos[i],linea);
			linea.className=estiloFila;
		}
	}
	if(this.contratos.length == 0)
	{
		var text = document.createTextNode("No hay contratos");
		table.appendChild(text);
	}
	table.appendChild(tbody);


	
	return table;
}


ManagerCorporation.prototype.getListadoProduccionPorTipo = function (tipoProduccion){
	var cabeceraCreada = false;
	var primeraCabecera = "";
	var estiloFila = "";
	if(tipoProduccion=="Pelicula"){
		primeraCabecera="PELICULAS";
		estiloFila="warning";
	}else{
		if(tipoProduccion=="Serie"){
			primeraCabecera="SERIES";
			estiloFila="info";
		}else{
			primeraCabecera="OBRAS";
			estiloFila="success";
		}
	}
	
		var selectSql = "Select * from produccion where TIPO_PRODUCCION='"+tipoProduccion+"'";
	var sParametros = "datos="+selectSql;
	var sURL = "php/ejecutaSelect.php";
	
	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	table.className = "table table-hover";
	var header = table.createTHead();
	
	$.ajax({url:sURL,
		data : "datos=" + selectSql,
		dataType: "jsonp",
		complete: function (oRespuesta) {
			
				var listaProducciones = JSON.parse(oRespuesta.responseText);
	
	

	for(var i=0; i<listaProducciones.length; i++){
			if(!cabeceraCreada){
				var primeraLinea = header.insertRow(-1);
				var celda = document.createElement('th');
				celda.colSpan = Object.keys(listaProducciones[i]).length;
				var texto = document.createTextNode(primeraCabecera);
				celda.appendChild(texto);
				primeraLinea.appendChild(celda);
				header.appendChild(primeraLinea);
				header.appendChild(obtenerCabeceraCorrespondienteProduccion(header, listaProducciones[i]));
				cabeceraCreada = true;
				table.appendChild(header);
			}
			var linea = tbody.insertRow(-1);
			for(var j=0; j<Object.keys(listaProducciones[i]).length;j++){
				linea = obtenerCeldaCorrespondienteProduccion(j+1,listaProducciones[i],linea);
				linea.className=estiloFila;
			}
	}
	table.appendChild(tbody);
	}});
	return table;
}



function obtenerCabeceraCorrespondiente(header, trabajador){
	var linea = header.insertRow(-1);
	var texto="";
	var x;
	if (trabajador.TIPO=="Actor") {
		x=1;
	}
	else
		x=3;

	for(var j=0; j<Object.keys(trabajador).length-x;j++){
		var celda = document.createElement('th');
		texto = document.createTextNode(Object.keys(trabajador)[j].charAt(0).toUpperCase() + Object.keys(trabajador)[j].slice(1));

		celda.appendChild(texto);
		linea.appendChild(celda);
	}
	return linea;
}
function obtenerCabeceraCorrespondienteContrato(header, contrato){
	var linea = header.insertRow(-1);
	var texto="";
	var celda = document.createElement('th');
	texto = document.createTextNode("Fecha de inicio");
	celda.appendChild(texto);
	linea.appendChild(celda);

	celda = document.createElement('th');
	texto = document.createTextNode("Fecha de fin");
	celda.appendChild(texto);
	linea.appendChild(celda);

	celda = document.createElement('th');
	texto = document.createTextNode("Papel");
	celda.appendChild(texto);
	linea.appendChild(celda);

	celda = document.createElement('th');
	texto = document.createTextNode("Producción");
	celda.appendChild(texto);
	linea.appendChild(celda);

	celda = document.createElement('th');
	texto = document.createTextNode("Actor");
	celda.appendChild(texto);
	linea.appendChild(celda);

	celda = document.createElement('th');
	texto = document.createTextNode("Pago");
	celda.appendChild(texto);
	linea.appendChild(celda);
	return linea;

}


function obtenerCabeceraCorrespondienteProduccion(header, produccion){
	var linea = header.insertRow(-1);
	var texto="";
	for(var j=0; j<Object.keys(produccion).length;j++){
		var celda = document.createElement('th');
		if(Object.keys(produccion)[j]=='NUMERO_CAPITULOS'){
			texto = document.createTextNode("Número de capítulos");
		}else{
			if(Object.keys(produccion)[j]=='TIPO_OBRA'){
				texto = document.createTextNode("Tipo");
			}else{
				if(Object.keys(produccion)[j]=='FECHA_ESTRENO'){
					texto = document.createTextNode("Fecha de estreno");
				}else{
						texto = document.createTextNode(Object.keys(produccion)[j]);
				}
			}
		}
		celda.appendChild(texto);
		linea.appendChild(celda);
	}
	return linea;
}

function obtenerCeldaCorrespondiente(numeroCelda, trabajador, linea){
	var celda = linea.insertCell(-1);
	switch(numeroCelda){
		case 1:
		var texto = document.createTextNode(trabajador.DNI);
		celda.appendChild(texto);
		break;
		
		case 2:
		var texto = document.createTextNode(trabajador.NOMBRE);
		celda.appendChild(texto);
		break;
		
		case 3:
		var texto = document.createTextNode(trabajador.TELEFONO);
		celda.appendChild(texto);
		break;
		
		case 4:
		var texto = document.createTextNode(trabajador.NACIONALIDAD);
		celda.appendChild(texto);
		break;
		
		case 5:
			if (trabajador.TIPO=="Actor") {
				var texto = document.createTextNode(trabajador.DNI_REPRESENTANTE);
				celda.appendChild(texto);
			}
		break;
		case 6:
			if (trabajador.TIPO=="Actor") {
				var texto = document.createTextNode(trabajador.STATUS);
				celda.appendChild(texto);
			}
		break;

		}
			linea.appendChild(celda);
			return linea;
		}

		function obtenerCeldaCorrespondienteContrato(numeroCelda, contrato, linea){
			var celda = linea.insertCell(-1);
			switch(numeroCelda){
				case 1:
				var texto = document.createTextNode(contrato.fechaInicio);
				celda.appendChild(texto);
				break;

				case 2:
				var texto = document.createTextNode(contrato.fechaFin);
				celda.appendChild(texto);
				break;

				case 3:
				var texto = document.createTextNode(contrato.papel);
				celda.appendChild(texto);
				break;

				case 4:
				var texto = document.createTextNode(contrato.produccion.nombre);
				celda.appendChild(texto);
				break;

				case 5:
				var texto = document.createTextNode(contrato.actor.nombre);
				celda.appendChild(texto);
				break;
				case 6:
				var texto = document.createTextNode(contrato.pago);
				celda.appendChild(texto);
				break;

			}
			linea.appendChild(celda);
			return linea;
		}

		function obtenerCeldaCorrespondienteProduccion(numeroCelda, produccion, linea){
			var celda = linea.insertCell(-1);

			switch(numeroCelda){
				case 1:
				var texto = document.createTextNode(produccion.ID);
				celda.appendChild(texto);
				break;
				case 2:
				var texto = document.createTextNode(produccion.NOMBRE);
				celda.appendChild(texto);
				break;
				case 3:
					var texto = document.createTextNode(produccion.DNI_DIRECTOR);
					celda.appendChild(texto);
				break;
				case 4:
					var texto = document.createTextNode(produccion.TIPO_PRODUCCION);
					celda.appendChild(texto);
				break;
				case 5:
					if(produccion.TIPO_PRODUCCION=='Obra'){
						var texto = document.createTextNode(produccion.TIPO_OBRA);
						celda.appendChild(texto);
					}
				break;
				case 6:
					if(produccion.TIPO_PRODUCCION=='Pelicula'){
						var texto = document.createTextNode(produccion.FECHA_ESTRENO);
						celda.appendChild(texto);
					}
				break;
				case 7:
					if(produccion.TIPO_PRODUCCION=='Serie'){
						var texto = document.createTextNode(produccion.NUMERO_CAPITULOS);
						celda.appendChild(texto);
					}
				break;

			}
			linea.appendChild(celda);
			return linea;
		}

		ManagerCorporation.prototype.getListaDeUnTipoTrabajadorConcreto = function (tipo){
			var  lista= new Array();
			for(var i=0; i<this.trabajadores.length; i++){
				if(this.trabajadores[i].constructor.name==tipo)
					lista.push(this.trabajadores[i]);
			}
			return lista;
		}




		ManagerCorporation.prototype.getTrabajadorPorDniYTipo = function (sDni, tipo){
			var trabajador = false;
	// Busco por DNI de trabajador y TIPO//Clase
	for(var i=0; i<this.trabajadores.length; i++){
		if(this.trabajadores[i].constructor.name==tipo && this.trabajadores[i].dni == sDni)
			trabajador=this.trabajadores[i];
	}
	return trabajador;
}


ManagerCorporation.prototype.getProduccionPorNombeYTipo = function (sNombre, tipo){
	
	var produccion = false;
	
	// Busco por Nombre de Produccion y TIPO//Clase
	for(var i=0; i<this.producciones.length; i++){
		if(this.producciones[i].constructor.name==tipo && this.producciones[i].nombre == sNombre)
			produccion=this.producciones[i];
	}
	return produccion;
}


ManagerCorporation.prototype.asociarActorARepesentante = function (sDniRepresentante, oActor){
	// Busco por dniRepresentante
	for(var i=0; i<this.trabajadores.length; i++){
		if(this.trabajadores[i] instanceof Representante && this.trabajadores[i].dni == sDniRepresentante)
			this.trabajadores[i].listaActores.push(oActor);
	}
}
ManagerCorporation.prototype.asociarProduccionADirector = function (sDniDirector, oProduccion){
	// Busco por dniDirector
	for(var i=0; i<this.trabajadores.length; i++){
		if(this.trabajadores[i] instanceof Director && this.trabajadores[i].dni == sDniDirector)
			this.trabajadores[i].listaProducciones.push(oProduccion);
	}
}

ManagerCorporation.prototype.asociarCastingAProduccion = function (sNombre,tipo,oCasting){
	
	var devolver = false;
	
	// Busco por Nombre de Produccion y TIPO//Clase
	for(var i=0; i<this.producciones.length; i++){
		if(this.producciones[i].constructor.name==tipo && this.producciones[i].nombre == sNombre)
			this.producciones[i].listaCasting.push(oCasting);
		devolver=true;
	}
	return devolver;
}


ManagerCorporation.prototype.altaTrabajador = function (oTrabajador, sTipo){
	this.trabajadores.push(oTrabajador);
	sMensaje = sTipo+" dado de alta";
	return sMensaje;
}

ManagerCorporation.prototype.altaProduccion = function (oProduccion, sTipo){
	this.producciones.push(oProduccion);
	sMensaje = sTipo+" dada de alta";
	return sMensaje;
}

ManagerCorporation.prototype.altaContrato = function (oContrato){
	this.contratos.push(oContrato);
	sMensaje = "Contrato creado";
	return sMensaje;
}

ManagerCorporation.prototype.altaCasting = function (oCasting){
	this.castings.push(oCasting);
	sMensaje = "Casting creado";
	return sMensaje;
}

ManagerCorporation.prototype.buscarCasting = function (nombreProduccion,tipoProduccion, nombreCasting){
	var devolver = false;
	for(var i=0; i<this.producciones.length && !devolver;i++){
		if(this.producciones[i].nombre==nombreProduccion && this.producciones[i].constructor.name == tipoProduccion)
			for(var j=0; j<this.producciones[i].listaCasting.length && !devolver;j++)
				if(this.producciones[i].listaCasting[j].nombre == nombreCasting)
					devolver=this.producciones[i].listaCasting[j];
			}
			return devolver;
		}

var listaTrabajadoresBlobal;
ManagerCorporation.prototype.cargarComboSegunTipoTrabajador = function (tipoTrabajador){

	var selectSql = "Select DNI,NOMBRE from trabajadores where tipo='"+tipoTrabajador+"'";
	var sParametros = "datos="+selectSql;
	var sURL = "php/ejecutaSelect.php";

	var select = document.createElement('select');
	select.className = "form-control";
	select.id = tipoTrabajador;
	select.name = tipoTrabajador;
	$.ajax({url:sURL,
		data : "datos=" + selectSql,
		dataType: "jsonp",
		complete: function (oRespuesta){
			listaTrabajadoresBlobal = JSON.parse(oRespuesta.responseText);

			if(listaTrabajadoresBlobal.length>0){
				for(var i=0; i<listaTrabajadoresBlobal.length;i++){
					var option = document.createElement('option');
					option.value = listaTrabajadoresBlobal[i].DNI;
					var texto = document.createTextNode(listaTrabajadoresBlobal[i].NOMBRE);
					select.appendChild(option);
					option.appendChild(texto);
				}
			}else{
				var option = document.createElement('option');
				option.value = "NoExisten"+tipoTrabajador;
				var texto = document.createTextNode("No existe ningun "+tipoTrabajador);
				select.appendChild(option);
				option.appendChild(texto);

			}
		}
	});
	return select;
	
}

var listaProduccionesGlobal;

ManagerCorporation.prototype.cargarComboProducciones = function (){

	var selectSql = "Select ID, NOMBRE, TIPO_PRODUCCION from produccion";
	var sParametros = "datos="+selectSql;
	var sURL = "php/ejecutaSelect.php";

			var select = document.createElement('select');
			select.className = "form-control";
			select.id = "produccion";
			select.name = "produccion";
	$.ajax({url:sURL,
		data : "datos=" + selectSql,
		dataType: "jsonp",
		complete: function (oRespuesta) {
			listaProduccionesGlobal = JSON.parse(oRespuesta.responseText);


			if(listaProduccionesGlobal.length>0){
				for(var i=0; i<listaProduccionesGlobal.length; i++){
					var option = document.createElement('option');
					var tipoProduccion = listaProduccionesGlobal[i].TIPO_PRODUCCION;
					var texto =  document.createTextNode(listaProduccionesGlobal[i].NOMBRE+" - "+tipoProduccion);
					option.value = listaProduccionesGlobal[i].NOMBRE;
					option.setAttribute("tipoProduccion",tipoProduccion);
					option.setAttribute("idProduccion",listaProduccionesGlobal[i].ID);
					option.appendChild(texto);
					select.appendChild(option);
				}
			}else{
				var option = document.createElement("option");
				option.value = "Noexistenproducciones";
				var texto = document.createTextNode("No se ha creado ninguna produccion");
				option.appendChild(texto);
				select.appendChild(option);
			}
		}
	});

	return select;

}

var listaCastingGlobal;

ManagerCorporation.prototype.cargarComboCastings = function (){

	var selectSql = "Select ID, ID_PRODUCCION, NOMBRE from casting";
	var sParametros = "datos="+selectSql;
	var sURL = "php/ejecutaSelect.php";
		var select = document.createElement("select");
	select.className = "form-control";
	select.id = "casting";
	select.name = "casting";
	$.ajax({url:sURL,
		data : "datos=" + selectSql,
		dataType: "jsonp",
		complete: function (oRespuesta) {
			listaCastingGlobal = JSON.parse(oRespuesta.responseText);



	if(listaCastingGlobal.length>0){
		for(var i=0; i<listaCastingGlobal.length;i++){
			var option = document.createElement("option");
			option.value = listaCastingGlobal[i].NOMBRE;
			option.setAttribute("produccion",listaCastingGlobal[i].ID_PRODUCCION);
			option.setAttribute("idCasting",listaCastingGlobal[i].ID);
			var cadenaTexto = listaCastingGlobal[i].NOMBRE+" - ID_produccion :  "+listaCastingGlobal[i].ID_PRODUCCION;
			var texto = document.createTextNode(cadenaTexto);
			option.appendChild(texto);
			select.appendChild(option);
		}
	}else{
		var option = document.createElement("option");
		option.value = "Noexistencastings";
		var texto = document.createTextNode("No se ha creado ningun casting");
		option.appendChild(texto);
		select.appendChild(option);
	}


	
		}
	});
return select;

}

ManagerCorporation.prototype.buscarActorEnCasting = function (sDniActor, oCasting){
	var bEnc = false;
	for(var i = 0; i<oCasting.listaActores.length && !bEnc;i++)
		if(oCasting.listaActores[i].dni == sDniActor)
			bEnc = true;

		return bEnc;

	}

	function obtenerInputCorrespondiente(numeroCelda, trabajador, linea){
		var celda = linea.insertCell(-1);
		var input = document.createElement('input');
		input.setAttribute("type", "text");
		switch(numeroCelda){
			case 1:
			var texto = document.createTextNode(trabajador.dni);
			celda.appendChild(texto);
			celda.className="dni";
			break;

			case 2:
			input.value  = trabajador.nombre;
			celda.appendChild(input);
			celda.className="nombre";
			break;

			case 3:
			input.value  = trabajador.telefono;
			celda.appendChild(input);
			celda.className="telefono";
			break;

			case 4:
			var texto = document.createTextNode(trabajador.nacionalidad);
			celda.appendChild(texto);
			celda.className="nacionalidad";
			break;

			case 5:
			var combo = oManagerCorporation.cargarComboSegunTipoTrabajador("Representante");
			arrayOptionsCombo = combo.getElementsByTagName("option");
			for(var i=0; i<arrayOptionsCombo.length; i++){
				if(arrayOptionsCombo[i].value == trabajador.representante.dni)
					arrayOptionsCombo[i].selected = true;
			}
			celda.className="representante";
			celda.appendChild(combo);
			break;
			case 6:
			var combo = oManagerCorporation.cargarComboEstatus();
			arrayOptionsCombo = combo.getElementsByTagName("option");
			for(var i=0; i<arrayOptionsCombo.length; i++){
				if(arrayOptionsCombo[i].value == trabajador.estatus)
					arrayOptionsCombo[i].selected = true;
			}
			var texto = document.createTextNode(trabajador.estatus);
			celda.appendChild(combo);
			celda.className="estatus";
			break;

		}
		linea.appendChild(celda);
		return linea;
	}

	ManagerCorporation.prototype.cargarComboEstatus = function (){
		var select = document.createElement('select');
		select.className = "form-control";
		select.id = "estatus";
		select.name = "estatus";
		for(var i=0; i<2;i++){
			var option = document.createElement('option');
			switch(i){
				case 0:
				option.value = "Desconocido";
				var texto = document.createTextNode("Desconocido");
				option.appendChild(texto);
				select.appendChild(option);
				break;
				case 1:
				option.value = "Famoso";
				var texto = document.createTextNode("Famoso");
				option.appendChild(texto);
				select.appendChild(option);
				break;
			}
		}
		return select;
	}

////////////////////////////////////////////////////////////////////
ManagerCorporation.prototype.getListadoObrasPorGenero = function (genero){
	var cabeceraCreada = false;
	var primeraCabecera = "";
	var estiloFila = "";
	var bEncontrado = false;
	primeraCabecera=genero;
	estiloFila="success";
	
	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	table.className = "table table-hover";
	var header = table.createTHead();
	
	
	var selectSql = "Select * from produccion where TIPO_PRODUCCION='Obra' and TIPO_OBRA='"+genero+"'";
	var sParametros = "datos="+selectSql;
	var sURL = "php/ejecutaSelect.php";

	$.ajax({url:sURL,
		data : "datos=" + selectSql,
		dataType: "jsonp",
	complete: function (oRespuesta) {
		 var listaProducciones = JSON.parse(oRespuesta.responseText);
		for(var i=0; i<listaProducciones.length; i++){
			if(!cabeceraCreada){
				bEncontrado = true;
				var primeraLinea = header.insertRow(-1);
				var celda = document.createElement('th');
				celda.colSpan = Object.keys(listaProducciones[i]).length;
				var texto = document.createTextNode(primeraCabecera);
				celda.appendChild(texto);
				primeraLinea.appendChild(celda);
				header.appendChild(primeraLinea);
				header.appendChild(obtenerCabeceraCorrespondienteProduccion(header, listaProducciones[i]));
				cabeceraCreada = true;
				table.appendChild(header);
			}
			var linea = tbody.insertRow(-1);
			for(var j=0; j<Object.keys(listaProducciones[i]).length;j++){
				linea = obtenerCeldaCorrespondienteProduccion(j+1,listaProducciones[i],linea);
				linea.className=estiloFila;
			}
			
			if (!bEncontrado) {
				var texto = document.createTextNode("No hay obras con ese género");
				table.appendChild(texto);
			}
				table.appendChild(tbody);
	}
		
	}});
	
	return table;
}

////////////////////////////////////////////////////////////////////
ManagerCorporation.prototype.getListadoSeriesNumCap = function (minCaps, maxCaps){
	var cabeceraCreada = false;
	var primeraCabecera = "";
	var estiloFila = "";
	var bEncontrado = false;
	primeraCabecera=genero;
	estiloFila="success";
	
	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	table.className = "table table-hover";
	var header = table.createTHead();

	var selectSql = "Select * from produccion where TIPO_PRODUCCION='Serie'";
	var sParametros = "datos="+selectSql;
	var sURL = "php/ejecutaSelect.php";

	$.ajax({url:sURL,
		data : "datos=" + selectSql,
		dataType: "jsonp",
	complete: function (oRespuesta) {
		 var listaProducciones = JSON.parse(oRespuesta.responseText);
		for(var i=0; i<listaProducciones.length; i++){
		if(listaProducciones[i].NUMERO_CAPITULOS>=minCaps && listaProducciones[i].NUMERO_CAPITULOS<=maxCaps){
			if(!cabeceraCreada){
				bEncontrado = true;
				var primeraLinea = header.insertRow(-1);
				var celda = document.createElement('th');
				celda.colSpan = Object.keys(listaProducciones[i]).length;
				var texto = document.createTextNode(primeraCabecera);
				celda.appendChild(texto);
				primeraLinea.appendChild(celda);
				header.appendChild(primeraLinea);
				header.appendChild(obtenerCabeceraCorrespondienteProduccion(header, listaProducciones[i]));
				cabeceraCreada = true;
				table.appendChild(header);
			}
			var linea = tbody.insertRow(-1);
			for(var j=0; j<Object.keys(listaProducciones[i]).length;j++){
				linea = obtenerCeldaCorrespondienteProduccion(j+1,listaProducciones[i],linea);
				linea.className=estiloFila;
				
			}
		}
	}
	table.appendChild(tbody);

	if (!bEncontrado) {
		var texto = document.createTextNode("No hay series con ese rango de capítulos");
		table.appendChild(texto);
	}
	
		
	}});
	
	
	
	return table;
}

////////////////////////////////////////////////////////////////////


ManagerCorporation.prototype.parseoFecha = function (fecha){
	var values=fecha.split("/");
	var fechaDev =new Date(values[2],(values[1]-1),values[0]);

	return fechaDev;


}

ManagerCorporation.prototype.crearComboContratos = function (){
	
		var selectSql = "Select ID,DNI_ACTOR,ID_PRODUCCION from contrato";
	var sParametros = "datos="+selectSql;
	var sURL = "php/ejecutaSelect.php";

	var select = document.createElement("select");
	var option = document.createElement("option");
	option.appendChild(document.createTextNode("Seleccione un contrato"));
	select.appendChild(option);
	// Si encuentra un contrato que ya ha sido dado de baja anterior mente no lo va a mostrar en el combo.
	var contratoYaDadoDeBaja =  false;
	var haGenerado1OpcionAlmenos = false;
	var listaContratos;
	$.ajax({url:sURL,
		data : "datos=" + selectSql,
		dataType: "jsonp",
		complete: function (oRespuesta) {
			
			listaContratos = JSON.parse(oRespuesta.responseText);
			console.log(listaContratos);
			for(var i=0; i<listaContratos.length;i++){
					var option = document.createElement("option");
					option.value = listaContratos[i].ID;
					var actor = "";
					var produccion="";
					var texto="Contrato id: "+listaContratos[i].ID+" - ";
					var selectProducion="Select nombre from produccion where id="+listaContratos[i].ID_PRODUCCION;
					var s = "Select nombre from trabajadores where dni='"+listaContratos[i].DNI_ACTOR+"' and (tipo='Actor' or tipo='null')";
					$.ajax({url:sURL,
						data : "datos= "+s,
						dataType: "jsonp",
						async: false,
						complete: function (oRespuesta) {
							actor=JSON.parse(oRespuesta.responseText);
							 texto+="Actor: "+actor[0].nombre+" - Produccion: ";
								$.ajax({url:sURL,
									data : "datos="+selectProducion,
									async: false,
									dataType: "jsonp",
									complete: function (oRespuesta) {
										produccion=JSON.parse(oRespuesta.responseText);
										texto+=produccion[0].nombre;
										
										option.appendChild(document.createTextNode(texto));
										select.appendChild(option);
									}
								});
						}
					});
			
			}
			
		}
	
	
	});
	



		return select;
	}

	ManagerCorporation.prototype.getListadoPeliculasPorFecha = function (fechaMin, fechaMax){
		var cabeceraCreada = false;
		var primeraCabecera = "";
		var estiloFila = "";
		var bEncontrado = false;

    primeraCabecera=genero;
    estiloFila="success";
	var selectSql = "Select * from produccion where TIPO_PRODUCCION='Pelicula' and FECHA_ESTRENO BETWEEN '"+fechaMin+"' and '"+fechaMax+"'";
	var sParametros = "datos="+selectSql;
	var sURL = "php/ejecutaSelect.php";
	
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    table.className = "table table-hover";
    var header = table.createTHead();
	
	$.ajax({url:sURL,
		data : "datos=" + selectSql,
		dataType: "jsonp",
		complete: function (oRespuesta) {
			
				var listaProducciones = JSON.parse(oRespuesta.responseText);
				
					for(var i=0; i<listaProducciones.length; i++){
						if(!cabeceraCreada){
							bEncontrado = true;
							var primeraLinea = header.insertRow(-1);
							var celda = document.createElement('th');
							celda.colSpan = Object.keys(listaProducciones[i]).length;
							var texto = document.createTextNode(primeraCabecera);
							celda.appendChild(texto);
							primeraLinea.appendChild(celda);
							header.appendChild(primeraLinea);
							header.appendChild(obtenerCabeceraCorrespondienteProduccion(header, listaProducciones[i]));
							cabeceraCreada = true;
							table.appendChild(header);
						}
						var linea = tbody.insertRow(-1);
						for(var j=0; j<Object.keys(listaProducciones[i]).length;j++){
							linea = obtenerCeldaCorrespondienteProduccion(j+1,listaProducciones[i],linea);
							linea.className=estiloFila;
						}
					}
				table.appendChild(tbody);

				if (!bEncontrado) {
					var texto = document.createTextNode("No hay películas con ese rango de fechas");
					table.appendChild(texto);
				}
	
	}});
	


    return table;
}


