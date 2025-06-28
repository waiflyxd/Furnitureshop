<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db = new PDO("mysql:host=localhost;dbname=furnitureshop", "root", "");
$data = json_decode(file_get_contents("php://input"));

// Подготовка запроса
$stmt = $db->prepare("SELECT email, role FROM users WHERE email = ? AND password = ?");
$stmt->execute([$data->email, $data->password]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false]);
}
?>
