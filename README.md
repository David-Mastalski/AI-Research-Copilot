

# 🔬 AI Research Copilot

Upload a research paper PDF → get a structured summary, key findings, and actionable insights — powered by GPT-4.

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat-square&logo=openai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <img width="708" height="384" alt="Zrzut ekranu 2026-05-21 211036" src="https://github.com/user-attachments/assets/fe8d7154-ae00-4c23-9c28-7e49cdbdbba6" width="100%" />
    </td>
    <td width="50%" align="center">
      <img width="710" height="387" alt="Zrzut ekranu 2026-05-21 211217" src="https://github.com/user-attachments/assets/b247d10a-a36a-4957-987a-f7a30df79bbe" width="100%" />
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img width="709" height="387" alt="Zrzut ekranu 2026-05-21 211234" src="https://github.com/user-attachments/assets/373e6349-e77c-4c84-9595-d476e9cc670a" />
    </td>
    <td width="50%" align="center">
      <img width="710" height="387" alt="Zrzut ekranu 2026-05-21 211323" src="https://github.com/user-attachments/assets/375dafc0-af4f-4a1b-bd62-be40ee3cff56" />
    </td>
  </tr>
</table>



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

#### Clone repozitory
```bash
git clone https://github.com/David-Mastalski/AI-Research-Copilot.git
cd AI-Research-Copilot
```

## Backend
```bash
cd backend
```
#### Create a virtual environment
```bash
py -3.12 -m venv .venv
```
#### Activate
```bash
.venv\Scripts\activate
```
#### Install requirements
```bash
pip install -r requirements.txt
```
#### Configure environment variables
Open .env and enter your key: OPENAI_API_KEY=
```bash
cp .env.example .env
```
#### Start the server
```bash
uvicorn app.main:app --reload
```

## Frontend
```bash
cd frontend

npm install
npm run dev
```


