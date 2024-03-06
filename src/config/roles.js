export const PERMISSION_ENUM = {
    GET_GAME: 'GET_GAME',
    CREATE_GAME: 'CREATE_GAME',
    UPDATE_GAME: 'UPDATE_GAME',
    DELETE_GAME: 'DELETE_GAME',
}

export const ROLE_ENUM = {
    USER: 'USER',
    ADMIN: 'ADMIN'
}

const rolePermissionMapping = {
    [ROLE_ENUM["USER"]]: [PERMISSION_ENUM.GET_GAME],
    [ROLE_ENUM["ADMIN"]]: [PERMISSION_ENUM.GET_GAME, PERMISSION_ENUM.CREATE_GAME, PERMISSION_ENUM.UPDATE_GAME, PERMISSION_ENUM.DELETE_GAME],
};

export const LIST_ROLE = Object.keys(rolePermissionMapping);
export const ROLE_PERMISSION = new Map(Object.entries(rolePermissionMapping));