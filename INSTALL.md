# Instalation for the Predictive Text service 

This document describes how to install all the dependencies that you will need to run the Predictive Text feature. For the moment its only available for Works Experience, specifically in Responsibility. In the future, this feature may be extended to other modals.

## Prerrequisitos

 - Python installed on your machine. You can verify if you have it installed by typing the following command in your terminal:

  - macOS/Linux: `python3 --version`
  - Windows: `python --version`

## Instalation 

1. **Virtual Environment**

    It is recommended to run this using a virtual enviroment but for my case that didnt work, so I downloaded all the dependencies globaly. But if you wish to use the virtual enviroment follow these commands:

   - In macOS/Linux:
    
     `python3 -m venv nlp-service-env`
     `source nlp-service-env/bin/activate`
     

   - In Windows:

     `python -m venv nlp-service-env`
     `nlp-service-env\Scripts\activate`

2. **Dependencies installation**

    - pip install flask flask_cors transformers torch

3. **Running Flask**

    To use the Predictive Text feature, you'll need to run Flask. I recommended to open another terminal in your code editor after you've started the UI. Make sure you're in the 'nlp_service' directory before running the following command:

   - In macOS/Linux:
    
     `python3 nlp_service.py`

   - In Windows:

     `python nlp_service.py`
    
### Remember to deactivate your virtual environment with deactivate when you're done, if you chose to use one.