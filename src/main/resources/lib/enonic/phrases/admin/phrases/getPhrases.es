import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';

import {BRANCH_ID, NT_PHRASE, REPO_ID} from '/lib/enonic/phrases/constants';


export function getPhrases({
	branch = BRANCH_ID,
	repoId = REPO_ID,
	connection = connect({
		repoId,
		branch
	})
} = {}) {
	log.info(toStr({branch, repoId}));

	const queryParams = {
		count: -1,
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
		query: '', //"_parentPath = '/phrases'",
		sort: '_name ASC'
	};
	log.info(toStr({queryParams}));

	const queryRes = connection.query(queryParams);
	log.info(toStr({queryRes}));

	const phrases = queryRes.hits.map((hit) => {
		const {_name: key, locales} = connection.get(hit.id);
		return {
			key,
			locales
		};
	});
	log.info(toStr({phrases}));
	return phrases;
}
