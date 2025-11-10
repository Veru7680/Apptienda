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

if (!isset($data['nombre'], $data['descripcion'], $data['precio'], $data['categoria_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos']);
    exit();
}

$nombre = $conn->real_escape_string(trim($data['nombre']));
$descripcion = $conn->real_escape_string(trim($data['descripcion']));
$precio = floatval($data['precio']);
$categoria_id = intval($data['categoria_id']);

// Validar que la categoría exista
$checkCategoria = "SELECT id FROM categoria WHERE id = '$categoria_id'";
$resultCategoria = $conn->query($checkCategoria);

if ($resultCategoria->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'La categoría seleccionada no existe']);
    exit();
}

// Insertar producto
$sql = "INSERT INTO producto (nombre, descripcion, precio, categoria_id, created_at) 
        VALUES ('$nombre', '$descripcion', '$precio', '$categoria_id', NOW())";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        'status' => 'success', 
        'message' => 'Producto registrado correctamente',
        'producto_id' => $conn->insert_id
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al registrar producto: ' . $conn->error]);
}

$conn->close();
?>