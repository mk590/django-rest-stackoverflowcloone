# Generated by Django 4.1.1 on 2023-03-11 09:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stackoverflow', '0003_alter_comment_comment_question'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='tags',
        ),
    ]