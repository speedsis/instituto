// @mui
import { Alert, Tooltip, Stack, Typography, Box } from '@mui/material';
// auth
import { useAuthContext } from 'src/auth/useAuthContext';
// layouts
import LoginLayout from 'src/layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Acessar o sistema</Typography>

        {/* <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography> 
          <Link variant="subtitle2">Create an account</Link>
        </Stack> */}

        <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use o email : <strong>demo@minimals.cc</strong> / senha :<strong> demo1234</strong>
      </Alert>

      <AuthLoginForm />

      <AuthWithSocial />
    </LoginLayout>
  );
}
