<?php

$update = $_GET['datos'];

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


if ($conexion->query($update) === TRUE) {
    $resultado =  "Baja de trabajador correcta";
    $error = FALSE;
} else {
    $resultado = "Error: " . $update . "<br>" . $conexion->error;
    $error = TRUE;
}

echo $resultado;


$conexion->close();
?>