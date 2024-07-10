from shapely.geometry import Point

def weighted_centroid(features):
    total_weight = 0
    x_sum = 0
    y_sum = 0
    
    for feature in features:
        coords = feature['coordinates']
        weight = feature['distance']
        x_sum += coords[0] * weight
        y_sum += coords[1] * weight
        total_weight += weight
    
    x_sum /= total_weight
    y_sum /= total_weight
    
    return Point([x_sum, y_sum])

data = [
  { # c8f09eb24fec
    'coordinates': [78.4736561105174, 17.366883266298224],
    'distance': 23.41,
  },
  { # c8f09eb24b30
    'coordinates': [78.47370086069466, 17.36688209078946],
    'distance': 40.36,
  }
]

# c8f09eb24fec = -79.48 / 33.41 / [78.4736561105174, 17.366883266298224]
# c8f09eb24b30 = -81.12 / 40.36 / [78.47370086069466, 17.36688209078946]
# c8f09eb24834 = -89.60 OUT OF RANGE(-85)
# c8f09eaadde0 = -87.95 OUT OF RANGE(-85)

print(weighted_centroid(data)) # 78.47368171516274 17.366822293587322

# desired output: 78.47366171516274 17.366862293587322
