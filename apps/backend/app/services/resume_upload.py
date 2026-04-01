"""Resume upload module.

Single line definition:
async def upload_and_parse_resume(file: UploadFile) -> ResumeUploadResponse:

Handles complete upload flow: validation, parsing to markdown/JSON, DB storage.
"""

import hashlib
import uuid
from pathlib import Path
from typing import Any

from fastapi import UploadFile, HTTPException
from app.database import db
from app.schemas import ResumeUploadResponse
from app.services.parser import parse_document, parse_resume_to_json
from app.config import settings

ALLOWED_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
MAX_FILE_SIZE = 4 * 1024 * 1024  # 4MB

async def upload_and_parse_resume(file: UploadFile) -> ResumeUploadResponse:
    """Single line to define the resume upload module: complete upload + parse flow."""
    # Validate file type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type: {file.content_type}. Allowed: PDF, DOC, DOCX",
        )

    # Read and validate size
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum size: {MAX_FILE_SIZE // (1024 * 1024)}MB",
        )

    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Empty file")

    # Convert to markdown
    try:
        markdown_content = await parse_document(content, file.filename or "resume.pdf")
    except Exception as e:
        raise HTTPException(
            status_code=422,
            detail="Failed to parse document. Please ensure it's a valid PDF or DOCX file.",
        )

    # Store in database first with "processing" status (atomic master assignment)
    resume = await db.create_resume_atomic_master(
        content=markdown_content,
        content_type="md",
        filename=file.filename,
        processed_data=None,
        processing_status="processing",
    )

    # Try to parse to structured JSON (optional, may fail if LLM not configured)
    try:
        processed_data = await parse_resume_to_json(markdown_content)
        db.update_resume(
            resume["resume_id"],
            {
                "processed_data": processed_data,
                "processing_status": "ready",
            },
        )
        resume["processed_data"] = processed_data
        resume["processing_status"] = "ready"
    except Exception:
        # LLM parsing failed, update status to failed
        db.update_resume(resume["resume_id"], {"processing_status": "failed"})
        resume["processing_status"] = "failed"

    # Return accurate status to client
    return ResumeUploadResponse(
        message=(f"File {file.filename} uploaded successfully"
                 if resume["processing_status"] == "ready"
                 else f"File {file.filename} uploaded but parsing failed"),
        request_id=str(uuid.uuid4()),
        resume_id=resume["resume_id"],
        processing_status=resume["processing_status"],
        is_master=resume.get("is_master", False),
    )

