import urllib2
import os

def download_file():
    response = urllib2.urlopen("http://courseware.cemc.uwaterloo.ca/11/assignments/47/11")
    html = response.read()
    
    base_file_path = os.path.dirname(os.path.realpath(__file__))
    
    file_path = "{0}/html.txt".format(base_file_path)
    f = open(file_path, "w")
    f.write(html)
    
    f.close()

def read_file():
    base_file_path = os.path.dirname(os.path.realpath(__file__))
    
    file_path = "{0}/html.txt".format(base_file_path)
    f = open(file_path, "r")
    return f






