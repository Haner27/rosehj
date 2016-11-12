import hashlib
content = 'liaoxiao'
salt = '*^)h#a&n@#$;.'
print hashlib.md5(content + salt).hexdigest()