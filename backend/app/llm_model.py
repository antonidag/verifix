from ollama import Client
import base64

client = Client(
    host='http://localhost:11434'
)


def generate_response(query: str):

    # Read the image file as binary data
    with open("test.png", 'rb') as img_file:
        img_data = img_file.read()
    
    # Convert image to base64 for Ollama
    img_base64 = base64.b64encode(img_data).decode('utf-8')
    
    response = client.generate(
        model='gemma3:12b',
        prompt="What's this? Provide a description without leading or trailing text.",
        images=[img_base64],  # Pass base64 encoded image data at top level
        options={"temperature": 0.1}  # Lower temperature for more consistent output
    )
    return response.response


#f"""You are a helpful assistant that rewrites technician input into clear, professional, and concise problem descriptions suitable for logging into a maintenance or troubleshooting system.

#Correct any spelling or grammar issues, remove informal language or excessive punctuation, and rephrase the input into a neutral tone.

#Only return the cleaned-up description. Do not explain your reasoning.

#Input:
#{query}

#Output:
#"""}