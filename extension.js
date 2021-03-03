// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Condir is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('condir.run', function () {
		// The code you place here will be executed every time your command is executed

    const editor = vscode.window.activeTextEditor;
    const document = editor.document
    if (editor) {
      editor.edit(editBuilder => {
        editor.selections.forEach(sel => {
          const cursorPosition = sel.start;
          const wordRange = document.getWordRangeAtPosition(cursorPosition);

          const highlightedText = document.getText(sel) ? document.getText(sel) : document.getText(wordRange);
          const lineNumber =  document.lineAt
          (sel.end);
          const endOfLine = lineNumber.range.end.character

          editBuilder.replace(new vscode.Position(lineNumber.lineNumber, endOfLine), `\nconsole.dir({ ${highlightedText} }, { depth: null })`)
        })
      });
    }
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
