import * as vscode from 'vscode'
import * as path from 'path'

function getPdfDisposable (
  command: string,
  context: vscode.ExtensionContext,
  fileNames: string[],
  name: string,
  displayName: string
) {
  return vscode.commands.registerCommand(command, () => {
    // set panel
    const assetPath = path.join(context.extensionPath, 'asset')

    const panel = vscode.window.createWebviewPanel(
      name,
      displayName,
      vscode.ViewColumn.Beside, {
        localResourceRoots: [vscode.Uri.file(assetPath)],
        enableScripts: false
      }
    )

    // set content
    let html: string = ''
    for (const fileName of fileNames) {
      const filePath = vscode.Uri.file(path.join(assetPath, fileName)).with({ scheme: 'vscode-resource' })
      html += `<img src="${filePath}" />`
    }
    panel.webview.html = html
  })
}

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

  const pdfDisposable = getPdfDisposable(
    'scalaCheatsheet.openHeatherMillerPdf',
    context,
    ['heathermiller.2ab9ef36910fdfdd20e9.png'],
    'scalaCheatsheetHeatherMillerPdf',
    'Scala Cheatsheet PDF (Heather Miller)'
  )

  const websiteDisposable = getWebsiteDisposable(
    'scalaCheatsheet.openWebsite',
    'scalaCheatsheetWebsite',
    'Scala Cheatsheet Website',
    'https://docs.scala-lang.org/cheatsheets/index.html'
  )

  context.subscriptions.push(pdfDisposable)
  context.subscriptions.push(websiteDisposable)
}

// this method is called when your extension is deactivated
export function deactivate () { }
