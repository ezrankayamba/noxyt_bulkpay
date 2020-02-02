# Generated by Django 3.0.2 on 2020-02-01 08:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('description', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='default.jpg', upload_to='users/profile_photos/')),
                ('change_password', models.BooleanField(default=True)),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_updated', models.DateTimeField(auto_now=True, null=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='created_profiles', to=settings.AUTH_USER_MODEL)),
                ('role', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='profiles', to='users.Role')),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='updated_profiles', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RolePrivilege',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('privilege', models.CharField(choices=[('BackOffice.manageUser', 'Manage Backoffice Users'), ('BackOffice.viewUsers', 'View Backoffice Userss'), ('BackOffice.manageClient', 'Manage Backoffice Clients'), ('BackOffice.viewClients', 'View Backoffice Clients'), ('Clients.manageClient', 'Manage Clients'), ('Clients.manageUsers', 'Manage Clients'), ('Payments.initiatePayment', 'Initiate Payments'), ('Payments.approvePayments', 'Approve Payments'), ('Payments.reports', 'Rep Payments'), ('Payments.statement', 'Statemen Payments')], max_length=40)),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='privileges', to='users.Role')),
            ],
            options={
                'unique_together': {('role', 'privilege')},
            },
        ),
    ]