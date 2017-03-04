   $( "#añadirproduccion" ).dialog({
   	resizable: false,
   	modal       :   true,
   	width       :   550,
   	heigth      :   550,
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
   		$(this).css('overflow', 'hidden')
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
      $("#tipoObra").empty();
      
      $.each(oArrayTipoObra, function( i , elemento){
      
         $('<option value="' + elemento.ID + '" >' +  elemento.TIPO + '</option>').appendTo("#tipoObra");
      
      });

}

   var comboDirectores = document.getElementById('comboDirectores');
   comboDirectores.removeChild(comboDirectores.lastChild);
   comboDirectores.appendChild(oManagerCorporation.cargarComboSegunTipoTrabajador("Director"));

   var oCapaProduccion = document.getElementById("tipoProduccion");
   oCapaProduccion.addEventListener("click",manejadorProduccion,false);
   frmAltaProduccion.altaProduccion.addEventListener("click",altaProduccion,false);
   function altaProduccion(){

   	var oForm = document.frmAltaProduccion;
   	var nombre = oForm.nombre.value.trim();
   	var director = oManagerCorporation.getTrabajadorPorDniYTipo(oForm.Director.value, "Director");
   	var validacion = validarProduccion();
   	var sRuta = "php/altaProduccion.php";
   	if (validacion == ""){
   		var tipo = oForm.tipoProduccion.value.trim();
   		if (tipo == "") {
   			toastr.error("Debe seleccionar un tipo para la producción");
   		}
   		else{

   			if (tipo == "Serie") 
   			{
   				var numCaps = oForm.numCapitulos.value.trim();
   				var oSerie = new Serie(nombre,director,numCaps);
   				if(!oManagerCorporation.getProduccionPorNombeYTipo(oSerie.nombre,tipo)){
   					oManagerCorporation.asociarProduccionADirector(oForm.Director.value, oSerie);

   					var oProduccion = {
   						nombre: nombre,
   						director: oForm.Director.value.trim(),
   						tipo: tipo,
   						tipo_obra: "null",
   						fecha_estreno: "null",
   						num_capitulos: numCaps
   					};
   					var sParametros = "datos=" + JSON.stringify(oProduccion);
   					peticionAjax(sRuta,sParametros);
   				}
   				else
   					toastr.error("Ya existe una serie con ese nombre");
   				
   			}
   			else
   				if (tipo == "Obra") 
   				{
   					var genero = oForm.tipoObra.value.trim();
   					var oObra = new Obra(nombre,director,genero);
   					if(!oManagerCorporation.getProduccionPorNombeYTipo(oObra.nombre,tipo)){
   						oManagerCorporation.asociarProduccionADirector(oForm.Director.value, oObra);
   						var oProduccion = {
   							nombre: nombre,
   							director: oForm.Director.value.trim(),
   							tipo: tipo,
   							tipo_obra: genero,
   							fecha_estreno: "null",
   							num_capitulos: "null"
   						};
   						var sParametros = "datos=" + JSON.stringify(oProduccion);
   						peticionAjax(sRuta,sParametros);
   		
   					}
   					else
   						toastr.error("Ya existe una obra con ese nombre");
   				}
   				else
   				{
   					var fecha = fechaToString(oForm.ano.value.trim()+"-"+oForm.mes.value.trim()+"-"+oForm.dia.value.trim());
   					var oPelicula = new Pelicula(nombre,director,fecha);
   					if(!oManagerCorporation.getProduccionPorNombeYTipo(oPelicula.nombre,tipo)){
   						var oProduccion = {
   							nombre: nombre,
   							director: oForm.Director.value.trim(),
   							tipo: tipo,
   							tipo_obra: "null",
   							fecha_estreno: fecha,
   							num_capitulos: "null"
   						};
   						var sParametros = "datos=" + JSON.stringify(oProduccion);
   						peticionAjax(sRuta,sParametros);
   						oManagerCorporation.asociarProduccionADirector(oForm.Director.value, oPelicula);
   					}
   					else
   						toastr.error("Ya existe una película con ese nombre");
   					
   				}
   				oForm.reset();
   			}
   		}	
   		else
   			toastr.warning(validacion);
   	}