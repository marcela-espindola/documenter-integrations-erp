import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Section, Documentation, IntegratedField, Step } from '../types/doc';
import {
  Lock, LogOut, Plus, Trash2, Eye,
  Save, CheckCircle, GripVertical, X, ChevronDown, ChevronUp, Upload
} from 'lucide-react';
import { AUDACES_CONTACT } from '@/data/commonConfig';

// ── Credentials (altere aqui) ─────────────────────────────────
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'audaces2025';

const CATEGORIES = ['Produto', 'Material', 'Operação', 'Serviços', 'Instrução de lavagem', 'Outro'];
const DEFAULT_SECTION_TITLES = [
  'Iniciando a integração', 'Funcionamento', 'Campos integrados',
  'Configuração ERP', 'Configuração IDEA', 'Uso da integração',
  'Criar produtos', 'Visualização no ERP',
];

function makeId() { return Math.random().toString(36).substr(2, 9); }
function makeStep(): Step { return { id: makeId(), text: '' }; }
function makeSection(title = ''): Section {
  return { id: makeId(), title, description: '', steps: [], fields: [], noteType: 'info', noteContent: '' };
}

// ─────────────────────────────────────────────────────────────
// Login Screen
// ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem('admin_auth', '1');
      onLogin();
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border p-10">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
            <Lock size={24} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-slate-800 text-center mb-1">Admin</h1>
        <p className="text-xs text-slate-400 text-center mb-8 font-medium tracking-wide uppercase">Audaces · Integrações ERP</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Usuário</label>
            <input
              value={user} onChange={e => setUser(e.target.value)} autoFocus
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Senha</label>
            <input
              type="password" value={pass} onChange={e => setPass(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <div className="text-red-600 text-xs bg-red-50 border border-red-200 p-3 rounded-xl text-center font-medium">
              {error}
            </div>
          )}
          <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200">
            Entrar no painel
          </button>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step Card (with image upload + resize)
// ─────────────────────────────────────────────────────────────
function StepCard({ step, index, onUpdate, onRemove }: {
  step: Step; index: number;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 1400;
      const scale = img.width > MAX ? MAX / img.width : 1;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
      onUpdate('image', canvas.toDataURL('image/jpeg', 0.88));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border-b">
        <GripVertical size={13} className="text-slate-300 cursor-grab" />
        <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
          {index + 1}
        </div>
        <span className="text-xs text-slate-500 font-semibold flex-1">Passo {index + 1}</span>
        <button onClick={onRemove} className="text-slate-300 hover:text-red-500 transition-colors p-1">
          <X size={13} />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <textarea
          value={step.text}
          placeholder={`Instrução do passo ${index + 1}...`}
          rows={2}
          className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
          onChange={e => onUpdate('text', e.target.value)}
        />
        {/* Image */}
        {step.image ? (
          <div className="relative group inline-block">
            <img
              src={step.image}
              alt={`Passo ${index + 1}`}
              className="max-h-52 rounded-lg border object-contain"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity flex items-center justify-center gap-2">
              <button onClick={() => fileRef.current?.click()} className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors">
                Trocar imagem
              </button>
              <button onClick={() => onUpdate('image', undefined)} className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-red-600 transition-colors">
                Remover
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-lg py-3 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
          >
            <Upload size={14} />
            Adicionar print / screenshot ao passo
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section Card
// ─────────────────────────────────────────────────────────────
function SectionCard({ sec, index, onUpdate, onAddStep, onUpdateStep, onRemoveStep }: {
  sec: Section; index: number;
  onUpdate: (field: string, value: any) => void;
  onAddStep: () => void;
  onUpdateStep: (stepId: string, field: string, val: any) => void;
  onRemoveStep: (stepId: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div
        className="flex items-center gap-3 px-6 py-4 bg-slate-50 border-b cursor-pointer select-none hover:bg-slate-100 transition-colors"
        onClick={() => setCollapsed(c => !c)}
      >
        <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow">
          {index + 1}
        </span>
        <input
          value={sec.title}
          onClick={e => e.stopPropagation()}
          onChange={e => onUpdate('title', e.target.value)}
          className="flex-1 bg-transparent font-semibold text-sm text-slate-700 outline-none border-b border-transparent focus:border-blue-400"
          placeholder="Título da seção"
        />
        <span className="text-xs text-slate-400 mr-2">{sec.steps.length} passo(s)</span>
        {collapsed ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronUp size={16} className="text-slate-400" />}
      </div>

      {!collapsed && (
        <div className="p-6 space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-1.5 block">Descrição</label>
            <textarea
              value={sec.description}
              placeholder="Texto introdutório desta seção..."
              rows={3}
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-slate-50"
              onChange={e => onUpdate('description', e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-400 uppercase">Passos com prints</label>
              <button
                onClick={onAddStep}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
              >
                <Plus size={12} /> Novo passo
              </button>
            </div>
            {sec.steps.length === 0 ? (
              <div
                className="text-center py-8 text-slate-300 text-xs border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-300 hover:text-blue-400 transition-colors"
                onClick={onAddStep}
              >
                <Upload size={20} className="mx-auto mb-2 opacity-50" />
                Clique para adicionar o primeiro passo
              </div>
            ) : (
              <div className="space-y-3">
                {sec.steps.map((step, i) => (
                  <StepCard
                    key={step.id} step={step} index={i}
                    onUpdate={(field, val) => onUpdateStep(step.id, field, val)}
                    onRemove={() => onRemoveStep(step.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Fields table (for "Campos" sections) */}
          {sec.title.toLowerCase().includes('campos') && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-400 uppercase">Campos ERP</label>
                <button
                  onClick={() => onUpdate('fields', [...(sec.fields || []), { erpField: '', category: 'Produto', required: false }])}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full"
                >
                  <Plus size={12} /> Novo campo
                </button>
              </div>
              <div className="space-y-2">
                {(sec.fields || []).map((f, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 bg-slate-50 p-2 rounded-lg items-center border">
                    <select
                      className="col-span-4 text-xs border rounded-lg px-2 py-1.5 bg-white"
                      value={f.category}
                      onChange={e => {
                        const flds = [...(sec.fields || [])]; flds[i].category = e.target.value; onUpdate('fields', flds);
                      }}
                    >
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <input
                      value={f.erpField} placeholder="Nome do campo"
                      className="col-span-6 text-xs border rounded-lg px-2 py-1.5 bg-white"
                      onChange={e => {
                        const flds = [...(sec.fields || [])]; flds[i].erpField = e.target.value; onUpdate('fields', flds);
                      }}
                    />
                    <div className="col-span-1 flex justify-center">
                      <input type="checkbox" checked={f.required} title="Obrigatório"
                        onChange={e => {
                          const flds = [...(sec.fields || [])]; flds[i].required = e.target.checked; onUpdate('fields', flds);
                        }}
                      />
                    </div>
                    <button className="col-span-1 text-red-400 hover:text-red-600 flex justify-center"
                      onClick={() => {
                        const flds = [...(sec.fields || [])]; flds.splice(i, 1); onUpdate('fields', flds);
                      }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          <div>
            {sec.noteContent === '' ? (
              <button
                onClick={() => onUpdate('noteContent', ' ')}
                className="text-xs text-slate-400 hover:text-blue-500 transition-colors"
              >
                + Adicionar nota de destaque
              </button>
            ) : (
              <div className={`flex gap-3 items-start p-3 rounded-xl border-l-4 ${
                sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400' :
                sec.noteType === 'success' ? 'bg-green-50 border-green-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <select
                  value={sec.noteType}
                  className="bg-transparent border-none font-bold text-xs cursor-pointer outline-none shrink-0"
                  onChange={e => onUpdate('noteType', e.target.value)}
                >
                  <option value="info">ℹ Info</option>
                  <option value="warning">⚠ Aviso</option>
                  <option value="success">✓ Ok</option>
                </select>
                <input
                  value={sec.noteContent}
                  placeholder="Texto da nota..."
                  className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                  onChange={e => onUpdate('noteContent', e.target.value)}
                />
                <button onClick={() => onUpdate('noteContent', '')} className="text-slate-400 hover:text-slate-700 shrink-0">
                  <X size={13} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Admin Component
// ─────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.03');
  const [erpEmail, setErpEmail] = useState('');
  const [erpPhone, setErpPhone] = useState('');
  const [erpWhatsApp, setErpWhatsApp] = useState('');
  const [audacesName, setAudacesName] = useState(AUDACES_CONTACT.name);
  const [audacesEmail, setAudacesEmail] = useState(AUDACES_CONTACT.email);
  const [savedDocs, setSavedDocs] = useState<Documentation[]>([]);
  const [sections, setSections] = useState<Section[]>(() =>
    DEFAULT_SECTION_TITLES.map(t => makeSection(t))
  );
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setSavedDocs(JSON.parse(localStorage.getItem('docs') || '[]'));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setEditingId(null); setTitle(''); setErp(''); setVersion('2025.03');
    setErpEmail(''); setErpPhone(''); setErpWhatsApp('');
    setAudacesName(AUDACES_CONTACT.name); setAudacesEmail(AUDACES_CONTACT.email);
    setSections(DEFAULT_SECTION_TITLES.map(t => makeSection(t)));
  };

  const handleEdit = (doc: Documentation) => {
    setEditingId(doc.id); setTitle(doc.title); setErp(doc.erp); setVersion(doc.version);
    setErpEmail(doc.erpEmail || ''); setErpPhone(doc.erpPhone || ''); setErpWhatsApp(doc.erpWhatsApp || '');
    setAudacesName(doc.audacesName || AUDACES_CONTACT.name); setAudacesEmail(doc.audacesEmail || AUDACES_CONTACT.email);
    setSections(doc.sections);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Excluir esta documentação?')) return;
    const updated = savedDocs.filter(d => d.id !== id);
    localStorage.setItem('docs', JSON.stringify(updated));
    setSavedDocs(updated);
    if (editingId === id) resetForm();
    showToast('Documentação excluída.');
  };

  const updateSection = (id: string, field: string, value: any) =>
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));

  const addStep = (sid: string) =>
    setSections(prev => prev.map(s => s.id === sid ? { ...s, steps: [...s.steps, makeStep()] } : s));

  const updateStep = (sid: string, stepId: string, field: string, val: any) =>
    setSections(prev => prev.map(s =>
      s.id === sid ? { ...s, steps: s.steps.map(st => st.id === stepId ? { ...st, [field]: val } : st) } : s
    ));

  const removeStep = (sid: string, stepId: string) =>
    setSections(prev => prev.map(s =>
      s.id === sid ? { ...s, steps: s.steps.filter(st => st.id !== stepId) } : s
    ));

  const handleSave = () => {
    if (!erp.trim()) { showToast('Informe o nome do ERP.'); return; }
    const doc: Documentation = {
      id: editingId || erp.toLowerCase().replace(/\s+/g, '-'),
      title, erp, version, erpEmail, erpPhone, erpWhatsApp, audacesName, audacesEmail, sections,
    };
    const updated = editingId
      ? savedDocs.map(d => d.id === editingId ? doc : d)
      : [...savedDocs, doc];
    localStorage.setItem('docs', JSON.stringify(updated));
    setSavedDocs(updated);
    if (!editingId) setEditingId(doc.id);
    showToast(editingId ? 'Documentação atualizada!' : 'Nova documentação publicada!');
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-slate-100 pb-32">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle size={16} className="text-green-400" /> {toast}
        </div>
      )}

      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium">← Voltar ao site</Link>
            <span className="text-slate-200">|</span>
            <span className="text-sm font-bold text-slate-700">Painel Admin</span>
            {editingId && (
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Editando: {erp}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {editingId && (
              <Link to={`/view/${editingId}`} target="_blank"
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors"
              >
                <Eye size={12} /> Visualizar
              </Link>
            )}
            <button
              onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthed(false); }}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 transition-colors font-medium"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Saved docs */}
        {savedDocs.length > 0 && (
          <div className="bg-white rounded-2xl border p-5 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase mb-3">Documentações salvas</p>
            <div className="flex flex-wrap gap-2">
              {savedDocs.map(d => (
                <div key={d.id} className="flex items-center gap-0.5 bg-slate-100 rounded-full pl-3 pr-1 py-1 border">
                  <button onClick={() => handleEdit(d)} className="text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors mr-1">
                    {d.erp}
                  </button>
                  <Link to={`/view/${d.id}`} target="_blank" className="p-1 text-slate-400 hover:text-blue-500 transition-colors" title="Visualizar">
                    <Eye size={11} />
                  </Link>
                  <button onClick={() => handleDelete(d.id)} className="p-1 text-slate-300 hover:text-red-500 transition-colors" title="Excluir">
                    <Trash2 size={11} />
                  </button>
                </div>
              ))}
              <button onClick={resetForm} className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors border border-blue-200">
                + Nova documentação
              </button>
            </div>
          </div>
        )}

        {/* Header form */}
        <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden border-t-4 ${editingId ? 'border-t-orange-400' : 'border-t-blue-600'}`}>
          <div className="px-6 py-4 border-b bg-slate-50">
            <h2 className="font-bold text-slate-700 text-sm">
              {editingId ? 'Editando documentação' : 'Nova documentação'}
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Título', val: title, set: setTitle, ph: 'Ex: Manual de Integração' },
                { label: 'ERP *', val: erp, set: setErp, ph: 'Ex: Totvs Moda', bold: true },
                { label: 'Versão', val: version, set: setVersion, ph: '2025.03', center: true },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1.5 block">{f.label}</label>
                  <input
                    value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all ${f.bold ? 'font-bold' : ''} ${f.center ? 'text-center' : ''}`}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-500 uppercase border-b pb-2">Contatos do ERP</p>
                {[
                  { ph: 'E-mail suporte', val: erpEmail, set: setErpEmail },
                  { ph: 'Telefone', val: erpPhone, set: setErpPhone },
                  { ph: 'WhatsApp', val: erpWhatsApp, set: setErpWhatsApp },
                ].map(f => (
                  <input key={f.ph} value={f.val} placeholder={f.ph}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onChange={e => f.set(e.target.value)}
                  />
                ))}
              </div>
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-blue-500 uppercase border-b pb-2">Contatos Audaces</p>
                <input value={audacesName} placeholder="Responsável" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setAudacesName(e.target.value)} />
                <input value={audacesEmail} placeholder="E-mail" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setAudacesEmail(e.target.value)} />
                <p className="text-xs text-slate-400 italic">Pré-preenchido via commonConfig.ts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((sec, i) => (
            <div key={sec.id} className="relative group">
              <SectionCard
                sec={sec} index={i}
                onUpdate={(field, val) => updateSection(sec.id, field, val)}
                onAddStep={() => addStep(sec.id)}
                onUpdateStep={(stepId, field, val) => updateStep(sec.id, stepId, field, val)}
                onRemoveStep={(stepId) => removeStep(sec.id, stepId)}
              />
              <button
                onClick={() => {
                  if (!confirm('Remover esta seção?')) return;
                  setSections(prev => prev.filter(s => s.id !== sec.id));
                }}
                className="absolute -top-2 -right-2 hidden group-hover:flex w-6 h-6 bg-red-500 text-white rounded-full items-center justify-center shadow hover:bg-red-600 transition-colors"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSections(prev => [...prev, makeSection('Nova seção')])}
          className="w-full border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl py-4 text-sm text-slate-400 hover:text-blue-500 font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Adicionar seção
        </button>
      </div>

      {/* Save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {sections.length} seção(ões) · {sections.reduce((a, s) => a + s.steps.length, 0)} passo(s) · {sections.reduce((a, s) => a + s.steps.filter(st => st.image).length, 0)} print(s)
          </p>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            <Save size={16} />
            {editingId ? 'Salvar alterações' : 'Publicar documentação'}
          </button>
        </div>
      </div>
    </div>
  );
}
