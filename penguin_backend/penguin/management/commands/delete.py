from django.core.management.base import BaseCommand
from ...models import Commands


class Command(BaseCommand):

    def handle(self, *args, **options):
        clear_all_command_data()

def clear_all_command_data():
    try:
        Commands.objects.all().delete()
        print('Deleted all Command data.')
    except:
        print('Could not delete all Command data.')