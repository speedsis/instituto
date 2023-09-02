import _mock from './_mock';

export const STATUS_CONVENIO = [
  { code: 'V', label: 'Mais de 60 dias' },
  { code: 'A', label: 'Menos de 60 dias' },
  { code: 'M', label: 'Menos de 30 dias' },
  { code: 'L', label: 'Menos de 15 dias' },
  { code: 'V', label: 'Venceu' },
];

export const TIPO_CONTA_BANCARIA = [
  { code: 'A', label: 'Aplicação' },
  { code: 'C', label: 'Conta corrente' },
  { code: 'P', label: 'Poupança' },
];

export const CATEGORIA_FORNECEDOR = [
  { code: 'F', label: 'Fornecedor' },
  { code: 'C', label: 'Conveniado' },
];

export const STATUS_FORNECEDOR = [
  { code: 'A', label: 'Ativo' },
  { code: 'I', label: 'Inativo' },
];

export const TIPO_FORNECEDOR_COLABORADOR = [
  { code: 'C', label: 'Civil' },
  { code: 'M', label: 'Militar' },
];

export const TIPO_FORNECEDOR_CONTRATO = [
  { code: 'E', label: 'Estagiário' },
  { code: 'C', label: 'Contratado' },
  { code: 'V', label: 'Voluntário civil' },
  { code: 'R', label: 'Militar reserva' },
  { code: 'A', label: 'Militar ativa' },
];

export const STATUS_ESTADO_CIVIL = [
  { code: 'A', label: 'Amasiado' },
  { code: 'C', label: 'Casado' },
  { code: 'D', label: 'Divorciado' },
  { code: 'S', label: 'Solteiro' },
  { code: 'V', label: 'Viuvo' },
];

export const TIPO_RESIDENCIA = [
  { code: 'A', label: 'Alugada' },
  { code: 'P', label: 'Própria' },
];

export const CLIFOR_GRADUACAO = [
  { code: 'ASD', label: 'Aluno Soldado' },
  { code: 'SD', label: 'Soldado' },
  { code: 'CB', label: 'Cabo' },
  { code: 'SGT3', label: '3º Sargento' },
  { code: 'SGT2', label: '2º Sargento' },
  { code: 'SGT1', label: '1º Sargento' },
  { code: 'SBT', label: 'SubTenente' },
  { code: 'AL', label: 'Aluno CFO' },
  { code: 'ASP', label: 'Aspirante a Oficial' },
  { code: '2TN', label: '2º Tenente' },
  { code: '1TN', label: '1º Tenente' },
  { code: 'CP', label: 'Capitão' },
  { code: 'MAJ', label: 'Major' },
  { code: 'TCEL', label: 'Tenente Coronel' },
  { code: 'CEL', label: 'Coronel' },
];

export const CATEGORY_PROFISSIONAL = [
  {
    group: '1. Ciências Agrárias',
    classify: [
      'Agronomia',
      'Biotecnologia',
      'Ecologia',
      'Engenharia Ambiental',
      'Engenharia de Pesca',
      'Engenharia Hídrica',
      'Gestão Ambiental',
      'Geologia',
      'Oceanografia',
      'Engenharia Agrícola',
      'Engenharia de Energia',
      'Engenharia Florestal',
      'Medicina Veterinária',
      'Meteorologia',
      'Zootecnia',
    ],
  },
  {
    group: '2. Ciências Biológicas',
    classify: ['Bioquímica', 'Biofísica', 'Biomedicina', 'Ciências Biológicas'],
  },
  {
    group: '3. Ciências da Saúde',
    classify: [
      'Educação Física',
      'Enfermagem',
      'Estética',
      'Farmácia',
      'Fisioterapia',
      'Fonoaudiologia',
      'Gerontologia',
      'Medicina',
      'Musicoterapia',
      'Nutrição',
      'Obstetrícia',
      'Odontologia',
      'Quiropraxia',
      'Radiologia',
      'Saúde Coletiva',
      'Terapia Ocupacional',
    ],
  },
  {
    group: '4. Ciências Exatas e da Terra',
    classify: [
      'Análise e Desenvolvimento de Sistemas',
      'Astronomia',
      'Ciência da Computação',
      'Estatística',
      'Física',
      'Geofísica',
      'Geologia',
      'Informática Biomédica',
      'Matemática',
      'Meteorologia',
      'Nanotecnologia',
      'Oceanografia',
      'Química',
      'Sistemas de Informação',
    ],
  },
  {
    group: '5. Engenharias',
    classify: [
      'Engenharia Aeronáutica',
      'Engenharia Agrícola',
      'Engenharia Agronômica',
      'Engenharia de Agrimensura e Cartográfica',
      'Engenharia de Alimentos',
      'Engenharia Ambiental e Sanitária',
      'Engenharia Biomédica',
      'Engenharia de Bioprocessos',
      'Engenharia Civil',
      'Engenharia de Computação',
      'Engenharia de Controle e Automação',
      'Engenharia Elétrica',
      'Engenharia Eletrônica',
      'Engenharia de Energia',
      'Engenharia Florestal',
      'Engenharia de Fortificação e Construção',
      'Engenharia Mecânica',
      'Engenharia Mecânica e de Armamento',
      'Engenharia de Materiais',
      'Engenharia de Minas',
      'Engenharia Metalúrgica',
      'Engenharia Naval',
      'Engenharia de Pesca',
      'Engenharia de Produção',
      'Engenharia de Petróleo',
      'Engenharia Química',
      'Engenharia de Software',
      'Engenharia de Telecomunicações',
    ],
  },
  {
    group: '6. Ciências Humanas',
    classify: [
      'Antropologia',
      'Arqueologia',
      'Ciência Política',
      'Filosofia',
      'Geografia',
      'História',
      'Psicologia',
      'Sociologia',
      'Teologia',
    ],
  },
  {
    group: '7. Ciências Sociais Aplicadas',
    classify: [
      'Administração',
      'Recursos Humanos',
      'Arquivologia',
      'Arquitetura e Urbanismo',
      'Biblioteconomia',
      'Ciências Contábeis',
      'Direito',
      'Economia',
      'Educomunicação',
      'Eventos',
      'Jornalismo',
      'Museologia',
      'Pedagogia',
      'Produção Cultural',
      'Produção Editorial',
      'Produção Multimídia',
      'Publicidade e Propaganda',
      'Rádio e TV',
      'Relações Internacionais',
      'Relações Públicas',
      'Secretariado',
      'Serviço Social',
      'Turismo',
    ],
  },
  {
    group: '8. Linguística, Letras e Artes',
    classify: [
      'Artes Cênicas',
      'Artes Plásticas',
      'Cinema',
      'Dança',
      'Design',
      'Design de Games',
      'Design Gráfico',
      'Design de Moda',
      'Design de Interiores',
      'Design de Produto',
      'Fotografia',
      'História da Arte',
      'Linguística',
      'Letras',
      'Moda',
      'Música',
      'Teatro',
      'Tradução e Interpretação',
    ],
  },
];

export const ACTIVITY_OPTIONS = [
  {
    value: 'activityComments',
    label: 'Email ref. a produtos e serviços',
  },
  {
    value: 'activityAnswers',
    label: 'Email ref. a promoções de produtos',
  },
  { value: 'activityFollows', label: 'Receber alertas de lojas parceiras' },
] as const;

export const APPLICATION_OPTIONS = [
  { value: 'applicationNews', label: 'Notícias e anuncios' },
  { value: 'applicationProduct', label: 'Atualizações semanais de produtos' },
  { value: 'applicationBlog', label: 'Novidades e artigos' },
] as const;

export const TIPO_FORNECEDOR = [
  { code: 'F', label: 'Física' },
  { code: 'J', label: 'Jurídica' },
];

export const _tipoStatusCPL = [
  { id: 1, code: 'A', label: 'Ativo' },
  { id: 2, code: 'E', label: 'Encerrado' },
  { id: 3, code: 'J', label: 'Juridico' },
  { id: 3, code: 'N', label: 'Anulado no compras Net' },
  { id: 3, code: 'R', label: 'Renovado' },
  { id: 3, code: 'Q', label: 'Arquivado' },
];

export const TIPO_MODALIDADE_CPL = [
  { code: '1', label: 'Carta Convite' },
  { code: '2', label: 'Cotação Eletrônica' },
  { code: '3', label: 'Concorrência' },
  { code: '4', label: 'Concurso' },
  { code: '5', label: 'Credenciamento' },
  { code: '6', label: 'Dispensa' },
  { code: '7', label: 'Pregão Eletrônico' },
  { code: '8', label: 'Pregão Presencial' },
  { code: '9', label: 'Leilão' },
  { code: '10', label: 'SRP' },
  { code: '11', label: 'Inegibilidade' },
];

export const TIPO_GRUPO_FLUXO = [
  { code: 'D', label: 'Despesas' },
  { code: 'I', label: 'Disponivel' },
  { code: 'F', label: 'Financeiro' },
  { code: 'P', label: 'Patrimonial' },
  { code: 'R', label: 'Receitas' },
];

export const TIPO_CENTRO_CUSTO = [
  { code: 'DE', label: 'Departamento' },
  { code: 'PE', label: 'Pessoa' },
  { code: 'SE', label: 'Seção' },
  { code: 'PR', label: 'Processo' },
];

export const TIPO_NATUREZA = [
  { code: 'C', label: 'Crédito' },
  { code: 'D', label: 'Débito' },
];

export const TIPO_CONTABIL = [
  { code: 'S', label: 'Sintético' },
  { code: 'A', label: 'Analitica' },
];

export const TIPO_SEXO = [
  { code: 'M', label: 'Masculino' },
  { code: 'F', label: 'Feminino' },
];

export const TIPO_MOVIMENTO_COI = [
  { code: '', label: 'Nenhum' },
  { code: 'C', label: 'Compras' },
  { code: 'V', label: 'Vendas' },
  { code: 'DV', label: 'Devolução vendas' },
  { code: 'DC', label: 'Devolução compras' },
];

export const TIPO_RELIGIAO = [
  { code: 'N', label: 'Nenhum' },
  { code: 'C', label: 'Católico' },
  { code: 'E', label: 'Evangélico' },
  { code: 'P', label: 'Espirita' },
  { code: 'F', label: 'Afro brasileiro' },
  { code: 'O', label: 'Outras' },
  { code: 'A', label: 'Ateu' },
  { code: 'J', label: 'Judaica' },
];

export const TIME_FUTEBOL = [
  { code: 'N', label: 'Nenhum' },
  { code: 'A', label: 'Águia' },
  { code: 'I', label: 'Itupiranga' },
  { code: 'P', label: 'Paragominas' },
  { code: 'Y', label: 'Paysandu' },
  { code: 'R', label: 'Remo' },
  { code: 'T', label: 'Tapajos' },
  { code: 'L', label: 'Tuna luso' },
  { code: 'O', label: 'Outros' },
];

export const CATEGORY_COI_OPTION = [
  {
    group: 'A-Vendas',
    classify: [
      'A1-Venda frente de caixa',
      'A2-Venda com entrega futura',
      'A4-Nota originada cupom fiscal',
      'A5-Fatura remessa consignação',
      'A6-Condicional',
      'A7-Nota para gerar condicional',
      'A8-Conversão de venda em entrega futura',
    ],
  },
  {
    group: 'B-Remessas',
    classify: [
      'B1-Remessa para concerto',
      'B2-Remessa venda entrega futura',
      'B3-Remessa para troca',
      'B4-Remessa para consignação',
      'B5-Remessa para ordem terceiro',
      'B6-Remessa para transporte',
    ],
  },
  {
    group: 'C-Compras',
    classify: [
      'C1-Compra nota fiscal',
      'C2-Compra emissão nota fiscal',
      'C3-Entrada remessa consignação',
      'C4-Fatura remessa consignada',
      'C5-Compra antecipada',
      'C6-Remessa Compra antecipada',
      'C7-Conhecimento de frete',
      'C8-Compra para uso consumo',
    ],
  },
  {
    group: 'D-Devoluções',
    classify: [
      'D1-Devolução remessa consulta',
      'D2-Devolução de compra',
      'D3-Devolução de venda',
      'D4-Devolução de remessa consignado',
      'D5-Devolução de condicional',
      'D6-Devolução de venda futura',
      'D7-Devolução de remessa de venda',
    ],
  },
  { group: 'E-Estoque avulso', classify: ['E1-Lançamento avulso estoque', 'E2-Perda de estoque'] },
  {
    group: 'F-Transferencias',
    classify: [
      'F1-Transferência para revenda',
      'F2-Transf ativo imobilizado',
      'F3-Transf uso de consumo',
      'F4-Transf via depósito',
    ],
  },
  { group: 'G-Despesas', classify: ['G1-Despesas diversas'] },
  {
    group: 'H-Outros',
    classify: [
      'H1-Outras',
      'H2-Entradas para demonstrações',
      'H3-Bonificações',
      'H4-Garantias',
      'H5-Conhecimento de frete',
    ],
  },
];
