import cv2
import os

videos = [
    {
        'file': r'f:/New folder/Nadeem/frontend/public/videos/hero_section_video.mp4',
        'cover': r'f:/New folder/Nadeem/frontend/public/images/reels/hero_section_cover.jpg'
    },
    {
        'file': r'f:/New folder/Nadeem/frontend/public/videos/belgavi_121km.mp4',
        'cover': r'f:/New folder/Nadeem/frontend/public/images/reels/belgavi_121km_cover.jpg'
    },
    {
        'file': r'f:/New folder/Nadeem/frontend/public/videos/just_100km.mp4',
        'cover': r'f:/New folder/Nadeem/frontend/public/images/reels/just_100km_cover.jpg'
    },
    {
        'file': r'f:/New folder/Nadeem/frontend/public/videos/hubli_dharwad_top3_hidden_gems.mp4',
        'cover': r'f:/New folder/Nadeem/frontend/public/images/reels/hubli_dharwad_top3_cover.jpg'
    }
]

os.makedirs(r'f:/New folder/Nadeem/frontend/public/images/reels', exist_ok=True)
os.makedirs(r'f:/New folder/Nadeem/backend/uploads', exist_ok=True)

for v in videos:
    cap = cv2.VideoCapture(v['file'])
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Processing {v['file']}: {total_frames} frames @ {fps} fps")
    
    # Grab frame at 1.5 seconds or middle
    target_frame = min(int(fps * 1.5), max(0, total_frames - 5))
    cap.set(cv2.CAP_PROP_POS_FRAMES, target_frame)
    ret, frame = cap.read()
    if not ret:
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        ret, frame = cap.read()
    
    if ret:
        cv2.imwrite(v['cover'], frame, [cv2.IMWRITE_JPEG_QUALITY, 95])
        backend_cover = os.path.join(r'f:/New folder/Nadeem/backend/uploads', os.path.basename(v['cover']))
        cv2.imwrite(backend_cover, frame, [cv2.IMWRITE_JPEG_QUALITY, 95])
        print(f"Successfully generated cover: {v['cover']}")
    else:
        print(f"Failed to read frame from {v['file']}")
    cap.release()
