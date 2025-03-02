/*
	Helloworld1.
	1 rice
	2 upgrade
	3 bundle
	4 throw
	5 diagram
	6 rose
	7 index
	8 heavy
	9 month
	10 must
	11 mercy
	12 face
	13 illegal
	14 unhappy
	15 carbon
	16 ankle
	17 original
	18 return
	19 relax
	20 welcome
	21 knock
	22 unusual
	23 remember
	24 dance
*/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "rubber-duck-programming-partner" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand("rubber-duck-programming-partner.helloWorld", async () => {
    const question = await vscode.window.showInputBox({ prompt: "Ask your rubber duck a question" });
    if (question) {
      //   const answer = await askRubberDuck(question);
      const answer = await askRubberDuck(question);
      console.log("generated response: ", answer);
      await vscode.window.showInformationMessage(answer);
    }
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

async function askRubberDuck(question: string): Promise<string> {
  const ollamaUrl = "http://localhost:11434/api/generate"; // Ollama's default API endpoint
  const payload = {
    model: "deepseek-r1:8b", // Replace with the model name you pulled
    // prompt: `You are a sarcastic rubber duck AI companion. Answer the following question with an attitude using max of 5 sentences: ${question}`,
    prompt: `You are a sarcastic rubber duck AI companion. Answer the following question with an attitude and a touch of humor. If the question is too basic, mock the user gently. Question: ${question}`,
    stream: false, // Set to true if you want streaming responses
  };

  const response = await fetch(ollamaUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.statusText}`);
  }

  const data = (await response.json()) as { response: string };
  const formattedData = data.response.trim().split("</think>")[1].trim();
  return formattedData;
}
