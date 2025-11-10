<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Activar mostrar errores temporalmente
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'sistema_ventas';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión: ' . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'No se recibieron datos']);
    exit();
}

// ✅ SOLO NECESITAMOS nombre Y descripcion PARA CATEGORÍAS
if (!isset($data['nombre'])) {
    echo json_encode(['status' => 'error', 'message' => 'El nombre es requerido']);
    exit();
}

$nombre = $conn->real_escape_string(trim($data['nombre']));
$descripcion = isset($data['descripcion']) ? $conn->real_escape_string(trim($data['descripcion'])) : '';

// ✅ INSERTAR EN TABLA CATEGORIA
$sql = "INSERT INTO categoria (nombre, descripcion, created_at) 
        VALUES ('$nombre', '$descripcion', NOW())";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        'status' => 'success', 
        'message' => 'Categoría registrada correctamente',
        'categoria_id' => $conn->insert_id
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al registrar categoría: ' . $conn->error]);
}

$conn->close();
?>