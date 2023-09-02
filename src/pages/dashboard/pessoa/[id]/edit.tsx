import { paramCase, capitalCase } from 'change-case';

// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks

// layouts

// components
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// sections
import PessoaNewEditForm from 'src/sections/@cadastro/pessoa/PessoaNewEditForm';

//conection
// import { withAuth } from 'src/utils/withAuth';
// import makeHttp from 'src/utils/http';
import { ClienteFornecedor } from 'src/@types/cliente-fornecedor';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

PessoaEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// ----------------------------------------------------------------------

export default function PessoaEdit(props: any) {
  const currentClifor: ClienteFornecedor = props?.clifor;

  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Fornecedor: Editar Fornecedor">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Editando Fornecedor"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Listagem de fornecedor', href: PATH_DASHBOARD.pessoa.list },
            { name: capitalCase(currentClifor.nome as string) },
          ]}
        />
        <PessoaNewEditForm isEdit currentClifor={currentClifor} />
      </Container>
    </Page>
  );
}

// export const getServerSideProps = withAuth(async (ctx, { token }) => {
//   const id = ctx.query.id as string;
//   const { data } = await makeHttp(token).get(`cliente-fornecedor/${id}`);

//   console.log('clifor', data);

//   const clifor = data.clifor;

//   return {
//     props: {
//       clifor,
//     },
//   };
// });
