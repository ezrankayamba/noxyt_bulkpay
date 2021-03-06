# Generated by Django 3.0.2 on 2020-02-29 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0004_auto_20200229_1807'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='clientuser',
            options={'ordering': ['-created_at']},
        ),
        migrations.AddField(
            model_name='clientuser',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='clientuser',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
