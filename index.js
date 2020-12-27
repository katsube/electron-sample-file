const { app, ipcMain, BrowserWindow, dialog } = require('electron')
const fs = require('fs')

let mainWin;

/**
 * ウィンドウを作成する
 */
function createWindow () {
  // ウィンドウを新たに開く
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // ファイルを開く
  mainWin.loadFile('public/index.html')
}

// 初期化が終了したらウィンドウを新規に作成する
app.whenReady().then(createWindow)


// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  // macOS以外はアプリを終了する
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// アプリがアクティブになった時の処理
// (macOSはDocのアイコンがクリックされたとき）
app.on('activate', () => {
  // ウィンドウがすべて閉じられている場合は新しく開く
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

/**
 * [IPC] 指定ファイルの内容を返却
 *
 */
ipcMain.handle('file-open', async (event) => {
  // ファイルを選択
  const paths = dialog.showOpenDialogSync(mainWin, {
    buttonLabel: '開く',  // 確認ボタンのラベル
    filters: [
      { name: 'Text', extensions: ['txt', 'text'] },
    ],
    properties:[
      'openFile',         // ファイルの選択を許可
      'createDirectory',  // ディレクトリの作成を許可 (macOS)
    ]
  });

  // キャンセルで閉じた場合
  if( paths === undefined ){
    return({status: undefined});
  }

  // ファイルの内容を返却
  try {
    const path = paths[0];
    const buff = fs.readFileSync(path);

    return({
      status: true,
      path: path,
      text: buff.toString()
    });
  }
  catch(error) {
    return({status:false, message:error.message});
  }
});
