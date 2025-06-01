<?php

namespace NexusCloud\Auth;

use RobThree\Auth\TwoFactorAuth as RobThreeTwoFactorAuth;

class TwoFactorAuth {
    private $tfa;
    private $cognitoAuth;

    public function __construct(CognitoAuth $cognitoAuth) {
        $this->tfa = new RobThreeTwoFactorAuth('NexusCloud');
        $this->cognitoAuth = $cognitoAuth;
    }

    public function setupMFA(string $username) {
        try {
            // シークレットを生成
            $secret = $this->tfa->createSecret();
            
            // QRコードを生成
            $qrCode = $this->tfa->getQRCodeImageAsDataUri('NexusCloud', $secret);

            return [
                'status' => 'success',
                'secret' => $secret,
                'qrCode' => $qrCode
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function verifyMFA(string $username, string $code, string $secret) {
        try {
            // コードの検証
            if (!$this->tfa->verifyCode($secret, $code)) {
                return [
                    'status' => 'error',
                    'message' => 'Invalid verification code'
                ];
            }

            // CognitoのMFAチャレンジに応答
            return $this->cognitoAuth->respondToAuthChallenge(
                $username,
                'MFA_SETUP',
                ['MFA_CODE' => $code]
            );
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function verifyLoginMFA(string $username, string $code) {
        try {
            return $this->cognitoAuth->respondToAuthChallenge(
                $username,
                'MFA_SETUP',
                ['MFA_CODE' => $code]
            );
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
} 