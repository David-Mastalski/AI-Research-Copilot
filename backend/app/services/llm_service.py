import json
import logging
from openai import AsyncOpenAI, OpenAIError
from app.models.schemas import AnalysisResponse
from app.core.config import settings
from fastapi import HTTPException

logger = logging.getLogger(__name__)

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

SYSTEM_PROMPT = """You are an expert academic research analyst. Your role is to analyze research papers and provide structured, insightful breakdowns for researchers and practitioners.

You must always respond with a single valid JSON object (no markdown, no extra commentary) matching this exact schema:
{
  "summary": "<2-4 sentence concise summary of the paper>",
  "key_points": ["<point 1>", "<point 2>", "..."],
  "insights": ["<insight 1>", "<insight 2>", "..."]
}

Guidelines:
- summary: A clear, jargon-aware overview covering the problem, method, and outcome. 2–4 sentences.
- key_points: 4–7 bullet points covering the most important findings, contributions, methodology, or results.
- insights: 3–5 higher-level takeaways — implications, limitations, future directions, or connections to broader trends.

Be precise, academically rigorous, and never fabricate data not present in the text."""

USER_PROMPT_TEMPLATE = """Please analyze the following research paper text and return a structured JSON analysis.

--- PAPER TEXT START ---
{paper_text}
--- PAPER TEXT END ---"""


async def analyze_document_with_gpt(doc_text: str) -> AnalysisResponse:
    if not settings.OPENAI_API_KEY:
        raise HTTPException (
            status_code=503,
            detail="OpenAI API key is not configured. Please set OPENAI_API_KEY in your .env file.",
        )

    user_prompt = USER_PROMPT_TEMPLATE.format(paper_text=doc_text)

    try :
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
            temperature=0.3,
            response_format={"type": "json_object"}
        )
    except OpenAIError as exc:
        logger.error("OpenAI API error: %s", exc)
        raise HTTPException(status_code=502, detail="LLM service error: {str(exc)}")

    raw_content = response.choices[0].message.content

    try :
        data = json.loads(raw_content)
        return AnalysisResponse(
            summary=data.get("summary", ""),
            key_points=data.get("key_points", []),
            insights=data.get("insights", [])
        )
    except (json.JSONDecodeError, KeyError, TypeError) as exc:
        logger.error("Failed to parse LLM response: %s\nRaw: %s", exc, raw_content)
        raise HTTPException(status_code=500, detail="The LLM returned an unexpected response format. Please try again.")
