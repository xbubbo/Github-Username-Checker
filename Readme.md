# GitHub Username Checker

> [!WARNING]
> Using this script may violate [GitHub's Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service). If your account gets suspended due to using this script, it's your responsibility.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
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

### Set up API & Cookie in Environment

1. **GitHub Settings**:
   - Go to GitHub Settings and select "Change username."
   - Open DevTools (Ctrl + Shift + I), enter any random username, then check the network tab for "rename_check?suggest_usernames=true."
   - Copy the Cookie from Request Headers and the authenticity_token from Form Data.

2. **Add Variables**:
   - In your project's `.env` file, add the Cookie and authenticity_token from two different accounts.

3. **Run the Scripts**:
   - First, run the path-checker script to verify the setup. This checks usernames without hitting rate limits.

> [!NOTE]
> You **CANNOT** use this script on a Github Codespace.
   
   - **Run with PNPM**:
     ```bash
     pnpm start
     ```

   - **Run with NPM**:
     ```bash
     npm start
     ```

4. **Output**:
   - The script categorizes usernames from `NotTaken.txt`:
     - **Available Usernames**: `/Status/Available.txt`
     - **Taken Usernames**: `/Status/Taken.txt`

## Credits
- [Path-Checker](https://github.com/4q-u4/GitHub-Username-Availability-Checker)
- [ASCII Text](https://www.asciiart.eu/text-to-ascii-art)

## Usernames 
As of September 10th, 2024 all possible 2 Character/2 Letter usernames are in use or cannot be used - [Taken.txt](https://github.com/xbubbo/Github-Username-Checker/blob/Archive/9-10-2024/2-Letter/Taken.txt).
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
