<?php
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// File to store scores
$scoresFile = 'scores.json';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['score'])) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

// Sanitize input
$name = strip_tags(trim($data['name']));
$score = (int)$data['score'];

// Get current scores
function getScores() {
    global $scoresFile;
    if (file_exists($scoresFile)) {
        $content = file_get_contents($scoresFile);
        return json_decode($content, true) ?: [];
    }
    return [];
}

// Update or add new score
$scores = getScores();
$currentTime = time();

// Update existing score or add new one
$found = false;
foreach ($scores as &$existingScore) {
    if ($existingScore['name'] === $name) {
        $existingScore['score'] = $score;
        $existingScore['timestamp'] = $currentTime;
        $found = true;
        break;
    }
}

if (!$found) {
    $scores[] = [
        'name' => $name,
        'score' => $score,
        'timestamp' => $currentTime
    ];
}

// Save scores
if (file_put_contents($scoresFile, json_encode($scores))) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to save score']);
}
?>