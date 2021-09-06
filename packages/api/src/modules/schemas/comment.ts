import type { Schema } from 'jtd';
export default {
	properties: {
		Text: {
			type: 'string'
		},
		Author: {
			type: 'string'
		}
	},
	optionalproperties: {
		Replied: {
			type: 'string'
		}
	}
} as Schema;
