import {PHRASES_TOOL_PATH} from '/lib/enonic/phrases/constants';
import {htmlResponse} from '/lib/enonic/phrases/admin/htmlResponse';
import {getLocales} from '/lib/enonic/phrases/admin/locales/getLocales';

export function localizationsPage({
	path
}, {
	messages,
	status,
	toolPath = PHRASES_TOOL_PATH
} = {}) {
	return htmlResponse({
		main: `<table>
	<thead>
		<tr>
			<th>Locale Code</th>
			<th>Fallback Locale Code</th>
			<th>Localized phrases count</th>
		</tr>
	</thead>
	<tbody>
		${getLocales().map(({
		code, fallbackLocaleCode
	}) => `<tr>
	<td><a href="${toolPath}/localizations/${code}">${code}</a></td>
	<td>${fallbackLocaleCode}</td>
</tr>`).join('\n')}
	</tbody>
</table>`,
		messages,
		path,
		status,
		title: 'Localizations'
	});
}
