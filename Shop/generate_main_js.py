import os

STATIC_ROOT = "staticfiles/js"  # Đường dẫn tới staticfiles/js
MAIN_JS_FILE = os.path.join(STATIC_ROOT, "main.js")

# Tạo thư mục nếu chưa tồn tại
os.makedirs(STATIC_ROOT, exist_ok=True)

# Lấy danh sách tất cả các file JS trong staticfiles/js/
js_files = [f for f in os.listdir(STATIC_ROOT) if f.endswith(".js") and f != "main.js"]

# Tạo file main.js và import tất cả các file khác
with open(MAIN_JS_FILE, "w", encoding="utf-8") as main_file:
    for js_file in js_files:
        main_file.write(f'import "/static/js/{js_file}";\n')

print(f"✅ Generated main.js with {len(js_files)} imports!")
