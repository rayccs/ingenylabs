import os
import shutil

html_file = 'c:/Users/josed/Proyectos/ingenylabs/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

replacement_char = '\ufffd'
print(f"Total replacement chars found: {content.count(replacement_char)}")

# Let's see where they are
if content.count(replacement_char) > 0:
    for i, line in enumerate(content.splitlines()):
        if replacement_char in line:
            print(f"Line {i+1}: {line}")
