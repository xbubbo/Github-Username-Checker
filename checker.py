import requests
import random
import time
from colorama import Fore

aqua = """
                                                                                                      
██████╗ ██╗   ██╗██████╗ ██████╗  ██████╗ 
██╔══██╗██║   ██║██╔══██╗██╔══██╗██╔═══██╗
██████╔╝██║   ██║██████╔╝██████╔╝██║   ██║
██╔══██╗██║   ██║██╔══██╗██╔══██╗██║   ██║
██████╔╝╚██████╔╝██████╔╝██████╔╝╚██████╔╝
╚═════╝  ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝                                           
--------------------------------------------------                                                                                                                                                                                                                                                                                
    """

print(Fore.BLUE + f"{aqua}" + Fore.RESET)

def is_taken(user):
    try:
        with open("Status/Taken.txt", "r") as file:
            taken_usernames = file.read().splitlines()
    except FileNotFoundError:
        taken_usernames = []
    return user in taken_usernames

def add_to_taken(user):
    with open("Status/Taken.txt", "a") as file:
        file.write(user + "\n")

def generate_username():
    characters = "abcdefghijklmnopqrstuvwxyz123456789"
    while True:
        include_hyphen = random.choice([True, False])
        
        if include_hyphen:
            part = "".join(random.choices(characters, k=2)) 
            hyphen_position = random.randint(1, len(part) - 1) 
            username = part[:hyphen_position] + '-' + part[hyphen_position:]
        else:
            username = "".join(random.choices(characters, k=3))
        
        if username[0] != '-' and username[-1] != '-' and '--' not in username:
            return username

while True:
    user = generate_username()
    if is_taken(user):
        continue
    response = requests.get(f"https://www.github.com/{user}/")

    if response.status_code == 200:
        print(Fore.RED + f"USERNAME TAKEN: {user}" + Fore.RESET)
        add_to_taken(user)
    elif response.status_code == 404:
        print(Fore.GREEN + f"USERNAME AVAILABLE: {user}" + Fore.RESET)
        with open("Status/NotTaken.txt", "a") as file:
            file.write(user + "\n")         
    else:
        print("BLOCKED FROM GITHUB")
        time.sleep(5)
