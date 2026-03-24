#!/usr/bin/env python3
import zipfile
import re
import sys
import os

def extract_text_from_docx(path):
    try:
        with zipfile.ZipFile(path) as z:
            xml = z.read('word/document.xml').decode('utf-8')
            text = re.sub(r'<[^>]+>', '', xml)
            text = re.sub(r'\s+', ' ', text)
            return text.strip()
    except Exception as e:
        return f"Error: {e}"

# Get all docx files
base_path = "/home/sammyyakk/projects/optica-website/raw_event _data"
for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith('.docx'):
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, base_path)
            print(f"\n{'='*80}")
            print(f"FILE: {rel_path}")
            print(f"{'='*80}")
            text = extract_text_from_docx(full_path)
            print(text[:2500] if len(text) > 2500 else text)
