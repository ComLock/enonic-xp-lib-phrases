import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';

import {
	BRANCH_ID,
	NT_LOCALE,
	REPO_ID
} from '/lib/enonic/phrases/constants';


export function getLocales({
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
						values: [NT_LOCALE]
					}
				}]
			}
		},
		query: '', //"_parentPath = '/locales'",
		sort: '_name ASC'
	};
	log.info(toStr({queryParams}));

	const queryRes = connection.query(queryParams);
	log.info(toStr({queryRes}));

	const locales = queryRes.hits.map((hit) => {
		const {
			_name: code, languageCode, countryCode, fallbackLocaleCode = ''
		} = connection.get(hit.id);
		return {
			code, languageCode, countryCode, fallbackLocaleCode
		};
	});
	log.info(toStr({locales}));
	return locales;
}
