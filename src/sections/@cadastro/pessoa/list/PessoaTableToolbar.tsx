import { Stack, InputAdornment, TextField } from '@mui/material';
import Iconify from 'src/components/iconify';
// components

// ----------------------------------------------------------------------

type Props = {
  // optionsRole: string[];
  filterName: string;
  // filterRole: string;
  onFilterName: (value: string) => void;
  // onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PessoaTableToolbar({
  filterName,
  // filterRole,
  onFilterName,
}: // onFilterRole,
// optionsRole,
Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Pesquisar pessoas ..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                width={16}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
