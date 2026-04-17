import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase client ────────────────────────────────────────────────────────
const SUPABASE_URL = "https://rizqgointhkythtnifxf.supabase.co";
const SUPABASE_KEY = "sb_publishable_9jtOV9lQemCcP-5h9SAf9g_dKXnXovQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Storage helpers ────────────────────────────────────────────────────────
async function load(key) {
  try {
    const { data } = await supabase
      .from("data")
      .select("value")
      .eq("id", key === "hm_products2" ? 1 : 2)
      .single();
    return data ? JSON.parse(data.value) : null;
  } catch { return null; }
}

async function save(key, val) {
  try {
    const id = key === "hm_products2" ? 1 : 2;
    await supabase
      .from("data")
      .upsert({ id, value: JSON.stringify(val) });
  } catch {}
}

// ─── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    plus:    <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    trash:   <svg {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
    check:   <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>,
    cart:    <svg {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    list:    <svg {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    star:    <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    refresh: <svg {...p}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
    alert:   <svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    home:    <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    x:       <svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    chef:    <svg {...p}><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    house:   <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><line x1="12" y1="2" x2="12" y2="8"/></svg>,
    send:    <svg {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    chevron: <svg {...p}><polyline points="6 9 12 15 18 9"/></svg>,
    edit2:   <svg {...p}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  };
  return icons[name] || null;
};

// ─── Constants ──────────────────────────────────────────────────────────────
const CATEGORIES = ["ירקות ופירות","בשר ודגים","מוצרי חלב","לחם ואפייה","יבשים","שימורים וחטיפים","קפואים","משקאות","ניקיון","טיפוח","אחר"];
const CAT_COLORS = {
  "ירקות ופירות":"#3fb950","בשר ודגים":"#f85149","מוצרי חלב":"#58a6ff",
  "לחם ואפייה":"#e3b341","יבשים":"#d4a574","שימורים וחטיפים":"#bc8cff","קפואים":"#79c0ff",
  "משקאות":"#56d364","ניקיון":"#ff7b72","טיפוח":"#f0883e","אחר":"#8b949e",
};

const Badge = ({ label, color }) => (
  <span style={{ fontSize:"0.7rem", fontWeight:700, padding:"2px 9px", borderRadius:99,
    background:color+"22", color, border:`1px solid ${color}44`, whiteSpace:"nowrap" }}>
    {label}
  </span>
);

const inputStyle = {
  background:"#0d1117", border:"1px solid #30363d", borderRadius:8,
  color:"#e6edf3", padding:"10px 13px", fontSize:"0.93rem", outline:"none", fontFamily:"inherit",
};
const cardStyle = {
  background:"#161b22", border:"1px solid #21262d", borderRadius:14, padding:"18px", marginBottom:16,
};

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [products, setProducts]   = useState(null);
  const [recipes, setRecipes]     = useState(null);
  const [tab, setTab]             = useState("shopping");

  const [outOfStockSearch, setOutOfStockSearch] = useState("");
  const [addName, setAddName]     = useState("");
  const [addCat, setAddCat]       = useState(CATEGORIES[0]);
  const [addAlways, setAddAlways] = useState(false);
  const [addAlwaysHome, setAddAlwaysHome] = useState(false);
  const [filterCat, setFilterCat] = useState("הכל");
  const [editingProduct, setEditingProduct] = useState(null); // {id, name, category}

  const [recipeName, setRecipeName]           = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredientList, setIngredientList]   = useState([]);
  const [expandedRecipe, setExpandedRecipe]   = useState(null);
  const [editingRecipe, setEditingRecipe]     = useState(null);
  const [toast, setToast]                     = useState(null);
  const [saving, setSaving]                   = useState(false);
  const [lastSaved, setLastSaved]             = useState(null);

  useEffect(() => {
    load("hm_products2").then(d => {
      if (!d) { setProducts([]); return; }
      // Remove duplicates by name (keep first occurrence)
      const seen = new Set();
      const deduped = d.filter(p => {
        const key = p.name.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      setProducts(deduped);
    });
    load("hm_recipes").then(d => setRecipes(d || []));
  }, []);

  useEffect(() => {
    if (products === null) return;
    setSaving(true);
    const t = setTimeout(async () => {
      await save("hm_products2", products);
      setSaving(false);
      setLastSaved(new Date());
    }, 600);
    return () => clearTimeout(t);
  }, [products]);

  useEffect(() => {
    if (recipes === null) return;
    const t = setTimeout(() => save("hm_recipes", recipes), 600);
    return () => clearTimeout(t);
  }, [recipes]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  // ── Products actions ──
  const addProduct      = () => {
    if (!addName.trim()) return;
    const nameT = addName.trim();
    if (products.find(p => p.name.trim() === nameT)) {
      showToast(`"${nameT}" כבר קיים ברשימה`); return;
    }
    setProducts(p => [...p, { id:Date.now(), name:nameT, category:addCat, alwaysBuy:addAlways, alwaysHome:addAlwaysHome, outOfStock:addAlways, bought:false }]);
    setAddName(""); setAddAlways(false); setAddAlwaysHome(false);
  };
  const toggleOutOfStock = id => setProducts(p => p.map(x => x.id===id ? {...x, outOfStock:!x.outOfStock, bought:false} : x));
  const toggleAlways     = id => setProducts(p => p.map(x => x.id===id ? {...x, alwaysBuy:!x.alwaysBuy} : x));
  const toggleAlwaysHome = id => setProducts(p => p.map(x => x.id===id ? {...x, alwaysHome:!x.alwaysHome} : x));
  const deleteProduct    = id => setProducts(p => p.filter(x => x.id!==id));
  const saveProductEdit  = () => {
    if (!editingProduct || !editingProduct.name.trim()) return;
    setProducts(p => p.map(x => x.id===editingProduct.id ? {...x, name:editingProduct.name.trim(), category:editingProduct.category} : x));
    setEditingProduct(null);
    showToast("המוצר עודכן ✓");
  };
  // Mark as bought: stays in list as "bought" (greyed out), but won't disappear until next reset
  const markBought       = id => setProducts(p => p.map(x => x.id===id ? {...x, bought:!x.bought} : x));
  const resetAlwaysBuy   = ()  => setProducts(p => p.map(x => x.alwaysBuy ? {...x, outOfStock:true, bought:false} : x));

  // ── Recipe ingredient input ──
  const addIngredient    = () => {
    const name = ingredientInput.trim();
    if (!name) return;
    setIngredientList(l => [...l, { id:Date.now(), name, alwaysHome:false }]);
    setIngredientInput("");
  };
  const removeIngredient = id => setIngredientList(l => l.filter(x => x.id!==id));
  const toggleIngAlwaysHome = id => setIngredientList(l => l.map(x => x.id===id ? {...x, alwaysHome:!x.alwaysHome} : x));

  // Mark ingredient as alwaysHome in global products list
  const markIngredientAsAlwaysHome = (ingName) => {
    const nameT = ingName.trim();
    setProducts(prev => {
      const exists = prev.find(p => p.name.trim()===nameT);
      if (exists) {
        return prev.map(p => p.name.trim()===nameT ? {...p, alwaysHome:true} : p);
      } else {
        return [...prev, { id:Date.now()+Math.random(), name:ingName, category:"אחר", alwaysBuy:false, alwaysHome:true, outOfStock:false, bought:false }];
      }
    });
    showToast(`"${ingName}" סומן כתמיד בבית ✓`);
  };

  const saveRecipe = () => {
    if (!recipeName.trim() || ingredientList.length===0) return;
    if (editingRecipe) {
      setRecipes(r => r.map(x => x.id===editingRecipe ? {...x, name:recipeName.trim(), ingredients:ingredientList} : x));
      setEditingRecipe(null);
    } else {
      setRecipes(r => [...r, { id:Date.now(), name:recipeName.trim(), ingredients:ingredientList }]);
    }
    setRecipeName(""); setIngredientList([]);
    showToast("המתכון נשמר ✓");
  };

  const deleteRecipe = id => {
    setRecipes(r => r.filter(x => x.id!==id));
    if (expandedRecipe===id) setExpandedRecipe(null);
  };

  const startEditRecipe = (recipe) => {
    setEditingRecipe(recipe.id);
    setRecipeName(recipe.name);
    setIngredientList(recipe.ingredients);
    setExpandedRecipe(null);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const sendToShopping = (recipe) => {
    let added = 0, alreadyIn = 0, skipped = 0;
    setProducts(prev => {
      let updated = [...prev];
      recipe.ingredients.forEach(ing => {
        const nameT = ing.name.trim();
        const match = updated.find(p => p.name.trim()===nameT);
        if (match) {
          if (match.alwaysHome && !match.outOfStock) { skipped++; return; }
          if (!match.outOfStock) { updated = updated.map(p => p.id===match.id ? {...p, outOfStock:true, bought:false} : p); added++; }
          else alreadyIn++;
        } else {
          if (!updated.find(p => p.name.trim()===nameT)) {
            updated = [...updated, { id:Date.now()+Math.random(), name:ing.name, category:"אחר", alwaysBuy:false, alwaysHome:false, outOfStock:true, bought:false }];
            added++;
          }
        }
      });
      return updated;
    });
    setTimeout(() => {
      const parts = [];
      if (added > 0) parts.push(`נוספו ${added} מצרכים`);
      if (alreadyIn > 0) parts.push(`${alreadyIn} כבר ברשימה`);
      if (skipped > 0) parts.push(`${skipped} תמיד בבית — דולגו`);
      showToast(parts.join(" • ") + " ✓");
    }, 100);
  };

  if (products===null || recipes===null) return (
    <div style={{ minHeight:"100vh", background:"#0d1117", display:"flex", alignItems:"center", justifyContent:"center", color:"#7d8590", fontFamily:"Heebo,sans-serif", direction:"rtl" }}>טוען...</div>
  );

  const toBuy   = products.filter(x => x.outOfStock);
  const grouped = {};
  toBuy.forEach(p => { if (!grouped[p.category]) grouped[p.category]=[]; grouped[p.category].push(p); });
  const manageCats       = ["הכל", ...CATEGORIES];
  const filteredProducts = filterCat==="הכל" ? products : products.filter(x => x.category===filterCat);
  const outCount         = toBuy.length;
  const canSave          = recipeName.trim() && ingredientList.length>0;

  return (
    <div style={{ minHeight:"100vh", background:"#0d1117", color:"#e6edf3", fontFamily:"'Heebo',sans-serif", direction:"rtl" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        input,select,textarea { font-family:inherit; }
        input::placeholder,textarea::placeholder { color:#484f58; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-thumb { background:#30363d; border-radius:99px; }
        button:active { opacity:0.75; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:"#238636", color:"#fff", borderRadius:10, padding:"10px 20px", fontSize:"0.88rem", fontWeight:600, zIndex:200, whiteSpace:"nowrap", boxShadow:"0 4px 20px #0008" }}>
          {toast}
        </div>
      )}

      {/* HEADER */}
      <header style={{ background:"#161b22", borderBottom:"1px solid #21262d", padding:"14px 20px", position:"sticky", top:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#238636,#3fb950)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon name="home" size={17} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight:800, fontSize:"1rem", letterSpacing:"-0.3px" }}>רשימת קניות ליובל</div>
            <div style={{ fontSize:"0.7rem", color:"#7d8590" }}>
              {saving ? "שומר..." : lastSaved ? `עודכן ${lastSaved.toLocaleTimeString("he-IL",{hour:"2-digit",minute:"2-digit"})}` : "מסונכרן"}
            </div>
          </div>
        </div>
        {outCount>0 && (
          <div style={{ background:"#f851491a", border:"1px solid #f8514940", borderRadius:99, padding:"4px 12px", fontSize:"0.78rem", color:"#f85149", fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>
            <Icon name="alert" size={13} color="#f85149" />{outCount} חסרים
          </div>
        )}
      </header>

      {/* TABS */}
      <div style={{ display:"flex", background:"#161b22", borderBottom:"1px solid #21262d", padding:"0 16px", overflowX:"auto" }}>
        {[
          { id:"shopping", label:"רשימת קניות",      icon:"cart",  color:"#3fb950", badge:outCount||null },
          { id:"menu",     label:"קניות לפי תפריט",  icon:"chef",  color:"#f0883e", badge:recipes.length||null },
          { id:"manage",   label:"ניהול מוצרים",     icon:"list",  color:"#58a6ff", badge:products.length },
        ].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            background:"none", border:"none", cursor:"pointer",
            borderBottom:tab===t.id?`2px solid ${t.color}`:"2px solid transparent",
            color:tab===t.id?t.color:"#7d8590", fontFamily:"inherit", fontWeight:700,
            fontSize:"0.83rem", padding:"12px 12px", display:"flex", alignItems:"center",
            gap:5, transition:"all 0.15s", whiteSpace:"nowrap",
          }}>
            <Icon name={t.icon} size={14} color={tab===t.id?t.color:"#7d8590"} />
            {t.label}
            {t.badge!==null && (
              <span style={{ background:tab===t.id?t.color+"22":"#21262d", color:tab===t.id?t.color:"#7d8590", borderRadius:99, fontSize:"0.7rem", fontWeight:800, padding:"1px 7px" }}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <main style={{ padding:"20px", maxWidth:680, margin:"0 auto" }}>

        {/* ══ SHOPPING TAB ══ */}
        {tab==="shopping" && (
          <div>
            {/* Global search */}
            <div style={{ position:"relative", marginBottom:16 }}>
              <svg style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#484f58" strokeWidth={2.5} strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input style={{ ...inputStyle, width:"100%", paddingRight:38, paddingLeft:outOfStockSearch?36:13 }}
                placeholder="חפש מוצר לסימון כנגמר... (קטשופ, חלב, לחם)"
                value={outOfStockSearch} onChange={e=>setOutOfStockSearch(e.target.value)} />
              {outOfStockSearch && (
                <button onClick={()=>setOutOfStockSearch("")} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center" }}>
                  <Icon name="x" size={14} color="#484f58" />
                </button>
              )}
            </div>
            {outOfStockSearch.trim() && (() => {
              const q = outOfStockSearch.trim();
              const results = products.filter(x => x.name.includes(q));
              if (results.length===0) return (
                <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:12, padding:"16px", textAlign:"center", color:"#484f58", fontSize:"0.85rem", marginBottom:16 }}>
                  לא נמצא "{q}" — אפשר להוסיף בלשונית ניהול מוצרים
                </div>
              );
              return (
                <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:12, overflow:"hidden", marginBottom:16 }}>
                  {results.map((item,i,arr) => (
                    <div key={item.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderBottom:i<arr.length-1?"1px solid #21262d":"none", background:item.outOfStock?"#f8514908":"transparent" }}>
                      <button onClick={()=>{toggleOutOfStock(item.id); if(!item.outOfStock) setOutOfStockSearch("");}}
                        style={{ width:26, height:26, borderRadius:"50%", flexShrink:0, border:`2px solid ${item.outOfStock?"#f85149":"#30363d"}`, background:item.outOfStock?"#f8514922":"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
                        {item.outOfStock && <Icon name="x" size={12} color="#f85149" />}
                      </button>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:"0.93rem", fontWeight:500, color:item.outOfStock?"#f85149":"#e6edf3" }}>
                          {item.name.split(new RegExp(`(${q})`, "g")).map((part,j) =>
                            part===q ? <mark key={j} style={{ background:"#e3b34130", color:"#e3b341", borderRadius:3, padding:"0 1px" }}>{part}</mark> : part
                          )}
                        </div>
                        <div style={{ fontSize:"0.72rem", color:CAT_COLORS[item.category]||"#7d8590", marginTop:1 }}>{item.category}</div>
                      </div>
                      {item.outOfStock ? <Badge label="חסר" color="#f85149" /> : <Badge label="יש בבית" color="#3fb950" />}
                    </div>
                  ))}
                </div>
              );
            })()}
            {toBuy.length===0 && !outOfStockSearch.trim() && (
              <div style={{ background:"#23863618", border:"1px solid #23863640", borderRadius:14, padding:24, textAlign:"center", marginBottom:16 }}>
                <div style={{ fontSize:"2rem", marginBottom:8 }}>✅</div>
                <div style={{ fontWeight:700, color:"#3fb950", fontSize:"1rem" }}>הכל בבית!</div>
                <div style={{ color:"#7d8590", fontSize:"0.82rem", marginTop:4 }}>אין מוצרים חסרים כרגע</div>
              </div>
            )}
            {toBuy.length>0 && (
              <>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                  <div style={{ fontSize:"0.82rem", color:"#7d8590" }}>
                    {toBuy.filter(x=>x.bought).length}/{toBuy.length} נרכשו
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    {toBuy.some(x=>x.bought) && (
                      <button onClick={()=>setProducts(p=>p.map(x=>{
                        if (x.bought) return {...x, outOfStock:x.alwaysBuy, bought:false};
                        return x;
                      }))}
                        style={{ background:"#3fb95022", border:"1px solid #3fb95050", borderRadius:8, color:"#3fb950", fontFamily:"inherit", fontSize:"0.78rem", fontWeight:700, padding:"6px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                        <Icon name="check" size={13} color="#3fb950" /> סיום קניות
                      </button>
                    )}
                    <button onClick={resetAlwaysBuy} style={{ background:"none", border:"1px solid #30363d", borderRadius:8, color:"#7d8590", fontFamily:"inherit", fontSize:"0.78rem", padding:"6px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                      <Icon name="refresh" size={13} /> אתחל
                    </button>
                  </div>
                </div>
                {Object.entries(grouped).map(([cat,items]) => (
                  <div key={cat} style={{ marginBottom:16 }}>
                    <div style={{ fontSize:"0.75rem", fontWeight:700, color:CAT_COLORS[cat]||"#7d8590", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:6, display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:CAT_COLORS[cat], display:"inline-block" }} />{cat}
                    </div>
                    <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:12, overflow:"hidden" }}>
                      {items.map((item,i) => (
                        <div key={item.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", borderBottom:i<items.length-1?"1px solid #21262d":"none", opacity:item.bought?0.45:1, transition:"opacity 0.2s" }}>
                          <button onClick={()=>markBought(item.id)} style={{ width:26, height:26, borderRadius:"50%", flexShrink:0, border:`2px solid ${item.bought?"#3fb950":"#3fb950"}`, background:item.bought?"#3fb950":"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
                            <Icon name="check" size={13} color={item.bought?"#fff":"#3fb950"} />
                          </button>
                          <div style={{ flex:1, fontWeight:500, fontSize:"0.95rem", textDecoration:item.bought?"line-through":"none", color:item.bought?"#7d8590":"#e6edf3" }}>{item.name}</div>
                          {item.alwaysBuy && !item.bought && <Badge label="תמיד" color="#e3b341" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}

            {products.filter(x=>!x.outOfStock&&!x.alwaysBuy).length>0 && !outOfStockSearch.trim() && (
              <div style={{ marginTop:16, padding:"10px 14px", background:"#161b2280", border:"1px solid #21262d", borderRadius:10, fontSize:"0.78rem", color:"#484f58", textAlign:"center" }}>
                💡 כדי לסמן מוצר כנגמר — חפש אותו בשורת החיפוש למעלה
              </div>
            )}
          </div>
        )}

        {/* ══ MENU TAB ══ */}
        {tab==="menu" && (
          <div>
            {/* Add/Edit recipe form */}
            <div style={cardStyle}>
              <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:14, color:"#f0883e", display:"flex", alignItems:"center", gap:7 }}>
                <Icon name={editingRecipe?"edit2":"chef"} size={16} color="#f0883e" />
                {editingRecipe ? "עריכת מתכון" : "הוספת מנה חדשה"}
              </div>

              <input style={{ ...inputStyle, width:"100%", marginBottom:12 }}
                placeholder="שם המנה (לדוגמה: פסטה ברוטב עגבניות, שקשוקה, מרק עוף...)"
                value={recipeName} onChange={e=>setRecipeName(e.target.value)} />

              <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                <input style={{ ...inputStyle, flex:1 }}
                  placeholder="הוסף מצרך (לדוגמה: עגבניות, ביצים, גבינה צהובה...)"
                  value={ingredientInput}
                  onChange={e=>setIngredientInput(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&addIngredient()} />
                <button onClick={addIngredient} style={{ background:"#f0883e22", border:"1px solid #f0883e55", borderRadius:8, color:"#f0883e", fontFamily:"inherit", fontWeight:700, fontSize:"0.88rem", padding:"10px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap" }}>
                  <Icon name="plus" size={14} color="#f0883e" /> הוסף
                </button>
              </div>

              {/* Ingredient chips */}
              {ingredientList.length>0 ? (
                <div style={{ marginBottom:14, padding:"10px 12px", background:"#0d1117", borderRadius:10, border:"1px solid #21262d", display:"flex", flexWrap:"wrap", gap:6 }}>
                  {ingredientList.map(ing => {
                    const inProducts = products.find(p => p.name.trim()===ing.name.trim());
                    const isAlwaysHome = inProducts?.alwaysHome || ing.alwaysHome;
                    return (
                      <span key={ing.id} style={{ display:"inline-flex", alignItems:"center", gap:4, background: isAlwaysHome?"#79c0ff18":"#21262d", border:`1px solid ${isAlwaysHome?"#79c0ff50":"#30363d"}`, borderRadius:99, padding:"4px 8px 4px 7px", fontSize:"0.82rem" }}>
                        {ing.name}
                        <button
                          onClick={()=>markIngredientAsAlwaysHome(ing.name)}
                          title="סמן כתמיד בבית"
                          style={{ background:"none", border:"none", cursor:"pointer", padding:"0 2px", display:"flex", lineHeight:1, opacity: isAlwaysHome?1:0.4 }}>
                          <Icon name="home" size={12} color={isAlwaysHome?"#79c0ff":"#7d8590"} />
                        </button>
                        <button onClick={()=>removeIngredient(ing.id)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", lineHeight:1 }}>
                          <Icon name="x" size={12} color="#7d8590" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <div style={{ color:"#484f58", fontSize:"0.8rem", marginBottom:14, padding:"6px 0" }}>הוסף לפחות מצרך אחד</div>
              )}

              <div style={{ display:"flex", gap:8 }}>
                <button onClick={saveRecipe} disabled={!canSave} style={{ background:canSave?"#f0883e":"#21262d", border:"none", borderRadius:8, color:canSave?"#fff":"#484f58", fontFamily:"inherit", fontWeight:700, fontSize:"0.9rem", padding:"10px 20px", cursor:canSave?"pointer":"default", display:"flex", alignItems:"center", gap:6 }}>
                  <Icon name="check" size={15} color={canSave?"#fff":"#484f58"} />
                  {editingRecipe ? "שמור שינויים" : "שמור מנה"}
                </button>
                {editingRecipe && (
                  <button onClick={()=>{setEditingRecipe(null);setRecipeName("");setIngredientList([]);}} style={{ background:"none", border:"1px solid #30363d", borderRadius:8, color:"#7d8590", fontFamily:"inherit", fontSize:"0.88rem", padding:"10px 14px", cursor:"pointer" }}>
                    ביטול
                  </button>
                )}
              </div>
            </div>

            {recipes.length===0 && (
              <div style={{ textAlign:"center", color:"#7d8590", padding:"40px 0", fontSize:"0.9rem" }}>
                🍳 עדיין אין מנות — הוסף מנות שאתם מכינים בדרך כלל
              </div>
            )}

            {recipes.map(recipe => {
              const isOpen = expandedRecipe===recipe.id;
              return (
                <div key={recipe.id} style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:14, marginBottom:12, overflow:"hidden" }}>
                  {/* Recipe header row */}
                  <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 16px", cursor:"pointer" }}
                    onClick={()=>setExpandedRecipe(isOpen?null:recipe.id)}>
                    <div style={{ width:34, height:34, borderRadius:9, background:"#f0883e18", border:"1px solid #f0883e30", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Icon name="chef" size={16} color="#f0883e" />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:"0.95rem", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{recipe.name}</div>
                      <div style={{ fontSize:"0.75rem", color:"#7d8590", marginTop:1 }}>{recipe.ingredients.length} מצרכים</div>
                    </div>
                    <button onClick={e=>{e.stopPropagation();sendToShopping(recipe);}}
                      style={{ background:"#3fb95022", border:"1px solid #3fb95050", borderRadius:8, color:"#3fb950", fontFamily:"inherit", fontWeight:700, fontSize:"0.78rem", padding:"6px 11px", cursor:"pointer", display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap", flexShrink:0 }}>
                      <Icon name="cart" size={13} color="#3fb950" /> לרשימה
                    </button>
                    <button onClick={e=>{e.stopPropagation();startEditRecipe(recipe);}} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px 5px", flexShrink:0 }}>
                      <Icon name="edit2" size={15} color="#7d8590" />
                    </button>
                    <button onClick={e=>{e.stopPropagation();deleteRecipe(recipe.id);}} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px 5px", flexShrink:0 }}>
                      <Icon name="trash" size={15} color="#484f58" />
                    </button>
                    <div style={{ transform:isOpen?"rotate(180deg)":"rotate(0)", transition:"transform 0.2s", flexShrink:0 }}>
                      <Icon name="chevron" size={16} color="#484f58" />
                    </div>
                  </div>

                  {/* Expanded ingredients */}
                  {isOpen && (
                    <div style={{ borderTop:"1px solid #21262d", padding:"14px 16px", background:"#0d111780" }}>
                      <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#7d8590", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:10 }}>מצרכים</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:14 }}>
                        {recipe.ingredients.map(ing => {
                          const inProd    = products.find(p => p.name===ing.name);
                          const isMissing = inProd?.outOfStock;
                          const isHome    = inProd?.alwaysHome && !inProd?.outOfStock;
                          const isOk      = inProd && !inProd.outOfStock && !inProd.alwaysHome;
                          const color     = isMissing?"#f85149":isHome?"#79c0ff":isOk?"#3fb950":"#7d8590";
                          const label     = isMissing?"חסר":isHome?"תמיד בבית":isOk?"יש בבית":"לא ברשימה";
                          return (
                            <div key={ing.id} style={{ display:"flex", alignItems:"center", gap:6, background:"#161b22", border:`1px solid ${color}33`, borderRadius:8, padding:"6px 10px" }}>
                              <span style={{ width:7, height:7, borderRadius:"50%", background:color, flexShrink:0 }} />
                              <span style={{ fontSize:"0.85rem", fontWeight:500 }}>{ing.name}</span>
                              <span style={{ fontSize:"0.7rem", color, fontWeight:600 }}>{label}</span>
                            </div>
                          );
                        })}
                      </div>
                      <button onClick={()=>sendToShopping(recipe)} style={{ background:"#3fb950", border:"none", borderRadius:9, color:"#fff", fontFamily:"inherit", fontWeight:700, fontSize:"0.88rem", padding:"11px 18px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7, width:"100%" }}>
                        <Icon name="send" size={15} color="#fff" />
                        הוסף את כל המצרכים החסרים לרשימת הקניות
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ══ MANAGE TAB ══ */}
        {tab==="manage" && (
          <div>
            <div style={cardStyle}>
              <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:14, color:"#58a6ff" }}>+ הוספת מוצר חדש</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <input style={{ ...inputStyle, width:"100%" }}
                  placeholder="שם המוצר (לדוגמה: חלב 3%, לחם אחיד...)"
                  value={addName} onChange={e=>setAddName(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&addProduct()} />
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <select style={{ ...inputStyle, flex:1, minWidth:140 }} value={addCat} onChange={e=>setAddCat(e.target.value)}>
                    {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                  <button onClick={()=>setAddAlways(a=>!a)} style={{ background:addAlways?"#e3b34122":"#21262d", border:`1px solid ${addAlways?"#e3b341":"#30363d"}`, borderRadius:8, color:addAlways?"#e3b341":"#7d8590", fontFamily:"inherit", fontSize:"0.85rem", fontWeight:600, padding:"10px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:6, transition:"all 0.15s" }}>
                    <Icon name="star" size={14} color={addAlways?"#e3b341":"#7d8590"} /> תמיד לקנות
                  </button>
                  <button onClick={addProduct} style={{ background:"#238636", border:"none", borderRadius:8, color:"#fff", fontFamily:"inherit", fontWeight:700, fontSize:"0.9rem", padding:"10px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
                    <Icon name="plus" size={15} color="#fff" /> הוסף
                  </button>
                </div>
                {addAlways && <div style={{ fontSize:"0.78rem", color:"#e3b341", padding:"6px 10px", background:"#e3b34112", borderRadius:6 }}>⭐ מוצר זה יופיע תמיד ברשימת הקניות</div>}
              </div>
            </div>

            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
              {manageCats.map(c=>(
                <button key={c} onClick={()=>setFilterCat(c)} style={{ background:filterCat===c?(CAT_COLORS[c]||"#58a6ff")+"22":"#161b22", border:`1px solid ${filterCat===c?(CAT_COLORS[c]||"#58a6ff"):"#21262d"}`, borderRadius:99, color:filterCat===c?(CAT_COLORS[c]||"#58a6ff"):"#7d8590", fontFamily:"inherit", fontSize:"0.78rem", fontWeight:600, padding:"5px 12px", cursor:"pointer", transition:"all 0.15s" }}>
                  {c}
                </button>
              ))}
            </div>

            {filteredProducts.length===0 && <div style={{ textAlign:"center", color:"#7d8590", padding:"40px 0", fontSize:"0.9rem" }}>אין מוצרים עדיין</div>}

            {filteredProducts.length>0 && (
              <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:12, overflow:"hidden" }}>
                {filteredProducts.map((item,i)=>(
                  <div key={item.id} style={{ borderBottom:i<filteredProducts.length-1?"1px solid #21262d":"none" }}>
                    {/* Edit mode */}
                    {editingProduct?.id===item.id ? (
                      <div style={{ display:"flex", gap:8, padding:"10px 12px", alignItems:"center", flexWrap:"wrap", background:"#1a2030" }}>
                        <input style={{ ...inputStyle, flex:1, minWidth:120, padding:"7px 11px", fontSize:"0.88rem" }}
                          value={editingProduct.name}
                          onChange={e=>setEditingProduct(p=>({...p, name:e.target.value}))}
                          onKeyDown={e=>e.key==="Enter"&&saveProductEdit()} autoFocus />
                        <select style={{ ...inputStyle, padding:"7px 11px", fontSize:"0.85rem" }}
                          value={editingProduct.category}
                          onChange={e=>setEditingProduct(p=>({...p, category:e.target.value}))}>
                          {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                        </select>
                        <button onClick={saveProductEdit} style={{ background:"#238636", border:"none", borderRadius:7, color:"#fff", fontFamily:"inherit", fontWeight:700, fontSize:"0.85rem", padding:"7px 14px", cursor:"pointer" }}>שמור</button>
                        <button onClick={()=>setEditingProduct(null)} style={{ background:"none", border:"1px solid #30363d", borderRadius:7, color:"#7d8590", fontFamily:"inherit", fontSize:"0.85rem", padding:"7px 12px", cursor:"pointer" }}>ביטול</button>
                      </div>
                    ) : (
                      /* Normal row */
                      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", background:item.outOfStock?"#f8514908":"transparent" }}>
                        <button onClick={()=>toggleOutOfStock(item.id)} title={item.outOfStock?"סמן כיש במלאי":"סמן כנגמר"} style={{ width:26, height:26, borderRadius:"50%", flexShrink:0, border:`2px solid ${item.outOfStock?"#f85149":"#30363d"}`, background:item.outOfStock?"#f8514922":"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
                          {item.outOfStock && <Icon name="x" size={12} color="#f85149" />}
                        </button>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:500, fontSize:"0.93rem", color:item.outOfStock?"#f85149":"#e6edf3" }}>{item.name}</div>
                          <div style={{ fontSize:"0.72rem", color:CAT_COLORS[item.category]||"#7d8590", marginTop:1 }}>{item.category}</div>
                        </div>
                        {item.outOfStock && <Badge label="חסר" color="#f85149" />}
                        {item.alwaysHome && !item.outOfStock && <Badge label="תמיד בבית" color="#79c0ff" />}
                        <button onClick={()=>toggleAlwaysHome(item.id)} title={item.alwaysHome?"הסר 'תמיד בבית'":"סמן כתמיד בבית"} style={{ background:item.alwaysHome?"#79c0ff22":"none", border:`1px solid ${item.alwaysHome?"#79c0ff50":"transparent"}`, borderRadius:6, padding:"4px 6px", cursor:"pointer", transition:"all 0.15s" }}>
                          <Icon name="home" size={15} color={item.alwaysHome?"#79c0ff":"#484f58"} />
                        </button>
                        <button onClick={()=>toggleAlways(item.id)} style={{ background:item.alwaysBuy?"#e3b34122":"none", border:`1px solid ${item.alwaysBuy?"#e3b34150":"transparent"}`, borderRadius:6, padding:"4px 6px", cursor:"pointer", transition:"all 0.15s" }}>
                          <Icon name="star" size={15} color={item.alwaysBuy?"#e3b341":"#484f58"} />
                        </button>
                        <button onClick={()=>setEditingProduct({id:item.id, name:item.name, category:item.category})} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px" }}>
                          <Icon name="edit2" size={15} color="#484f58" />
                        </button>
                        <button onClick={()=>deleteProduct(item.id)} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px" }}>
                          <Icon name="trash" size={15} color="#484f58" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop:20, padding:"14px 16px", background:"#161b22", border:"1px solid #21262d", borderRadius:12, fontSize:"0.78rem", color:"#7d8590", lineHeight:1.9 }}>
              <div style={{ fontWeight:700, color:"#484f58", marginBottom:6 }}>איך זה עובד:</div>
              <div>⭐ <strong style={{ color:"#e3b341" }}>תמיד לקנות</strong> — יופיע תמיד ברשימת הקניות</div>
              <div>🏠 <strong style={{ color:"#79c0ff" }}>תמיד בבית</strong> — לא יתווסף מתפריט אלא אם נגמר</div>
              <div>🔴 <strong style={{ color:"#f85149" }}>סמן כנגמר</strong> — יכנס לרשימה עד שתסמן שנקנה</div>
              <div>✅ <strong style={{ color:"#3fb950" }}>סמן כנקנה</strong> — נשאר ברשימה עד "סיום קניות"</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
