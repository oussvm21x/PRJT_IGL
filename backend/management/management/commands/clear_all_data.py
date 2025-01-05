from django.core.management.base import BaseCommand
from django.apps import apps

class Command(BaseCommand):
    help = 'Clear all records from all tables in the database'

    def handle(self, *args, **kwargs):
        all_models = apps.get_models()
        for model in all_models:
            model.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully cleared all records from all tables'))
