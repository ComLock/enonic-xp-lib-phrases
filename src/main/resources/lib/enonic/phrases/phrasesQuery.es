//import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';

import {
	BRANCH_ID,
	NT_PHRASE,
	REPO_ID
} from '/lib/enonic/phrases/constants';
import {getPhrase} from '/lib/enonic/phrases/getPhrase';


const CONNECTION = connect({
	repoId: REPO_ID,
	branch: BRANCH_ID
});


export function phrasesQuery({
	connection = CONNECTION,
	count = -1,
	query = '',
	sort = '_path ASC',
	start = 0
} = {}) {
	//log.info(toStr({count, query, start}));

	const queryParams = {
		count,
		filters: {
			boolean: {
				must: [{
					hasValue: {
						field: 'type',
						values: [NT_PHRASE]
					}
				}]
			}
		},
		query,
		sort,
		start
	};
	//log.info(toStr({queryParams}));

	const result = CONNECTION.query(queryParams);
	//log.info(toStr({result}));

	result.hits = result.hits.map(hit => getPhrase({key: hit.id, connection}));
	//log.info(toStr({result}));

	return result;
}
