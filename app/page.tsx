"use client";

import { useState } from "react";

type Answers = Record<string, boolean>;

const places = [
  ["die Stadt", "die Städte", "Kota"], ["die Bank", "die Banken", "Bank"], ["die Behörde", "die Behörden", "Kantor pemerintahan"], ["das Rathaus", "die Rathäuser", "Balai kota"], ["das Krankenhaus", "die Krankenhäuser", "Rumah sakit"], ["der Supermarkt", "die Supermärkte", "Supermarket"], ["die Apotheke", "die Apotheken", "Apotek"], ["die Bibliothek", "die Bibliotheken", "Perpustakaan"], ["der Bahnhof", "die Bahnhöfe", "Stasiun kereta"], ["die Haltestelle", "die Haltestellen", "Halte bus"], ["der Parkplatz", "die Parkplätze", "Tempat parkir"], ["die Brücke", "die Brücken", "Jembatan"], ["die Kirche", "die Kirchen", "Gereja"], ["das Museum", "die Museen", "Museum"], ["der Marktplatz", "die Marktplätze", "Pasar/alun-alun"],
];
const jobs = [["das Bewerbungsgespräch","die Bewerbungsgespräche","Wawancara kerja"],["der Lebenslauf","die Lebensläufe","Curriculum Vitae (CV)"],["die Stelle","die Stellen","Posisi/lowongan"],["die Erfahrung","die Erfahrungen","Pengalaman"],["der Arbeitgeber","die Arbeitgeber","Pemberi kerja"],["der Arbeitnehmer","die Arbeitnehmer","Pekerja/karyawan"],["das Gehalt","die Gehälter","Gaji"],["die Bewerbung","die Bewerbungen","Lamaran"],["sich bewerben","-","Melamar pekerjaan"],["die Qualifikation","die Qualifikationen","Kualifikasi"]];
const bank = [["das Konto","die Konten","Rekening"],["das Formular","die Formulare","Formulir"],["der Ausweis","die Ausweise","Kartu identitas"],["die Überweisung","die Überweisungen","Transfer"],["der Antrag","die Anträge","Permohonan"],["die Unterschrift","die Unterschriften","Tanda tangan"],["abheben","-","Menarik uang"],["einzahlen","-","Menyetor uang"],["unterschreiben","-","Menandatangani"],["ausfüllen","-","Mengisi (formulir)"]];
const buildings = [["die Staatsoper","Opera Nasional","Gedung opera terkenal di dunia"],["das Parlament","Parlemen","Gedung parlemen Austria"],["das Rathaus","Balai Kota","Pusat pemerintahan kota Wina"],["die Universität Wien","Universitas Wina","Universitas tertua di negara berbahasa Jerman"],["das Kunsthistorische Museum","Museum Sejarah Seni","Salah satu museum terbesar di dunia"]];
const cityServices = [["das Verkehrsmittel","-","Alat transportasi"],["öffentlich","die öffentlichen Verkehrsmittel","Umum/publik"],["der Fahrer","-","Pengemudi"],["die Fahrerin","die Fahrerinnen","Pengemudi perempuan"],["transportieren","-","Mengangkut"],["die Polizei","Sg.","Polisi"],["beschützen","-","Melindungi"],["die Feuerwehr","Sg.","Pemadam kebakaran"],["die Sicherheit","Sg.","Keamanan"],["sich kümmern um","-","Mengurus/merawat"],["pflegen","-","Merawat"],["die Operation","die Operationen","Operasi"],["die Straßenreinigung","Sg.","Pembersihan jalan"],["aufräumen","-","Membereskan"],["die Ordnung","Sg.","Ketertiban"],["der Müll","Sg.","Sampah"],["die Müllabfuhr","Sg.","Pengangkutan sampah"],["die Mülltonne","die Mülltonnen","Tong sampah"],["leeren","-","Mengosongkan"]];
const jobSearch = [["die Stellenanzeige","die Stellenanzeigen","Iklan lowongan kerja"],["sich bewerben","hat beworben","Melamar"],["das Vorstellungsgespräch","die Vorstellungsgespräche","Wawancara kerja"],["die Unterlagen","Pl.","Berkas/dokumen"],["die Kenntnis","die Kenntnisse","Pengetahuan/kemampuan"],["die Teilzeit","Sg.","Paruh waktu"],["in Teilzeit arbeiten","-","Bekerja paruh waktu"],["die Bezahlung","Sg.","Pembayaran/upah"],["der Lohn","die Löhne","Upah"],["spontan","-","Spontan"],["der Bescheid","die Bescheide","Pemberitahuan/keputusan"]];
const restaurant = [["die Aushilfe","die Aushilfen","Pekerja bantuan/part-time"],["bedienen","-","Melayani"],["servieren","-","Menyajikan"],["die Zutat","die Zutaten","Bahan" ]];
const office = [["das Amt","die Ämter","Kantor pemerintahan"],["der Beamte","die Beamten","Pegawai negeri"],["die Beamtin","die Beamtinnen","Pegawai negeri perempuan"],["erledigen","-","Menyelesaikan urusan"],["ausfüllen","-","Mengisi formulir"],["der Antrag","die Anträge","Permohonan"],["genehmigen","-","Menyetujui"],["die Einbürgerung","die Einbürgerungen","Naturalisasi"],["das Dokument","die Dokumente","Dokumen"],["abgeben","-","Menyerahkan"],["Angaben prüfen","-","Memeriksa data"],["der Personalausweis","die Personalausweise","KTP/kartu identitas"],["beantragen","-","Mengajukan permohonan"],["verlängern","-","Memperpanjang"],["das Visum","die Visa","Visa"],["gültig","-","Berlaku/valid"],["die Grenze","die Grenzen","Perbatasan"]];
const bankExtra = [["der/die Angestellte","die Angestellten","Pegawai"],["abheben","hat abgehoben","Menarik uang"],["vom Konto Geld abheben","-","Menarik uang dari rekening"],["der Betrag","die Beträge","Jumlah uang"],["einen Betrag überweisen","-","Mentransfer sejumlah uang"],["ausgeben","hat ausgegeben","Mengeluarkan/membelanjakan"],["ein Konto eröffnen","-","Membuka rekening"],["die Bankkarte","die Bankkarten","Kartu bank"],["sperren","-","Memblokir"],["der Kredit","die Kredite","Kredit"],["die Geldbörse","die Geldbörsen","Dompet"],["leihen","hat geliehen","Meminjamkan/meminjam"]];
const policeTour = [["der Diebstahl","die Diebstähle","Pencurian"],["melden","-","Melapor"],["weg sein","-","Hilang/tidak ada"],["der Stadtplan","die Stadtpläne","Peta kota"],["der Tourist","die Touristen","Turis laki-laki"],["die Touristin","die Touristinnen","Turis perempuan"],["der Politiker","die Politiker","Politikus laki-laki"],["die Politikerin","die Politikerinnen","Politikus perempuan"],["das Parlament","die Parlamente","Parlemen"],["das Gesetz","die Gesetze","Undang-undang"],["die Verwaltung","Sg.","Administrasi/pemerintahan"],["das Gebäude","die Gebäude","Gedung"],["der Dom","die Dome","Katedral"],["die Disco","die Discos","Diskotek"]];
const expressions = [["bitten","hat gebeten","Meminta"],["der Gefallen","die Gefallen","Bantuan/kebaikan"],["um einen Gefallen bitten","-","Meminta bantuan"],["dringend","-","Mendesak"],["das Beste","Sg.","Yang terbaik"],["der/die Nächste","die Nächsten","Orang berikutnya / yang terdekat"],["der Fan","die Fans","Penggemar"],["der Daumen","die Daumen","Jempol"],["drücken","-","Menekan/menyemangati"],["bunt","-","Berwarna-warni"],["modern","-","Modern"],["funktionieren","-","Berfungsi"],["der Gedanke","die Gedanken","Pikiran"],["die Ruhe","Sg.","Ketenangan"],["die Entspannung","Sg.","Relaksasi"],["nehmen","hat genommen","Mengambil"],["über","-","Melalui/di atas/tentang"],["vorstellen","-","Memperkenalkan/membayangkan"],["vor","-","Sebelum/di depan"],["das Wunder","die Wunder","Keajaiban"]];
const flashcards = [...places, ...jobs, ...bank, ...cityServices, ...jobSearch, ...restaurant, ...office, ...bankExtra, ...policeTour, ...expressions];
const gameItems = [
  { clue: "Rumah sakit", answer: "das Krankenhaus" },
  { clue: "Stasiun kereta", answer: "der Bahnhof" },
  { clue: "Formulir", answer: "das Formular" },
  { clue: "Rekening", answer: "das Konto" },
  { clue: "Kantor pemerintahan", answer: "die Behörde" },
  { clue: "Iklan lowongan kerja", answer: "die Stellenanzeige" },
  { clue: "Pekerja bantuan / part-time", answer: "die Aushilfe" },
  { clue: "Memperpanjang", answer: "verlängern" },
  { clue: "Kartu bank", answer: "die Bankkarte" },
  { clue: "Pencurian", answer: "der Diebstahl" },
  { clue: "Katedral", answer: "der Dom" },
  { clue: "Meminta bantuan", answer: "um einen Gefallen bitten" },
];
const navItems = [["#vocab","📖","Kosakata"],["#grammar","📐","Grammatik"],["#phrases","💬","Redemittel"],["#dialog","🎭","Dialog"],["#culture","🌍","Wien"],["#games","🎮","Game"],["#exercises","✏️","Übungen"]];

const quizzes = [
  { id: "q1", title: "1. Ich besuche _____ alte Kirche. (Akkusativ, feminin)", correct: "b", options: [["a","der alten"],["b","die alte"],["c","das alte"],["d","den alten"]] },
  { id: "q2", title: "2. Er wohnt in _____ großen Stadt. (Dativ, feminin)", correct: "c", options: [["a","die große"],["b","dem großen"],["c","der großen"],["d","den großen"]] },
  { id: "q3", title: "3. Wir sehen _____ neuen Bahnhof. (Akkusativ, maskulin)", correct: "d", options: [["a","der neue"],["b","die neuen"],["c","das neue"],["d","den neuen"]] },
  { id: "q4", title: "4. Ich fahre _____ dem Bus zur Arbeit.", correct: "b", options: [["a","ohne"],["b","mit"]] },
  { id: "q5", title: "5. Sie geht _____ einen Regenschirm in den Regen.", correct: "b", options: [["a","mit"],["b","ohne"]] },
  { id: "q6", title: "6. _____ Sie mir bitte helfen? (formal)", correct: "b", options: [["a","Können"],["b","Könnten"],["c","Könnte"],["d","Könntest"]] },
  { id: "q7", title: "7. _____ du mir das Buch geben? (informal)", correct: "c", options: [["a","Könnten"],["b","Könnte"],["c","Könntest"],["d","Könntet"]] },
  { id: "q8", title: "8. \"Ich möchte Geld abheben\" berarti...", correct: "c", options: [["a","Saya ingin menyetor uang"],["b","Saya ingin mentransfer uang"],["c","Saya ingin menarik uang"],["d","Saya ingin menukar uang"]] },
  { id: "q9", title: "9. Apa bahasa Jerman untuk \"formulir\"?", correct: "b", options: [["a","der Antrag"],["b","das Formular"],["c","die Unterschrift"],["d","der Ausweis"]] },
  { id: "q10", title: "10. \"Die Behörde\" artinya...", correct: "c", options: [["a","Bank"],["b","Rumah sakit"],["c","Kantor pemerintahan"],["d","Universitas"]] },
];
const situationExercises = [
  ["Ihr Pass ist nur noch einen Monat lang gültig.", "das Visum verlängern"],
  ["Sie möchten einen Personalausweis bekommen.", "den Personalausweis beantragen"],
  ["Jemand hat Ihre Geldbörse gestohlen.", "den Diebstahl melden"],
  ["Vor Ihnen liegt ein Formular.", "das Formular ausfüllen"],
  ["Sie brauchen für Ihren Job ein Konto.", "ein Konto eröffnen"],
  ["Sie haben Ihre Geldbörse vergessen und brauchen ein bisschen Geld.", "Geld leihen"],
  ["Sie haben ein Problem und brauchen Hilfe.", "um einen Gefallen bitten"],
];

function Section({ id, children }: { id?: string; children: React.ReactNode }) { return <section id={id} className="mb-7 rounded-[22px] border border-[#dfeade] bg-white/95 p-8 shadow-[var(--shadow)] backdrop-blur max-[600px]:p-5">{children}</section>; }
function H2({ children }: { children: React.ReactNode }) { return <h2 className="mb-5 border-b border-[#b7d7b5] pb-3 text-[1.55em] font-black tracking-[-0.02em] text-[#176126]">{children}</h2>; }
function H3({ children }: { children: React.ReactNode }) { return <h3 className="mb-3 mt-6 flex items-center gap-2 text-[1.08em] font-extrabold text-[#24742d]">{children}</h3>; }
function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) { return <div className="my-4 overflow-hidden rounded-xl border border-[#d8e5d5]"><table className="w-full border-collapse bg-white text-sm"><thead><tr>{headers.map((h, i) => <th className="bg-[#287b31] px-4 py-3 text-left font-extrabold text-white" key={`${h}-${i}`}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr className={i%2===0?"bg-[#f3faef]":"bg-white"} key={i}>{r.map((c,j)=><td className="border-t border-[#d8e5d5] px-4 py-3 text-[#223326]" key={`${i}-${j}-${c}`}>{c}</td>)}</tr>)}</tbody></table></div>; }

function getCompactPlural(term: string, info: string) {
  if (info === "-") return "";
  if (info === "Sg." || info === "Pl.") return info;
  if (info.startsWith("hat ")) return `Perfekt: ${info}`;
  if (!info.startsWith("die ")) return info;

  const singular = term.replace(/^(der|die|das|der\/die)\s+/, "").split(" ").at(-1) ?? term;
  const plural = info.replace(/^die\s+/, "").split(" ").at(-1) ?? info;
  let index = 0;

  while (index < singular.length && index < plural.length && singular[index] === plural[index]) {
    index += 1;
  }

  const ending = plural.slice(index);
  return ending ? `-${ending}` : plural;
}

function VocabTable({ rows }: { rows: string[][] }) {
  return <div className="my-4 overflow-hidden rounded-xl border border-[#d8e5d5]"><table className="w-full table-fixed border-collapse bg-white text-sm"><thead><tr><th className="w-[58%] bg-[#287b31] px-4 py-3 text-left font-extrabold text-white max-[520px]:w-[54%]">Deutsch</th><th className="bg-[#287b31] px-4 py-3 text-left font-extrabold text-white">Bahasa Indonesia</th></tr></thead><tbody>{rows.map(([term, info, meaning], i) => { const compact = getCompactPlural(term, info); return <tr className={i%2===0?"bg-[#f3faef]":"bg-white"} key={`${term}-${meaning}`}><td className="border-t border-[#d8e5d5] px-4 py-3 text-[#223326]"><span className="font-bold">{term}</span>{compact && <span className="ml-2 inline-flex rounded-full bg-[#e2f2dc] px-2 py-0.5 text-xs font-black text-[#176126] max-[520px]:ml-0 max-[520px]:mt-1 max-[520px]:block max-[520px]:w-fit">{compact}</span>}</td><td className="border-t border-[#d8e5d5] px-4 py-3 text-[#223326]">{meaning}</td></tr>; })}</tbody></table></div>;
}
function Example({ children }: { children: React.ReactNode }) { return <div className="my-3 rounded-xl border border-[#f2dfa2] border-l-[5px] border-l-[#f6c343] bg-[#fff9e8] px-5 py-3 italic text-[#4a3b14]">{children}</div>; }
function Tip({ children }: { children: React.ReactNode }) { return <div className="my-3 rounded-xl border border-[#bfe4e7] border-l-[5px] border-l-[#00acc1] bg-[#ecfbfc] px-5 py-3 text-[#184f58]">{children}</div>; }
function Box({ title, children }: { title: string; children: React.ReactNode }) { return <div className="my-4 rounded-2xl border border-[#cde3ca] bg-[#f2faef] px-5 py-4"><h4 className="mb-3 font-black text-[#176126]">{title}</h4>{children}</div>; }

function Flashcards() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragged, setDragged] = useState(false);
  const [memorized, setMemorized] = useState<Record<string, boolean>>({});
  const card = flashcards[index];
  const cardKey = `${card[0]}-${card[2]}`;
  const learnedCount = Object.values(memorized).filter(Boolean).length;
  const isMemorized = Boolean(memorized[cardKey]);
  const next = () => { setIndex((value) => (value + 1) % flashcards.length); setFlipped(false); };
  const prev = () => { setIndex((value) => (value - 1 + flashcards.length) % flashcards.length); setFlipped(false); };
  const updateStatus = (value: boolean) => setMemorized((items) => ({ ...items, [cardKey]: value }));
  const onPointerUp = (x: number) => {
    if (dragStart === null) return;
    const distance = x - dragStart;
    setDragStart(null);
    if (Math.abs(distance) < 55) return;
    setDragged(true);
    if (distance < 0) next();
    else prev();
    window.setTimeout(() => setDragged(false), 0);
  };

  return <div className="rounded-2xl border border-[#cde3ca] bg-[#f6fbf3] p-5"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className={`rounded-full px-3 py-1 text-xs font-black ${isMemorized ? "bg-[#dff1db] text-[#176126]" : "bg-[#fff2c7] text-[#6d4f00]"}`}>{isMemorized ? "Sudah hafal" : "Belum hafal"}</span><span className="text-sm font-bold text-[#647268]">{learnedCount} / {flashcards.length} hafal</span></div><button className="group h-[230px] w-full touch-pan-y [perspective:1200px]" onClick={() => { if (!dragged) setFlipped((value) => !value); }} onPointerDown={(event) => { setDragStart(event.clientX); setDragged(false); }} onPointerLeave={(event) => onPointerUp(event.clientX)} onPointerUp={(event) => onPointerUp(event.clientX)}><span className={`relative block h-full w-full rounded-[24px] transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}><span className="absolute inset-0 flex flex-col items-center justify-center rounded-[24px] border border-[#b7d7b5] bg-[radial-gradient(circle_at_20%_15%,#fff8c7_0%,transparent_28%),linear-gradient(135deg,#ffffff_0%,#eaf8e6_100%)] px-6 text-center shadow-[0_18px_45px_rgba(38,117,49,0.16)] [backface-visibility:hidden] group-hover:shadow-[0_22px_55px_rgba(38,117,49,0.22)]"><span className="mb-4 rounded-full bg-[#287b31] px-4 py-1 text-xs font-black uppercase tracking-[0.28em] text-white">Deutsch</span><span className="text-3xl font-black text-[#176126] max-[600px]:text-2xl">{card[0]}</span><span className="mt-5 text-sm font-bold text-[#647268]">Klik balik, geser kiri/kanan</span></span><span className="absolute inset-0 flex flex-col items-center justify-center rounded-[24px] border border-[#f2dfa2] bg-[radial-gradient(circle_at_82%_18%,#c9f3cf_0%,transparent_30%),linear-gradient(135deg,#fff9e8_0%,#ffffff_100%)] px-6 text-center shadow-[0_18px_45px_rgba(74,59,20,0.14)] [backface-visibility:hidden] [transform:rotateY(180deg)]"><span className="mb-4 rounded-full bg-[#f6c343] px-4 py-1 text-xs font-black uppercase tracking-[0.28em] text-[#4a3b14]">Arti</span><span className="text-3xl font-black text-[#4a3b14] max-[600px]:text-2xl">{card[2]}</span><span className="mt-5 rounded-xl bg-white/80 px-4 py-2 text-sm font-black text-[#176126]">Plural: {card[1]}</span></span></span></button><div className="mt-4 grid grid-cols-2 gap-2"><button className={`rounded-xl px-4 py-2 font-bold ${isMemorized ? "bg-[#287b31] text-white" : "bg-[#edf8ea] text-[#176126] hover:bg-[#dff1db]"}`} onClick={() => updateStatus(true)}>Sudah hafal</button><button className={`rounded-xl px-4 py-2 font-bold ${!isMemorized ? "bg-[#f6c343] text-[#4a3b14]" : "bg-[#fff7dd] text-[#6d4f00] hover:bg-[#ffefb0]"}`} onClick={() => updateStatus(false)}>Belum hafal</button></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><button className="rounded-xl bg-[#edf8ea] px-5 py-2 font-bold text-[#176126] hover:bg-[#dff1db]" onClick={prev}>← Sebelumnya</button><span className="font-bold text-[#647268]">{index + 1} / {flashcards.length}</span><button className="rounded-xl bg-[#287b31] px-5 py-2 font-bold text-white hover:bg-[#176126]" onClick={next}>Berikutnya →</button></div></div>;
}

function MiniGame() {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const item = gameItems[current];
  const normalizedInput = input.trim().toLowerCase();
  const normalizedAnswer = item.answer.toLowerCase();
  const check = () => {
    if (!normalizedInput) return setMessage("Tulis jawaban dulu ya.");
    if (normalizedInput === normalizedAnswer) {
      setScore((value) => value + 1);
      setCurrent((value) => (value + 1) % gameItems.length);
      setInput("");
      setMessage("Benar! Lanjut soal berikutnya.");
    }
    else setMessage(`Hampir! Jawaban: ${item.answer}`);
  };
  const next = () => { setCurrent((value) => (value + 1) % gameItems.length); setInput(""); setMessage(""); };

  return <div className="rounded-2xl border border-[#cde3ca] bg-white p-5 shadow-sm"><p className="text-sm font-black uppercase tracking-[0.25em] text-[#6d8f69]">Tebak Deutsch</p><h3 className="my-3 text-2xl font-black text-[#176126]">{item.clue}</h3><input className="w-full rounded-xl border border-[#cde3ca] bg-[#f8fcf6] px-4 py-3 outline-none focus:border-[#287b31]" placeholder="Contoh: die Stadt" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") check(); }} /><div className="mt-4 flex flex-wrap gap-3"><button className="rounded-xl bg-[#287b31] px-5 py-2 font-bold text-white hover:bg-[#176126]" onClick={check}>Cek Jawaban</button><button className="rounded-xl bg-[#edf8ea] px-5 py-2 font-bold text-[#176126] hover:bg-[#dff1db]" onClick={next}>Soal Berikutnya</button></div>{message && <div className="mt-4 rounded-xl bg-[#fff9e8] px-4 py-3 font-bold text-[#4a3b14]">{message}</div>}<p className="mt-3 font-bold text-[#647268]">Skor: {score}</p></div>;
}

function Quiz({ quiz, onAnswer }: { quiz: typeof quizzes[number]; onAnswer: (id: string, ok: boolean) => void }) {
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState<"correct" | "incorrect" | "empty" | null>(null);
  const check = () => { if (!selected) return setResult("empty"); const ok = selected === quiz.correct; setResult(ok ? "correct" : "incorrect"); onAnswer(quiz.id, ok); };
  return <div className="my-3 rounded-[10px] bg-[#f3e5f5] px-5 py-4"><p className="mb-2 font-semibold">{quiz.title}</p>{quiz.options.map(([value,label])=><label className="my-1 block cursor-pointer rounded-md px-3 py-1.5 transition-colors hover:bg-[#e1bee7]" key={value}><input className="mr-2" type="radio" name={quiz.id} value={value} checked={selected===value} onChange={() => setSelected(value)} />{label}</label>)}<button className="mt-2.5 inline-block cursor-pointer rounded-lg border-0 bg-[#2e7d32] px-6 py-2.5 text-[1em] text-white hover:bg-[#1b5e20]" onClick={check}>Periksa</button>{result && <div className={`mt-3 rounded-lg p-3 font-semibold ${result === "correct" ? "bg-[#c8e6c9] text-[#1b5e20]" : "bg-[#ffcdd2] text-[#b71c1c]"}`}>{result === "correct" ? "✅ Benar! Sehr gut!" : result === "empty" ? "⚠️ Pilih jawaban terlebih dahulu!" : "❌ Salah. Coba lagi!"}</div>}</div>;
}

export default function Home() {
  const [answers, setAnswers] = useState<Answers>({});
  const [show, setShow] = useState(false);
  const correct = Object.values(answers).filter(Boolean).length;
  const scoreText = correct === 10 ? `🎉 Perfekt! Skor Anda: ${correct}/10` : correct >= 7 ? `👏 Sehr gut! Skor Anda: ${correct}/10` : correct >= 4 ? `📚 Gut, tapi perlu latihan lagi. Skor: ${correct}/10` : `💪 Terus belajar! Skor: ${correct}/10`;
  return <main className="mx-auto max-w-[920px] px-5 py-6"><header className="mb-8 overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#267531_0%,#63bd6b_100%)] px-8 py-12 text-center text-white shadow-[0_20px_55px_rgba(38,117,49,0.24)]"><p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-[#fff4bd]">Deutsch Lernen</p><h1 className="mb-3 text-[2.25em] font-black tracking-[-0.03em] max-[600px]:text-[1.7em]">🇩🇪 Kapitel 5: Leben in der Stadt</h1><p className="text-[1.05em] opacity-95">Materi Lengkap Bahasa Jerman — Hidup di Kota</p></header>
  <nav className="sticky top-3 z-50 mb-7 rounded-[22px] border border-[#b7d7b5] bg-white/92 px-3 py-3 shadow-[0_14px_38px_rgba(38,117,49,0.16)] backdrop-blur"><div className="flex flex-wrap items-center gap-2"><a className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#287b31] px-4 py-2 text-sm font-black text-white no-underline shadow-sm transition hover:bg-[#176126]" href="#"><span>🇩🇪</span><span>Kapitel 5</span></a>{navItems.map(([href,icon,text])=><a className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#edf8ea] px-4 py-2 text-sm font-black text-[#176126] no-underline transition hover:-translate-y-0.5 hover:bg-[#287b31] hover:text-white hover:shadow-md max-[520px]:px-3" href={href} key={href}><span>{icon}</span><span>{text}</span></a>)}</div></nav>
  <Section><H2>📋 Daftar Isi</H2><div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">{[["#vocab","1. Kosakata (Wortschatz)"],["#grammar","2. Tata Bahasa (Grammatik)"],["#phrases","3. Frasa Umum (Redemittel)"],["#dialog","4. Dialog & Situasi"],["#culture","5. Landeskunde: Wien"],["#games","6. Flashcard & Mini Game"],["#exercises","7. Latihan Soal (Übungen)"]].map(([href,text])=><a className="block rounded-xl border border-[#d5e8d1] bg-[#edf8ea] px-4 py-3 font-bold text-[#176126] no-underline transition hover:-translate-y-0.5 hover:bg-[#dff1db] hover:shadow-md" href={href} key={href}>{text}</a>)}</div></Section>
  <Section id="vocab"><H2>1. 📖 Kosakata — Wortschatz</H2><H3>🏙️ Kota & Tempat (Stadt & Orte)</H3><VocabTable rows={places}/><H3>🚦 Layanan Kota (in der Stadt)</H3><VocabTable rows={cityServices}/><H3>💼 Pekerjaan & Wawancara (Bewerbungsgespräch)</H3><VocabTable rows={jobs}/><H3>🔎 Mencari Kerja (einen Job suchen)</H3><VocabTable rows={jobSearch}/><H3>�️ Bekerja di Restoran (im Restaurant arbeiten)</H3><VocabTable rows={restaurant}/><H3>🏛️ Di Kantor Pemerintahan (bei der Behörde)</H3><VocabTable rows={office}/><H3>�🏦 Di Bank & Kantor (Bei der Bank & Behörde)</H3><VocabTable rows={bank}/><H3>💳 Tambahan Kosakata Bank (in der Bank)</H3><VocabTable rows={bankExtra}/><H3>👮 Polisi & Tur Kota</H3><VocabTable rows={policeTour}/><H3>✨ Kata dan Ungkapan Lainnya</H3><VocabTable rows={expressions}/></Section>
  <Section id="grammar"><H2>2. 📐 Tata Bahasa — Grammatik</H2><H3>A. Adjektive nach dem bestimmten Artikel</H3><p>Ketika kata sifat muncul setelah artikel tertentu (<em>der, die, das</em>), endingnya berubah sesuai kasus:</p><Box title="Tabel Deklinasi"><DataTable headers={["Kasus","Maskulin (der)","Feminin (die)","Neutral (das)","Plural (die)"]} rows={[["Nominativ","der große Park","die schöne Stadt","das alte Haus","die kleinen Straßen"],["Akkusativ","den großen Park","die schöne Stadt","das alte Haus","die kleinen Straßen"],["Dativ","dem großen Park","der schönen Stadt","dem alten Haus","den kleinen Straßen"]]}/></Box><Tip>💡 <strong>Tips:</strong> Setelah artikel tertentu, akhiran kata sifat hanya <strong>-e</strong> atau <strong>-en</strong>. Nominativ singular selalu <strong>-e</strong>, sisanya <strong>-en</strong> (kecuali Akkusativ feminin & neutral = <strong>-e</strong>).</Tip><Example>Ich besuche <strong>die alte Kirche</strong>. → Saya mengunjungi gereja tua itu.<br/><span className="text-[0.9em] not-italic text-[#666]">Er wohnt in <strong>dem kleinen Haus</strong>. → Dia tinggal di rumah kecil itu.</span></Example><H3>B. Präpositionen: <em>ohne</em> + Akkusativ & <em>mit</em> + Dativ</H3><Box title="ohne + Akkusativ (tanpa)"><DataTable headers={["Contoh","Arti"]} rows={[["ohne den Ausweis","tanpa kartu identitas"],["ohne eine Bewerbung","tanpa lamaran"],["ohne das Formular","tanpa formulir"]]}/></Box><Box title="mit + Dativ (dengan)"><DataTable headers={["Contoh","Arti"]} rows={[["mit dem Bus","dengan bus"],["mit der Straßenbahn","dengan trem"],["mit dem Fahrrad","dengan sepeda"],["mit den Freunden","dengan teman-teman"]]}/></Box><Example>Ich fahre <strong>mit dem Zug</strong> nach Wien. → Saya naik kereta ke Wina.<br/>Er geht <strong>ohne den Regenschirm</strong>. → Dia pergi tanpa payung.</Example><H3>C. Konjunktiv II: <em>könnte</em> (Bisa / Bisakah)</H3><p>Digunakan untuk permintaan sopan, saran, atau kemungkinan. Ini adalah bentuk sopan dari <em>können</em>.</p><Box title="Konjugasi könnte"><DataTable headers={["Pronomen","Konjugasi","Contoh"]} rows={[["ich","könnte","Ich könnte Ihnen helfen."],["du","könntest","Könntest du mir das Formular geben?"],["er/sie/es","könnte","Er könnte morgen kommen."],["wir","könnten","Wir könnten zusammen gehen."],["ihr","könntet","Könntet ihr mir helfen?"],["sie/Sie","könnten","Könnten Sie das bitte wiederholen?"]]}/></Box><Tip>💡 <strong>Tips:</strong> Gunakan <em>Könnten Sie...?</em> untuk situasi formal (di bank, kantor, wawancara). Gunakan <em>Könntest du...?</em> untuk situasi informal.</Tip><Example><strong>Könnten Sie</strong> mir bitte helfen? → Bisakah Anda membantu saya?<br/><strong>Könnte</strong> ich ein Konto eröffnen? → Bisakah saya membuka rekening?</Example></Section>
  <Section id="phrases"><H2>3. 💬 Frasa Umum — Redemittel</H2>{[["🙏 Meminta dengan Sopan (Höflich bitten)",["Könnten Sie mir bitte helfen? → Bisakah Anda membantu saya?","Könnte ich bitte einen Termin haben? → Bisakah saya mendapat janji temu?","Dürfte ich Sie etwas fragen? → Bolehkah saya bertanya sesuatu?","Wären Sie so freundlich, mir zu helfen? → Maukah Anda membantu saya?"]],["🔍 Menanyakan Sesuatu (Nach Dingen fragen)",["Wo ist die nächste Bank? → Di mana bank terdekat?","Wie komme ich zum Bahnhof? → Bagaimana saya bisa ke stasiun?","Können Sie mir den Weg zeigen? → Bisakah Anda menunjukkan jalannya?","Was brauche ich für den Antrag? → Apa yang saya butuhkan untuk permohonan?"]],["🏦 Di Bank (Gespräche bei der Bank)",["Ich möchte ein Konto eröffnen. → Saya ingin membuka rekening.","Kann ich Geld abheben? → Bisakah saya menarik uang?","Ich möchte Geld überweisen. → Saya ingin mentransfer uang."]],["🏛️ Di Kantor Pemerintahan (Bei der Behörde)",["Ich brauche eine Anmeldung. → Saya perlu registrasi.","Wo muss ich unterschreiben? → Di mana saya harus tanda tangan?","Welche Dokumente brauche ich? → Dokumen apa yang saya butuhkan?"]],["🏙️ Mendeskripsikan Kota (Eine Stadt beschreiben)",["Die Stadt ist sehr schön und modern. → Kota ini sangat cantik dan modern.","Es gibt viele Parks und Museen. → Ada banyak taman dan museum.","Die Altstadt ist besonders sehenswert. → Kota tua sangat layak dikunjungi.","Man kann gut mit der U-Bahn fahren. → Bisa dengan mudah naik metro."]]].map(([title,items])=><div key={title as string}><H3>{title as string}</H3>{(items as string[]).map(x=><Example key={x}>{x}</Example>)}</div>)}</Section>
  <Section id="dialog"><H2>4. 🎭 Contoh Dialog</H2><H3>Dialog 1: Di Bank</H3><div className="my-2.5 rounded-[10px] bg-[#f9fbe7] p-[18px]"><p><strong>🧑 Kunde:</strong> Guten Tag! Ich möchte ein Konto eröffnen.</p><p><strong>👨‍💼 Bankangestellter:</strong> Guten Tag! Haben Sie Ihren Ausweis dabei?</p><p><strong>🧑 Kunde:</strong> Ja, hier bitte. Könnten Sie mir erklären, welche Konten es gibt?</p><p><strong>👨‍💼 Bankangestellter:</strong> Natürlich. Wir haben ein Girokonto und ein Sparkonto.</p><p><strong>🧑 Kunde:</strong> Ich möchte ein Girokonto. Was muss ich ausfüllen?</p><p><strong>👨‍💼 Bankangestellter:</strong> Bitte füllen Sie dieses Formular aus und unterschreiben Sie hier.</p><p><strong>🧑 Kunde:</strong> Vielen Dank für Ihre Hilfe!</p></div><H3>Dialog 2: Wawancara Kerja</H3><div className="my-2.5 rounded-[10px] bg-[#f9fbe7] p-[18px]"><p><strong>👨‍💼 Interviewer:</strong> Guten Tag, Frau Müller. Bitte setzen Sie sich.</p><p><strong>👩 Bewerberin:</strong> Vielen Dank. Ich freue mich über die Einladung.</p><p><strong>👨‍💼 Interviewer:</strong> Erzählen Sie uns von Ihrer Erfahrung.</p><p><strong>👩 Bewerberin:</strong> Ich habe drei Jahre als Sekretärin gearbeitet. Ich könnte sofort anfangen.</p><p><strong>👨‍💼 Interviewer:</strong> Sehr gut. Könnten Sie auch am Wochenende arbeiten?</p><p><strong>👩 Bewerberin:</strong> Ja, das wäre kein Problem.</p></div></Section>
  <Section id="culture"><H2>5. 🌍 Landeskunde: Rund um den Ring — Wien</H2><p><strong>Die Ringstraße</strong> adalah jalan boulevard terkenal di Wina (Wien), ibu kota Austria. Jalan ini mengelilingi pusat kota tua (<em>Innere Stadt</em>) dan dibangun pada abad ke-19.</p><p>Di sepanjang Ringstraße, Anda bisa menemukan bangunan penting seperti:</p><DataTable headers={["Gebäude","Arti","Fungsi"]} rows={buildings}/><Tip>💡 Wien sering disebut sebagai salah satu kota paling layak huni di dunia!</Tip></Section>
  <Section id="games"><H2>6. 🎮 Flashcard & Mini Game</H2><div className="grid grid-cols-2 gap-5 max-[760px]:grid-cols-1"><div><H3>🃏 Flashcard Kosakata</H3><Flashcards /></div><div><H3>⚡ Mini Game</H3><MiniGame /></div></div></Section>
  <Section id="exercises"><H2>7. ✏️ Latihan Soal — Übungen</H2><H3>Übung 1: Pilihan Ganda — Adjektivdeklination</H3>{quizzes.slice(0,3).map(q=><Quiz key={q.id} quiz={q} onAnswer={(id,ok)=>setAnswers(a=>({...a,[id]:ok}))}/>) }<H3>Übung 2: mit oder ohne?</H3>{quizzes.slice(3,5).map(q=><Quiz key={q.id} quiz={q} onAnswer={(id,ok)=>setAnswers(a=>({...a,[id]:ok}))}/>) }<H3>Übung 3: Konjunktiv II — könnte</H3>{quizzes.slice(5,7).map(q=><Quiz key={q.id} quiz={q} onAnswer={(id,ok)=>setAnswers(a=>({...a,[id]:ok}))}/>) }<H3>Übung 4: Kosakata</H3>{quizzes.slice(7).map(q=><Quiz key={q.id} quiz={q} onAnswer={(id,ok)=>setAnswers(a=>({...a,[id]:ok}))}/>) }<H3>Übung 5: Was machen Sie in dieser Situation?</H3><Box title="Lengkapi dengan ungkapan yang sesuai">{situationExercises.map(([situation, answer], index)=><div className="my-3 rounded-xl border border-[#d8e5d5] bg-white px-4 py-3" key={situation}><p className="font-bold text-[#223326]">{index + 1}. {situation}</p><p className="mt-1 text-[#176126]"><strong>Antwort:</strong> {answer}</p></div>)}</Box><div className="mt-6 text-center"><button className="inline-block cursor-pointer rounded-lg border-0 bg-[#2e7d32] px-8 py-3 text-[1.1em] text-white hover:bg-[#1b5e20]" onClick={()=>setShow(true)}>📊 Lihat Skor Total</button>{show && <div className="mt-4 text-[1.3em] font-bold text-[#2e7d32]">{scoreText}</div>}</div></Section>
  <footer className="p-5 text-center text-[0.9em] text-[#888]">Materi Bahasa Jerman — Kapitel 5: Leben in der Stadt<br/>Viel Erfolg beim Lernen! 🍀</footer></main>;
}
