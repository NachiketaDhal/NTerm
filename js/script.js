let input = document.querySelector("input");
const terminalBody = document.querySelector("#terminalBody");

const commandList = [
  commands.BIO,
  commands.CLEAR,
  commands.GITHUB,
  commands.NAME,
  commands.PROJECTS,
  commands.RESUME,
  commands.SOCIALS,
];

functionCalls();

function functionCalls() {
  checkWindowClick();
  checkPressedEnter();
}

function checkWindowClick() {
  terminalBody.addEventListener("click", function () {
    input.focus();
  });
}

function checkPressedEnter() {
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      execute(input.value);
    }
  });
}

function execute(inputValue) {
  let temp = input.value;
  input.remove();
  terminalBody.innerHTML += temp;
  checkCommand(temp);
  addInput();
}

function executeCommand(command) {
  terminalBody.innerHTML += "<br><br>";

  for (let i = 0; i < data[command].length; ++i) {
    terminalBody.innerHTML += `${data[command][i].name}: `;

    if (data[command][i].value.includes("http")) {
      terminalBody.innerHTML += `<a href="${data[command][i].value}" target="_blank">${data[command][i].value}</a><br>`;
    } else {
      terminalBody.innerHTML += `${data[command][i].value}<br>`;
    }
  }
}

function checkCommand(inputCommand) {
  let command = inputCommand.split(" ")[0];

  if (command) {
    if (command === commands.CLEAR) {
      commandClear();
    } else if (command === commands.GITHUB) {
      commandGithub(command);
    } else if (command === commands.HELP) {
      commandHelp();
    } else if (command === commands.RESUME) {
      commandResume();
    } else if (commandList.includes(command)) {
      executeCommand(command);
    } else {
      terminalBody.innerHTML +=
        "<br>" +
        inputCommand +
        ' is not recognized as a command, Try "help"<br>';
    }
  } else {
    terminalBody.innerHTML += "<br>";
  }
}

function addInput() {
  terminalBody.innerHTML += ' > <input type="text" autofocus />';
  input = document.querySelector("input");
  input.focus();
  functionCalls();
}

function commandClear() {
  terminalBody.innerHTML = ``;
}

function commandHelp() {
  terminalBody.innerHTML += "<br><br>";
  for (let i = 0; i < commandList.length; i++) {
    terminalBody.innerHTML +=
      `<span class="command">${commandList[i]}</span><br>` +
      `<span class="command-description">${
        commandDesription[commandList[i]]
      }</span><br><br>`;
  }
}

function commandGithub() {
  terminalBody.innerHTML += `<br><i class="fa fa-github"> <a href="https://github.com/${data.github[0].value}" target="_blank">${data.github[0].value}</a><br>`;
  terminalBody.innerHTML += "<br>";
}

function commandResume() {
  terminalBody.innerHTML += `<br><a href=assets/${data.resume} target="_blank">Resume</a><br>`;
}
