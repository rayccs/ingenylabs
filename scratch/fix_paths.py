import re

html_file = 'c:/Users/josed/Proyectos/ingenylabs/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find occurrences
matches = set(re.findall(r'[\"\']\.\./([^\"\']+)[\"\']', content))
print("Found paths starting with ../ :")
for m in matches:
    print(m)

# Replace ../assets/ with assets/
# Replace ../styles.css with styles.css if any
new_content = content.replace('="../assets/', '="assets/')
new_content = new_content.replace("='../assets/", "='assets/")
new_content = new_content.replace('="../', '="')
new_content = new_content.replace("='../", "='")

# Write back if changes were made
if new_content != content:
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed paths and saved!")
else:
    print("No changes needed.")
