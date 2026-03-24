#!/usr/bin/env python3
"""
Script to extract event data from docx files and create JSON event files.
Also copies images to the public folder.
"""
import zipfile
import re
import os
import json
import shutil
from datetime import datetime

# Base paths
BASE_PATH = "/home/sammyyakk/projects/optica-website"
RAW_DATA_PATH = os.path.join(BASE_PATH, "raw_event _data")
EVENTS_JSON_PATH = os.path.join(BASE_PATH, "data", "events")
PUBLIC_EVENTS_PATH = os.path.join(BASE_PATH, "public", "events")

# Create directories if they don't exist
os.makedirs(os.path.join(PUBLIC_EVENTS_PATH, "covers"), exist_ok=True)
os.makedirs(os.path.join(PUBLIC_EVENTS_PATH, "galleries"), exist_ok=True)

def extract_text_from_docx(path):
    """Extract text from a docx file."""
    try:
        with zipfile.ZipFile(path) as z:
            xml = z.read('word/document.xml').decode('utf-8')
            text = re.sub(r'<[^>]+>', '', xml)
            text = re.sub(r'\s+', ' ', text)
            return text.strip()
    except Exception as e:
        return f"Error: {e}"

def slugify(text, max_length=50):
    """Convert text to URL-friendly slug with max length."""
    slug = text.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_-]+', '-', slug)
    slug = slug.strip('-')
    # Truncate to max length and ensure we don't cut in the middle of a word
    if len(slug) > max_length:
        slug = slug[:max_length].rsplit('-', 1)[0]
    return slug

def determine_category(text, title):
    """Determine event category based on content."""
    text_lower = (text + " " + title).lower()

    if any(word in text_lower for word in ['ideathon', 'hackathon', 'spark', 'quantum spark']):
        return 'ideathon'
    elif any(word in text_lower for word in ['quiz', 'quotient', 'trivia', 'questionnaire']):
        return 'quiz'
    elif any(word in text_lower for word in ['seminar', 'webinar', 'lecture', 'talk', 'speaker', 'workshop']):
        return 'seminar'
    elif any(word in text_lower for word in ['debate', 'showdown', 'argument', 'moot']):
        return 'debate'
    elif any(word in text_lower for word in ['visit', 'trip', 'tour', 'aries', 'iiit', 'observatory', 'industrial']):
        return 'visit'
    elif any(word in text_lower for word in ['competition', 'contest', 'robo', 'league', 'photography', 'case']):
        return 'competition'
    else:
        return 'seminar'  # Default

def extract_highlights(text):
    """Extract highlights/activities from text."""
    highlights = []

    # Look for bullet points or numbered items
    patterns = [
        r'•\s*([^•]+)',
        r'\d+\.\s*([^\d]+?)(?=\d+\.|$)',
        r'Highlights?:?\s*([^.]+\.)',
        r'Activities?:?\s*([^.]+\.)',
    ]

    for pattern in patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            clean = match.strip()
            if len(clean) > 10 and len(clean) < 200:
                highlights.append(clean)

    # Remove duplicates and limit
    unique_highlights = list(dict.fromkeys(highlights))
    return unique_highlights[:6]

def parse_date_from_folder(folder_name, text):
    """Try to extract date from folder name or text."""
    # Extract year from folder name like "2024-25 Events"
    year_match = re.search(r'(\d{4})-\d{2}', folder_name)
    if year_match:
        year = int(year_match.group(1))
    else:
        year = 2024

    # Look for specific dates in text
    date_patterns = [
        r'(\d{1,2})\s*(?:st|nd|rd|th)?\s*(January|February|March|April|May|June|July|August|September|October|November|December)\s*,?\s*(\d{4})',
        r'(January|February|March|April|May|June|July|August|September|October|November|December)\s*(\d{1,2})\s*(?:st|nd|rd|th)?\s*,?\s*(\d{4})',
    ]

    months = {
        'january': 1, 'february': 2, 'march': 3, 'april': 4,
        'may': 5, 'june': 6, 'july': 7, 'august': 8,
        'september': 9, 'october': 10, 'november': 11, 'december': 12
    }

    for pattern in date_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            groups = match.groups()
            try:
                if groups[0].isdigit():
                    day = int(groups[0])
                    month = months[groups[1].lower()]
                    year = int(groups[2])
                else:
                    month = months[groups[0].lower()]
                    day = int(groups[1])
                    year = int(groups[2])
                return f"{year}-{month:02d}-{day:02d}"
            except:
                pass

    # Default to a date based on year
    return f"{year}-09-15"  # Default to September

def process_event(event_folder, year_folder, year_path, cover_number):
    """Process a single event and return event data."""
    event_path = os.path.join(year_path, event_folder)

    if not os.path.isdir(event_path):
        return None

    # Find docx file
    docx_files = [f for f in os.listdir(event_path) if f.endswith('.docx')]
    if not docx_files:
        # Check for subdirectories
        for item in os.listdir(event_path):
            sub_path = os.path.join(event_path, item)
            if os.path.isdir(sub_path):
                sub_docx = [f for f in os.listdir(sub_path) if f.endswith('.docx')]
                if sub_docx:
                    docx_files = [os.path.join(item, sub_docx[0])]
                    break

    if not docx_files:
        return None

    # Extract text from docx
    docx_path = os.path.join(event_path, docx_files[0])
    text = extract_text_from_docx(docx_path)

    if text.startswith("Error"):
        return None

    # Parse event data - Use folder name as primary source, clean it up
    title = event_folder.strip()

    # Try to get a better title from the text (but limit its length)
    title_match = re.search(r'Event:\s*([^.]{5,80}?)(?:Objective|Brief|Description|\.)', text)
    if title_match:
        extracted_title = title_match.group(1).strip()
        if len(extracted_title) < 80:
            title = extracted_title

    # Ensure title isn't too long
    if len(title) > 80:
        title = title[:80].rsplit(' ', 1)[0]

    slug = slugify(title)
    category = determine_category(text, title)

    # Extract subtitle/objective
    subtitle = ""
    obj_match = re.search(r'Objective:\s*([^.]+\.)', text)
    if obj_match:
        subtitle = obj_match.group(1).strip()
    else:
        # Use first sentence after title
        desc_match = re.search(r'[.:]\s*([A-Z][^.]+\.)', text)
        if desc_match:
            subtitle = desc_match.group(1).strip()

    if not subtitle or len(subtitle) < 10:
        subtitle = f"An exciting {category} event organized by BVP Optica."

    # Extract description
    desc_match = re.search(r'(?:Brief\s*)?Description:\s*(.+?)(?:Activities?:|Participation:|Outcomes?:|Highlights?:|$)', text, re.IGNORECASE | re.DOTALL)
    if desc_match:
        description = desc_match.group(1).strip()
    else:
        description = text[:500]

    description = re.sub(r'\s+', ' ', description).strip()
    if len(description) > 1000:
        description = description[:997] + "..."

    # Extract highlights
    highlights = extract_highlights(text)
    if not highlights:
        highlights = [
            "Interactive sessions and hands-on learning",
            "Expert guidance from faculty and industry professionals",
            "Networking opportunities with peers"
        ]

    # Determine date
    date = parse_date_from_folder(year_folder, text)

    # Check for photos
    photos_path = os.path.join(event_path, "Photos")
    gallery = []
    cover_image = f"/events/covers/placeholder-{cover_number % 5 + 1}.jpg"

    if os.path.isdir(photos_path):
        photo_files = [f for f in os.listdir(photos_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]
        if photo_files:
            # Copy first photo as cover
            src_cover = os.path.join(photos_path, photo_files[0])
            cover_filename = f"{slug}-cover{os.path.splitext(photo_files[0])[1]}"
            dst_cover = os.path.join(PUBLIC_EVENTS_PATH, "covers", cover_filename)
            try:
                shutil.copy2(src_cover, dst_cover)
                cover_image = f"/events/covers/{cover_filename}"
            except Exception as e:
                print(f"Error copying cover: {e}")

            # Copy other photos as gallery
            for i, photo in enumerate(photo_files[:5]):
                src = os.path.join(photos_path, photo)
                gallery_filename = f"{slug}-{i+1}{os.path.splitext(photo)[1]}"
                dst = os.path.join(PUBLIC_EVENTS_PATH, "galleries", gallery_filename)
                try:
                    shutil.copy2(src, dst)
                    gallery.append(f"/events/galleries/{gallery_filename}")
                except Exception as e:
                    print(f"Error copying gallery image: {e}")

    # Determine status based on date
    event_date = datetime.strptime(date, "%Y-%m-%d")
    today = datetime.now()

    if event_date > today:
        status = "upcoming"
    else:
        status = "completed"

    # Build event object
    event = {
        "id": slug,
        "slug": slug,
        "title": title,
        "subtitle": subtitle[:200] if len(subtitle) > 200 else subtitle,
        "description": description,
        "category": category,
        "date": date,
        "time": f"{date} | 10:00 AM onwards",
        "location": "Bharati Vidyapeeth's College of Engineering, New Delhi",
        "coverImage": cover_image,
        "gallery": gallery if gallery else None,
        "highlights": highlights,
        "status": status,
        "featured": status == "upcoming" or cover_number < 5,
        "registrationLink": None,
        "registrationOpen": False,
        "maxParticipants": None,
        "currentParticipants": None,
        "organizers": [
            {
                "name": "BVP Optica Team",
                "role": "Event Organizers"
            }
        ],
        "tags": [category, "optica", "bvp", year_folder.split()[0]]
    }

    return event

def main():
    """Main function to process all events."""
    # Get list of year folders
    year_folders = sorted([f for f in os.listdir(RAW_DATA_PATH) if os.path.isdir(os.path.join(RAW_DATA_PATH, f))])

    all_events = []
    cover_number = 0

    for year_folder in year_folders:
        year_path = os.path.join(RAW_DATA_PATH, year_folder)
        event_folders = [f for f in os.listdir(year_path) if os.path.isdir(os.path.join(year_path, f))]

        print(f"\nProcessing {year_folder}...")

        for event_folder in event_folders:
            if event_folder.upper() == "RAW":
                continue

            print(f"  - {event_folder}")
            event = process_event(event_folder, year_folder, year_path, cover_number)

            if event:
                all_events.append(event)
                cover_number += 1

                # Write individual JSON file
                json_path = os.path.join(EVENTS_JSON_PATH, f"{event['slug']}.json")
                with open(json_path, 'w') as f:
                    json.dump(event, f, indent=2)
                print(f"    Created: {event['slug']}.json")

    print(f"\n\nTotal events processed: {len(all_events)}")
    return all_events

if __name__ == "__main__":
    main()
