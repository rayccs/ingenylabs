import os

file_path = 'c:/Users/josed/Proyectos/ingenylabs/blog/blog-data.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('"./assets/', '"../assets/')
content = content.replace("'./assets/", "'../assets/")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed blog-data.js')
