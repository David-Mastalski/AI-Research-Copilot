# 🔬 AI Research Copilot

Upload a research paper PDF → get a structured summary, key findings, and actionable insights — powered by GPT-4.

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat-square&logo=openai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## About the project

**AI Research Copilot** is a web application that allows you to upload a scientific paper in PDF format and receive the following within seconds:

- 📄 **Summary** — a concise abstract of the paper
- 🔑 **Key Points** — the most important discoveries and facts
- 💡 **Insights** — conclusions, limitations, and future research directions

The project was developed as a portfolio MVP, combining a modern frontend with an LLM-powered backend.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Backend | Python 3.12, FastAPI |
| PDF Parsing | pypdf |
| LLM | OpenAI GPT-4o-mini |
| Konfiguracja | pydantic-settings, python-dotenv |

## Local Setup

### Prerequisites

- Python 3.12+
- Node.js 18+
- OpenAI API Key → [platform.openai.com](https://platform.openai.com/api-keys)

Clone repozitory
```bash
git clone https://github.com/David-Mastalski/AI-Research-Copilot.git
cd AI-Research-Copilot
```

### Backend
```bash
cd backend
```
### Utwórz wirtualne środowisko
```bash
py -3.12 -m venv .venv
```
### Aktywuj
```bash
.venv\Scripts\activate
```
### Zainstaluj zależności
```bash
pip install -r requirements.txt
```
### Skonfiguruj zmienne środowiskowe
```bash
pip install -r requirements.txt
```
### Zainstaluj zależności
```bash
cp .env.example .env
```
### Uruchom serwer
```bash
uvicorn app.main:app --reload
```



