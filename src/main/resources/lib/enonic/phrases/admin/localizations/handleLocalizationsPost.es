import set from 'set-value';
import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';
import {
	BRANCH_ID,
	NT_LOCALIZATION,
	PHRASES_TOOL_PATH,
	REPO_ID
} from '/lib/enonic/phrases/constants';
import {createOrModifyNode} from '/lib/enonic/phrases/createOrModifyNode';
import {localizationsPage} from '/lib/enonic/phrases/admin/localizations/localizationsPage';


export function handleLocalizationsPost({
	params,
	path
}, {
	branch = BRANCH_ID,
	repoId = REPO_ID,
	connection = connect({
		repoId,
		branch
	}),
	toolPath = PHRASES_TOOL_PATH,
	relPath = path.replace(toolPath, ''),
	locale = relPath.replace(/^\/localizations\//, '')
} = {}) {
	const phrases = {};
	Object.keys(params).forEach((property) => {
		set(phrases, property, params[property]);
	});
	log.info(toStr({phrases}));

	const createNodeParams = {
		__repoId: repoId,
		__branch: branch,
		__connection: connection,
		_parentPath: '/localizations',
		_name: locale,
		//_indexConfig: {default: 'byType'},
		_inheritsPermissions: true,
		//displayName: locale,
		phrases,
		type: NT_LOCALIZATION
	};
	log.info(toStr({createNodeParams}));

	const node = createOrModifyNode(createNodeParams);
	log.info(toStr({node}));

	connection.refresh();
	let status = 200;
	const messages = [];
	if (node) {
		messages.push(`Saved localization: ${locale}`);
	} else {
		messages.push(`Failed to save localization: ${locale}!`);
		status = 500;
	}
	return localizationsPage({
		path: `${toolPath}/localizations`
	}, {
		messages,
		status
	});
}
