<?php

$oContrato = json_decode($_GET['datos']);

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

$sql = "INSERT INTO contrato (FECHA_INICIO,FECHA_FIN, DNI_ACTOR,PAPEL,PAGO,ID_PRODUCCION) VALUES ( '$oContrato->fechaIni','$oContrato->fechaFin','$oContrato->actor','$oContrato->papel','$oContrato->pago','$oContrato->produccion')";

if ($conexion->query($sql) === TRUE) {
    $resultado =  "Alta de contrato correcta";
    $error = FALSE;
} else {
    $resultado = "Error: " . $sql . "<br>" . $conexion->error;
    $error = TRUE;
}

echo $resultado;


$conexion->close();
?>