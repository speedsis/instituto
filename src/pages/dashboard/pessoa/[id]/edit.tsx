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
import { Pessoas } from 'src/@types/cliente-fornecedor';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';
import makeHttp from 'src/utils/http';

// ----------------------------------------------------------------------

PessoaEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// ----------------------------------------------------------------------

export default function PessoaEdit(props: any) {
  const currentPessoa: Pessoas = props?.pessoa;

  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Pessoas: Editar cadastros">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Editando cadastro"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Listagem de pessoas', href: PATH_DASHBOARD.pessoa.list },
            { name: capitalCase(currentPessoa.nome as string) },
          ]}
        />
        <PessoaNewEditForm isEdit currentPessoa={currentPessoa} />
      </Container>
    </Page>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const id = ctx.query.id as string;

  const { data } = await makeHttp().get(`pessoa/${id}`);

  const pessoa = data.pessoa;

  console.log('pessoa', pessoa);

  return {
    props: {
      pessoa,
    },
  };
};

// export async function getServerSideProps({ query }) {
//   try {
//     const id = query.id as string;
//     const response = await makeHttp().get(`pessoa/${id}`);
//     const pessoa = response.data.clifor;

//     console.log('pessoa', pessoa);

//     return {
//       props: { pessoa },
//     };
//   } catch (error) {
//     // Lidar com erros, como não encontrar a pessoa com o ID especificado
//     // Você pode retornar um objeto com um status de erro aqui
//     return {
//       props: { error: 'Pessoa não encontrada' },
//     };
//   }
// }
