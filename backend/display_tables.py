import mysql.connector

# Connect to Aiven MySQL
db_connection = mysql.connector.connect(
    host="prjt-igl-prjt-igl.d.aivencloud.com",   # Replace with your Aiven hostname
    user="avnadmin",   # Replace with your MySQL username
    password="AVNS__SsLRue6rws09TR1Ybj",  # Replace with your MySQL password
    database="defaultdb",  # Replace with your database name
    port=25981  # Default MySQL port
)

cursor = db_connection.cursor()

# Query to show tables
cursor.execute("SHOW TABLES")

# Fetch and display the list of tables
tables = cursor.fetchall()
for table in tables:
    print(table[0])

# Close the connection
cursor.close()
db_connection.close()
