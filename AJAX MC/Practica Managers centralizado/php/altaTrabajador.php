<?php

$oTrabajador = json_decode($_POST['datos']);

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

$sql = "INSERT INTO trabajadores (DNI,NOMBRE,TELEFONO,NACIONALIDAD,STATUS,DNI_REPRESENTANTE,TIPO) VALUES ( '$oTrabajador->dni' , '$oTrabajador->nombre' ,'$oTrabajador->tlfn', '$oTrabajador->nacionalidad', '$oTrabajador->estatus', '$oTrabajador->representante', '$oTrabajador->tipo')";

if ($conexion->query($sql) === TRUE) {
    $resultado =  "Alta de trabajador correcta";
    $error = FALSE;
} else {
    $resultado = "Error: " . $sql . "<br>" . $conexion->error;
    $error = TRUE;
}

// Creo un "objeto" php creando un array asociativo
$objeto_salida = array ( "mensaje" => "Alta de cliente" , "resultado" => $resultado, "accion" => 100, "error" => $error );

$json_salida = json_encode($objeto_salida);

echo $json_salida;

$conexion->close();
?>