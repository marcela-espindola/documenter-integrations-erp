import {
  AUDACES_CONTACT,
  COMMON_BENEFITS,
  COMMON_INSERT_MODEL_STEPS,
  COMMON_INSERT_VARIANT_STEPS,
  COMMON_SEARCH_INSTRUCTIONS,
  COMMON_INSERT_REFERENCE_STEPS,
  COMMON_UPDATE_STEPS,
  buildIdeaConfigSteps,
  buildIntroduction,
} from "./commonConfig";

export interface ERPIntegration {
  id: string;
  name: string;
  version: string;
  description: string;
  introduction: string;
  benefits: { team: string[]; company: string[] };
  contact: {
    erp: { name?: string; email?: string; phone?: string; whatsapp?: string };
    audaces: { name: string; email: string };
  };
  integrationDetails: {
    description: string;
    importFeatures: string[];
    exportDescription: string;
    exportFeatures: string[];
    notes: string[];
  };
  integratedFields: {
    columns: string[];
    data: Record<string, string[]>;
    note: string;
  };
  erpConfiguration?: {
    title: string;
    steps: { title: string; content: string; substeps?: string[] }[];
  };
  ideaConfiguration: {
    steps: { title: string; content: string; substeps?: string[] }[];
  };
  usage: {
    insertModel: string[];
    configureVariant: string;
    insertVariant: string[];
    insertReference: {
      description: string;
      categories: { key: string; value: string }[];
      searchInstructions: string[];
      steps: string[];
    };
  };
  createProducts: { create: string[]; update?: string[] };
  visualization: {
    title: string;
    sections: { title: string; description: string }[];
  };
}

export const erpIntegrations: ERPIntegration[] = [
  // ─────────────────────────────────────────────
  // TOTVS MODA
  // ─────────────────────────────────────────────
  {
    id: "totvs-moda",
    name: "Totvs Moda",
    version: "2024.12",
    description: "Integração entre Audaces IDEA e ERP Totvs Moda (Virtual Age)",
    introduction: buildIntroduction("Totvs"),
    benefits: COMMON_BENEFITS,
    contact: {
      erp: {
        email: "adm.virtualage@totvs.com.br",
        whatsapp: "011 2099-8110",
        phone: "011 4003-0015",
      },
      audaces: AUDACES_CONTACT,
    },
    integrationDetails: {
      description:
        "Na primeira etapa, transferimos os dados do Totvs Moda (Virtual Age) para o Audaces Idea, permitindo a visualização das informações diretamente na sua ficha técnica.",
      importFeatures: [
        'Importação de modelos – Importação de "produtos acabados". Permite utilizar campos cadastrados no ERP para criar uma ficha-base ou fichas de repetição.',
        'Importação de materiais – Importação de Produtos do tipo "Matéria-Prima" para compor o pré-custo de forma precisa.',
        'Importação de atividades – Importação do cadastro de "Serviços", contribuindo para o pré-custo.',
        "Importação de referências genéricas – Traz informações de instruções de produto, vinculando dados à tela de instruções do protótipo.",
      ],
      exportDescription:
        "Na segunda etapa, exportamos todas as informações da ficha técnica do Audaces Idea para o Totvs Moda (Virtual Age). Isso inclui detalhes como classificações do produto, consumos de materiais, serviços, campos adicionais, composição do produto, tabela de medidas, além de imagens relacionadas.",
      exportFeatures: [
        'Criação da ficha – Inclusão/Criação de "Protótipos" com os consumos e serviços por "produto acabado" ou por "grade".',
        'Atualização da ficha – Atualização de "Protótipos" com os consumos e serviços por "produto acabado" ou por "grade".',
      ],
      notes: [
        "Envio para o ERP: A criação ou atualização de produtos no ERP inclui automaticamente a importação de todos os métodos mencionados na busca para o seu sistema.",
        "Integração de medidas: Se você integrar a modelagem com a ficha técnica, ou seja, importar as medidas para o Audaces IDEA, poderá também enviar essas medidas diretamente para o ERP.",
        "Criação de matéria-prima: O cadastro de matéria-prima e serviços deve ser realizado diretamente no Totvs Moda para garantir a consistência dos dados.",
      ],
    },
    integratedFields: {
      columns: ["Produto Acabado", "Matéria-Prima", "Fluxo/Processos"],
      data: {
        "Produto Acabado": ["Coleção", "Cor", "Composição do produto", "Configurador", "Empresa", "Fornecedores", "Grade", "Tamanho", "Unidade de medida", "Classificações de produto"],
        "Matéria-Prima": ["Aplicação de matéria-prima", "Composição", "Código Reduzido", "Cor", "Descrição", "Fornecedor", "Preço", "Tamanho", "Estoque", "Unidade de medida", "Classificações do produto"],
        "Fluxo/Processos": ["Aplicação de serviços", "Empresa", "Preço", "Tempo"],
      },
      note: "Os campos importados podem variar de acordo com as classificações definidas nos produtos, matérias-primas e serviços.",
    },
    erpConfiguration: {
      title: "Configurando a integração no Totvs Moda",
      steps: [
        {
          title: "Liberação de endpoints",
          content: "Para garantir o sucesso da integração, sua empresa precisa confirmar que os seguintes endpoints da Totvs estão devidamente liberados:",
          substeps: [
            "Login: /api/totvsmoda/authorization/v2/token",
            "ProductSearch: /api/totvsmoda/product/v2/products/search",
            "ReferencesSearch: /api/totvsmoda/product/v2/references/search",
            "ServiceSearch: /api/totvsmoda/product-engineering/v2/services/search",
            "GridSearch: /api/totvsmoda/product/v2/grid",
            "ClassificationSearch: /api/totvsmoda/product/v2/classifications",
            "CostsSearch: /api/totvsmoda/product/v2/costs/search",
            "PriceSearch: /api/totvsmoda/product/v2/prices/search",
            "PostGarment: /api/totvsmoda/product-prototype/v2/prototypes",
            "PostGarmentUpdate: /api/totvsmoda/product-prototype/v2/prototypes/update",
            "GetPicture: /api/totvsmoda/image/v2/product/search",
            "PostPicture: /api/totvsmoda/product-prototype/v2/prototypes",
            "ColorSearch: /api/totvsmoda/product/v2/colors/search",
            "ApplicationSearch: /api/totvsmoda/product-engineering/v2/applications/search",
            "PrototypeSearch: /api/totvsmoda/product-prototype/v2/prototypes/search",
            "BalanceSearch: /api/totvsmoda/product/v2/balances/search",
            "AdditionalFieldsSearch: /api/totvsmoda/product/v2/additional-fields-types",
            "CompositionsSearch: /api/totvsmoda/product/v2/compositions",
            "InstructionSearch: /api/totvsmoda/product/v2/instruction-items",
            "ConfigurationSearch: /api/totvsmoda/product/v2/product-grouper-configuration",
          ],
        },
        {
          title: "Instalação do serviço",
          content: "Após confirmar a liberação dos endpoints com a equipe da Totvs, entre em contato com a equipe de integrações da Audaces para iniciar o processo de instalação.",
          substeps: [
            'Transfira a pasta do instalador enviada pela equipe Audaces para o disco local "C:".',
            "Clique com o botão direito no arquivo CreateService e escolha a opção executar como administrador.",
            "Acesse os Serviços do Windows e encontre o serviço chamado Audaces API Totvs.",
            "Clique com o botão direito sobre o serviço e selecione Propriedades.",
            "Altere o tipo de inicialização para automático.",
            "Clique em Iniciar para ativar o serviço.",
          ],
        },
        {
          title: "Configurações da integração",
          content: "Para configurar a integração, acesse a pasta em disco local C do serviço da API recém-instalado, abra o arquivo appsettings e configure os parâmetros:",
          substeps: [
            'Localize o endereço da API utilizado e ajuste-o até a parte final "/api".',
            "Grant_type: Método de login na API, conforme padrão da Totvs.",
            "Branch: Código da empresa usado para importar dados do ERP.",
            'Client_id: Código "cliente_id" fornecido pela Totvs.',
            'Client_secret: Código "client_secret" fornecido pela Totvs.',
            "Use_material_grade: True = Registra consumo por tamanho; False = Registra apenas por cor.",
            "Use_reference_code: True = Importa todas as variantes; False = Importa apenas código reduzido.",
            "Label_with_código_reduzido: True = Adiciona código reduzido ao nome; False = Mostra apenas nome.",
            "Service_value: True = Permite editar preço do serviço; False = Mantém preço fixo da Totvs.",
          ],
        },
      ],
    },
    ideaConfiguration: { steps: buildIdeaConfigSteps() },
    usage: {
      insertModel: COMMON_INSERT_MODEL_STEPS,
      configureVariant:
        "Para criar variações do modelo, selecione Configurar Variante na aba Modelo. No caso da Totvs, o campo que gerencia a variante é o campo Cor ou Cor/Tamanho. Se quiser desenvolver por tamanho, selecione em variante: Cor e em sub-variante 1: Tamanho.",
      insertVariant: COMMON_INSERT_VARIANT_STEPS,
      insertReference: {
        description: "Adicione as referências de matérias-primas, fluxos (processos), combinações e medidas para montar sua ficha técnica.",
        categories: [
          { key: "Qualquer", value: "Instruções" },
          { key: "Modelo", value: "Produto acabado" },
          { key: "Material", value: "Matéria-prima" },
          { key: "Atividade", value: "Serviços" },
        ],
        searchInstructions: COMMON_SEARCH_INSTRUCTIONS,
        steps: COMMON_INSERT_REFERENCE_STEPS,
      },
    },
    createProducts: {
      create: [
        "Após importar seus consumos e definir processos, clique em Criar Ficha na paleta Início.",
        "Confirme o envio ao servidor ERP clicando em Sim.",
        "O sistema informará o código do protótipo criado.",
        "Um ícone informativo aparecerá na árvore de referência indicando data/hora do envio.",
      ],
      update: COMMON_UPDATE_STEPS,
    },
    visualization: {
      title: "Visualização no Totvs Moda",
      sections: [
        { title: "Classificações de produto", description: "Na tela SPFFM029 do TOTVS Moda, selecione o protótipo desejado e acesse as classificações do produto. Todas as classificações definidas no Audaces Idea serão visualizadas." },
        { title: "Dados de consumo", description: "Na tela de protótipo SDPFM029, em matérias primas, a integração preencherá os materiais utilizados na ficha técnica de acordo com a cor da variante do produto." },
        { title: "Inclusão de serviços", description: "Os serviços cadastrados são preenchidos automaticamente com aplicação e valores." },
        { title: "Tabela de Medidas", description: "As medidas integradas da modelagem serão enviadas diretamente para o ERP." },
        { title: "Composição do protótipo", description: "A composição do produto é transferida automaticamente." },
        { title: "Instruções", description: "As instruções do produto são vinculadas à tela de instruções do protótipo." },
        { title: "Imagem do produto", description: "As imagens relacionadas são transferidas junto com a ficha técnica." },
      ],
    },
  },

  // ─────────────────────────────────────────────
  // ORGANIZA
  // ─────────────────────────────────────────────
  {
    id: "organiza",
    name: "Organiza",
    version: "2025.03",
    description: "Integração entre Audaces IDEA e ERP Organiza Têxtil",
    introduction: buildIntroduction("Organiza"),
    benefits: COMMON_BENEFITS,
    contact: {
      erp: { email: "comercial@organiza.com.br" },
      audaces: AUDACES_CONTACT,
    },
    integrationDetails: {
      description:
        "Na primeira etapa, transferimos os dados do Organiza Têxtil para o Audaces Idea, permitindo a visualização das informações diretamente na sua ficha técnica.",
      importFeatures: [
        "Importação de modelos – Permite utilizar campos cadastrados no ERP para criar uma ficha-base ou fichas de repetição.",
        "Importação de materiais – Para compor o pré-custo de forma precisa.",
      ],
      exportDescription:
        "Na segunda etapa, exportamos todas as informações da ficha técnica do Audaces Idea para o Organiza. Isso inclui detalhes como propriedades do modelo, consumos de materiais.",
      exportFeatures: [
        "Criação da ficha – Gera a ficha técnica no Organiza diretamente a partir do IDEA, tanto para novos modelos quanto para fichas de repetição.",
      ],
      notes: [
        "Envio para o ERP: A criação de produtos no ERP inclui automaticamente a importação de todos os métodos mencionados na busca para o seu sistema.",
        "Criação de matéria-prima: O cadastro de matéria-prima deve ser realizado diretamente no Organiza para garantir a consistência dos dados.",
      ],
    },
    integratedFields: {
      columns: ["Produto", "Material"],
      data: {
        "Produto": ["Código", "Cor", "Cores", "Codigo 2", "Codigo Repetição", "Coleções", "Comp 1"],
        "Material": ["Aplicação", "Composição", "Concentração", "Cor", "Faixa", "Fornecedor", "Gramatura"],
      },
      note: "Os campos importados podem variar de acordo com a empresa. Caso precise inserir algum campo na integração, entre em contato com a Organiza no e-mail: comercial@organiza.com.br",
    },
    ideaConfiguration: { steps: buildIdeaConfigSteps() },
    usage: {
      insertModel: COMMON_INSERT_MODEL_STEPS,
      configureVariant:
        "Para criar variações do modelo, selecione Configurar Variante na aba Modelo. No caso da Organiza, o campo que gerencia a variante é o campo Cor.",
      insertVariant: COMMON_INSERT_VARIANT_STEPS,
      insertReference: {
        description: "Adicione as referências de matérias-primas para montar sua ficha técnica.",
        categories: [
          { key: "Qualquer", value: "Combinações" },
          { key: "Modelo", value: "Produto acabado/Protótipo" },
          { key: "Material", value: "Matéria-prima" },
          { key: "Atividade", value: "Processos" },
          { key: "Grupo de referências", value: "Fluxo" },
          { key: "Medida", value: "Medidas do produto acabado" },
        ],
        searchInstructions: COMMON_SEARCH_INSTRUCTIONS,
        steps: COMMON_INSERT_REFERENCE_STEPS,
      },
    },
    createProducts: {
      create: [
        "Após importar seus consumos, clique em Criar Ficha na paleta Início.",
        "Confirme o envio ao servidor ERP clicando em Sim.",
        "O sistema informará o código do produto criado.",
        "Um ícone informativo aparecerá na árvore de referência indicando data/hora do envio.",
      ],
    },
    visualization: {
      title: "Visualização no Organiza",
      sections: [
        { title: "Propriedades do modelo", description: "O envio da ficha técnica para o Organiza preenche as propriedades do modelo conforme configurado no Audaces Idea." },
        { title: "Consumo de tecidos e aviamentos", description: "Na tela de tecidos e cores, a integração preencherá os tecidos e aviamentos utilizados na ficha técnica de acordo com a cor da variante do produto." },
        { title: "Consumo de insumos", description: "Na tela de materiais, a integração preencherá os materiais/insumos utilizados na ficha técnica." },
        { title: "Dados de variantes", description: "Em combinações, podemos visualizar as variantes criadas e enviadas para o Organiza, tanto variações de cor como de tamanho." },
      ],
    },
  },

  // ─────────────────────────────────────────────
  // PRORIUS
  // ─────────────────────────────────────────────
  {
    id: "prorius",
    name: "Prorius",
    version: "2025.03",
    description: "Integração entre Audaces IDEA e ERP Prorius",
    introduction: buildIntroduction("Prorius"),
    benefits: COMMON_BENEFITS,
    contact: {
      erp: {
        name: "Thiago Alves",
        phone: "(22) 2551-2504 ou (22) 98152-6496",
        email: "comercial@prorius.com.br",
      },
      audaces: AUDACES_CONTACT,
    },
    integrationDetails: {
      description:
        "Na primeira etapa, transferimos os dados do Prorius para o Audaces Idea, permitindo a visualização das informações diretamente na sua ficha técnica.",
      importFeatures: [
        "Importação de modelos – Permite utilizar campos cadastrados no ERP para criar uma ficha-base ou fichas de repetição.",
        "Importação de materiais – Para compor o pré-custo de forma precisa.",
        "Importação de atividades – Traz informações de sequência operacional contribuindo para o pré-custo.",
        "Importação de medidas – Informações de tabela de medidas já cadastradas em um produto para complementar a ficha técnica.",
      ],
      exportDescription:
        "Na segunda etapa, exportamos todas as informações da ficha técnica do Audaces Idea para o Prorius. Isso inclui detalhes como propriedades do modelo, consumos de materiais, sequência operacional, além de imagens relacionadas.",
      exportFeatures: [
        "Criação da ficha – Gera a ficha técnica no Prorius diretamente a partir do IDEA, tanto para novos modelos quanto para fichas de repetição.",
        "Atualização da ficha – Atualiza a ficha técnica e os dados do produto com base nas alterações realizadas no Audaces.",
      ],
      notes: [
        "Envio para o ERP: A criação ou atualização de produtos no ERP inclui automaticamente a importação de todos os métodos mencionados na busca para o seu sistema.",
        "Criação de matéria-prima: O cadastro de matéria-prima e processos deve ser realizado diretamente no Dapic para garantir a consistência dos dados.",
      ],
    },
    integratedFields: {
      columns: ["Produto", "Material", "Operações", "Medidas"],
      data: {
        "Produto": ["Coleção", "Cor", "Descrição", "Grade", "Grupo", "Linha", "Marca", "Observações", "Referência interna", "Responsável"],
        "Material": ["Cor", "Código", "Custo", "Descrição", "Grupo", "Observações", "Preço trabalho", "Tamanho", "Uni. Compra", "Sub-grupo"],
        "Operações": ["Código", "Descrição", "Custo", "Máquina", "Tipo da operação", "Tempo", "Unidade de tempo", "medida", "Tamanho", "Unidade de medida"],
        "Medidas": ["Tam. Medida", "Observações", "Uni. Medida", "Obs."],
      },
      note: "Os campos importados podem variar de acordo com a empresa. Caso precise inserir algum campo na integração, entre em contato no e-mail: pcp@prorius.com.br",
    },
    erpConfiguration: {
      title: "Configurando a integração no Prorius",
      steps: [
        {
          title: "Configurar o servidor Prorius",
          content: "Acesse a pasta no servidor: C:\\Prodata\\Indsis\\WebService\\ e localize o arquivo webserviceaudaces.ini. Informe o servidor do banco de dados e o caminho do banco de dados.",
          substeps: [
            "Servidor: Informe o IP ou nome do servidor onde o Gestor ProData está hospedado, ou informe como localhost caso o banco esteja local.",
            "Servername: Informe o caminho da pasta onde está o banco + nome do arquivo (ex: C:\\Indsis\\Bancos de Dados\\indsis.fdb).",
          ],
        },
        {
          title: "Instalando a API",
          content: "Acesse C:\\Prodata\\Indsis\\WebService\\, localize o arquivo Install.bat e execute como administrador.",
          substeps: [
            'Clique com o botão direito do mouse sobre o arquivo e selecione "Executar como administrador".',
            "Após a instalação, sua integração estará pronta para uso!",
          ],
        },
      ],
    },
    ideaConfiguration: {
      steps: buildIdeaConfigSteps({
        serverContent:
          "Clique em Rede para localizar a opção: Configuração do servidor ERP. Configure: Tipo = Integração Padrão; Endereço = IP da API; Porta = 5000; Usuário = seu nome de usuário.",
        advancedContent:
          'Clique no ícone ao lado de integração padrão e selecione: "Enviar todos os campos que não sejam padrão como campos personalizados" e "Sempre manter vínculo com ERP".',
      }),
    },
    usage: {
      insertModel: COMMON_INSERT_MODEL_STEPS,
      configureVariant:
        "Para criar variações do modelo, selecione Configurar Variante na aba Modelo. No caso da Prorius, os campos que gerenciam a variante são Cor e Tamanho. Selecione em variante: Cor e em Subvariante 1: Tamanho.",
      insertVariant: [
        "Selecione a ferramenta Adicionar variante na aba Modelo.",
        "Clique no botão Adicionar variante, selecione se deseja inserir cor ou tamanho.",
        "Selecione a informação e clique em Aplicar.",
      ],
      insertReference: {
        description: "Adicione as referências de matérias-primas, operações e medidas para montar sua ficha técnica.",
        categories: [
          { key: "Qualquer", value: "Busca tudo: materiais, atividades, medidas" },
          { key: "Modelo", value: "Produto acabado" },
          { key: "Material", value: "Matéria-prima" },
          { key: "Atividade", value: "Importação de Operações" },
          { key: "Medida", value: "Medidas do produto acabado" },
        ],
        searchInstructions: COMMON_SEARCH_INSTRUCTIONS,
        steps: COMMON_INSERT_REFERENCE_STEPS,
      },
    },
    createProducts: {
      create: [
        "Após importar seus consumos e definir processos, clique em Criar Ficha na paleta Início.",
        "Confirme o envio ao servidor ERP clicando em Sim.",
        "O sistema informará que a ficha do produto foi criada.",
        "Um ícone informativo aparecerá na árvore de referência indicando data/hora do envio.",
      ],
      update: COMMON_UPDATE_STEPS,
    },
    visualization: {
      title: "Visualização no Prorius (Dapic)",
      sections: [
        { title: "Propriedades do modelo", description: "Além de preencher as propriedades do modelo, o envio da ficha técnica para o Dapic também adiciona as cores e grade." },
        { title: "Dados de consumo", description: "Na tela de ficha técnica - consumos, a integração preencherá os materiais utilizados de acordo com a cor da variante do produto, além de preencher o processo de produção." },
        { title: "Dados de rota de produção", description: "Na tela de ficha técnica – rota de produção, a integração preencherá as operações utilizadas, além de preencher o tempo e custo da operação." },
      ],
    },
  },

  // ─────────────────────────────────────────────
  // SISPLAN
  // ─────────────────────────────────────────────
  {
    id: "sisplan",
    name: "Sisplan",
    version: "2025.03",
    description: "Integração entre Audaces IDEA e ERP Sisplan",
    introduction: buildIntroduction("Sisplan"),
    benefits: COMMON_BENEFITS,
    contact: {
      erp: {
        phone: "(47) 9286-7872",
        email: "integracoes@sisplansistemas.com.br",
      },
      audaces: AUDACES_CONTACT,
    },
    integrationDetails: {
      description:
        "Na primeira etapa, transferimos os dados do Sisplan para o Audaces Idea, permitindo a visualização das informações diretamente na sua ficha técnica.",
      importFeatures: [
        "Importação de modelos – Permite utilizar campos cadastrados no ERP para criar uma ficha-base ou fichas de repetição.",
        "Importação de materiais – Para compor o pré-custo de forma precisa.",
        "Importação de atividades – Traz informações de fluxo operacional/processos, contribuindo para o pré-custo.",
        "Importação de medidas – Importa as medidas do modelo cadastradas no ERP, facilitando a definição de consumo.",
        "Importação de referências genéricas – Traz combinações cadastradas, vinculando dados à tela de combinações do Sisplan.",
      ],
      exportDescription:
        "Na segunda etapa, exportamos todas as informações da ficha técnica do Audaces Idea para o Sisplan. Isso inclui detalhes como propriedades do modelo, consumos de materiais, processos e fluxos de produção, além de imagens relacionadas.",
      exportFeatures: [
        "Criação da ficha – Gera a ficha técnica no Sisplan diretamente a partir do IDEA, tanto para novos modelos quanto para fichas de repetição.",
        "Atualização da ficha – Atualiza a ficha técnica e os dados do produto com base nas alterações realizadas no Audaces.",
      ],
      notes: [
        "Envio para o ERP: A criação ou atualização de produtos no ERP inclui automaticamente a importação de todos os métodos mencionados na busca para o seu sistema.",
        "Integração de medidas: Se você integrar a modelagem com a ficha técnica, poderá enviar essas medidas diretamente para o ERP.",
        "Criação de matéria-prima: O cadastro de matéria-prima e processos deve ser realizado diretamente no Sisplan para garantir a consistência dos dados.",
      ],
    },
    integratedFields: {
      columns: ["Produto", "Material", "Fluxo/Processos"],
      data: {
        "Produto": ["Categoria", "Cliente", "Cores", "Codigo 2", "Codigo Repetição", "Coleções", "Comp 1", "Descrição", "Estilista", "Etiqueta", "Faixa", "Grupo", "Linha", "Marca", "Modelista", "Ncm", "Sexo", "Status", "Unidade de medida"],
        "Material": ["Aplicação", "Composição", "Concentração", "Cor", "Faixa", "Fornecedor", "Gramatura", "Largura", "Observação", "Parte", "Preço", "Setor", "Unidade de Medida"],
        "Fluxo/Processos": ["Descrição", "Fluxo", "Ordem", "Parte", "Setor", "Preço", "Tabela de Preço", "Tempo"],
      },
      note: "Os campos importados podem variar de acordo com a empresa. Caso precise inserir algum campo na integração, entre em contato com a Sisplan no e-mail: integracoes@sisplansistemas.com.br",
    },
    erpConfiguration: {
      title: "Configurando a integração no Sisplan",
      steps: [
        {
          title: "Instalação",
          content: "Baixe o aplicativo Download NSSM e coloque-o na pasta raiz do Sisplan. Execute o CMD como administrador e navegue até a pasta raiz do Sisplan.",
          substeps: [
            "No prompt, digite: nssm.exe install e pressione ENTER.",
            "No painel NSSM service installer, configure: Path = C:\\Sisplan\\VAPI\\SisplanAudaces.exe; Startup directory = C:\\Sisplan; Arguments = /service 10448; Service name = SISPLAN_AUDACES_10448.",
            "Clique em INSTALL SERVICE para instalar o serviço.",
          ],
        },
        {
          title: "Configurar servidor da API",
          content: "Na pasta raiz do Sisplan, coloque o executável APISisplanAudaces.exe e execute-o.",
          substeps: [
            'Configure o banco na aba "Banco de Dados" com as informações do Sisplan.ini.',
            'Na aba "Servidor", coloque usuário e senha "sisplan" e defina a porta (padrão: 10448).',
            'Clique em "Salvar configuração" e feche a API.',
          ],
        },
        {
          title: "Configurações da integração",
          content: 'Acesse a aba "AUDACES" na API recém-instalada e configure os parâmetros:',
          substeps: [
            "Trabalha com Protótipo: Ative quando o cliente trabalhar com protótipos no sistema.",
            "Utiliza Fluxo: Ative quando o cliente trabalhar com fluxo no sistema.",
            "Preço por variante: Média de todas as movimentações da Mat Iten por código e cor.",
            "Gerar log arquivo: Selecione quando precisar salvar log das requisições.",
            'Código Status: Preencha com o código do status "Desenvolvimento".',
            "Ficha Repetição: Preencha caso utilize fichas de repetição (concatena letra ao código original).",
            "Preço Material: CADCORTI (preço terceirização por cor) ou MATPRECO (uso interno).",
            "Geração de código: SEQUENCIAL (código sequencial) ou DINÂMICO (baseado em Categoria, Marca, Coleção, etc.).",
          ],
        },
      ],
    },
    ideaConfiguration: {
      steps: buildIdeaConfigSteps({
        advancedContent:
          'Clique no ícone ao lado de integração padrão e selecione: "Enviar todos os campos que não sejam padrão como campos personalizados".',
      }),
    },
    usage: {
      insertModel: COMMON_INSERT_MODEL_STEPS,
      configureVariant:
        "Para criar variações do modelo, selecione Configurar Variante na aba Modelo. No caso da Sisplan, o campo que gerencia a variante é o campo Cor.",
      insertVariant: COMMON_INSERT_VARIANT_STEPS,
      insertReference: {
        description: "Adicione as referências de matérias-primas, fluxos (processos), combinações e medidas para montar sua ficha técnica.",
        categories: [
          { key: "Qualquer", value: "Combinações" },
          { key: "Modelo", value: "Produto acabado/Protótipo" },
          { key: "Material", value: "Matéria-prima" },
          { key: "Atividade", value: "Processos" },
          { key: "Grupo de referências", value: "Fluxo" },
          { key: "Medida", value: "Medidas do produto acabado" },
        ],
        searchInstructions: COMMON_SEARCH_INSTRUCTIONS,
        steps: COMMON_INSERT_REFERENCE_STEPS,
      },
    },
    createProducts: {
      create: [
        "Após importar seus consumos e definir processos, clique em Criar Ficha na paleta Início.",
        "Confirme o envio ao servidor ERP clicando em Sim.",
        "O sistema informará o código do produto/protótipo criado.",
        "Um ícone informativo aparecerá na árvore de referência indicando data/hora do envio.",
      ],
      update: COMMON_UPDATE_STEPS,
    },
    visualization: {
      title: "Visualização no Sisplan",
      sections: [
        { title: "Propriedades do modelo", description: "O envio da ficha técnica preenche as propriedades do modelo e variantes no Sisplan." },
        { title: "Dados de consumo", description: "A integração preencherá os materiais utilizados na ficha técnica de acordo com a cor da variante do produto." },
        { title: "Dados de fluxo", description: "Os fluxos operacionais são transferidos automaticamente para o Sisplan." },
        { title: "Dados de processo", description: "Os processos individuais são preenchidos com tempos e custos." },
      ],
    },
  },
];
