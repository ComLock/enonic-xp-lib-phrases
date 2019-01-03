//import {toStr} from '/lib/enonic/util';
import {sanitize} from '/lib/xp/common';
import {connect} from '/lib/xp/node';
import {BRANCH_ID, NT_PHRASE, REPO_ID} from '/lib/enonic/phrases/constants';
import {listPhrasesPage} from '/lib/enonic/phrases/admin/phrases/listPhrasesPage';


export function handlePhrasePost({
	params: {
		key
	},
	path
}) {
	//log.info(toStr({key, path}));

	const connection = connect({
		repoId: REPO_ID,
		branch: BRANCH_ID
	});
	const _name = sanitize(key);
	const createNodeParams = {
		_parentPath: '/phrases',
		_name,
		_inheritsPermissions: true,
		type: NT_PHRASE
	};
	const node = connection.create(createNodeParams);
	//log.info(toStr({node}));
	connection.refresh();

	let status = 200;
	const messages = [];
	if (node) {
		messages.push(`Created phrase: ${_name}`);
	} else {
		messages.push(`Failed to create phrase: ${_name}!`);
		status = 500;
	}
	return listPhrasesPage({
		path
	}, {
		messages,
		status
	});
}
