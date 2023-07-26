from .models import Technician, AutomobileVO, Appointment
from common.json import ModelEncoder


class TechnicianEncoder(ModelEncoder):
     model = Technician
     properties = [
         "name",
         "first_name",
         "last_name",
         "employee_id",
         "id",
     ]

class AutomobileVoEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "color",
        "year",
        "model",
        "sold",
    ]

class AppointmentlistEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "customer",
        "date_time",
        "technician",
        "reason",
        "vip",
        "vin",
        "completed",
        "status",
        "id",
    ]
    encoders ={
        "technician": TechnicianEncoder()
    }
