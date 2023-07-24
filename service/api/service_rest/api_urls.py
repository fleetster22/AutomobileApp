from django.urls import path
from .api_views import(
    api_list_service_appointment,
    api_show_service_appointment,
    api_list_technicians,
    api_show_technician,
)

urlpatterns = [
    path("services/", api_list_service_appointment, name="api_create_service_appointment" ),
    path("automobiles/<int:vin_vo>/services/", api_list_service_appointment, name="ap_list_service_appointment"),
    path("services/<int:pk>/", api_show_service_appointment, name="api_show_appointment"),
    path("technician/", api_list_technicians, name="api_create_technician"),
    path("technician/<int:pk>/", api_show_technician, name="api_show_technician")

]
