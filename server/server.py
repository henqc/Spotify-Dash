from fastapi import FastAPI

app = FastAPI()

# uvicorn server:app --reload

@app.get("/")
def read_root():
    return {"Hello": "World"}