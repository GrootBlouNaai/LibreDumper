const { execCommand } = require("@neutralinojs/neu");
const form = document.querySelector('#download-form');
const output = document.querySelector('#output');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const appId = document.querySelector('#app-id').value;
  const depotId = document.querySelector('#depot-id').value;
  const manifestId = document.querySelector('#manifest-id').value;
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const platforms = Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(input => input.value);

  if (platforms.length === 0) {
    output.innerHTML = 'Please select at least one platform.';
    return;
  }

  const args = [
    `--app-id=${appId}`,
    `--depot-id=${depotId}`,
    `--manifest-id=${manifestId}`,
    `--username=${username}`,
    `--password=${password}`,
    ...platforms.map(platform => `--${platform}`),
  ];

  const command = `./DepotDownloader ${args.join(' ')}`;
  output.innerHTML = 'Downloading...';

  execCommand(command, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      output.innerHTML = `Error: ${error.message}`;
      return;
    }
    if (stderr) {
      console.error(stderr);
      output.innerHTML = `Error: ${stderr}`;
      return;
    }
    console.log(stdout);
    output.innerHTML = 'Download completed successfully.';
  });
});
