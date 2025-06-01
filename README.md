# NexusCloud - コーディング要件定義書

---

■ プロジェクト概要

NexusCloudは、AWS Amplify の認証機能と、PHPによるバックエンド処理を組み合わせた
超初心者向けの学習用掲示板アプリケーションです。

ログイン・登録はAmplifyでノーコード実装し、
PHPでは投稿データの保存・取得のみを担当します。

---

■ 使用技術

・フロントエンド：React + AWS Amplify（Auth機能使用）
・バックエンド　：PHP 8.0（ビルトインサーバー使用）
・通信方式　　　：REST API（JSON）
・認証　　　　　：AWS Cognito（Amplify経由）
・データ保存　　：テキストファイル（messages.txt）

---

■ システム構成図（簡易）

[User]
   ↓
React + Amplify（ログイン・投稿画面）
   ↓ fetch()（+JWTトークン 任意）
[PHP Backend]
   ├─ post_message.php（投稿保存）
   └─ get_messages.php（投稿取得）

---

■ 機能一覧

● フロントエンド（Amplify + React）

- ユーザー登録・ログイン：Amplify UIコンポーネント（<Authenticator>）使用
- ログイン状態に応じて画面を表示制御
- fetchでPHP APIへ投稿送信、取得要求

● バックエンド（PHP）

① post_message.php
- リクエスト：POST（JSON: { "message": "こんにちは" }）
- 処理内容　：messages.txt に追記保存（1行ごと）
- レスポンス：{ "result": "OK" }

② get_messages.php
- リクエスト：GET（引数なし）
- 処理内容　：messages.txt の内容を全取得
- レスポンス：["こんにちは", "おはよう"] のような配列形式

---

■ ディレクトリ構成（最低限）

nexuscloud/
├── public/
│   ├── post_message.php
│   ├── get_messages.php
│   └── messages.txt（空でOK、手動で作成）
└── amplify/（Amplifyプロジェクト）
    └── src/App.js（React + Auth UI + 投稿画面）

---

■ チーム構成と役割分担（4名）

・玉谷　：PHPバックエンド開発（投稿保存・取得の処理）
・林（貴）：Amplify導入・認証処理構築（ログイン／サインアップ）
・林（晶）：React UI作成（投稿画面・一覧表示、fetch連携）
・重森　：仕様書・README作成、構成図、プレゼン準備、GitHub整備

---

■ 開発スケジュール（目安）

1週目：
- 玉谷：post_message.php / get_messages.php 実装と保存テスト
- 重森：構成図と仕様書ドラフト作成

2週目：
- 林（貴）：Amplify導入、<Authenticator>実装、ログイン成功確認
- 林（晶）：ログイン後の投稿UI作成、fetchでメッセージ送信

3週目：
- 林（晶）：一覧表示実装、fetchでメッセージ取得
- 重森：最終README / 発表資料完成
- 全員：結合テストと確認

---

## ✅ Amplifyの強み
- ユーザー登録・ログインを**ノーコードで実現！**
- Cognitoと自動連携、確認メール送信、トークン管理まで全部やってくれる

---

■ 補足

このプロジェクトは「初心者がチームで1から作れるWebアプリ」を目指した内容です。
難しい外部通信やフレームワークは使わず、基本的な機能のみで構成しています。

---
