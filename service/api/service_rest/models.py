from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    model = models.CharField(max_length=150)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.vin}"


    def get_api_url(self):
        return reverse("api_auto_mobile_vo", kwargs={"pk": self.pk})





class Technician(models.Model):
    name = models.CharField(max_length=200)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name




    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.pk})




class Appointment(models.Model):
    customer = models.CharField(max_length=200)
    date_time = models.DateTimeField(auto_now_add=True)
    reason = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)
    vin = models.CharField(max_length=200)
    status = models.BooleanField(default=False)



    technician = models.ForeignKey(
        Technician,
        related_name="Appointment",
        on_delete=models.PROTECT
        )


    def get_api_url(self):
        return reverse("api_service_appointment", kwargs={"pk": self.pk})
