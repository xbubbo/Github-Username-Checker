# GitHub Username Checker

> [!WARNING]
> Using this script may violate [GitHub's Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service). If your account gets suspended due to using this script, it's your responsibility.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Usernames](#usernames)
- [Credits](#credits)
- [License](#license)

## Features
- Quickly checks large numbers of usernames
- Uses your GitHub Auth Token to verify which usernames are available
- Reports usernames as available, taken, or unknown/unavailable

## Prerequisites
- Node.js
- GitHub Account(s)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/xbubbo/Github-Username-Checker
    cd Username-Checker
    ```

2. **Install dependencies and start the script:**
This script checks if usernames are taken by examining public GitHub accounts. Note that private accounts aren’t considered, so a second script will verify the username’s availability more thoroughly. 

   - **With PNPM:**
     ```bash
     pnpm install
     pnpm checker
     ```

   - **With NPM:**
     ```bash
     npm install
     npm checker
     ```

3. **Set up API & Cookie in your environment:**

1. Go to GitHub Settings.
2. Click "Change username".
3. Open DevTools (Ctrl + Shift + I) and minimize the tab.
4. Enter a random username.
5. Re-open DevTools and search "check" in the network tab.
6. Click on "rename_check?suggest_usernames=true".
7. Copy the Cookie from Request Headers.
8. Copy the authenticity_token from Form Data.
9. Edit your `.env` file in the root of the project and add the variables from above, you need two differe accounts for the variables.
4. **Final Script**:
Once you have ran the path-checker script then you will run the script that can 100% check if a username is available, why is it setup like this?
It is setup like this to ensure that a username is available quickly without being rate limited.

> [!NOTE]
> You **CANNOT** use this script on a Github Codespace.

   - **With PNPM:**
     ```bash
     pnpm start
     ```

   - **With NPM:**
     ```bash
     npm start
     ```

## Usage
1. After running the script, it will check the usernames in `NotTaken.txt` and categorize them into:
   - **Available Usernames** - `/Status/Available.txt`
   - **Taken Usernames** - `/Status/Taken.txt`

## Credits
- [Path-Checker](https://github.com/4q-u4/GitHub-Username-Availability-Checker)
- [ASCII Text](https://www.asciiart.eu/text-to-ascii-art)

## Usernames 
As of September 10th, 2024 all possible 2 Character/2 Letter usernames are in use or cannot be used - [Taken.txt](https://github.com/xbubbo/Github-Username-Checker/blob/Archive/9-10-2024/2-Letter/Taken.txt).
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
