import {connect} from '/lib/xp/node';

import {
	BRANCH_ID,
	REPO_ID
} from '/lib/enonic/phrases/constants';


const CONNECTION = connect({
	repoId: REPO_ID,
	branch: BRANCH_ID
});


export function getPhrase({
	connection = CONNECTION,
	key
}) {
	//log.info(toStr({key}));
	const node = connection.get(key);
	//log.info(toStr({node}));
	const id = node._path.replace(/^\/phrases\//, '');
	return {
		id,
		displayName: id,
		description: id
	};
}
