import { getCSRFToken } from "/static/store/js/getCsrf.js";
import "/static/js/search.js";
import "/static/js/messages.js";

console.log(typeof getCSRFToken); // This should now log "function"