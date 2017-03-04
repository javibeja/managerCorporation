// Instanciamos el objeto principal
var oManagerCorporation = new ManagerCorporation();
/*--------------------------------------------------------CARGA DE DATOS XML*/
function cargarDocumentoXML(nombreArchivo)
{
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
        else // code for IE5 and IE6
        {
        	xhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET",nombreArchivo,false);

        xhttp.send();

        return xhttp.responseXML;
    }


    function peticionAjax2(sURL,sParametros){

	// PRIMERO: configuracion de la peticion
	oAjax = inicializa_xhr();

	oAjax.open("POST",sURL,true);
	
	oAjax.addEventListener("readystatechange",procesarRespuesta2,false);	

	oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	// SEGUNDO : hacer la peticion
	oAjax.send(sParametros);
	
}

function procesarRespuesta2(){

}

var oXML = cargarDocumentoXML("datos de prueba.xml");

var arrayDirectores= oXML.getElementsByTagName("director");
var arrayRepresentantes= oXML.getElementsByTagName("representante");
var arrayActores= oXML.getElementsByTagName("actor");
var arrayPeliculas= oXML.getElementsByTagName("pelicula");
var arraySeries= oXML.getElementsByTagName("serie");
var arrayObras= oXML.getElementsByTagName("obra");
var arrayCastings =  oXML.getElementsByTagName("casting");

for(var j = 0; j<arrayDirectores.length; j++)
{
	var dni = arrayDirectores[j].getElementsByTagName("dni")[0].textContent;
	var nombre = arrayDirectores[j].getElementsByTagName("nombre")[0].textContent;
	var telefono = arrayDirectores[j].getElementsByTagName("telefono")[0].textContent;
	var nacionalidad = arrayDirectores[j].getElementsByTagName("nacionalidad")[0].textContent;

	var oDirector = new Director (dni,nombre,telefono,nacionalidad);
	var oTrabajador = {
		dni : dni,
		nombre: nombre,
		tlfn: telefono,
		nacionalidad: nacionalidad,
		estatus: "null",
		representante: "null",
		tipo: "Director"
	};
	var sParametros = "datos=" + JSON.stringify(oTrabajador);
	peticionAjax2("php/altaTrabajador.php",sParametros);

		oManagerCorporation.altaTrabajador(oDirector);// Esta linea comentar cuando no queramos que se guarden los Directores del xml en memoria
	}
	
	for(var j = 0; j<arrayRepresentantes.length; j++)
	{
		var dni = arrayRepresentantes[j].getElementsByTagName("dni")[0].textContent;
		var nombre = arrayRepresentantes[j].getElementsByTagName("nombre")[0].textContent;
		var telefono = arrayRepresentantes[j].getElementsByTagName("telefono")[0].textContent;
		var nacionalidad = arrayRepresentantes[j].getElementsByTagName("nacionalidad")[0].textContent;
		
		var oRepresentante = new Representante (dni,nombre,telefono,nacionalidad);
		
		var oTrabajador = {
			dni : dni,
			nombre: nombre,
			tlfn: telefono,
			nacionalidad: nacionalidad,
			estatus: "null",
			representante: "null",
			tipo: "Representante"
		};
		var sParametros = "datos=" + JSON.stringify(oTrabajador);
		peticionAjax2("php/altaTrabajador.php",sParametros);
		oManagerCorporation.altaTrabajador(oRepresentante);// Esta linea comentar cuando no queramos que se guarden los Representantes del xml en memoria
	}

	for(var j = 0; j<arrayActores.length; j++)
	{
		var dni = arrayActores[j].getElementsByTagName("dni")[0].textContent;
		var nombre = arrayActores[j].getElementsByTagName("nombre")[0].textContent;
		var telefono = arrayActores[j].getElementsByTagName("telefono")[0].textContent;
		var nacionalidad = arrayActores[j].getElementsByTagName("nacionalidad")[0].textContent;
		var estatus = arrayActores[j].getElementsByTagName("estatus")[0].textContent;
		
		var oTrabajador = {
			dni : dni,
			nombre: nombre,
			tlfn: telefono,
			nacionalidad: nacionalidad,
			estatus: estatus,
			representante: arrayActores[j].getElementsByTagName("rep")[0].textContent,
			tipo: "Actor"
		};
		var sParametros = "datos=" + JSON.stringify(oTrabajador);
		peticionAjax2("php/altaTrabajador.php",sParametros);
		
		var representante = oManagerCorporation.getTrabajadorPorDniYTipo(arrayActores[j].getElementsByTagName("rep")[0].textContent,"Representante");
		var oActor = new Actor (dni,nombre,telefono,nacionalidad,estatus,representante);
		oManagerCorporation.altaTrabajador(oActor);// Esta linea comentar cuando no queramos que se guarden los Actores del xml en memoria
		oManagerCorporation.asociarActorARepesentante(arrayActores[j].getElementsByTagName("rep")[0].textContent, oActor);//// Esta linea comentar cuando no queramos que se guarden los Acotres del xml en memoria
	}
	
	for(var j = 0; j<arrayPeliculas.length; j++)
	{
		var nombre = arrayPeliculas[j].getElementsByTagName("nombre")[0].textContent;
		var director = oManagerCorporation.getTrabajadorPorDniYTipo(arrayPeliculas[j].getElementsByTagName("dir")[0].textContent, "Director");
		var fecha = arrayPeliculas[j].getElementsByTagName("fecha")[0].textContent;
		
			/*var oProduccion = {
				nombre: nombre,
				director: arrayPeliculas[j].getElementsByTagName("dir")[0].textContent,
				tipo: "Pelicula",
				tipo_obra: "null",
				fecha_estreno: fecha,
				num_capitulos: "null"
			};
			var sParametros = "datos=" + JSON.stringify(oProduccion);
			peticionAjax2("php/altaProduccion.php",sParametros);*/
		}

		for(var j = 0; j<arraySeries.length; j++)
		{
			var nombre = arraySeries[j].getElementsByTagName("nombre")[0].textContent;
			var director = oManagerCorporation.getTrabajadorPorDniYTipo(arraySeries[j].getElementsByTagName("dir")[0].textContent, "Director");
			var numCaps = arraySeries[j].getElementsByTagName("numCaps")[0].textContent;


			/*var oProduccion = {
				nombre: nombre,
				director: arraySeries[j].getElementsByTagName("dir")[0].textContent,
				tipo: "Serie",
				tipo_obra: "null",
				fecha_estreno: "null",
				num_capitulos: numCaps,
			};
			var sParametros = "datos=" + JSON.stringify(oProduccion);
			peticionAjax2("php/altaProduccion.php",sParametros);*/
		}

		for(var j = 0; j<arrayObras.length; j++)
		{
			var nombre = arrayObras[j].getElementsByTagName("nombre")[0].textContent;
			var director = oManagerCorporation.getTrabajadorPorDniYTipo(arrayObras[j].getElementsByTagName("dir")[0].textContent, "Director");
			var genero = arrayObras[j].getElementsByTagName("genero")[0].textContent;
		/*	var oProduccion = {
				nombre: nombre,
				director: arrayObras[j].getElementsByTagName("dir")[0].textContent,
				tipo: "Obra",
				tipo_obra: genero,
				fecha_estreno: "null",
				num_capitulos: "null",
			};
			var sParametros = "datos=" + JSON.stringify(oProduccion);
			peticionAjax2("php/altaProduccion.php",sParametros);*/
		}

		/*for(var j = 0; j<arrayCastings.length; j++)
		{
			var fechaIni = arrayCastings[j].getElementsByTagName("fechaIni")[0].textContent;
			var fechaFin = arrayCastings[j].getElementsByTagName("fechaFin")[0].textContent;
			var nombre = arrayCastings[j].getElementsByTagName("nombre")[0].textContent;
			var nombreP = arrayCastings[j].getElementsByTagName("nombreP")[0].textContent;
			var tipoP = arrayCastings[j].getElementsByTagName("tipoP")[0].textContent 
			var produccion = oManagerCorporation.getProduccionPorNombeYTipo(nombreP,tipoP);
			var oCasting = new Casting (fechaIni,fechaFin,nombre,produccion);
			oManagerCorporation.altaCasting(oCasting);
			oManagerCorporation.asociarCastingAProduccion(nombreP,tipoP,oCasting);
		}*/

		/*-------------------------------------------------FIN DE CARGA DE DATOS XML*/

		/*------------------------------------------------------------------LISTADOS*/
		var tipoListado="";

		function listarTodo(){
			tipoListado="todo";
			window.open("listados.html");
		}


		function listadoActores(){
			tipoListado="Actor";
			window.open("listados.html");
		}
		function listadoRepresentantes(){
			tipoListado="Representante";
			window.open("listados.html");
		}
		function listadoDirectores(){
			tipoListado="Director";
			window.open("listados.html");
		}

		function listadoProducciones(){
			tipoListado="producciones";
			window.open("listados.html");
		}

		/*function listadoProduccionesTipo(boton){
			tipoListado=boton.getAttribute("value");
			window.open("listados.html");
		}*/


		var genero = "";
		function listadoObrasPorGenero(){

			tipoListado="obrasPorGenero";
			genero = frmListarObrasGenero.tipoObraListado.value;
			window.open("listados.html");
		}

		var minCaps = "";
		var maxCaps = "";
		function listadoSeriesNumCap(){
			var validacion = validarNumCaps();
			if (validacion=="") {

				tipoListado="seriesNumCap";
				minCaps = parseInt(frmListarSeriesNumCap.minCaps.value);
				maxCaps = parseInt(frmListarSeriesNumCap.maxCaps.value);
				window.open("listados.html");
			}
			else
			{
				toastr.warning(validacion);
			}

		}

		var fechaMin = "";
		var fechaMax = "";
		function listadoPeliculasPorFecha(){


				tipoListado="peliculasPorFecha";
				fechaMin = frmListarPeliculasPorFecha.fechaMin.value;
				fechaMax = frmListarPeliculasPorFecha.fechaMax.value;
				window.open("listados.html");

		}




		/*------------------------------------------------------------------FIN LISTADOS*/
		/*-----------------------------------------------------------------------BOTONES*/

		var botonListarPeliculas = document.getElementById("listarProduccionesTipoPeliculas");
		botonListarPeliculas.addEventListener("click", function(){ listadoProduccionesTipo(botonListarPeliculas);},false);

		var botonListarObras = document.getElementById("listarProduccionesTipoObras");
		botonListarObras.addEventListener("click", function(){ listadoProduccionesTipo(botonListarObras);},false);

		var botonListarSeries = document.getElementById("listarProduccionesTipoSeries");
		botonListarSeries.addEventListener("click", function(){ listadoProduccionesTipo(botonListarSeries);},false);

	

		var botonListarActores = document.getElementById("listadoActores");
		botonListarActores.addEventListener("click",listadoActores,false);


		var botonListarRepresentantes = document.getElementById("listadoRepresentantes");
		botonListarRepresentantes.addEventListener("click",listadoRepresentantes,false);

		var botonBajaTrabajador = document.getElementById("btnAceptarBajaTrabajador");
		botonBajaTrabajador.addEventListener("click",darDeBajaTrabajador,false);


		var botonListarDirectores = document.getElementById("listadoDirectores");
		botonListarDirectores.addEventListener("click",listadoDirectores,false);




		frmAltaTrabajador.altaTrabajador.addEventListener("click",altaTrabajador,false);

		frmAltaContrato.aceptarContrato.addEventListener("click",altaContrato,false);
		frmAltaCasting.altaCasting.addEventListener("click",altaCasting,false);
		frmAñadirActorACasting.aceptarAñadirActorACasting.addEventListener("click",altaAñadirActorACasting,false);

		frmListarObrasGenero.btnListarObrasGenero.addEventListener("click",listadoObrasPorGenero,false);
		frmListarSeriesNumCap.btnListarSeriesNumCap.addEventListener("click",listadoSeriesNumCap,false);
		frmListarPeliculasPorFecha.btnListarPeliculasPorFecha.addEventListener("click",listadoPeliculasPorFecha,false);

//////////////////////////////////////////////////////////////////////////////////////////////////




$(function() {

$( "#listarPeliculasEntreFechas" ).on( "click", function() {
		$( "#divListarPeliculasPorFecha" ).dialog({
			resizable: false,
			modal       :   true,
			width       :   400,
			heigth      :   281,
			show: {
				effect: "blind",
				duration: 1000
			},
			position: { 
				my:  'top',
				at:  'bottom',
				of:  $('#navbar')
			},
			open: function (event, ui) {
				$(this).css('overflow', 'hidden'); //this line does the actual hiding
				$(this).closest(".ui-dialog")
				.find(".ui-dialog-titlebar-close")
				.removeClass("ui-dialog-titlebar-close")
				.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
	});

$( "#listarSeriesNumCap" ).on( "click", function() {
		$( "#divListarSeriesNumCap" ).dialog({
			resizable: false,
			modal       :   true,
			width       :   400,
			heigth      :   281,
			show: {
				effect: "blind",
				duration: 1000
			},
			position: { 
				my:  'top',
				at:  'bottom',
				of:  $('#navbar')
			},
			open: function (event, ui) {
				$(this).css('overflow', 'hidden'); //this line does the actual hiding
				$(this).closest(".ui-dialog")
				.find(".ui-dialog-titlebar-close")
				.removeClass("ui-dialog-titlebar-close")
				.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
	});

$( "#listarObrasPorGenero" ).on( "click", function() {
	cargarComboTipoObra();
      

function cargarComboTipoObra(){
   
   var oArrayTipoObra = null;

   // Existe en almacenamiento local
   if(localStorage["tipoObra"] != null){
      oArrayTipoObra = JSON.parse(localStorage["tipoObra"]);
      rellenaCombo(oArrayTipoObra);
   } else {
		$.get('php/ejecutaSelect.php',"datos=Select * from tipos_obra",tratarGetTipoObra,'json');
   }
}
function tratarGetTipoObra(oArrayTipoObra, sStatus, oXHR){

      rellenaCombo(oArrayTipoObra);
      
      // Guardar en localStorage
      localStorage["tipoObra"] = JSON.stringify(oArrayTipoObra);
      

}

function rellenaCombo(oArrayTipoObra){
      $("#tipoObraListado").empty();
      
      $.each(oArrayTipoObra, function( i , elemento){
      
         $('<option value="' + elemento.TIPO + '" >' +  elemento.TIPO + '</option>').appendTo("#tipoObraListado");
      
      });

}

		$( "#listarObrasGenero" ).dialog({
			resizable: false,
			modal       :   true,
			width       :   400,
			heigth      :   281,
			show: {
				effect: "blind",
				duration: 1000
			},
			position: { 
				my:  'top',
				at:  'bottom',
				of:  $('#navbar')
			},
			open: function (event, ui) {
				$(this).css('overflow', 'hidden'); //this line does the actual hiding
				$(this).closest(".ui-dialog")
				.find(".ui-dialog-titlebar-close")
				.removeClass("ui-dialog-titlebar-close")
				.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
	});

 	//FORMULARIO AÑADE TRABAJADOR\\

 	$( "#añadeTrabajador" ).on( "click", function() {
 		$( "#añadirtrabajador" ).dialog({
 			resizable: false,
 			modal       :   true,
 			width       :   490,
 			heigth      :   490,
 			show: {
 				effect: "blind",
 				duration: 1000
 			},
 			open: function (event, ui) {
				$(this).css('overflow', 'hidden'); //this line does the actual hiding
				$(this).closest(".ui-dialog")
				.find(".ui-dialog-titlebar-close")
				.removeClass("ui-dialog-titlebar-close")
				.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
			},
			position: { 
				my:  'top',
				at:  'bottom',
				of:  $('#navbar')
			},
			hide: {
				effect: "fold",
				duration: 1000
			}
		});
 	});

	//FORMULARIO AÑADE PRODUCCION\\

	//CARGA DINAMICA
	
	$( "#añadeProduccion" ).on( "click", function() {
	    	// Verifico si ya he cargado el formulario antes
	    	if( $('#añadirproduccion').size() == 0 ){

	    		$('<div id="añadirproduccion"  title="Crear producción"><div class="hidden-md hidden-lg hidden-xl"><br><br><br><br><br><br><br><br><br><br><br><br></div></div>').appendTo('#formularios').load("./html/frmAltaProduccion.html", function(){ $.getScript("js/altaProduccion.js")});

	    	} else {
			// Lo abro si está cerrado
			$('#añadirproduccion').dialog("open");
			var comboDirectores = document.getElementById('comboDirectores');
			comboDirectores.removeChild(comboDirectores.lastChild);
			comboDirectores.appendChild(oManagerCorporation.cargarComboSegunTipoTrabajador("Director"));
			
		}


	});
	
	 	//FORMULARIO BAJA TRABAJADOR\\

	 	$( "#darBajaTrabajador" ).on( "click", function() {
	 		$( "#bajaTrabajador" ).dialog({
	 			resizable: false,
	 			modal       :   true,
	 			width       :   490,
	 			heigth      :   281,
	 			show: {
	 				effect: "blind",
	 				duration: 1000
	 			},
	 			position: { 
	 				my:  'top',
	 				at:  'bottom',
	 				of:  $('#navbar')
	 			},
	 			open: function (event, ui) {
				$(this).css('overflow', 'hidden'); //this line does the actual hiding
				$(this).closest(".ui-dialog")
				.find(".ui-dialog-titlebar-close")
				.removeClass("ui-dialog-titlebar-close")
				.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
	 	});

	 	
	 	});




	 	$( "#realizaContrato" ).on( "click", function() {

	 		
	 		var divComboProducciones = document.getElementById("listaproducciones");
	 		divComboProducciones.removeChild(divComboProducciones.lastChild);
	 		var select = oManagerCorporation.cargarComboProducciones();
	 		select.name = "produccionSeleccionada";
	 		select.id = "produccionSeleccionada";
	 		divComboProducciones.appendChild(select);
	 		var comboProducciones = document.getElementById("produccionSeleccionada");

	 		crearComboActoresDeUnCasting();
	 		
	 		
	 		$( "#añadircontrato" ).dialog({
	 			resizable: false,
	 			modal       :   true,
	 			width       :   644,
	 			heigth      :   507,
	 			show: {
	 				effect: "blind",
	 				duration: 1000
	 			},
	 			position: { 
	 				my:  'top',
	 				at:  'bottom',
	 				of:  $('#navbar')
	 			},
	 			open: function (event, ui) {
				$(this).css('overflow', 'hidden'); //this line does the actual hiding
				$(this).closest(".ui-dialog")
				.find(".ui-dialog-titlebar-close")
				.removeClass("ui-dialog-titlebar-close")
				.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
	 	});



	 	$( "#bajaContrato" ).on( "click", function() {
	 		var divComboBajaContratos = document.getElementById("comboBajaContratos");
	 		divComboBajaContratos.removeChild(divComboBajaContratos.lastChild);
	 		var comboContratos = oManagerCorporation.crearComboContratos();
	 		comboContratos.id = "comboBajaContrato";
	 		comboContratos.name = "comboBajaContrato";
	 		comboContratos.className = "form-control";

	 		divComboBajaContratos.appendChild(comboContratos);

	 		comboContratos.addEventListener("change",rellenarCamposBajaContrato,false);
	 		rellenarCamposBajaContrato();
	 		$( "#darBajaContrato" ).dialog({
	 			resizable: false,
	 			modal       :   true,
	 			width       :   650,
	 			heigth      :   507,
	 			show: {
	 				effect: "blind",
	 				duration: 1000
	 			},
	 			position: { 
	 				my:  'top',
	 				at:  'bottom',
	 				of:  $('#navbar')
	 			},
	 			open: function (event, ui) {
				$(this).css('overflow', 'hidden'); //this line does the actual hiding
				$(this).closest(".ui-dialog")
				.find(".ui-dialog-titlebar-close")
				.removeClass("ui-dialog-titlebar-close")
				.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
	 	});

		 	//FORMULARIO AÑADE CASTING\\

		 	$( "#añadeCasting" ).on( "click", function() {
		 		var comboProducciones = document.getElementById('comboProducciones');
		 		comboProducciones.removeChild(comboProducciones.lastChild);
		 		comboProducciones.appendChild(oManagerCorporation.cargarComboProducciones());

		 		$( "#añadirCasting" ).dialog({
		 			resizable: false,
		 			modal       :   true,
		 			width       :   490,
		 			heigth      :   281,
		 			show: {
		 				effect: "blind",
		 				duration: 1000
		 			},
		 			position: { 
		 				my:  'top',
		 				at:  'bottom',
		 				of:  $('#navbar')
		 			},
		 			open: function (event, ui) {
				$(this).css('overflow', 'hidden'); //this line does the actual hiding
				$(this).closest(".ui-dialog")
				.find(".ui-dialog-titlebar-close")
				.removeClass("ui-dialog-titlebar-close")
				.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
		 	});

	//FORMULARIO AÑADIR ACTOR A CASTING\\
	
	$( "#añadeActorACasting" ).on( "click", function() {
		var divComboCasting = document.getElementById("comboCasting");
		divComboCasting.removeChild(divComboCasting.lastChild);
		var select = oManagerCorporation.cargarComboCastings();
		select.id = "castingSeleccionadoParaAñadirActor";
		select.name = "castingSeleccionadoParaAñadirActor";
		divComboCasting.appendChild(select);

		var divComboActores = document.getElementById("comboActorAñadirACasting");
		divComboActores.removeChild(divComboActores.lastChild);
		var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Actor");
		select.id = "actorAAñadirACasting";
		select.name = "actorAAñadirACasting";
		divComboActores.appendChild(select);
		$( "#añadirActorACasting" ).dialog({
			resizable: false,
			modal       :   true,
			width       :   490,
			heigth      :   281,
			show: {
				effect: "blind",
				duration: 1000
			},
			position: { 
				my:  'top',
				at:  'bottom',
				of:  $('#navbar')
			},
			open: function (event, ui) {
				$(this).css('overflow', 'hidden'); //this line does the actual hiding
				$(this).closest(".ui-dialog")
				.find(".ui-dialog-titlebar-close")
				.removeClass("ui-dialog-titlebar-close")
				.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
});

document.getElementById('botonInicio').addEventListener("click",muestraUML,false);


var btnAceptarBajaContratos = document.getElementById("aceptarBajaContrato");
btnAceptarBajaContratos.addEventListener("click",darDeBajaUnContrato,false);


/*-------------------------------------------------------------------FIN BOTONES*/




/*---------------------------------------------------MANIPULACION DE FORMULARIOS*/

function darDeBajaUnContrato(){
	var oForm = document.frmDarBajaContrato;
	var idContrato = oForm.comboBajaContrato.value;
	var update ="delete from contrato where id="+idContrato;
	var sRuta="php/ejecutaDelete.php";
	$.ajax({url:sRuta,
		data : "datos=" + update,
		dataType: "jsonp",
		complete: function(oRespuesta){
			
		toastr.info(oRespuesta.responseText);
			
		}
	});
	

}

function procesarAltaActorCasting(oRespuesta) {
	toastr.info(oRespuesta.getElementsByTagName("datos")[0].textContent);
}

function altaAñadirActorACasting(){

	var oForm = document.frmAñadirActorACasting;
	var idProducion = oForm.castingSeleccionadoParaAñadirActor.selectedOptions[0].getAttribute("produccion");
	var idCasting = oForm.castingSeleccionadoParaAñadirActor.selectedOptions[0].getAttribute("idCasting");
	var nombreCasting = oForm.castingSeleccionadoParaAñadirActor.value;
	var dniActor = oForm.actorAAñadirACasting.value;
	var oActor = oManagerCorporation.getTrabajadorPorDniYTipo(dniActor,"Actor");
	
	var sRuta = "php/altaActorACasting.php";

	if(nombreCasting!="Noexistencastings"){
		
		$.post(sRuta,"idCasting='"+idCasting+"'&dniActor='"+dniActor+"'",procesarAltaActorCasting,"xml");
		oForm.actorAAñadirACasting.className = "form-control";
	}
	else
	{
		oForm.castingSeleccionadoParaAñadirActor.className = "form-control error";
		toastr.error("Debe de crear al menos un casting para poder añadir el actor.");
	}
}


function rellenarCamposBajaContrato(){
	var oForm = document.frmDarBajaContrato;
	var indiceContratoSeleccionado = oForm.comboBajaContrato.value;
}

function ocultaForms(){
	document.getElementById('botonBorrarFilaActorPorEdicion').style.display = "none";
	document.getElementById('añadirtrabajador').style.display = "none";
	document.getElementById('añadircontrato').style.display = "none";
	document.getElementById('darBajaContrato').style.display = "none";
	document.getElementById('ediciones').style.display = "none";
	document.getElementById('bajaTrabajador').style.display = "none";
	document.getElementById('uml').style.display = "none";
	document.getElementById('dniTipoDeTrabajadorADarDeBaja').style.display = "none";
	document.getElementById('añadirCasting').style.display = "none";
	document.getElementById('listarObrasGenero').style.display = "none";
	document.getElementById('divListarSeriesNumCap').style.display = "none";
	document.getElementById('divListarPeliculasPorFecha').style.display = "none";
	document.getElementById('añadirActorACasting').style.display = "none";
}





function crearComboActoresDeUnCasting(){

	var divActores = document.getElementById("listaActores");
	divActores.removeChild(divActores.lastChild);
	var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Actor");
	select.setAttribute("id", "actorSeleccionado");

	divActores.appendChild(select);

	var actorSeleccionadoPorContrato = document.getElementById('actorSeleccionado');
	actorSeleccionadoPorContrato.addEventListener("change",function(){
		escribeRepresentante();
	},false);

	

	
}

function muestraFormListarProduccionTipo(){
	ocultaForms();
	document.getElementById('listaProduccionPorTipo').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}

function muestraUML(){
	ocultaForms();
	document.getElementById('uml').style.display = "block";
	document.getElementById("footer").style.position = "relative";
}
function muestraFormCasting(){
	ocultaForms();

	document.getElementById('añadirCasting').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}


function muestraFormListarObrasGenero(){
	ocultaForms();
	document.getElementById('listarObrasGenero').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}
function muestraFormListarSeriesNumCap(){
	ocultaForms();
	document.getElementById('divListarSeriesNumCap').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}
function muestraFormListarPeliculasEntreFechas(){
	ocultaForms();
	document.getElementById('divListarPeliculasPorFecha').style.display = "block";
	document.getElementById("footer").style.position = "absolute";
}




var tipoTrabajadorADarDeBaja =document.getElementById("bajaTrabajador");
tipoTrabajadorADarDeBaja.addEventListener("click",manejadorBajaTipoTrabajadores,false);

function manejadorBajaTipoTrabajadores(oEvento){
	var oE = oEvento || window.event;
	if(oE.target.value=="Representante"){
		var listaTrabajadoresADarDeBaja = document.getElementById('listaTrabajadoresADarDeBaja');
		listaTrabajadoresADarDeBaja.removeChild(listaTrabajadoresADarDeBaja.firstChild);
		var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Representante");
		select.setAttribute("id", "trabajadores");
		listaTrabajadoresADarDeBaja.appendChild(select);
		document.getElementById("dniTipoDeTrabajadorADarDeBaja").style.display = "block";
	}else{
		if(oE.target.value=="Director"){
			var listaTrabajadoresADarDeBaja = document.getElementById('listaTrabajadoresADarDeBaja');
			listaTrabajadoresADarDeBaja.removeChild(listaTrabajadoresADarDeBaja.firstChild);
			var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Director");
			select.setAttribute("id", "trabajadores");
			listaTrabajadoresADarDeBaja.appendChild(select);
			document.getElementById("dniTipoDeTrabajadorADarDeBaja").style.display = "block";
		}else{
			if(oE.target.value=="Actor"){
				var listaTrabajadoresADarDeBaja = document.getElementById('listaTrabajadoresADarDeBaja');
				listaTrabajadoresADarDeBaja.removeChild(listaTrabajadoresADarDeBaja.firstChild);
				var select = oManagerCorporation.cargarComboSegunTipoTrabajador("Actor");
				select.setAttribute("id", "trabajadores");
				listaTrabajadoresADarDeBaja.appendChild(select);
				document.getElementById("dniTipoDeTrabajadorADarDeBaja").style.display = "block";
			}
			
		}
	}
}



var tipoDeTrabajadorSeleccionado = document.getElementById("papel");
tipoDeTrabajadorSeleccionado.addEventListener("click",manejadorTrabajadores,false);
function manejadorTrabajadores(oEvento){
	var oE = oEvento || window.event;
	if(oE.target.value=="Actor"){
		var comboRepresentantes = document.getElementById('comboRepresentantes');
		comboRepresentantes.removeChild(comboRepresentantes.firstChild);
		comboRepresentantes.appendChild(oManagerCorporation.cargarComboSegunTipoTrabajador("Representante"));
		document.getElementById("footer").style.position = "relative";
		document.getElementById("actor").style.display = "block";
	}else{
		document.getElementById("footer").style.position = "absolute";
		document.getElementById("actor").style.display = "none";
	}
}


function manejadorProduccion(oEvento){
	var oE = oEvento || window.event;
	switch(oE.target.value){
		case'Pelicula':
		var combos = cargarComboFecha();
		var divYear = document.querySelector("#pelicula>.form-group>#divSelectYear");
		var divDia =  document.querySelector("#pelicula>.form-group>#divSelectDay");
		var divMes =  document.querySelector("#pelicula>.form-group>#divSelectMonth")
		var ruta = "#pelicula>.form-group ";
		divYear.removeChild(divYear.lastChild);
		divMes.removeChild(divMes.lastChild);
		divDia.removeChild(divDia.lastChild);
		for(var i = 0; i<combos.length; i++){
			switch(i){
				case 0:
				combos[i].addEventListener("change", function(){ actualizarComboDiasPorCambioAño(ruta);},false);
				divYear.appendChild(combos[i]);
				break;
				case 1:
				combos[i].addEventListener("change", function(){ actualizarComboDías(ruta);},false);
				divMes.appendChild(combos[i]);
				break;
				case 2:
				divDia.appendChild(combos[i]);
				break;

			}
		}
		document.getElementById("pelicula").style.display = "block";
		document.getElementById("obra").style.display = "none";
		document.getElementById("serie").style.display = "none";
		break;
		case'Obra':
		document.getElementById("obra").style.display = "block";
		document.getElementById("pelicula").style.display = "none";
		document.getElementById("serie").style.display = "none";
		break;
		case'Serie':
		document.getElementById("serie").style.display = "block";
		document.getElementById("obra").style.display = "none";
		document.getElementById("pelicula").style.display = "none";
		break;						
	}					
}
/*-----------------------------------------------------------------------FECHAS*/

function fechaToString(oFecha){
	var fecha = new Date(Date.parse(oFecha));
	fecha = fecha.toLocaleDateString(); //este método está ya definido para los tipo Date
	return fecha;
}



function cargarComboFecha(){

	var combos = [];

	var f = new Date();
	var yearActual = f.getFullYear();
	var select = document.createElement("select");
	select.setAttribute("name","ano");
	select.setAttribute("id","yearPelicula");
	select.classList.add("form-control");

	/*Años*/
	for(var i = yearActual; i<yearActual+30; i++){
		var option = document.createElement("option");
		option.value = i;
		var texto = document.createTextNode(i);
		option.appendChild(texto);

		if(i==yearActual)
			option.selected=true;

		select.appendChild(option);
	}
	combos.push(select);
	select = document.createElement("select");
	select.setAttribute("name","mes");
	select.classList.add("form-control");
	select.id = "comboMes";
	/*Meses*/
	for(var i = 1; i<13; i++){
		var option = document.createElement("option");
		var texto = "";
		var val = "0"+i;
		switch(i){
			case 1:
			texto = "Enero";
			option.selected = true;
			break;
			case 2:
			texto = "Febrero";
			break;
			case 3:
			texto = "Marzo";
			break;
			case 4:
			texto = "Abril";
			break;
			case 5:
			texto = "Mayo";
			break;
			case 6:
			texto = "Junio";
			break;
			case 7:
			texto = "Julio";
			break;
			case 8:
			texto = "Agosto";
			break;
			case 9:
			texto = "Septiembre";
			break;
			case 10:
			texto = "Octubre";
			val = i;
			break;
			case 11:
			texto = "Noviembre";
			val = i;
			break;
			case 12:
			texto = "Diciembre";
			val = i;
			break;
		}
		option.value = val;
		option.appendChild(document.createTextNode(texto));
		select.appendChild(option);
	}
	combos.push(select);
	select = document.createElement("select");
	select.setAttribute("name","dia");
	select.classList.add("form-control");
	/*Dias*/
	for(var i=1; i<32; i++){
		var option = document.createElement("option");
		if (i<10) {
			option.value = "0"+i;
			var texto = document.createTextNode("0"+i);
		}
		else{
			option.value = i;
			var texto = document.createTextNode(i);
		}
		option.appendChild(texto);
		select.appendChild(option);
	}
	combos.push(select);

	return combos;
}
function actualizarComboDiasPorCambioAño(selectorCss){
	var anoSeleccionado = document.querySelector(selectorCss+"#yearPelicula").value;
	var mes = document.querySelector(selectorCss+"#comboMes").selectedOptions[0].textContent;

	if(mes=="Febrero"){
		var diasDelMes=28;
		
		if ((anoSeleccionado%4==0) && ((anoSeleccionado%100!=0)||(anoSeleccionado%400==0))){
			diasDelMes=29;
		}
		
		
		select = document.createElement("select");
		select.setAttribute("name","dia");
		select.classList.add("form-control");
		for(var i=1; i<=diasDelMes;i++){
			var option = document.createElement("option");
			var texto ="";
			if(i<10){
				option.value = "0"+i;
				texto = document.createTextNode("0"+i);
			}
			else{
				option.value = i;
				texto = document.createTextNode(i);
			}
			option.appendChild(texto);
			select.appendChild(option);
		}
		var divDia = document.querySelector(selectorCss+"#divSelectDay");
		divDia.removeChild(divDia.lastChild);
		divDia.appendChild(select);
	}
}
function actualizarComboDías(selectorCss){
	var diasDelMes=0;
	var mes = document.getElementById("comboMes").selectedOptions[0].textContent;
	//Abril, junio, septiembre y noviembre. 30
	//Enero, marzo, mayo, julio, agosto, octubre y diciembre. 31
	//Febrero 28 si año bisiesto 29
	/*SI ((año divisible por 4) Y ((año no divisible por 100) O (año divisible por 400)))
	es bisiesto
	SINO
	no es bisiesto
	Si viene del formulario peliculas ruta = "#pelicula>.form-group ";
	*/
	if(mes=="Enero" || mes=="Marzo" || mes=="Mayor" || mes=="Julio" || mes=="Agosto" || mes=="Octubre" || mes=="Diciembre"){
		diasDelMes=31;
	}
	else{
		if(mes=="Abril" || mes=="Junio" || mes=="Septiembre" || mes=="Noviembre"){
			diasDelMes=30;
		}
		else{
			var anoSeleccionado = document.querySelector(selectorCss+"#yearPelicula").value;
			if((anoSeleccionado%4==0) && ((anoSeleccionado%100!=0) || (anoSeleccionado%400==0)))
				diasDelMes=29;
			else
				diasDelMes=28;
		}
	}
	select = document.createElement("select");
	select.setAttribute("name","dia");
	select.classList.add("form-control");
	for(var i=1; i<=diasDelMes;i++){
		var option = document.createElement("option");
		option.value = i;
		var texto ="";
		if(i<10){
			option.value = "0"+i;
			texto = document.createTextNode("0"+i);
		}
		else{
			option.value = i;
			texto = document.createTextNode(i);
		}
		option.appendChild(texto);
		select.appendChild(option);
	}
	var divDia = document.querySelector(selectorCss+"#divSelectDay");
	divDia.removeChild(divDia.lastChild);
	divDia.appendChild(select);

}
/*-----------------------------------------------------------------------FECHAS*/		

/*-----------------------------------------------FIN MANIPULACION DE FORMULARIOS*/


/*-----------------------------------------------------------BAJAS DE TRABAJADOR*/
function darDeBajaTrabajador(){
	
	var oForm = document.frmBajaTrabajador;
	var dni = oForm.trabajadores.value.trim();
	var tipoTrabajadorSeleccionado = frmBajaTrabajador.tipoTrabajador.value;
	
	var update ="update trabajadores set tipo='null' where dni='"+dni+"' and tipo='"+tipoTrabajadorSeleccionado+"'";
	var sRuta="php/ejecutaUpdate.php";
	$.ajax({url:sRuta,
		data : "datos=" + update,
		dataType: "jsonp",
		complete: function(oRespuesta){
			
		toastr.info(oRespuesta.responseText);
			
		}
	});

	
}
/*-------------------------------------------------------FIN BAJAS DE TRABAJADOR*/
/*-----------------------------------------------------------ALTAS DE TRABAJADOR*/


function altaTrabajador(){
	var oForm = document.frmAltaTrabajador;
	var sMensaje ="";

	var dni = oForm.dni.value.trim();
	var nombre = oForm.nombre.value.trim();
	var tlfn = oForm.tlfn.value.trim();
	var nacionalidad = oForm.comboNacionalidad.value.trim();
	var validacion = validarTrabajador();
	var sURL = "php/altaTrabajador.php";
	var sParametros;
	if (validacion == ""){


		var tipo = oForm.tipoTrabajador.value.trim();

		if (tipo == "Director") 
		{
			var oDirector = new Director(dni,nombre,tlfn,nacionalidad);
			
			if(!oManagerCorporation.getTrabajadorPorDniYTipo(oDirector.dni, "Director")){
				
				var oTrabajador = {
					dni : oForm.dni.value.trim(),
					nombre: oForm.nombre.value.trim(),
					tlfn: oForm.tlfn.value.trim(),
					nacionalidad: oForm.comboNacionalidad.value.trim(),
					estatus: "null",
					representante: "null",
					tipo: "Director"
				};
				
				sParametros = "datos=" + JSON.stringify(oTrabajador);
				
				peticionAjax(sURL,sParametros);
				
			}
			else
				toastr.error("Director registrado previamente");	
		}
		else
			if (tipo == "Representante") 
			{
				var oRepresentante = new Representante(dni,nombre,tlfn,nacionalidad);
				if(!oManagerCorporation.getTrabajadorPorDniYTipo(oRepresentante.dni,"Representante")){
					
					var oTrabajador = {
						dni : oForm.dni.value.trim(),
						nombre: oForm.nombre.value.trim(),
						tlfn: oForm.tlfn.value.trim(),
						nacionalidad: oForm.comboNacionalidad.value.trim(),
						estatus: "null",
						representante: "null",
						tipo: "Representante"
					};
					sParametros = "datos=" + JSON.stringify(oTrabajador);

					peticionAjax(sURL,sParametros);
					
					
				}else{
					toastr.error("Representante registrado previamente");	
				}
			}
			else
			{
				if(oForm.Representante.value=="NoExistenRepresentantes"){
					toastr.error("No puedes añadir trabajadores sin representantes.");	
				}else{
					var representante = oManagerCorporation.getTrabajadorPorDniYTipo(oForm.Representante.value,"Representante");
					var estatus = oForm.estatus.value.trim();
					var oActor = new Actor(dni,nombre,tlfn,nacionalidad,estatus,representante);
					if(!oManagerCorporation.getTrabajadorPorDniYTipo(oActor.dni,"Actor")){
						
						var oTrabajador = {
							dni : oForm.dni.value.trim(),
							nombre: oForm.nombre.value.trim(),
							tlfn: oForm.tlfn.value.trim(),
							nacionalidad: oForm.comboNacionalidad.value.trim(),
							estatus: oForm.estatus.value.trim(),
							representante: oForm.Representante.value.trim(),
							tipo: "Actor"
						};
						sParametros = "datos=" + JSON.stringify(oTrabajador);
						peticionAjax(sURL,sParametros);
						
						oManagerCorporation.asociarActorARepesentante(oForm.Representante.value, oActor);
						
					}else{
						toastr.error("Actor registrado previamente");	
					}
				}
			}
			oForm.reset();
			document.getElementById("actor").style.display = "none";
		}	
		else
			toastr.warning(validacion);
	}
	/*-------------------------------------------------------FIN ALTAS DE TRABAJADOR*/

	/*-----------------------------------------------------------ALTAS DE PRODUCCION*/


	/*-------------------------------------------------------FIN ALTAS DE PRODUCCION*/


	/*-----------------------------------------------------------ALTAS DE Contrato*/

	function altaContrato(){
		var id = oManagerCorporation.contratos.length;
		var oForm = document.frmAltaContrato;
		var fechaIni = oForm.fechaInicio.value.trim();
		var fechaFin = oForm.fechaFin.value.trim();
		var papel = oForm.papel.value.trim(); 
		var idProduccion = oForm.produccionSeleccionada.selectedOptions[0].getAttribute("idproduccion");
		var dniActor = oForm.actorSeleccionado.value.trim();
		var pago = oForm.pago.value.trim();
		var validacion = validarContrato();
		var sRuta = "php/altaContrato.php";
		if (validacion == ""){
			
			var oContrato = {
				fechaIni: fechaIni,
				fechaFin:fechaFin,
				papel: papel,
				pago:pago,
				actor: dniActor,
				produccion: idProduccion
			};
			
			
			$.ajax({url:sRuta,
				data : "datos=" + JSON.stringify(oContrato),
				dataType: "jsonp",
				complete: exitoContrato
			});
			

		//oForm.reset();
	}	
	else
		toastr.warning(validacion);
}
/*-------------------------------------------------------FIN ALTAS DE Contrato*/



/*-----------------------------------------------------------ALTAS DE CASTINGS*/
var idProd;

function getIdProd(oObjetoRespuesta,sStatus, oAjax) {

	idProd = oObjetoRespuesta;
	var oForm = document.frmAltaCasting;
	var nombre = oForm.nombre.value.trim();
	var fechaInicio = oForm.fechaInicioCasting.value.trim();
	var fechaFin = oForm.fechaFinCasting.value.trim();
	var sRuta = "php/altaCasting.php";
	var oCasting = {
		fechaInicio: fechaInicio,
		fechaFin: fechaFin,
		nombre: nombre,
		produccion: idProd
	};
	$.ajax({url:sRuta,
		data : "datos=" + JSON.stringify(oCasting),
		dataType: "jsonp",
		complete: exito
	});
	oForm.reset();
	document.frmAltaCasting.nombre.className = "form-control";


}

function altaCasting(){

	var oForm = document.frmAltaCasting;
	
	var produccion = oForm.produccion.value.trim();
	
	var tipoProduccion = oForm.produccion.selectedOptions[0].getAttribute("tipoproduccion");
	
	
	var validacion = validarCasting();
	if (validacion == ""){
		$.get("php/getIdProduccion.php","nombreP='"+produccion+"'&tipoP='"+tipoProduccion+"'",getIdProd,'text');
		
		

		
		
	}else
	toastr.warning(validacion);
}
/*-------------------------------------------------------FIN ALTAS DE CASTINGS*/


/*------------------------------------------------------------------VALIDACIONES*/

function validarProduccion(oEvento){
	var oForm = document.frmAltaProduccion;
	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
	var nombre = oForm.nombre.value.trim();
	var director = oForm.Director.value.trim();

	
	
	
	if (director=="NoExistenDirector"){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaProduccion.Director.focus();		
		}

		sErrores += "\nNo podras crear producciones sin haber añadido antes un director<hr>";
		
		//Marcar error
		document.frmAltaProduccion.Director.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.frmAltaProduccion.Director.className = "form-control";

	}
	
	
	var oExpReg = /^[A-ZÁÉÍÓÚ][A-Za-zñáéíóú\s]{1,40}$/;
	
	if (oExpReg.test(nombre) == false){
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaProduccion.nombre.focus();		
		}
		sErrores += "\nNombre incorrecto(Debe contener entre 2 y 40 caracteres y empezar por mayúsculas)<hr>";
		//Marcar error
		document.frmAltaProduccion.nombre.className = "form-control error";
	}
	else {
		//Desmarcar error
		document.frmAltaProduccion.nombre.className = "form-control";		
	}
	
	var tipo = oForm.tipoProduccion.value.trim();
	if (tipo == "Serie") 
	{
		var numCapitulos = oForm.numCapitulos.value.trim();
		var oExpReg = /^\d{1,4}$/;

		if (oExpReg.test(numCapitulos) == false){
			if(bValido == true){
				bValido = false;		
					//Este campo obtiene el foco
					document.frmAltaProduccion.numCapitulos.focus();		
				}
				sErrores += "\nNúmero incorrecto (Debe contener entre 1 y 3 dígitos)";
				//Marcar error
				document.frmAltaProduccion.numCapitulos.className = "form-control error";
			}
			else {
				//Desmarcar error
				document.frmAltaProduccion.numCapitulos.className = "form-control";		
			}
		}
		else
		{
			if (tipo == "Obra") 
			{
				var tipoObra = oForm.tipoObra.value.trim();
				var oExpReg = /^[A-ZÁÉÍÓÚa-zñáéíóú\s]{5,20}$/;

				if (oExpReg.test(tipoObra) == false){
					if(bValido == true){
						bValido = false;		
							//Este campo obtiene el foco
							document.frmAltaProduccion.tipoObra.focus();		
						}
						sErrores += "\nGénero incorrecto(Debe contener entre 5 y 20 caracteres)";
						//Marcar error
						document.frmAltaProduccion.tipoObra.className = "form-control error";
					}
					else {
						//Desmarcar error
						document.frmAltaProduccion.tipoObra.className = "form-control";		
					}
				}
			}


			return sErrores;
		}

		function validarTrabajador(oEvento){
			var oForm = document.frmAltaTrabajador;
			var oE = oEvento || window.event;
			var bValido = true;
			var sErrores = "";
			var dni = oForm.dni.value.trim();
			var nombre = oForm.nombre.value.trim();
			var tlfn = oForm.tlfn.value.trim();
			var tipoTrabajador = oForm.tipoTrabajador.value.trim();

			// Validaciones
			if(tipoTrabajador=="Actor"){
				var representante = oForm.Representante.value.trim();
				if (representante=="NoExistenRepresentante"){

					if(bValido == true){
						bValido = false;		
				//Este campo obtiene el foco
				document.frmAltaTrabajador.Representante.focus();		
			}

			sErrores += "\nNo podras añadir actores hasta que no añadas al menos 1 representante<hr>";
			
			//Marcar error
			document.frmAltaTrabajador.Representante.className = "form-control error";

		}
		else {
			//Desmarcar error
			document.frmAltaTrabajador.Representante.className = "form-control";

		}
	}

	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaTrabajador.dni.focus();		
		}
		sErrores += "\nDNI incorrecto(Debe contener 8 dígitos seguidos de una letra sin espacios ni guiones : 00000000A)<hr>";
		//Marcar error
		document.frmAltaTrabajador.dni.className = "form-control error";
	}
	else {//Desmarcar error
		document.frmAltaTrabajador.dni.className = "form-control";
	}
	

	var oExpReg = /^[A-ZÁÉÍÓÚ][A-Za-zñáéíóú\s]{3,40}$/;
	
	if (oExpReg.test(nombre) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaTrabajador.nombre.focus();		
		}

		sErrores += "\nNombre incorrecto(Debe contener entre 4 y 40 caracteres y empezar por mayúsculas)<hr>";
		
		//Marcar error
		document.frmAltaTrabajador.nombre.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.frmAltaTrabajador.nombre.className = "form-control";

	}
	
	
	//Campo telefono
	var iTlf = document.frmAltaTrabajador.tlfn.value.trim();
	// Trim
	document.frmAltaTrabajador.tlfn.value = iTlf;

	var oExpReg = /^[679][0-9]{2,3}-? ?[0-9]{6,7}$/;
	
	if (oExpReg.test(iTlf) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaTrabajador.tlfn.focus();		
		}

		sErrores += "\nTeléfono incorrecto(El tlf debe empezar por 6,7 o 9 y contener un máximo de 9 números)<hr>";
		
		//Marcar error
		document.frmAltaTrabajador.tlfn.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.frmAltaTrabajador.tlfn.className = "form-control";	
	}
	
	return sErrores;
}

function validarBajaTrabajador(){

	
	var oForm = document.frmBajaTrabajador;
	var bValido = true;
	var sErrores = "";
	var dni = oForm.dni.value.trim();

			// Validaciones


			var oExpReg = /^\d{8}[a-zA-Z]$/;

			if (oExpReg.test(dni) == false){

				if(bValido == true){
					bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaTrabajador.dni.focus();		
		}
		sErrores += "\nDNI incorrecto(Debe contener 8 dígitos seguidos de una letra sin espacios ni guiones : 00000000A)<hr>";
		
		//Marcar error
		document.frmAltaTrabajador.dni.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.frmAltaTrabajador.dni.className = "form-control";

	}
	

	return sErrores;
}

function validarContrato(oEvento){
	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
	var oForm = document.frmAltaContrato;
	var fechaIni = oForm.fechaInicio.value.trim();
	var fechaFin = oForm.fechaFin.value.trim();
	var pago = oForm.pago.value.trim();
	var actor = oForm.actorSeleccionado.value;

	
	
	
	


	var oExpReg = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
	
	if (oExpReg.test(fechaIni) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaContrato.fechaInicio.focus();		
		}
		sErrores += "\nFecha de inicio incorrecta formato : AAAA/MM/DD<hr>";
		//Marcar error
		document.frmAltaContrato.fechaInicio.className = "form-control error";
	}


	if (oExpReg.test(fechaFin) == false){
		
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaContrato.fechaFin.focus();		
		}
		sErrores += "\nFecha de inicio incorrecta formato : AAAA/MM/DD<hr>";
		//Marcar error
		document.frmAltaContrato.fechaFin.className = "form-control error";
	}


	var oExpReg = /[0-9]+([,][0-9]+)?$/;

	if (oExpReg.test(pago) == false){
		
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaContrato.pago.focus();		
		}
		sErrores += "\nImporte incorrecto<hr>";
		//Marcar error
		document.frmAltaContrato.pago.className = "form-control error";
	}
	else {//Desmarcar error
		document.frmAltaContrato.pago.className = "form-control";
	}

	
	return sErrores;
}
/*--------------------------------------------------------------FIN VALIDACIONES*/


/*------------------------------------------------------------------------Extras*/
var comboNacionalidad = document.getElementById("comboNacionalidad");
/*
var botonEditarActores = document.getElementById("editarActores");
botonEditarActores.addEventListener("click",edicionActor,false);

function edicionActor(){

	ocultaForms();
	document.getElementById('ediciones').style.display = "block";
	document.getElementById("footer").style.position = "relative";


}*/
var botonGuardarCambios = document.getElementById("guardarCambios");
botonGuardarCambios.addEventListener("click",guardarLosCambios,false);

var botonAñadirActorPorEdicion = document.getElementById("añadirActorPorEdicion");
botonAñadirActorPorEdicion.addEventListener("click",añadirFilaTablaEdicionActores,false);

function añadirFilaTablaEdicionActores(){
	globalContadorFilasAñadidasEdicionActores++;
	document.getElementById('botonBorrarFilaActorPorEdicion').style.display = "block";
	var tabla = document.querySelector("#tablaEdicionActores");
	var tbody = document.querySelector("#tablaEdicionActores tbody");
	var linea = tabla.insertRow(-1);
	linea.className="edicionActores";
	for(var i = 0; i<6;i++){
		switch(i){
			case 0:
			var input = document.createElement('input');
			input.value  = "";
			input.setAttribute("type", "text");
			var celda = linea.insertCell(-1);
			celda.appendChild(input);
			celda.className="dni";
			break;
			case 1:
			var input = document.createElement('input');
			input.value  = "";
			input.setAttribute("type", "text");
			var celda = linea.insertCell(-1);
			celda.appendChild(input);
			celda.className="nombre";
			break;
			case 2:
			var input = document.createElement('input');
			input.value  = "";
			input.setAttribute("type", "text");
			var celda = linea.insertCell(-1);
			celda.appendChild(input);
			celda.className="telefono";
			break;
			case 3:
			var celda = linea.insertCell(-1);
			var comboNac = comboNacionalidad.cloneNode(true);
			comboNac.setAttribute("id", "");
			celda.appendChild(comboNac);
			celda.className="nacionalidad";
			break;
			case 4:
			var celda = linea.insertCell(-1);
			var comboRepresentantesCargado=oManagerCorporation.cargarComboSegunTipoTrabajador("Representante");
			celda.appendChild(comboRepresentantesCargado);
			celda.className="representante";
			break;
			case 5:
			var celda = linea.insertCell(-1);
			var comboEstatus=oManagerCorporation.cargarComboEstatus();
			celda.appendChild(comboEstatus);
			celda.className="estatus";
			break;
		}
		linea.appendChild(celda);
	}
	tbody.appendChild(linea);
	tabla.appendChild(tbody);
}
function guardarLosCambios(){
	var arrayEdicionActores = document.getElementsByClassName("edicionActores");
	var dni = "";
	var nombre = "";
	var telefono = "";
	var nacionalidad="";
	var dniRepresentante="";
	var estatus="";
	var bEnc = false;
	for(var i = 0; i<arrayEdicionActores.length;i++){
		bEnc = false;
		dni = arrayEdicionActores[i].getElementsByClassName("dni")[0].textContent;
		dniPorInput = arrayEdicionActores[i].getElementsByClassName("dni")[0].firstChild.value;
		nombre = arrayEdicionActores[i].getElementsByClassName("nombre")[0].firstChild.value;
		representante = arrayEdicionActores[i].getElementsByClassName("representante")[0].firstChild.value;
		telefono = arrayEdicionActores[i].getElementsByClassName("telefono")[0].firstChild.value;
		estatus = arrayEdicionActores[i].getElementsByClassName("estatus")[0].firstChild.value;
		for(var j = 0 ; j<oManagerCorporation.trabajadores.length && !bEnc; j++){
			if(oManagerCorporation.trabajadores[j].dni == dni){
				
				var bValidar = validarActorExistentePorEdicion(arrayEdicionActores[i].getElementsByClassName("telefono")[0].firstChild,arrayEdicionActores[i].getElementsByClassName("nombre")[0].firstChild);
				if(bValidar==""){
					oManagerCorporation.trabajadores[j].nombre = nombre;
					oManagerCorporation.trabajadores[j].telefono = telefono;
					oManagerCorporation.trabajadores[j].estatus = estatus;
				}else{
					toastr.warning(bValidar);
				}
				representante = oManagerCorporation.getTrabajadorPorDniYTipo(representante, "Representante");
				var encontrado = false;
				for(var x=0; x<representante.listaActores.length;x++){
					if(representante.listaActores[x].dni == dni)
						encontrado=true;
				}
				if(!encontrado){
					var actorActual = oManagerCorporation.getTrabajadorPorDniYTipo(dni,"Actor");
					representante.listaActores.push(actorActual);
					actorActual.representante = representante;
					
				}
				
				bEnc = true;
				if(bValidar=="")
					toastr.success("Actor con dni: "+dni+" modificado correctamente.");
				
			}
			if(oManagerCorporation.trabajadores[j].dni == dniPorInput){
				toastr.warning("El actor con DNI: "+dniPorInput+" ya se ha insertado");
				bEnc = true;
			}
		}
		if(!bEnc){
			var bValidar = validarActorPorEdicion(arrayEdicionActores[i].getElementsByClassName("dni")[0].firstChild,arrayEdicionActores[i].getElementsByClassName("telefono")[0].firstChild,arrayEdicionActores[i].getElementsByClassName("nombre")[0].firstChild,arrayEdicionActores[i].getElementsByClassName("representante")[0].firstChild);
			if(bValidar==""){
				nacionalidad = arrayEdicionActores[i].getElementsByClassName("nacionalidad")[0].firstChild.value;
				dniRepresentante = arrayEdicionActores[i].getElementsByClassName("representante")[0].firstChild.value;
				estatus = arrayEdicionActores[i].getElementsByClassName("estatus")[0].firstChild.value;
				var representante = oManagerCorporation.getTrabajadorPorDniYTipo(dniRepresentante, "Representante");
				var oActor = new Actor (dniPorInput,nombre,telefono,nacionalidad,estatus,representante);
				toastr.success(oManagerCorporation.altaTrabajador(oActor, "Actor"));
				oManagerCorporation.asociarActorARepesentante(dniRepresentante, oActor);
				bEnc = true;
			}else{
				toastr.warning(bValidar);
			}
		}
	}
}

function validarActorExistentePorEdicion(campoTelefono,campoNombre){
	var bValido = true;
	var sErrores = "";
	var nombre = campoNombre.value.trim();
	var tlfn = campoTelefono.value.trim();
	


			// Validaciones

			var oExpReg = /^[A-ZÁÉÍÓÚ][A-Za-zñáéíóú\s]{3,40}$/;

			if (oExpReg.test(nombre) == false){

				if(bValido == true){
					bValido = false;		
			//Este campo obtiene el foco
			campoNombre.focus();		
		}

		sErrores += "\nNombre incorrecto(Debe contener entre 4 y 40 caracteres y empezar por mayúsculas)<hr>";
		
		//Marcar error
		campoNombre.className = "form-control error";

	}
	else {
		//Desmarcar error
		campoNombre.className = "form-control";

	}

	
	var oExpReg = /^[679][0-9]{2,3}-? ?[0-9]{6,7}$/;
	
	if (oExpReg.test(tlfn) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			campoTelefono.focus();		
		}

		sErrores += "\nTeléfono incorrecto(El tlf debe empezar por 6,7 o 9 y contener un máximo de 9 números)<hr>";
		
		//Marcar error
		campoTelefono.className = "form-control error";

	}
	else {
		//Desmarcar error
		campoTelefono.className = "form-control";	
	}

	
	return sErrores;
}


function validarActorPorEdicion(campoDNI, campoTelefono, campoNombre, campoRepresentante){
	var bValido = true;
	var sErrores = "";
	var dni = campoDNI.value.trim();
	var nombre = campoNombre.value.trim();
	var tlfn = campoTelefono.value.trim();
	var representante = campoRepresentante.value.trim();
	
	
	if (representante=="NoExistenRepresentante"){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			campoRepresentante.focus();		
		}

		sErrores += "\nNo podras añadir actores hasta que no añadas al menos 1 representante<hr>";
		
		//Marcar error
		campoRepresentante.className = "form-control error";

	}
	else {
		//Desmarcar error
		campoRepresentante.className = "form-control";

	}
	

			// Validaciones

			var oExpReg = /^[A-ZÁÉÍÓÚ][A-Za-zñáéíóú\s]{3,40}$/;

			if (oExpReg.test(nombre) == false){

				if(bValido == true){
					bValido = false;		
			//Este campo obtiene el foco
			campoNombre.focus();		
		}

		sErrores += "\nNombre incorrecto(Debe contener entre 4 y 40 caracteres y empezar por mayúsculas)<hr>";
		
		//Marcar error
		campoNombre.className = "form-control error";

	}
	else {
		//Desmarcar error
		campoNombre.className = "form-control";

	}


	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			campoDNI.focus();		
		}
		sErrores += "\nDNI incorrecto(Debe contener 8 dígitos seguidos de una letra sin espacios ni guiones : 00000000A)<hr>";
		
		//Marcar error
		campoDNI.className = "form-control error";

	}
	else {
		//Desmarcar error
		campoDNI.className = "form-control";

	}
	
	var oExpReg = /^[679][0-9]{2,3}-? ?[0-9]{6,7}$/;
	
	if (oExpReg.test(tlfn) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			campoTelefono.focus();		
		}

		sErrores += "\nTeléfono incorrecto(El tlf debe empezar por 6,7 o 9 y contener un máximo de 9 números)<hr>";
		
		//Marcar error
		campoTelefono.className = "form-control error";

	}
	else {
		//Desmarcar error
		campoTelefono.className = "form-control";	
	}

	
	return sErrores;
}

var btnBorrarFilaActorPorEdicion = document.getElementById("borrarFilaActorPorEdicion");
btnBorrarFilaActorPorEdicion.addEventListener("click",borrarFilaTablaEdicionActores,false);
var globalContadorFilasAñadidasEdicionActores = 0;
function borrarFilaTablaEdicionActores(){
	if(globalContadorFilasAñadidasEdicionActores>0){
		var tabla = document.querySelector("#tablaEdicionActores");
		var tbody = document.querySelector("#tablaEdicionActores tbody");
		tbody.removeChild(tbody.lastChild);
		globalContadorFilasAñadidasEdicionActores--;
	}
}





function comprobarFechas(fechaInicio, fechaFinal)
{
			/*25/10/2017
			22/10/2017
			*/
			var devolver=true;
			
			var valuesStart=fechaInicio.split("/");
             var valuesEnd=fechaFinal.split("/"); // Verificamos que la fecha no sea posterior a la actual

             var fechainicio=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
             var fechafin=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);


             if(fechainicio>=fechafin)
             	devolver=false;

             return devolver;
         }

         function validarCasting(){

         	var oForm = document.frmAltaCasting;
         	var bValido = true;
         	var sErrores = "";
         	var nombre = oForm.nombre.value.trim();
         	var fechaIni = oForm.fechaInicioCasting.value.trim();
         	var fechaFin = oForm.fechaFinCasting.value.trim();

         	/*var oExpReg = /^([0][1-9]|[12][0-9]|3[01])(\/)([0][1-9]|[1][0-2])\2(\d{4})$/;

         	if (oExpReg.test(fechaIni) == false){

         		if(bValido == true){
         			bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaCasting.fechaInicioCasting.focus();		
		}
		sErrores += "\nFecha de inicio incorrecta formato : DD/MM/AAAA<hr>";
		//Marcar error
		document.frmAltaCasting.fechaInicioCasting.className = "form-control error";
	}
	else {
		if(!validarFecha(fechaIni)){
			sErrores += "\n El día no coincide con el mes <hr>";
			//Marcar error
			document.frmAltaCasting.fechaInicioCasting.className = "form-control error";
		}else{			
			//Comprobar que la fecha inicio no sea mayor que la final
			if(!comprobarFechas(fechaIni,fechaFin)){
				sErrores += "\nLa fecha inicio no puede ser mayor que la fecha fin.<hr>";
			//Marcar error
			document.frmAltaCasting.fechaInicioCasting.className = "form-control error";
		}else{
			document.frmAltaCasting.fechaInicioCasting.className = "form-control";
		}
	}
}


var oExpReg = /^([0][1-9]|[12][0-9]|3[01])(\/)([0][1-9]|[1][0-2])\2(\d{4})$/;

if (oExpReg.test(fechaFin) == false){
	
	if(bValido == true){
		bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaCasting.fechaFinCasting.focus();		
		}
		sErrores += "\nFecha fin incorrecta formato : DD/MM/AAAA<hr>";
		//Marcar error
		document.frmAltaCasting.fechaFinCasting.className = "form-control error";
	}
	else {
		if(!validarFecha(fechaFin)){
			sErrores += "\n El día no coincide con el mes <hr>";
			//Marcar error
			document.frmAltaCasting.fechaFinCasting.className = "form-control error";
		}else{			
			//Comprobar que la fecha inicio no sea mayor que la final
			if(!comprobarFechas(fechaIni,fechaFin)){
				sErrores += "\nLa fecha inicio no puede ser mayor que la fecha fin.<hr>";
			//Marcar error
			document.frmAltaCasting.fechaFinCasting.className = "form-control error";
		}else{
			document.frmAltaCasting.fechaFinCasting.className = "form-control";
		}
	}
}

*/

			// Validaciones


			var oExpReg = /^[A-ZÁÉÍÓÚ][A-Za-zñáéíóú\s]{2,40}$/;

			if (oExpReg.test(nombre) == false){

				if(bValido == true){
					bValido = false;		
			//Este campo obtiene el foco
			document.frmAltaCasting.nombre.focus();		
		}

		sErrores += "\nNombre incorrecto(Debe contener entre 3 y 40 caracteres y empezar por mayúsculas)<hr>";
		
		//Marcar error
		document.frmAltaCasting.nombre.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.frmAltaCasting.nombre.className = "form-control";

	}
	
	
	return sErrores;
}


function validarNumCaps(oEvento){
	var oForm = document.frmListarSeriesNumCap;
	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
	var minCaps = oForm.minCaps.value.trim();
	var maxCaps = oForm.maxCaps.value.trim();


			// Validaciones


			var oExpReg = /^\d+$/;

			if (oExpReg.test(minCaps) == false){

				if(bValido == true){
					bValido = false;		
			//Este campo obtiene el foco
			document.frmListarSeriesNumCap.minCaps.focus();		
		}
		sErrores += "\n Mínimo de capítulos incorrecto (debe ser un número entero)<hr>";
		//Marcar error
		document.frmListarSeriesNumCap.minCaps.className = "form-control error";
	}
	else {//Desmarcar error
		document.frmListarSeriesNumCap.minCaps.className = "form-control";
	}
	if (oExpReg.test(maxCaps) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmListarSeriesNumCap.maxCaps.focus();		
		}
		sErrores += "\n Mínimo de capítulos incorrecto (debe ser un número entero)<hr>";
		//Marcar error
		document.frmListarSeriesNumCap.maxCaps.className = "form-control error";
	}
	else {//Desmarcar error
		document.frmListarSeriesNumCap.maxCaps.className = "form-control";
	}

	minCaps = parseInt(minCaps);
	maxCaps = parseInt(maxCaps);

	if (minCaps>=maxCaps) {
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			document.frmListarSeriesNumCap.maxCaps.focus();		
		}
		sErrores += "\n El número de capítulos máximo debe ser mayor que el número de capítulos mínimo<hr>";
		//Marcar error
		document.frmListarSeriesNumCap.maxCaps.className = "form-control error";
		document.frmListarSeriesNumCap.minCaps.className = "form-control error";
	}
	else {//Desmarcar error
		document.frmListarSeriesNumCap.maxCaps.className = "form-control";
	}

	
	return sErrores;
}

///////////////////////////////////////////////////////////////////////////////////////
function validarFechasListado(oEvento){
}

function validarFecha (fecha){
	var valuesStart=fecha.split("/");
	var a =valuesStart[2];
	var m =(valuesStart[1]);
	var d =valuesStart[0];
	var ok = true;

	if((a%4 != 0) && (m == 2) && (d > 28))
		ok = false;
	else
	{
		if( (((m == 4) || (m == 6) || (m == 9) || (m==11)) && (d>30)) || ((m==2) && (d>29)) )
			ok = false;
	}

	return ok;
}

//-------------------- AJAX-----------------------------

var oAjax = inicializa_xhr();

function inicializa_xhr() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest(); 
	} else if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP"); 
	} 
}

function peticionAjax(sURL,sParametros){

	// PRIMERO: configuracion de la peticion
	oAjax = inicializa_xhr();

	oAjax.open("POST",sURL,true);
	
	oAjax.addEventListener("readystatechange",procesarRespuesta,false);	

	oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	// SEGUNDO : hacer la peticion
	oAjax.send(sParametros);
	
}


  // creacion de dialogo de mensajes
  oDlgMensaje = $( "#mensajes" ).dialog({
  	autoOpen: false,
  	height: 240,
  	width: 370,
  	open: function (event, ui) {
			$(this).css('overflow', 'hidden'); //this line does the actual hiding
			$(this).closest(".ui-dialog")
			.find(".ui-dialog-titlebar-close")
			.removeClass("ui-dialog-titlebar-close")
			.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
		},
		position: { 
			my:  'top',
			at:  'bottom',
			of:  $('#navbar')
		},
		hide: {
			effect: "fold",
			duration: 1000
		},
      modal: true // modal
  });



  function procesarRespuesta(){

	// TERCERO: procesar respuesta cuando llega
	if (oAjax.readyState == 4 && oAjax.status == 200){

		// JSON.parse cadena --> objeto
		// JSON.stringify objeto --> cadena
		var oObjeto = JSON.parse(oAjax.responseText);
		switch(oObjeto.accion){
		 	case 100: // bajaCliente
		 	/*
		 	oDlgMensaje.dialog("option","title", oObjeto.mensaje);
		 	$("#pResultado").text(oObjeto.resultado);

		 	oDlgMensaje.dialog("open");	 */
		 	toastr.info(oObjeto.resultado);

		 	/*if (oObjeto.error == false){	// lo dejo abierto por si quiere meter otro
		 		$( "#añadirtrabajador" ).dialog("close");
		 	}*/
		 	break;

		 }
		}
	}  

	function exito(oRespuesta){

		toastr.info(oRespuesta.responseText);
	}  

	
	function exitoContrato(oRespuesta){

		toastr.info(oRespuesta.responseText);
	}  




