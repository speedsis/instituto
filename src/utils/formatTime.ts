import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function formatCPFAsteristico(cpf: string | undefined | null) {
  if (!cpf) return '';

  const digits = cpf.replace(/\D/g, ''); // Remover caracteres não numéricos
  const firstThree = digits.substr(3, 3);
  const lastThree = digits.substr(-5, 3);

  return `***${firstThree}-${lastThree}***`;
}
