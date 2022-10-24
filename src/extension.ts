import * as vscode from 'vscode'

function getWebsiteDisposable (
  command: string,
  viewType: string,
  title: string,
  url: string
) {
  return vscode.commands.registerCommand(command, () => {
    // set panel
    const panel = vscode.window.createWebviewPanel(
      viewType,
      title,
      vscode.ViewColumn.Beside, { enableScripts: false }
    )

    // set content
    const html: string = `
      <style>html, body { height: 100%; !important }</style>
      <iframe style="position:relative; width: 100%; height: 100%; border: 0" src="${url} "></iframe>
    `
    panel.webview.html = html
  })
}

export function activate (context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "scala-cheatsheet" is now active!')

  const websiteDisposable = getWebsiteDisposable(
    'scalaCheatsheet.openWebsite',
    'scalaCheatsheetWebsite',
    'Scala Cheatsheet Website',
    'https://docs.scala-lang.org/cheatsheets/index.html'
  )

  context.subscriptions.push(websiteDisposable)
}

// this method is called when your extension is deactivated
export function deactivate () { }
