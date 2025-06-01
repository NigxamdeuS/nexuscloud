1. プロジェクト概要
NexusCloudは、AWS Amplify の認証機能と、PHPのバックエンド処理を組み合わせたシンプルな学習用掲示板アプリケーションです。
ユーザー登録・ログインはAmplifyでノーコード実装し、PHPでは投稿データの受け渡しと保存のみを担当します。

2. 使用技術
項目	内容
フロント	React + AWS Amplify (Auth機能)
バックエンド	PHP 8.0（ビルトインサーバー使用）
認証	Amplify（Cognitoを内部で使用）
通信形式	REST API（JSON形式）
データ保存	テキストファイル（messages.txt）

3. システム構成図（簡易）
scss
コピーする
編集する
[User]
   │
   ▼
React + Amplify (ログイン / 投稿画面)
   │
   ▼ fetch() + JWTトークン（任意）
[PHP Backend]
   ├─ post_message.php（投稿保存）
   └─ get_messages.php（投稿一覧取得）

4. 機能一覧
4.1 Amplify（フロント側）
機能	内容
ユーザー登録	Amplify UI の <Authenticator> を使用
ログイン	上記と同様
トークン取得	Auth.currentSession() でJWTトークンを取得
API呼び出し	fetchでPHPのAPIにデータ送信・取得

4.2 PHP（バックエンド側）
① 投稿保存API（post_message.php）
内容	詳細
リクエスト	POST（JSON: { "message": "xxx" }）
処理内容	messages.txt に1行ずつ追記保存
レスポンス	{"result": "OK"} を返す

② 投稿取得API（get_messages.php）
内容	詳細
リクエスト	GET（引数不要）
処理内容	messages.txt を全行取得
レスポンス	["こんにちは", "おはよう"] の形式

5. ディレクトリ構成（最低限）
swift
コピーする
編集する
nexuscloud/
├── public/
│   ├── post_message.php
│   ├── get_messages.php
│   └── messages.txt（手動で作成・空でも可）
└── amplify/（Amplifyプロジェクト）
    └── src/App.js（React + Authenticator UI）
6. 将来の拡張案（今はやらない）
機能	概要
JWTトークンの検証	PHP側でログイン済みか確認
日時やユーザー名の記録	投稿時に付加情報も保存する
データベース連携	messages.txt → MySQL/DynamoDBに変更
投稿削除機能	POSTに削除フラグをつけて対応

7. 実装の流れ（おすすめ順）
get_messages.php と post_message.php を作ってローカル動作を確認

React + Amplify でログインUIと投稿フォームを実装

fetch で API にデータを送受信

余裕が出たら、投稿に 日時 や ユーザー名 を追加

（必要に応じて）トークンを取得してログやヘッダーに表示




Amplifyの機能　	ユーザー登録・ログインをノーコードで実現!!!!






⏳ 目安スケジュール
週	やること	期間の目安
1週目	PHPだけで掲示板を作る（認証なし）
・post_message.php
・get_messages.php
・messages.txt に保存	3〜4日
2週目	Amplifyでログイン機能を作成
・ReactにAmplify導入
・ログインフォーム作成
・ログイン後だけPHPにアクセスできるようにする	4〜5日
3週目	ReactからPHP APIを叩く処理を実装
・fetch()で投稿処理
・取得APIで表示
・（余裕があれば）日時やユーザー名も保存	3〜4日 


