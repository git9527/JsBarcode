import CODE128 from './CODE128.js';
import {B_START_CHAR, C_CHARS} from './constants';
const CODE_C = String.fromCharCode(204);
const CODE_B = String.fromCharCode(205);
const matchSetC = (string) => string.match(new RegExp(`^${C_CHARS}*`))[0];

class CODE128Fix extends CODE128 {
	constructor(string, options) {
		let starting = matchSetC(string);
		let bStartingIndex = starting.length;
		let content = B_START_CHAR + CODE_C + string.substring(0, bStartingIndex);
		
		let cStartingIndex = bStartingIndex + 3;
		if (!string.substring(bStartingIndex).startsWith(" ")) {
			cStartingIndex = cStartingIndex + 1;
		}
		content = content + CODE_B + string.substring(bStartingIndex, cStartingIndex);
		let remaining = string.substring(cStartingIndex);
		const remainingMatched = matchSetC(remaining);
		
		content = content + CODE_C + string.substring(cStartingIndex, cStartingIndex + remainingMatched.length);
		if (remainingMatched !== remaining) {
			content = content + CODE_B + string.substring(cStartingIndex + remainingMatched.length);
		}
		
		super(content, options);
	}

	valid() {
		return true;
	}
}

export default CODE128Fix;
