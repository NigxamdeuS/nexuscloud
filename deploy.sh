#!/bin/bash

# 環境変数の設定
export AWS_ACCESS_KEY_ID="your_aws_access_key_id"
export AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
export COGNITO_CLIENT_SECRET="your_cognito_client_secret"
export GOOGLE_CLIENT_ID="your_google_client_id"
export GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Composerの依存関係をインストール
composer install --no-dev --optimize-autoloader

# キャッシュディレクトリのパーミッション設定
chmod -R 755 storage/
chmod -R 755 public/

# 環境設定ファイルのコピー
cp .env.example .env

# アプリケーションキーの生成
php artisan key:generate

# キャッシュのクリア
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# ログファイルの作成
touch storage/logs/laravel.log
chmod 666 storage/logs/laravel.log

echo "デプロイが完了しました" 