# ai_suggestion.py
import os
import requests

from dotenv import load_dotenv
load_dotenv()  # This will load variables from a .env file in the current directory

api_token = os.environ.get("HUGGINGFACE_API_KEY")

def suggest_fix(error_message: str, code: str) -> str:
    """
    Generate debugging suggestions using the Hugging Face Inference API.
    """
    api_token = os.environ.get("HUGGINGFACE_API_KEY")
    if not api_token:
        return "Hugging Face API token not set. Please set HUGGINGFACE_API_KEY."

    # Choose your model
    model = "bigcode/starcoder"
    headers = {"Authorization": f"Bearer {api_token}"}

    # Craft a prompt that explains the context
    prompt = (
        "You are an expert Python debugging assistant.\n"
        f"Error: {error_message}\n"
        f"Code:\n{code}\n\n"
        "Provide a detailed explanation of what might be wrong and suggest a fix:"
    )

    # Prepare the payload with parameters
    payload = {
        "inputs": prompt,
        "parameters": {"max_new_tokens": 150, "temperature": 0.3},
    }

    response = requests.post(
        f"https://api-inference.huggingface.co/models/{model}",
        headers=headers,
        json=payload,
    )

    if response.status_code == 200:
        # The response is typically a list of dictionaries
        result = response.json()
        # Extract the generated text from the first result
        generated_text = result[0].get("generated_text", "")
        return generated_text.strip()
    else:
        return f"Error querying the Hugging Face model: {response.text}"

# if __name__ == "__main__":
#     # Test with a sample error and code snippet.
#     error = "Syntax error: '(' was never closed at line 1 col 6"
#     test_code = "print('Hello World'"
#     suggestion = suggest_fix(error, test_code)
#     print("Suggestion:", suggestion)
