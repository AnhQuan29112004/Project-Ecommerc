from utils.python.app_cart import bill
from django.shortcuts import render, redirect,get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Cart, CartItem
from ..Store.models import Product, Variation
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from decimal import Decimal
import json


# Create your views here.
def _card_id(request):
    cart = request.session.session_key
    print("session hien tai:",request.session.session_key)
    if not cart:
        cart = request.session.create()
    return cart

def add_cart(request, product_id):
    try:
        if request.method != "POST":
            return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

        
        product = Product.objects.get(id=product_id)
        data = json.loads(request.body)
        listVariation = []
        color = data.get('color')
        size = data.get('size')
        quantity = int(data.get('quantity'))
        variation_color = Variation.objects.filter(product=product, variation_value__iexact = color, variation_category__iexact = "color")
        variation_size = Variation.objects.filter(product=product, variation_value__iexact = size, variation_category__iexact = "size")
        for item in variation_color:
            listVariation.append(item)
        for item in variation_size:
            listVariation.append(item)
        try:
            cart = Cart.objects.get(cart_id=_card_id(request))
            
        except Cart.DoesNotExist:
            cart = Cart.objects.create(cart_id=_card_id(request))
           
        cart_item = None
        cart_items = CartItem.objects.filter(product=product, cart=cart, is_active=True)
        for i in cart_items:
            if set(i.variation.all()) == set(listVariation):
                cart_item = i
                break
        
        if cart_item:
            cart_item.quantity += quantity
            cart_item.save()
        else:
            cart_item = CartItem.objects.create(
                product=product,
                cart=cart,
                quantity=quantity,
                is_active=True
                )
            for item in variation_color:
                cart_item.variation.add(item)
            for item in variation_size:
                cart_item.variation.add(item)
                
        carts = CartItem.objects.all()
        Bill = bill(carts)

        response_data = {
            'message': 'Add success',
            'item': {
                'quantity': cart_item.quantity,
                'total_item': cart_item.total_item()
            },
            'total': str(Bill["total"]),
            'tax': str(Bill["tax"]),
            'grand_total': str(Bill["grandTotal"])
        }
        
        return JsonResponse(response_data)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def remove_cart(request,product_id):
    if request.method == "DELETE":
        data = json.loads(request.body)
        color = data.get('color')
        size = data.get('size')
        quantity = int(data.get('quantity'))
        cart = Cart.objects.get(cart_id=_card_id(request))
        removeProduct = Product.objects.get(id = product_id)
        removeProductVariation = set(Variation.objects.filter(product = removeProduct, variation_value__in = [color,size]))
        cartItems = CartItem.objects.filter(product = removeProduct, cart = cart)
        cartItem = None
        for i in cartItems:
            if set(i.variation.all()) == removeProductVariation:
                cartItem= i
                break  
        if cartItem.quantity >1:
            cartItem.quantity -= quantity
            cartItem.save()
            message = "Delete one success"
        elif cartItem.quantity ==1:
            cartItem.delete()
            message = "Delete item success"
        
        carts = CartItem.objects.all()
        Bill = bill(carts) 
        response_data = {
            'message': message,
            'item': {
                'quantity': cartItem.quantity,
                'total_item': cartItem.total_item()
            },
            'total': str(Bill["total"]),
            'tax': str(Bill["tax"]),
            'grand_total': str(Bill["grandTotal"])
        }
        return JsonResponse(response_data)

def remove_cart_item(request,cartitem_id):
    cart = Cart.objects.get(cart_id=_card_id(request))
    cartItem = CartItem.objects.get(id = cartitem_id)
    cartItem.delete()
    return redirect('cart')


def cart(request, cartItem = None):
    try:
        cart = Cart.objects.get(cart_id = _card_id(request))
        cartItem = CartItem.objects.filter(cart = cart, is_active=True)
        Bill = bill(cartItem)
    except ObjectDoesNotExist:
        Bill = bill()
    return render(request, "store/cart.html",{
        "cart_item": cartItem,
        "tax": Bill["tax"],
        "grand_total":Bill["grandTotal"],
        "total":Bill["total"]
    })