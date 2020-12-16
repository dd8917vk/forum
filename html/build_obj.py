import os
import re
from bs4 import BeautifulSoup
import itertools

current_path = os.getcwd()
man_page_array = []
regex = r'index[\d].html'
all_matches = []
#for comparing commands against commands in man_page_array obj
commands = []

def get_data(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            html_file_path = root+os.sep+file
            if html_file_path.endswith(".html"):
                #parser(html_file_path)
                print(html_file_path)


# def get_links(directory):
#     for file in os.listdir(current_path):
#         if re.search(regex, file):
#             scrape_links(file)

# def scrape_links(file):
#     with open(file, 'r') as f:
#         contents = f.read()
#         soup = BeautifulSoup(contents, 'lxml')#'html.parser')
#         all_matches.append(soup.find_all('a', class_='link'))
#         #matches = [a.get_text() for a in match]
# def parser(file):
#     #not a dash, some other character..
#     not_dash = '—'
#     with open(file, 'r') as f:
#         contents = f.read()
#         soup = BeautifulSoup(contents, 'lxml')#'html.parser')
#         match = soup.find('div', class_='refnamediv')
#         if match != None:
#             matched = match.p.text
#             matched = matched.split(not_dash)
#             man_line = matched[0].split(',')
#             if len(man_line[0]) > 0 and len(matched[1]) > 0:
#                 man_page_objects = {"command": man_line[0].strip(), "description": matched[1].strip(), "link": ''}
#                 man_page_array.append(man_page_objects)

def get_link(file):
    pass

get_data(current_path)
#print(man_page_array)
