import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';

import {
	BRANCH_ID,
	REPO_ID
} from '/lib/enonic/phrases/constants';


export function getLocalization({
	branch = BRANCH_ID,
	locale,
	repoId = REPO_ID,
	connection = connect({
		repoId,
		branch
	})
}) {
	log.info(toStr({branch, locale, repoId}));

	const node = connection.get(`/localizations/${locale}`);
	log.info(toStr({node}));

	return node;
}
