from PIL import Image, ImageDraw
import os

def make_circular_crop(img_path):
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    
    # 1. First find the subject bbox
    gray = img.convert('L')
    bbox = gray.getbbox()
    
    if bbox:
        left, top, right, bottom = bbox
        center_x = (left + right) / 2
        center_y = (top + bottom) / 2
        
        # Rick and Morty focus size
        radius = min(right - left, bottom - top) * 0.45 
        
        # 2. Create the circle mask
        mask = Image.new('L', (width, height), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((center_x - radius, center_y - radius, center_x + radius, center_y + radius), fill=255)
        
        # 3. Apply mask to image
        output = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        output.paste(img, (0, 0), mask=mask)
        
        # 4. Crop to the circle bounds specifically
        final_bbox = (center_x - radius, center_y - radius, center_x + radius, center_y + radius)
        output = output.crop(final_bbox)
        
        # Save as PNG (supports transparency)
        output.save(img_path, "PNG")
        print(f"Successfully created circular favicon at {img_path}")
    else:
        print("Could not find subject bounding box.")

if __name__ == "__main__":
    logo_path = r"c:\Users\Anthony\Documents\WORK\Stark\Stark\Websites\Portfolio\A portfolio\frontend\public\logo.png"
    if os.path.exists(logo_path):
        make_circular_crop(logo_path)
    else:
        print(f"File not found: {logo_path}")
