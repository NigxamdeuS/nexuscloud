<?php

return [
    'aws' => [
        'region' => 'ap-northeast-1',
        'version' => 'latest',
        'credentials' => [
            'key'    => getenv('AWS_ACCESS_KEY_ID'),
            'secret' => getenv('AWS_SECRET_ACCESS_KEY'),
        ],
    ],
    'cognito' => [
        'userPoolId' => 'nexuscloud17c3e5c3_userpool_17c3e5c3',
        'clientId' => '7cprt5mi91hluI6gjj5gbhcr',
        'clientSecret' => getenv('COGNITO_CLIENT_SECRET'),
    ],
    'google' => [
        'clientId' => getenv('GOOGLE_CLIENT_ID'),
        'clientSecret' => getenv('GOOGLE_CLIENT_SECRET'),
        'redirectUri' => 'http://localhost:3000/auth/google/callback',
    ]
]; 