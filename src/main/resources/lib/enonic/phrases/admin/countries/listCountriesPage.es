//import {toStr} from '/lib/enonic/util';

import {PHRASES_TOOL_PATH} from '/lib/enonic/phrases/constants';
import {htmlResponse} from '/lib/enonic/phrases/admin/htmlResponse';
import {getCountries} from '/lib/enonic/phrases/admin/countries/getCountries';


export function listCountriesPage(
	{path} = {},
	{messages, status, toolPath = PHRASES_TOOL_PATH} = {}
) {
	return htmlResponse({
		title: 'Countries',
		path,
		main: `<form action="${toolPath}/countries" autocomplete="off" method="POST">
	<fieldset>
		<legend>Add country</legend>
		<label>
			<span>Country code (ISO 3166-1 Alpha-2)</span>
			<input name="code" type="text"/>
		</label>
		<label>
			<span>English name of Country</span>
			<input name="englishName" type="text"/>
		</label>
		<label>
			<span>Localized name of Country</span>
			<input name="localizedName" type="text"/>
		</label>
		<a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes" target="_blank">List of ISO 3166 country codes</a>
		<button type="submit">Add country</button>
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
		${getCountries().map(({code, englishName, localizedName}) => `<tr>
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
