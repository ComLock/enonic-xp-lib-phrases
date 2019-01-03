//import {toStr} from '/lib/enonic/util';

import {PHRASES_TOOL_PATH} from '/lib/enonic/phrases/constants';
import {htmlResponse} from '/lib/enonic/phrases/admin/htmlResponse';
import {getLanguages} from '/lib/enonic/phrases/admin/languages/getLanguages';


export function listLanguagesPage(
	{path} = {},
	{messages, status, toolPath = PHRASES_TOOL_PATH} = {}
) {
	return htmlResponse({
		title: 'Languages',
		path,
		main: `<form action="${toolPath}/languages" autocomplete="off" method="POST">
	<fieldset>
		<legend>Add language</legend>
		<label>
			<span>Language code (ISO 639-1)</span>
			<input name="code" type="text"/>
		</label>
		<label>
			<span>English name of Language</span>
			<input name="englishName" type="text"/>
		</label>
		<label>
			<span>Localized name of Language</span>
			<input name="localizedName" type="text"/>
		</label>
		<a href="https://www.loc.gov/standards/iso639-2/php/code_list.php" target="_blank">ISO 639 Language Code List</a>
		<button type="submit">Add language</button>
	</fieldset>
</form>
<table>
	<thead>
		<tr>
			<th>Code</th>
			<th>English name</th>
			<th>Localized name</th>
		</tr>
	</thead>
	<tbody>
		${getLanguages().map(({code, englishName, localizedName}) => `<tr>
	<td>${code}</td>
	<td>${englishName}</td>
	<td>${localizedName}</td>
	</tr>`).join('\n')}
	</tbody>
</table>`,
		messages,
		status
	});
}
