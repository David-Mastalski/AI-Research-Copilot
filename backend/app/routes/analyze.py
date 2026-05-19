import logging
from fastapi import APIRouter, File, UploadFile;
from app.services.pdf_service import extract_text_from_pdf
from app.models.schemas import AnalysisResponse
from app.services.llm_service import analyze_document_with_gpt

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter();

@router.post(
    "/analyze",
    response_model=AnalysisResponse,
    summary="Analyze a research paper PDF",
    description=(
        "Upload a PDF research paper. The API extracts text, sends it to an LLM, "
        "and returns a structured analysis including a summary, key points, and insights."
    ),
    tags=["Analysis"],
)
async def analyze_research_paper(
    file: UploadFile = File(..., description="A PDF research paper (max 20 MB)"),
):
    logger.info("Received file: %s (%s)", file.filename, file.content_type)

    doc_text = await extract_text_from_pdf(file)

    analysis = await analyze_document_with_gpt(doc_text)

    logger.info("Analysis complete for file: %s", file.filename)

    return analysis