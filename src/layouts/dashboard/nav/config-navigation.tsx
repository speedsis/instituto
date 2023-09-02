// routes
import { PATH_DASHBOARD, PATH_CADASTRO } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'hidra v1.0.0',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.home, icon: ICONS.dashboard },
      {
        title: 'Pessoas',
        path: PATH_CADASTRO.pessoa,
        icon: ICONS.user,
        children: [
          { title: 'Listagem de pessoas', path: PATH_CADASTRO.pessoa.list },
          { title: 'Novo cadastro', path: PATH_CADASTRO.pessoa.new },
          // { title: 'Novo tipo', path: PATH_PROTOCOLO.tipo.new },
        ],
      },
      // { title: 'Two', path: PATH_DASHBOARD.two, icon: ICONS.ecommerce },
      // { title: 'Three', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'gerenciamento',
    items: [
      {
        title: 'usuário',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'editar', path: PATH_DASHBOARD.user.four },
          // { title: 'Five', path: PATH_DASHBOARD.user.five },
          // { title: 'Six', path: PATH_DASHBOARD.user.six },
        ],
      },
    ],
  },
];

export default navConfig;
