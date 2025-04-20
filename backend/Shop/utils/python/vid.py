import shortuuid
def generate_vid():
    return f"ven_{shortuuid.ShortUUID().random(length=6)}"