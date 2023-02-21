from multiprocessing.sharedctypes import Value
from exif import Image
from pathlib import Path
import os

class image:
    def __init__(self, name, lat, long):
        self.name = name
        self.lat = lat
        self.long = long
    def __str__(self):
        return f"{self.name},{self.lat},{self.long}"

def image_coordinates(image_path):
    with open(image_path, 'rb') as src:
        img = Image(src)
    if img.has_exif:
        try:
            lat = img.gps_latitude
            decimal_lat = lat[0] + lat[1] / 60 + lat[2] / 3600
            if img.gps_latitude_ref == "S" or img.gps_latitude_ref == "W":
                decimal_lat = -decimal_lat

            long = img.gps_longitude
            decimal_long = long[0] + long[1] / 60 + long[2] / 3600
            if img.gps_longitude_ref == "S" or img.gps_longitude_ref == "W":
                decimal_long = -decimal_long

            imageObj = image(Path(image_path).stem, decimal_lat, decimal_long)
            return imageObj
        except AttributeError:
            raise ValueError()
    else:
        raise ValueError()


with open('coordinates.txt', 'w') as file:
    file.write('name,lat,long\n')
    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    for f in files:
        try:
            obj = image_coordinates(f)
            file.write(obj.__str__())
            file.write('\n')
        except ValueError:
            print("err")
