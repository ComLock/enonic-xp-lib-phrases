//import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';

import {BRANCH_ID, NT_LANGUAGE, REPO_ID} from '/lib/enonic/phrases/constants';


export function getLanguages() {
	const connection = connect({
		repoId: REPO_ID,
		branch: BRANCH_ID
	});
	const queryRes = connection.query({
		count: -1,
		filters: {
			boolean: {
				must: [{
					hasValue: {
						field: 'type',
						values: [NT_LANGUAGE]
					}
				}]
			}
		},
		query: '', //"_parentPath = '/languages'",
		sort: '_name ASC'
	});
	const languages = queryRes.hits.map((hit) => {
		const {_name: code, englishName, localizedName} = connection.get(hit.id);
		return {
			code,
			englishName,
			localizedName
		};
	});
	//log.info(toStr({languages}));
	return languages;
}
