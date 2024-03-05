export const PERMISSION = {
    GET_GAME: 'GET_GAME',
    CREATE_GAME: 'CREATE_GAME',
    UPDATE_GAME: 'UPDATE_GAME',
    DELETE_GAME: 'DELETE_GAME',
}

export const ROLE = {
    USER: 'USER',
    ADMIN: 'ADMIN'
}

const rolePermissionMapping = {
    [ROLE["USER"]]: [PERMISSION.GET_GAME],
    [ROLE["ADMIN"]]: [PERMISSION.GET_GAME, PERMISSION.CREATE_GAME, PERMISSION.UPDATE_GAME, PERMISSION.DELETE_GAME],
};

export const roles = Object.keys(rolePermissionMapping);
export const roleRight = new Map(Object.entries(rolePermissionMapping));