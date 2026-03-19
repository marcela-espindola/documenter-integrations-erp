import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Documentation, Section } from '@/types/doc';
import { DocHeader } from '@/components/docs/DocHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AUDACES_CONTACT, COMMON_BENEFITS } from '@/data/commonConfig';
import {
  Menu, X, Server, ChevronDown, ChevronRight,
  BookOpen, FileText, Settings, Plug, PlayCircle, Eye,
  CheckCircle2, AlertTriangle, Info, Mail, Phone, MessageCircle,
  ArrowRight, Printer
} from 'lucide-react';

// ── Sidebar sections for admin docs ──────────────────────────
function buildSidebarSections(sections: Section[]) {
  return [
    { id: 'intro', label: 'Introdução' },
    { id: 'benefits', label: 'Benefícios' },
    { id: 'contacts', label: 'Iniciando a integração' },
    ...sections.map(s => ({ id: s.id, label: s.title })),
  ];
}

// ── Sidebar ───────────────────────────────────────────────────
function ViewSidebar({
  doc, activeSection, onSelectSection,
}: {
  doc: Documentation;
  activeSection: string;
  onSelectSection: (id: string) => void;
}) {
  const navSections = buildSidebarSections(doc.sections);

  return (
    <div className="h-full bg-card border-r border-border flex flex-col">
      <ScrollArea className="flex-1">
        <div className="py-4">
          <div className="doc-nav-section-title">Integrações ERP</div>

          {/* ERP entry (always expanded) */}
          <div>
            <button className="w-full doc-nav-item justify-between active">
              <span className="flex items-center gap-2">
                <Server size={16} />
                {doc.erp}
              </span>
              <span className="flex items-center gap-1">
                <span className="doc-erp-badge">{doc.version}</span>
                <ChevronDown size={14} />
              </span>
            </button>

            <div className="ml-4 mt-1 mb-2 border-l-2 border-border pl-2">
              {navSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelectSection(s.id)}
                  className={`w-full doc-nav-item text-xs ${activeSection === s.id ? 'active' : ''}`}
                >
                  <FileText size={14} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// ── Section renderers ─────────────────────────────────────────
function IntroSection({ doc }: { doc: Documentation }) {
  return (
    <div className="doc-section">
      <div className="flex items-center gap-3 mb-2">
        <span className="doc-erp-badge">{doc.version}</span>
      </div>
      <h1 className="doc-heading-1">Integração Audaces IDEA e {doc.erp}</h1>
      <p className="doc-paragraph text-lg">{doc.title}</p>
      <div className="h-px bg-border my-8" />
      <h2 className="doc-heading-2">1. Introdução</h2>
      <p className="doc-paragraph">
        A Audaces, presente em mais de 70 países, é referência em inovação tecnológica para a
        indústria da moda. Nossa parceria com a <strong>{doc.erp}</strong> trouxe uma integração
        poderosa entre o ERP e o software Audaces IDEA, um sistema que combina desenho técnico e
        ficha técnica de forma integrada.
      </p>
      <p className="doc-paragraph">Com esta solução, sua empresa poderá:</p>
      <ul className="doc-list">
        <li>Acelerar o desenvolvimento de produtos.</li>
        <li>Reduzir erros de comunicação entre áreas.</li>
        <li>Melhorar a precisão no controle de custos e processos.</li>
      </ul>
    </div>
  );
}

function BenefitsSection() {
  const benefits = COMMON_BENEFITS;
  return (
    <div className="doc-section">
      <h1 className="doc-heading-1">2. Benefícios comerciais da integração</h1>
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {[
          { title: 'Para sua equipe', items: benefits.team },
          { title: 'Para sua empresa', items: benefits.company },
        ].map(card => (
          <div key={card.title} className="rounded-xl border border-border bg-card p-6">
            <h3 className="doc-heading-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 size={14} className="text-primary" />
              </span>
              {card.title}
            </h3>
            <ul className="space-y-3 mt-4">
              {card.items.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <ArrowRight size={16} className="text-primary shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsSection({ doc }: { doc: Documentation }) {
  const audaces = { name: doc.audacesName || AUDACES_CONTACT.name, email: doc.audacesEmail || AUDACES_CONTACT.email };
  return (
    <div className="doc-section">
      <h1 className="doc-heading-1">3. Iniciando a integração</h1>
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="doc-heading-3">Contato {doc.erp}</h3>
          <p className="doc-paragraph text-sm mb-4">
            Entre em contato com a {doc.erp} para realizar o orçamento da liberação do serviço de integração.
          </p>
          <div className="space-y-2">
            {doc.erpEmail && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} /> {doc.erpEmail}
              </div>
            )}
            {doc.erpPhone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} /> {doc.erpPhone}
              </div>
            )}
            {doc.erpWhatsApp && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle size={14} /> {doc.erpWhatsApp}
              </div>
            )}
            {!doc.erpEmail && !doc.erpPhone && !doc.erpWhatsApp && (
              <p className="text-sm text-muted-foreground italic">Nenhum contato informado.</p>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="doc-heading-3">Contato Audaces</h3>
          <p className="doc-paragraph text-sm mb-4">
            Para sanar dúvidas sobre como funciona a integração por parte da Audaces:
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              {audaces.name}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={14} /> {audaces.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DynamicSection({ sec, index }: { sec: Section; index: number }) {
  const sectionNumber = index + 4; // 1=intro, 2=benefits, 3=contacts, then dynamic

  const calloutClass = {
    info: 'doc-callout-info',
    warning: 'doc-callout-warning',
    success: 'doc-callout-success',
  }[sec.noteType];

  const CalloutIcon = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2,
  }[sec.noteType];

  return (
    <div className="doc-section">
      <h1 className="doc-heading-1">{sectionNumber}. {sec.title}</h1>

      {sec.description && (
        <p className="doc-paragraph">{sec.description}</p>
      )}

      {/* Steps */}
      {sec.steps.length > 0 && (
        <div className="space-y-4 mt-4">
          {sec.steps.map((step, i) => (
            <div key={step.id} className="doc-step">
              <div className="doc-step-number">{i + 1}</div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                {step.image && (
                  <img
                    src={step.image}
                    alt={`Passo ${i + 1}`}
                    className="mt-3 rounded-xl border border-border shadow-sm max-w-full"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fields table */}
      {sec.fields && sec.fields.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Campo</th>
                <th>Obrigatório</th>
              </tr>
            </thead>
            <tbody>
              {sec.fields.map((f, i) => (
                <tr key={i}>
                  <td>{f.category}</td>
                  <td className="font-medium">{f.erpField}</td>
                  <td className="text-center">
                    {f.required
                      ? <CheckCircle2 size={14} className="text-primary mx-auto" />
                      : <span className="text-muted-foreground">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Note */}
      {sec.noteContent && sec.noteContent.trim() && (
        <div className={calloutClass}>
          <div className="flex items-start gap-2">
            <CalloutIcon size={16} className="shrink-0 mt-0.5" />
            <p className="text-sm">{sec.noteContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Print view (full doc, one page per section) ───────────────
function PrintView({ doc }: { doc: Documentation }) {
  const audaces = { name: doc.audacesName || AUDACES_CONTACT.name, email: doc.audacesEmail || AUDACES_CONTACT.email };
  const benefits = COMMON_BENEFITS;

  return (
    <div id="print-area">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; top: 0; left: 0; width: 100%; }
          .print-page-break { page-break-before: always; break-before: page; }
          .print-avoid-break { page-break-inside: avoid; break-inside: avoid; }
          @page { margin: 18mm 20mm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        @media screen { #print-area { display: none; } }
      `}</style>

      {/* Cover */}
      <div className="print-avoid-break p-12 font-sans">
        <div className="bg-blue-600 text-white rounded-2xl px-10 py-12 mb-8">
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
            Audaces IDEA · Documentação de Integração
          </p>
          <h1 className="text-5xl font-black tracking-tight leading-none mb-2">{doc.erp}</h1>
          <h2 className="text-blue-200 text-lg">{doc.title}</h2>
          <p className="mt-4 text-blue-300 text-xs">Versão {doc.version}</p>
        </div>

        {/* Contacts */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="border rounded-xl p-5">
            <p className="font-bold text-sm mb-3">Contato {doc.erp}</p>
            {doc.erpEmail && <p className="text-sm text-gray-500">✉ {doc.erpEmail}</p>}
            {doc.erpPhone && <p className="text-sm text-gray-500">📞 {doc.erpPhone}</p>}
            {doc.erpWhatsApp && <p className="text-sm text-gray-500">💬 {doc.erpWhatsApp}</p>}
          </div>
          <div className="border rounded-xl p-5 bg-blue-50">
            <p className="font-bold text-sm mb-3 text-blue-700">Contato Audaces</p>
            <p className="text-sm font-semibold">{audaces.name}</p>
            <p className="text-sm text-gray-500">✉ {audaces.email}</p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="print-page-break p-12 font-sans">
        <h2 className="text-2xl font-black mb-4">1. Introdução</h2>
        <div className="h-px bg-blue-200 mb-6" />
        <p className="text-gray-600 leading-relaxed mb-4">
          A Audaces, presente em mais de 70 países, é referência em inovação tecnológica para a indústria da moda.
          Nossa parceria com a <strong>{doc.erp}</strong> trouxe uma integração poderosa entre o ERP e o Audaces IDEA.
        </p>
        <ul className="space-y-2 text-gray-500 pl-4">
          <li>→ Acelerar o desenvolvimento de produtos.</li>
          <li>→ Reduzir erros de comunicação entre áreas.</li>
          <li>→ Melhorar a precisão no controle de custos.</li>
        </ul>
      </div>

      {/* Benefits */}
      <div className="print-page-break p-12 font-sans">
        <h2 className="text-2xl font-black mb-4">2. Benefícios comerciais</h2>
        <div className="h-px bg-blue-200 mb-6" />
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Para sua equipe', items: benefits.team },
            { title: 'Para sua empresa', items: benefits.company },
          ].map(c => (
            <div key={c.title} className="border rounded-xl p-5 print-avoid-break">
              <p className="font-bold text-sm mb-3">{c.title}</p>
              {c.items.map((b, i) => <p key={i} className="text-sm text-gray-500 mb-1">→ {b}</p>)}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic sections */}
      {doc.sections.map((sec, idx) => (
        <div key={sec.id} className="print-page-break p-12 font-sans">
          <h2 className="text-2xl font-black mb-4">{idx + 4}. {sec.title}</h2>
          <div className="h-px bg-blue-200 mb-6" />
          {sec.description && <p className="text-gray-600 mb-6">{sec.description}</p>}

          {sec.steps.map((step, i) => (
            <div key={step.id} className="flex gap-4 mb-6 print-avoid-break">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">{step.text}</p>
                {step.image && (
                  <img src={step.image} alt={`Passo ${i+1}`} className="mt-3 rounded-xl border max-w-full" style={{ maxHeight: '280px', objectFit: 'contain' }} />
                )}
              </div>
            </div>
          ))}

          {sec.fields && sec.fields.length > 0 && (
            <table className="w-full border-collapse text-sm mt-4 print-avoid-break">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 text-left border">Categoria</th>
                  <th className="px-3 py-2 text-left border">Campo</th>
                  <th className="px-3 py-2 text-center border">Obrigatório</th>
                </tr>
              </thead>
              <tbody>
                {sec.fields.map((f, i) => (
                  <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                    <td className="px-3 py-2 border text-gray-500">{f.category}</td>
                    <td className="px-3 py-2 border font-medium">{f.erpField}</td>
                    <td className="px-3 py-2 border text-center">{f.required ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {sec.noteContent?.trim() && (
            <div className={`mt-4 p-4 rounded-xl border-l-4 print-avoid-break ${
              sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400' :
              sec.noteType === 'success' ? 'bg-green-50 border-green-400' :
              'bg-blue-50 border-blue-400'
            }`}>
              <p className="text-sm font-medium">{sec.noteContent}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main DocView ──────────────────────────────────────────────
export default function DocView() {
  const { id } = useParams();
  const [doc, setDoc] = useState<Documentation | null>(null);
  const [activeSection, setActiveSection] = useState('intro');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('docs') || '[]');
    const found = saved.find((d: Documentation) => d.id === id);
    setDoc(found || null);
  }, [id]);

  if (!doc) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">Carregando documentação...</p>
    </div>
  );

  const renderSection = () => {
    if (activeSection === 'intro') return <IntroSection doc={doc} />;
    if (activeSection === 'benefits') return <BenefitsSection />;
    if (activeSection === 'contacts') return <ContactsSection doc={doc} />;
    const secIndex = doc.sections.findIndex(s => s.id === activeSection);
    if (secIndex !== -1) return <DynamicSection sec={doc.sections[secIndex]} index={secIndex} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <DocHeader />

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border shadow-sm"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Print button */}
      <button
        onClick={() => window.print()}
        className="fixed top-[72px] right-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground shadow-sm flex items-center gap-1.5 text-xs font-semibold px-3"
        title="Imprimir / Exportar PDF"
      >
        <Printer size={14} /> PDF
      </button>

      <div className="flex pt-[var(--doc-header-height)]">
        {/* Sidebar */}
        <div className={`
          fixed lg:sticky top-[var(--doc-header-height)] left-0 z-40
          h-[calc(100vh-var(--doc-header-height))] w-[var(--doc-nav-width)]
          transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <ViewSidebar
            doc={doc}
            activeSection={activeSection}
            onSelectSection={(s) => { setActiveSection(s); setSidebarOpen(false); }}
          />
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-foreground/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-8 max-w-4xl animate-in fade-in duration-300">
          {renderSection()}
        </main>
      </div>

      {/* Hidden print area */}
      <PrintView doc={doc} />
    </div>
  );
}
