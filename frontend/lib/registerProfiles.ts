// Registration forms — single source of the three account types
// (Miro "Cadastro" frames: Corretor PF, Imobiliária PJ, Proprietário PF).
// Consumed by `components/RegisterForm.tsx`. Every `name` is the matching
// Strapi `up_users` attribute, so the request payload needs no mapping table:
// see backend/src/extensions/users-permissions/content-types/user/schema.json.

export type RegisterProfileId = 'proprietario' | 'corretor' | 'imobiliaria'

export type RegisterFieldIcon =
  | 'user'
  | 'id'
  | 'calendar'
  | 'briefcase'
  | 'building'
  | 'mapPin'
  | 'home'
  | 'document'
  | 'mail'
  | 'phone'
  | 'lock'
  | 'globe'
  | 'map'

export type RegisterMask = 'cpf' | 'cnpj' | 'phone' | 'cep'

export interface RegisterField {
  /** Strapi attribute name — it is sent to the API verbatim. */
  name: string
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'date' | 'select'
  mask?: RegisterMask
  icon?: RegisterFieldIcon
  required?: boolean
  placeholder?: string
  options?: readonly string[]
  /** Columns of 6 on lg (2 = a third, 3 = half, 4 = two thirds, 6 = full). */
  span?: 2 | 3 | 4 | 6
}

export interface RegisterSection {
  step: number
  title: string
  fields: readonly RegisterField[]
}

/** Plain string, or a link rendered inside the consent sentence. */
export type ConsentPart = string | { label: string; href: string }

export interface RegisterConsent {
  name: string
  parts: readonly ConsentPart[]
  required?: boolean
}

export interface RegisterProfile {
  id: RegisterProfileId
  banner: {
    /** PESSOA FÍSICA / PESSOA JURÍDICA */
    eyebrow: string
    /** "Cadastro de" */
    titleLead: string
    /** The orange half of the title. */
    titleAccent: string
    subtitle: string
    image: string
    imageAlt: string
  }
  sections: readonly RegisterSection[]
  consents: readonly RegisterConsent[]
  submitLabel: string
  footerNote: string
}

export const UF_LIST = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const

export const VINCULOS_PROFISSIONAIS = [
  'Autônomo(a)',
  'Imobiliária',
  'Construtora / Incorporadora',
  'Outro',
] as const

const TERMS_LINK = { label: 'Termos de Uso', href: '/termos' }
const PRIVACY_LINK = { label: 'Política de Privacidade', href: '/privacidade' }

/**
 * The address block is identical in the three frames — only the step number and
 * the heading change (residencial vs comercial).
 */
const addressSection = (step: number, title: string): RegisterSection => ({
  step,
  title,
  fields: [
    { name: 'cep', label: 'CEP', mask: 'cep', icon: 'mapPin', required: true, placeholder: '00000-000', span: 3 },
    { name: 'logradouro', label: 'Logradouro (Rua/Avenida)', icon: 'mapPin', required: true, placeholder: 'Digite o logradouro', span: 3 },
    { name: 'numero', label: 'Número', icon: 'home', required: true, placeholder: 'Nº', span: 2 },
    { name: 'complemento', label: 'Complemento (opcional)', icon: 'document', placeholder: 'Apartamento, casa, bloco, etc.', span: 4 },
    { name: 'bairro', label: 'Bairro', icon: 'mapPin', required: true, placeholder: 'Digite o bairro', span: 2 },
    { name: 'cidade', label: 'Cidade', icon: 'building', required: true, placeholder: 'Digite a cidade', span: 2 },
    { name: 'estado', label: 'Estado (UF)', icon: 'map', type: 'select', required: true, placeholder: 'Selecione a UF', options: UF_LIST, span: 2 },
  ],
})

const passwordSection = (step: number): RegisterSection => ({
  step,
  title: 'Segurança da conta',
  fields: [
    { name: 'password', label: 'Criar senha', type: 'password', icon: 'lock', required: true, placeholder: 'Digite sua senha', span: 3 },
    { name: 'confirmar_senha', label: 'Confirmar senha', type: 'password', icon: 'lock', required: true, placeholder: 'Confirme sua senha', span: 3 },
  ],
})

const personalDataSection = (step: number): RegisterSection => ({
  step,
  title: 'Dados pessoais',
  fields: [
    { name: 'nome_completo', label: 'Nome completo', icon: 'user', required: true, placeholder: 'Digite seu nome completo', span: 3 },
    { name: 'cpf', label: 'CPF', mask: 'cpf', icon: 'id', required: true, placeholder: '000.000.000-00', span: 3 },
    { name: 'rg', label: 'RG (opcional)', icon: 'id', placeholder: 'Digite seu RG', span: 3 },
    { name: 'data_nascimento', label: 'Data de nascimento', type: 'date', icon: 'calendar', required: true, span: 3 },
  ],
})

export const REGISTER_CORRETOR: RegisterProfile = {
  id: 'corretor',
  banner: {
    eyebrow: 'Pessoa física',
    titleLead: 'Cadastro de',
    titleAccent: 'Corretor de Imóveis',
    subtitle:
      'Preencha seus dados para começar a anunciar e administrar imóveis na plataforma Alugue na Hora.',
    image: '/img-2.jpg',
    imageAlt: 'Corretor de imóveis usando o celular',
  },
  sections: [
    personalDataSection(1),
    {
      step: 2,
      title: 'Dados profissionais',
      fields: [
        { name: 'creci', label: 'Número do CRECI', icon: 'id', required: true, placeholder: 'Digite seu número de registro', span: 3 },
        { name: 'creci_uf', label: 'UF do CRECI', icon: 'map', type: 'select', required: true, placeholder: 'Selecione a UF', options: UF_LIST, span: 3 },
        { name: 'nome_profissional', label: 'Nome profissional ou comercial (opcional)', icon: 'building', placeholder: 'Como deseja ser identificado', span: 3 },
        { name: 'vinculo_profissional', label: 'Vínculo profissional', icon: 'briefcase', type: 'select', required: true, placeholder: 'Selecione o vínculo', options: VINCULOS_PROFISSIONAIS, span: 3 },
        { name: 'nome_imobiliaria', label: 'Nome da imobiliária (se vinculado)', icon: 'building', placeholder: 'Digite o nome da imobiliária (opcional)', span: 3 },
        { name: 'creci_imobiliaria', label: 'CRECI da imobiliária (se vinculado)', icon: 'id', placeholder: 'Número do CRECI da imobiliária (opcional)', span: 3 },
      ],
    },
    addressSection(3, 'Endereço residencial'),
    {
      step: 4,
      title: 'Informações de contato',
      fields: [
        { name: 'email', label: 'E-mail', type: 'email', icon: 'mail', required: true, placeholder: 'seu@email.com', span: 2 },
        { name: 'celular', label: 'Telefone celular / WhatsApp', mask: 'phone', icon: 'phone', required: true, placeholder: '(00) 00000-0000', span: 2 },
        { name: 'telefone_alternativo', label: 'Telefone alternativo (opcional)', mask: 'phone', icon: 'phone', placeholder: '(00) 00000-0000', span: 2 },
      ],
    },
    passwordSection(5),
  ],
  consents: [
    {
      name: 'declaracao_veracidade',
      required: true,
      parts: [
        'Declaro que as informações fornecidas são verdadeiras e que possuo registro profissional válido para o exercício da corretagem imobiliária.',
      ],
    },
    {
      name: 'declaracao_autorizacao_imoveis',
      required: true,
      parts: [
        'Declaro que os imóveis anunciados por mim possuem a autorização necessária para divulgação e intermediação.',
      ],
    },
    {
      name: 'aceite_termos',
      required: true,
      parts: ['Li e concordo com os ', TERMS_LINK, ' e com a ', PRIVACY_LINK, ' da plataforma Alugue na Hora.'],
    },
    {
      name: 'autorizacao_comunicacoes',
      parts: [
        'Autorizo o recebimento de comunicações necessárias ao funcionamento da minha conta e à administração dos anúncios.',
      ],
    },
  ],
  submitLabel: 'Criar minha conta',
  footerNote: 'Após o envio, seu cadastro será analisado e entraremos em contato em até 24 horas.',
}

export const REGISTER_IMOBILIARIA: RegisterProfile = {
  id: 'imobiliaria',
  banner: {
    eyebrow: 'Pessoa jurídica',
    titleLead: 'Cadastro de',
    titleAccent: 'Imobiliária',
    subtitle:
      'Preencha os dados da sua imobiliária para começar a anunciar e administrar imóveis na plataforma Alugue na Hora.',
    image: '/modern-facade-hero-1280.webp',
    imageAlt: 'Imobiliária parceira do Alugue na Hora',
  },
  sections: [
    {
      step: 1,
      title: 'Dados da empresa',
      fields: [
        { name: 'razao_social', label: 'Razão Social', icon: 'building', required: true, placeholder: 'Digite a razão social da empresa', span: 3 },
        { name: 'nome_fantasia', label: 'Nome Fantasia (opcional)', icon: 'building', placeholder: 'Digite o nome fantasia', span: 3 },
        { name: 'cnpj', label: 'CNPJ', mask: 'cnpj', icon: 'document', required: true, placeholder: '00.000.000/0000-00', span: 3 },
        { name: 'inscricao_estadual', label: 'Inscrição Estadual (opcional)', icon: 'id', placeholder: 'Digite a inscrição estadual', span: 3 },
      ],
    },
    {
      step: 2,
      title: 'Dados profissionais',
      fields: [
        { name: 'creci', label: 'CRECI PJ', icon: 'id', required: true, placeholder: 'Número do CRECI da imobiliária', span: 3 },
        { name: 'creci_uf', label: 'UF do CRECI', icon: 'map', type: 'select', required: true, placeholder: 'Selecione a UF', options: UF_LIST, span: 3 },
        { name: 'data_fundacao', label: 'Data de fundação (opcional)', type: 'date', icon: 'calendar', span: 3 },
        { name: 'site', label: 'Site da imobiliária (opcional)', icon: 'globe', placeholder: 'www.seusite.com.br', span: 3 },
      ],
    },
    {
      step: 3,
      title: 'Representante legal / responsável',
      fields: [
        { name: 'representante_nome', label: 'Nome completo', icon: 'user', required: true, placeholder: 'Digite o nome completo', span: 3 },
        { name: 'representante_cargo', label: 'Cargo / Função', icon: 'briefcase', required: true, placeholder: 'Ex.: Sócio, Diretor, Administrador', span: 3 },
        { name: 'representante_cpf', label: 'CPF', mask: 'cpf', icon: 'id', required: true, placeholder: '000.000.000-00', span: 2 },
        { name: 'representante_rg', label: 'RG (opcional)', icon: 'id', placeholder: 'Digite o RG', span: 2 },
        { name: 'representante_data_nascimento', label: 'Data de nascimento (opcional)', type: 'date', icon: 'calendar', span: 2 },
      ],
    },
    addressSection(4, 'Endereço comercial'),
    {
      step: 5,
      title: 'Informações de contato',
      fields: [
        { name: 'email', label: 'E-mail', type: 'email', icon: 'mail', required: true, placeholder: 'seu@empresa.com.br', span: 2 },
        { name: 'telefone', label: 'Telefone comercial', mask: 'phone', icon: 'phone', required: true, placeholder: '(00) 0000-0000', span: 2 },
        { name: 'celular', label: 'Telefone celular / WhatsApp', mask: 'phone', icon: 'phone', required: true, placeholder: '(00) 00000-0000', span: 2 },
      ],
    },
    passwordSection(6),
  ],
  consents: [
    {
      name: 'declaracao_veracidade',
      required: true,
      parts: [
        'Declaro que as informações fornecidas são verdadeiras e que a empresa possui registro válido no CRECI.',
      ],
    },
    {
      name: 'aceite_termos',
      required: true,
      parts: ['Li e concordo com os ', TERMS_LINK, ' e com a ', PRIVACY_LINK, ' da plataforma Alugue na Hora.'],
    },
    {
      name: 'autorizacao_comunicacoes',
      parts: [
        'Autorizo o recebimento de comunicações necessárias ao funcionamento da minha conta e à administração dos anúncios.',
      ],
    },
    {
      name: 'declaracao_autorizacao_imoveis',
      required: true,
      parts: ['Declaro que possuo autorização para anunciar os imóveis cadastrados na plataforma.'],
    },
  ],
  submitLabel: 'Criar minha conta',
  footerNote: 'Após o envio, seu cadastro será analisado e nossa equipe entrará em contato em até 24 horas.',
}

export const REGISTER_PROPRIETARIO: RegisterProfile = {
  id: 'proprietario',
  banner: {
    eyebrow: 'Pessoa física',
    titleLead: 'Cadastro de',
    titleAccent: 'Proprietário',
    subtitle: 'Preencha seus dados para começar a anunciar seu imóvel.',
    image: '/og-default.jpg',
    imageAlt: 'Casa moderna anunciada no Alugue na Hora',
  },
  sections: [
    personalDataSection(1),
    addressSection(2, 'Endereço residencial'),
    {
      step: 3,
      title: 'Informações de contato',
      fields: [
        { name: 'email', label: 'E-mail', type: 'email', icon: 'mail', required: true, placeholder: 'seu@email.com', span: 2 },
        { name: 'celular', label: 'Telefone celular / WhatsApp', mask: 'phone', icon: 'phone', required: true, placeholder: '(00) 00000-0000', span: 2 },
        { name: 'telefone_alternativo', label: 'Telefone alternativo (opcional)', mask: 'phone', icon: 'phone', placeholder: '(00) 00000-0000', span: 2 },
      ],
    },
    passwordSection(4),
  ],
  consents: [
    {
      name: 'declaracao_veracidade',
      required: true,
      parts: ['Declaro que as informações fornecidas são verdadeiras.'],
    },
    {
      name: 'aceite_termos',
      required: true,
      parts: ['Li e concordo com os ', TERMS_LINK, ' e com a ', PRIVACY_LINK, ' da plataforma Alugue na Hora.'],
    },
    {
      name: 'autorizacao_comunicacoes',
      parts: [
        'Autorizo o recebimento de comunicações necessárias ao funcionamento da minha conta e à administração dos meus imóveis.',
      ],
    },
  ],
  submitLabel: 'Criar minha conta',
  footerNote: 'Após o envio, seu cadastro será analisado e entraremos em contato em até 24 horas.',
}

export const REGISTER_PROFILES: Record<RegisterProfileId, RegisterProfile> = {
  corretor: REGISTER_CORRETOR,
  imobiliaria: REGISTER_IMOBILIARIA,
  proprietario: REGISTER_PROPRIETARIO,
}
