<?php

namespace NexusCloud\Auth;

use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Aws\Exception\AwsException;

class CognitoAuth {
    private $cognitoClient;
    private $config;

    public function __construct(array $config) {
        $this->config = $config;
        $this->cognitoClient = new CognitoIdentityProviderClient([
            'version' => 'latest',
            'region'  => $config['aws']['region'],
            'credentials' => $config['aws']['credentials']
        ]);
    }

    public function signUp(string $username, string $password, array $attributes = []) {
        try {
            $result = $this->cognitoClient->signUp([
                'ClientId' => $this->config['cognito']['clientId'],
                'Username' => $username,
                'Password' => $password,
                'UserAttributes' => $this->formatAttributes($attributes)
            ]);

            return [
                'status' => 'success',
                'userSub' => $result['UserSub']
            ];
        } catch (AwsException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function confirmSignUp(string $username, string $code) {
        try {
            $this->cognitoClient->confirmSignUp([
                'ClientId' => $this->config['cognito']['clientId'],
                'Username' => $username,
                'ConfirmationCode' => $code
            ]);

            return ['status' => 'success'];
        } catch (AwsException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function signIn(string $username, string $password) {
        try {
            $result = $this->cognitoClient->initiateAuth([
                'AuthFlow' => 'USER_PASSWORD_AUTH',
                'ClientId' => $this->config['cognito']['clientId'],
                'AuthParameters' => [
                    'USERNAME' => $username,
                    'PASSWORD' => $password
                ]
            ]);

            return [
                'status' => 'success',
                'tokens' => $result['AuthenticationResult'] ?? null,
                'challenge' => $result['ChallengeName'] ?? null
            ];
        } catch (AwsException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function respondToAuthChallenge(string $username, string $challengeName, array $challengeResponses) {
        try {
            $result = $this->cognitoClient->respondToAuthChallenge([
                'ChallengeName' => $challengeName,
                'ClientId' => $this->config['cognito']['clientId'],
                'ChallengeResponses' => array_merge(
                    ['USERNAME' => $username],
                    $challengeResponses
                )
            ]);

            return [
                'status' => 'success',
                'tokens' => $result['AuthenticationResult'] ?? null,
                'challenge' => $result['ChallengeName'] ?? null
            ];
        } catch (AwsException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function forgotPassword(string $username) {
        try {
            $this->cognitoClient->forgotPassword([
                'ClientId' => $this->config['cognito']['clientId'],
                'Username' => $username
            ]);

            return ['status' => 'success'];
        } catch (AwsException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function confirmForgotPassword(string $username, string $code, string $newPassword) {
        try {
            $this->cognitoClient->confirmForgotPassword([
                'ClientId' => $this->config['cognito']['clientId'],
                'Username' => $username,
                'ConfirmationCode' => $code,
                'Password' => $newPassword
            ]);

            return ['status' => 'success'];
        } catch (AwsException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    private function formatAttributes(array $attributes): array {
        $formatted = [];
        foreach ($attributes as $key => $value) {
            $formatted[] = [
                'Name' => $key,
                'Value' => $value
            ];
        }
        return $formatted;
    }
} 