from .models import Technician, AutoMobileVO, ServiceAppointment
from common.json import ModelEncoder


class TechnicianEncoder(ModelEncoder):
     model = Technician
     properties = [
         "name",
         "employee_number",
         "id",
     ]

class AutoMobileVoEncoder(ModelEncoder):
    model = AutoMobileVO
    properties = [
        "vin",
        "color",
        "year",
        "model",
    ]

class ServiceAppointmentlistEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "customer_name",
        "date",
        "time",
        "technician",
        "reason",
        "vip",
        "vin",
        "completed",
        "id",
    ]
    encoders ={
        "technician": TechnicianEncoder()
    }
