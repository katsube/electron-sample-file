# Electron Smaple - file load
「読み込み」ボタンをクリックするとダイアログが開き、指定したファイルの内容がテキストエリアに表示されます。

* [解説ページ]()


## 準備
Gitでリポジトリを取得します。
```shellsession
$ git clone https://github.com/katsube/electron-sample-file.git
```

Node.jsがインストールされている環境で以下のコマンドを実行し、必要なライブラリを取得します。
```shellsession
$ cd electron-sample-file
$ npm install
```

## 実行方法
以下でプレビューを行います。
```shellsession
$ npm start
```

ビルドは以下の通り。各OS用のインストーラーが作成されます。
```shellsession
$ npm run build-win
$ npm run build-mac
```
