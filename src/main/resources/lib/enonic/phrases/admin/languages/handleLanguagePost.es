//import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';
import {BRANCH_ID, NT_LANGUAGE, REPO_ID} from '/lib/enonic/phrases/constants';
import {listLanguagesPage} from '/lib/enonic/phrases/admin/languages/listLanguagesPage';


export function handleLanguagePost({
	params: {
		code,
		englishName,
		localizedName
	},
	path
}) {
	const connection = connect({
		repoId: REPO_ID,
		branch: BRANCH_ID
	});
	const createNodeParams = {
		_parentPath: '/languages',
		_name: code,
		//_indexConfig: {default: 'byType'},
		_inheritsPermissions: true,
		//code,
		//displayName: englishName,
		englishName,
		localizedName,
		type: NT_LANGUAGE
	};
	const node = connection.create(createNodeParams);
	connection.refresh();
	//log.info(toStr({node}));
	let status = 200;
	const messages = [];
	if (node) {
		messages.push(`Created language: ${englishName}`);
	} else {
		messages.push(`Failed to create language: ${englishName}!`);
		status = 500;
	}
	return listLanguagesPage({
		path
	}, {
		messages,
		status
	});
}
