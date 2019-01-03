//import {toStr} from '/lib/enonic/util';
import {PHRASES_TOOL_PATH} from '/lib/enonic/phrases/constants';
import {htmlResponse} from '/lib/enonic/phrases/admin/htmlResponse';
import {getPhrases} from '/lib/enonic/phrases/admin/phrases/getPhrases';


export function listPhrasesPage(
	{path} = {},
	{messages, status, toolPath = PHRASES_TOOL_PATH} = {}
) {
	//log.info(toStr({path, messages, status}));
	return htmlResponse({
		path,
		main: `<form action="${toolPath}/phrases" autocomplete="off" method="POST">
	<fieldset>
		<legend>Add phrase</legend>
		<label>
			<span>Key</span>
			<input name="key" type="text"/>
		</label>
		<button type="submit">Add phrase</button>
	</fieldset>
</form>
<table>
	<thead>
		<tr>
			<th>Key</th>
		</tr>
	</thead>
	<tbody>
		${getPhrases().map(({key}) => `<tr>
	<td>${key}</td>
</tr>`).join('\n')}
	</tbody>
</table>`,
		messages,
		status
	});
}
