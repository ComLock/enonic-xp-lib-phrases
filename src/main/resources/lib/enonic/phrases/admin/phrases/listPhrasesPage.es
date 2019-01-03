//import {toStr} from '/lib/enonic/util';
import {PHRASES_TOOL_PATH} from '/lib/enonic/phrases/constants';
import {htmlResponse} from '/lib/enonic/phrases/admin/htmlResponse';
import {getLocales} from '/lib/enonic/phrases/admin/locales/getLocales';
import {getPhrases} from '/lib/enonic/phrases/admin/phrases/getPhrases';


export function listPhrasesPage(
	{path} = {},
	{messages, status, toolPath = PHRASES_TOOL_PATH} = {}
) {
	//log.info(toStr({path, messages, status}));
	const localesInRepo = getLocales();
	return htmlResponse({
		path,
		main: `<form action="${toolPath}/phrases" autocomplete="off" method="POST">
	<fieldset>
		<legend>Add phrase</legend>
		<table>
			<label>
				<span>Key</span>
				<input name="key" type="text"/>
			</label>
			<thead>
				<tr>
					<th>Locale</th>
					<th>Phrase</th>
				</tr>
			</thead>
			<tbody>
				${localesInRepo.map(({code}) => `<tr>
	<td>${code}</td>
	<td><input name="phrase[${code}]" type="text"/></td>
</tr>`).join('\n')}
			</tbody>
		</table>
		<button type="submit">Add phrase</button>
	</fieldset>
</form>
<table>
	<thead>
		<tr>
			<th>Key</th>
			${localesInRepo.map(({code}) => `<th>${code}</th>`).join('\n')}
		</tr>
	</thead>
	<tbody>
		${getPhrases().map(({key, locales}) => `<tr>
	<td>${key}</td>
	${getLocales().map(({code}) => `<td>${locales[code]}</td>`).join('\n')}
</tr>`).join('\n')}
	</tbody>
</table>`,
		messages,
		status
	});
}
