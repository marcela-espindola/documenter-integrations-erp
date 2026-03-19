/**
 * commonConfig.ts
 * ─────────────────────────────────────────────────────────────
 * Dados COMUNS a todas as integrações ERP.
 * Altere aqui para refletir automaticamente em todas as documentações.
 * ─────────────────────────────────────────────────────────────
 */

// ── Contato Audaces ───────────────────────────────────────────
export const AUDACES_CONTACT = {
  name: "Marcela Espindola",
  email: "integrations@audaces.com",
};

// ── Benefícios (idênticos em todas as integrações) ────────────
export const COMMON_BENEFITS = {
  team: [
    "Economia de tempo: Automatize tarefas manuais como criação e atualização de fichas técnicas.",
    "Colaboração integrada: Sincronize informações entre design, produção e gestão.",
  ],
  company: [
    "Redução de custos: Minimize desperdícios com dados centralizados e precisos.",
    "Escalabilidade: Prepare sua operação para atender volumes maiores com a mesma eficiência.",
    "Decisões estratégicas: Acesse relatórios mais completos e otimize a alocação de recursos.",
  ],
};

// ── Steps do Audaces IDEA (steps 1, 2 e 4 são idênticos) ─────
export const IDEA_BASE_STEPS = {
  runAsAdmin: {
    title: "Executar como administrador",
    content:
      'Clique com o botão direito do mouse sobre o ícone do sistema e selecione "Executar como administrador".',
  },
  openSettings: {
    title: "Acessar configurações",
    content: "Clique em Arquivo, depois em Configurações e Opções.",
  },
  configureTimeout: {
    title: "Configurar timeout",
    content:
      "Na opção Conexão, insira o tempo em segundos para o limite de resposta (padrão: 300).",
  },
};

/**
 * Monta o array completo de steps do IDEA.
 * Passe `serverContent` e/ou `advancedContent` para customizar por ERP.
 */
export function buildIdeaConfigSteps(options?: {
  serverContent?: string;
  advancedContent?: string;
}) {
  return [
    IDEA_BASE_STEPS.runAsAdmin,
    IDEA_BASE_STEPS.openSettings,
    {
      title: "Configurar servidor ERP",
      content:
        options?.serverContent ??
        "Clique em Rede para localizar a opção: Configuração do servidor ERP. Configure: Tipo = Integração Padrão; Endereço = IP do Web Service; Porta = Porta do Web Service; Usuário = seu nome de usuário.",
    },
    IDEA_BASE_STEPS.configureTimeout,
    {
      title: "Configurações avançadas",
      content:
        options?.advancedContent ??
        'Clique no ícone ao lado de integração padrão e selecione: "Enviar todos os campos que não sejam padrão como campos personalizados" e "manter vínculo com o ERP".',
    },
  ];
}

// ── Uso – Inserir modelo (quase idêntico em todos) ────────────
export const COMMON_INSERT_MODEL_STEPS = [
  "Abra a sua Ficha Modelo no Audaces Idea. Clique em Arquivo > Novo > Nova ficha modelo.",
  "Clique em Inserir Referência e escolha a referência de Modelo no ERP e clique em buscar.",
  'Selecione a opção "inserir como modelo principal" e clique em Abrir.',
  "Confirme a ação clicando em Sim.",
  "O Audaces Idea mostrará os campos importados do seu ERP.",
];

export const COMMON_INSERT_VARIANT_STEPS = [
  "Selecione a ferramenta Adicionar variante na aba Modelo.",
  "Clique no botão Adicionar variante, selecione a cor e clique em Aplicar.",
  "Repita para as demais variantes.",
];

// ── Uso – Inserir referência (instruções idênticas) ───────────
export const COMMON_SEARCH_INSTRUCTIONS = [
  'Código/Referência: digite o nome do "item" ou o código no campo Nome/Código ERP.',
  "Descrição: Digite a descrição do item no ERP no campo descrição.",
];

export const COMMON_INSERT_REFERENCE_STEPS = [
  "Clique na ferramenta Inserir Referência na barra lateral.",
  "Clique no botão ERP à esquerda da janela.",
  "Selecione a categoria da referência.",
  "Insira o código ou descrição e clique em buscar.",
  "Ao clicar em Abrir, escolha a variação desejada.",
  'Se for para todas as variantes, marque "inserir no modelo".',
  'Se for específica de uma variante, desmarque "inserir no modelo" e selecione apenas a variante.',
];

// ── Criar/Atualizar produtos (base comum) ─────────────────────
export const COMMON_UPDATE_STEPS = [
  "Faça as alterações necessárias na ficha e clique em Atualizar Ficha na paleta Início.",
  'Ao usar "Salvar como", você pode manter o vínculo com o ERP para atualizar automaticamente.',
  "Se não mantiver o vínculo, um novo modelo será criado ao clicar em Criar Ficha.",
];

// ── Texto de introdução base ──────────────────────────────────
export function buildIntroduction(erpName: string): string {
  return `A Audaces, presente em mais de 70 países, é referência em inovação tecnológica para a indústria da moda. Nossa parceria com a ${erpName} trouxe uma integração poderosa entre o ERP ${erpName} e o software Audaces IDEA, um sistema que combina desenho técnico e ficha técnica de forma integrada.`;
}
