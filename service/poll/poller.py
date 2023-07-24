import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutoMobileVO
def get_automobile():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutoMobileVO.objects.update_or_create(
            vin=automobile["vin"],
            color = automobile["color"],
            year = automobile["year"],
            model = automobile["model"]["name"],
        )

def poll():
    while True:
        try:
            get_automobile()
            print('Service poller polling for data')
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
