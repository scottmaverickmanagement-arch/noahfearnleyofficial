from PIL import Image
import os
import concurrent.futures

input_dir = 'src/assets/frames'
output_dir = 'public/frames_optimized'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

def convert_frame(i):
    in_path = os.path.join(input_dir, f'frame-{i}.png')
    out_path = os.path.join(output_dir, f'frame-{i}.webp')
    
    if os.path.exists(in_path):
        try:
            img = Image.open(in_path)
            # Retain original resolution for higher quality and use maximum webp quality
            img.save(out_path, 'webp', quality=100)
            return True
        except Exception as e:
            print(f"Error converting {in_path}: {e}")
            return False
    return False

print(f"Starting conversion of frames to WebP in {output_dir}...")
# Use multithreading to speed this up drastically
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
    futures = [executor.submit(convert_frame, i) for i in range(1, 1411)]
    converted = 0
    for future in concurrent.futures.as_completed(futures):
        if future.result():
            converted += 1
            if converted % 100 == 0:
                print(f"Processed {converted}/1410 frames...")

print("Conversion complete!")
