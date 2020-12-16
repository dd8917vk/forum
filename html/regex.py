import re
s = 'index.html'
regex = r'index[\d].html'

match = re.search(r'index[\d].html', s)
if match:
    print(match.group())
else:
    print('no match')

link = '<a class="link" href="htmlman8/swapon.8.html" target="_top">swapoff(8)</a>'
string = 'swapoffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'

if len(string) > 20:
    # s1 = string[:len(string)/2]
    # s2 = string[len(string)/2:]

print(string)

# search = re.findall(string, link)
# if (search):
#     print('match')
# else:
#     print('no match')