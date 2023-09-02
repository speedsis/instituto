import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_CADASTRO } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_CADASTRO.pessoa.root) {
      push(PATH_CADASTRO.pessoa.list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
