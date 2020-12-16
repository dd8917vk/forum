import os
import re
from bs4 import BeautifulSoup
import itertools
import numpy
import json

current_path = os.getcwd()
man_page_array = []
regex = r'index[\d].html'
all_matches = []


def get_data(directory):
    index_list = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            #print(file)
            html_file_path = root+os.sep+file
            if html_file_path.endswith(".html"):
                #parser(html_file_path)
                splitted = html_file_path.split(os.sep)
                try:
                    file_name = splitted[7].split('.')
                    command = file_name[0]
                    parser(html_file_path, command)
                except IndexError:
                    #this is index.html
                    index_file = html_file_path
                    get_links(index_file)
                    

def get_links(index_file):
    try:
        with open(index_file, 'r') as f:
            contents = f.read()
            soup = BeautifulSoup(contents, 'lxml')#'html.parser')
            all_matches.append(soup.find_all('a', class_='link'))
    except IsADirectoryError:
        pass


def parser(file, command):
    #not a dash, some other character..
    if len(command) > 20:
        s1 = command[::2]
        s2 = command[1::2]
        command = s1+'\n'+s2
    not_dash = '—'
    with open(file, 'r') as f:
        contents = f.read()
        soup = BeautifulSoup(contents, 'lxml')#'html.parser')
        body = soup.body
        match = soup.find('div', class_='refnamediv')
        soup_remove_attr = remove_attrs(body)
        if match != None:
            matched = match.p.text
            matched = matched.split(not_dash)
            if len(matched[1]) > 0:
                man_page_objects = {"command": command.strip(), "description": matched[1].strip(), "link": '', "html": str(soup_remove_attr)}
                man_page_array.append(man_page_objects)

def remove_attrs(soup):
    tag_list = soup.findAll(lambda tag: len(tag.attrs) > 0)
    for t in tag_list:
        t.attrs = {}
    return soup

get_data(current_path)
get_links(current_path)

#flatten all_matches array
def flatten_links():
    links_arr = []
    for i in range(len(all_matches)):
        for j in range(len(all_matches[i])):
            links_arr.append(all_matches[i][j])
    return links_arr


#print('\n'.join(str(item) for item in links_arr))
def compare(links_arr):
    for link in links_arr:
        cmd = link.attrs.get('href').split('.')[0].split('/')[1]
        for obj in man_page_array:
            if obj["command"] == cmd:
                obj["link"] = str(link)
            

compare(flatten_links())

def dump_json(man_page_array):
    with open('cleaned_data.json', 'w') as json_file:
        json.dump(man_page_array, json_file, indent=4)

dump_json(man_page_array)
#import pdb;pdb.set_trace()
