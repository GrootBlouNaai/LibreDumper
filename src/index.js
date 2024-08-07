const { execCommand } = require("@neutralinojs/neu");

const form = document.querySelector('#download-form');
const output = document.querySelector('#output');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const appId = document.querySelector('#app-id').value;
  const depotId = document.querySelector('#depot-id').value;
  const manifestId = document.querySelector('#manifest-id').value;
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const platforms = getSelectedPlatforms();

  if (platforms.length === 0) {
    output.innerHTML = 'Please select at least one platform.';
    return;
  }

  const args = buildCommandArgs(appId, depotId, manifestId, username, password, platforms);
  const command = `./DepotDownloader ${args.join(' ')}`;

  output.innerHTML = 'Downloading...';
  executeCommand(command);
}

function getSelectedPlatforms() {
  return Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(input => input.value);
}

function buildCommandArgs(appId, depotId, manifestId, username, password, platforms) {
  return [
    `--app-id=${appId}`,
    `--depot-id=${depotId}`,
    `--manifest-id=${manifestId}`,
    `--username=${username}`,
    `--password=${password}`,
    ...platforms.map(platform => `--${platform}`),
  ];
}

function executeCommand(command) {
  execCommand(command, (error, stdout, stderr) => {
    if (error) {
      handleError(error);
      return;
    }
    if (stderr) {
      handleError(stderr);
      return;
    }
    handleSuccess(stdout);
  });
}

function handleError(errorMessage) {
  console.error(errorMessage);
  output.innerHTML = `Error: ${errorMessage}`;
}

function handleSuccess(stdout) {
  console.log(stdout);
  output.innerHTML = 'Download completed successfully.';
}
