from django.urls import path
from.views import *
app_name='myapp'

urlpatterns=[
    path('',home,name='home'),
    path('about/',about,name='about'),
    path('services/',services,name='services'),
    path('contact/',contact,name='contact'),
    path('bookings/',bookings,name='bookings'),
    path('cart/',cart,name='cart'),    
    path('payment/',payment,name='payment'),    

]