from flask import Blueprint, jsonify, request
from controller.filters import (
    get_unique_filters,
    get_filtered_data
)

filter_routes = Blueprint("filter_routes", __name__)


@filter_routes.route("/", methods=["GET"])
def auth_hello():
    return jsonify({"message": "Hello from filters"}), 200


@filter_routes.route("/unique", methods=["GET"])
def user_login():

    response = get_unique_filters()

    return jsonify(response), 200


@filter_routes.route("/data", methods=["GET"])
def get_data():
    # Extract query parameters for filtering
    filters = {
        "end_year": request.args.getlist("end_year"),
        "topic": request.args.getlist("topic"),
        "sector": request.args.getlist("sector"),
        "region": request.args.getlist("region"),
        "pestle": request.args.getlist("pestle"),
        "source": request.args.getlist("source"),
        "country": request.args.getlist("country"),
        "city": request.args.getlist("city"),
    }

    print(filters)

    response = get_filtered_data(filters)

    return jsonify(response), 200
