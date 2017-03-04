<?php

$oCasting = json_decode($_GET['datos']);

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

$sql = "INSERT INTO casting (FECHA_INICIO,FECHA_FIN, NOMBRE,ID_PRODUCCION) VALUES ( '$oCasting->fechaInicio','$oCasting->fechaFin','$oCasting->nombre','$oCasting->produccion')";

if ($conexion->query($sql) === TRUE) {
    $resultado =  "Alta de casting correcta";
    $error = FALSE;
} else {
    $resultado = "Error: " . $sql . "<br>" . $conexion->error;
    $error = TRUE;
}

echo $resultado;

$conexion->close();
?>