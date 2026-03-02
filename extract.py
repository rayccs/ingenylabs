import fitz, sys; doc = fitz.open(sys.argv[1]); text = "".join([page.get_text() for page in doc]); open("brief.txt", "w", encoding="utf-8").write(text)
