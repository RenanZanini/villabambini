import whisper

print('Loading model...')
model = whisper.load_model('base')

print('Transcribing audio...')
result = model.transcribe('C:\\Users\\RENAN ZANINI PORTO\\Desktop\\NEXX_AI\\lavillabambini\\audio 2.ogg', language='pt')

with open('transcricao_audio2.txt', 'w', encoding='utf-8') as f:
    f.write(result['text'])

print('Done!')
