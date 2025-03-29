import shortuuid
def generate_sku():
    return f"sku_{shortuuid.ShortUUID().random(length=6)}"