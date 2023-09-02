import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  MenuItem,
  Avatar,
  Link,
  Stack,
} from '@mui/material';

import createAvatar from 'src/utils/createAvatar';
// @types

// components

import { Pessoas } from 'src/@types/cliente-fornecedor';
import { formatCPFAsteristico } from 'src/utils/formatTime';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  row: Pessoas;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function PessoaTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const clifor = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">
        <Link
          noWrap
          variant="body2"
          // onClick={onViewRow}
          onClick={onEditRow}
          sx={{ color: 'text.disabled', cursor: 'pointer' }}
        >
          {clifor.id}
        </Link>
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center', maxWidth: 800 }}>
        <Avatar alt={clifor?.nome} color={createAvatar(clifor?.nome).color} sx={{ mr: 2 }}>
          {createAvatar(clifor?.nome).name}
        </Avatar>

        <Stack sx={{ alignItems: 'left', maxWidth: 600 }}>
          <Typography variant="subtitle2" noWrap>
            {clifor?.nome}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left">{formatCPFAsteristico(clifor.cpf)}</TableCell>

      <TableCell align="left">{clifor.city}</TableCell>

      <TableCell align="left">{clifor.bairro}</TableCell>

      <TableCell align="left">{clifor.email}</TableCell>

      <TableCell align="left">{clifor.fonecelular}</TableCell>

      <TableCell align="left">{clifor.flag_ativo}</TableCell>

      <TableCell align="right">...</TableCell>
    </TableRow>
  );
}
