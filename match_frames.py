import os
import imagehash
from PIL import Image

frames_dir = 'src/assets/frames'
target_dirs = [
    'src/assets/enviromental conservation',
    'src/assets/animal welfare',
    'src/assets/arts',
    'src/assets/children hospitals'
]

targets = {}
for d in target_dirs:
    if not os.path.exists(d): continue
    for f in os.listdir(d):
        p = os.path.join(d, f)
        if os.path.isfile(p):
            try:
                img = Image.open(p)
                targets[p] = {'hash': imagehash.phash(img), 'best_match': None, 'min_dist': float('inf')}
            except Exception as e:
                print(f"Error loading {p}: {e}")

print(f"Scanning frames... Targets count: {len(targets)}")
frame_files = [f for f in os.listdir(frames_dir) if f.endswith('.png')]
for i, f in enumerate(frame_files):
    if i % 200 == 0:
        print(f"Processed {i}/{len(frame_files)} frames...")
    try:
        import re
        m = re.search(r'frame-(\d+)', f)
        if not m: continue
        match = m.group(1)
        
        frame_path = os.path.join(frames_dir, f)
        img = Image.open(frame_path)
        f_hash = imagehash.phash(img)
        
        for t_path, t_info in targets.items():
            dist = f_hash - t_info['hash']
            if dist < t_info['min_dist']:
                t_info['min_dist'] = dist
                t_info['best_match'] = match
    except Exception as e:
        pass

print("\n--- RESULTS ---")
for t_path, t_info in targets.items():
    print(f"{t_path} -> Frame {t_info['best_match']} (Distance: {t_info['min_dist']})")
