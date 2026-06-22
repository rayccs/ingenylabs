import os

root_dir = 'c:/Users/josed/Proyectos/ingenylabs'
articulo_src = os.path.join(root_dir, 'articulo.html')
articulo_dest = os.path.join(root_dir, 'blog', 'articulo.html')
blog_index = os.path.join(root_dir, 'blog', 'index.html')

if os.path.exists(articulo_src):
    os.rename(articulo_src, articulo_dest)
    print('Moved articulo.html to blog/')

for file_path in [articulo_dest, blog_index]:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix paths
    content = content.replace('href="index.html', 'href="../index.html')
    content = content.replace('href="blog.html', 'href="index.html')
    content = content.replace('src="./assets/', 'src="../assets/')
    content = content.replace('href="./assets/', 'href="../assets/')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Fixed paths in {file_path}')
