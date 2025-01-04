# Generated by Django 5.1.4 on 2025-01-02 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shared_models', '0004_alter_dossierpatient_certificats_medicaux_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='infirmier',
            name='id_infirmier',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('admin', 'Admin'), ('administratif', 'Administratif'), ('patient', 'Patient'), ('medecin', 'Medecin'), ('infirmier', 'Infirmier'), ('radiologue', 'Radiologue'), ('laborantien', 'Laborantien')], max_length=20),
        ),
    ]