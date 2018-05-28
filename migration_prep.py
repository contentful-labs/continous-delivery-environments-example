import contentful_management
from contentful_management.resource import Link
import json
import sys
import time
import os
from dotenv import load_dotenv

load_dotenv()

SPACE_ID = os.getenv("SPACE_ID")
DELIVERY_API_KEY = os.getenv("DELIVERY_API_KEY")
MANGEMENT_API_KEY = os.getenv("MANGEMENT_API_KEY")
TESTING_ENV = sys.argv[1]

client = contentful_management.Client(MANGEMENT_API_KEY)

try:
    environment = client.environments(SPACE_ID).find(TESTING_ENV)
    print("Deleting previous environment {}".format(TESTING_ENV))
    environment.delete()
except:
    print("{} environment doesn't exist".format(TESTING_ENV))

print("Creating new Enivronment: {}".format(TESTING_ENV))
environment = client.environments(SPACE_ID).create(TESTING_ENV, {"name": TESTING_ENV})
time.sleep(1)

environment.name = TESTING_ENV
print("Polling to detect creation of {}".format(TESTING_ENV))

while True:
    try:
        environment = client.environments(SPACE_ID).find(TESTING_ENV)
        break
    except:
        print("{} environment doesn't exist. Sleeping for 1 second".format(TESTING_ENV))
        time.sleep(1)

print("Complete creation of new environment.")
print("Updating API Key to allow access.")


new_environment_link = Link({
    "sys": {
        "type": "Link",
        "linkType": "Environment",
        "id": TESTING_ENV
    }
})

api_keys = client.api_keys(SPACE_ID).all()
for api_key in api_keys:
    api_key.environments.append(new_environment_link)
    api_key.save()
