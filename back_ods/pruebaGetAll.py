import requests

url = 'http://localhost:8000/storic/'
response = requests.get(url)

if response.status_code == 200:
    files = response.json()
    print("Archivos en el directorio 'storic':")
    for file in files:
        print(file)
else:
    print("Error al obtener la lista de archivos.")
    print(f"Código de estado: {response.status_code}")
    print(f"Mensaje de error: {response.text}")
