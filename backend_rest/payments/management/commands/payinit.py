from django.core.management.base import BaseCommand, CommandError
from payments import models


class Command(BaseCommand):

    def handle(self, *args, **options):
        self.stdout.write("Initial processing")
        batch = models.Batch.objects.filter(status=1).first()
        count = 0
        while(batch):
            # Process here before setting it to 2 (ready to send for approval)
            batch.status = 2
            batch.save()
            count += 1
            print(f'Batch processed: {count} - {batch.id}')
            batch = models.Batch.objects.filter(status=1).first()

        print(f'Initial processing completed by processing {count} batches')
