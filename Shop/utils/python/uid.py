import shortuuid
def generate_uid():
    return f"user_{shortuuid.ShortUUID().random(length=6)}"