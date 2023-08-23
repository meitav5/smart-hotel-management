# Hotel Management App
# Steps for setting up the Hotel Management App using VSCode.

# Flask setup
<ol>
    <li>
    Create a virtual environment for python 3 using the below command: <br/>
    <b>python3 -m venv venv</b>
    </li>
    <li>
    Activate the virtual environment using the below command: <br/>
    <b>source venv/bin/activate</b>
    </li>
    <li>
    Install the requirements for the Flask web app using the below command: <br/>
    <b>pip install -r requirements.txt</b>
    </li>
    <li>
    Create a .env file inside the backend directory and add the below contents to it: <br/>
    --- FLASK ---
        FLASK_SECRET_KEY={flask_secret_key} <br/>
        FLASK_DEBUG={flask_debug}<br/>
        AWS_ACCESS_KEY_ID={aws_access_key}<br/>
        AWS_SECRET_ACCESS_KEY={aws_secret_key}<br/>
        AWS_REGION_NAME={aws_region}<br/>
        AWS_DYNAMO_DB_TABLE_NAME={aws_dynamodb_table}<br/>
        AWS_STATIC_FILES_BUCKET_NAME={aws_static_files_bucket} <br/>       AWS_STATIC_WEBSITE_S3_URL={aws_3_bucket_url}<br/>
    </li>
    <li>
    Replace the content inside the curly brackets above by the .env file sent for backend.
    </li>
    <li>
    Go inside the backend directory and run the Flask webapp using the below command: <br/>
    <b>python3 app.py</b>
    </li>
</ol>


#
# React setup

<ol>
    <li>
    Open another terminal. Go inside the frontend directory. <br/>
    </li>
    <li>
    Create a .env file inside the backend directory and add the below contents to it: <br/>
    REACT_APP_DEBUG=true
    REACT_APP_HOST_URL=http://127.0.0.1:5000
    REACT_APP_BASE_URL=http://127.0.0.1:5000/api/
    REACT_APP_ENV=dev
    REACT_APP_USERS_API_URL=http://127.0.0.1:5000/api/users/
    </li>
    <li>
    Install node modules using the command: <br/>
    <b>npm install</b>
    </li>
    <li>
    Once done, run the react app using the below command: <br/>
    <b>npm run start</b>
    </li>
</ol>

<h4>Once the setup is complete; the Flask webapp will be up and running on http://127.0.0.1:80 and the React app will be running on http://localhost:3000</h4>
You can go to the url http://localhost:3000 and start using the app
