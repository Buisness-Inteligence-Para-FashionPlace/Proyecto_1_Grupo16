from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import pandas as pd
import numpy as np
import csv
import joblib
import os
import ftfy
import re
from sklearn.base import BaseEstimator, TransformerMixin
from nltk.corpus import stopwords
from num2words import num2words
import uvicorn

"""
Text analysis pipeline methods that are needed.
"""
def fix_malformed_words(text):
    text = ftfy.fix_text(text)
    return text
    
def remove_punctuation(text):
    return re.sub(r'[^\w\s]', ' ', text)
    
def replace_numbers_with_spanish_text(text):
    words = text.split()
    for i, word in enumerate(words):
        if word.isdigit():
            words[i] = num2words(int(word), lang='es')
    return ' '.join(words)

class TextPreprocessor(BaseEstimator, TransformerMixin):

    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        X = X.astype(str)
        X = X.apply(fix_malformed_words)
        X = X.apply(remove_punctuation)
        X = X.apply(replace_numbers_with_spanish_text)
        return X

app = FastAPI(
    description="This is a simple app that clasifies text into 3 categories of the ODS using a machine learning model.",
    title="ODS Classifier",
)

class TextRequest(BaseModel):
    texto: str
    archivo: Optional[str]

class TextsRequest(BaseModel):
    textos: list
    archivo: Optional[str]  

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/texts/")
async def classifyText(
    text_data: TextRequest
):
    texto = text_data.texto
    archivo = text_data.archivo

    data = {"Textos_espanol":[texto]}
    df = pd.DataFrame(data)
    df["sdg"] = np.nan
    pipeline_loaded = joblib.load(os.path.dirname(__file__) + '/../model.joblib')
    df['sdg'] = pipeline_loaded.predict(df['Textos_espanol'])
    fila = df[df['Textos_espanol'] == texto]
    sdg = -1
    if not fila.empty:
        sdg = fila['sdg'].iloc[0]

    if not archivo:
        current_datetime = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        file = os.path.join("./back_ods/storic", f"{current_datetime}.csv")
        with open(file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Textos_espanol", "sdg"])
            writer.writerow([texto, sdg])
    else:
        data_to_append = [texto, sdg]
        file = os.path.join("./back_ods/storic", archivo)
        with open(file, 'a', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(data_to_append)

    return {"texto": texto, "sdg":str(sdg)}

@app.post("/classify-multiple-texts/")
async def classifyMultipleTexts(text_data: TextsRequest):
    textos = text_data.textos
    archivo = text_data.archivo
    results = []

    for texto in textos:
        data = {"Textos_espanol": [texto]}
        df = pd.DataFrame(data)
        df["sdg"] = np.nan
        pipeline_loaded = joblib.load(os.path.dirname(__file__) + '/../model.joblib')
        df['sdg'] = pipeline_loaded.predict(df['Textos_espanol'])
        fila = df[df['Textos_espanol'] == texto]
        sdg = -1
        if not fila.empty:
            sdg = fila['sdg'].iloc[0]

        results.append({"texto": texto, "sdg": str(sdg)})

    if not archivo:
        current_datetime = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        file = os.path.join("./back_ods/storic", f"{current_datetime}.csv")
        with open(file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Textos_espanol", "sdg"])
            for result in results:
                writer.writerow([result["texto"], result["sdg"]])
    else:
        file = os.path.join("./back_ods/storic", archivo)
        with open(file, 'a', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            for result in results:
                writer.writerow([result["texto"], result["sdg"]])

    return results

@app.get("/storic/{file_name}")
async def getStoricIndividual(file_name: str):
    file = os.path.join("./back_ods/storic", file_name)
    results = []
    with open(file, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            if row != ["Textos_espanol", "sdg"]:
                results.append({"texto": row[0], "sdg": row[1]})
    return results

@app.get("/storic/")
async def getStoric():
    results = []
    files = os.listdir("./back_ods/storic")
    for file in files:
        with open(os.path.join("./back_ods/storic", file), 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)
            first_row = next(reader)
            results.append({"texto": first_row[0][0:50]})
    return results


# Run the API with uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)