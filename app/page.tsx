"use client";
// Last update: 2026-05-07 - Triggering GitHub Action deployment

import { useEffect, useState } from "react";

type Answers = Record<string, boolean>;
type FlashcardDirection = "de-id" | "id-de";
type FlashcardStatus = "known" | "review";
type GermanCardDetail = {
  example: string;
  translation: string;
  explanation: string;
};

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
const flashcardExamples: Record<string, GermanCardDetail> = {
  "die Stadt": { example: "Ich wohne in der Stadt.", translation: "Saya tinggal di kota.", explanation: "in + Dativ dipakai untuk lokasi tetap: in der Stadt." },
  "die Bank": { example: "Ich gehe heute zur Bank.", translation: "Saya pergi ke bank hari ini.", explanation: "zu + Dativ menjadi zur untuk die Bank." },
  "die Behörde": { example: "Bei der Behörde beantrage ich ein Visum.", translation: "Di kantor pemerintahan saya mengajukan visa.", explanation: "bei + Dativ menjadi bei der Behörde; beantragen biasanya diikuti Akkusativ." },
  "das Rathaus": { example: "Vor dem Rathaus warten viele Menschen.", translation: "Di depan balai kota banyak orang menunggu.", explanation: "vor + Dativ dipakai untuk posisi: vor dem Rathaus." },
  "das Krankenhaus": { example: "Meine Schwester arbeitet im Krankenhaus.", translation: "Saudari saya bekerja di rumah sakit.", explanation: "im = in dem; karena lokasi, kasusnya Dativ." },
  "der Supermarkt": { example: "Nach der Arbeit gehe ich in den Supermarkt.", translation: "Setelah kerja saya pergi ke supermarket.", explanation: "in + Akkusativ dipakai untuk arah/tujuan: in den Supermarkt." },
  "die Apotheke": { example: "Ich kaufe Medikamente in der Apotheke.", translation: "Saya membeli obat di apotek.", explanation: "in der Apotheke memakai Dativ karena menunjukkan lokasi." },
  "die Bibliothek": { example: "In der Bibliothek lese ich ein Buch.", translation: "Di perpustakaan saya membaca sebuah buku.", explanation: "in + Dativ untuk tempat tetap: in der Bibliothek." },
  "der Bahnhof": { example: "Wir treffen uns am Bahnhof.", translation: "Kita bertemu di stasiun.", explanation: "am = an dem; Bahnhof maskulin dan di sini Dativ." },
  "die Haltestelle": { example: "Der Bus hält an der Haltestelle.", translation: "Bus berhenti di halte.", explanation: "an + Dativ dipakai untuk posisi di titik tertentu." },
  "der Parkplatz": { example: "Das Auto steht auf dem Parkplatz.", translation: "Mobil itu berada di tempat parkir.", explanation: "auf + Dativ dipakai untuk lokasi: auf dem Parkplatz." },
  "die Brücke": { example: "Wir gehen über die Brücke.", translation: "Kami berjalan melewati jembatan.", explanation: "über + Akkusativ dipakai untuk gerakan melewati sesuatu." },
  "die Kirche": { example: "Ich besuche die alte Kirche.", translation: "Saya mengunjungi gereja tua itu.", explanation: "besuchen membutuhkan Akkusativ; die Kirche tetap die pada Akkusativ feminin." },
  "das Museum": { example: "Am Samstag besuchen wir das Museum.", translation: "Pada hari Sabtu kami mengunjungi museum itu.", explanation: "das Museum adalah objek langsung, jadi Akkusativ neutral tetap das." },
  "der Marktplatz": { example: "Auf dem Marktplatz gibt es einen Markt.", translation: "Di alun-alun ada pasar.", explanation: "auf + Dativ dipakai untuk lokasi terbuka: auf dem Marktplatz." },
  "das Bewerbungsgespräch": { example: "Morgen habe ich ein Bewerbungsgespräch.", translation: "Besok saya punya wawancara kerja.", explanation: "haben diikuti objek Akkusativ; ein Bewerbungsgespräch adalah neutral." },
  "der Lebenslauf": { example: "Ich schicke den Lebenslauf per E-Mail.", translation: "Saya mengirim CV melalui email.", explanation: "schicken membutuhkan objek Akkusativ: den Lebenslauf." },
  "die Stelle": { example: "Ich bewerbe mich um die Stelle.", translation: "Saya melamar posisi itu.", explanation: "sich bewerben um + Akkusativ dipakai untuk pekerjaan/posisi." },
  "die Erfahrung": { example: "Sie hat viel Erfahrung im Restaurant.", translation: "Dia punya banyak pengalaman di restoran.", explanation: "Erfahrung sering dipakai sebagai uncountable dalam singular." },
  "das Konto": { example: "Ich möchte ein Konto eröffnen.", translation: "Saya ingin membuka rekening.", explanation: "möchte + infinitiv; kata kerja utama eröffnen berada di akhir." },
  "das Formular": { example: "Bitte füllen Sie das Formular aus.", translation: "Silakan isi formulir itu.", explanation: "ausfüllen adalah verba pisah; pada kalimat utama, aus berada di akhir." },
  "der Ausweis": { example: "Ohne den Ausweis kann ich nichts beantragen.", translation: "Tanpa kartu identitas saya tidak bisa mengajukan apa pun.", explanation: "ohne selalu Akkusativ; der Ausweis menjadi den Ausweis." },
  "die Überweisung": { example: "Die Überweisung dauert zwei Tage.", translation: "Transfer itu memakan waktu dua hari.", explanation: "die Überweisung menjadi subjek, jadi kasusnya Nominativ." },
  "der Antrag": { example: "Der Beamte prüft den Antrag.", translation: "Pegawai negeri memeriksa permohonan itu.", explanation: "prüfen membutuhkan Akkusativ: den Antrag." },
  "abheben": { example: "Ich hebe am Automaten Geld ab.", translation: "Saya menarik uang di ATM.", explanation: "abheben adalah verba pisah; ab muncul di akhir kalimat utama." },
  "einzahlen": { example: "Sie zahlt jeden Monat Geld ein.", translation: "Dia menyetor uang setiap bulan.", explanation: "einzahlen juga verba pisah; ein berdiri di akhir." },
  "unterschreiben": { example: "Der Kunde unterschreibt den Antrag.", translation: "Nasabah menandatangani permohonan itu.", explanation: "unterschreiben tidak dipisah dan membutuhkan objek Akkusativ." },
  "ausfüllen": { example: "Wir füllen das Formular gemeinsam aus.", translation: "Kami mengisi formulir itu bersama-sama.", explanation: "ausfüllen adalah verba pisah: füllen ... aus." },
  "die Stellenanzeige": { example: "Ich lese eine Stellenanzeige im Internet.", translation: "Saya membaca iklan lowongan kerja di internet.", explanation: "eine Stellenanzeige adalah Akkusativ feminin; bentuknya sama dengan Nominativ." },
  "sich bewerben": { example: "Ich bewerbe mich um eine Stelle.", translation: "Saya melamar sebuah posisi.", explanation: "Reflexive pronoun untuk ich adalah mich; pola lengkapnya sich bewerben um + Akkusativ." },
  "das Vorstellungsgespräch": { example: "Im Vorstellungsgespräch antworte ich ruhig.", translation: "Dalam wawancara kerja saya menjawab dengan tenang.", explanation: "im = in dem; dipakai karena situasi/lokasi abstrak." },
  "die Unterlagen": { example: "Bitte bringen Sie Ihre Unterlagen mit.", translation: "Silakan bawa dokumen Anda.", explanation: "mitbringen adalah verba pisah: bringen ... mit." },
  "die Teilzeit": { example: "Meine Freundin arbeitet in Teilzeit.", translation: "Teman perempuan saya bekerja paruh waktu.", explanation: "in Teilzeit adalah ungkapan tetap untuk jenis jam kerja." },
  "die Aushilfe": { example: "Die Aushilfe serviert den Gästen Kaffee.", translation: "Pekerja bantuan itu menyajikan kopi kepada para tamu.", explanation: "den Gästen adalah Dativ plural sebagai penerima; Kaffee adalah Akkusativ." },
  "bedienen": { example: "Der Kellner bedient die Gäste.", translation: "Pelayan melayani para tamu.", explanation: "bedienen membutuhkan objek Akkusativ: die Gäste." },
  "servieren": { example: "Sie serviert dem Gast eine Suppe.", translation: "Dia menyajikan sup kepada tamu itu.", explanation: "dem Gast adalah Dativ penerima; eine Suppe adalah Akkusativ." },
  "das Amt": { example: "Ich habe morgen einen Termin beim Amt.", translation: "Besok saya punya janji di kantor pemerintahan.", explanation: "beim = bei dem; Amt neutral memakai Dativ dem." },
  "der Beamte": { example: "Der Beamte erklärt mir den Antrag.", translation: "Pegawai negeri menjelaskan permohonan itu kepada saya.", explanation: "mir adalah Dativ penerima; den Antrag adalah Akkusativ." },
  "die Beamtin": { example: "Die Beamtin prüft meine Angaben.", translation: "Pegawai negeri perempuan memeriksa data saya.", explanation: "Angaben berbentuk plural dan menjadi objek Akkusativ." },
  "erledigen": { example: "Ich erledige meine Aufgaben heute.", translation: "Saya menyelesaikan tugas-tugas saya hari ini.", explanation: "erledigen membutuhkan objek Akkusativ." },
  "genehmigen": { example: "Die Behörde genehmigt den Antrag.", translation: "Instansi pemerintah menyetujui permohonan itu.", explanation: "den Antrag adalah objek Akkusativ maskulin." },
  "das Dokument": { example: "Ich gebe das Dokument am Schalter ab.", translation: "Saya menyerahkan dokumen itu di loket.", explanation: "abgeben adalah verba pisah: gebe ... ab." },
  "beantragen": { example: "Wir beantragen ein Visum.", translation: "Kami mengajukan visa.", explanation: "beantragen membutuhkan objek Akkusativ; ein Visum neutral." },
  "verlängern": { example: "Ich muss mein Visum verlängern.", translation: "Saya harus memperpanjang visa saya.", explanation: "muss + infinitiv; verlängern berada di akhir." },
  "das Visum": { example: "Das Visum ist noch drei Monate gültig.", translation: "Visa itu masih berlaku tiga bulan.", explanation: "Das Visum adalah subjek Nominativ; gültig berarti valid/berlaku." },
  "der Diebstahl": { example: "Ich melde den Diebstahl bei der Polizei.", translation: "Saya melaporkan pencurian itu ke polisi.", explanation: "melden membutuhkan Akkusativ: den Diebstahl." },
  "die Polizei": { example: "Die Polizei hilft dem Touristen.", translation: "Polisi membantu turis laki-laki itu.", explanation: "helfen membutuhkan Dativ: dem Touristen." },
  "der Tourist": { example: "Der Tourist fragt nach dem Weg.", translation: "Turis laki-laki itu bertanya tentang jalan/rute.", explanation: "fragen nach + Dativ: nach dem Weg." },
  "die Touristin": { example: "Die Touristin macht ein Foto vom Parlament.", translation: "Turis perempuan itu mengambil foto parlemen.", explanation: "vom = von dem; von selalu Dativ." },
  "das Parlament": { example: "Vor dem Parlament stehen viele Besucher.", translation: "Di depan parlemen berdiri banyak pengunjung.", explanation: "vor + Dativ dipakai untuk posisi." },
  "das Gesetz": { example: "Das Parlament beschließt ein neues Gesetz.", translation: "Parlemen menetapkan undang-undang baru.", explanation: "ein neues Gesetz adalah Akkusativ neutral dengan artikel tidak tentu." },
  "um einen Gefallen bitten": { example: "Darf ich dich um einen Gefallen bitten?", translation: "Bolehkah saya meminta bantuan kepadamu?", explanation: "bitten um + Akkusativ; einen Gefallen adalah Akkusativ maskulin." },
  "dringend": { example: "Ich brauche dringend Ihre Hilfe.", translation: "Saya sangat membutuhkan bantuan Anda.", explanation: "dringend berfungsi sebagai adverbia yang menerangkan brauche." },
  "der Daumen": { example: "Ich drücke dir die Daumen.", translation: "Saya menyemangatimu / saya doakan berhasil.", explanation: "Ungkapan die Daumen drücken berarti memberi dukungan." },
};
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

type QuizLevel = "Mudah" | "Sedang" | "Sulit";
type QuizItem = {
  id: string;
  level: QuizLevel;
  title: string;
  correct: string;
  options: [string, string][];
  translation: string;
  explanation: string;
};

const quizzes: QuizItem[] = [
  { id: "q1", level: "Mudah", title: "1. Ich besuche _____ alte Kirche. (Akkusativ, feminin)", correct: "b", options: [["a","der alten"],["b","die alte"],["c","das alte"],["d","den alten"]], translation: "Saya mengunjungi gereja tua itu.", explanation: "Kunci: b) die alte. Kata kerja besuchen membutuhkan Akkusativ. Kirche adalah feminin, dan setelah artikel tertentu die pada Akkusativ feminin, kata sifat memakai akhiran -e: die alte Kirche." },
  { id: "q2", level: "Mudah", title: "2. Er wohnt in _____ großen Stadt. (Dativ, feminin)", correct: "c", options: [["a","die große"],["b","dem großen"],["c","der großen"],["d","den großen"]], translation: "Dia tinggal di kota besar itu.", explanation: "Kunci: c) der großen. Präposition in untuk lokasi tetap menjawab pertanyaan wo? sehingga memakai Dativ. Stadt adalah feminin, Dativ feminin artikelnya der, dan adjektif setelah artikel tertentu menjadi -en: der großen Stadt." },
  { id: "q3", level: "Mudah", title: "3. Wir sehen _____ neuen Bahnhof. (Akkusativ, maskulin)", correct: "d", options: [["a","der neue"],["b","die neuen"],["c","das neue"],["d","den neuen"]], translation: "Kami melihat stasiun baru itu.", explanation: "Kunci: d) den neuen. Kata kerja sehen membutuhkan Akkusativ. Bahnhof adalah maskulin, Akkusativ maskulin mengubah der menjadi den, dan adjektif setelah artikel tertentu memakai -en: den neuen Bahnhof." },
  { id: "q4", level: "Mudah", title: "4. Ich fahre _____ dem Bus zur Arbeit.", correct: "b", options: [["a","ohne"],["b","mit"]], translation: "Saya pergi ke tempat kerja dengan bus.", explanation: "Kunci: b) mit. Präposition mit selalu memakai Dativ. Bentuk dem Bus menunjukkan Dativ maskulin, jadi pasangan yang benar adalah mit dem Bus." },
  { id: "q5", level: "Mudah", title: "5. Sie geht _____ einen Regenschirm in den Regen.", correct: "b", options: [["a","mit"],["b","ohne"]], translation: "Dia pergi ke hujan tanpa payung.", explanation: "Kunci: b) ohne. Präposition ohne berarti tanpa dan selalu memakai Akkusativ. Bentuk einen Regenschirm adalah Akkusativ maskulin, jadi benar: ohne einen Regenschirm." },
  { id: "q6", level: "Mudah", title: "6. _____ Sie mir bitte helfen? (formal)", correct: "b", options: [["a","Können"],["b","Könnten"],["c","Könnte"],["d","Könntest"]], translation: "Bisakah Anda membantu saya?", explanation: "Kunci: b) Könnten. Untuk permintaan formal yang sopan kepada Sie, bentuk Konjunktiv II yang tepat adalah Könnten Sie...? Können Sie juga benar secara makna, tetapi kurang sopan dibanding Könnten Sie." },
  { id: "q7", level: "Sedang", title: "7. _____ du mir das Formular geben? (informal)", correct: "c", options: [["a","Könnten"],["b","Könnte"],["c","Könntest"],["d","Könntet"]], translation: "Bisakah kamu memberi saya formulir itu?", explanation: "Kunci: c) Könntest. Subjek du membutuhkan bentuk könntest. Könnten dipakai untuk Sie/sie/wir, könnte untuk ich/er/sie/es, dan könntet untuk ihr." },
  { id: "q8", level: "Sedang", title: "8. Ich möchte Geld _____.", correct: "a", options: [["a","abheben"],["b","einzahlen"],["c","unterschreiben"],["d","beantragen"]], translation: "Saya ingin menarik uang.", explanation: "Kunci: a) abheben. Dalam konteks bank, Geld abheben berarti menarik uang. Geld einzahlen berarti menyetor uang, unterschreiben berarti menandatangani, dan beantragen berarti mengajukan permohonan." },
  { id: "q9", level: "Sedang", title: "9. Apa bahasa Jerman untuk \"formulir\"?", correct: "b", options: [["a","der Antrag"],["b","das Formular"],["c","die Unterschrift"],["d","der Ausweis"]], translation: "Formulir = das Formular.", explanation: "Kunci: b) das Formular. Der Antrag berarti permohonan, die Unterschrift berarti tanda tangan, dan der Ausweis berarti kartu identitas." },
  { id: "q10", level: "Sedang", title: "10. \"Die Behörde\" artinya...", correct: "c", options: [["a","Bank"],["b","Rumah sakit"],["c","Kantor pemerintahan"],["d","Universitas"]], translation: "Die Behörde berarti kantor/instansi pemerintahan.", explanation: "Kunci: c) Kantor pemerintahan. Behörde dipakai untuk lembaga administrasi resmi, misalnya kantor urusan izin, pendaftaran, atau dokumen." },
  { id: "q11", level: "Sedang", title: "11. Ich muss den Antrag _____.", correct: "d", options: [["a","abheben"],["b","servieren"],["c","beschützen"],["d","ausfüllen"]], translation: "Saya harus mengisi permohonan/formulir itu.", explanation: "Kunci: d) ausfüllen. Antrag atau Formular biasanya diisi, sehingga kata kerja yang tepat adalah ausfüllen. Abheben untuk menarik uang, servieren untuk menyajikan, beschützen untuk melindungi." },
  { id: "q12", level: "Sedang", title: "12. Wir gehen ohne _____ Ausweis zur Behörde. (Akkusativ, maskulin)", correct: "a", options: [["a","den"],["b","dem"],["c","der"],["d","die"]], translation: "Kami pergi ke kantor pemerintahan tanpa kartu identitas itu.", explanation: "Kunci: a) den. Ohne selalu Akkusativ. Ausweis adalah maskulin: der Ausweis menjadi den Ausweis pada Akkusativ." },
  { id: "q13", level: "Sulit", title: "13. Könnten Sie mir erklären, _____ ich zum Bahnhof komme?", correct: "b", options: [["a","was"],["b","wie"],["c","wer"],["d","wann"]], translation: "Bisakah Anda menjelaskan kepada saya bagaimana saya sampai ke stasiun?", explanation: "Kunci: b) wie. Pertanyaan tentang cara atau rute memakai wie. Struktur anak kalimat tidak langsung menaruh verb konjugasi komme di akhir: wie ich zum Bahnhof komme." },
  { id: "q14", level: "Sulit", title: "14. Ich habe meine Geldbörse vergessen. Ich muss Geld _____.", correct: "c", options: [["a","drücken"],["b","melden"],["c","leihen"],["d","leeren"]], translation: "Saya lupa dompet saya. Saya harus meminjam uang.", explanation: "Kunci: c) leihen. Geld leihen berarti meminjam uang. Melden berarti melapor, leeren berarti mengosongkan, dan drücken berarti menekan atau menyemangati dalam ungkapan Daumen drücken." },
  { id: "q15", level: "Sulit", title: "15. Der Pass ist nur noch einen Monat gültig. Was passt?", correct: "d", options: [["a","den Diebstahl melden"],["b","ein Konto eröffnen"],["c","das Formular unterschreiben"],["d","das Visum verlängern"]], translation: "Paspor/izin hanya masih berlaku satu bulan. Ungkapan yang cocok: memperpanjang visa.", explanation: "Kunci: d) das Visum verlängern. Kata gültig berarti berlaku/valid. Jika masa berlaku hampir habis, tindakan yang cocok adalah verlängern, yaitu memperpanjang." },
  { id: "q16", level: "Sulit", title: "16. Der Beamte prüft die Angaben. Arti yang paling tepat adalah...", correct: "a", options: [["a","Pegawai negeri memeriksa data."],["b","Pegawai negeri membuka rekening."],["c","Pegawai negeri menyetor uang."],["d","Pegawai negeri menjaga taman."]], translation: "Der Beamte prüft die Angaben = Pegawai negeri memeriksa data.", explanation: "Kunci: a. Der Beamte berarti pegawai negeri laki-laki. Angaben berarti data/keterangan, dan prüfen berarti memeriksa." },
];
const quizGroups: { level: QuizLevel; title: string; intro: string }[] = [
  { level: "Mudah", title: "Übung 1: Mudah — Dasar Artikel, Kasus, dan Kosakata", intro: "Fokus pada bentuk paling sering muncul: Akkusativ, Dativ, mit/ohne, dan permintaan sopan." },
  { level: "Sedang", title: "Übung 2: Sedang — Bank, Behörde, dan Kalimat Praktis", intro: "Latihan memilih kata kerja dan bentuk artikel yang cocok dalam situasi sehari-hari." },
  { level: "Sulit", title: "Übung 3: Sulit — Makna Konteks dan Struktur Kalimat", intro: "Latihan memahami konteks, anak kalimat, dan pilihan ungkapan yang paling natural." },
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

function getFlashcardDetail(card: string[]): GermanCardDetail {
  const [term, info, meaning] = card;
  if (flashcardExamples[term]) return flashcardExamples[term];

  const formHint = info === "-" ? "Fokus kartu ini adalah arti dan pemakaian dasar ungkapan." : info === "Sg." ? "Kata ini biasanya dipakai dalam bentuk singular." : info === "Pl." ? "Kata ini biasanya dipakai dalam bentuk plural." : info.startsWith("hat ") ? `Bentuk Perfekt yang perlu diingat: ${info}.` : `Bentuk tambahan/plural yang perlu diingat: ${info}.`;

  return {
    example: `Ich benutze den Ausdruck "${term}" im Gespräch.`,
    translation: `Saya menggunakan ungkapan "${term}" dalam percakapan.`,
    explanation: `${term} berarti "${meaning}". ${formHint}`,
  };
}

function Flashcards({ direction }: { direction: FlashcardDirection }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragged, setDragged] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [slideNonce, setSlideNonce] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [memorized, setMemorized] = useState<Record<string, FlashcardStatus>>({});
  const card = flashcards[index];
  const [term, info, meaning] = card;
  const detail = getFlashcardDetail(card);
  const isGermanToIndonesian = direction === "de-id";
  const cardKey = `${direction}-${term}-${meaning}`;
  const currentStatus = memorized[cardKey];
  const frontLabel = isGermanToIndonesian ? "Deutsch" : "Indonesia";
  const backLabel = isGermanToIndonesian ? "Arti + Contoh" : "Deutsch";
  const frontText = isGermanToIndonesian ? term : meaning;
  const backText = isGermanToIndonesian ? meaning : term;
  const totalCards = flashcards.length;
  const isLastCard = index === totalCards - 1;
  const learnedCount = Object.values(memorized).filter((value) => value === "known").length;
  const answeredCount = Object.keys(memorized).length;
  const reviewCards = flashcards.filter(([itemTerm, , itemMeaning]) => memorized[`${direction}-${itemTerm}-${itemMeaning}`] !== "known");
  const statusText = currentStatus === "known" ? "Sudah hafal" : currentStatus === "review" ? "Belum hafal" : "Pilih status";
  const statusClass = currentStatus === "known" ? "bg-[#dff1db] text-[#176126]" : currentStatus === "review" ? "bg-[#fff2c7] text-[#6d4f00]" : "bg-white text-[#647268]";
  const knownButtonClass = currentStatus === "known" ? "bg-[#287b31] text-white shadow-[0_10px_22px_rgba(40,123,49,0.22)]" : "bg-[#edf8ea] text-[#176126] hover:bg-[#dff1db]";
  const reviewButtonClass = currentStatus === "review" ? "bg-[#f6c343] text-[#4a3b14] shadow-[0_10px_22px_rgba(246,195,67,0.24)]" : "bg-[#fff7dd] text-[#6d4f00] hover:bg-[#ffefb0]";
  const slideClass = slideDirection === "next" ? "flashcard-slide-next" : "flashcard-slide-prev";

  const moveTo = (newIndex: number, directionType: "next" | "prev") => {
    setSlideDirection(directionType);
    setIndex(newIndex);
    setFlipped(false);
    setSummaryOpen(false);
    setMessage("");
    setSlideNonce((value) => value + 1);
  };
  const next = () => {
    if (!currentStatus) {
      setMessage("Pilih Sudah hafal atau Belum hafal dulu sebelum lanjut.");
      return;
    }
    if (isLastCard) {
      setSummaryOpen(true);
      setMessage("");
      return;
    }
    moveTo(index + 1, "next");
  };
  const prev = () => {
    if (index === 0) return;
    moveTo(index - 1, "prev");
  };
  const updateStatus = (value: FlashcardStatus) => {
    setMemorized((items) => ({ ...items, [cardKey]: value }));
    setMessage("");
  };
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

  return <div className="rounded-2xl border border-[#cde3ca] bg-[#f6fbf3] p-5"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className={`rounded-full px-3 py-1 text-xs font-black ${statusClass}`}>{statusText}</span><span className="text-sm font-bold text-[#647268]">{learnedCount} / {totalCards} hafal · {answeredCount} dinilai</span></div><button className={`group w-full touch-pan-y [perspective:1200px] ${isGermanToIndonesian ? "h-[420px]" : "h-[280px]"}`} onClick={() => { if (!dragged) setFlipped((value) => !value); }} onPointerDown={(event) => { setDragStart(event.clientX); setDragged(false); }} onPointerLeave={(event) => onPointerUp(event.clientX)} onPointerUp={(event) => onPointerUp(event.clientX)}><span key={`${direction}-${slideNonce}`} className={`relative block h-full w-full rounded-[24px] transition-transform duration-700 [transform-style:preserve-3d] ${slideClass} ${flipped ? "[transform:rotateY(180deg)]" : ""}`}><span className="absolute inset-0 flex flex-col items-center justify-center rounded-[24px] border border-[#b7d7b5] bg-[radial-gradient(circle_at_20%_15%,#fff8c7_0%,transparent_28%),linear-gradient(135deg,#ffffff_0%,#eaf8e6_100%)] px-6 text-center shadow-[0_18px_45px_rgba(38,117,49,0.16)] [backface-visibility:hidden] group-hover:shadow-[0_22px_55px_rgba(38,117,49,0.22)]"><span className="mb-4 rounded-full bg-[#287b31] px-4 py-1 text-xs font-black uppercase tracking-[0.28em] text-white">{frontLabel}</span><span className="text-3xl font-black text-[#176126] max-[600px]:text-2xl">{frontText}</span><span className="mt-5 text-sm font-bold text-[#647268]">Klik balik, geser kiri/kanan</span></span><span className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto rounded-[24px] border border-[#f2dfa2] bg-[radial-gradient(circle_at_82%_18%,#c9f3cf_0%,transparent_30%),linear-gradient(135deg,#fff9e8_0%,#ffffff_100%)] px-6 py-5 text-center shadow-[0_18px_45px_rgba(74,59,20,0.14)] [backface-visibility:hidden] [transform:rotateY(180deg)]"><span className="mb-3 rounded-full bg-[#f6c343] px-4 py-1 text-xs font-black uppercase tracking-[0.28em] text-[#4a3b14]">{backLabel}</span><span className="text-3xl font-black text-[#4a3b14] max-[600px]:text-2xl">{backText}</span><span className="mt-4 rounded-xl bg-white/80 px-4 py-2 text-sm font-black text-[#176126]">Bentuk: {info}</span>{isGermanToIndonesian && <span className="mt-4 block space-y-3 text-left text-sm not-italic text-[#382c10]"><span className="block rounded-xl bg-white/85 px-4 py-3"><strong>Contoh:</strong> {detail.example}</span><span className="block rounded-xl bg-white/85 px-4 py-3"><strong>Terjemahan:</strong> {detail.translation}</span><span className="block rounded-xl bg-white/85 px-4 py-3"><strong>Penjelasan:</strong> {detail.explanation}</span></span>}</span></span></button><div className="mt-4 grid grid-cols-2 gap-2"><button className={`rounded-xl px-4 py-2 font-bold transition ${knownButtonClass}`} onClick={() => updateStatus("known")}>Sudah hafal</button><button className={`rounded-xl px-4 py-2 font-bold transition ${reviewButtonClass}`} onClick={() => updateStatus("review")}>Belum hafal</button></div>{message && <div className="mt-3 rounded-xl border border-[#f2dfa2] bg-[#fff9e8] px-4 py-3 text-sm font-bold text-[#6d4f00]">{message}</div>}<div className="mt-4 flex flex-wrap items-center justify-between gap-3"><button className={`rounded-xl px-5 py-2 font-bold ${index === 0 ? "cursor-not-allowed bg-[#edf2ea] text-[#9aa79d]" : "bg-[#edf8ea] text-[#176126] hover:bg-[#dff1db]"}`} disabled={index === 0} onClick={prev}>← Sebelumnya</button><span className="font-bold text-[#647268]">{index + 1} / {totalCards}</span><button className={`rounded-xl px-5 py-2 font-bold text-white ${currentStatus ? "bg-[#287b31] hover:bg-[#176126]" : "cursor-not-allowed bg-[#8caf8a]"}`} onClick={next}>{isLastCard ? "Selesai" : "Berikutnya →"}</button></div>{summaryOpen && <div className="mt-5 rounded-2xl border border-[#cde3ca] bg-white px-5 py-4"><h4 className="font-black text-[#176126]">Daftar yang belum hafal</h4><p className="mt-1 text-sm font-bold text-[#647268]">{reviewCards.length === 0 ? "Mantap, semua kartu di deck ini sudah ditandai hafal." : `${reviewCards.length} kartu perlu diulang dari deck ini.`}</p>{reviewCards.length > 0 && <div className="mt-3 max-h-[260px] space-y-2 overflow-y-auto pr-1">{reviewCards.map(([itemTerm, itemInfo, itemMeaning]) => <div className="rounded-xl border border-[#d8e5d5] bg-[#f8fcf6] px-4 py-3 text-sm" key={`${direction}-review-${itemTerm}-${itemMeaning}`}><p className="font-black text-[#176126]">{isGermanToIndonesian ? itemTerm : itemMeaning}</p><p className="text-[#4a3b14]">{isGermanToIndonesian ? itemMeaning : itemTerm}</p><p className="text-xs font-bold text-[#647268]">Bentuk: {itemInfo}</p></div>)}</div>}<button className="mt-4 rounded-xl bg-[#edf8ea] px-5 py-2 font-bold text-[#176126] hover:bg-[#dff1db]" onClick={() => moveTo(0, "prev")}>Ulangi dari awal</button></div>}</div>;
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

function Quiz({ quiz, onAnswer }: { quiz: QuizItem; onAnswer: (id: string, ok: boolean) => void }) {
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState<"correct" | "incorrect" | "empty" | null>(null);
  const correctLabel = quiz.options.find(([value]) => value === quiz.correct)?.[1] ?? quiz.correct;
  const check = () => { if (!selected) return setResult("empty"); const ok = selected === quiz.correct; setResult(ok ? "correct" : "incorrect"); onAnswer(quiz.id, ok); };
  return <div className="my-3 rounded-[10px] bg-[#f3e5f5] px-5 py-4"><div className="mb-2 flex flex-wrap items-center gap-2"><span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-[#6b2a72]">{quiz.level}</span><p className="font-semibold">{quiz.title}</p></div>{quiz.options.map(([value,label])=><label className="my-1 block cursor-pointer rounded-md px-3 py-1.5 transition-colors hover:bg-[#e1bee7]" key={value}><input className="mr-2" type="radio" name={quiz.id} value={value} checked={selected===value} onChange={() => setSelected(value)} />{label}</label>)}<button className="mt-2.5 inline-block cursor-pointer rounded-lg border-0 bg-[#2e7d32] px-6 py-2.5 text-[1em] text-white hover:bg-[#1b5e20]" onClick={check}>Periksa</button>{result && <div className={`mt-3 rounded-lg p-3 font-semibold ${result === "correct" ? "bg-[#c8e6c9] text-[#1b5e20]" : "bg-[#ffcdd2] text-[#b71c1c]"}`}>{result === "correct" ? "✅ Benar! Sehr gut!" : result === "empty" ? "⚠️ Pilih jawaban terlebih dahulu!" : "❌ Salah. Coba lagi!"}</div>}{result && result !== "empty" && <div className="mt-3 rounded-xl border border-[#d9c5df] bg-white/85 px-4 py-3 text-sm text-[#36233a]"><p><strong>Kunci jawaban:</strong> {quiz.correct}) {correctLabel}</p><p className="mt-1"><strong>Terjemahan:</strong> {quiz.translation}</p><p className="mt-1"><strong>Penjelasan:</strong> {quiz.explanation}</p></div>}</div>;
}

export default function Home() {
  const [answers, setAnswers] = useState<Answers>({});
  const [show, setShow] = useState(false);
  const [activeNav, setActiveNav] = useState("#vocab");
  const correct = Object.values(answers).filter(Boolean).length;
  const totalQuestions = quizzes.length;
  const percentage = totalQuestions ? correct / totalQuestions : 0;
  const scoreText = percentage === 1 ? `🎉 Perfekt! Skor Anda: ${correct}/${totalQuestions}` : percentage >= 0.7 ? `👏 Sehr gut! Skor Anda: ${correct}/${totalQuestions}` : percentage >= 0.4 ? `📚 Gut, tapi perlu latihan lagi. Skor: ${correct}/${totalQuestions}` : `💪 Terus belajar! Skor: ${correct}/${totalQuestions}`;
  useEffect(() => {
    const sectionIds = navItems.map(([href]) => href);
    const updateActiveNav = () => {
      const current = sectionIds.reduce((active, href) => {
        const section = document.querySelector(href);
        if (!section) return active;
        return section.getBoundingClientRect().top <= 150 ? href : active;
      }, sectionIds[0]);
      setActiveNav(current);
    };

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);
    return () => {
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("resize", updateActiveNav);
    };
  }, []);
  return <main className="mx-auto max-w-[920px] px-5 py-6"><header className="mb-8 overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#267531_0%,#63bd6b_100%)] px-8 py-12 text-center text-white shadow-[0_20px_55px_rgba(38,117,49,0.24)]"><p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-[#fff4bd]">Deutsch Lernen</p><h1 className="mb-3 text-[2.25em] font-black tracking-[-0.03em] max-[600px]:text-[1.7em]">🇩🇪 Kapitel 5: Leben in der Stadt</h1><p className="text-[1.05em] opacity-95">Materi Lengkap Bahasa Jerman — Hidup di Kota</p></header>
  <nav className="sticky top-3 z-50 mb-7 rounded-[22px] border border-[#b7d7b5] bg-white/92 px-3 py-3 shadow-[0_14px_38px_rgba(38,117,49,0.16)] backdrop-blur"><div className="flex flex-wrap items-center gap-2"><a className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#287b31] px-4 py-2 text-sm font-black text-white no-underline shadow-sm transition hover:bg-[#176126]" href="#"><span>🇩🇪</span><span>Kapitel 5</span></a>{navItems.map(([href,icon,text])=>{ const active = activeNav === href; return <a className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2 text-sm font-black no-underline shadow-sm transition hover:-translate-y-0.5 max-[520px]:px-3 ${active ? "bg-[#287b31] text-white ring-2 ring-[#f6c343]" : "bg-[#edf8ea] text-[#176126] hover:bg-[#287b31] hover:text-white hover:shadow-md"}`} href={href} key={href} onClick={() => setActiveNav(href)} aria-current={active ? "page" : undefined}><span>{icon}</span><span>{text}</span></a>;})}</div></nav>
  <Section><H2>📋 Daftar Isi</H2><div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">{[["#vocab","1. Kosakata (Wortschatz)"],["#grammar","2. Tata Bahasa (Grammatik)"],["#phrases","3. Frasa Umum (Redemittel)"],["#dialog","4. Dialog & Situasi"],["#culture","5. Landeskunde: Wien"],["#games","6. Flashcard & Mini Game"],["#exercises","7. Latihan Soal (Übungen)"]].map(([href,text])=><a className="block rounded-xl border border-[#d5e8d1] bg-[#edf8ea] px-4 py-3 font-bold text-[#176126] no-underline transition hover:-translate-y-0.5 hover:bg-[#dff1db] hover:shadow-md" href={href} key={href}>{text}</a>)}</div></Section>
  <Section id="vocab"><H2>1. 📖 Kosakata — Wortschatz</H2><H3>🏙️ Kota & Tempat (Stadt & Orte)</H3><VocabTable rows={places}/><H3>🚦 Layanan Kota (in der Stadt)</H3><VocabTable rows={cityServices}/><H3>💼 Pekerjaan & Wawancara (Bewerbungsgespräch)</H3><VocabTable rows={jobs}/><H3>🔎 Mencari Kerja (einen Job suchen)</H3><VocabTable rows={jobSearch}/><H3>�️ Bekerja di Restoran (im Restaurant arbeiten)</H3><VocabTable rows={restaurant}/><H3>🏛️ Di Kantor Pemerintahan (bei der Behörde)</H3><VocabTable rows={office}/><H3>�🏦 Di Bank & Kantor (Bei der Bank & Behörde)</H3><VocabTable rows={bank}/><H3>💳 Tambahan Kosakata Bank (in der Bank)</H3><VocabTable rows={bankExtra}/><H3>👮 Polisi & Tur Kota</H3><VocabTable rows={policeTour}/><H3>✨ Kata dan Ungkapan Lainnya</H3><VocabTable rows={expressions}/></Section>
  <Section id="grammar"><H2>2. 📐 Tata Bahasa — Grammatik</H2><H3>A. Adjektive nach dem bestimmten Artikel</H3><p>Ketika kata sifat muncul setelah artikel tertentu (<em>der, die, das</em>), endingnya berubah sesuai kasus:</p><Box title="Tabel Deklinasi"><DataTable headers={["Kasus","Maskulin (der)","Feminin (die)","Neutral (das)","Plural (die)"]} rows={[["Nominativ","der große Park","die schöne Stadt","das alte Haus","die kleinen Straßen"],["Akkusativ","den großen Park","die schöne Stadt","das alte Haus","die kleinen Straßen"],["Dativ","dem großen Park","der schönen Stadt","dem alten Haus","den kleinen Straßen"]]}/></Box><Tip>💡 <strong>Tips:</strong> Setelah artikel tertentu, akhiran kata sifat hanya <strong>-e</strong> atau <strong>-en</strong>. Nominativ singular selalu <strong>-e</strong>, sisanya <strong>-en</strong> (kecuali Akkusativ feminin & neutral = <strong>-e</strong>).</Tip><Example>Ich besuche <strong>die alte Kirche</strong>. → Saya mengunjungi gereja tua itu.<br/><span className="text-[0.9em] not-italic text-[#666]">Er wohnt in <strong>dem kleinen Haus</strong>. → Dia tinggal di rumah kecil itu.</span></Example><H3>B. Präpositionen: <em>ohne</em> + Akkusativ & <em>mit</em> + Dativ</H3><Box title="ohne + Akkusativ (tanpa)"><DataTable headers={["Contoh","Arti"]} rows={[["ohne den Ausweis","tanpa kartu identitas"],["ohne eine Bewerbung","tanpa lamaran"],["ohne das Formular","tanpa formulir"]]}/></Box><Box title="mit + Dativ (dengan)"><DataTable headers={["Contoh","Arti"]} rows={[["mit dem Bus","dengan bus"],["mit der Straßenbahn","dengan trem"],["mit dem Fahrrad","dengan sepeda"],["mit den Freunden","dengan teman-teman"]]}/></Box><Example>Ich fahre <strong>mit dem Zug</strong> nach Wien. → Saya naik kereta ke Wina.<br/>Er geht <strong>ohne den Regenschirm</strong>. → Dia pergi tanpa payung.</Example><H3>C. Konjunktiv II: <em>könnte</em> (Bisa / Bisakah)</H3><p>Digunakan untuk permintaan sopan, saran, atau kemungkinan. Ini adalah bentuk sopan dari <em>können</em>.</p><Box title="Konjugasi könnte"><DataTable headers={["Pronomen","Konjugasi","Contoh"]} rows={[["ich","könnte","Ich könnte Ihnen helfen."],["du","könntest","Könntest du mir das Formular geben?"],["er/sie/es","könnte","Er könnte morgen kommen."],["wir","könnten","Wir könnten zusammen gehen."],["ihr","könntet","Könntet ihr mir helfen?"],["sie/Sie","könnten","Könnten Sie das bitte wiederholen?"]]}/></Box><Tip>💡 <strong>Tips:</strong> Gunakan <em>Könnten Sie...?</em> untuk situasi formal (di bank, kantor, wawancara). Gunakan <em>Könntest du...?</em> untuk situasi informal.</Tip><Example><strong>Könnten Sie</strong> mir bitte helfen? → Bisakah Anda membantu saya?<br/><strong>Könnte</strong> ich ein Konto eröffnen? → Bisakah saya membuka rekening?</Example><H3>D. Artikel: der, die, das, ein, kein</H3><p>Artikel menunjukkan gender, jumlah, dan kasus. Pada level dasar, hafalkan artikel bersama kosakatanya karena artikel berubah saat masuk Akkusativ atau Dativ.</p><Box title="Artikel penting per kasus"><DataTable headers={["Kasus","Maskulin","Feminin","Neutral","Plural"]} rows={[["Nominativ","der / ein / kein","die / eine / keine","das / ein / kein","die / - / keine"],["Akkusativ","den / einen / keinen","die / eine / keine","das / ein / kein","die / - / keine"],["Dativ","dem / einem / keinem","der / einer / keiner","dem / einem / keinem","den / - / keinen + -n"]]}/></Box><Tip><strong>kein</strong> dipakai untuk menyangkal kata benda: <em>Ich habe keinen Ausweis</em> = saya tidak punya kartu identitas. <strong>nicht</strong> menyangkal verba, adjektif, atau seluruh kalimat: <em>Das Formular ist nicht richtig.</em></Tip><Example><strong>Der Antrag</strong> ist wichtig. → Permohonan itu penting.<br/><strong>Ich unterschreibe den Antrag.</strong> → Saya menandatangani permohonan itu.<br/><strong>Ich helfe dem Touristen.</strong> → Saya membantu turis laki-laki itu.</Example><H3>E. Kasus: Nominativ, Akkusativ, Dativ</H3><p>Gunakan pertanyaan sederhana untuk menentukan kasus: siapa melakukan sesuatu? = Nominativ; apa/siapa yang dikenai tindakan? = Akkusativ; kepada/untuk siapa? atau setelah preposisi Dativ = Dativ.</p><Box title="Cara cepat membaca kasus"><DataTable headers={["Kasus","Fungsi","Pertanyaan","Contoh"]} rows={[["Nominativ","Subjek","wer? / was?","Der Beamte arbeitet."],["Akkusativ","Objek langsung","wen? / was?","Ich brauche den Ausweis."],["Dativ","Objek penerima / setelah mit, bei, zu","wem? / wo?","Sie hilft dem Kunden."]]}/></Box><Example><strong>Die Beamtin gibt dem Mann das Formular.</strong> → Pegawai negeri perempuan memberi formulir itu kepada pria tersebut.<br/><span className="text-[0.9em] not-italic text-[#666]">die Beamtin = Nominativ, dem Mann = Dativ, das Formular = Akkusativ.</span></Example><H3>F. Wechselpräpositionen: in, an, auf, vor, über</H3><p>Beberapa preposisi bisa memakai Akkusativ atau Dativ. Jika menunjukkan arah/gerakan ke tujuan, pakai Akkusativ. Jika menunjukkan lokasi tetap, pakai Dativ.</p><Box title="Arah vs lokasi"><DataTable headers={["Pertanyaan","Kasus","Contoh","Arti"]} rows={[["wohin? ke mana","Akkusativ","Ich gehe in die Stadt.","Saya pergi ke kota."],["wo? di mana","Dativ","Ich bin in der Stadt.","Saya berada di kota."],["wohin?","Akkusativ","Er stellt das Auto auf den Parkplatz.","Dia menaruh mobil ke tempat parkir."],["wo?","Dativ","Das Auto steht auf dem Parkplatz.","Mobil itu berada di tempat parkir."]]}/></Box><Tip>Verba gerak seperti <em>gehen, fahren, stellen, legen</em> sering memicu Akkusativ. Verba posisi seperti <em>sein, stehen, sitzen, liegen, wohnen</em> sering memicu Dativ.</Tip><H3>G. Trennbare Verben & Perfekt</H3><p>Verba pisah memiliki awalan seperti <em>aus-, ab-, ein-, mit-</em>. Pada kalimat utama present tense, awalan pindah ke akhir. Pada Perfekt, bentuk participle sering menjadi <em>ge</em> di antara awalan dan verba dasar.</p><Box title="Verba pisah dari Kapitel ini"><DataTable headers={["Infinitiv","Präsens","Perfekt","Arti"]} rows={[["ausfüllen","Ich fülle das Formular aus.","Ich habe das Formular ausgefüllt.","mengisi"],["abheben","Ich hebe Geld ab.","Ich habe Geld abgehoben.","menarik uang"],["einzahlen","Sie zahlt Geld ein.","Sie hat Geld eingezahlt.","menyetor"],["abgeben","Wir geben die Unterlagen ab.","Wir haben die Unterlagen abgegeben.","menyerahkan"],["mitbringen","Bitte bringen Sie den Ausweis mit.","Sie haben den Ausweis mitgebracht.","membawa serta"]]}/></Box><Example><strong>Ich muss das Formular ausfüllen.</strong> → Saya harus mengisi formulir itu.<br/><span className="text-[0.9em] not-italic text-[#666]">Dengan modalverb <em>muss</em>, verba utama kembali menjadi infinitiv di akhir: ausfüllen.</span></Example><H3>H. Nebensatz & indirekte Fragen</H3><p>Pada anak kalimat bahasa Jerman, verba terkonjugasi pindah ke akhir. Ini sangat sering muncul saat bertanya dengan sopan memakai <em>Könnten Sie mir sagen/erklären...</em></p><Box title="Struktur anak kalimat"><DataTable headers={["Kalimat langsung","Kalimat sopan/tidak langsung","Arti"]} rows={[["Wo ist der Bahnhof?","Könnten Sie mir sagen, wo der Bahnhof ist?","Bisakah Anda memberi tahu saya di mana stasiun?"],["Wie komme ich zum Amt?","Könnten Sie mir erklären, wie ich zum Amt komme?","Bisakah Anda menjelaskan bagaimana saya ke kantor pemerintahan?"],["Welche Dokumente brauche ich?","Ich weiß nicht, welche Dokumente ich brauche.","Saya tidak tahu dokumen apa yang saya perlukan."]]}/></Box><Tip>Setelah koma, perhatikan posisi verba: <em>ist, komme, brauche</em> berada di akhir anak kalimat.</Tip></Section>
  <Section id="phrases"><H2>3. 💬 Frasa Umum — Redemittel</H2>{[["🙏 Meminta dengan Sopan (Höflich bitten)",["Könnten Sie mir bitte helfen? → Bisakah Anda membantu saya?","Könnte ich bitte einen Termin haben? → Bisakah saya mendapat janji temu?","Dürfte ich Sie etwas fragen? → Bolehkah saya bertanya sesuatu?","Wären Sie so freundlich, mir zu helfen? → Maukah Anda membantu saya?"]],["🔍 Menanyakan Sesuatu (Nach Dingen fragen)",["Wo ist die nächste Bank? → Di mana bank terdekat?","Wie komme ich zum Bahnhof? → Bagaimana saya bisa ke stasiun?","Können Sie mir den Weg zeigen? → Bisakah Anda menunjukkan jalannya?","Was brauche ich für den Antrag? → Apa yang saya butuhkan untuk permohonan?"]],["🏦 Di Bank (Gespräche bei der Bank)",["Ich möchte ein Konto eröffnen. → Saya ingin membuka rekening.","Kann ich Geld abheben? → Bisakah saya menarik uang?","Ich möchte Geld überweisen. → Saya ingin mentransfer uang."]],["🏛️ Di Kantor Pemerintahan (Bei der Behörde)",["Ich brauche eine Anmeldung. → Saya perlu registrasi.","Wo muss ich unterschreiben? → Di mana saya harus tanda tangan?","Welche Dokumente brauche ich? → Dokumen apa yang saya butuhkan?"]],["🏙️ Mendeskripsikan Kota (Eine Stadt beschreiben)",["Die Stadt ist sehr schön und modern. → Kota ini sangat cantik dan modern.","Es gibt viele Parks und Museen. → Ada banyak taman dan museum.","Die Altstadt ist besonders sehenswert. → Kota tua sangat layak dikunjungi.","Man kann gut mit der U-Bahn fahren. → Bisa dengan mudah naik metro."]]].map(([title,items])=><div key={title as string}><H3>{title as string}</H3>{(items as string[]).map(x=><Example key={x}>{x}</Example>)}</div>)}</Section>
  <Section id="dialog"><H2>4. 🎭 Contoh Dialog</H2><H3>Dialog 1: Di Bank</H3><div className="my-2.5 rounded-[10px] bg-[#f9fbe7] p-[18px]"><p><strong>🧑 Kunde:</strong> Guten Tag! Ich möchte ein Konto eröffnen.</p><p><strong>👨‍💼 Bankangestellter:</strong> Guten Tag! Haben Sie Ihren Ausweis dabei?</p><p><strong>🧑 Kunde:</strong> Ja, hier bitte. Könnten Sie mir erklären, welche Konten es gibt?</p><p><strong>👨‍💼 Bankangestellter:</strong> Natürlich. Wir haben ein Girokonto und ein Sparkonto.</p><p><strong>🧑 Kunde:</strong> Ich möchte ein Girokonto. Was muss ich ausfüllen?</p><p><strong>👨‍💼 Bankangestellter:</strong> Bitte füllen Sie dieses Formular aus und unterschreiben Sie hier.</p><p><strong>🧑 Kunde:</strong> Vielen Dank für Ihre Hilfe!</p></div><H3>Dialog 2: Wawancara Kerja</H3><div className="my-2.5 rounded-[10px] bg-[#f9fbe7] p-[18px]"><p><strong>👨‍💼 Interviewer:</strong> Guten Tag, Frau Müller. Bitte setzen Sie sich.</p><p><strong>👩 Bewerberin:</strong> Vielen Dank. Ich freue mich über die Einladung.</p><p><strong>👨‍💼 Interviewer:</strong> Erzählen Sie uns von Ihrer Erfahrung.</p><p><strong>👩 Bewerberin:</strong> Ich habe drei Jahre als Sekretärin gearbeitet. Ich könnte sofort anfangen.</p><p><strong>👨‍💼 Interviewer:</strong> Sehr gut. Könnten Sie auch am Wochenende arbeiten?</p><p><strong>👩 Bewerberin:</strong> Ja, das wäre kein Problem.</p></div></Section>
  <Section id="culture"><H2>5. 🌍 Landeskunde: Rund um den Ring — Wien</H2><p><strong>Die Ringstraße</strong> adalah jalan boulevard terkenal di Wina (Wien), ibu kota Austria. Jalan ini mengelilingi pusat kota tua (<em>Innere Stadt</em>) dan dibangun pada abad ke-19.</p><p>Di sepanjang Ringstraße, Anda bisa menemukan bangunan penting seperti:</p><DataTable headers={["Gebäude","Arti","Fungsi"]} rows={buildings}/><Tip>💡 Wien sering disebut sebagai salah satu kota paling layak huni di dunia!</Tip></Section>
  <Section id="games"><H2>6. 🎮 Flashcard & Mini Game</H2><div className="grid grid-cols-2 gap-5 max-[760px]:grid-cols-1"><div><H3>🃏 Flashcard Jerman → Indonesia</H3><Flashcards direction="de-id" /></div><div><H3>🃏 Flashcard Indonesia → Jerman</H3><Flashcards direction="id-de" /></div><div className="col-span-2 max-[760px]:col-span-1"><H3>⚡ Mini Game</H3><MiniGame /></div></div></Section>
  <Section id="exercises"><H2>7. ✏️ Latihan Soal — Übungen</H2>{quizGroups.map((group)=><div key={group.level}><H3>{group.title}</H3><p className="mb-2 text-[#647268]">{group.intro}</p>{quizzes.filter((quiz)=>quiz.level===group.level).map(q=><Quiz key={q.id} quiz={q} onAnswer={(id,ok)=>setAnswers(a=>({...a,[id]:ok}))}/>)}</div>)}<H3>Übung 4: Was machen Sie in dieser Situation?</H3><Box title="Lengkapi dengan ungkapan yang sesuai">{situationExercises.map(([situation, answer], index)=><div className="my-3 rounded-xl border border-[#d8e5d5] bg-white px-4 py-3" key={situation}><p className="font-bold text-[#223326]">{index + 1}. {situation}</p><p className="mt-1 text-[#176126]"><strong>Antwort:</strong> {answer}</p></div>)}</Box><div className="mt-6 text-center"><button className="inline-block cursor-pointer rounded-lg border-0 bg-[#2e7d32] px-8 py-3 text-[1.1em] text-white hover:bg-[#1b5e20]" onClick={()=>setShow(true)}>📊 Lihat Skor Total</button>{show && <div className="mt-4 text-[1.3em] font-bold text-[#2e7d32]">{scoreText}</div>}</div></Section>
  <footer className="p-5 text-center text-[0.9em] text-[#888]">Materi Bahasa Jerman — Kapitel 5: Leben in der Stadt<br/>Update: 7 Mei 2026<br/>Viel Erfolg beim Lernen! 🍀</footer></main>;
}
