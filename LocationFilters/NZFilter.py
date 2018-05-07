# Applies a filter that only leaves New Zealand coastline points
output = open("NZCoastlinePoints.csv", "w")
rawFile = open("WorldCoastlinePoints.csv", "r")
lines = rawFile.read().splitlines()
for line in lines:
    tokens = line.replace(",", " ").split()
    if (-47.5 < float(tokens[0]) < -34):  # longitude filtering
        if (166 < float(tokens[1]) < 179):  # latitude filtering
            output.write(tokens[0] + "," + tokens[1] + "\n")
