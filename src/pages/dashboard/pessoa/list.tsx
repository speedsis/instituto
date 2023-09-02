import { paramCase } from 'change-case';
import { useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  CircularProgress,
  Dialog,
  DialogActions,
  Stack,
} from '@mui/material';
// routes
import { PATH_CADASTRO, PATH_DASHBOARD } from 'src/routes/paths';

// hooks
import useTabs from 'src/hooks/useTabs';

import useTable, { getComparator, emptyRows } from 'src/hooks/useTable';
// @types

// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import Page from 'src/components/Page';

// components
import { useSettingsContext } from 'src/components/settings';

import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';
// sections

// import { withAuth } from 'src/utils/withAuth';
// import makeHttp from 'src/utils/http';

import { PessoaTableRow, PessoaTableToolbar } from 'src/sections/@cadastro/pessoa/list';

import { ClienteFornecedor } from 'src/@types/cliente-fornecedor';
import useToggle from 'src/hooks/useToggle';
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['todos'];

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'nome', label: 'Nome', align: 'left', width: 600 },
  { id: 'cpfCnpj', label: 'CPF/CNPJ', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'fone1', label: 'Contato', align: 'left' },
  { id: 'fonecelular', label: 'Celular', align: 'left' },
  { id: 'flag_ativo', label: 'Ativo', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

FornecedorList.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// ----------------------------------------------------------------------

interface Props {
  listFornecedor: ClienteFornecedor[];
}

export default function FornecedorList({ listFornecedor }: Props) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { toggle: open, onOpen, onClose } = useToggle();

  const [tableData, setTableData] = useState(listFornecedor);

  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettingsContext();

  const { push } = useRouter();

  const [filterName, setFilterName] = useState('');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('todos');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  async function handleDeleteRow(id: number) {
    try {
      //   await makeHttp()
      //     .delete(`cliente-fornecedor/${id}`)
      //     .then(() => {
      //       new Promise((resolve) => setTimeout(resolve, 500));
      //       const deleteRow = tableData.filter((row: any) => row.id !== id);
      //       setSelected([]);
      //       setTableData(deleteRow);
      //       enqueueSnackbar('Fornecedor deletado com successo!');
      //     });
    } catch (e) {
      console.error(e);
      await new Promise((resolve) => setTimeout(resolve, 500));

      enqueueSnackbar('Ocorreu um erro inesperado, tente novamente mais tarde.');
    }
  }

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter((row: any) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id: string) => {
    push(PATH_CADASTRO.pessoa.edit(Number(paramCase(id))));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    // filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered?.length && !!filterName) ||
    // (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered?.length && !!filterStatus);

  return (
    <Page title="Pessoas: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Listagem de Pessoas"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.home },
            { name: 'Pessoas', href: PATH_CADASTRO.pessoa.list },
            { name: 'Listagem' },
          ]}
          action={
            <>
              <Stack spacing={1} direction={{ xs: 'row', sm: 'row' }}>
                <Tooltip title="Vizualizar PDF">
                  <IconButton onClick={onOpen}>
                    <Iconify icon={'eva:printer-fill'} />
                  </IconButton>
                </Tooltip>
                <NextLink href={PATH_CADASTRO.pessoa.new} passHref>
                  <Tooltip title="Novo registro">
                    <IconButton>
                      <Iconify icon={'carbon:add-filled'} />
                    </IconButton>
                  </Tooltip>
                </NextLink>
              </Stack>
            </>
          }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <PessoaTableToolbar
            filterName={filterName}
            // filterRole={filterRole}
            onFilterName={handleFilterName}
            // onFilterRole={handleFilterRole}
            // optionsRole={ROLE_OPTIONS}
          />

          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {selected?.length > 0 && (
              <TableSelectedAction
                dense={dense}
                numSelected={selected?.length}
                rowCount={tableData?.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row: any) => row.id)
                  )
                }
                action={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                      <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData?.length}
                  numSelected={selected?.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    // onSelectAllRows(
                    //   checked,
                    //   tableData.map((row) => row.id)
                    // )
                  }
                />

                <TableBody>
                  {/* {dataFiltered?
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <PessoaTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                        onDeleteRow={() => handleDeleteRow(Number(row.id.toString()))}
                        onEditRow={() => handleEditRow(row.id.toString())}
                      />
                    ))} */}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
}: // filterRole,
{
  tableData: ClienteFornecedor[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  // filterRole: string;
}) {
  const stabilizedThis = tableData?.map((el, index) => [el, index] as const);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis?.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.nome.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}

// export const getServerSideProps = withAuth(async (ctx, { token }) => {
//   const { data } = await makeHttp(token).get(
//     `cliente-fornecedor/?page=0&limit=50&tipocadastro='F'&nome=`
//   );

//   const listFornecedor = data.found.clifor;

//   console.log('fornecedor', listFornecedor);

//   return {
//     props: {
//       listFornecedor,
//     },
//   };
// });
