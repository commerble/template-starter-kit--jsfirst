# Template Starter Kit for JS First

ボイラープレートとして使用可能なCommerbleテンプレートサンプルです。

このサンプルはvueとwebpackを使用してJSファーストにCommerbleを使用しています。

## Tasks

|     task     |                                                       description                                                       |
| :----------- | :---------------------------------------------------------------------------------------------------------------------- |
| start        | webpackのビルドとテンプレート同期を起動します。実行中はファイルが監視され、変更があるとビルドされ、かつ、同期されます。 |
| publish      | webpackをproductionでビルドし、すべてのテンプレートをアップロードします。                                               |
| build:watch  | webpackを起動します。実行中はファイルが監視され変更があるとビルドされます。                                             |
| build        | webpackをproductionでビルドします。                                                                                     |
| upload:watch | テンプレート同期を起動します。 実行中はファイルが監視され、変更があると同期されます。                                   |
| upload       | すべてのテンプレートをアップロードします。                                                                              |

**起動例**

```
$ npm start
```

```
$ npm run publish
```

## Settings

同期設定の変更は、`sync.js`ファイルで行います。

```
const config = {
    // Commerble Web APIの認証情報は環境変数で指定します。
    // 使用する環境変数名は apiEndpointEnvKey,apiUsernameEnvKey,apiPasswordEnvKeyで指定します。
    // 例 set CBAPI_ENDPOINT=http://localhost/data
    apiEndpointEnvKey: 'CBAPI_ENDPOINT',
    apiUsernameEnvKey: 'CBAPI_USERNAME',
    apiPasswordEnvKey: 'CBAPI_PASSWORD',
    apiItemLimit: 100,
    templateDirPath: './templates',
    mailTemplatePrefix: 'Mail',
    sharedTemplates: [
        'ModdSharedViewStart',
    ]
}
```

接続するCommerble Web APIエンドポイントは環境変数で設定します。  
環境変数でキーは`config`で自由に変更できます。

## Limitation

このサンプルのテンプレート同期は片方向です。管理画面からの変更はダウンロードされません。

## 初期設定

`npm run publish`後、CMS管理画面で以下の4つのURLルーティングを登録します。

| URLパターン       | テンプレート名 |
|:-----------------|:--------------|
|                  | Top           |
| item/{ProductId} | Item          |
| bundle.js        | BundleScript  |
| bundle.css       | BundleStyle   |
