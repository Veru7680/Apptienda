<?php
// Mostrar errores para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Datos de conexión
$host = "localhost";
$user = "root";       // usuario XAMPP por defecto
$pass = "";           // contraseña XAMPP por defecto (vacía)
$db   = "apptienda";  // tu base de datos

$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
} else {
    echo "Conexión correcta";
}
?>
<?php
// Mostrar errores para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Datos de conexión
$host = "localhost";
$user = "root";
$pass = "";
$db   = "apptienda";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode([
        "status" => "error",
        "message" => "Conexión fallida: " . $conn->connect_error
    ]));
}

// ❌ No imprimir "Conexión correcta" aquí
