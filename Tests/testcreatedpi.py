import time
from selenium import webdriver
import requests
import json
from uuid import uuid4

def test_create_dpi_with_selenium():
    # Configure the WebDriver for Firefox
    driver = webdriver.Firefox()

    # Backend API base URL
    base_url = "http://127.0.0.1:8000"  # Adjust to your server's URL
    dpi_endpoint = f"{base_url}/dpi/"  # Adjust endpoint path if different
    auth_endpoint = f"{base_url}/auth/login"  # Adjust for your auth endpoint

    # Simulate user login to get a token
    auth_payload = {
        "username": "yacine",  # Replace with your test user credentials
        "password": "yacine",
    }
    auth_response = requests.post(auth_endpoint, json=auth_payload)
    assert auth_response.status_code == 200, f"Failed to authenticate: {auth_response.text}"
    
    # Extract the token and user ID from the response
    token = auth_response.json().get("access_token")  # Use access_token from login response
    user_id = auth_response.json().get("user").get("id")  # Extract user ID

    # Print the token to confirm login success
    print(f"Login successful. Token: {token}")

    # Prepare the DPI creation payload with a unique num_securite_sociale
    unique_nss = f"9128{uuid4().hex}"  # Generate a truly unique NSS using UUID
    dpi_payload = {
        "patient": {
            "nom": "r",
            "prenom": "r",
            "num_securite_sociale": unique_nss,  # Unique NSS
            "date_naissance": "1985-06-15",
            "adresse": "789 Boulevard",
            "telephone": f"12345678{uuid4().int % 100000000}",  # Unique phone number
            "email": f"johndoe{uuid4().hex[:6]}@example.com",  # Unique email address
            "personne_contact": "Jane Doe",  # Added missing required fields
            "user": {  # Make sure user includes all required fields
                "id": user_id,
                "username": "rr",  # Replace with an appropriate username
                "role": "patient",  # Set the appropriate role
                "password": "securepassword123",  # Provide a valid password
            }
        },
        "id_dossier": f"DPI{uuid4().hex[:5]}",  # Unique DPI ID using UUID
        "date_ouverture": "2025-01-04",
        "antecedents": ["Hypertension"],
    }

    # Use Selenium to automate API request submission
    driver.get(base_url)
    driver.execute_script(f"""
        window.responseMessage = 'No response';
        fetch("{dpi_endpoint}", {{
            method: "POST",
            headers: {{
                "Authorization": "Bearer {token}",
                "Content-Type": "application/json"
            }},
            body: JSON.stringify({json.dumps(dpi_payload)})
        }}).then(response => response.json())
        .then(data => {{
            window.responseMessage = data.message || JSON.stringify(data);
        }});
    """)

    # Wait for the response to be captured
    time.sleep(5)  # Increase time if necessary for the API call to complete
    response_message = driver.execute_script("return window.responseMessage;")

    # Validate the response
    print(f"Response Message: {response_message}")
    assert "Dossier Patient and Patient created successfully!" in response_message, \
        f"DPI creation failed with message: {response_message}"

    # Close the browser
    driver.quit()

if __name__ == "__main__":
    test_create_dpi_with_selenium()
