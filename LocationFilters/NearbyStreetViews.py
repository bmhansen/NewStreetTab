import requests
import json

# gathers nearby panoramas to each coastline point across new zealand
# stores each pano_id in a results file to be used later
key = "AIzaSyD-4CDW2StKngNORHrR4zj0qZxgPD2JO4s"
file = open("NZCoastlinePoints.csv", "r")
output = open("NZCoastlineResults.csv", "w")
data = file.read()
locations = data.split("\\n")
y = 0
for location in locations:
    payload = {"location": location, "key": key}
    b = requests.get(
        "https://maps.googleapis.com/maps/api/streetview/metadata", params=payload)
    if (b.json()["status"] != "ZERO_RESULTS"):
        output.write(b.json()["pano_id"] + "\\n")
    y = y + 1
    # progress indicator
    if ((y % 100) == 0):
        print(str(y) + " Locations have been searched")

output.close()
