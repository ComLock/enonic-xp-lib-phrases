//import {toStr} from '/lib/enonic/util';

import {PHRASES_TOOL_PATH} from '/lib/enonic/phrases/constants';
import {htmlResponse} from '/lib/enonic/phrases/admin/htmlResponse';
import {getCountries} from '/lib/enonic/phrases/admin/countries/getCountries';
import {getLanguages} from '/lib/enonic/phrases/admin/languages/getLanguages';
import {getLocales} from '/lib/enonic/phrases/admin/locales/getLocales';


export function listLocalesPage(
	{path} = {},
	{messages, status, toolPath = PHRASES_TOOL_PATH} = {}
) {
	const localeRows = getLocales().map(({
		code, languageCode, countryCode, fallbackLocaleCode
	}) => `<tr>
	<td>${code}</td>
	<td>${languageCode}</td>
	<td>${countryCode}</td>
	<td>${fallbackLocaleCode}</td>
	</tr>`).join('\n');

	return htmlResponse({
		title: 'Locales',
		path,
		main: `<form action="${toolPath}/locales" autocomplete="off" method="POST">
	<fieldset>
		<legend>Add locale</legend>
		<label>
			<span>Language code (ISO 639-1)</span>
			<select name="languageCode">
				${getLanguages().map(({code, englishName}) => `<option value="${code}">${englishName}</option>`).join('\n')}
			<select>
		</label>
		<label>
			<span>Country code (ISO 3166-1 Alpha-2)</span>
			<select name="countryCode">
				<option value="">none</option>
				${getCountries().map(({code, englishName}) => `<option value="${code}">${englishName}</option>`).join('\n')}
			<select>
		</label>
		<label>
			<span>Fallback locale</span>
			<select name="fallbackLocaleCode">
				<option value="">none</option>
				${getLocales().map(({code}) => `<option value="${code}">${code}</option>`).join('\n')}
			</select>
		</label>
		<button type="submit">Add locale</button>
	</fieldset>
</form>
<table>
	<thead>
		<tr>
			<th>Locale Code</th>
			<th>Language Code</th>
			<th>Country Code</th>
			<th>Fallback Locale Code</th>
		</tr>
	</thead>
	<tbody>
		${localeRows}
	</tbody>
</table>
`,
		messages,
		status
	});
}
