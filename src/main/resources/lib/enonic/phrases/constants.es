import {getToolUrl} from '/lib/xp/admin';

export const PACKAGE = 'com.enonic.phrases';
export const PHRASES_ADMIN = `${PACKAGE}.admin`;
export const PHRASES_TOOL_PATH = getToolUrl(PHRASES_ADMIN, 'phrases');


//──────────────────────────────────────────────────────────────────────────────
// Context Role / Repo
//──────────────────────────────────────────────────────────────────────────────
export const ROLE_PHRASES_ADMIN = `${PACKAGE}.admin`;

export const BRANCH_ID = 'master';
export const REPO_ID = PACKAGE;


//──────────────────────────────────────────────────────────────────────────────
// Node types
//──────────────────────────────────────────────────────────────────────────────
export const NT_COUNTRY = `${PACKAGE}:country`;
export const NT_FOLDER = `${PACKAGE}:folder`;
export const NT_LANGUAGE = `${PACKAGE}:language`;
export const NT_LOCALE = `${PACKAGE}:locale`;
export const NT_PHRASE = `${PACKAGE}:phrase`;
export const NT_LOCALIZATION = `${PACKAGE}:localization`;


//──────────────────────────────────────────────────────────────────────────────
// Node paths
//──────────────────────────────────────────────────────────────────────────────
export const PATH_LOCALES = '/locales';
export const PATH_LOCALIZATIONS = '/localizations';


//──────────────────────────────────────────────────────────────────────────────
// Return types
//──────────────────────────────────────────────────────────────────────────────
export const RT_JSON = 'text/json;charset=utf-8';


//──────────────────────────────────────────────────────────────────────────────
// Root Permissions
//──────────────────────────────────────────────────────────────────────────────
export const ROOT_PERMISSION_SYSTEM_ADMIN = {
	principal: 'role:system.admin',
	allow: [
		'READ',
		'CREATE',
		'MODIFY',
		'DELETE',
		'PUBLISH',
		'READ_PERMISSIONS',
		'WRITE_PERMISSIONS'
	],
	deny: []
};


export const ROOT_PERMISSION_SYSTEM_EVERYONE_CAN_READ = {
	principal: 'role:system.everyone',
	allow: ['READ'],
	deny: []
};


export const ROOT_PERMISSION_SYSTEM_AUTHENTICATED_CAN_READ = {
	principal: 'role:system.authenticated',
	allow: ['READ'],
	deny: []
};


export const ROOT_PERMISSION_PHRASES_ADMIN = {
	principal: `role:${ROLE_PHRASES_ADMIN}`,
	allow: [
		'READ',
		'CREATE',
		'MODIFY',
		'DELETE'
	],
	deny: []
};
