import {connect} from '/lib/xp/node';

import {BRANCH_ID, NT_COUNTRY, REPO_ID} from '/lib/enonic/phrases/constants';


export function getCountries() {
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
						values: [NT_COUNTRY]
					}
				}]
			}
		},
		query: '', //"_parentPath = '/countries'",
		sort: '_name ASC'
	});
	const countries = queryRes.hits.map((hit) => {
		const {_name: code, englishName, localizedName} = connection.get(hit.id);
		return {
			code,
			englishName,
			localizedName
		};
	});
	return countries;
}
