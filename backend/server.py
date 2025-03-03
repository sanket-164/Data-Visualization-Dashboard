import os
from flask import jsonify
from config import app, db
from routes.filter_routes import filter_routes
from dotenv import load_dotenv

load_dotenv()

@app.route("/")
def get():
    return jsonify({"message": "Hello world!"}), 200


app.register_blueprint(filter_routes, url_prefix="/filters")


if __name__ == "__main__":
    app.app_context().push()
    db.create_all()
    app.run(debug=os.getenv("DEBUG_MODE") == "TRUE")
