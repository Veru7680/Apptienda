<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$user = "root";
$pass = "";
$db   = 'sistema_ventas'; // Ajusta tu base de datos

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la conexión: " . $conn->connect_error]);
    exit;
}

// Consulta de categorías
$sql = "SELECT * FROM categoria";
$result = $conn->query($sql);

$categorias = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $categorias[] = $row;
    }
}

// Devuelve JSON limpio
echo json_encode($categorias, JSON_UNESCAPED_UNICODE);
exit;
