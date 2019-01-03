import {dlv} from '/lib/enonic/util/object';
import {PHRASES_TOOL_PATH} from '/lib/enonic/phrases/constants';
import {htmlResponse} from '/lib/enonic/phrases/admin/htmlResponse';
import {getPhrases} from '/lib/enonic/phrases/admin/phrases/getPhrases';
import {getLocalization} from '/lib/enonic/phrases/admin/localizations/getLocalization';


export function editLocalizationPage({
	path
}, {
	messages,
	status,
	toolPath = PHRASES_TOOL_PATH,
	relPath = path.replace(toolPath, ''),
	locale = relPath.replace(/^\/localizations\//, '')
} = {}) {
	const english = getLocalization({locale: 'en'}) || {phrases: {}};
	const localization = getLocalization({locale}) || {phrases: {}};
	return htmlResponse({
		main: `<form action="${toolPath}/localizations/${locale}" autocomplete="off" method="POST">
	<fieldset>
		<legend>Localize ${locale}</legend>
		<table>
			<thead>
				<tr>
					<th>Phrase</th>
					<th>En</th>
					<th>${locale}</th>
				</tr>
			</thead>
			<tbody>
				${getPhrases().map(({key}) => `<tr>
	<th>${key}</th>
	<td>${dlv(english.phrases, key, '')}</td>
	<td><input name="${key}" type="text"/ value="${dlv(localization.phrases, key, '')}"></td>
</tr>`).join('\n')}
			</tbody>
		</table>
		<button type="submit">Save localization</button>
	</fieldset>
</form>`,
		messages,
		path,
		status,
		title: `Localize ${locale}`
	});
}
