from django.shortcuts import render
# Imported libs
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import NoteSerializer, UserSerializer # The serializers file we made
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.

# Class for view to make new note and view notes
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): # Gets the notes written by that user
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid(): # Checks if the serializer is valid, e.g. if a title is over a maximum length.
            serializer.save(author=self.request.user)
        else:
            print(serializer.erros)

# Class for view to delete notes and view notes
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): # Gets the notes written by that user
        user = self.request.user
        return Note.objects.filter(author=user)



# Inherits from a default class that allows the creation of user objects
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


