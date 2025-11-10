<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Evitar salida de warnings
error_reporting(E_ALL);
ini_set('display_errors', 0);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Conexión
$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'sistema_ventas';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión']);
    exit();
}

// Obtener datos POST
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['nombre'], $data['email'], $data['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Faltan datos']);
    exit();
}

$nombre = $conn->real_escape_string($data['nombre']);
$email  = $conn->real_escape_string($data['email']);
$password = password_hash($data['password'], PASSWORD_DEFAULT);

// **Validar si el correo ya existe**
$checkSql = "SELECT id FROM usuario WHERE email='$email' LIMIT 1";
$result = $conn->query($checkSql);

if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'El correo ya está registrado']);
    exit();
}

// Insertar usuario
$sql = "INSERT INTO usuario (nombre, email, password) VALUES ('$nombre', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success', 'message' => 'Usuario registrado correctamente']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al registrar']);
}

$conn->close();
