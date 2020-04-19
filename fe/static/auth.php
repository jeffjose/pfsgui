<?php

include 'auth.inc';

header('Content-Type: application/json');

if (session_auth()) {
    $status = true;
} else {
    $status = false;
}
$response = [
    'logged_in' => $status,
];
echo json_encode($response);
