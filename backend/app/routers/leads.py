from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import LeadInquiry, User
from ..schemas import LeadInquiryOut, LeadInquiryCreate, LeadInquiryUpdate
from ..auth import get_current_user

router = APIRouter(prefix="/api/leads", tags=["Lead Inquiries & CRM"])

@router.post("/", response_model=LeadInquiryOut)
def submit_lead_inquiry(data: LeadInquiryCreate, db: Session = Depends(get_db)):
    lead = LeadInquiry(
        name=data.name,
        phone=data.phone,
        email=data.email,
        destination_or_stay=data.destination_or_stay,
        travel_dates=data.travel_dates,
        number_of_guests=data.number_of_guests,
        message=data.message,
        status="New"
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead

@router.get("/", response_model=List[LeadInquiryOut])
def get_all_leads(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(LeadInquiry)
    if status and status.lower() != "all":
        query = query.filter(LeadInquiry.status == status)
    return query.order_by(LeadInquiry.created_at.desc()).all()

@router.put("/{lead_id}", response_model=LeadInquiryOut)
def update_lead_status(
    lead_id: int, 
    data: LeadInquiryUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    lead = db.query(LeadInquiry).filter(LeadInquiry.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    if data.status is not None:
        lead.status = data.status
    if data.notes is not None:
        lead.notes = data.notes
        
    db.commit()
    db.refresh(lead)
    return lead

@router.delete("/{lead_id}")
def delete_lead(lead_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    lead = db.query(LeadInquiry).filter(LeadInquiry.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    db.delete(lead)
    db.commit()
    return {"message": "Lead inquiry deleted", "id": lead_id}
