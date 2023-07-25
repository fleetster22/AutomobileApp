from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField()

    def __str__(self):
        return f"{self.vin}"


class Salesperson(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_salespeople", kwargs={"id": self.id})

    def __str__(self):
        return f"{self.name}"


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=20)

    def get_api_url(self):
        return reverse("api_customers", kwargs={"id": self.id})

    def __str__(self):
        return f"{self.name}"


class Sale(models.Model):
    price = models.FloatField
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales_record",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales_record",
        on_delete=models.PROTECT,
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales_record",
        on_delete=models.PROTECT,
    )

    def get_api_urls(self):
        return reverse("api_sales", kwargs={"id": self.id})

    def __str__(self):
        return f"{self.id}"
