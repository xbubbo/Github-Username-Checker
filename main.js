const fetch = require('node-fetch');
const fs = require('node:fs');
require('dotenv').config();

const GITHUB_API_URL = 'https://github.com/account/rename_check?suggest_usernames=true';
const NotTaken = 'Status/NotTaken.txt';
const Taken = 'Status/Taken.txt';
const Available = 'Status/Available.txt';
const delayTime = 70;

const usernames = fs.readFileSync(NotTaken, 'utf-8').split('\n').filter(line => line.trim() !== '');

let credentialsIndex = 1;
let COOKIE = process.env.COOKIE;
let TOKEN = process.env.Token;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const switchCredentials = () => {
  if (credentialsIndex === 1) {
    console.log('Switching to backup API credentials');
    COOKIE = process.env.COOKIE2;
    TOKEN = process.env.Token2;
    credentialsIndex = 2;
  } else {
    console.log('Switching back to main API credentials');
    COOKIE = process.env.COOKIE;
    TOKEN = process.env.Token;
    credentialsIndex = 1;
  }
};

const checkUsername = async (username) => {
  const boundary = '----WebKitFormBoundaryKomxIwtBpGRoumtM';
  const body = `--${boundary}\r\nContent-Disposition: form-data; name="authenticity_token"\r\n\r\n${TOKEN}\r\n--${boundary}\r\nContent-Disposition: form-data; name="value"\r\n\r\n${username}\r\n--${boundary}--\r\n`;

  try {
    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': `multipart/form-data; boundary=${boundary}`,
        'priority': 'u=1, i',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'Cookie': COOKIE,
        'Referer': 'https://github.com/settings/admin',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body,
    });

    const text = await response.text();

    if (text.includes('<title>Rate limit</title>')) {
      console.log("Rate limit exceeded. Switching credentials.");
      switchCredentials();  
      return null; 
    }
    if (text.includes('is not available')) {
      console.log(`\x1b[31mUsername "${username}" is taken.\x1b[0m`); 
      return true; 
    }
    if (text.includes('is available')) {
      console.log(`\x1b[32mUsername "${username}" is available.\x1b[0m`); 
      return false; 
    }
    if (text.includes('is unavailable')) {
      console.log(`\x1b[33mUsername "${username}" is unavailable.\x1b[0m`);
      return 'true'; 
    }
    console.log("\x1b[31mTemporarily blocked by Github.\x1b[0m"); 
    switchCredentials();  
    return null;
  } catch (error) {
    console.error(`Error checking username "${username}":`, error);
    return null; 
  }
};

const updateFiles = (username, status) => {
  let availableUsernames = fs.readFileSync(NotTaken, 'utf-8').split('\n').filter(line => line.trim() !== '');
  
  if (status === true) { 
    availableUsernames = availableUsernames.filter(user => user.trim() !== username);
    fs.writeFileSync(NotTaken, availableUsernames.join('\n'));
    fs.appendFileSync(Taken, `${username}\n`);
  } else if (status === false) {
    availableUsernames = availableUsernames.filter(user => user.trim() !== username); 
    fs.writeFileSync(NotTaken, availableUsernames.join('\n'));
    fs.appendFileSync(Available, `${username}\n`);
  }
};


const checkUsernames = async () => {
  for (const username of usernames) {
    const trimmedUsername = username.trim();
    const status = await checkUsername(trimmedUsername);
    if (status !== null) {
      updateFiles(trimmedUsername, status);
    }
    await delay(delayTime); 
  }
};

checkUsernames();
