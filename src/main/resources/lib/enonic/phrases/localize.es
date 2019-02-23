import {newCache} from '/lib/cache';
import {toStr} from '/lib/enonic/util';
import {dlv} from '/lib/enonic/util/object';
import {getLocale} from '/lib/xp/admin';

import {buildLocalizations} from '/lib/enonic/phrases/buildLocalizations';


export function localize({
	locale = getLocale(),
	nodeCache = newCache({
		expire: 60 * 60, // 1 hour
		size: 100
	}),
	phrase
}) {
	//log.info(toStr({locale, phrase}));
	const localizations = buildLocalizations({locale, nodeCache, phrase});
	//log.info(toStr({localizations, locale, phrase}));

	const localizedPhrase = dlv(localizations, `${locale}.${phrase}`, '');
	log.info(toStr({
		localizations, locale, phrase, localizedPhrase
	}));
	return localizedPhrase;
} // function localize
