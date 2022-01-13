# jamStack テンプレート

## 環境構築

\*VSCode での開発を推奨します。

```bash
# クローンする
git clone https://github.com/crunchtimer/jamstack-template.git
# パッケージ取得（初回起動時、PR時に実行してください）
yarn
# 実行
yarn dev
```

[http://localhost:3000](http://localhost:3000)で起動

> `pages/index.tsx` がホームディレクトリ

.env ファイルを共有してもらい、作成してください.

(このテンプレートは crunchtimer-renewal の実装に基づいて作られているため、api キーは crunchtimer-renewal で使用しているものを使ってください。)

## 説明

npm でパッケージを追加せず`yarn add {plugin名}`で追加してください。

`yarn dev`などの script はディレクトリ直下の package.json に記載してあるので参照してください。

## 使用技術

- [Next.js](https://nextjs.org/docs) - Version.11
- [TypeScript](https://www.typescriptlang.org/) - JS の静的型付け言語版
- [SWR](https://swr.vercel.app/ja) - API のコールは axios やデフォルトの fetch などがありますが、hooks として使える swr(Vercel 限定)を今回は使用
- [WP GraphQL](https://www.wpgraphql.com/) - WordPress をバックエンド(GraphQl API)として使用するためのツール
- [Jest](https://qiita.com/moriaki3193/items/bc1120d572d55038d2d0/) - JS テストツール
- [yarn](https://nextjs.org/docs) - パッケージマネージャー npm の代わり
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - VSCode 内に設定したフォーマッター。`⌘s`で実行
- [ESLint](https://eslint.org/) - スタイルのルールを決める/バグの事前発見
- [Vercel](https://vercel.com/) - Next.js を出している Vercel 社のデプロイ先

## セットアップ手順

（このテンプレートはすでにセットアップされているので、する必要はありません。）

```bash
# Next.js追加
npx create-next-app {プロジェクト名}
cd {プロジェクト名}

# TypeScript導入
yarn add --dev typescript @types/react @types/node
touch tsconfig.json
yarn build
(tsconfig.jsonを確認。自動で書き加えられればOK)

# swr導入
yarn add swr

# Jest導入(Jestでテストする場合。このテンプレートには入っていません。)
yarn add --dev jest @types/jest ts-jest @testing-library/react
```

### .eslintrc.json を編集

```json
{
  "extends": ["next", "next/core-web-vitals", "prettier", "next/babel"]
}
```

に変更。

### sass 導入（style は root/public に入れる）

```bash
yarn add @zeit/next-sass node-sass
```

next.config.js を編集

```js
//追加
const path = require("path");

module.exports = {
  reactStrictMode: true,

  //追加
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
```

css の import と同様に style.scss が import できる。
