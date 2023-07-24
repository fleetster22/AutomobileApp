from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    model = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.vin}"

class SalesPerson(models.Model):
    name = models.CharField(max_field=150)
    employee_number = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_sales_persons", kwargs={"id": self.id})

    def __str__(self):
        return f"{self.name}"

class Customer(models.Model):
    name = models.CharField(max_length=150)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=20)

    def get_api_url(self):
        return reverse("api_customers", kwargs={"id": self.id})

    def __str__(self):
        return f"{self.name}"

class SalesRecord(models.Model):
    price = models.CharField(max_length=150)

    sales_person = models.ForeignKey(
        SalesPerson,
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
        return reverse("api_sales_records", kwargs={"id": self.id})

    def __str__(self):
        return f"{self.id}"
