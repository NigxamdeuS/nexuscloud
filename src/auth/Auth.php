<?php

namespace NexusCloud\Auth;

use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use RobThree\Auth\TwoFactorAuth;

class Auth {
    private $cognitoClient;
    private $tfa;
    private $config;

    public function __construct(array $config) {
        $this->config = $config;
        $this->cognitoClient = new CognitoIdentityProviderClient([
            'version' => 'latest',
            'region'  => $config['aws']['region'],
            'credentials' => $config['aws']['credentials']
        ]);
        $this->tfa = new TwoFactorAuth('NexusCloud');
    }

    public function login(string $username, string $password) {
        try {
            $result = $this->cognitoClient->initiateAuth([
                'AuthFlow' => 'USER_PASSWORD_AUTH',
                'ClientId' => $this->config['cognito']['clientId'],
                'AuthParameters' => [
                    'USERNAME' => $username,
                    'PASSWORD' => $password,
                ]
            ]);

            if (isset($result['ChallengeName']) && $result['ChallengeName'] === 'MFA_SETUP') {
                // 二段階認証のセットアップが必要
                $secret = $this->tfa->createSecret();
                return [
                    'status' => 'MFA_SETUP',
                    'secret' => $secret,
                    'qrCode' => $this->tfa->getQRCodeImageAsDataUri('NexusCloud', $secret)
                ];
            }

            return [
                'status' => 'success',
                'tokens' => $result['AuthenticationResult']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function verifyMFA(string $username, string $code) {
        try {
            $result = $this->cognitoClient->respondToAuthChallenge([
                'ChallengeName' => 'MFA_SETUP',
                'ClientId' => $this->config['cognito']['clientId'],
                'ChallengeResponses' => [
                    'USERNAME' => $username,
                    'MFA_CODE' => $code
                ]
            ]);

            return [
                'status' => 'success',
                'tokens' => $result['AuthenticationResult']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function verifyGoogleAuth(string $username, string $code) {
        try {
            $result = $this->cognitoClient->respondToAuthChallenge([
                'ChallengeName' => 'CUSTOM_CHALLENGE',
                'ClientId' => $this->config['cognito']['clientId'],
                'ChallengeResponses' => [
                    'USERNAME' => $username,
                    'ANSWER' => $code
                ]
            ]);

            return [
                'status' => 'success',
                'tokens' => $result['AuthenticationResult']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
} 