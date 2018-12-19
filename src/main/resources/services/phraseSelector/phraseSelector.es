import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';


const BRANCH_ID = 'master';
const CT_PHRASE = 'com.enonic.admin.phrases:phrase';
const REPO_ID = 'com.enonic.admin.phrases';


const CONNECTION = connect({
	repoId: REPO_ID,
	branch: BRANCH_ID
});


function getPhrase(key) {
	//log.info(toStr({key}));
	const node = CONNECTION.get(key);
	//log.info(toStr({node}));
	const id = node._path.replace(/^\/phrases/, '');
	return {
		id,
		displayName: (node.locales && node.locales.en) || id,
		description: id
	};
}


export function get({
	params: {
		count,
		ids = '[]', // NOTE Json
		query = '',
		start
	}
}) {
	log.info(toStr({
		count, ids, query, start
	}));
	if (ids) {
		const idArray = JSON.parse(ids);
		if (idArray.length) {
			return {
				body: {
					count: ids.length,
					total: ids.length,
					hits: idArray.map(id => getPhrase(`/phrases${id}`))
				},
				contentType: 'text/json; charset=utf-8'
			};
		}
	} // if ids
	const queryParams = {
		count,
		filters: {
			boolean: {
				must: [{
					hasValue: {
						field: 'type',
						values: [CT_PHRASE]
					}
				}]
			}
		},
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
	}; //log.info(toStr({queryParams}));
	const result = CONNECTION.query(queryParams); //log.info(toStr({result}));
	const body = {
		count: result.count,
		total: result.total,
		hits: result.hits.map(({id}) => getPhrase(id))
	}; //log.info(toStr({body}));
	return {
		body,
		contentType: 'text/json; charset=utf-8'
	};
}
