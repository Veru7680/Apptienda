<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'sistema_ventas';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión']);
    exit();
}

// Si se pasa un ID, buscar producto específico
if (isset($_GET['id'])) {
    $id = $conn->real_escape_string($_GET['id']);
    $sql = "SELECT * FROM producto WHERE id = '$id'";
} 
// Si se pasa categoria_id, filtrar por categoría
else if (isset($_GET['categoria_id'])) {
    $categoria_id = $conn->real_escape_string($_GET['categoria_id']);
    $sql = "SELECT * FROM producto WHERE categoria_id = '$categoria_id'";
}
// Si no, obtener todos los productos
else {
    $sql = "SELECT * FROM producto";
}

$result = $conn->query($sql);

$productos = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

echo json_encode($productos);
$conn->close();
?>