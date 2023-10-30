import requests

file_name = '2023-10-29_19-39-09.csv'
url = f'http://localhost:8000/storic/{file_name}'
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    print(f"Contenido del archivo '{file_name}':")
    for item in data:
        print(f"Texto: {item['texto']}, SDG: {item['sdg']}")
else:
    print(f"Error al obtener el archivo '{file_name}'.")
    print(f"Código de estado: {response.status_code}")
    print(f"Mensaje de error: {response.text}")
