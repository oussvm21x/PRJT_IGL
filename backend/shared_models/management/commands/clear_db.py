from django.db import connection
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Drops all tables in the database"

    def handle(self, *args, **kwargs):
        with connection.cursor() as cursor:
            self.stdout.write("Dropping all tables...")
            cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")  # For MySQL
            for table in connection.introspection.table_names():
                cursor.execute(f"DROP TABLE IF EXISTS `{table}`;")
            cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")
        self.stdout.write("All tables dropped.")
