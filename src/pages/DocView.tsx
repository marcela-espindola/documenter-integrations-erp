import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Documentation } from '@/types/doc';
import { Printer, ArrowLeft, Mail, Phone, MessageCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { AUDACES_CONTACT, COMMON_BENEFITS } from '@/data/commonConfig';

export default function DocView() {
  const { id } = useParams();
  const [doc, setDoc] = useState<Documentation | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('docs') || '[]');
    setDoc(saved.find((d: any) => d.id === id) || null);
  }, [id]);

  const formatText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .split('\n')
      .map(line =>
        line.trim().startsWith('-')
          ? `<li class="ml-5 list-disc mb-1">${line.replace(/^-\s*/, '')}</li>`
          : `<p class="mb-2">${line}</p>`
      )
      .join('');
  };

  if (!doc) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="text-4xl mb-4">📄</div>
        <p className="text-slate-400 font-medium">Carregando documentação...</p>
      </div>
    </div>
  );

  const audacesCt = { name: doc.audacesName || AUDACES_CONTACT.name, email: doc.audacesEmail || AUDACES_CONTACT.email };
  const benefits = COMMON_BENEFITS;

  return (
    <>
      {/* ── Print styles ── */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .page-break { page-break-before: always; break-before: page; }
          .avoid-break { page-break-inside: avoid; break-inside: avoid; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 18mm 20mm; size: A4; }
        }
      `}</style>

      {/* ── Toolbar (hidden on print) ── */}
      <div className="no-print fixed top-4 left-4 flex gap-2 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 bg-white border text-slate-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={12} /> Voltar
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Printer size={12} /> Imprimir / PDF
        </button>
      </div>

      {/* ── Document ── */}
      <div className="max-w-4xl mx-auto px-8 py-16 bg-white min-h-screen text-slate-700 font-sans">

        {/* ══ COVER PAGE ══════════════════════════════════════════ */}
        <section className="mb-0 avoid-break">
          {/* Header stripe */}
          <div className="bg-blue-600 text-white rounded-2xl px-10 py-12 mb-10">
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">Audaces IDEA · Documentação de Integração</p>
            <h1 className="text-5xl font-black tracking-tight leading-none mb-3">{doc.erp}</h1>
            <h2 className="text-blue-200 text-lg font-semibold">{doc.title || `Integração com ${doc.erp}`}</h2>
            <div className="mt-6 flex items-center gap-4">
              <span className="bg-blue-500 text-blue-100 text-xs font-bold px-3 py-1 rounded-full">Versão {doc.version}</span>
              <span className="text-blue-300 text-xs">{new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>

          {/* Contacts */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="border rounded-2xl p-6">
              <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-xs">🏢</span>
                Contato {doc.erp}
              </h3>
              <div className="space-y-2">
                {doc.erpEmail && <div className="flex items-center gap-2 text-sm text-slate-500"><Mail size={13} className="text-blue-400 shrink-0" /> {doc.erpEmail}</div>}
                {doc.erpPhone && <div className="flex items-center gap-2 text-sm text-slate-500"><Phone size={13} className="text-blue-400 shrink-0" /> {doc.erpPhone}</div>}
                {doc.erpWhatsApp && <div className="flex items-center gap-2 text-sm text-slate-500"><MessageCircle size={13} className="text-green-500 shrink-0" /> {doc.erpWhatsApp}</div>}
                {!doc.erpEmail && !doc.erpPhone && !doc.erpWhatsApp && (
                  <p className="text-xs text-slate-300 italic">Nenhum contato informado.</p>
                )}
              </div>
            </div>
            <div className="border rounded-2xl p-6 border-blue-100 bg-blue-50/50">
              <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-xs">🔵</span>
                Contato Audaces
              </h3>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-slate-700">{audacesCt.name}</div>
                <div className="flex items-center gap-2 text-sm text-slate-500"><Mail size={13} className="text-blue-400 shrink-0" /> {audacesCt.email}</div>
              </div>
            </div>
          </div>

          {/* ToC */}
          <div className="border rounded-2xl p-6">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Índice</h3>
            <ol className="space-y-1.5">
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-5 h-5 rounded bg-slate-100 text-xs flex items-center justify-center font-bold text-slate-400">1</span>
                Introdução
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-5 h-5 rounded bg-slate-100 text-xs flex items-center justify-center font-bold text-slate-400">2</span>
                Benefícios comerciais da integração
              </li>
              {doc.sections.map((s, i) => (
                <li key={s.id} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-5 h-5 rounded bg-slate-100 text-xs flex items-center justify-center font-bold text-slate-400">{i + 3}</span>
                  {s.title}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ══ 1. INTRODUÇÃO ════════════════════════════════════════ */}
        <section className="page-break avoid-break">
          <SectionHeader number={1} title="Introdução" />
          <p className="text-base text-slate-600 leading-relaxed mb-4">
            A Audaces, presente em mais de 70 países, é referência em inovação tecnológica para a indústria da moda.
            Nossa parceria com a <strong>{doc.erp}</strong> trouxe uma integração poderosa entre o ERP e o software Audaces IDEA.
          </p>
          <div className="border-l-4 border-slate-200 pl-5 space-y-2 text-slate-500 italic">
            <p>• Acelerar o desenvolvimento de produtos.</p>
            <p>• Reduzir erros de comunicação entre áreas.</p>
            <p>• Melhorar a precisão no controle de custos.</p>
          </div>
        </section>

        {/* ══ 2. BENEFÍCIOS ════════════════════════════════════════ */}
        <section className="page-break avoid-break">
          <SectionHeader number={2} title="Benefícios comerciais da integração" />
          <div className="grid grid-cols-2 gap-4">
            <BenefitCard title="Para sua equipe" items={benefits.team} />
            <BenefitCard title="Para sua empresa" items={benefits.company} />
          </div>
        </section>

        {/* ══ DYNAMIC SECTIONS ═════════════════════════════════════ */}
        {doc.sections.map((sec, idx) => {
          const num = idx + 3;
          const noteStyle = sec.noteType === 'warning'
            ? { bg: 'bg-amber-50', border: 'border-l-amber-400', text: 'text-amber-800', icon: <AlertTriangle size={14} /> }
            : sec.noteType === 'success'
            ? { bg: 'bg-green-50', border: 'border-l-green-400', text: 'text-green-800', icon: <CheckCircle size={14} /> }
            : { bg: 'bg-blue-50', border: 'border-l-blue-400', text: 'text-blue-800', icon: <Info size={14} /> };

          return (
            <section key={sec.id} className="page-break">
              <SectionHeader number={num} title={sec.title} />

              {sec.description && (
                <div
                  className="text-sm text-slate-600 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: formatText(sec.description) }}
                />
              )}

              {/* Steps */}
              {sec.steps.length > 0 && (
                <div className="space-y-6">
                  {sec.steps.map((step, si) => (
                    <div key={step.id} className="avoid-break">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {si + 1}
                        </div>
                        <div className="flex-1">
                          <div
                            className="text-sm text-slate-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: formatText(step.text) }}
                          />
                          {step.image && (
                            <div className="mt-3">
                              <img
                                src={step.image}
                                alt={`Passo ${si + 1}`}
                                className="rounded-xl border max-w-full shadow-sm"
                                style={{ maxHeight: '320px', objectFit: 'contain' }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Fields table */}
              {sec.fields && sec.fields.length > 0 && (
                <div className="mt-6 avoid-break">
                  <table className="w-full border-collapse rounded-xl overflow-hidden text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="px-4 py-2.5 text-left font-semibold text-slate-600 border-b">Categoria</th>
                        <th className="px-4 py-2.5 text-left font-semibold text-slate-600 border-b">Campo</th>
                        <th className="px-4 py-2.5 text-center font-semibold text-slate-600 border-b">Obrigatório</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sec.fields.map((f, fi) => (
                        <tr key={fi} className={fi % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="px-4 py-2.5 text-slate-500 border-b border-slate-100">{f.category}</td>
                          <td className="px-4 py-2.5 text-slate-700 font-medium border-b border-slate-100">{f.erpField}</td>
                          <td className="px-4 py-2.5 text-center border-b border-slate-100">
                            {f.required ? <span className="text-green-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Note */}
              {sec.noteContent && sec.noteContent.trim() && (
                <div className={`mt-5 p-4 rounded-xl border-l-4 ${noteStyle.bg} ${noteStyle.border} ${noteStyle.text} flex gap-3 items-start avoid-break`}>
                  <span className="shrink-0 mt-0.5">{noteStyle.icon}</span>
                  <p className="text-sm font-medium">{sec.noteContent}</p>
                </div>
              )}
            </section>
          );
        })}

        {/* ══ Footer ═══════════════════════════════════════════════ */}
        <div className="mt-16 pt-8 border-t text-center text-xs text-slate-300">
          Gerado em {new Date().toLocaleDateString('pt-BR')} · Audaces Integrações ERP · {doc.version}
        </div>
      </div>
    </>
  );
}

// ── Helper components ─────────────────────────────────────────
function SectionHeader({ number, title }: { number: number; title: string }) {
  return (
    <div className="mb-6 mt-2">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-black text-blue-600">{number}.</span>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent mt-3" />
    </div>
  );
}

function BenefitCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border rounded-2xl p-6 avoid-break">
      <h3 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2">
        <span className="w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xs">→</span>
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((b, i) => (
          <li key={i} className="text-sm text-slate-500 flex gap-2">
            <span className="text-blue-400 mt-0.5 shrink-0">→</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
