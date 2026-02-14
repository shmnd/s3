import requests
import json

try:
    # 1. Get the image list
    response = requests.get('http://localhost:8000/api/images/')
    response.raise_for_status()
    data = response.json()
    
    if not data:
        print("No images found in API response.")
        exit(0)
        
    # 2. Extract first image URL
    image_url = data[0]['image']
    print(f"Testing URL: {image_url}")
    
    # 3. Fetch the image
    img_resp = requests.get(image_url)
    print(f"Status Code: {img_resp.status_code}")
    print(f"Headers: {img_resp.headers}")
    
    if img_resp.status_code == 200:
        print("SUCCESS: Image is accessible.")
    else:
        print("FAILURE: Image content not accessible.")
        print(f"Body: {img_resp.text[:500]}")

except Exception as e:
    print(f"Error: {e}")
