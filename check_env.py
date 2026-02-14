from dotenv import load_dotenv
import os

load_dotenv()

access_key = os.getenv('AWS_ACCESS_KEY_ID')
bucket_name = os.getenv('AWS_STORAGE_BUCKET_NAME')
region = os.getenv('AWS_S3_REGION_NAME')
secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')

print(f"ACCESS_KEY: '{access_key}'")
print(f"BUCKET_NAME: '{bucket_name}'")
print(f"REGION: '{region}'")
print(f"SECRET_KEY: '{secret_key}'")
