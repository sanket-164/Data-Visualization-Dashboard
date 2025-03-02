from config import db

# Define the table structure
class Data(db.Model):
    __tablename__ = "data"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    end_year = db.Column(db.String(10), nullable=True)
    intensity = db.Column(db.Integer, nullable=True)
    sector = db.Column(db.String(255), nullable=True)
    topic = db.Column(db.String(255), nullable=True)
    insight = db.Column(db.Text, nullable=True)
    url = db.Column(db.Text, nullable=True)
    region = db.Column(db.String(255), nullable=True)
    start_year = db.Column(db.String(10), nullable=True)
    impact = db.Column(db.Text, nullable=True)
    added_month = db.Column(db.Integer, nullable=True)
    added_date = db.Column(db.Integer, nullable=True)
    added_year = db.Column(db.Integer, nullable=True)
    added_time = db.Column(db.Time, nullable=True)
    published_month = db.Column(db.Integer, nullable=True)
    published_date = db.Column(db.Integer, nullable=True)
    published_year = db.Column(db.Integer, nullable=True)
    published_time = db.Column(db.Time, nullable=True)
    country = db.Column(db.String(255), nullable=True)
    relevance = db.Column(db.Integer, nullable=True)
    pestle = db.Column(db.String(255), nullable=True)
    source = db.Column(db.String(255), nullable=True)
    title = db.Column(db.Text, nullable=True)
    likelihood = db.Column(db.Integer, nullable=True)
