<?php

$nombreP = $_GET['nombreP'];
$tipoP = $_GET['tipoP'];

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

$sql = "SELECT ID FROM produccion where nombre = ".$nombreP." and tipo_produccion = ".$tipoP."";

$res= $conexion->query($sql);
$fila = mysqli_fetch_assoc($res);
   echo $fila['ID'];

$conexion->close();
?>