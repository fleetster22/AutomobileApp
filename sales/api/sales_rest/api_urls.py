from django.urls import path
from .api_views import (
    api_customers,
    api_customer,
    api_salespeople,
    api_salesperson,
    api_sales,
    api_sale,
    api_automobiles,
)

urlpatterns = [
    path("automobiles/", api_automobiles, name="api_automobiles"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:id>/", api_salesperson, name="api_salesperson"),
    path(
        "salespeople/<int:sales_person_employee_number>/sales/",
        api_sales,
        name="api_employee_sales"
    ),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:id>/", api_sale, name="api_sale"),
]
