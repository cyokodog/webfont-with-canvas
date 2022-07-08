# Web フォントサービス環境で Canvas に Web フォントを適用するサンプル

動作確認の際、TypeSquare については、スクリプトの読み込みで`[ID]`指定が必要。

```
<script
  type="text/javascript"
  src="//typesquare.com/3/tsad/script/ja/typesquare.js?[id]&auto_load_font=true"
  charset="utf-8"
></script>
```

Adobe Fonts は、適宣、`kitId`を置き換えることで、任意のプロジェクトで選択したフォントを利用可能。

```js
var config = {
    kitId: 'fro2xpa',
    scriptTimeout: 3000,
    async: true,
  },
  ...
```

Google Fonts は`family`クエリを調整することで、任意のフォントが利用可能。

```
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&family=Hachi+Maru+Pop&family=Rampart+One&family=Reggae+One&family=Stick&family=Train+One&family=Zen+Maru+Gothic&display=swap');
```
