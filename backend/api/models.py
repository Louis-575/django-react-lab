from django.db import models
# Importing libs
from django.contrib.auth.models import User

# Create your models here.

# The note class which defines the notes that the user can make. Inherits the django models class
class Note(models.Model):
    title = models.CharField(max_length=100) # Title with max length of 100
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) # Gives it the time that the note is created as
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") # Uses the userid as the foreign key


    def __str__(self):
        return self.title
