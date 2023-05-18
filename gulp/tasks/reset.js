// del v7.0.0
import { deleteAsync } from 'del'
export const reset = () => {
	return deleteAsync(app.path.clean)
}

/* del v6.0.0
import del from 'del';

export const reset = () => {
   return del(app.path.clean);
}
*/