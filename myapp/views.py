from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,'home.html')
def about(request):
    return render(request,'about.html')
def services(request):
    return render(request,'services.html')
def contact(request):
    return render(request,'contact.html')
def bookings(request):
    return render(request,'bookings.html')
def cart(request):
    return render(request,'cart.html')
def payment(request):
    return render(request,'payment.html')