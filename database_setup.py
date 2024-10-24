from flask import Flask, request, render_template, redirect, url_for
import sqlite3

app = Flask(__name__)

# Connect to the SQLite database
def connect_db():
    return sqlite3.connect('18hrs_fitness.db')

# Create the route for the customer registration form
@app.route('/register', methods=['POST'])
def register_customer():
    name = request.form['custName']
    age = request.form['custAge']
    phone = request.form['custPhone']
    email = request.form['custEmail']

    # Save customer information to the database
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO customers (name, age, phone, email) VALUES (?, ?, ?, ?)', (name, age, phone, email))
    conn.commit()
    conn.close()

    return redirect(url_for('success'))

# Route for success message
@app.route('/success')
def success():
    return 'Customer registered successfully!'

if __name__ == '__main__':
    app.run(debug=True)

