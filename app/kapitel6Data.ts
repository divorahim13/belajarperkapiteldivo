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

export type GrammarMiniQuiz = {
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export type GrammarBlock = {
  title: string;
  emoji: string;
  whatIs: string;
  whenToUse: string[];
  rule: string;
  rows: string[][];
  examples: string[];
  exampleTranslations: string[];
  trap?: string;
  trapFix?: string;
  miniQuiz?: GrammarMiniQuiz;
  memoryTip: string;
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
  { page: 65, src: "/kapitel-6/bukua2kursbuch_page-0065.jpg", title: "Tätigkeiten im Beruf", focus: "Arbeitsalltag, Vorlieben, Termine" },
  { page: 66, src: "/kapitel-6/bukua2kursbuch_page-0066.jpg", title: "Auf Geschäftsreise", focus: "Bahnhof, Fahrkarten, Dialog am Schalter" },
  { page: 67, src: "/kapitel-6/bukua2kursbuch_page-0067.jpg", title: "Das Abend-Programm", focus: "Freizeitangebote, Anzeigen, Adjektivendungen" },
  { page: 68, src: "/kapitel-6/bukua2kursbuch_page-0068.jpg", title: "Der Traumberuf", focus: "Berufswechsel, Personen vorstellen" },
  { page: 69, src: "/kapitel-6/bukua2kursbuch_page-0069.jpg", title: "werden", focus: "Berufswünsche, Grammatik, Aussprache m/n" },
  { page: 70, src: "/kapitel-6/bukua2kursbuch_page-0070.jpg", title: "Telefonieren am Arbeitsplatz", focus: "Telefonstrategien und Redemittel" },
  { page: 71, src: "/kapitel-6/bukua2kursbuch_page-0071.jpg", title: "Die moderne Arbeitswelt", focus: "Informationen aus Texten weitergeben" },
  { page: 72, src: "/kapitel-6/bukua2kursbuch_page-0072.jpg", title: "Die Netzwerk-WG", focus: "Hören und sehen, Fingeralphabet" },
  { page: 73, src: "/kapitel-6/bukua2kursbuch_page-0073.jpg", title: "Kurz und klar", focus: "Redemittel und Grammatik kompakt" },
  { page: 74, src: "/kapitel-6/bukua2kursbuch_page-0074.jpg", title: "Wiederholungsspiel", focus: "Brettspiel, Sprechen, Wiederholen" },
  { page: 75, src: "/kapitel-6/bukua2kursbuch_page-0075.jpg", title: "Wiederholungsspiel II", focus: "Situationen, Bitten, Stadt und Beruf" },
  { page: 76, src: "/kapitel-6/bukua2kursbuch_page-0076.jpg", title: "Spiel mit Wörtern", focus: "Wortfelder, Reime, wenn-Sätze" },
  { page: 77, src: "/kapitel-6/bukua2kursbuch_page-0077.jpg", title: "Alles, was zählt", focus: "Liedthema: Zahlen und Werte im Leben" },
  { page: 78, src: "/kapitel-6/bukua2kursbuch_page-0078.jpg", title: "Feste in D-A-CH", focus: "Weihnachten, Silvester, Feste vergleichen" },
  { page: 79, src: "/kapitel-6/bukua2kursbuch_page-0079.jpg", title: "Basler Fasnacht", focus: "Fasnacht, Ostern, Sprachmittlung" },
  { page: 80, src: "/kapitel-6/bukua2kursbuch_page-0080.jpg", title: "Lernwortschatz I", focus: "Wortschatzlisten Kapitel 6" },
  { page: 81, src: "/kapitel-6/bukua2kursbuch_page-0081.jpg", title: "Lernwortschatz II", focus: "Telefon, moderne Arbeitswelt, wichtige Wörter" },
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
    title: "Auf Geschäftsreise",
    badge: "Bahnhof",
    minutes: 22,
    summary: "Fokus pada situasi di stasiun: membaca Fahrplan, membeli tiket, dan menanyakan koneksi kereta.",
    goals: ["bertanya jadwal kereta", "memilih einfach atau hin und zurück", "memesan tempat duduk"],
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
    goals: ["membuka percakapan telepon formal", "meninggalkan Nachricht", "memberi Rückmeldung singkat"],
  },
  {
    id: "modernearbeit",
    title: "Die moderne Arbeitswelt",
    badge: "Lesen",
    minutes: 26,
    summary: "Kamu membaca tren kerja modern: mobil, digital, robot, fleksibel, internasional.",
    goals: ["memilih Überschrift yang tepat", "mencatat Schlüsselwörter", "menyampaikan informasi inti dengan bahasa sendiri"],
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
  { id: "quiz-perfect", module: "Übung", label: "Selesaikan quiz dengan minimal 80 persen benar", xp: 18 },
];

export const vocabGroups: VocabGroup[] = [
  {
    title: "Tätigkeiten im Beruf",
    items: [
      { de: "die Tätigkeit, -en", id: "kegiatan/aktivitas", example: "Welche Tätigkeiten machen Sie gern?" },
      { de: "einen Termin einhalten", id: "menepati janji/deadline", example: "Ich muss den Termin einhalten." },
      { de: "beraten", id: "memberi konsultasi", example: "Ella berät Kunden." },
      { de: "organisieren", id: "mengorganisasi", example: "Samuel organisiert Projekte." },
      { de: "kontrollieren", id: "mengontrol/memeriksa", example: "Die Chefin kontrolliert die Arbeit." },
      { de: "korrigieren", id: "mengoreksi", example: "Der Lehrer korrigiert Tests." },
      { de: "Projekte machen", id: "mengerjakan proyek" },
      { de: "Dinge organisieren", id: "mengatur berbagai hal" },
      { de: "andere beraten", id: "memberi saran kepada orang lain" },
      { de: "morgens früh beginnen", id: "mulai pagi-pagi" },
      { de: "am Wochenende arbeiten", id: "bekerja saat akhir pekan" },
      { de: "zu Behörden gehen", id: "pergi ke kantor pemerintahan" },
      { de: "der Ärger", id: "masalah/kekesalan" },
      { de: "Es klappt nicht.", id: "Ini tidak berhasil." },
      { de: "später aufstehen", id: "bangun lebih siang" },
      { de: "Feierabend machen", id: "selesai kerja" },
    ],
  },
  {
    title: "Bahnreisen und Bahnhof",
    items: [
      { de: "die Bahn, -en", id: "kereta/perusahaan kereta" },
      { de: "der Bahnhof, -höfe", id: "stasiun" },
      { de: "der Fahrplan, -pläne", id: "jadwal perjalanan" },
      { de: "die Zugverbindung, -en", id: "koneksi/rute kereta" },
      { de: "die Durchsage, -n", id: "pengumuman" },
      { de: "der Wagen, -", id: "gerbong" },
      { de: "das Gleis, -e", id: "peron/jalur kereta" },
      { de: "der Schalter, -", id: "loket" },
      { de: "die Hinfahrt, -en", id: "perjalanan pergi" },
      { de: "die Rückfahrt, -en", id: "perjalanan pulang" },
      { de: "die Fahrkarte, -n", id: "tiket" },
      { de: "einfach", id: "sekali jalan" },
      { de: "hin und zurück", id: "pulang-pergi" },
      { de: "umsteigen", id: "ganti kendaraan/kereta" },
      { de: "ankommen", id: "tiba" },
      { de: "abfahren", id: "berangkat" },
      { de: "zurückkommen", id: "kembali" },
      { de: "die Klasse, -n", id: "kelas" },
      { de: "erste Klasse", id: "kelas satu" },
      { de: "zweite Klasse", id: "kelas dua" },
      { de: "nebeneinander", id: "bersebelahan" },
      { de: "der Gang", id: "lorong" },
      { de: "am Fenster", id: "di dekat jendela" },
      { de: "der Sitzplatz, -plätze", id: "tempat duduk" },
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
      { de: "der Biergarten, -gärten", id: "taman bir" },
      { de: "das Café, -s", id: "kafe" },
      { de: "das Kino, -s", id: "bioskop" },
      { de: "die Sehenswürdigkeit, -en", id: "tempat wisata" },
      { de: "die Ermäßigung, -en", id: "diskon/potongan harga" },
      { de: "die Sängerin, -nen", id: "penyanyi perempuan" },
      { de: "die Band, -s", id: "band" },
      { de: "das Album, Alben", id: "album" },
      { de: "der Klassiker, -", id: "karya klasik" },
      { de: "aktuell", id: "aktual/terbaru" },
      { de: "modern", id: "modern" },
      { de: "professionell", id: "profesional" },
      { de: "günstig", id: "murah/terjangkau" },
      { de: "täglich geöffnet", id: "buka setiap hari" },
      { de: "empfehlen", id: "merekomendasikan" },
      { de: "preiswert", id: "terjangkau" },
      { de: "gemütlich", id: "nyaman" },
    ],
  },
  {
    title: "Beruf wechseln und Traumberuf",
    items: [
      { de: "der Berufswunsch, -wünsche", id: "cita-cita pekerjaan" },
      { de: "der Traumberuf, -e", id: "pekerjaan impian" },
      { de: "der Berufswechsel, -", id: "pergantian profesi" },
      { de: "werden, wurde, ist geworden", id: "menjadi/berubah", example: "Er wird Fernfahrer." },
      { de: "arbeitslos werden", id: "menjadi pengangguran", example: "Sie wurde arbeitslos." },
      { de: "beruflich", id: "secara profesional/karier" },
      { de: "komplett neu anfangen", id: "mulai sepenuhnya dari awal" },
      { de: "der Neuanfang, -fänge", id: "awal baru" },
      { de: "die Chance nutzen", id: "memanfaatkan kesempatan" },
      { de: "die Umwelt", id: "lingkungan" },
      { de: "Lebensmittel ohne Plastik", id: "bahan makanan tanpa plastik" },
      { de: "selbstständig", id: "mandiri/wiraswasta" },
      { de: "der Laden, Läden", id: "toko" },
      { de: "das Geschäft, -e", id: "bisnis/toko" },
      { de: "das Risiko, Risiken", id: "risiko" },
      { de: "finanziell", id: "secara finansial" },
      { de: "bereuen", id: "menyesal" },
      { de: "die Freiheit", id: "kebebasan" },
      { de: "der Lastwagen, -", id: "truk" },
      { de: "der Fernfahrer, -", id: "sopir jarak jauh" },
      { de: "der Busfahrer, -", id: "sopir bus" },
      { de: "die Übersetzerin, -nen", id: "penerjemah perempuan" },
      { de: "der Chirurg, -en", id: "ahli bedah" },
      { de: "der Oberarzt, -ärzte", id: "dokter senior" },
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
      { de: "stören", id: "mengganggu" },
      { de: "außer Haus sein", id: "sedang tidak di tempat/di luar" },
      { de: "hinterlassen", id: "meninggalkan" },
      { de: "eine Nachricht hinterlassen", id: "meninggalkan pesan" },
      { de: "ausrichten", id: "menyampaikan pesan" },
      { de: "zurückrufen", id: "menelepon kembali" },
      { de: "verbinden", id: "menyambungkan" },
      { de: "die Durchwahl, -en", id: "nomor ekstensi" },
      { de: "Papier bereitlegen", id: "menyiapkan kertas" },
      { de: "lächeln", id: "tersenyum" },
      { de: "Rückmeldung geben", id: "memberi respons balik" },
    ],
  },
  {
    title: "Die moderne Arbeitswelt",
    items: [
      { de: "der Arbeitstag, -e", id: "hari kerja" },
      { de: "sich verändern", id: "berubah" },
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
      { de: "der Arbeitsplatz, -plätze", id: "tempat kerja" },
      { de: "die Arbeitszeit, -en", id: "jam kerja" },
      { de: "der Kindergarten, -gärten", id: "taman kanak-kanak" },
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
      { de: "den Baum schmücken", id: "menghias pohon" },
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
    title: "Andere wichtige Wörter",
    items: [
      { de: "in Ordnung", id: "baik/beres" },
      { de: "also gut", id: "baiklah" },
      { de: "auf keinen Fall", id: "sama sekali tidak" },
      { de: "nur", id: "hanya" },
      { de: "möglich", id: "mungkin" },
      { de: "häufig", id: "sering" },
      { de: "komisch", id: "aneh" },
      { de: "unnötig", id: "tidak perlu" },
      { de: "einzig", id: "satu-satunya" },
      { de: "schwanger", id: "hamil" },
      { de: "der Schritt, -e", id: "langkah" },
      { de: "das Jahrhundert, -e", id: "abad" },
      { de: "das Gehalt, -er", id: "gaji" },
      { de: "der Schrittzähler", id: "penghitung langkah" },
    ],
  },
];

export const grammarBlocks: GrammarBlock[] = [
  {
    title: "Adjektive nach dem unbestimmten Artikel",
    emoji: "🎨",
    whatIs: "Dalam bahasa Jerman, kata sifat (Adjektiv) yang berdiri di antara artikel tak tentu (ein, eine, kein, mein, dein) dan kata benda harus mendapat akhiran khusus. Akhiran ini berubah tergantung pada tiga hal: gender kata benda (maskulin, neutrum, feminin), kasus (Nominativ, Akkusativ, Dativ), dan apakah kata benda itu tunggal atau jamak. Bayangkan kata sifat sebagai jembatan antara artikel dan kata benda — jembatan ini harus cocok dengan kedua sisinya.",
    whenToUse: [
      "Mendeskripsikan tempat makan saat jalan-jalan: «Ich suche ein elegantes Restaurant.»",
      "Merekomendasikan acara ke teman: «Das ist ein tolles Konzert!»",
      "Menulis iklan jual-beli: «Wir bieten einen günstigen Preis.»",
      "Bercerita tentang pengalaman: «Wir waren in einem gemütlichen Café.»"
    ],
    rule: "Setelah ein/eine/kein/mein/dein, kata sifat membawa informasi gender dan kasus. Di Nominativ maskulin: -er, neutrum: -es, feminin: -e. Di Akkusativ maskulin berubah jadi -en. Di Dativ semuanya -en. Di plural tanpa artikel: ending -e.",
    rows: [
      ["Nominativ", "ein bekannter Klassiker", "ein modernes Studio", "eine große Sängerin", "professionelle Trainer"],
      ["Akkusativ", "einen schönen Abend", "ein elegantes Restaurant", "eine große Sängerin", "aktuelle Informationen"],
      ["Dativ", "einem schönen Abend", "einem aktuellen Thema", "einer tollen Band", "günstigen Preisen"],
    ],
    examples: [
      "Ich suche ein elegantes Restaurant.",
      "Wir gehen zu einem schönen Konzert.",
      "Das sind keine großen Probleme.",
      "Sie spricht mit ihren netten Freunden.",
    ],
    exampleTranslations: [
      "Saya mencari restoran yang elegan.",
      "Kami pergi ke konser yang indah.",
      "Itu bukan masalah besar.",
      "Dia berbicara dengan teman-temannya yang ramah.",
    ],
    trap: "Akkusativ maskulin berubah: ein bekannter Klassiker → ich sehe einen bekannten Klassiker. Hanya maskulin yang berubah di Akkusativ!",
    trapFix: "Cara mengingat: kalau kata bendanya maskulin DAN menjadi objek langsung (Akkusativ), artikelnya jadi 'einen' dan kata sifat ending -en. Feminin dan Neutrum TIDAK berubah di Akkusativ. Hafalkan: Maskulin + Objek = -en -en.",
    miniQuiz: {
      question: "Mana yang benar? «Ich suche _____ Restaurant.»",
      choices: ["ein eleganter", "ein elegantes", "einen eleganten"],
      answer: 1,
      explanation: "Restaurant itu Neutrum (das Restaurant). Di Akkusativ, Neutrum tidak berubah — tetap 'ein' + ending '-es'. Jadi: ein elegantes Restaurant.",
    },
    memoryTip: "Bayangkan tabel 3×4: baris = kasus (N/A/D), kolom = gender (M/N/F/Pl). Nominativ maskulin = -er (seperti 'er' = dia laki-laki). Akkusativ maskulin = -en (pikirkan: maskulin-Akk selalu -en-en). Dativ = semua -en. Ini pola paling aman untuk dihafalkan pertama.",
  },
  {
    title: "werden: perubahan, profesi, usia",
    emoji: "🔄",
    whatIs: "Kata kerja 'werden' artinya 'menjadi'. Ini dipakai saat kamu ingin bilang bahwa seseorang berubah menjadi sesuatu yang baru — bisa profesi baru (Er wird Lehrer), kondisi baru (Sie wird krank), atau usia baru (Ich werde 30). Werden adalah salah satu kata kerja terpenting di bahasa Jerman karena juga dipakai untuk membentuk Futur (akan) dan Passiv (dikerjakan). Tapi di Kapitel 6 ini, fokus kita adalah 'werden = menjadi/berubah'.",
    whenToUse: [
      "Menceritakan perubahan karier: «Er wird Fernfahrer.» (Dia menjadi sopir jarak jauh.)",
      "Mengatakan usia: «Ich werde nächstes Jahr 25.» (Tahun depan saya 25.)",
      "Menjelaskan kondisi berubah: «Das Wetter wird kälter.» (Cuacanya menjadi lebih dingin.)",
      "Bercerita masa lalu: «Mit 21 wurde ich Lehrer.» (Pada usia 21 saya menjadi guru.)"
    ],
    rule: "werden dipakai untuk menjadi, berubah, dan menyebut usia yang akan dicapai. Konjugasinya tidak beraturan (ireguler) — perhatikan perubahan vokal di du dan er/sie/es.",
    rows: [
      ["Präsens", "ich werde", "du wirst", "er/sie/es wird", "wir werden", "ihr werdet", "sie/Sie werden"],
      ["Präteritum", "ich wurde", "du wurdest", "er/sie/es wurde", "wir wurden", "ihr wurdet", "sie/Sie wurden"],
      ["Perfekt", "ich bin geworden", "du bist geworden", "er/sie/es ist geworden", "wir sind geworden", "ihr seid geworden", "sie/Sie sind geworden"],
    ],
    examples: [
      "Er wird Fernfahrer.",
      "Sie wird arbeitslos.",
      "Ich werde 45 Jahre alt.",
      "Mit 21 wurde ich Lehrer.",
      "Er ist Oberarzt geworden.",
    ],
    exampleTranslations: [
      "Dia menjadi sopir jarak jauh.",
      "Dia menjadi pengangguran.",
      "Saya akan berusia 45 tahun.",
      "Pada usia 21 saya menjadi guru.",
      "Dia telah menjadi dokter senior.",
    ],
    trap: "Perfekt dari werden memakai 'sein', BUKAN 'haben': ich bin geworden ✓ / ich habe geworden ✗",
    trapFix: "Cara mengingat: werden = perubahan gerakan/keadaan. Semua kata kerja yang menunjukkan perubahan keadaan memakai 'sein' di Perfekt (seperti fahren, kommen, sterben). Jadi werden → bin geworden. Hafalkan frasa: «Ich BIN Lehrer GEWORDEN.»",
    miniQuiz: {
      question: "Bentuk Perfekt dari 'er wird Arzt' adalah ...",
      choices: ["er hat Arzt geworden", "er ist Arzt geworden", "er wurde Arzt geworden"],
      answer: 1,
      explanation: "werden membentuk Perfekt dengan 'sein': er ist Arzt geworden. Bukan 'haben'! Dan 'wurde' adalah Präteritum, bukan Perfekt.",
    },
    memoryTip: "Konjugasi Präsens: ich werde, du wirst (e→i!), er wird (e→i!), wir werden, ihr werdet, sie werden. Hanya du dan er/sie/es yang berubah vokal. Bayangkan: 'du wirst' seperti 'you will' — singkat dan langsung.",
  },
  {
    title: "Wenn-Sätze (anak kalimat dengan wenn)",
    emoji: "🔗",
    whatIs: "Wenn artinya 'kalau' atau 'jika'. Ini dipakai untuk membuat kalimat bersyarat — misalnya: 'Kalau hujan, saya bawa payung.' Dalam bahasa Jerman, aturannya ketat: setelah 'wenn', kata kerja yang sudah dikonjugasi HARUS pindah ke posisi terakhir dalam anak kalimat. Ini berbeda dari bahasa Indonesia di mana urutan kata tidak berubah. Anak kalimat dengan wenn bisa di awal atau di akhir kalimat utama.",
    whenToUse: [
      "Menjelaskan rencana bersyarat: «Wenn ich frei habe, fahre ich Fahrrad.» (Kalau saya bebas, saya bersepeda.)",
      "Memberi alasan di tempat kerja: «Wenn der Chef kommt, muss ich fertig sein.» (Kalau bos datang, saya harus sudah selesai.)",
      "Bercerita tentang kebiasaan: «Wenn ich nervös bin, trinke ich Tee.» (Kalau saya gugup, saya minum teh.)",
      "Membuat janji: «Wenn der Zug spät kommt, rufe ich dich an.» (Kalau keretanya telat, saya telepon kamu.)"
    ],
    rule: "Wenn membuka anak kalimat. Kata kerja terkonjugasi pindah ke akhir anak kalimat. Kalimat utama setelahnya dimulai dengan kata kerja (posisi 1), lalu subjek. Kata 'dann' (lalu) boleh dipakai tapi tidak wajib.",
    rows: [
      ["Struktur", "Wenn + Subjekt + ... + Verb, dann + Verb + Subjekt + ..."],
      ["Beispiel", "Wenn ich die Geldbörse verliere, dann gehe ich zur Polizei."],
      ["Ohne dann", "Wenn ich krank bin, bleibe ich zu Hause."],
    ],
    examples: [
      "Wenn ich nervös bin, notiere ich meine Fragen.",
      "Wenn der Zug spät kommt, rufe ich dich an.",
      "Wenn ich frei habe, fahre ich Fahrrad.",
    ],
    exampleTranslations: [
      "Kalau saya gugup, saya catat pertanyaan saya.",
      "Kalau keretanya telat, saya telepon kamu.",
      "Kalau saya punya waktu luang, saya bersepeda.",
    ],
    trap: "Jangan letakkan kata kerja di posisi kedua dalam anak kalimat wenn! Salah: «Wenn ich bin krank» ✗. Benar: «Wenn ich krank bin» ✓.",
    trapFix: "Trik: setelah 'wenn', bayangkan kata kerja ditarik magnet ke ujung kalimat. Tulis anak kalimatnya dulu: Wenn + Subjek + sisanya + VERB (paling akhir). Lalu tulis kalimat utama: Verb + Subjek + sisanya. Latih dengan 3 kalimat setiap hari sampai otomatis.",
    miniQuiz: {
      question: "Mana susunan wenn-Satz yang benar?",
      choices: [
        "Wenn ich bin müde, gehe ich ins Bett.",
        "Wenn ich müde bin, gehe ich ins Bett.",
        "Wenn ich müde bin, ich gehe ins Bett."
      ],
      answer: 1,
      explanation: "Dalam anak kalimat wenn, kata kerja 'bin' harus di akhir: 'Wenn ich müde bin'. Dan di kalimat utama setelah koma, kata kerja harus di posisi pertama: 'gehe ich'. Pilihan C salah karena 'ich' mendahului 'gehe'.",
    },
    memoryTip: "Rumus ajaib: WENN ... VERB-AKHIR, VERB-AWAL ... Bayangkan wenn-Satz seperti bumerang: kata kerja dilempar ke ujung anak kalimat, lalu 'memantul kembali' ke awal kalimat utama.",
  },
  {
    title: "Höfliche Bitten (permintaan sopan)",
    emoji: "🎩",
    whatIs: "Dalam bahasa Jerman, cara meminta sesuatu dengan sopan adalah menggunakan bentuk Konjunktiv II dari 'können', yaitu 'könnte/könntest/könnten'. Ini seperti di bahasa Indonesia kita bilang 'bisakah' atau 'bolehkah' alih-alih langsung 'beri saya'. Bentuk ini WAJIB dipakai di kantor, di stasiun, saat telepon formal, dan saat berbicara dengan orang yang belum kamu kenal.",
    whenToUse: [
      "Meminta tolong di stasiun: «Könnten Sie mir bitte den Fahrplan zeigen?» (Bisakah Anda menunjukkan jadwal kereta?)",
      "Menelepon kantor: «Könnte ich bitte mit Frau Bloch sprechen?» (Bisakah saya berbicara dengan Bu Bloch?)",
      "Memesan di restoran: «Könnte ich bitte die Speisekarte haben?» (Bisakah saya minta menu?)",
      "Meminta bantuan teman: «Könntest du mir bitte helfen?» (Bisakah kamu tolong bantu saya?)"
    ],
    rule: "Könnte/Könnten membuat permintaan terdengar sopan, terutama di kantor, stasiun, dan telepon. Selalu pakai 'bitte' untuk menambah kesan sopan.",
    rows: [
      ["ich", "Könnte ich bitte ein Glas Wasser haben?"],
      ["du", "Könntest du mir helfen?"],
      ["Sie", "Könnten Sie bitte früher kommen?"],
    ],
    examples: [
      "Könnten Sie mich bitte mit Frau Bloch verbinden?",
      "Könnte ich bitte zwei Plätze reservieren?",
      "Könnten Sie mir die Durchwahl geben?",
    ],
    exampleTranslations: [
      "Bisakah Anda menyambungkan saya dengan Bu Bloch?",
      "Bisakah saya memesan dua tempat duduk?",
      "Bisakah Anda memberi saya nomor ekstensi?",
    ],
    trap: "Jangan pakai bentuk Indikativ langsung 'Können Sie ...' di situasi sangat formal — itu terdengar kurang sopan. Gunakan Konjunktiv II: 'Könnten Sie ...'",
    trapFix: "Perbedaan kecil tapi penting: 'Können Sie ...' = bisakah Anda (netral). 'Könnten Sie ...' = bisakah kiranya Anda (lebih sopan). Di telepon kantor dan situasi formal, SELALU pakai 'könnten'. Tambahkan 'bitte' di tengah kalimat untuk efek maksimal.",
    miniQuiz: {
      question: "Cara paling sopan meminta disambungkan ke seseorang:",
      choices: [
        "Verbinden Sie mich!",
        "Können Sie mich verbinden?",
        "Könnten Sie mich bitte verbinden?"
      ],
      answer: 2,
      explanation: "Pilihan C paling sopan: Konjunktiv II (könnten) + bitte + Anda (Sie). Pilihan A terlalu kasar (perintah langsung). Pilihan B sopan tapi belum sempurna.",
    },
    memoryTip: "Rumus sopan: Könnten Sie + bitte + Infinitiv? Bayangkan kamu bicara dengan direktur perusahaan — selalu pakai 'könnten' dan 'bitte'. Trik: tambahkan umlaut ö pada 'können' → langsung jadi sopan!",
  },
  {
    title: "Aussprache: m oder n",
    emoji: "👄",
    whatIs: "Di akhir kata Jerman, huruf 'm' dan 'n' harus diucapkan dengan jelas dan berbeda. Banyak pelajar bahasa Jerman (termasuk penutur Indonesia) sering mencampurkan kedua bunyi ini karena dalam bahasa Indonesia perbedaannya tidak terlalu penting. Tapi di bahasa Jerman, salah ucap m/n bisa mengubah arti kata! Misalnya: 'dem' (Dativ maskulin) vs 'den' (Akkusativ maskulin) — salah ucap berarti salah kasus.",
    whenToUse: [
      "Membedakan artikel Dativ dan Akkusativ: 'dem Mann' (Dativ) vs 'den Mann' (Akkusativ)",
      "Mengucapkan ending adjektiv dengan benar: 'einem neuen' vs 'einen neuen'",
      "Saat berbicara di telepon formal (harus sangat jelas)",
      "Saat ujian Sprechen: penguji memperhatikan ketepatan pengucapan m/n"
    ],
    rule: "Untuk m: tutup kedua bibir rapat → udara keluar lewat hidung. Untuk n: ujung lidah menyentuh belakang gigi atas → udara keluar lewat hidung. Latih di depan cermin!",
    rows: [
      ["m", "am, im, dem, einem, meinem"],
      ["n", "den, einen, meinen, neuen, schönen"],
      ["Training", "Baca langsam: dem Mann, den Wagen, einem neuen Lastwagen."],
    ],
    examples: [
      "Der Mann von Marlies hilft im Geschäft mit.",
      "Mit seinem neuen Lastwagen fährt Markus in andere Länder.",
    ],
    exampleTranslations: [
      "Suami Marlies membantu di toko.",
      "Dengan truk barunya, Markus berkendara ke negara lain.",
    ],
    trap: "Jangan ucapkan 'dem' dan 'den' dengan bunyi yang sama! 'dem' = bibir tertutup. 'den' = lidah ke gigi atas.",
    trapFix: "Latihan praktis: letakkan jari di bibir. Ucapkan 'dem' — bibir harus menyentuh jari. Ucapkan 'den' — bibir TIDAK menyentuh jari, tapi lidah menyentuh langit-langit mulut depan. Latih pasangan ini 5 kali: dem/den, einem/einen, meinem/meinen.",
    miniQuiz: {
      question: "Saat mengucapkan 'm' di akhir kata, posisi mulut yang benar adalah:",
      choices: [
        "Lidah menyentuh belakang gigi atas",
        "Kedua bibir tertutup rapat",
        "Mulut terbuka lebar"
      ],
      answer: 1,
      explanation: "Huruf 'm' diucapkan dengan menutup kedua bibir rapat dan mengeluarkan udara lewat hidung. 'n' yang menggunakan lidah ke gigi atas. Jangan tertukar!",
    },
    memoryTip: "M = Mulut (bibir) tertutup. N = Na(h) gigi (lidah ke gigi atas). Gunakan asosiasi huruf pertama: M-Mulut, N-Nah(gigi). Latih setiap hari dengan pasangan: dem/den, einem/einen.",
  },
];

export const phraseGroups: PhraseGroup[] = [
  {
    title: "Am Fahrkartenschalter",
    rows: [
      { de: "Wann fährt der nächste Zug nach ...?", id: "Kereta berikutnya ke ... berangkat kapan?", context: "Fahrgast" },
      { de: "Eine Fahrkarte nach ..., bitte.", id: "Satu tiket ke ..., tolong.", context: "Fahrgast" },
      { de: "Einfach, bitte. / Hin und zurück.", id: "Sekali jalan. / Pulang-pergi.", context: "Fahrgast" },
      { de: "Muss ich umsteigen?", id: "Apakah saya harus ganti kereta?", context: "Fahrgast" },
      { de: "Wann komme ich in ... an?", id: "Saya tiba di ... kapan?", context: "Fahrgast" },
      { de: "Zweite Klasse.", id: "Kelas dua.", context: "Fahrgast" },
      { de: "Bitte zwei Plätze nebeneinander.", id: "Tolong dua tempat duduk bersebelahan.", context: "Fahrgast" },
      { de: "Der nächste Zug fährt um ... von Gleis ...", id: "Kereta berikutnya berangkat pukul ... dari jalur ...", context: "Bahn-Mitarbeiter/in" },
      { de: "Einfach oder hin und zurück?", id: "Sekali jalan atau pulang-pergi?", context: "Bahn-Mitarbeiter/in" },
      { de: "Sie müssen in ... umsteigen.", id: "Anda harus ganti kereta di ...", context: "Bahn-Mitarbeiter/in" },
      { de: "Möchten Sie einen Platz reservieren?", id: "Apakah Anda ingin memesan tempat duduk?", context: "Bahn-Mitarbeiter/in" },
      { de: "Das macht ... Euro.", id: "Totalnya ... euro.", context: "Bahn-Mitarbeiter/in" },
    ],
  },
  {
    title: "Freizeitangebote empfehlen",
    rows: [
      { de: "Ich suche ein gutes Restaurant.", id: "Saya mencari restoran yang bagus." },
      { de: "Kannst du mir ein Konzert empfehlen?", id: "Bisakah kamu merekomendasikan konser?" },
      { de: "Gibt es hier ein interessantes Museum?", id: "Apakah ada museum menarik di sini?" },
      { de: "Kennst du einen gemütlichen Biergarten?", id: "Apakah kamu tahu Biergarten yang nyaman?" },
      { de: "Ich finde das Angebot günstig.", id: "Menurut saya tawaran itu murah." },
      { de: "Wir entscheiden uns für das Theater.", id: "Kami memutuskan memilih teater." },
    ],
  },
  {
    title: "Berufswünsche und Meinung",
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
      { de: "Können Sie mich bitte mit Herrn/Frau ... verbinden?", id: "Bisa sambungkan saya dengan Bapak/Ibu ...?", context: "Anrufer/in" },
      { de: "Kann ich eine Nachricht hinterlassen?", id: "Bisa saya meninggalkan pesan?", context: "Anrufer/in" },
      { de: "Können Sie mir bitte die Durchwahl geben?", id: "Bisa beri saya nomor ekstensi?", context: "Anrufer/in" },
      { de: "Herr/Frau ... ist gerade nicht am Platz.", id: "Bapak/Ibu ... sedang tidak di meja.", context: "Firma" },
      { de: "Herr/Frau ... ist unterwegs / außer Haus.", id: "Bapak/Ibu ... sedang dalam perjalanan / di luar.", context: "Firma" },
      { de: "Möchten Sie eine Nachricht hinterlassen?", id: "Apakah Anda ingin meninggalkan pesan?", context: "Firma" },
      { de: "Kann Herr/Frau ... Sie zurückrufen?", id: "Apakah Bapak/Ibu ... bisa menelepon balik Anda?", context: "Firma" },
      { de: "Ich gebe Ihnen die Nummer von ...", id: "Saya berikan nomor ... kepada Anda.", context: "Firma" },
      { de: "Ach so. / Ja, in Ordnung. / Also gut.", id: "Oh begitu. / Baik. / Baiklah.", context: "Rückmeldung" },
    ],
  },
  {
    title: "Informationen weitergeben",
    rows: [
      { de: "Die wichtigste Information ist, dass ...", id: "Informasi terpenting adalah bahwa ..." },
      { de: "Du musst wissen, dass ...", id: "Kamu perlu tahu bahwa ..." },
      { de: "Für dich ist wichtig: ...", id: "Yang penting untukmu: ..." },
      { de: "Das musst du nicht wissen.", id: "Itu tidak perlu kamu tahu." },
      { de: "Ich fasse den Text kurz zusammen.", id: "Saya meringkas teks secara singkat." },
    ],
  },
];

export const readingBlocks: ReadingBlock[] = [
  {
    title: "Marlies Haunstein: Vom Büro zum eigenen Laden",
    summary: "Marlies pernah bekerja lama sebagai Übersetzerin. Setelah kehilangan pekerjaan, ia mengambil kesempatan untuk membuka Laden dengan fokus lingkungan.",
    details: [
      "Ausbildung: Englisch-Studium.",
      "Früher: Übersetzerin in einer Firma.",
      "Heute: selbstständig, eigener Laden.",
      "Motivation: etwas für die Umwelt machen.",
      "Risiko: finanziell größer, aber sie bereut die Entscheidung nicht.",
    ],
    task: "Stelle Marlies in 5 Sätzen vor: Name, Ausbildung, früherer Beruf, heutiger Beruf, Grund.",
  },
  {
    title: "Markus Studer: Vom Operationssaal in den Lkw",
    summary: "Markus studierte Medizin, wurde erfolgreicher Herzchirurg und wechselte später bewusst in den Beruf Fernfahrer.",
    details: [
      "Ausbildung: Medizin in Zürich, Weiterbildung in der Schweiz und den USA.",
      "Früher: Oberarzt und Leiter eines Herzzentrums.",
      "Heute: Fernfahrer.",
      "Motivation: Freiheit auf der Straße und viele Orte sehen.",
      "Späterer Wunsch: vielleicht Busfahrer werden.",
    ],
    task: "Sag deine Meinung: Kannst du Markus' Entscheidung verstehen? Warum?",
  },
  {
    title: "Die moderne Arbeitswelt",
    summary: "Die Arbeitswelt verändert sich schnell: Wissen wird alt, digitale Zusammenarbeit wächst, manche Jobs verschwinden und neue Kompetenzen werden wichtig.",
    details: [
      "Wann habe ich wirklich frei? Mobile Arbeit macht flexibel, aber man muss Freizeit schützen.",
      "Internationale Zusammenarbeit: Teams arbeiten virtuell, teilen Dateien und sprechen per Video.",
      "Das Arbeitsleben mit Maschinen: Computer und Roboter übernehmen immer mehr Aufgaben.",
      "Geld mit und ohne Arbeit: Befristete Projekte werden normaler; Grundeinkommen wird diskutiert.",
      "Arbeiten im Alter: Menschen bleiben länger gesund und lernen lebenslang.",
      "Arbeit und Familie: passende Arbeitszeiten und Kindergärten helfen Eltern.",
    ],
    task: "Wähle zwei Abschnitte und notiere je drei Schlüsselwörter.",
  },
  {
    title: "Telefonieren erfolgreich vorbereiten",
    summary: "Ein gutes Telefonat beginnt vor dem Anruf: Ruhe schaffen, Fragen notieren, Papier bereitlegen, langsam sprechen und wichtige Informationen sofort notieren.",
    details: [
      "Vorher: Musik aus, Tür/Fenster zu, Fragen aufschreiben.",
      "Beim Anrufbeantworter: langsam, deutlich, Nummer und Grund nennen.",
      "Im Gespräch: klar sprechen, Notizen kontrollieren, lächeln.",
    ],
    task: "Schreibe eine 6-Zeilen-Telefonnotiz für einen Rückruf.",
  },
  {
    title: "Feste in D-A-CH",
    summary: "Kapitel 6 vergleicht Weihnachten, Silvester, Ostern und regionale Karnevalsformen wie Fasnacht, Karneval und Fasching.",
    details: [
      "Weihnachten: Familie, Baum, Essen, Lieder, Geschenke.",
      "Silvester: Freunde, Feuerwerk, Sekt, Neujahrswünsche.",
      "Fasnacht/Karneval/Fasching: regionale Namen für ähnliche Festzeiten.",
      "Ostern: Frühling, Familie, Kirche, Spaziergang, Ostereier.",
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
    explanation: "Untuk er/sie/es, bentuk Präsens dari werden adalah wird.",
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
    choices: ["ein schönen Abend", "einen schönen Abend", "einem schönen Abend"],
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
    choices: ["Verbinden mich!", "Können Sie mich bitte verbinden?", "Ich verbinde Sie nicht."],
    answer: 1,
    explanation: "Können Sie ... bitte ...? adalah bentuk formal dan sopan.",
  },
  {
    id: "q7",
    question: "Kata yang cocok untuk 'pulang-pergi' adalah ...",
    choices: ["einfach", "hin und zurück", "am Fenster"],
    answer: 1,
    explanation: "einfach = sekali jalan, hin und zurück = pulang-pergi.",
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
  "Buat satu kalimat sopan dengan Könnten Sie ...?",
];

export const rewardLines = [
  "Bagus. Otak suka kemenangan kecil yang jelas.",
  "Satu langkah selesai. Besok akan terasa lebih ringan.",
  "Mantap. Kamu sedang membangun memori, bukan cuma membaca.",
  "Kunci kecil terbuka. Lanjutkan satu tugas mini lagi.",
  "Tempo bagus. Fokus pendek seperti ini yang bikin konsisten.",
];
