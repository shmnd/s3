import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv
import requests

load_dotenv()

def test_s3_access():
    access_key = os.getenv('AWS_ACCESS_KEY_ID')
    secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
    bucket_name = os.getenv('AWS_STORAGE_BUCKET_NAME')
    region = os.getenv('AWS_S3_REGION_NAME')

    print(f"Testing access with Region: {region}")

    # Explicitly use the regional endpoint
    endpoint_url = f"https://s3.{region}.amazonaws.com"
    
    s3 = boto3.client(
        's3',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name=region,
        endpoint_url=endpoint_url,
        config=Config(signature_version='s3v4')
    )

    try:
        # Try to list files
        print(f"\nListing objects from {endpoint_url}...")
        response = s3.list_objects_v2(Bucket=bucket_name, MaxKeys=1)
        if 'Contents' in response:
            key = response['Contents'][0]['Key']
            print(f"Found object: {key}")
            
            # Generate presigned URL
            print(f"\nGenerating presigned URL...")
            url = s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': bucket_name, 'Key': key},
                ExpiresIn=3600
            )
            print(f"URL: {url}")
            
            # Fetch
            print("Fetching URL...")
            r = requests.get(url)
            print(f"Status Code: {r.status_code}")
            if r.status_code == 200:
                print("SUCCESS: Presigned URL works with regional endpoint.")
            else:
                print("FAILURE: Presigned URL returned error.")
                print(r.text[:300])
        else:
            print("Bucket is empty.")

    except Exception as e:
        print(f"\nERROR: {e}")

if __name__ == "__main__":
    test_s3_access()
