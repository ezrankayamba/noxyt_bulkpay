# Generated by Django 3.0.2 on 2020-01-31 14:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0006_auto_20200131_1721'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='batch',
            options={'ordering': ['-created_at']},
        ),
    ]