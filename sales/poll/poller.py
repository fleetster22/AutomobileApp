import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO

def get_automobiles():
    response = requests.get('http://inventory-api:8000/automobiles/')
    content = json.loads(response.content)
    for automobile in content["automobiles"]:
        AutomobileVO.objects.update_or_create(
            vin = automobile["vin"],
            defaults={
            "sold": automobile.get("available_automobiles"),
        }
        )

def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
           get_automobiles()

        except Exception as e:
              print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(1)


if __name__ == "__main__":
    poll()
