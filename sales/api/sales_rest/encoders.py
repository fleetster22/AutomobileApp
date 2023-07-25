from common.json import ModelEncoder

from .models import AutomobileVO, Salesperson, Customer, Sale

class AutomobileVOEncoder(ModelEncoder):
    model=AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SalesPersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class SalesRecordEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "salesperson",
        "customer",
        "automobile",
    ]
    encoders = {
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
def get_extra_data(self, o):
    return {"salesperson": o.salesperson.first_name,
                "customer": o.customer.last_name,
                "automobile": o.automobile.vin,
                }
