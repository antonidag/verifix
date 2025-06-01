from google import genai
from google.genai import types
import base64

async def generate_response(query: str, image_data: str = None):
    client = genai.Client(
        vertexai=True,
        project="even-hull-461009-j8",
        location="global",
    )

    model = "gemini-2.5-flash-preview-05-20"

    parts = [types.Part(text=query)]
    if image_data:
        # Assuming image_data is a base64 encoded string
        parts.append(types.Part(inline_data=types.Blob(
            mime_type="image/jpeg",
            data=base64.b64decode(image_data)
        )))

    contents = [
        types.Content(
            role="user",
            parts=parts
        )
    ]

    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        top_p=1,
        seed=0,
        max_output_tokens=65535,
        safety_settings=[types.SafetySetting(
            category="HARM_CATEGORY_HATE_SPEECH",
            threshold="OFF"
        ), types.SafetySetting(
            category="HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold="OFF"
        ), types.SafetySetting(
            category="HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold="OFF"
        ), types.SafetySetting(
            category="HARM_CATEGORY_HARASSMENT",
            threshold="OFF"
        )],
    )

    response = await client.aio.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config,
    )
    return response.text
