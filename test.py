import hashlib
import random
from datetime import datetime
print '{0}{1}'.format(datetime.now().strftime('%Y%m%d%H%M%S'), str(random.randint(100, 999)))