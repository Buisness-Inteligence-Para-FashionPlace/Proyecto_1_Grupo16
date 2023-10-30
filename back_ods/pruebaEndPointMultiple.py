import requests

url = 'http://127.0.0.1:8000/texts/'

textos_de_prueba = ["1. 1. Introducción: Las Estructuras del Derecho Penal 2. El Estándar de la Persona Razonable en el Derecho Penal 3. La Responsabilidad Penal de los Delincuentes Suerte resultante y responsabilidad penal 4. 4. Criminalización del sadomasoquismo: negación de lo erótico, instanciación de la violencia 5. Constitucionalismo y límites del Derecho Penal 6. Delincuencia internacional: contexto y contraste Forma jurídica y juicio moral: Eutanasia y suicidio asistido 8. Derecho anormal: La teratología como lógica de criminalización 9. Tensiones de la criminalización: Desierto Empírico, Cambio de Normas y Reforma de la Violación 10. Delitos de Preparación, Intereses de Seguridad y Libertad Política Delitos de preparación, intereses de seguridad y libertad política",
    "Las aguas subterráneas se han debatido en el contexto de la tarificación y la financiación (OCDE, 2009a y 2009b), la energía (OCDE, 2012b), la gestión de riesgos (OCDE, 2013e) y perspectivas más amplias que abarcan el cambio climático (OCDE, 2013d y 2014a). Las aguas subterráneas también aparecen en las revisiones de las reformas del agua a nivel nacional (por ejemplo, Fuentes, 2011, OCDE, 2013b). Todos estos informes incluyen secciones, subsecciones, párrafos o ilustraciones que se refieren a las aguas subterráneas, pero no transmiten conclusiones políticas específicamente orientadas a los gestores de tipos concretos de aguas subterráneas, sobre todo en el contexto de la agricultura. En primer lugar, una observación coherente es que las aguas subterráneas están generalmente poco estudiadas y que es necesario realizar una evaluación más profunda de las reservas, el uso y las prácticas de gestión de las aguas subterráneas.",
    "La presente contribución evalúa la jurisprudencia del Tribunal de Justicia de las Comunidades Europeas en materia de interpretación de las disposiciones del Convenio de Aarhus relativas al acceso a la justicia. Los casos se han referido al Ã¡mbito temporal de aplicaciÃ³n de las disposiciones sobre el acceso a la justicia, los proyectos ejecutados por actos especÃficos de legislaciÃ³n nacional y su exclusiÃ³n de las obligaciones derivadas del Convenio, las medidas cautelares y el effet utile de las disposiciones sobre el acceso a la justicia, el abanico de posibles motivos de recurso judicial, el papel de los errores de procedimiento, las costas procesales admisibles, el acceso a la justicia de las asociaciones ecologistas en virtud de distintas disposiciones del Convenio y la anulaciÃ³n de un permiso y su relaciÃ³n con el derecho de propiedad. Como también se muestra, esta jurisprudencia es al mismo tiempo relevante -aunque no vinculante- para Suiza como Estado no miembro de la UE, pero parte del Convenio.",
    "Sin embargo, este crédito fiscal expira en 2012. Wemau (2011a) calcula que hasta una quinta parte de la capacidad de generaciÃ³n de energÃa del Estado podrÃa decidir abandonar el mercado en lugar de invertir en las mejoras necesarias, lo que podrÃa aumentar el precio del carbÃ³n en un 65% y ofrecer oportunidades a las fuentes de energÃa renovables. Ahorra aproximadamente 47 000 toneladas de CO2 al aÃ±o y sustituye anualmente mÃ¡s de ocho millones de desplazamientos en vehÃculo privado en la ciudad de Calgary."]

text_data = {"textos": textos_de_prueba, "archivo": ""}

response = requests.post(url, json=text_data)

if response.status_code == 200:
    results = response.json()
    texto = results['textosProcesados']
    archivo_guardado = results['archivo']
    print(f'Textos procesado: {texto}')
    print(f'Archivo donde se guardo: {archivo_guardado}')
else:
    print(f'Error en la solicitud. Código de estado: {response.status_code}')
    print(f'Mensaje de error: {response.text}')
