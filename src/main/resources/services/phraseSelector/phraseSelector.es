//import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';

import {
	BRANCH_ID,
	REPO_ID,
	RT_JSON
} from '/lib/enonic/phrases/constants';
import {getPhrase} from '/lib/enonic/phrases/getPhrase';
import {phrasesQuery} from '/lib/enonic/phrases/phrasesQuery';


const CONNECTION = connect({
	repoId: REPO_ID,
	branch: BRANCH_ID
});


export function get({
	params: {
		count,
		ids = '[]', // NOTE Json
		query = '',
		start
	}
}, {
	connection = CONNECTION
} = {}) {
	/*log.info(toStr({
		count, ids, query, start
	}));*/
	if (ids) {
		const idArray = JSON.parse(ids);
		if (idArray.length) {
			return {
				body: {
					count: ids.length,
					total: ids.length,
					hits: idArray.map(id => getPhrase({
						key: `/phrases/${id}`,
						connection
					}))
				},
				contentType: RT_JSON
			};
		}
	} // if ids
	return {
		body: phrasesQuery({
			connection,
			count,
			query: query
				.split(' ')
				.map(word => `(
					fulltext('_name^3, _allText^1', '${word}', 'OR')
					OR ngram('_name^2, _allText', '${word}', 'OR')
				)`)
				.join(' AND ')
				.replace(/\n\s*/g, ' ')
				.trim(),
			start
		}),
		contentType: RT_JSON
	};
} // function get
