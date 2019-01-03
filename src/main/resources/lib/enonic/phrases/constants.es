import {getToolUrl} from '/lib/xp/admin';

export const APP_PHRASES = 'com.enonic.admin.phrases';
export const PHRASES_TOOL_PATH = getToolUrl(APP_PHRASES, 'phrases');


//──────────────────────────────────────────────────────────────────────────────
// Context Role / Repo
//──────────────────────────────────────────────────────────────────────────────
export const ROLE_PHRASES_ADMIN = `${APP_PHRASES}.admin`;

export const BRANCH_ID = 'master';
export const REPO_ID = APP_PHRASES;


//──────────────────────────────────────────────────────────────────────────────
// Node types
//──────────────────────────────────────────────────────────────────────────────
export const NT_COUNTRY = `${APP_PHRASES}:country`;
export const NT_FOLDER = `${APP_PHRASES}:folder`;
export const NT_LANGUAGE = `${APP_PHRASES}:language`;
export const NT_LOCALE = `${APP_PHRASES}:locale`;
export const NT_PHRASE = `${APP_PHRASES}:phrase`;
export const NT_LOCALIZATION = `${APP_PHRASES}:localization`;


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
