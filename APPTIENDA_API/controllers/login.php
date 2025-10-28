<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'apptienda';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión']);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'], $data['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Faltan datos']);
    exit();
}

$email = $conn->real_escape_string($data['email']);
$password = $data['password'];

// Buscar usuario
$sql = "SELECT * FROM usuarios WHERE email='$email' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado']);
    exit();
}

$user = $result->fetch_assoc();

if (password_verify($password, $user['password'])) {
    echo json_encode(['status' => 'success', 'message' => 'Login correcto', 'user' => ['id' => $user['id'], 'nombre' => $user['nombre'], 'email' => $user['email']]]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta']);
}

$conn->close();
