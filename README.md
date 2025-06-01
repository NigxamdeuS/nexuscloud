# NexusCloud

AWS Amplifyを使用した学習プラットフォームのPHPバックエンド

## 環境要件

- PHP 8.0以上
- Composer
- AWS SDK for PHP
- Google Authenticator

## セットアップ

1. リポジトリのクローン
```bash
git clone https://github.com/your-username/nexuscloud.git
cd nexuscloud
```

2. 依存関係のインストール
```bash
composer install
```

3. 環境設定
```bash
cp .env.example .env
# .envファイルを編集して必要な設定を行う
```

4. サーバーの起動
```bash
php -S localhost:8000 -t public
```

## 機能

- AWS Cognito認証
- Google Authenticator二段階認証
- RESTful API

## ライセンス

MIT 