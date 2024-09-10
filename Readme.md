# GitHub Username Checker

> [!WARNING]
> Using this script may violate [GitHub's Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service). If your account gets suspended due to using this script, it's your responsibility.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
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
    git clone https://github.com/your-username/Username-Checker.git
    cd Username-Checker
    ```

2. **Install dependencies and start the script:**
This script checks if usernames are taken by examining public GitHub accounts. Note that private accounts aren’t considered, so a second script will verify the username’s availability more thoroughly. 

   - **With PNPM:**
     ```bash
     pnpm install
     pnpm start
     ```

   - **With NPM:**
     ```bash
     npm install
     npm start
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
9. Create or edit your `.env` file in the root of the project and add the following variables:
   ```
   TOKEN='TOKEN_HERE'
   COOKIE='COOKIE_HERE'
   TOKEN2='TOKEN2_HERE'
   COOKIE2='COOKIE2_HERE'
   ```
4. **Final Script**:
Once you have ran the path-checker script then you will run the script that can 100% check if a username is available, why is it setup like this?
It is setup like this to ensure that a username is available quickly without being rate limited.

   - **With PNPM:**
     ```bash
     pnpm checker
     ```

   - **With NPM:**
     ```bash
     npm checker
     ```

## Usage
1. After running the script, it will check the usernames in `NotTaken.txt` and categorize them into:
   - **Available Usernames** - `/Status/Available.txt`
   - **Taken Usernames** - `/Status/Taken.txt`
## Credits
- [Path-Checker](https://github.com/4q-u4/GitHub-Username-Availability-Checker)
- [ASCII Text](https://www.asciiart.eu/text-to-ascii-art)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.