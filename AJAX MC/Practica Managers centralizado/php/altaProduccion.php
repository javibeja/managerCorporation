<?php

$oProduccion = json_decode($_POST['datos']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ManagerCorporation";

// Create connection
$conexion = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conexion->connect_error) {
    die("Conexion fallida: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");

$sql = "INSERT INTO produccion (NOMBRE,DNI_DIRECTOR,TIPO_PRODUCCION,TIPO_OBRA,FECHA_ESTRENO,NUMERO_CAPITULOS) VALUES ('$oProduccion->nombre' , '$oProduccion->director' ,'$oProduccion->tipo', '$oProduccion->tipo_obra', '$oProduccion->fecha_estreno', $oProduccion->num_capitulos)";

if ($conexion->query($sql) === TRUE) {
    $resultado =  "Alta de produccion correcta";
    $error = FALSE;
} else {
    $resultado = "Error: " . $sql . "<br>" . $conexion->error;
    $error = TRUE;
}

// Creo un "objeto" php creando un array asociativo
$objeto_salida = array ( "mensaje" => "Alta de producion" , "resultado" => $resultado, "accion" => 100, "error" => $error );

$json_salida = json_encode($objeto_salida);

echo $json_salida;

$conexion->close();
?>