<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
header('Content-Type: application/json');

// Подключение к базе
$pdo = new PDO("mysql:host=localhost;dbname=furnitureshop", "root", "");

// Получение данных из JSON
$data = json_decode(file_get_contents("php://input"));
$email = $data->email ?? null;
$password = $data->password ?? null;

if (!$email || !$password) {
    echo json_encode(['success' => false, 'error' => 'Email или пароль не указаны']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->execute([$email, $password]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
