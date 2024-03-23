from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tokenizer = GPT2Tokenizer.from_pretrained("distilgpt2")
model = GPT2LMHeadModel.from_pretrained("distilgpt2")

@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'No text field in the request'}), 400

    input_text = data['text'].strip()
    input_ids = tokenizer.encode(input_text, return_tensors='pt')

    output = model.generate(
        input_ids,
        max_length=len(input_ids[0]) + 50,  # Ajusta esto según la necesidad
        num_return_sequences=1,
        num_beams=5,
        no_repeat_ngram_size=2,
        early_stopping=True,
        do_sample=False  # Asegúrate de configurar correctamente según la necesidad
    )

    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    completed_text = generated_text[len(input_text):].strip()

    return jsonify({'completed_text': completed_text})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
