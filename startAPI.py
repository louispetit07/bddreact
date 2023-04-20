import subprocess

# Chemin d'accès aux fichiers .js
chemin = "./src/"

# Noms des fichiers .js
fichiers = ["servEcole.js", "servLyceeGen.js", "servLyceePro.js"]

# Boucle à travers chaque fichier et exécute en tant que sudo dans un shell séparé
for fichier in fichiers:
    cmd = "sudo node " + chemin + fichier
    subprocess.Popen(["gnome-terminal", "--", "bash", "-c", cmd])
