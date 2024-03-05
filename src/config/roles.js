export const PERMISSION = {
    GET_GAME: 'GET_GAME',
    CREATE_GAME: 'CREATE_GAME',
    UPDATE_GAME: 'UPDATE_GAME',
    DELETE_GAME: 'DELETE_GAME',
}

const rolePermissionMapping = {
    user: [PERMISSION.GET_GAME],
    admin: [PERMISSION.GET_GAME, PERMISSION.CREATE_GAME, PERMISSION.UPDATE_GAME, PERMISSION.DELETE_GAME],
};

export const roles = Object.keys(rolePermissionMapping);
export const roleRights = new Map(Object.entries(rolePermissionMapping));