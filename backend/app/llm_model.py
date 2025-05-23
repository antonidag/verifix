from ollama import Client
import base64

client = Client(
    host='http://localhost:11434'
)


def generate_response(query: str):

    # Read the image file as binary data
    #with open("test.png", 'rb') as img_file:
        #img_data = img_file.read()
    
    # Convert image to base64 for Ollama
    #img_base64 = base64.b64encode(img_data).decode('utf-8')
    
    response = client.generate(
        model='gemma3:12b',
        prompt=query,
        #images=[img_base64],  # Pass base64 encoded image data at top level
        #options={"temperature": 0.1}  # Lower temperature for more consistent output
    )
    return response.response