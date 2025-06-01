<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use NexusCloud\Auth\CognitoAuth;
use NexusCloud\Auth\TwoFactorAuth;

header('Content-Type: application/json');

$config = require __DIR__ . '/../../src/config/auth.php';
$cognitoAuth = new CognitoAuth($config);
$twoFactorAuth = new TwoFactorAuth($cognitoAuth);

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        switch ($action) {
            case 'signup':
                $result = $cognitoAuth->signUp(
                    $data['username'],
                    $data['password'],
                    $data['attributes'] ?? []
                );
                break;
                
            case 'confirm-signup':
                $result = $cognitoAuth->confirmSignUp(
                    $data['username'],
                    $data['code']
                );
                break;
                
            case 'login':
                $result = $cognitoAuth->signIn(
                    $data['username'],
                    $data['password']
                );
                break;
                
            case 'setup-mfa':
                $result = $twoFactorAuth->setupMFA($data['username']);
                break;
                
            case 'verify-mfa':
                $result = $twoFactorAuth->verifyMFA(
                    $data['username'],
                    $data['code'],
                    $data['secret']
                );
                break;
                
            case 'verify-login-mfa':
                $result = $twoFactorAuth->verifyLoginMFA(
                    $data['username'],
                    $data['code']
                );
                break;
                
            case 'forgot-password':
                $result = $cognitoAuth->forgotPassword($data['username']);
                break;
                
            case 'confirm-forgot-password':
                $result = $cognitoAuth->confirmForgotPassword(
                    $data['username'],
                    $data['code'],
                    $data['newPassword']
                );
                break;
                
            default:
                $result = ['status' => 'error', 'message' => 'Invalid action'];
        }
        
        echo json_encode($result);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}

echo "AWS_ACCESS_KEY_ID: " . getenv('AWS_ACCESS_KEY_ID') . "\n";
echo "AWS_SECRET_ACCESS_KEY: " . getenv('AWS_SECRET_ACCESS_KEY') . "\n";
echo "COGNITO_CLIENT_SECRET: " . getenv('COGNITO_CLIENT_SECRET') . "\n";
echo "GOOGLE_CLIENT_ID: " . getenv('GOOGLE_CLIENT_ID') . "\n";
echo "GOOGLE_CLIENT_SECRET: " . getenv('GOOGLE_CLIENT_SECRET') . "\n"; 