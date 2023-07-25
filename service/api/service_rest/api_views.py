from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Appointment, AutomobileVO, Technician
from .encoders import AppointmentlistEncoder, TechnicianEncoder
import json
from datetime import datetime

@require_http_methods(["GET", "POST"])
def api_list_service_appointment(request, vin_vo=None):
    if request.method == "GET":
        if vin_vo is not None:
            service_appointments = Appointment.objects.filter(vin=vin_vo)
        else:
            service_appointments = Appointment.objects.all()
        return JsonResponse(
            {"service_appointments": list(service_appointments.values())},
            encoder=AppointmentlistEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.get(id=content["technician"])
        content["technician"] = technician

        try:
            automobile = AutomobileVO.objects.get(vin=content["vin"])
        except AutomobileVO.DoesNotExist:
            automobile = None

        if automobile is not None:
            content["vip"] = True
        else:
            content["vip"] = False

        date_time_str = content["dateTime"]
        content["date_time"] = datetime.strptime(date_time_str, "%Y-%m-%dT%H:%M")
        del content["dateTime"]

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentlistEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_service_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            {"service_appointment": appointment},
            encoder=AppointmentlistEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "technician" in content:
                tech = Technician.objects.get(id=content["technician"])
                content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "invalid technician"},
                status=400,
            )
        Appointment.objects.filter(id=pk).update(**content)
        service = Appointment.objects.get(id=pk)
        return JsonResponse(
            {"service": service},
            encoder=AppointmentlistEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": list(technicians.values())},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
            safe=False
        )

@require_http_methods(["DELETE", "GET"])
def api_show_technician(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
