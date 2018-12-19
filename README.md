## Usage

	include 'com.enonic.lib:phrases:1.0.0-RC2'

	<input name="phraseKey" type="CustomSelector">
		<label>Phrase</label>
		<occurrences minimum="0" maximum="1"/>
		<config>
			<service>phraseSelector</service>
		</config>
	</input>
