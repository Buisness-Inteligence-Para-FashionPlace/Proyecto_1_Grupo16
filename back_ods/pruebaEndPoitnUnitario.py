import requests

url = 'http://127.0.0.1:8000/texts/'

texto_de_prueba = "1. 1. Introducción: Las Estructuras del Derecho Penal 2. El Estándar de la Persona Razonable en el Derecho Penal 3. La Responsabilidad Penal de los Delincuentes Suerte resultante y responsabilidad penal 4. 4. Criminalización del sadomasoquismo: negación de lo erótico, instanciación de la violencia 5. Constitucionalismo y límites del Derecho Penal 6. Delincuencia internacional: contexto y contraste Forma jurídica y juicio moral: Eutanasia y suicidio asistido 8. Derecho anormal: La teratología como lógica de criminalización 9. Tensiones de la criminalización: Desierto Empírico, Cambio de Normas y Reforma de la Violación 10. Delitos de Preparación, Intereses de Seguridad y Libertad Política Delitos de preparación, intereses de seguridad y libertad política"

# response = requests.post(url + f'?texto={texto_de_prueba}')
response = requests.post(url, json={"texto": texto_de_prueba})


if response.status_code == 200:
    data = response.json()
    texto_0 = data['texto_0']
    sdg = data['sdg']
    print(f'Texto: {texto_0}')
    print(f'Clasificación SDG: {sdg}')
else:
    print(f'Error en la solicitud. Código de estado: {response.status_code}')
    print(f'Mensaje de error: {response.text}')
