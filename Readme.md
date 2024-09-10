# GitHub Username Checker

> [!WARNING]
> Using this script may violate [GitHub's Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service). If your account gets suspended due to using this script, it's your responsibility.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Credits](#credits)
- [License](#license)

## Features
- Quickly checks large numbers of usernames
- Uses your Auth Token to verify which usernames are available
- Reports usernames as available, taken, or unknown/unavailable

## Prerequisites
- Node.js
- Python
- Github

### Installation

1. **Clone the repository:**
```bash
git clone https://xbubbo/Username-Checker
pip install requests colorama
```

2. **Run the Python script:**
   This will check username paths and save the unused names in `NotTaken.txt`.
   ```bash
   python checker.py
   ```

2. **Set API & Cookie in ENV:**
1. Go to [GitHub Settings](https://github.com/settings/admin).
2. Click **"Change username"**.
3. Open **DevTools** (Ctrl + Shift + I), and minimize the tab.
4. Enter a random username.
5. Re-open **DevTools** and search **"check"** in the network tab.
6. Click on **"rename_check?suggest_usernames=true"**.
7. Copy the **Cookie** from **Request Headers**.
8. Copy the **authenticity_token** from **Form Data**.
9. Open your **.env** file.
10. Paste the **cookie** and **token** into the respective variables.

3. **Install dependencies and start the script:**
    This will check the usernames in ``NotTaken.txt`` and put them into their own files accordingly.

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
4. **Once you are done running the script:**
Once you have ran the script for a while:  

- **Available Usernames** - `/Status/Available.txt`
- **Taken Usernames** - `/Status/Taken.txt`
- **Unknown Usernames** - `/Status/Unknown.txt`  
  *(When checking this username, the response was either "Username '' is unavailable" or "Username '' is unknown")*

# Credits
- [Path-Checker](https://github.com/4q-u4/GitHub-Username-Availability-Checker)
- [ASCII Text](https://www.asciiart.eu/text-to-ascii-art)
# License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


