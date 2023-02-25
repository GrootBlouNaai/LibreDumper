const { spawn } = require('child_process');

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
--app-id=${appId},
--depot-id=${depotId},
--manifest-id=${manifestId},
--username=${username},
--password=${password},
...platforms.map(platform => --${platform}),
];

const process = spawn('DepotDownloader.exe', args);

output.innerHTML = 'Downloading...';

process.stdout.on('data', (data) => {
console.log(data.toString());
});

process.stderr.on('data', (data) => {
console.error(data.toString());
});

process.on('exit', (code) => {
if (code === 0) {
output.innerHTML = 'Download completed successfully.';
} else {
output.innerHTML = Download failed with code ${code}.;
}
});
});
