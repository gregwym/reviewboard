from django_evolution.mutations import AddField
from django.db import models

MUTATIONS = [
    AddField('Comment', 'rich_text', models.BooleanField, initial=False),
    AddField('FileAttachmentComment', 'rich_text', models.BooleanField,
             initial=False),
    AddField('ScreenshotComment', 'rich_text', models.BooleanField,
             initial=False),
    AddField('Review', 'rich_text', models.BooleanField, initial=False)
]
