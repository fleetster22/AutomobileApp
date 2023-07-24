from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import ServiceAppointment, AutoMobileVO, Technician
from .encoders import ServiceAppointmentlistEncoder, TechnicianEncoder
import json
from datetime import datetime


@require_http_methods(["GET","POST"])
def api_list_service_appointment(request, vin_vo=None):
    if request.method == "GET":
        if vin_vo is not None:
            service_appointments = ServiceAppointment.objects.filter(vin=vin_vo)
        else:
            service_appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"service_appointments": service_appointments},
            encoder=ServiceAppointmentlistEncoder,
            safe=False
        )
    else:

        content = json.loads(request.body)


        technician = Technician.objects.get(id=content["technician"])
        content["technician"] = technician

        try:
            automobile = AutoMobileVO.objects.get(vin=content["vin"])
        except:
            automobile = None

        if automobile is not None:
            content["vip"] = True
        else:
            content["vip"] = False
        content["date"] = datetime.strptime(content["date"], "%Y-%m-%d")
        timeconversion = datetime.strptime(content["time"], "%H:%S")

        content["time"] = timeconversion

        serviceappointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            serviceappointment,
            encoder=ServiceAppointmentlistEncoder,
            safe=False,
        )


@require_http_methods(["DELETE","GET","PUT"])
def api_show_service_appointment(request, pk):
    if request.method == "GET":
        appointment = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            {"service_appointment": appointment},
            encoder=ServiceAppointmentlistEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = ServiceAppointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        try:
            if "technician" in content:
                tech = Technician.objects.get( id=content["technician"])
                content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "invalid technician"},
                status=400,
            )
        ServiceAppointment.objects.filter(id=pk).update(**content)
        service = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder=ServiceAppointmentlistEncoder,
            safe=False
        )




@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False
            )
    else:
        content =json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
            safe=False
        )

@require_http_methods(["DELETE","GET"])
def api_show_technician(request, pk):
    if request.method =="GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        request.method == "DELETE"
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
