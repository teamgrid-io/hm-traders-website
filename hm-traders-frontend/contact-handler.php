<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
    exit;
}

$name   = trim($input['name'] ?? '');
$email  = trim($input['email'] ?? '');
$phone  = trim($input['phone'] ?? '');
$msg    = trim($input['message'] ?? '');
$errors = [];

// Validation (mirror your frontend rules)
if (strlen($name) < 2) {
    $errors['name'] = 'Name must be at least 2 characters';
} elseif (!preg_match('/^[A-Za-z\s]+$/', $name)) {
    $errors['name'] = 'Name should contain only letters';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email format';
}

if (!preg_match('/^[6-9]\d{9}$/', $phone)) {
    $errors['phone'] = 'Invalid phone number';
}

if (empty($msg)) {
    $errors['message'] = 'Message is required';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Send email (using PHP's mail() – works on most hosts)
$to      = 'sakilhossain.com@gmail.com'; // your email
$subject = "New Contact from $name";
$headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/html; charset=UTF-8\r\n";
$body    = "<h2>New Contact Request</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Message:</strong> $msg</p>";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
?>