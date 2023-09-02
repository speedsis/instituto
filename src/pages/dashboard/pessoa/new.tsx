// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';

// components
import { useSettingsContext } from 'src/components/settings';

// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import FornecedorNewEditForm from 'src/sections/@cadastro/pessoa/PessoaNewEditForm';
// sections

// ----------------------------------------------------------------------

FornecedorCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// ----------------------------------------------------------------------

export default function FornecedorCreate() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Pessoas: Criando novo cadastro">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Novo cadastro"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Listagem de pessoas', href: PATH_DASHBOARD.pessoa.list },
            { name: 'Novo cadastro' },
          ]}
        />
        <FornecedorNewEditForm />
      </Container>
    </Page>
  );
}
