<?php
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// File to store scores
$scoresFile = 'scores.json';

// Get current scores
function getScores() {
    global $scoresFile;
    if (file_exists($scoresFile)) {
        $content = file_get_contents($scoresFile);
        return json_decode($content, true) ?: [];
    }
    return [];
}

// Clean old scores (older than 15 minutes)
function cleanOldScores($scores) {
    $currentTime = time();
    return array_filter($scores, function($score) use ($currentTime) {
        return ($currentTime - $score['timestamp']) <= 900; // 900 seconds = 15 minutes
    });
}

// Get and sort scores
$scores = getScores();
$scores = cleanOldScores($scores);

// Sort by score (descending) and timestamp (most recent first)
usort($scores, function($a, $b) {
    if ($a['score'] != $b['score']) {
        return $b['score'] - $a['score'];
    }
    return $b['timestamp'] - $a['timestamp'];
});

// Take top 10
$scores = array_slice($scores, 0, 10);

// Format for display
$displayScores = array_map(function($score) {
    return [
        'name' => htmlspecialchars($score['name']),
        'score' => (int)$score['score'],
        'isNew' => (time() - $score['timestamp']) < 5 // Highlight scores less than 5 seconds old
    ];
}, $scores);

echo json_encode($displayScores);
?>