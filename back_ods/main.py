from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
import os
import ftfy
import re
from sklearn.base import BaseEstimator, TransformerMixin
from nltk.corpus import stopwords
from num2words import num2words
import uvicorn

app = FastAPI(
    description="This is a simple app that clasifies text into 3 categories of the ODS using a machine learning model.",
    title="ODS Classifier",
)

class TextRequest(BaseModel):
    texto: str

class TextsRequest(BaseModel):
    textos: list

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

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/texts/")
async def classifyText(
    text_data: TextRequest
):
    texto = text_data.texto    
    data = {"Textos_espanol":[texto]}
    df = pd.DataFrame(data)
    df["sdg"] = np.nan
    pipeline_loaded = joblib.load(os.path.dirname(__file__) + '/../model.joblib')
    df['sdg'] = pipeline_loaded.predict(df['Textos_espanol'])
    fila = df[df['Textos_espanol'] == texto]
    sdg = -1
    if not fila.empty:
        sdg = fila['sdg'].iloc[0]
    return {"texto_0": texto, "sdg":str(sdg)}

@app.post("/classify-multiple-texts/")
async def classifyMultipleTexts(text_data: TextsRequest):
    textos = text_data.textos
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

    return results

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)