from fastapi import FastAPI
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
async def read_item(
    texto: str,
):
    data = {"Textos_espanol":[texto]}
    df = pd.DataFrame(data)
    df["sdg"] = np.nan
    pipeline_loaded = joblib.load(os.path.dirname(__file__) + '/../model.joblib')
    df['sdg'] = pipeline_loaded.predict(df['Textos_espanol'])
    print(df)

    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)