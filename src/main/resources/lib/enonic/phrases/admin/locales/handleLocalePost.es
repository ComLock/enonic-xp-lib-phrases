//import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';
import {BRANCH_ID, NT_LOCALE, REPO_ID} from '/lib/enonic/phrases/constants';
import {listLocalesPage} from '/lib/enonic/phrases/admin/locales/listLocalesPage';


export function handleLocalePost({
	params: {
		languageCode,
		countryCode,
		fallbackLocaleCode = ''
	},
	path
}) {
	const code = `${languageCode}${countryCode ? `-${countryCode.toUpperCase()}` : ''}`;
	const connection = connect({
		repoId: REPO_ID,
		branch: BRANCH_ID
	});
	const createNodeParams = {
		_parentPath: '/locales',
		_name: code,
		//_indexConfig: {default: 'byType'},
		_inheritsPermissions: true,
		//code,
		//displayName: englishName,
		languageCode,
		countryCode,
		fallbackLocaleCode,
		type: NT_LOCALE
	};
	const node = connection.create(createNodeParams);
	connection.refresh();
	//log.info(toStr({node}));
	let status = 200;
	const messages = [];
	if (node) {
		messages.push(`Created locale: ${code}`);
	} else {
		messages.push(`Failed to create locale: ${code}!`);
		status = 500;
	}
	return listLocalesPage({
		path
	}, {
		messages,
		status
	});
}
