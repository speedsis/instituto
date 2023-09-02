// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_CADASTRO = {
  root: ROOTS_DASHBOARD,

  pessoa: {
    root: path(ROOTS_DASHBOARD, '/pessoa'),
    list: path(ROOTS_DASHBOARD, '/pessoa/list'),
    new: path(ROOTS_DASHBOARD, '/pessoa/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/pessoa/${id}/edit`),
  },
};

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,

  home: path(ROOTS_DASHBOARD, '/home'),
  one: path(ROOTS_DASHBOARD, '/one'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
  },
};
