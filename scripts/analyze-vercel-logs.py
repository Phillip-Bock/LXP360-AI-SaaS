import requests
import csv
from io import StringIO

# Fetch the CSV file
url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lxp360_saas-hozgv42td-lxp360_vercel_app_logs-GlMyApTB7tEejdH7765D09kIbnmBxd.csv"
response = requests.get(url)
csv_content = response.text

# Parse CSV
csv_reader = csv.DictReader(StringIO(csv_content))
rows = list(csv_reader)

print(f"Total entries: {len(rows)}")
print("\n" + "="*80)
print("DEPLOYMENT LOG ANALYSIS")
print("="*80)

# Analyze the data
if rows:
    print(f"\nFirst 10 entries:")
    for i, row in enumerate(rows[:10]):
        path = row.get('path_name', 'N/A')
        size = row.get('size', 'N/A')
        print(f"{i+1}. Path: {path}")
        print(f"   Size: {size} bytes")
        print()
    
    # Check for large files
    print("\n" + "="*80)
    print("LARGE FILES (>1MB)")
    print("="*80)
    large_files = []
    for row in rows:
        try:
            size = int(row.get('size', 0))
            if size > 1000000:  # 1MB
                large_files.append((row.get('path_name'), size))
        except:
            pass
    
    if large_files:
        large_files.sort(key=lambda x: x[1], reverse=True)
        for path, size in large_files[:20]:
            print(f"{path}: {size / 1000000:.2f} MB")
    else:
        print("No files larger than 1MB found")
    
    # Check for specific problematic paths
    print("\n" + "="*80)
    print("CHECKING FOR POTENTIAL ISSUES")
    print("="*80)
    
    problematic_patterns = [
        'node_modules',
        '.next',
        'error',
        'failed',
        'policies'
    ]
    
    for pattern in problematic_patterns:
        matching = [row for row in rows if pattern.lower() in row.get('path_name', '').lower()]
        if matching:
            print(f"\n'{pattern}' related entries: {len(matching)}")
            for row in matching[:5]:
                print(f"  - {row.get('path_name')}")
else:
    print("No data found in CSV")
