from django.contrib import admin
from .models import SalesPerson, Customer, SalesRecord

@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(SalesRecord)
class SalesRecordAdmin(admin.ModelAdmin):
    pass
