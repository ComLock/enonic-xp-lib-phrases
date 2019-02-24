import {newCache} from '/lib/cache';
//import {toStr} from '/lib/enonic/util';
import {dlv} from '/lib/enonic/util/object';
import {getLocale} from '/lib/xp/admin';

import {buildLocalizations} from '/lib/enonic/phrases/buildLocalizations';


const LOCALIZE_CACHE = newCache({
	expire: 60 * 60, // 1 hour
	size: 100
});


export function localize({
	clearCache = false,
	locale = getLocale(),
	nodeCache = LOCALIZE_CACHE,
	phrase
}) {
	//log.info(toStr({clearCache, locale, phrase}));
	if (clearCache) {
		log.info('Clearing localizationCache.');
		nodeCache.clear();
	}

	const localizations = buildLocalizations({locale, nodeCache, phrase});
	//log.info(toStr({localizations, locale, phrase}));

	const localizedPhrase = dlv(localizations, `${locale}.${phrase}`, '');
	/*log.info(toStr({
		localizations, locale, phrase, localizedPhrase
	}));*/
	return localizedPhrase;
} // function localize
