
import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const DATA = [
  { pais: "Perú", equipos: "Colombia, Chile, Mexico", experiencia: "11 a 15 años", modalidad: "Híbrido", proporcion: "Equilibrado", estrategia: "Pirámide", justificacion: "Coverage 100% en unitarios", factores: "Costo,Velocidad,Confiabilidad,Facilidad,Tipo de proyecto,Experiencia previa" },
  { pais: "Colombia", equipos: "Colombia", experiencia: "7 a 10 años", modalidad: "Remoto", proporcion: "Equilibrado", estrategia: "Pirámide", justificacion: "Porque el proceso de automatización reduce tiempo y son efectivos", factores: "Velocidad,Confiabilidad" },
  { pais: "Colombia", equipos: "Colombia", experiencia: "4 a 6 años", modalidad: "Remoto", proporcion: "100% Manuales", estrategia: "Pirámide", justificacion: "Permite detectar errores de forma temprana, rápida y económica mediante pruebas unitarias", factores: "Velocidad,Confiabilidad,Cobertura" },
  { pais: "Uruguay", equipos: "Colombia, Mexico, Uruguay, Brasil", experiencia: "4 a 6 años", modalidad: "Híbrido", proporcion: "Equilibrado", estrategia: "Pirámide", justificacion: "Más eficiente, estable, mantenible y económica", factores: "Confiabilidad,Cobertura,Tipo de proyecto,Experiencia previa" },
  { pais: "Colombia", equipos: "Colombia", experiencia: "7 a 10 años", modalidad: "Remoto", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Usando metodología TDD la mayor cantidad de pruebas se realizan rápido", factores: "Velocidad,Cobertura" },
  { pais: "Colombia", equipos: "Colombia, Estados Unidos", experiencia: "11 a 15 años", modalidad: "Híbrido", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Es mucho más fácil de implementar e incluso se puede automatizar", factores: "Costo,Velocidad,Facilidad,Experiencia previa" },
  { pais: "Colombia", equipos: "Colombia", experiencia: "4 a 6 años", modalidad: "Remoto", proporcion: "100% Manuales", estrategia: "Pirámide", justificacion: "Es más estable, rápida y económica a largo plazo", factores: "Costo,Velocidad,Confiabilidad,Facilidad,Tipo de proyecto" },
  { pais: "Colombia", equipos: "Colombia, Estados Unidos, Uruguay", experiencia: "Más de 20 años", modalidad: "Remoto", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Detecta errores temprano, ejecución rápida, menor costo y estabilidad", factores: "Velocidad,Experiencia previa" },
  { pais: "Colombia", equipos: "Colombia", experiencia: "1 a 3 años", modalidad: "Híbrido", proporcion: "100% Manuales", estrategia: "Pirámide", justificacion: "Son más completas, validan aspectos funcionales y no funcionales", factores: "Confiabilidad,Facilidad,Cobertura" },
  { pais: "Colombia", equipos: "Colombia", experiencia: "7 a 10 años", modalidad: "Híbrido", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Para proyectos con cultura DevOps es necesario automatizar", factores: "Costo,Velocidad,Cobertura" },
  { pais: "Colombia", equipos: "Colombia", experiencia: "4 a 6 años", modalidad: "Híbrido", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Detección más temprana de errores, menor costo", factores: "Costo,Velocidad,Confiabilidad,Facilidad,Cobertura,Tipo de proyecto,Experiencia previa" },
  { pais: "Colombia", equipos: "Colombia, Alemania", experiencia: "11 a 15 años", modalidad: "Híbrido", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Proporciona mejor equilibrio entre calidad, oportunidad y costo", factores: "Costo,Confiabilidad,Tipo de proyecto" },
  { pais: "Uruguay", equipos: "Colombia, Argentina, Perú, Estados Unidos, Uruguay", experiencia: "4 a 6 años", modalidad: "Híbrido", proporcion: "Equilibrado", estrategia: "Pirámide", justificacion: "A largo plazo permite reducir costos y mejorar el mantenimiento", factores: "Velocidad,Experiencia previa" },
  { pais: "Uruguay", equipos: "Colombia, Argentina, Estados Unidos, Mexico, Uruguay", experiencia: "7 a 10 años", modalidad: "Híbrido", proporcion: "Equilibrado", estrategia: "Pirámide", justificacion: "Costo inicial alto pero mejor enfoque para proyectos que evolucionan", factores: "Costo,Velocidad,Tipo de proyecto" },
  { pais: "Uruguay", equipos: "Colombia, Argentina, Chile, Estados Unidos, Uruguay", experiencia: "7 a 10 años", modalidad: "Híbrido", proporcion: "Equilibrado", estrategia: "Pirámide", justificacion: "Implementación costosa pero ahorro de costos a largo plazo", factores: "Velocidad,Cobertura,Experiencia previa" },
  { pais: "Uruguay", equipos: "Colombia, Argentina, Chile, Uruguay", experiencia: "4 a 6 años", modalidad: "Híbrido", proporcion: "Equilibrado", estrategia: "Pirámide", justificacion: "Mejor cubrimiento con pruebas unitarias", factores: "Velocidad,Cobertura" },
  { pais: "Colombia", equipos: "Colombia", experiencia: "4 a 6 años", modalidad: "Remoto", proporcion: "70% Manual", estrategia: "Cono", justificacion: "Pruebas E2E más completas, viable en software con cambios frecuentes", factores: "Facilidad,Tipo de proyecto" },
  { pais: "Colombia", equipos: "Colombia, Perú, Ecuador", experiencia: "4 a 6 años", modalidad: "Remoto", proporcion: "100% Manuales", estrategia: "Cono", justificacion: "Buena para proyectos con altas dependencias externas sin acceso al código", factores: "Facilidad,Tipo de proyecto" },
  { pais: "Colombia", equipos: "Colombia, Chile, Estados Unidos", experiencia: "4 a 6 años", modalidad: "Remoto", proporcion: "70% Manual", estrategia: "Cono", justificacion: "Para flujos de UX críticos es mejor mayor cantidad de pruebas E2E", factores: "Facilidad,Cobertura,Experiencia previa" },
  { pais: "Colombia", equipos: "Colombia, Estados Unidos", experiencia: "11 a 15 años", modalidad: "Híbrido", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Eficiente, escalable y sostenible. Detección temprana reduce costos. Se integra en CI/CD", factores: "Costo,Velocidad,Confiabilidad,Facilidad,Cobertura,Tipo de proyecto,Experiencia previa" },
  { pais: "Chile", equipos: "Colombia, Argentina, Mexico, Paraguay, Uruguay", experiencia: "11 a 15 años", modalidad: "Remoto", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Más eficiente en tiempo y recursos. Optimiza flujo del proyecto", factores: "Velocidad,Confiabilidad,Cobertura,Tipo de proyecto" },
  { pais: "Colombia", equipos: "Colombia, Argentina, Chile, Perú, Mexico, Paraguay, Uruguay", experiencia: "4 a 6 años", modalidad: "Remoto", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Prevenir comportamientos errados del cliente con muchas situaciones posibles", factores: "Costo,Velocidad,Confiabilidad,Facilidad,Cobertura,Tipo de proyecto" },
  { pais: "Colombia", equipos: "Colombia, China", experiencia: "1 a 3 años", modalidad: "Híbrido", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Las estrategias deben tener una jerarquía que la pirámide ofrece", factores: "Facilidad,Tipo de proyecto" },
  { pais: "Colombia", equipos: "Colombia, Chile, Perú, Mexico", experiencia: "11 a 15 años", modalidad: "Remoto", proporcion: "70% Automatizado", estrategia: "Pirámide", justificacion: "Rapidez", factores: "Velocidad" },
  { pais: "Colombia", equipos: "Colombia, Chile, Perú", experiencia: "4 a 6 años", modalidad: "Remoto", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Es más útil para cubrir escenarios internos", factores: "Confiabilidad,Cobertura" },
  { pais: "Colombia", equipos: "Colombia, Chile, Perú", experiencia: "4 a 6 años", modalidad: "Remoto", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Combinación adecuada de niveles logra validación robusta. Detección temprana", factores: "Costo,Velocidad,Confiabilidad,Cobertura" },
  { pais: "Colombia", equipos: "Colombia, Perú", experiencia: "4 a 6 años", modalidad: "Remoto", proporcion: "Equilibrado", estrategia: "Pirámide", justificacion: "Permite detectar fallos tempranamente al poder implementar TDD", factores: "Costo,Cobertura" },
  { pais: "Colombia", equipos: "Colombia", experiencia: "1 a 3 años", modalidad: "Remoto", proporcion: "70% Manual", estrategia: "Pirámide", justificacion: "Permite detectar errores antes, más rápido y más barato", factores: "Costo,Facilidad" },
  { pais: "Colombia", equipos: "Colombia, Argentina, Chile, Mexico", experiencia: "4 a 6 años", modalidad: "Remoto", proporcion: "Equilibrado", estrategia: "Pirámide", justificacion: "Más efectivo probar granularmente las piezas que componen el sistema", factores: "Costo,Velocidad,Confiabilidad,Experiencia previa" },
  { pais: "Colombia", equipos: "Colombia", experiencia: "1 a 3 años", modalidad: "Híbrido", proporcion: "100% Manuales", estrategia: "Pirámide", justificacion: "Mayor cobertura con pruebas unitarias desde el inicio identifica errores temprano", factores: "Detección temprana" },
];

const TEAM = [
  "Diego Felipe Montoya",
  "Juan Diego Trujillo",
  "Juan Pablo Jerez",
  "Jerónimo Pineda",
];

const COLORS = {
  piramide: "#2563eb",
  cono: "#f59e0b",
  bg: "#0f172a",
  card: "#1e293b",
  cardHover: "#334155",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  accent: "#38bdf8",
  border: "#334155",
  green: "#22c55e",
  red: "#ef4444",
};

const PIE_COLORS = ["#2563eb", "#f59e0b", "#22c55e", "#ef4444", "#a855f7", "#ec4899"];

function count(arr, key) {
  const m = {};
  arr.forEach(d => { m[d[key]] = (m[d[key]] || 0) + 1; });
  return Object.entries(m).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

const PROPORCION_SHORT = {
  "100% Manuales":    "Totalmente Manuales",
  "70% Manual":       "Mayormente Manuales",
  "Equilibrado":      "Equilibrado",
  "70% Automatizado": "Mayormente Automatizadas",
  "100% Automatizado":"Totalmente Automatizadas",
};

const PROPORCION_FULL = {
  "100% Manuales":    "Totalmente Manuales (100% Pruebas Manuales, 0% Pruebas Automatizadas)",
  "70% Manual":       "Mayormente Manuales (Aprox. 70% Manuales, 30% Automatizadas)",
  "Equilibrado":      "Equilibrado (Aprox. 50% Manuales, 50% Automatizadas)",
  "70% Automatizado": "Mayormente Automatizadas (Aprox. 70% Automatizadas, 30% Manuales)",
  "100% Automatizado":"Totalmente Automatizadas (100% Pruebas Automatizadas, 0% Pruebas Manuales)",
};

const PROP_ORDER = [
  "Totalmente Manuales",
  "Mayormente Manuales",
  "Equilibrado",
  "Mayormente Automatizadas",
  "Totalmente Automatizadas",
];

const PROP_COLORS = {
  "Totalmente Manuales":      "#ef4444",
  "Mayormente Manuales":      "#f97316",
  "Equilibrado":              "#eab308",
  "Mayormente Automatizadas": "#22c55e",
  "Totalmente Automatizadas": "#2563eb",
};

const FACTOR_LABELS = {
  "Costo": "Costo de implementación y mantenimiento",
  "Velocidad": "Velocidad de ejecución de las pruebas",
  "Confiabilidad": "Confiabilidad y estabilidad de las pruebas",
  "Facilidad": "Facilidad de implementación en el equipo",
  "Cobertura": "Cobertura de escenarios del usuario final",
  "Tipo de proyecto": "Tipo de proyecto o arquitectura del sistema",
  "Experiencia previa": "Experiencia previa del equipo",
};

function countTeamCountries(arr) {
  const m = {};
  arr.forEach(d => {
    d.equipos.split(",").forEach(c => {
      const country = c.trim();
      if (country) {
        if (!m[country]) m[country] = {};
        const prop = PROPORCION_SHORT[d.proporcion] || d.proporcion;
        m[country][prop] = (m[country][prop] || 0) + 1;
      }
    });
  });
  return Object.entries(m)
    .map(([name, counts]) => ({
      name,
      ...counts,
      total: Object.values(counts).reduce((s, v) => s + v, 0),
    }))
    .sort((a, b) => b.total - a.total);
}

function countFactors(arr) {
  const m = {};
  arr.forEach(d => {
    d.factores.split(",").forEach(f => {
      const k = f.trim();
      if (k) {
        const label = FACTOR_LABELS[k] || k;
        m[label] = (m[label] || 0) + 1;
      }
    });
  });
  return Object.entries(m).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

function PieBlock({ data, title }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div style={{ flex: 1, minWidth: 260 }}>
      <h3 style={{ color: COLORS.text, fontSize: 14, fontWeight: 600, marginBottom: 8, textAlign: "center" }}>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" stroke="none">
            {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, fontSize: 12 }} formatter={(v) => [`${v} (${((v / total) * 100).toFixed(1)}%)`, "Respuestas"]} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginTop: 4 }}>
        {data.map((d, i) => (
          <span key={i} style={{ fontSize: 11, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: PIE_COLORS[i % PIE_COLORS.length], display: "inline-block" }} />
            {d.name}: {d.value}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [filterExp, setFilterExp] = useState("Todos");
  const [filterMod, setFilterMod] = useState("Todos");
  const [filterStrat, setFilterStrat] = useState("Todos");
  const [filterPais, setFilterPais] = useState("Todos");

  const expOptions = ["Todos", ...new Set(DATA.map(d => d.experiencia))];
  const modOptions = ["Todos", "Híbrido", "Remoto"];
  const stratOptions = ["Todos", "Pirámide", "Cono"];
  const paisOptions = ["Todos", ...new Set(DATA.map(d => d.pais))];

  const filtered = useMemo(() => {
    return DATA.filter(d => {
      if (filterExp !== "Todos" && d.experiencia !== filterExp) return false;
      if (filterMod !== "Todos" && d.modalidad !== filterMod) return false;
      if (filterStrat !== "Todos" && d.estrategia !== filterStrat) return false;
      if (filterPais !== "Todos" && d.pais !== filterPais) return false;
      return true;
    });
  }, [filterExp, filterMod, filterStrat, filterPais]);

  const stratData = count(filtered, "estrategia");
  const propData = count(filtered, "proporcion").map(d => ({ ...d, name: PROPORCION_SHORT[d.name] || d.name }));
  const expData = count(filtered, "experiencia");
  const modData = count(filtered, "modalidad");
  const paisData = count(filtered, "pais");
  const factorData = countFactors(filtered);
  const teamCountryData = countTeamCountries(filtered);

  const activeFilters = [filterExp, filterMod, filterStrat, filterPais].filter(f => f !== "Todos").length;

  const selectStyle = {
    background: COLORS.card,
    color: COLORS.text,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 6,
    padding: "6px 10px",
    fontSize: 12,
    outline: "none",
    cursor: "pointer",
    minWidth: 130,
  };

  const labelStyle = { fontSize: 11, color: COLORS.textMuted, marginBottom: 2, fontWeight: 500 };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", padding: "24px 20px", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
          Universidad de Los Andes · MISW4103 · Semana 2
        </div>
        <h1 style={{ color: COLORS.text, fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>
          Análisis Cuantitativo
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 14, marginTop: 4, marginBottom: 16 }}>
          Estrategias de Automatización de Pruebas · {DATA.length} profesionales encuestados
        </p>
        <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 8, justifyContent: "center", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 18px" }}>
          <span style={{ fontSize: 11, color: COLORS.textMuted, marginRight: 4, alignSelf: "center", fontWeight: 600 }}>Equipo:</span>
          {TEAM.map((name, i) => (
            <span key={i} style={{ fontSize: 12, color: COLORS.text, background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "3px 10px" }}>
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: COLORS.card, borderRadius: 10, padding: "14px 18px", marginBottom: 20, border: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: COLORS.accent, fontSize: 13, fontWeight: 600 }}>
            ⚡ Filtros cruzados {activeFilters > 0 && <span style={{ background: COLORS.accent, color: COLORS.bg, borderRadius: 10, padding: "1px 7px", fontSize: 11, marginLeft: 6 }}>{activeFilters}</span>}
          </span>
          {activeFilters > 0 && (
            <button onClick={() => { setFilterExp("Todos"); setFilterMod("Todos"); setFilterStrat("Todos"); setFilterPais("Todos"); }}
              style={{ background: "transparent", border: `1px solid ${COLORS.border}`, color: COLORS.textMuted, borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>
              Limpiar filtros
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={labelStyle}>País</div>
            <select value={filterPais} onChange={e => setFilterPais(e.target.value)} style={selectStyle}>
              {paisOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <div style={labelStyle}>Experiencia</div>
            <select value={filterExp} onChange={e => setFilterExp(e.target.value)} style={selectStyle}>
              {expOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <div style={labelStyle}>Modalidad</div>
            <select value={filterMod} onChange={e => setFilterMod(e.target.value)} style={selectStyle}>
              {modOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <div style={labelStyle}>Estrategia</div>
            <select value={filterStrat} onChange={e => setFilterStrat(e.target.value)} style={selectStyle}>
              {stratOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Respuestas", value: filtered.length, color: COLORS.accent },
          { label: "Pirámide", value: filtered.filter(d => d.estrategia === "Pirámide").length, color: COLORS.piramide },
          { label: "Cono", value: filtered.filter(d => d.estrategia === "Cono").length, color: COLORS.cono },
          { label: "Países", value: new Set(filtered.map(d => d.pais)).size, color: COLORS.green },
        ].map((kpi, i) => (
          <div key={i} style={{ background: COLORS.card, borderRadius: 10, padding: "14px 16px", border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1: Strategy + Proportion */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280, background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
          <PieBlock data={stratData} title="Preferencia de Estrategia" />
        </div>
        <div style={{ flex: 1, minWidth: 280, background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
          <PieBlock data={propData} title="Proporción Pruebas Manuales vs Automatizadas" />
        </div>
      </div>

      {/* Charts Row 2: Experience + Modality + Country */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220, background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
          <PieBlock data={paisData} title="País de Residencia" />
        </div>
        <div style={{ flex: 1, minWidth: 220, background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
          <PieBlock data={modData} title="Modalidad de Trabajo" />
        </div>
        <div style={{ flex: 1, minWidth: 220, background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
          <PieBlock data={expData} title="Años de Experiencia" />
        </div>
      </div>

      {/* Factors Bar Chart */}
      <div style={{ background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
        <h3 style={{ color: COLORS.text, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Factores que Influyeron en la Preferencia</h3>
        <ResponsiveContainer width="100%" height={Math.max(200, factorData.length * 36)}>
          <BarChart data={factorData} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis type="number" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" width={280} tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, fontSize: 12 }} />
            <Bar dataKey="value" fill={COLORS.accent} radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cross-analysis: Strategy by Experience */}
      <div style={{ background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
        <h3 style={{ color: COLORS.text, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Correlación: Estrategia × Experiencia</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={(() => {
            const expOrder = ["1 a 3 años", "4 a 6 años", "7 a 10 años", "11 a 15 años", "Más de 20 años"];
            return expOrder.map(exp => {
              const sub = filtered.filter(d => d.experiencia === exp);
              return { name: exp, Pirámide: sub.filter(d => d.estrategia === "Pirámide").length, Cono: sub.filter(d => d.estrategia === "Cono").length };
            }).filter(d => d.Pirámide + d.Cono > 0);
          })()} margin={{ left: 0, right: 10 }}>
            <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11, color: COLORS.textMuted }} />
            <Bar dataKey="Pirámide" fill={COLORS.piramide} radius={[4, 4, 0, 0]} barSize={28} />
            <Bar dataKey="Cono" fill={COLORS.cono} radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cross-analysis: Strategy by Modality */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280, background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.text, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Correlación: Estrategia × Modalidad</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={["Híbrido", "Remoto"].map(mod => {
              const sub = filtered.filter(d => d.modalidad === mod);
              return { name: mod, Pirámide: sub.filter(d => d.estrategia === "Pirámide").length, Cono: sub.filter(d => d.estrategia === "Cono").length };
            })} margin={{ left: 0, right: 10 }}>
              <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Pirámide" fill={COLORS.piramide} radius={[4, 4, 0, 0]} barSize={32} />
              <Bar dataKey="Cono" fill={COLORS.cono} radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, minWidth: 280, background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.text, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Correlación: Estrategia × Proporción de Pruebas</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={["100% Manuales", "70% Manual", "Equilibrado", "70% Automatizado"].map(p => {
              const sub = filtered.filter(d => d.proporcion === p);
              return { name: p, Pirámide: sub.filter(d => d.estrategia === "Pirámide").length, Cono: sub.filter(d => d.estrategia === "Cono").length };
            }).filter(d => d.Pirámide + d.Cono > 0)} margin={{ left: 0, right: 10 }}>
              <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Pirámide" fill={COLORS.piramide} radius={[4, 4, 0, 0]} barSize={28} />
              <Bar dataKey="Cono" fill={COLORS.cono} radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cross-analysis: Team Countries */}
      <div style={{ background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
        <h3 style={{ color: COLORS.text, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Correlación: País en el Equipo × Proporción de Pruebas</h3>
        <p style={{ color: COLORS.textMuted, fontSize: 11, marginBottom: 12, marginTop: 0 }}>
          Cada barra muestra la distribución de proporción de pruebas entre participantes que trabajan con personas de ese país.
        </p>
        <ResponsiveContainer width="100%" height={Math.max(220, teamCountryData.length * 32)}>
          <BarChart data={teamCountryData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <XAxis type="number" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" width={120} tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, fontSize: 12 }}
              formatter={(value, name) => [`${value} participantes`, PROPORCION_FULL[Object.keys(PROPORCION_SHORT).find(k => PROPORCION_SHORT[k] === name)] || name]}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: COLORS.textMuted }} />
            {PROP_ORDER.filter(p => teamCountryData.some(d => d[p])).map(p => (
              <Bar key={p} dataKey={p} stackId="a" fill={PROP_COLORS[p]} barSize={14} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Justifications Table */}
      <div style={{ background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
        <h3 style={{ color: COLORS.text, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          Justificaciones de los Participantes ({filtered.length})
        </h3>
        <div style={{ maxHeight: 350, overflowY: "auto", borderRadius: 6 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ position: "sticky", top: 0, background: COLORS.bg }}>
                {["#", "País", "Exp.", "Modalidad", "Estrategia", "Justificación"].map(h => (
                  <th key={h} style={{ padding: "8px 6px", textAlign: "left", color: COLORS.accent, fontWeight: 600, borderBottom: `1px solid ${COLORS.border}`, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  <td style={{ padding: "6px", color: COLORS.textMuted }}>{i + 1}</td>
                  <td style={{ padding: "6px", color: COLORS.text }}>{d.pais}</td>
                  <td style={{ padding: "6px", color: COLORS.textMuted, whiteSpace: "nowrap" }}>{d.experiencia}</td>
                  <td style={{ padding: "6px", color: COLORS.textMuted }}>{d.modalidad}</td>
                  <td style={{ padding: "6px" }}>
                    <span style={{ background: d.estrategia === "Pirámide" ? COLORS.piramide : COLORS.cono, color: "#fff", padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: 600 }}>
                      {d.estrategia}
                    </span>
                  </td>
                  <td style={{ padding: "6px", color: COLORS.text, maxWidth: 350 }}>{d.justificacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 20, color: COLORS.textMuted, fontSize: 11 }}>
        Universidad de Los Andes · MISW4103 · Semana 2 · Abril 2026 · {TEAM.join(" · ")}
      </div>
    </div>
  );
}
