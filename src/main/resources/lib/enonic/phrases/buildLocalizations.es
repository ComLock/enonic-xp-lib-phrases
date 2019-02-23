import set from 'set-value';
//import {toStr} from '/lib/enonic/util';
import {dlv} from '/lib/enonic/util/object';

import {
	BRANCH_ID,
	PATH_LOCALES,
	PATH_LOCALIZATIONS,
	REPO_ID
} from '/lib/enonic/phrases/constants';
import {cachedNode} from '/lib/enonic/phrases/cachedNode';
import {ignoreErrors} from '/lib/enonic/phrases/ignoreErrors';


function tryGetCachedLocale({locale, nodeCache}) {
	return ignoreErrors(() => cachedNode({
		cache: nodeCache,
		repoId: REPO_ID,
		branch: BRANCH_ID,
		id: `${PATH_LOCALES}/${locale}` // case-sensitive
	}));
}


function tryGetCachedLocalization({locale, nodeCache}) {
	return ignoreErrors(() => cachedNode({
		cache: nodeCache,
		repoId: REPO_ID,
		branch: BRANCH_ID,
		id: `${PATH_LOCALIZATIONS}/${locale.toLowerCase()}`
	}));
}


export function buildLocalizations({
	locale,
	localizations = {}, // Modified
	nodeCache,
	phrase
}) {
	//log.info(toStr({locale, phrase}));
	const localeNode = tryGetCachedLocale({locale, nodeCache});
	if (!localeNode) { return localizations; }
	//log.info(toStr({localeNode, locale, phrase}));

	const localizationNode = tryGetCachedLocalization({locale, nodeCache});
	if (localizationNode) {
		//log.info(toStr({localizationNode, locale, phrase}));
		const {phrases: localizationPhrases} = localizationNode;
		localizations[locale] = localizationPhrases; // eslint-disable-line no-param-reassign
		const localizedPhrase = dlv(localizations, `${locale}.${phrase}`);
		if (localizedPhrase) {
			/*log.info(toStr({
				localizations, locale, phrase, localizedPhrase
			}));*/
			return localizations; // shortcircuit as phrase is found
		}
	} // if localizationNode

	const {fallbackLocaleCode} = localeNode;
	if (!fallbackLocaleCode) { return localizations; }
	/*log.info(toStr({
		localizations, locale, fallbackLocaleCode, phrase
	}));*/

	buildLocalizations({ // Recurse
		locale: fallbackLocaleCode,
		localizations, // Passed by reference and modified
		nodeCache,
		phrase
	});
	//log.info(toStr({localizations, locale, phrase}));
	const localizedPhrase = dlv(localizations, `${fallbackLocaleCode}.${phrase}`);
	if (localizedPhrase) {
		/*log.info(toStr({
			localizations, locale, fallbackLocaleCode, phrase, localizedPhrase
		}));*/
		set(localizations, `${locale}.${phrase}`, localizedPhrase);
		return localizations; // shortcircuit as phrase is found
	}
	return localizations;
} // function buildLocalizations
