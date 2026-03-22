# Importing libs
from django.contrib.auth.models import User
from rest_framework import serializers # Serializer converts between python objects and jsons
from .models import Note

# This class creates the user object from the json, after checking if the data is valid
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


 # This class serializes the Note objects defined in models.py
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


