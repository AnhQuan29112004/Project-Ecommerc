def bill(cart_items=None):
    total = 0
    tax = 0
    grandTotal = 0
    if cart_items:
        for i in cart_items:
            total += i.product.price * i.quantity
        tax = (2*total)/100
        grandTotal = total + tax
    return {"tax":tax, "grandTotal":grandTotal, "total":total}