from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    AutomobileVOEncoder,
    SalesPersonEncoder,
    CustomerEncoder,
    SalesRecordEncoder,
)
from .models import (
    AutomobileVO,
    Salesperson,
    Customer,
    Sale,
)


@require_http_methods(["GET"])
def api_automobiles(request):
    if request.method == "GET":
        available_autos = AutomobileVO.objects.filter(sales_record__isnull=True)
        return JsonResponse(
            {"available_autos": available_autos},
            encoder=AutomobileVOEncoder,
        )


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        try:
            salespeople = Salesperson.objects.all()
            return JsonResponse(
                {"salespeople": salespeople},
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "There are no salespeople"}, status=404)
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Could not create salesperson"}, status=400)


@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status=404,
            )
    elif request.method == "DELETE":
        try:
            count, _ = Salesperson.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "No salesperson to delete"}, status=400)
    else:
        try:
            content = json.loads(request.body)
            Salesperson.objects.filter(id=id).update(**content)
            sales_person = Salesperson.objects.get(id=id)
            return JsonResponse(sales_person, encoder=SalesPersonEncoder, safe=False)
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        try:
            customers = Customer.objects.all()
            return JsonResponse(
                {"customers": customers},
                encoder=CustomerEncoder,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "There are no customers"}, status=404)
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Could not create customer"},
                status=400,
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404,
            )
    elif request.method == "DELETE":
        try:
            count, _ = Customer.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "No customer to delete"},
                status=404,
            )
    else:
        try:
            content = json.loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_sales(request, salesperson_employee_id=None):
    if request.method == "GET":
        if salesperson_employee_id is not None:
            sales = Sale.objects.filter(salesperson_employee_id=salesperson_employee_id)
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesRecordEncoder,
            safe=False,
        )

    content = json.loads(request.body)
    try:
        salesperson = Salesperson.objects.get(id=content["salesperson"])
        content["salesperson"] = salesperson
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": "Sales person does not exist"},
            status=404,
        )
    try:
        customer = Customer.objects.get(id=content["customer"])
        content["customer"] = customer
    except Customer.DoesNotExist:
        return JsonResponse({"message": "Customer does not exist"}, status=404)
    try:
        automobile = AutomobileVO.objects.get(vin=content["automobile"])
        content["automobile"] = automobile
    except AutomobileVO.DoesNotExist:
        return JsonResponse({"message": "Automobile does not exist"}, status=404)
    record_of_sale = Sale.objects.filter(automobile_vin=content["automobile"])
    if record_of_sale:
        return JsonResponse(
            {"message": "This automobile has already been sold"},
            status=400,
        )

    try:
        sales = Sale.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SalesRecordEncoder,
            safe=False,
        )
    except Sale.DoesNotExist:
        return JsonResponse(
            {"message": "Could not create sales record"},
            status=400,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(sale, encoder=SalesRecordEncoder, safe=False)
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sales record does not exist"},
                status=404,
            )
    elif request.method == "DELETE":
        try:
            count, _ = Sale.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "No sales record to delete"},
                status=404,
            )
    else:
        content = json.loads(request.body)
        try:
            if "salesperson" in content:
                salesperson = Salesperson.objects.get(id=content["salesperson"])
                content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sales person ID"},
                status=400,
            )
        try:
            if "customer" in content:
                customer = Customer.objects.get(id=content["customer"])
                content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer ID"},
                status=400,
            )
        try:
            if "automobile" in content:
                automobile = AutomobileVO.objects.get(vin=content["automobile"])
                content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile VIN"},
                status=400,
            )
        try:
            Sale.objects.filter(id=id).update(**content)
            sales_record = Sale.objects.get(id=id)
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sales record does not exist"},
                status=404,
            )
