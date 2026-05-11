export type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  status: "ready" | "soon";
};

export type PageImage = {
  page: number;
  src: string;
  title: string;
  focus: string;
};

export type StudyModule = {
  id: string;
  title: string;
  badge: string;
  minutes: number;
  summary: string;
  goals: string[];
};

export type StudyTask = {
  id: string;
  module: string;
  label: string;
  xp: number;
};

export type VocabItem = {
  de: string;
  id: string;
  note?: string;
  example?: string;
};

export type VocabGroup = {
  title: string;
  items: VocabItem[];
};

export type GrammarBlock = {
  title: string;
  rule: string;
  rows: string[][];
  examples: string[];
  trap?: string;
};

export type PhraseGroup = {
  title: string;
  rows: {
    de: string;
    id: string;
    context?: string;
  }[];
};

export type ReadingBlock = {
  title: string;
  summary: string;
  details: string[];
  task: string;
};

export type Quiz = {
  id: string;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export const chapters: Chapter[] = [
  { id: "1", title: "Kapitel 1", subtitle: "Belum diisi", status: "soon" },
  { id: "2", title: "Kapitel 2", subtitle: "Belum diisi", status: "soon" },
  { id: "3", title: "Kapitel 3", subtitle: "Belum diisi", status: "soon" },
  { id: "4", title: "Kapitel 4", subtitle: "Belum diisi", status: "soon" },
  { id: "5", title: "Kapitel 5", subtitle: "Leben in der Stadt", status: "soon" },
  { id: "6", title: "Kapitel 6", subtitle: "Arbeitswelten", status: "ready" },
];

export const pageImages: PageImage[] = [
  { page: 64, src: "/kapitel-6/bukua2kursbuch_page-0064.jpg", title: "Arbeitswelten", focus: "Beruf, Freizeit, Nachrichten zuordnen" },
  { page: 65, src: "/kapitel-6/bukua2kursbuch_page-0065.jpg", title: "Taetigkeiten im Beruf", focus: "Arbeitsalltag, Vorlieben, Termine" },
  { page: 66, src: "/kapitel-6/bukua2kursbuch_page-0066.jpg", title: "Auf Geschaeftsreise", focus: "Bahnhof, Fahrkarten, Dialog am Schalter" },
  { page: 67, src: "/kapitel-6/bukua2kursbuch_page-0067.jpg", title: "Das Abend-Programm", focus: "Freizeitangebote, Anzeigen, Adjektivendungen" },
  { page: 68, src: "/kapitel-6/bukua2kursbuch_page-0068.jpg", title: "Der Traumberuf", focus: "Berufswechsel, Personen vorstellen" },
  { page: 69, src: "/kapitel-6/bukua2kursbuch_page-0069.jpg", title: "werden", focus: "Berufswuensche, Grammatik, Aussprache m/n" },
  { page: 70, src: "/kapitel-6/bukua2kursbuch_page-0070.jpg", title: "Telefonieren am Arbeitsplatz", focus: "Telefonstrategien und Redemittel" },
  { page: 71, src: "/kapitel-6/bukua2kursbuch_page-0071.jpg", title: "Die moderne Arbeitswelt", focus: "Informationen aus Texten weitergeben" },
  { page: 72, src: "/kapitel-6/bukua2kursbuch_page-0072.jpg", title: "Die Netzwerk-WG", focus: "Hoeren und sehen, Fingeralphabet" },
  { page: 73, src: "/kapitel-6/bukua2kursbuch_page-0073.jpg", title: "Kurz und klar", focus: "Redemittel und Grammatik kompakt" },
  { page: 74, src: "/kapitel-6/bukua2kursbuch_page-0074.jpg", title: "Wiederholungsspiel", focus: "Brettspiel, Sprechen, Wiederholen" },
  { page: 75, src: "/kapitel-6/bukua2kursbuch_page-0075.jpg", title: "Wiederholungsspiel II", focus: "Situationen, Bitten, Stadt und Beruf" },
  { page: 76, src: "/kapitel-6/bukua2kursbuch_page-0076.jpg", title: "Spiel mit Woertern", focus: "Wortfelder, Reime, wenn-Saetze" },
  { page: 77, src: "/kapitel-6/bukua2kursbuch_page-0077.jpg", title: "Alles, was zaehlt", focus: "Liedthema: Zahlen und Werte im Leben" },
  { page: 78, src: "/kapitel-6/bukua2kursbuch_page-0078.jpg", title: "Feste in D-A-CH", focus: "Weihnachten, Silvester, Feste vergleichen" },
  { page: 79, src: "/kapitel-6/bukua2kursbuch_page-0079.jpg", title: "Basler Fasnacht", focus: "Fasnacht, Ostern, Sprachmittlung" },
  { page: 80, src: "/kapitel-6/bukua2kursbuch_page-0080.jpg", title: "Lernwortschatz I", focus: "Wortschatzlisten Kapitel 6" },
  { page: 81, src: "/kapitel-6/bukua2kursbuch_page-0081.jpg", title: "Lernwortschatz II", focus: "Telefon, moderne Arbeitswelt, wichtige Woerter" },
];

export const modules: StudyModule[] = [
  {
    id: "arbeitswelten",
    title: "Arbeitswelten",
    badge: "Beruf + Freizeit",
    minutes: 18,
    summary: "Kamu mulai dari rutinitas kerja Ella dan Samuel, lalu membedakan aktivitas kerja dan Freizeit.",
    goals: ["menjelaskan pekerjaan seseorang", "menyebut kegiatan yang disukai/tidak disukai", "membaca pesan singkat tentang jadwal"],
  },
  {
    id: "bahnreise",
    title: "Auf Geschaeftsreise",
    badge: "Bahnhof",
    minutes: 22,
    summary: "Fokus pada situasi di stasiun: membaca Fahrplan, membeli tiket, dan menanyakan koneksi kereta.",
    goals: ["bertanya jadwal kereta", "memilih einfach atau hin und zurueck", "memesan tempat duduk"],
  },
  {
    id: "abendprogramm",
    title: "Das Abend-Programm",
    badge: "Freizeit",
    minutes: 20,
    summary: "Kamu membaca iklan acara di Wiesbaden dan belajar memilih tawaran yang cocok.",
    goals: ["mengelompokkan Angebot: Essen, Sport, Theater, Museum, Konzert", "memberi rekomendasi tempat", "memakai Adjektive nach dem unbestimmten Artikel"],
  },
  {
    id: "traumberuf",
    title: "Der Traumberuf",
    badge: "werden",
    minutes: 24,
    summary: "Materi tentang Berufswechsel, mimpi kerja, dan cara memakai werden untuk perubahan.",
    goals: ["menceritakan Berufswechsel", "memakai werden + Nomen/Adjektiv/Alter", "menulis teks pendek tentang Traumberuf"],
  },
  {
    id: "telefon",
    title: "Telefonieren am Arbeitsplatz",
    badge: "Redemittel",
    minutes: 20,
    summary: "Kamu menyiapkan panggilan formal, meninggalkan pesan, dan meminta Durchwahl.",
    goals: ["membuka percakapan telepon formal", "meninggalkan Nachricht", "memberi Rueckmeldung singkat"],
  },
  {
    id: "modernearbeit",
    title: "Die moderne Arbeitswelt",
    badge: "Lesen",
    minutes: 26,
    summary: "Kamu membaca tren kerja modern: mobil, digital, robot, fleksibel, internasional.",
    goals: ["memilih Ueberschrift yang tepat", "mencatat Schluesselwoerter", "menyampaikan informasi inti dengan bahasa sendiri"],
  },
  {
    id: "plattform",
    title: "Plattform 2",
    badge: "Review",
    minutes: 30,
    summary: "Bagian pengulangan dengan permainan, Feste in D-A-CH, kosakata akhir, dan Sprachmittlung.",
    goals: ["mengulang Kapitel 6 lewat prompt permainan", "membandingkan Feste", "mengunci Lernwortschatz"],
  },
];

export const studyTasks: StudyTask[] = [
  { id: "overview-read", module: "Home", label: "Baca peta Kapitel 6 dan pilih modul pertama", xp: 8 },
  { id: "images-mark-5", module: "Galeri", label: "Tandai minimal 5 halaman gambar sebagai sudah dibaca", xp: 10 },
  { id: "work-like-dislike", module: "Arbeitswelten", label: "Tulis 5 kegiatan kerja yang kamu suka dan 5 yang tidak suka", xp: 12 },
  { id: "ella-samuel", module: "Arbeitswelten", label: "Ceritakan satu minggu kerja Ella/Samuel dalam 6 kalimat", xp: 12 },
  { id: "bahn-dialog", module: "Bahnreise", label: "Latih dialog Fahrkartenschalter sampai lancar 2 putaran", xp: 14 },
  { id: "bahn-plan", module: "Bahnreise", label: "Buat rute kereta imajiner: Abfahrt, Gleis, Umsteigen, Ankunft", xp: 12 },
  { id: "angebot-sort", module: "Abendprogramm", label: "Kelompokkan 10 Freizeitangebote ke Essen, Sport, Theater, Museum, Konzert", xp: 10 },
  { id: "adjektiv-table", module: "Grammatik", label: "Isi ulang tabel Adjektivendungen tanpa melihat catatan", xp: 16 },
  { id: "traumberuf-text", module: "Traumberuf", label: "Tulis 80 kata tentang Traumberuf kamu", xp: 18 },
  { id: "werden-six", module: "Grammatik", label: "Buat 6 kalimat dengan werden: Nomen, Adjektiv, Alter", xp: 14 },
  { id: "phone-script", module: "Telefon", label: "Siapkan skrip telepon formal untuk meminta Rückruf", xp: 15 },
  { id: "phone-smile", module: "Telefon", label: "Rekam suara 30 detik: jelas, lambat, tersenyum", xp: 10 },
  { id: "modern-headings", module: "Moderne Arbeitswelt", label: "Pasangkan 6 heading modern Arbeitswelt dengan ringkasannya", xp: 16 },
  { id: "modern-opinion", module: "Moderne Arbeitswelt", label: "Ucapkan pendapat: 3 hal positif dan 3 risiko dunia kerja modern", xp: 14 },
  { id: "network-wg", module: "Netzwerk-WG", label: "Buchstabieren nama kamu dan 3 kata kerja secara 'stumm'", xp: 10 },
  { id: "feste-compare", module: "Feste", label: "Bandingkan Weihnachten/Silvester/Ostern dengan tradisi di Indonesia", xp: 14 },
  { id: "word-game", module: "Plattform", label: "Mainkan 8 prompt Wiederholungsspiel sendiri dengan jawaban lisan", xp: 12 },
  { id: "vocab-30", module: "Wortschatz", label: "Kuasai 30 kartu kosakata", xp: 20 },
  { id: "quiz-perfect", module: "Uebung", label: "Selesaikan quiz dengan minimal 80 persen benar", xp: 18 },
];

export const vocabGroups: VocabGroup[] = [
  {
    title: "Taetigkeiten im Beruf",
    items: [
      { de: "die Taetigkeit, -en", id: "kegiatan/aktivitas", example: "Welche Taetigkeiten machen Sie gern?" },
      { de: "einen Termin einhalten", id: "menepati janji/deadline", example: "Ich muss den Termin einhalten." },
      { de: "beraten", id: "memberi konsultasi", example: "Ella beraet Kunden." },
      { de: "organisieren", id: "mengorganisasi", example: "Samuel organisiert Projekte." },
      { de: "kontrollieren", id: "mengontrol/memeriksa", example: "Die Chefin kontrolliert die Arbeit." },
      { de: "korrigieren", id: "mengoreksi", example: "Der Lehrer korrigiert Tests." },
      { de: "Projekte machen", id: "mengerjakan proyek" },
      { de: "Dinge organisieren", id: "mengatur berbagai hal" },
      { de: "andere beraten", id: "memberi saran kepada orang lain" },
      { de: "morgens frueh beginnen", id: "mulai pagi-pagi" },
      { de: "am Wochenende arbeiten", id: "bekerja saat akhir pekan" },
      { de: "zu Behoerden gehen", id: "pergi ke kantor pemerintahan" },
      { de: "der Aerger", id: "masalah/kekesalan" },
      { de: "Es klappt nicht.", id: "Ini tidak berhasil." },
      { de: "spaeter aufstehen", id: "bangun lebih siang" },
      { de: "Feierabend machen", id: "selesai kerja" },
    ],
  },
  {
    title: "Bahnreisen und Bahnhof",
    items: [
      { de: "die Bahn, -en", id: "kereta/perusahaan kereta" },
      { de: "der Bahnhof, -hoefe", id: "stasiun" },
      { de: "der Fahrplan, -plaene", id: "jadwal perjalanan" },
      { de: "die Zugverbindung, -en", id: "koneksi/rute kereta" },
      { de: "die Durchsage, -n", id: "pengumuman" },
      { de: "der Wagen, -", id: "gerbong" },
      { de: "das Gleis, -e", id: "peron/jalur kereta" },
      { de: "der Schalter, -", id: "loket" },
      { de: "die Hinfahrt, -en", id: "perjalanan pergi" },
      { de: "die Rueckfahrt, -en", id: "perjalanan pulang" },
      { de: "die Fahrkarte, -n", id: "tiket" },
      { de: "einfach", id: "sekali jalan" },
      { de: "hin und zurueck", id: "pulang-pergi" },
      { de: "umsteigen", id: "ganti kendaraan/kereta" },
      { de: "ankommen", id: "tiba" },
      { de: "abfahren", id: "berangkat" },
      { de: "zurueckkommen", id: "kembali" },
      { de: "die Klasse, -n", id: "kelas" },
      { de: "erste Klasse", id: "kelas satu" },
      { de: "zweite Klasse", id: "kelas dua" },
      { de: "nebeneinander", id: "bersebelahan" },
      { de: "der Gang", id: "lorong" },
      { de: "am Fenster", id: "di dekat jendela" },
      { de: "der Sitzplatz, -plaetze", id: "tempat duduk" },
      { de: "reservieren", id: "memesan/reservasi" },
      { de: "die BahnCard", id: "kartu diskon kereta" },
    ],
  },
  {
    title: "Stadtprogramm und Freizeitangebote",
    items: [
      { de: "das Angebot, -e", id: "tawaran" },
      { de: "die Veranstaltung, -en", id: "acara" },
      { de: "das Konzert, -e", id: "konser" },
      { de: "das Theater", id: "teater" },
      { de: "das Museum, Museen", id: "museum" },
      { de: "das Restaurant, -s", id: "restoran" },
      { de: "die Kneipe, -n", id: "bar/pub" },
      { de: "der Biergarten, -gaerten", id: "taman bir" },
      { de: "das Cafe, -s", id: "kafe" },
      { de: "das Kino, -s", id: "bioskop" },
      { de: "die Sehenswuerdigkeit, -en", id: "tempat wisata" },
      { de: "die Ermaessigung, -en", id: "diskon/potongan harga" },
      { de: "die Saengerin, -nen", id: "penyanyi perempuan" },
      { de: "die Band, -s", id: "band" },
      { de: "das Album, Alben", id: "album" },
      { de: "der Klassiker, -", id: "karya klasik" },
      { de: "aktuell", id: "aktual/terbaru" },
      { de: "modern", id: "modern" },
      { de: "professionell", id: "profesional" },
      { de: "guenstig", id: "murah/terjangkau" },
      { de: "taeglich geoeffnet", id: "buka setiap hari" },
      { de: "empfehlen", id: "merekomendasikan" },
      { de: "preiswert", id: "terjangkau" },
      { de: "gemuetlich", id: "nyaman" },
    ],
  },
  {
    title: "Beruf wechseln und Traumberuf",
    items: [
      { de: "der Berufswunsch, -wuensche", id: "cita-cita pekerjaan" },
      { de: "der Traumberuf, -e", id: "pekerjaan impian" },
      { de: "der Berufswechsel, -", id: "pergantian profesi" },
      { de: "werden, wurde, ist geworden", id: "menjadi/berubah", example: "Er wird Fernfahrer." },
      { de: "arbeitslos werden", id: "menjadi pengangguran", example: "Sie wurde arbeitslos." },
      { de: "beruflich", id: "secara profesional/karier" },
      { de: "komplett neu anfangen", id: "mulai sepenuhnya dari awal" },
      { de: "der Neuanfang, -faenge", id: "awal baru" },
      { de: "die Chance nutzen", id: "memanfaatkan kesempatan" },
      { de: "die Umwelt", id: "lingkungan" },
      { de: "Lebensmittel ohne Plastik", id: "bahan makanan tanpa plastik" },
      { de: "selbststaendig", id: "mandiri/wiraswasta" },
      { de: "der Laden, Laeden", id: "toko" },
      { de: "das Geschaeft, -e", id: "bisnis/toko" },
      { de: "das Risiko, Risiken", id: "risiko" },
      { de: "finanziell", id: "secara finansial" },
      { de: "bereuen", id: "menyesal" },
      { de: "die Freiheit", id: "kebebasan" },
      { de: "der Lastwagen, -", id: "truk" },
      { de: "der Fernfahrer, -", id: "sopir jarak jauh" },
      { de: "der Busfahrer, -", id: "sopir bus" },
      { de: "die Uebersetzerin, -nen", id: "penerjemah perempuan" },
      { de: "der Chirurg, -en", id: "ahli bedah" },
      { de: "der Oberarzt, -aerzte", id: "dokter senior" },
      { de: "die Ausbildung, -en", id: "pendidikan/pelatihan" },
      { de: "die Rente", id: "masa pensiun" },
    ],
  },
  {
    title: "Telefonieren",
    items: [
      { de: "das Telefonat, -e", id: "percakapan telepon" },
      { de: "der Anruf, -e", id: "panggilan telepon" },
      { de: "der Anrufbeantworter, -", id: "mesin penjawab" },
      { de: "sich konzentrieren", id: "berkonsentrasi" },
      { de: "deutlich sprechen", id: "berbicara jelas" },
      { de: "hektisch", id: "terburu-buru/panik" },
      { de: "stoeren", id: "mengganggu" },
      { de: "ausser Haus sein", id: "sedang tidak di tempat/di luar" },
      { de: "hinterlassen", id: "meninggalkan" },
      { de: "eine Nachricht hinterlassen", id: "meninggalkan pesan" },
      { de: "ausrichten", id: "menyampaikan pesan" },
      { de: "zurueckrufen", id: "menelepon kembali" },
      { de: "verbinden", id: "menyambungkan" },
      { de: "die Durchwahl, -en", id: "nomor ekstensi" },
      { de: "Papier bereitlegen", id: "menyiapkan kertas" },
      { de: "laecheln", id: "tersenyum" },
      { de: "Rueckmeldung geben", id: "memberi respons balik" },
    ],
  },
  {
    title: "Die moderne Arbeitswelt",
    items: [
      { de: "der Arbeitstag, -e", id: "hari kerja" },
      { de: "sich veraendern", id: "berubah" },
      { de: "der Betrieb, -e", id: "perusahaan/tempat usaha" },
      { de: "die Fabrik, -en", id: "pabrik" },
      { de: "die Maschine, -n", id: "mesin" },
      { de: "der Roboter, -", id: "robot" },
      { de: "die Digitalisierung", id: "digitalisasi" },
      { de: "virtuell", id: "virtual" },
      { de: "erreichbar", id: "dapat dihubungi" },
      { de: "der Austausch", id: "pertukaran" },
      { de: "die Zusammenarbeit", id: "kerja sama" },
      { de: "die Kompetenz, -en", id: "kompetensi" },
      { de: "lebenslang", id: "seumur hidup" },
      { de: "befristet", id: "terbatas waktu/kontrak" },
      { de: "mobil arbeiten", id: "bekerja secara mobile" },
      { de: "das Grundeinkommen", id: "pendapatan dasar" },
      { de: "der Arbeitsplatz, -plaetze", id: "tempat kerja" },
      { de: "die Arbeitszeit, -en", id: "jam kerja" },
      { de: "der Kindergarten, -gaerten", id: "taman kanak-kanak" },
    ],
  },
  {
    title: "Feste in D-A-CH",
    items: [
      { de: "Weihnachten", id: "Natal" },
      { de: "Silvester", id: "malam tahun baru" },
      { de: "Neujahr", id: "tahun baru" },
      { de: "Ostern", id: "Paskah" },
      { de: "die Fasnacht", id: "karnaval ala Basel/Swiss" },
      { de: "der Karneval", id: "karnaval, terutama Rheinland" },
      { de: "der Fasching", id: "karnaval di Jerman selatan/Austria" },
      { de: "der Feiertag, -e", id: "hari libur/perayaan" },
      { de: "den Baum schmuecken", id: "menghias pohon" },
      { de: "Weihnachtslieder singen", id: "menyanyikan lagu Natal" },
      { de: "das Geschenk, -e", id: "hadiah" },
      { de: "das Feuerwerk, -e", id: "kembang api" },
      { de: "die Laterne, -n", id: "lampion/lentera" },
      { de: "der Osterhase", id: "kelinci Paskah" },
      { de: "Frohe Weihnachten!", id: "Selamat Natal!" },
      { de: "Guten Rutsch!", id: "Selamat menyambut tahun baru!" },
      { de: "Prost Neujahr!", id: "Selamat Tahun Baru!" },
      { de: "Frohe Ostern!", id: "Selamat Paskah!" },
      { de: "Helau!", id: "seruan karnaval" },
    ],
  },
  {
    title: "Andere wichtige Woerter",
    items: [
      { de: "in Ordnung", id: "baik/beres" },
      { de: "also gut", id: "baiklah" },
      { de: "auf keinen Fall", id: "sama sekali tidak" },
      { de: "nur", id: "hanya" },
      { de: "moeglich", id: "mungkin" },
      { de: "haeufig", id: "sering" },
      { de: "komisch", id: "aneh" },
      { de: "unnoetig", id: "tidak perlu" },
      { de: "einzig", id: "satu-satunya" },
      { de: "schwanger", id: "hamil" },
      { de: "der Schritt, -e", id: "langkah" },
      { de: "das Jahrhundert, -e", id: "abad" },
      { de: "das Gehalt, -er", id: "gaji" },
      { de: "der Schrittzaehler", id: "penghitung langkah" },
    ],
  },
];

export const grammarBlocks: GrammarBlock[] = [
  {
    title: "Adjektive nach dem unbestimmten Artikel",
    rule: "Setelah ein/eine/kein/mein/dein, kata sifat membawa informasi gender dan kasus. Di plural setelah kata artikel, ending umumnya -en.",
    rows: [
      ["Nominativ", "ein bekannter Klassiker", "ein modernes Studio", "eine grosse Saengerin", "professionelle Trainer"],
      ["Akkusativ", "einen schoenen Abend", "ein elegantes Restaurant", "eine grosse Saengerin", "aktuelle Informationen"],
      ["Dativ", "einem schoenen Abend", "einem aktuellen Thema", "einer tollen Band", "guenstigen Preisen"],
    ],
    examples: [
      "Ich suche ein elegantes Restaurant.",
      "Wir gehen zu einem schoenen Konzert.",
      "Das sind keine grossen Probleme.",
      "Sie spricht mit ihren netten Freunden.",
    ],
    trap: "Akkusativ maskulin berubah: ein bekannter Klassiker, aber ich sehe einen bekannten Klassiker.",
  },
  {
    title: "werden: perubahan, profesi, usia",
    rule: "werden dipakai untuk menjadi, berubah, dan menyebut usia yang akan dicapai.",
    rows: [
      ["Praesens", "ich werde", "du wirst", "er/sie/es wird", "wir werden", "ihr werdet", "sie/Sie werden"],
      ["Praeteritum", "ich wurde", "du wurdest", "er/sie/es wurde", "wir wurden", "ihr wurdet", "sie/Sie wurden"],
      ["Perfekt", "ich bin geworden", "du bist geworden", "er/sie/es ist geworden", "wir sind geworden", "ihr seid geworden", "sie/Sie sind geworden"],
    ],
    examples: [
      "Er wird Fernfahrer.",
      "Sie wird arbeitslos.",
      "Ich werde 45 Jahre alt.",
      "Mit 21 wurde ich Lehrer.",
      "Er ist Oberarzt geworden.",
    ],
    trap: "Perfekt dari werden memakai sein: ich bin geworden, nicht ich habe geworden.",
  },
  {
    title: "Wenn-Saetze",
    rule: "Wenn membuka anak kalimat. Verb terkonjugasi pindah ke akhir anak kalimat.",
    rows: [
      ["Struktur", "Wenn + Subjekt + ... + Verb, dann + Verb + Subjekt + ..."],
      ["Beispiel", "Wenn ich die Geldboerse verliere, dann gehe ich zur Polizei."],
      ["Ohne dann", "Wenn ich krank bin, bleibe ich zu Hause."],
    ],
    examples: [
      "Wenn ich nervoes bin, notiere ich meine Fragen.",
      "Wenn der Zug spaet kommt, rufe ich dich an.",
      "Wenn ich frei habe, fahre ich Fahrrad.",
    ],
  },
  {
    title: "Hoefliche Bitten",
    rule: "Konnte/Konnten macht permintaan terdengar sopan, terutama di kantor, stasiun, dan telepon.",
    rows: [
      ["ich", "Koennte ich bitte ein Glas Wasser haben?"],
      ["du", "Koenntest du mir helfen?"],
      ["Sie", "Koennten Sie bitte frueher kommen?"],
    ],
    examples: [
      "Koennten Sie mich bitte mit Frau Bloch verbinden?",
      "Koennte ich bitte zwei Plaetze reservieren?",
      "Koennten Sie mir die Durchwahl geben?",
    ],
  },
  {
    title: "Aussprache: m oder n",
    rule: "Di akhir kata, m dan n harus tetap terdengar beda. Tutup bibir untuk m; lidah menyentuh belakang gigi atas untuk n.",
    rows: [
      ["m", "am, im, dem, einem, meinem"],
      ["n", "den, einen, meinen, neuen, schoenen"],
      ["Training", "Lese langsam: dem Mann, den Wagen, einem neuen Lastwagen."],
    ],
    examples: [
      "Der Mann von Marlies hilft im Geschaeft mit.",
      "Mit seinem neuen Lastwagen faehrt Markus in andere Laender.",
    ],
  },
];

export const phraseGroups: PhraseGroup[] = [
  {
    title: "Am Fahrkartenschalter",
    rows: [
      { de: "Wann faehrt der naechste Zug nach ...?", id: "Kereta berikutnya ke ... berangkat kapan?", context: "Fahrgast" },
      { de: "Eine Fahrkarte nach ..., bitte.", id: "Satu tiket ke ..., tolong.", context: "Fahrgast" },
      { de: "Einfach, bitte. / Hin und zurueck.", id: "Sekali jalan. / Pulang-pergi.", context: "Fahrgast" },
      { de: "Muss ich umsteigen?", id: "Apakah saya harus ganti kereta?", context: "Fahrgast" },
      { de: "Wann komme ich in ... an?", id: "Saya tiba di ... kapan?", context: "Fahrgast" },
      { de: "Zweite Klasse.", id: "Kelas dua.", context: "Fahrgast" },
      { de: "Bitte zwei Plaetze nebeneinander.", id: "Tolong dua tempat duduk bersebelahan.", context: "Fahrgast" },
      { de: "Der naechste Zug faehrt um ... von Gleis ...", id: "Kereta berikutnya berangkat pukul ... dari jalur ...", context: "Bahn-Mitarbeiter/in" },
      { de: "Einfach oder hin und zurueck?", id: "Sekali jalan atau pulang-pergi?", context: "Bahn-Mitarbeiter/in" },
      { de: "Sie muessen in ... umsteigen.", id: "Anda harus ganti kereta di ...", context: "Bahn-Mitarbeiter/in" },
      { de: "Moechten Sie einen Platz reservieren?", id: "Apakah Anda ingin memesan tempat duduk?", context: "Bahn-Mitarbeiter/in" },
      { de: "Das macht ... Euro.", id: "Totalnya ... euro.", context: "Bahn-Mitarbeiter/in" },
    ],
  },
  {
    title: "Freizeitangebote empfehlen",
    rows: [
      { de: "Ich suche ein gutes Restaurant.", id: "Saya mencari restoran yang bagus." },
      { de: "Kannst du mir ein Konzert empfehlen?", id: "Bisakah kamu merekomendasikan konser?" },
      { de: "Gibt es hier ein interessantes Museum?", id: "Apakah ada museum menarik di sini?" },
      { de: "Kennst du einen gemuetlichen Biergarten?", id: "Apakah kamu tahu Biergarten yang nyaman?" },
      { de: "Ich finde das Angebot guenstig.", id: "Menurut saya tawaran itu murah." },
      { de: "Wir entscheiden uns fuer das Theater.", id: "Kami memutuskan memilih teater." },
    ],
  },
  {
    title: "Berufswuensche und Meinung",
    rows: [
      { de: "Mit 15 wollte ich ... werden.", id: "Pada usia 15 saya ingin menjadi ..." },
      { de: "Mit 21 wurde ich ...", id: "Pada usia 21 saya menjadi ..." },
      { de: "Mit 51 will ich ...", id: "Pada usia 51 saya ingin ..." },
      { de: "Ich wollte schon immer ... werden.", id: "Saya sejak dulu ingin menjadi ..." },
      { de: "Ich finde den Beruf toll, weil ...", id: "Menurut saya pekerjaan itu keren karena ..." },
      { de: "Ich kann das gut verstehen.", id: "Saya bisa memahami itu dengan baik." },
      { de: "Ich denke, das ist eine gute Entscheidung.", id: "Menurut saya itu keputusan yang baik." },
    ],
  },
  {
    title: "Telefonieren am Arbeitsplatz",
    rows: [
      { de: "Kann ich bitte mit Herrn/Frau ... sprechen?", id: "Bisa saya bicara dengan Bapak/Ibu ...?", context: "Anrufer/in" },
      { de: "Koennen Sie mich bitte mit Herrn/Frau ... verbinden?", id: "Bisa sambungkan saya dengan Bapak/Ibu ...?", context: "Anrufer/in" },
      { de: "Kann ich eine Nachricht hinterlassen?", id: "Bisa saya meninggalkan pesan?", context: "Anrufer/in" },
      { de: "Koennen Sie mir bitte die Durchwahl geben?", id: "Bisa beri saya nomor ekstensi?", context: "Anrufer/in" },
      { de: "Herr/Frau ... ist gerade nicht am Platz.", id: "Bapak/Ibu ... sedang tidak di meja.", context: "Firma" },
      { de: "Herr/Frau ... ist unterwegs / ausser Haus.", id: "Bapak/Ibu ... sedang dalam perjalanan / di luar.", context: "Firma" },
      { de: "Moechten Sie eine Nachricht hinterlassen?", id: "Apakah Anda ingin meninggalkan pesan?", context: "Firma" },
      { de: "Kann Herr/Frau ... Sie zurueckrufen?", id: "Apakah Bapak/Ibu ... bisa menelepon balik Anda?", context: "Firma" },
      { de: "Ich gebe Ihnen die Nummer von ...", id: "Saya berikan nomor ... kepada Anda.", context: "Firma" },
      { de: "Ach so. / Ja, in Ordnung. / Also gut.", id: "Oh begitu. / Baik. / Baiklah.", context: "Rueckmeldung" },
    ],
  },
  {
    title: "Informationen weitergeben",
    rows: [
      { de: "Die wichtigste Information ist, dass ...", id: "Informasi terpenting adalah bahwa ..." },
      { de: "Du musst wissen, dass ...", id: "Kamu perlu tahu bahwa ..." },
      { de: "Fuer dich ist wichtig: ...", id: "Yang penting untukmu: ..." },
      { de: "Das musst du nicht wissen.", id: "Itu tidak perlu kamu tahu." },
      { de: "Ich fasse den Text kurz zusammen.", id: "Saya meringkas teks secara singkat." },
    ],
  },
];

export const readingBlocks: ReadingBlock[] = [
  {
    title: "Marlies Haunstein: Vom Buero zum eigenen Laden",
    summary: "Marlies pernah bekerja lama sebagai Uebersetzerin. Setelah kehilangan pekerjaan, ia mengambil kesempatan untuk membuka Laden dengan fokus lingkungan.",
    details: [
      "Ausbildung: Englisch-Studium.",
      "Frueher: Uebersetzerin in einer Firma.",
      "Heute: selbststaendig, eigener Laden.",
      "Motivation: etwas fuer die Umwelt machen.",
      "Risiko: finanziell groesser, aber sie bereut die Entscheidung nicht.",
    ],
    task: "Stelle Marlies in 5 Saetzen vor: Name, Ausbildung, frueherer Beruf, heutiger Beruf, Grund.",
  },
  {
    title: "Markus Studer: Vom Operationssaal in den Lkw",
    summary: "Markus studierte Medizin, wurde erfolgreicher Herzchirurg und wechselte spaeter bewusst in den Beruf Fernfahrer.",
    details: [
      "Ausbildung: Medizin in Zuerich, Weiterbildung in der Schweiz und den USA.",
      "Frueher: Oberarzt und Leiter eines Herzzentrums.",
      "Heute: Fernfahrer.",
      "Motivation: Freiheit auf der Strasse und viele Orte sehen.",
      "Spaeterer Wunsch: vielleicht Busfahrer werden.",
    ],
    task: "Sag deine Meinung: Kannst du Markus' Entscheidung verstehen? Warum?",
  },
  {
    title: "Die moderne Arbeitswelt",
    summary: "Die Arbeitswelt veraendert sich schnell: Wissen wird alt, digitale Zusammenarbeit waechst, manche Jobs verschwinden und neue Kompetenzen werden wichtig.",
    details: [
      "Wann habe ich wirklich frei? Mobile Arbeit macht flexibel, aber man muss Freizeit schuetzen.",
      "Internationale Zusammenarbeit: Teams arbeiten virtuell, teilen Dateien und sprechen per Video.",
      "Das Arbeitsleben mit Maschinen: Computer und Roboter uebernehmen immer mehr Aufgaben.",
      "Geld mit und ohne Arbeit: Befristete Projekte werden normaler; Grundeinkommen wird diskutiert.",
      "Arbeiten im Alter: Menschen bleiben laenger gesund und lernen lebenslang.",
      "Arbeit und Familie: passende Arbeitszeiten und Kindergaerten helfen Eltern.",
    ],
    task: "Waehle zwei Abschnitte und notiere je drei Schluesselwoerter.",
  },
  {
    title: "Telefonieren erfolgreich vorbereiten",
    summary: "Ein gutes Telefonat beginnt vor dem Anruf: Ruhe schaffen, Fragen notieren, Papier bereitlegen, langsam sprechen und wichtige Informationen sofort notieren.",
    details: [
      "Vorher: Musik aus, Tuer/Fenster zu, Fragen aufschreiben.",
      "Beim Anrufbeantworter: langsam, deutlich, Nummer und Grund nennen.",
      "Im Gespraech: klar sprechen, Notizen kontrollieren, laecheln.",
    ],
    task: "Schreibe eine 6-Zeilen-Telefonnotiz fuer einen Rueckruf.",
  },
  {
    title: "Feste in D-A-CH",
    summary: "Kapitel 6 vergleicht Weihnachten, Silvester, Ostern und regionale Karnevalsformen wie Fasnacht, Karneval und Fasching.",
    details: [
      "Weihnachten: Familie, Baum, Essen, Lieder, Geschenke.",
      "Silvester: Freunde, Feuerwerk, Sekt, Neujahrswuensche.",
      "Fasnacht/Karneval/Fasching: regionale Namen fuer aehnliche Festzeiten.",
      "Ostern: Fruehling, Familie, Kirche, Spaziergang, Ostereier.",
    ],
    task: "Vergleiche ein Fest aus D-A-CH mit einem Fest in Indonesien.",
  },
];

export const quizzes: Quiz[] = [
  {
    id: "q1",
    question: "Kalimat mana yang benar untuk 'Dia menjadi sopir jarak jauh'?",
    choices: ["Er wird Fernfahrer.", "Er werden Fernfahrer.", "Er ist Fernfahrer wird."],
    answer: 0,
    explanation: "Untuk er/sie/es, bentuk praesens dari werden adalah wird.",
  },
  {
    id: "q2",
    question: "Di loket tiket, bagaimana bertanya 'Apakah saya harus ganti kereta?'",
    choices: ["Muss ich umsteigen?", "Muss ich ankommen?", "Muss ich reservieren?"],
    answer: 0,
    explanation: "umsteigen berarti ganti kereta/kendaraan.",
  },
  {
    id: "q3",
    question: "Akkusativ maskulin yang tepat:",
    choices: ["ein schoenen Abend", "einen schoenen Abend", "einem schoenen Abend"],
    answer: 1,
    explanation: "Akkusativ maskulin: einen + adjective ending -en.",
  },
  {
    id: "q4",
    question: "Bentuk Perfekt dari 'ich werde' adalah ...",
    choices: ["ich habe geworden", "ich bin geworden", "ich wurde geworden"],
    answer: 1,
    explanation: "werden membentuk Perfekt dengan sein: ich bin geworden.",
  },
  {
    id: "q5",
    question: "Apa arti 'die Durchwahl' dalam konteks telepon?",
    choices: ["nomor ekstensi", "pengumuman stasiun", "tempat duduk"],
    answer: 0,
    explanation: "Durchwahl adalah nomor sambungan langsung/ekstensi.",
  },
  {
    id: "q6",
    question: "Kalimat sopan untuk meminta disambungkan:",
    choices: ["Verbinden mich!", "Koennen Sie mich bitte verbinden?", "Ich verbinde Sie nicht."],
    answer: 1,
    explanation: "Koennen Sie ... bitte ...? adalah bentuk formal dan sopan.",
  },
  {
    id: "q7",
    question: "Kata yang cocok untuk 'pulang-pergi' adalah ...",
    choices: ["einfach", "hin und zurueck", "am Fenster"],
    answer: 1,
    explanation: "einfach = sekali jalan, hin und zurueck = pulang-pergi.",
  },
  {
    id: "q8",
    question: "Heading yang cocok untuk kerja lewat laptop, smartphone, dan selalu erreichbar:",
    choices: ["Wann habe ich wirklich frei?", "Arbeiten im Alter", "Feste in D-A-CH"],
    answer: 0,
    explanation: "Topik ini membahas batas kerja dan waktu bebas saat kerja mobile.",
  },
  {
    id: "q9",
    question: "Manakah yang termasuk Feste in D-A-CH?",
    choices: ["BahnCard", "Fasnacht", "Durchwahl"],
    answer: 1,
    explanation: "Fasnacht adalah perayaan regional, terutama di Basel/Swiss.",
  },
  {
    id: "q10",
    question: "Wenn-Satz yang benar:",
    choices: ["Wenn ich krank bin, bleibe ich zu Hause.", "Wenn ich bin krank, bleibe ich zu Hause.", "Wenn bin ich krank, ich bleibe zu Hause."],
    answer: 0,
    explanation: "Dalam anak kalimat dengan wenn, verba terkonjugasi pindah ke akhir: krank bin.",
  },
];

export const microChallenges = [
  "Ucapkan 5 kata Bahnhof tanpa melihat catatan.",
  "Buat 3 kalimat dengan werden dalam waktu 90 detik.",
  "Pilih satu gambar halaman dan jelaskan dalam 4 kalimat Jerman.",
  "Telepon imajiner: tinggalkan pesan untuk Frau Bloch.",
  "Bandingkan zwei Angebote: Konzert oder Restaurant?",
  "Tulis satu wenn-Satz tentang pekerjaan.",
  "Sebutkan 6 kata modern Arbeitswelt dan artinya.",
  "Buat satu kalimat sopan dengan Koennten Sie ...?",
];

export const rewardLines = [
  "Bagus. Otak suka kemenangan kecil yang jelas.",
  "Satu langkah selesai. Besok akan terasa lebih ringan.",
  "Mantap. Kamu sedang membangun memori, bukan cuma membaca.",
  "Kunci kecil terbuka. Lanjutkan satu tugas mini lagi.",
  "Tempo bagus. Fokus pendek seperti ini yang bikin konsisten.",
];
