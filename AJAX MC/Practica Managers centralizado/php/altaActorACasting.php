<?php

$idCasting = $_POST['idCasting'];
$dniActor = $_POST['dniActor'];
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

$sql = "INSERT INTO participa (ID_CASTING,DNI_ACTOR) VALUES ( $idCasting,$dniActor)";

 	$salida = '<?xml version="1.0" encoding="UTF-8"?>';
 	$salida .= '<datos>';
if ($conexion->query($sql) === TRUE) {
  		$salida .= "Alta de actor a casting correcta";
 	
} else {
   $salida .="Error: ese actor ya estaba en ese casting";
    $error = TRUE;
}
 $salida .= '</datos>';

 echo $salida;



$conexion->close();
?>