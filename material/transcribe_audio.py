import whisper
import warnings
import sys
import os

warnings.filterwarnings("ignore")

# Adiciona o ffmpeg ao PATH
ffmpeg_path = r"C:\Users\RENAN ZANINI PORTO\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin"
os.environ["PATH"] += os.pathsep + ffmpeg_path

print("Carregando o modelo Whisper...")
try:
    model = whisper.load_model("base")
except Exception as e:
    print(f"Erro ao carregar o modelo: {e}")
    sys.exit(1)

print("Transcrevendo audio...")
try:
    result = model.transcribe("audio 2.ogg", language="pt")
    
    with open("transcricao_audio2.txt", "w", encoding="utf-8") as f:
        f.write(result["text"])
    
    print("Transcricao concluida:")
    print(result["text"])
    print("\nTranscricao salva em transcricao_audio2.txt")
except Exception as e:
    print(f"Erro ao transcrever: {e}")
    sys.exit(1)
