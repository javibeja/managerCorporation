<?php

$select = $_GET['datos'];
$datos =Array();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ManagerCorporation";

// Create connection
$conexion = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conexion->connect_error) {
    die("Conexion fallida: ".$conexion->connect_error);
}

$conexion->set_charset("utf8");


$res= $conexion->query($select);
			while($fila=mysqli_fetch_assoc($res)){
				$dato = $fila;
				array_push($datos,$dato);
			}
	echo json_encode($datos);

$conexion->close();
?>