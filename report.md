# Fav Exchange 実装報告書

## 1. アプリケーション概要

Fav Exchangeは、推しグッズの交換募集をサポートするWebアプリケーションです。

所持しているグッズと交換希望グッズを登録し、その情報をもとにSNSへ投稿する交換募集文を簡単に作成できます。

---

# 2. 開発目的

SNSで推しグッズの交換を行う際、

- 所持グッズを整理する
- 希望グッズを整理する
- 毎回募集文を書く

という作業に時間がかかるため、それらを一元管理できるアプリケーションを作成しました。

---

# 3. 使用技術

## フロントエンド

- React
- TypeScript
- Vite
- React Router
- CSS

## バックエンド

- Java 21
- Spring Boot 3.5.16
- Spring Web
- Spring Data JPA

## データベース

- MySQL 8
- Aiven MySQL

## 開発環境

- IntelliJ IDEA
- VS Code
- Docker
- Docker Compose
- Git
- GitHub
- Render
- Vercel

---

# 4. システム構成

```
React（Vercel）

        ↓

Spring Boot（Render）

        ↓

MySQL（Aiven）
```

ローカル環境ではDocker Composeを利用してMySQLコンテナを起動しています。

---

# 5. 実装機能

## ユーザー

- 会員登録
- ログイン
- ログアウト

## 所持グッズ

- 一覧表示
- 登録
- 削除

## 交換希望グッズ

- 一覧表示
- 登録
- 削除

## SNS募集文

- 募集文生成
- コピー

---

# 6. API一覧

|API|HTTP|内容|
|---|---|---|
|/api/register|POST|会員登録|
|/api/login|POST|ログイン|
|/api/goods|GET|所持一覧取得|
|/api/goods|POST|所持登録|
|/api/goods/{id}|DELETE|所持削除|
|/api/wanted|GET|希望一覧取得|
|/api/wanted|POST|希望登録|
|/api/wanted/{id}|DELETE|希望削除|

---

# 7. データベース

使用テーブル

- users
- owned_goods
- wanted_goods

ER図はREADME.mdに掲載しています。

---

# 8. 画面一覧

- ログイン画面
- 会員登録画面
- 所持グッズ一覧
- 交換希望一覧
- SNS投稿画面

各画面のスクリーンショットはREADME.mdに掲載しています。

---

# 9. 工夫した点

- フロントエンドとバックエンドをREST APIで分離しました。
- Docker Composeを利用し、開発環境を簡単に構築できるようにしました。
- 所持グッズと交換希望グッズを別テーブルで管理し、拡張しやすい設計にしました。
- SNSへ投稿する募集文を自動生成することで、投稿作業を簡単にしました。

---

# 10. 苦労した点

- Spring BootとReactのAPI連携
- Docker環境でのMySQL接続
- RenderとVercelへのデプロイ
- CORS設定および本番環境での動作確認

デプロイ環境では動作確認を進めていますが、ローカル環境では主要機能の動作を確認しています。

---

# 11. 今後改善したい点

- Spring Securityによる認証
- JWT認証
- パスワード暗号化
- 編集機能
- 画像アップロード
- 検索機能
- ページネーション
- 交換成立機能
- ユーザーごとのデータ管理

---

# 12. 動作確認

確認済み

- 会員登録
- ログイン
- ログアウト
- 所持グッズ登録
- 所持グッズ削除
- 所持グッズ一覧表示
- 交換希望登録
- 交換希望削除
- 交換希望一覧表示
- SNS募集文作成
- コピー機能

---

# 13. GitHub

GitHubリポジトリ

https://github.com/ichikw/fav-exchange
