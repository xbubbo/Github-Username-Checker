require('dotenv').config();
const axios = require('axios');
const fs = require('node:fs');
const path = require('node:path');
const { randomInt } = require('node:crypto');

const Taken = path.join(__dirname, 'Status', 'Taken.txt');
const NotTaken = path.join(__dirname, 'Status', 'NotTaken.txt');

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
const length = Number.parseInt(process.env.LENGTH, 10) || 3; 

const loadTakenUsernames = () => {
    const takenUsernames = new Set();
    try {
        const data = fs.readFileSync(Taken, 'utf8');
        for (const user of data.split('\n').filter(Boolean)) {
            takenUsernames.add(user.trim());
        }
        console.log(`Loaded ${takenUsernames.size} taken usernames.`);
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
    }
    return takenUsernames;
};

const isUsernameTaken = (username, takenUsernames) => {
  return takenUsernames.has(username);
};

const generateUsername = () => {
    while (true) {
        let username;

        if (length === 2) {
            username = [...Array(2)].map(() => characters.charAt(randomInt(0, characters.length))).join('');
        } else if (length === 3) {
            const includeHyphen = Math.random() < 0.5;
            if (includeHyphen) {
                const part = [...Array(2)].map(() => characters.charAt(randomInt(0, characters.length))).join('');
                const hyphenPosition = randomInt(1, part.length);
                username = `${part.slice(0, hyphenPosition)}-${part.slice(hyphenPosition)}`;
            } else {
                username = [...Array(3)].map(() => characters.charAt(randomInt(0, characters.length))).join('');
            }
        } else {
            throw new Error(`Unsupported username length: ${length}`);
        }

        if (username[0] !== '-' && username[username.length - 1] !== '-' && !username.includes('--')) {
            return username;
        }
    }
};

const checkUsernameAvailability = async (username) => {
    while (true) {
        try {
            const response = await axios.get(`https://www.github.com/${username}/`);
            if (response.status === 200 || response.status === 410) {
                return 'taken';
            }
            if (response.status === 404) {
                return 'available';
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 429) {
                    console.log(`Rate limit exceeded for ${username}. Waiting 4 seconds before retrying...`);
                    await new Promise(resolve => setTimeout(resolve, 4000));
                } else if (err.response.status === 410) {
                    return 'taken';
                } else if (err.response.status === 404) {
                    return 'available';
                }
                console.error(`Error checking username ${username}: ${err.response.status}`);
                throw err;
            }
            console.error(`Error checking username ${username}: ${err.message}`);
            throw err;
        }
    }
};

const checkUsernames = async () => {
    const takenUsernames = loadTakenUsernames();

    while (true) {
        const username = generateUsername();

        if (isUsernameTaken(username, takenUsernames)) {
            continue;
        }

        try {
            const result = await checkUsernameAvailability(username);

            if (result === 'taken') {
                console.log(`\x1b[31mUSERNAME TAKEN: ${username}\x1b[0m`);
                fs.appendFileSync(Taken, `${username}\n`);
                takenUsernames.add(username); 
            } else if (result === 'available') {
                console.log(`\x1b[32mUSERNAME AVAILABLE: ${username}\x1b[0m`); 
                fs.appendFileSync(NotTaken, `${username}\n`);
            }
        } catch (err) {
            console.error(`Error processing username ${username}: ${err.message}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

checkUsernames();