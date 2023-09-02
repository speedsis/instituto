import * as Yup from 'yup';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';

import useIsMountedRef from 'src/hooks/useIsMountedRef';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { DatePicker, LocalizationProvider, LoadingButton } from '@mui/lab';
import DateFnsUtils from '@mui/lab/AdapterDateFns';

import { styled } from '@mui/material/styles';

import {
  Box,
  Card,
  Grid,
  Stack,
  Divider,
  Switch,
  MenuItem,
  Typography,
  FormControlLabel,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
// utils
import { fData } from 'src/utils/formatNumber';
// routes
import { PATH_CADASTRO } from 'src/routes/paths';

import {
  FormProvider,
  RHFTextField,
  RHFSelect,
  RHFSwitch,
  RHFUploadAvatar,
} from 'src/components/hook-form';

import {
  STATUS_FORNECEDOR,
  STATUS_ESTADO_CIVIL,
  CATEGORY_PROFISSIONAL,
  TIME_FUTEBOL,
  TIPO_RELIGIAO,
  TIPO_RESIDENCIA,
  TIPO_SEXO,
} from 'src/_mock/_others';
import { ClienteFornecedor } from 'src/@types/cliente-fornecedor';
import { Atividade } from 'src/@types/atividade';
import Label from 'src/components/Label';
import axios from 'axios';
import ConfirmDialog from 'src/components/confirm-dialog';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

type FormValuesProps = ClienteFornecedor;

type Props = {
  isEdit?: boolean;
  currentClifor?: ClienteFornecedor;
};

export default function PessoaNewEditForm({ isEdit = false, currentClifor }: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const [atividades, setAtividades] = useState<Atividade[]>([]);

  const [situacao, setSituacao] = useState<string | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const NewUserSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é um campo requerido'),
    cnpjcpf: Yup.string().required('CPF é um campo requerido'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentClifor?.id,
      nome: currentClifor?.nome || '',
      atividade_id: currentClifor?.atividade_id,
      nomefantasia: currentClifor?.nome || '',
      inscrestadual: currentClifor?.nome || '',
      cnpjcpf: currentClifor?.cnpjcpf || '',
      dtcadastro: currentClifor?.dtcadastro,
      tipocadastro: currentClifor?.tipocadastro || 'F',
      tipofisicajuridica: currentClifor?.tipofisicajuridica || 'J',
      fone1: currentClifor?.fone1 || '',
      fone2: currentClifor?.fone2 || '',
      fonefax: currentClifor?.fonefax || '',
      fonecelular: currentClifor?.fonecelular || '',
      nomecontato1: currentClifor?.nomecontato1 || '',
      nomecontato2: currentClifor?.nomecontato2 || '',
      email: currentClifor?.email || '',
      url: currentClifor?.url || '',

      city: currentClifor?.city || '',
      code: currentClifor?.code || '',
      nro: currentClifor?.nro || '',
      ufclifor: currentClifor?.ufclifor || '',
      endereco: currentClifor?.endereco || '',
      bairro: currentClifor?.bairro || '',
      obsgeral: currentClifor?.obsgeral || '',
      flaginativo: currentClifor?.flaginativo || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentClifor]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentClifor) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentClifor]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      ProcessaSubmit(data);
    } catch (error) {
      console.error(error);
    }
  };

  async function ProcessaSubmit(data: any) {
    console.log('resposta sever', data);

    try {
      //   !isEdit
      //     ? await makeHttp()
      //         .post(`cliente-fornecedor`, data)
      //         .then(() => {
      //           new Promise((resolve) => setTimeout(resolve, 500));
      //           reset();
      //           enqueueSnackbar('Criado com sucesso!');
      //           push(PATH_CADASTRO.pessoa.fornecedor.list);
      //         })
      //     : await makeHttp()
      //         .patch(`cliente-fornecedor/${currentClifor?.id}`, data)
      //         .then(() => {
      //           new Promise((resolve) => setTimeout(resolve, 500));
      //           reset();
      //           enqueueSnackbar('Atualizado com successo!');
      //           push(PATH_CADASTRO.pessoa.fornecedor.list);
      //         });
    } catch (e) {
      console.error(e);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Ocorreu um erro inesperado, tente novamente mais tarde.');
      //   push(PATH_CADASTRO.pessoa.list);
    }
  }

  const getProcessaCep = async (ev: string) => {
    const cep = ev?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return;
    }

    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json;charset=utf-8',
        },
        timeout: 30000,
      };

      const res = await fetch(url, options);
      const data = await res.json();

      setValue('city', data.localidade);
      setValue('ufclifor', data.uf);
      setValue('bairro', data.bairro);
      setValue('endereco', data.logradouro);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDrop = () => {
    console.log('handleDrop');
  };

  const [result, setResult] = useState<string | null>(null);

  const handleValidaTitulo = async () => {
    setLoading(true); // Inicia o indicador de carregamento

    // const apiUrl = 'https://api.infosimples.com/api/v2/consultas/tse/situacao';

    const requestData = {
      name: 'JOSE MAXWELL TAVARES',
      mother: 'RAMONA FERREIRA TAVARES',
      cpf: '76603970104',
      titulo_eleitoral: '013128081961',
      birthdate: '1974-05-18',
      token: 'jV9G2sLoTmQxivcFXWesPDbeNEoEDaNWuSxIdtR4',
      timeout: 600,
    };

    //cad-api.tse.jus.br/eleitor-oauth/oauth/token

    try {
      const apiUrl = '/api/checktitulo'; // Substitua pelo caminho real da sua rota API
      const response = await axios.post(apiUrl, requestData);

      // Lide com a resposta da API conforme necessário

      if (response.data) {
        handleOpenConfirm();
        setSituacao(response.data[0].situacao);
      }

      console.log(response.data);
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    } finally {
      setLoading(false); // Finaliza o indicador de carregamento
    }
  };

  const getAllAtividades = useCallback(async () => {
    try {
      //   const response = await makeHttp().get(`atividades/?page=0&limit=20&nome=`);
      //   const resData = response.data.found.atividades;

      if (isMountedRef.current) {
        // setAtividades(resData);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllAtividades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <LabelStyle
              sx={{
                px: 3,
                pt: 2,
              }}
            >
              Dados básico
            </LabelStyle>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                py: 2,
                gridTemplateColumns: { sm: 'repeat(4, 3fr)' },
              }}
            >
              <RHFTextField
                name="id"
                label="Código"
                size="small"
                sx={{ maxWidth: { md: 160 } }}
                disabled
              />

              <RHFTextField
                name="cnpjcpf"
                label="CPF"
                size="small"
                sx={{ maxWidth: { md: 260 } }}
              />

              <Controller
                name="dtcadastro"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Data cadastro"
                    value={field.value}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue: any) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        size="small"
                        sx={{ maxWidth: { md: 200 } }}
                      />
                    )}
                  />
                )}
              />

              <RHFSelect name="tipovendedor" label="Status" size="small">
                {STATUS_FORNECEDOR.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,

                gridTemplateColumns: { sm: 'repeat(2, 3fr)' },
              }}
            >
              <RHFTextField name="nome" label="Nome completo" size="small" />
              <Controller
                name="pessoa.dtnascimento"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Data nascimento"
                    value={field.value}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue: any) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        size="small"
                        sx={{ maxWidth: { md: 210 } }}
                      />
                    )}
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                py: 2,
                gridTemplateColumns: { sm: 'repeat(1, 3fr)' },
              }}
            >
              <RHFTextField name="nome" label="Nome mãe" size="small" />
            </Box>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                gridTemplateColumns: { sm: 'repeat(4, 3fr)' },
              }}
            >
              <RHFTextField
                name="pessoa.rg"
                label="(RG)"
                size="small"
                sx={{ maxWidth: { md: 210 } }}
              />

              <Controller
                name="pessoa.dtemissaorg"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Data emissão"
                    value={field.value}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue: any) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        size="small"
                        sx={{ maxWidth: { md: 210 } }}
                      />
                    )}
                  />
                )}
              />
              <RHFTextField
                name="pessoa.emissorrg"
                label="Emissor RG"
                size="small"
                sx={{ maxWidth: { md: 210 } }}
              />
              <RHFSelect name="pessoa.tipoestadocivil" label="Estado civil" size="small">
                {STATUS_ESTADO_CIVIL.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                py: 2,
                gridTemplateColumns: { sm: 'repeat(4, 3fr)' },
              }}
            >
              <RHFTextField
                name="pessoa.rg"
                label="Nro título"
                size="small"
                sx={{ maxWidth: { md: 210 } }}
              />

              <Controller
                name="pessoa.dtemissaorg"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Data emissão"
                    value={field.value}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue: any) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        size="small"
                        sx={{ maxWidth: { md: 210 } }}
                      />
                    )}
                  />
                )}
              />
              <RHFTextField
                name="pessoa.zona"
                label="Zona"
                size="small"
                sx={{ maxWidth: { md: 210 } }}
              />

              <RHFTextField
                name="pessoa.emissorrg"
                label="Seção"
                size="small"
                sx={{ maxWidth: { md: 210 } }}
              />

              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading} // Use o estado 'loading' para controlar o indicador de carregamento
                onClick={handleValidaTitulo}
                disabled={loading} // Desativa o botão enquanto o carregamento estiver ocorrendo
              >
                VALIDAR TITULO
              </LoadingButton>
            </Box>

            <Divider />

            <LabelStyle
              sx={{
                px: 3,
                pt: 2,
              }}
            >
              Localização
            </LabelStyle>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                gridTemplateColumns: { sm: 'repeat(3, 3fr)' },
              }}
            >
              <RHFTextField
                InputLabelProps={{ shrink: true }}
                name="code"
                label="CEP"
                size="small"
                placeholder="66800-000"
                sx={{ maxWidth: { md: 260 } }}
                // onBlur={(ev) => getProcessaCep(ev)}

                onBlur={(event: any) => {
                  getProcessaCep(event.target.value);
                }}
              />
              <RHFTextField name="city" label="Cidade" size="small" />
              <RHFTextField
                name="ufclifor"
                label="UF"
                size="small"
                sx={{ maxWidth: { md: 160 } }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                py: 2,
                gridTemplateColumns: { sm: 'repeat(3, 1fr)' },
              }}
            >
              <RHFTextField name="endereco" label="Endereço" size="small" />
              <RHFTextField
                name="bairro"
                label="Bairro"
                size="small"
                sx={{ maxWidth: { md: 260 } }}
              />
              <RHFTextField name="nro" label="Nro" size="small" sx={{ maxWidth: { md: 160 } }} />
            </Box>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                pb: 3,
                gridTemplateColumns: { sm: 'repeat(3, 1fr)' },
              }}
            >
              <RHFTextField name="obsgeral" label="Observação" size="small" multiline rows={2} />
            </Box>

            <Divider
              sx={{
                pt: 3,
              }}
            />

            <LabelStyle
              sx={{
                px: 3,
                pt: 3,
              }}
            >
              Info pessoal
            </LabelStyle>

            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                gridTemplateColumns: { sm: 'repeat(5, 1fr)' },
              }}
            >
              <RHFSelect name="pessoa.tiporesidencia" label="Tipo residência" size="small">
                {TIPO_RESIDENCIA.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="pessoa.valaluguel" label="Valor aluguel" size="small" />
              <RHFTextField name="pessoa.temporesidencia" label="Tempo residência" size="small" />
              <RHFTextField name="pessoa.valsalarioatual" label="Outros rendimentos" size="small" />
              <RHFTextField name="pessoa.valrendafamiliar" label="Renda atual" size="small" />
            </Box>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                py: 2,
                mb: 1,
                gridTemplateColumns: { sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="nomefantasia" label="Nome fantasia" size="small" />

              <RHFSelect
                name="atividade_id"
                label="Atividade"
                size="small"
                sx={{ maxWidth: { md: 260 } }}
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              >
                <MenuItem
                  value=""
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  None
                </MenuItem>
                <Divider />
                {atividades?.map((atividade: Atividade) => (
                  <MenuItem
                    key={atividade.id}
                    value={atividade.id}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    {`${atividade.id}   -   ${atividade.descricao}`}
                  </MenuItem>
                ))}
              </RHFSelect>

              {/* <RHFTextField
                name="cnh"
                label="Atividade"
                size="small"
                sx={{ maxWidth: { md: 260 } }}
              /> */}
            </Box>

            <Divider
              sx={{
                pt: 3,
              }}
            />

            <LabelStyle
              sx={{
                px: 3,
                pt: 2,
              }}
            >
              Info Extras
            </LabelStyle>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                pb: 2,
                gridTemplateColumns: { sm: 'repeat(4, 3fr)' },
              }}
            >
              <RHFSelect
                name="pessoa.profissao"
                label="Tipo profissão"
                placeholder="Tipo profissão"
                size="small"
              >
                {CATEGORY_PROFISSIONAL.map((category) => (
                  <optgroup key={category.group} label={category.group}>
                    {category.classify.map((classify) => (
                      <option key={classify} value={classify}>
                        {classify}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </RHFSelect>

              <RHFSelect name="pessoa.tiporeligiao" label="Religião" size="small">
                {TIPO_RELIGIAO.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="pessoa.timefutebol" label="Time de futebol" size="small">
                {TIME_FUTEBOL.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="pessoa.sexo" label="Sexo" size="small">
                {TIPO_SEXO.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Divider />

            <LabelStyle
              sx={{
                px: 3,
                pt: 2,
              }}
            >
              Contatos
            </LabelStyle>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,
                py: 2,

                gridTemplateColumns: { sm: 'repeat(3, 1fr)' },
              }}
            >
              <RHFTextField name="fone1" label="Fone 1" size="small" />
              <RHFTextField name="fonecelular" label="Celular" size="small" />
              <RHFTextField name="nomecontato1" label="Contato 1" size="small" />
              <RHFTextField name="email" label="Email" size="small" />
            </Box>

            <Box
              sx={{
                display: 'flex',
                columnGap: 2,
                rowGap: 3,
                px: 3,

                gridTemplateColumns: { sm: 'repeat(4, 1fr)' },
              }}
            >
              <RHFTextField name="fone2" label="Fone 2" size="small" />
              <RHFTextField name="fonefax" label="Celular" size="small" />
              <RHFTextField name="nomecontato2" label="Contato 2" size="small" />
              <RHFTextField name="url" label="Portal Web" size="small" />
            </Box>

            {/* <Divider /> */}

            <Stack alignItems="flex-end" sx={{ p: 3, mt: 1 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Criar Pessoa' : 'Salvar alterações'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ py: 10, px: 3 }}>
            {isEdit && (
              <Label
                color={values.flaginativo !== true ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.flaginativo}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="flaginativo"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== true}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banido
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Aplicar para desativar
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verificado
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Ao desativar enviará automaticamente ao usuário um e-mail de verificação
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        {/* <Grid item xs={12} md={6} lg={4}>
          <EcommerceCurrentBalance title="Saldo Corrente" currentBalance={0} sentAmount={0} />
        </Grid> */}

        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Situação:"
          content={`Situação do titulo: ${situacao}`}
          action={
            <Button variant="contained" color="error" onClick={handleCloseConfirm}>
              Fechar
            </Button>
          }
        />
      </Grid>
    </FormProvider>
  );
}
