# Parses coastline datapoints into lat long pairs separated by new lines
# the last datapoint from each island is ignored as it is a duplicate of the first
# points are <4km away from each other most of the time
onlyNumbers = []
output = open("coastlinePoints.csv", "w")
rawFile = open("world-coastline-110-million.csv", "r")
lines = rawFile.read().splitlines()
for line in lines:
    tokens = line.replace(",", " ").replace("(", "").split()
    for i in range(1, len(tokens) - 1, 2):
        try:
            if not float(tokens[i]).is_integer() and not float(tokens[i+1]).is_integer():
                output.write(tokens[i+1] + "," + tokens[i] + "\n")
        except ValueError:
            pass
