"use client";
// Last update: 2026-05-07 - Triggering GitHub Action deployment

import { useEffect, useRef, useState } from "react";

type Answers = Record<string, boolean>;
type FlashcardDirection = "de-id" | "id-de";
type GermanCardDetail = {
  example: string;
  translation: string;
  explanation: string;
};

const cardDetail = (example: string, translation: string, explanation: string): GermanCardDetail => ({ example, translation, explanation });

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

const contextualFlashcardExamples: Record<string, GermanCardDetail> = {
  "der Arbeitgeber": cardDetail("Der Arbeitgeber lädt mich zum Vorstellungsgespräch ein.", "Pemberi kerja mengundang saya ke wawancara kerja.", "Der Arbeitgeber adalah pihak yang memberi pekerjaan; dalam konteks Bewerbung, ia mengundang atau memberi Bescheid."),
  "der Arbeitnehmer": cardDetail("Der Arbeitnehmer arbeitet in Teilzeit.", "Pekerja itu bekerja paruh waktu.", "Der Arbeitnehmer adalah orang yang bekerja untuk Arbeitgeber. Bentuk feminin: die Arbeitnehmerin."),
  "das Gehalt": cardDetail("Das Gehalt ist für die Stelle sehr wichtig.", "Gaji itu sangat penting untuk posisi tersebut.", "Das Gehalt dipakai untuk membicarakan pembayaran bulanan dalam pekerjaan."),
  "die Bewerbung": cardDetail("Ich schicke meine Bewerbung per E-Mail.", "Saya mengirim lamaran saya melalui email.", "Die Bewerbung adalah dokumen/lamaran untuk eine Stelle. Pola penting: sich um eine Stelle bewerben."),
  "die Qualifikation": cardDetail("Meine Qualifikation passt gut zu der Stelle.", "Kualifikasi saya cocok dengan posisi itu.", "Die Qualifikation dipakai saat menjelaskan kemampuan atau syarat untuk pekerjaan."),
  "die Unterschrift": cardDetail("Ohne Unterschrift ist der Antrag nicht gültig.", "Tanpa tanda tangan, permohonan itu tidak berlaku.", "Die Unterschrift sering muncul dengan Formular atau Antrag. Ohne selalu diikuti Akkusativ."),
  "das Verkehrsmittel": cardDetail("In der Stadt gibt es viele Verkehrsmittel.", "Di kota ada banyak alat transportasi.", "Das Verkehrsmittel adalah alat transportasi. Bentuk plural yang sering dipakai: die Verkehrsmittel."),
  "öffentlich": cardDetail("Ich fahre mit den öffentlichen Verkehrsmitteln zur Arbeit.", "Saya pergi kerja dengan transportasi umum.", "Öffentlich berarti umum/publik. Dengan mit, bentuknya Dativ plural: den öffentlichen Verkehrsmitteln."),
  "der Fahrer": cardDetail("Der Fahrer fährt den Bus durch die Stadt.", "Pengemudi itu mengendarai bus melewati kota.", "Der Fahrer adalah pengemudi laki-laki. Objek langsung den Bus memakai Akkusativ."),
  "die Fahrerin": cardDetail("Die Fahrerin hält an der Haltestelle.", "Pengemudi perempuan itu berhenti di halte.", "Die Fahrerin adalah pengemudi perempuan. An der Haltestelle memakai Dativ karena menunjukkan lokasi."),
  "transportieren": cardDetail("Die Busse transportieren viele Menschen.", "Bus-bus itu mengangkut banyak orang.", "Transportieren berarti mengangkut atau membawa orang/barang dari satu tempat ke tempat lain."),
  "beschützen": cardDetail("Die Polizei beschützt die Menschen in der Stadt.", "Polisi melindungi orang-orang di kota.", "Beschützen membutuhkan objek Akkusativ: die Menschen."),
  "die Feuerwehr": cardDetail("Die Feuerwehr kommt schnell und löscht den Brand.", "Pemadam kebakaran datang cepat dan memadamkan kebakaran.", "Die Feuerwehr adalah layanan kota untuk keadaan darurat kebakaran; bentuk ini biasanya dipakai singular."),
  "die Sicherheit": cardDetail("Die Polizei kümmert sich um die Sicherheit.", "Polisi mengurus keamanan.", "Die Sicherheit berarti keamanan. Pola Kapitel 5: sich kümmern um + Akkusativ."),
  "sich kümmern um": cardDetail("Die Stadt kümmert sich um die Ordnung.", "Kota/pemerintah kota mengurus ketertiban.", "Sich kümmern um berarti mengurus. Setelah um, gunakan Akkusativ: die Ordnung."),
  "pflegen": cardDetail("Im Krankenhaus pflegen die Mitarbeiter die Patienten.", "Di rumah sakit para pekerja merawat pasien.", "Pflegen berarti merawat, sering dipakai dalam konteks Krankenhaus atau Pflege."),
  "die Operation": cardDetail("Die Operation findet im Krankenhaus statt.", "Operasi itu berlangsung di rumah sakit.", "Die Operation adalah tindakan medis. Im Krankenhaus = in dem Krankenhaus, Dativ lokasi."),
  "die Straßenreinigung": cardDetail("Die Straßenreinigung räumt die Straßen auf.", "Petugas/kegiatan pembersihan jalan membersihkan jalan-jalan.", "Die Straßenreinigung berhubungan dengan kebersihan kota dan verba aufräumen."),
  "aufräumen": cardDetail("Die Mitarbeiter räumen den Marktplatz auf.", "Para pekerja membersihkan/membereskan alun-alun.", "Aufräumen adalah trennbares Verb: räumen ... auf."),
  "die Ordnung": cardDetail("Ordnung ist in der Stadt wichtig.", "Ketertiban penting di kota.", "Die Ordnung berarti keteraturan atau ketertiban dalam kehidupan kota."),
  "der Müll": cardDetail("Der Müll gehört in die Mülltonne.", "Sampah harus masuk ke tong sampah.", "Der Müll biasanya dipakai singular dan berkaitan dengan Mülltonne atau Müllabfuhr."),
  "die Müllabfuhr": cardDetail("Die Müllabfuhr leert die Mülltonnen am Morgen.", "Petugas pengangkut sampah mengosongkan tong sampah pada pagi hari.", "Die Müllabfuhr adalah layanan kota yang mengambil sampah."),
  "die Mülltonne": cardDetail("Die Mülltonne steht vor dem Haus.", "Tong sampah itu berada di depan rumah.", "Die Mülltonne adalah tempat sampah besar. Vor dem Haus memakai Dativ untuk lokasi."),
  "leeren": cardDetail("Die Müllabfuhr leert die Mülltonnen.", "Pengangkut sampah mengosongkan tong sampah.", "Leeren berarti mengosongkan. Objek die Mülltonnen berbentuk plural."),
  "die Kenntnis": cardDetail("Für die Stelle brauche ich gute Deutschkenntnisse.", "Untuk posisi itu saya membutuhkan kemampuan bahasa Jerman yang baik.", "Kenntnisse sering dipakai dalam plural untuk kemampuan/pengetahuan."),
  "in Teilzeit arbeiten": cardDetail("Ich möchte in Teilzeit arbeiten.", "Saya ingin bekerja paruh waktu.", "In Teilzeit arbeiten adalah ungkapan tetap untuk jenis jam kerja."),
  "die Bezahlung": cardDetail("Die Bezahlung ist fair.", "Pembayarannya adil.", "Die Bezahlung berarti pembayaran/upah dan sering muncul saat membicarakan pekerjaan."),
  "der Lohn": cardDetail("Der Lohn ist jeden Monat gleich.", "Upahnya sama setiap bulan.", "Der Lohn berarti upah. Bentuk plural: die Löhne."),
  "spontan": cardDetail("Ich kann spontan am Wochenende arbeiten.", "Saya bisa bekerja spontan pada akhir pekan.", "Spontan berarti tanpa rencana lama; berguna saat membicarakan ketersediaan kerja."),
  "der Bescheid": cardDetail("Ich bekomme morgen Bescheid von der Behörde.", "Besok saya mendapat pemberitahuan dari kantor pemerintahan.", "Bescheid bekommen berarti mendapat kabar/keputusan."),
  "die Zutat": cardDetail("Für die Suppe brauche ich frische Zutaten.", "Untuk sup itu saya membutuhkan bahan-bahan segar.", "Die Zutat berarti bahan makanan. Plural: die Zutaten."),
  "die Einbürgerung": cardDetail("Ich stelle einen Antrag auf Einbürgerung.", "Saya mengajukan permohonan naturalisasi.", "Die Einbürgerung adalah proses menjadi warga negara. Pola penting: einen Antrag stellen."),
  "abgeben": cardDetail("Ich gebe die Unterlagen am Schalter ab.", "Saya menyerahkan berkas di loket.", "Abgeben adalah trennbares Verb: gebe ... ab. Sering dipakai di Behörde."),
  "Angaben prüfen": cardDetail("Die Beamtin prüft meine Angaben.", "Pegawai negeri perempuan memeriksa data saya.", "Angaben prüfen berarti memeriksa data/keterangan dalam formulir."),
  "der Personalausweis": cardDetail("Ich beantrage einen Personalausweis beim Amt.", "Saya mengajukan KTP/kartu identitas di kantor.", "Beantragen membutuhkan Akkusativ: einen Personalausweis."),
  "gültig": cardDetail("Mein Visum ist noch drei Monate gültig.", "Visa saya masih berlaku tiga bulan.", "Gültig berarti valid/berlaku, sering dipakai untuk Visum, Ausweis, atau Dokument."),
  "die Grenze": cardDetail("An der Grenze muss ich meinen Ausweis zeigen.", "Di perbatasan saya harus menunjukkan kartu identitas saya.", "Die Grenze berarti perbatasan. An der Grenze memakai Dativ lokasi."),
  "der/die Angestellte": cardDetail("Die Angestellte erklärt mir das Formular.", "Pegawai itu menjelaskan formulir kepada saya.", "Der/die Angestellte berarti pegawai. Mir adalah Dativ penerima."),
  "vom Konto Geld abheben": cardDetail("Ich möchte vom Konto Geld abheben.", "Saya ingin menarik uang dari rekening.", "Vom Konto = von dem Konto. Abheben adalah trennbares Verb."),
  "der Betrag": cardDetail("Ich überweise den Betrag heute.", "Saya mentransfer jumlah uang itu hari ini.", "Der Betrag berarti jumlah uang. Akkusativ maskulin: den Betrag."),
  "einen Betrag überweisen": cardDetail("Ich möchte einen Betrag auf Ihr Konto überweisen.", "Saya ingin mentransfer sejumlah uang ke rekening Anda.", "Überweisen dipakai untuk transfer uang di bank."),
  "ausgeben": cardDetail("Ich gebe nicht viel Geld aus.", "Saya tidak menghabiskan banyak uang.", "Ausgeben adalah trennbares Verb: gebe ... aus."),
  "ein Konto eröffnen": cardDetail("Ich möchte bei der Bank ein Konto eröffnen.", "Saya ingin membuka rekening di bank.", "Möchte + infinitiv: eröffnen berada di akhir kalimat."),
  "die Bankkarte": cardDetail("Meine Bankkarte ist weg. Ich muss sie sperren lassen.", "Kartu bank saya hilang. Saya harus memblokirnya.", "Die Bankkarte dipakai untuk membayar atau mengambil uang; sperren berarti memblokir."),
  "sperren": cardDetail("Die Bank sperrt meine Bankkarte.", "Bank memblokir kartu bank saya.", "Sperren berarti memblokir, biasanya untuk Bankkarte atau Konto."),
  "der Kredit": cardDetail("Wir beantragen einen Kredit bei der Bank.", "Kami mengajukan kredit di bank.", "Der Kredit menjadi einen Kredit dalam Akkusativ."),
  "die Geldbörse": cardDetail("Meine Geldbörse ist weg.", "Dompet saya hilang.", "Die Geldbörse berarti dompet. Weg sein berarti hilang/tidak ada."),
  "leihen": cardDetail("Kannst du mir bitte zehn Euro leihen?", "Bisakah kamu meminjamkan saya sepuluh euro?", "Leihen berarti meminjamkan atau meminjam, tergantung konteks."),
  "melden": cardDetail("Ich melde den Diebstahl bei der Polizei.", "Saya melaporkan pencurian itu ke polisi.", "Melden berarti melapor. Den Diebstahl adalah Akkusativ."),
  "weg sein": cardDetail("Meine Geldbörse ist weg.", "Dompet saya hilang.", "Weg sein berarti hilang atau tidak ada di tempatnya."),
  "der Stadtplan": cardDetail("Der Tourist sucht den Bahnhof auf dem Stadtplan.", "Turis itu mencari stasiun di peta kota.", "Der Stadtplan adalah peta kota; auf dem Stadtplan memakai Dativ lokasi."),
  "der Politiker": cardDetail("Der Politiker arbeitet im Parlament.", "Politikus laki-laki itu bekerja di parlemen.", "Der Politiker berhubungan dengan Parlament, Gesetz, dan Verwaltung."),
  "die Politikerin": cardDetail("Die Politikerin spricht über ein neues Gesetz.", "Politikus perempuan itu berbicara tentang undang-undang baru.", "Über + Akkusativ sering dipakai untuk topik pembicaraan: über ein Gesetz."),
  "die Verwaltung": cardDetail("Die Verwaltung prüft den Antrag.", "Administrasi/pemerintahan memeriksa permohonan itu.", "Die Verwaltung berkaitan dengan Behörde dan dokumen resmi."),
  "das Gebäude": cardDetail("Das Rathaus ist ein wichtiges Gebäude.", "Balai kota adalah gedung penting.", "Das Gebäude berarti gedung/bangunan. Ein wichtiges Gebäude adalah Nominativ neutral."),
  "der Dom": cardDetail("Der Dom steht im Zentrum der Stadt.", "Katedral itu berada di pusat kota.", "Der Dom adalah bangunan penting di kota. Im Zentrum memakai Dativ lokasi."),
  "die Disco": cardDetail("Am Wochenende gehen viele Leute in die Disco.", "Pada akhir pekan banyak orang pergi ke diskotek.", "In die Disco memakai Akkusativ karena menunjukkan arah/tujuan."),
  "bitten": cardDetail("Ich bitte Sie um Hilfe.", "Saya meminta bantuan kepada Anda.", "Bitten um + Akkusativ: um Hilfe atau um einen Gefallen."),
  "der Gefallen": cardDetail("Darf ich Sie um einen Gefallen bitten?", "Bolehkah saya meminta bantuan kepada Anda?", "Der Gefallen berarti bantuan/kebaikan. Dalam frasa ini: um einen Gefallen bitten."),
  "das Beste": cardDetail("Ich wünsche Ihnen das Beste.", "Saya mendoakan yang terbaik untuk Anda.", "Das Beste dipakai dalam ungkapan harapan atau dukungan."),
  "der/die Nächste": cardDetail("Der Nächste wartet schon am Schalter.", "Orang berikutnya sudah menunggu di loket.", "Der/die Nächste berarti orang berikutnya atau yang terdekat, tergantung konteks."),
  "der Fan": cardDetail("Der Fan drückt seiner Mannschaft die Daumen.", "Penggemar itu mendukung timnya.", "Der Fan berarti penggemar. Die Daumen drücken berarti memberi dukungan."),
  "drücken": cardDetail("Ich drücke dir die Daumen.", "Saya mendoakan kamu berhasil.", "Drücken berarti menekan, tetapi dalam ungkapan die Daumen drücken artinya memberi dukungan."),
  "bunt": cardDetail("Der Marktplatz ist am Samstag sehr bunt.", "Alun-alun pada hari Sabtu sangat berwarna-warni.", "Bunt berarti berwarna-warni, cocok untuk menggambarkan kota atau pasar."),
  "modern": cardDetail("Die Stadt ist modern und gut organisiert.", "Kota itu modern dan terorganisir dengan baik.", "Modern dipakai untuk menggambarkan kota, bangunan, atau layanan."),
  "funktionieren": cardDetail("Der Fahrkartenautomat funktioniert nicht.", "Mesin tiket itu tidak berfungsi.", "Funktionieren berarti berfungsi. Nicht dipakai untuk menyangkal verba."),
  "der Gedanke": cardDetail("Der Gedanke an die Prüfung macht mich nervös.", "Pikiran tentang ujian membuat saya gugup.", "Der Gedanke berarti pikiran. An + Akkusativ dipakai untuk topik yang dipikirkan."),
  "die Ruhe": cardDetail("Vor der Prüfung brauche ich Ruhe.", "Sebelum ujian saya membutuhkan ketenangan.", "Die Ruhe berarti ketenangan; kata ini biasanya dipakai singular."),
  "die Entspannung": cardDetail("Nach dem Lernen brauche ich Entspannung.", "Setelah belajar saya membutuhkan relaksasi.", "Die Entspannung berarti relaksasi atau istirahat."),
  "nehmen": cardDetail("Ich nehme den Bus zur Behörde.", "Saya naik bus ke kantor pemerintahan.", "Nehmen berarti mengambil atau memakai transportasi. Den Bus adalah Akkusativ."),
  "über": cardDetail("Wir sprechen über die Stadt.", "Kami berbicara tentang kota.", "Über bisa berarti tentang atau melewati. Untuk topik, sering memakai Akkusativ."),
  "vorstellen": cardDetail("Im Bewerbungsgespräch stelle ich mich kurz vor.", "Dalam wawancara kerja saya memperkenalkan diri secara singkat.", "Sich vorstellen berarti memperkenalkan diri; vorstellen adalah trennbares Verb."),
  "vor": cardDetail("Vor dem Rathaus wartet ein Tourist.", "Di depan balai kota seorang turis menunggu.", "Vor + Dativ dipakai untuk lokasi: vor dem Rathaus."),
  "das Wunder": cardDetail("Das Museum ist ein kleines Wunder der Stadt.", "Museum itu adalah keajaiban kecil kota.", "Das Wunder berarti keajaiban dan bisa dipakai untuk menggambarkan sesuatu yang istimewa."),
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
const navItems = [["#vocab","📖","Kosakata"],["#grammar","📐","Grammatik"],["#phrases","💬","Redemittel"],["#dialog","🎭","Dialog"],["#exam-prep","📝","Ujian"],["#culture","🌍","Wien"],["#flash-de-id","🃏","Flashcard"],["#mini-game","⚡","Mini Game"],["#exercises","✏️","Übungen"]];
const flashNavItems = [["#flash-de-id", "🃏 Jerman → Indonesia"], ["#flash-id-de", "🃏 Indonesia → Jerman"], ["#mini-game", "⚡ Mini Game"]];

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
  { id: "q17", level: "Mudah", title: "Tambahan Mudah 1. Ich brauche _____ Formular. (Akkusativ, neutral)", correct: "c", options: [["a","der"],["b","die"],["c","das"],["d","den"]], translation: "Saya membutuhkan formulir itu.", explanation: "Kunci: c) das. Kata kerja brauchen membutuhkan objek Akkusativ. Formular adalah neutral, sehingga artikel tertentunya tetap das dalam Akkusativ: das Formular." },
  { id: "q18", level: "Mudah", title: "Tambahan Mudah 2. Sie wartet vor _____ Rathaus. (Dativ, neutral)", correct: "b", options: [["a","das"],["b","dem"],["c","den"],["d","der"]], translation: "Dia menunggu di depan balai kota.", explanation: "Kunci: b) dem. Vor menunjukkan lokasi tetap dan menjawab wo?, jadi memakai Dativ. Rathaus adalah neutral: das Rathaus menjadi dem Rathaus." },
  { id: "q19", level: "Mudah", title: "Tambahan Mudah 3. Der Bus hält an _____ Haltestelle.", correct: "a", options: [["a","der"],["b","die"],["c","den"],["d","dem"]], translation: "Bus berhenti di halte.", explanation: "Kunci: a) der. An der Haltestelle memakai Dativ karena menyatakan lokasi. Haltestelle adalah feminin, Dativ feminin memakai der." },
  { id: "q20", level: "Mudah", title: "Tambahan Mudah 4. Ich gehe in _____ Supermarkt. (Arah)", correct: "d", options: [["a","der"],["b","dem"],["c","das"],["d","den"]], translation: "Saya pergi ke supermarket.", explanation: "Kunci: d) den. In dengan arah/tujuan menjawab wohin? sehingga memakai Akkusativ. Supermarkt maskulin berubah dari der menjadi den." },
  { id: "q21", level: "Mudah", title: "Tambahan Mudah 5. Wir fahren mit _____ öffentlichen Verkehrsmitteln.", correct: "c", options: [["a","die"],["b","der"],["c","den"],["d","das"]], translation: "Kami pergi dengan transportasi umum.", explanation: "Kunci: c) den. Mit selalu Dativ. Verkehrsmittel di sini plural, sehingga Dativ plural memakai den dan kata sifat mendapat akhiran -en: den öffentlichen Verkehrsmitteln." },
  { id: "q22", level: "Mudah", title: "Tambahan Mudah 6. Ich habe _____ Ausweis dabei. (negatif)", correct: "b", options: [["a","nicht"],["b","keinen"],["c","kein"],["d","keine"]], translation: "Saya tidak membawa kartu identitas.", explanation: "Kunci: b) keinen. Ausweis adalah maskulin dan menjadi objek Akkusativ setelah haben. Negasi untuk kata benda memakai kein, sehingga der Ausweis menjadi keinen Ausweis." },
  { id: "q23", level: "Mudah", title: "Tambahan Mudah 7. Die Polizei hilft _____ Touristen.", correct: "a", options: [["a","dem"],["b","den"],["c","der"],["d","das"]], translation: "Polisi membantu turis itu.", explanation: "Kunci: a) dem. Kata kerja helfen selalu memakai Dativ. Tourist maskulin memiliki bentuk Dativ dem Touristen, dengan tambahan -en pada nomina lemah." },
  { id: "q24", level: "Mudah", title: "Tambahan Mudah 8. Bitte bringen Sie _____ Unterlagen mit.", correct: "d", options: [["a","Ihren"],["b","Ihr"],["c","Ihre(n)"],["d","Ihre"]], translation: "Silakan bawa dokumen Anda.", explanation: "Kunci: d) Ihre. Unterlagen adalah plural dan menjadi objek Akkusativ. Bentuk possessive formal untuk plural Akkusativ adalah Ihre Unterlagen." },
  { id: "q25", level: "Sedang", title: "Tambahan Sedang 1. Der Kunde _____ das Formular _____.", correct: "b", options: [["a","füllt / ein"],["b","füllt / aus"],["c","hebt / ab"],["d","gibt / mit"]], translation: "Nasabah mengisi formulir itu.", explanation: "Kunci: b) füllt / aus. Ausfüllen adalah trennbares Verb. Dalam kalimat utama Präsens, awalan aus berdiri di akhir: Der Kunde füllt das Formular aus." },
  { id: "q26", level: "Sedang", title: "Tambahan Sedang 2. Ich _____ den Antrag morgen beim Amt _____.", correct: "a", options: [["a","gebe / ab"],["b","gebe / aus"],["c","hebe / ab"],["d","fülle / mit"]], translation: "Saya menyerahkan permohonan itu besok di kantor pemerintahan.", explanation: "Kunci: a) gebe / ab. Abgeben berarti menyerahkan. Karena trennbares Verb, ab berada di akhir kalimat utama." },
  { id: "q27", level: "Sedang", title: "Tambahan Sedang 3. Können Sie mir sagen, wo die nächste Bank _____?", correct: "c", options: [["a","sein"],["b","ist sie"],["c","ist"],["d","gibt"]], translation: "Bisakah Anda memberi tahu saya di mana bank terdekat?", explanation: "Kunci: c) ist. Dalam indirekte Frage, verba terkonjugasi berada di akhir anak kalimat: wo die nächste Bank ist." },
  { id: "q28", level: "Sedang", title: "Tambahan Sedang 4. Ich interessiere mich _____ die Stelle als Aushilfe.", correct: "b", options: [["a","um"],["b","für"],["c","mit"],["d","bei"]], translation: "Saya tertarik pada posisi sebagai pekerja bantuan.", explanation: "Kunci: b) für. Pola yang umum adalah sich interessieren für + Akkusativ. Jika memakai bewerben, polanya berbeda: sich bewerben um + Akkusativ." },
  { id: "q29", level: "Sedang", title: "Tambahan Sedang 5. Ich bewerbe mich _____ eine Stelle im Restaurant.", correct: "a", options: [["a","um"],["b","für"],["c","bei"],["d","mit"]], translation: "Saya melamar sebuah posisi di restoran.", explanation: "Kunci: a) um. Sich bewerben memakai pola sich bewerben um + Akkusativ untuk posisi yang dilamar." },
  { id: "q30", level: "Sedang", title: "Tambahan Sedang 6. Die Beamtin erklärt _____ den Antrag.", correct: "d", options: [["a","ich"],["b","mich"],["c","mein"],["d","mir"]], translation: "Pegawai negeri perempuan menjelaskan permohonan itu kepada saya.", explanation: "Kunci: d) mir. Erklären dapat punya penerima Dativ dan objek Akkusativ. Mir adalah Dativ penerima, den Antrag adalah Akkusativ." },
  { id: "q31", level: "Sedang", title: "Tambahan Sedang 7. Ohne _____ kann ich kein Konto eröffnen.", correct: "c", options: [["a","dem Ausweis"],["b","der Ausweis"],["c","den Ausweis"],["d","die Ausweis"]], translation: "Tanpa kartu identitas itu saya tidak bisa membuka rekening.", explanation: "Kunci: c) den Ausweis. Ohne selalu Akkusativ. Ausweis maskulin berubah dari der menjadi den." },
  { id: "q32", level: "Sedang", title: "Tambahan Sedang 8. Die Müllabfuhr _____ die Mülltonnen.", correct: "b", options: [["a","pflegt"],["b","leert"],["c","beantragt"],["d","leiht"]], translation: "Petugas pengangkutan sampah mengosongkan tong sampah.", explanation: "Kunci: b) leert. Leeren berarti mengosongkan. Mülltonnen adalah objek Akkusativ plural; bentuk artikel die tetap die." },
  { id: "q33", level: "Sedang", title: "Tambahan Sedang 9. Der Fahrer fährt _____ Bus durch die Stadt.", correct: "a", options: [["a","den"],["b","dem"],["c","der"],["d","das"]], translation: "Pengemudi mengendarai bus melewati kota.", explanation: "Kunci: a) den. Bus maskulin sebagai objek langsung memakai Akkusativ: den Bus." },
  { id: "q34", level: "Sedang", title: "Tambahan Sedang 10. Wir treffen uns _____ Bahnhof.", correct: "c", options: [["a","in den"],["b","auf den"],["c","am"],["d","über die"]], translation: "Kita bertemu di stasiun.", explanation: "Kunci: c) am. Am adalah gabungan an + dem dan dipakai untuk lokasi di titik tertentu. Bahnhof maskulin dalam Dativ menjadi dem Bahnhof." },
  { id: "q35", level: "Sedang", title: "Tambahan Sedang 11. Ich möchte eine Überweisung _____.", correct: "d", options: [["a","melden"],["b","servieren"],["c","beschützen"],["d","machen"]], translation: "Saya ingin melakukan transfer.", explanation: "Kunci: d) machen. Eine Überweisung machen adalah ungkapan umum untuk melakukan transfer bank. Melden dipakai untuk melapor, servieren untuk menyajikan, beschützen untuk melindungi." },
  { id: "q36", level: "Sedang", title: "Tambahan Sedang 12. Der Arbeitgeber lädt mich _____ Vorstellungsgespräch ein.", correct: "b", options: [["a","im"],["b","zum"],["c","beim"],["d","vom"]], translation: "Pemberi kerja mengundang saya ke wawancara kerja.", explanation: "Kunci: b) zum. Einladen zu + Dativ berarti mengundang ke suatu acara. Zum adalah zu + dem, cocok untuk das Vorstellungsgespräch." },
  { id: "q37", level: "Sulit", title: "Tambahan Sulit 1. Welche Form ist richtig?", correct: "a", options: [["a","Ich weiß nicht, welche Dokumente ich brauche."],["b","Ich weiß nicht, welche Dokumente brauche ich."],["c","Ich weiß nicht, brauche ich welche Dokumente."],["d","Ich weiß nicht, ich brauche welche Dokumente."]], translation: "Saya tidak tahu dokumen apa yang saya butuhkan.", explanation: "Kunci: a. Dalam Nebensatz/indirekte Frage, verba terkonjugasi berada di akhir: welche Dokumente ich brauche." },
  { id: "q38", level: "Sulit", title: "Tambahan Sulit 2. Der Tourist geht _____ Dom, aber er wartet _____ Dom.", correct: "d", options: [["a","in den / in den"],["b","im / in den"],["c","im / im"],["d","in den / im"]], translation: "Turis itu pergi ke katedral, tetapi ia menunggu di katedral.", explanation: "Kunci: d) in den / im. Gerakan ke tujuan memakai Akkusativ: in den Dom. Lokasi tetap memakai Dativ: im Dom." },
  { id: "q39", level: "Sulit", title: "Tambahan Sulit 3. Ich habe das Formular gestern _____.", correct: "c", options: [["a","ausfüllen"],["b","ausgefüllen"],["c","ausgefüllt"],["d","gefüllt aus"]], translation: "Saya sudah mengisi formulir itu kemarin.", explanation: "Kunci: c) ausgefüllt. Perfekt dari ausfüllen adalah hat/habe ausgefüllt. Pada verba pisah, ge muncul di antara awalan dan verba dasar: aus-ge-füllt." },
  { id: "q40", level: "Sulit", title: "Tambahan Sulit 4. Sie hat gestern Geld vom Konto _____.", correct: "a", options: [["a","abgehoben"],["b","geabhebt"],["c","abgehebt"],["d","abheben"]], translation: "Dia sudah menarik uang dari rekening kemarin.", explanation: "Kunci: a) abgehoben. Abheben memiliki Partizip II abgehoben. Bentuk ini tidak menjadi abgehebt karena stem-nya berubah: heben - gehoben." },
  { id: "q41", level: "Sulit", title: "Tambahan Sulit 5. Wählen Sie die natürlichste formale Bitte.", correct: "b", options: [["a","Gib mir das Formular!"],["b","Könnten Sie mir bitte das Formular geben?"],["c","Du musst mir das Formular geben."],["d","Ich will das Formular."]], translation: "Pilih permintaan formal yang paling natural.", explanation: "Kunci: b. Untuk situasi formal di bank/Behörde, bentuk Konjunktiv II dengan Sie paling sopan: Könnten Sie mir bitte ...?" },
  { id: "q42", level: "Sulit", title: "Tambahan Sulit 6. Die Touristin macht ein Foto _____ Parlament.", correct: "c", options: [["a","von der"],["b","von den"],["c","vom"],["d","über dem"]], translation: "Turis perempuan itu mengambil foto parlemen.", explanation: "Kunci: c) vom. Von selalu Dativ. Parlament adalah neutral, sehingga von + dem menjadi vom." },
  { id: "q43", level: "Sulit", title: "Tambahan Sulit 7. Welche Satzanalyse ist richtig: Die Beamtin gibt dem Mann das Formular.", correct: "a", options: [["a","die Beamtin = Nominativ, dem Mann = Dativ, das Formular = Akkusativ"],["b","die Beamtin = Akkusativ, dem Mann = Nominativ, das Formular = Dativ"],["c","die Beamtin = Dativ, dem Mann = Akkusativ, das Formular = Nominativ"],["d","Semua bagian memakai Nominativ."]], translation: "Pegawai negeri perempuan memberi formulir itu kepada pria tersebut.", explanation: "Kunci: a. Subjek adalah die Beamtin (Nominativ). Penerima adalah dem Mann (Dativ). Benda yang diberikan adalah das Formular (Akkusativ)." },
  { id: "q44", level: "Sulit", title: "Tambahan Sulit 8. Das Parlament beschließt _____ neues Gesetz.", correct: "d", options: [["a","einen"],["b","eine"],["c","einem"],["d","ein"]], translation: "Parlemen menetapkan sebuah undang-undang baru.", explanation: "Kunci: d) ein. Gesetz adalah neutral dan menjadi objek Akkusativ. Artikel tidak tentu neutral Akkusativ tetap ein; adjektif neues memakai -es." },
  { id: "q45", level: "Sulit", title: "Tambahan Sulit 9. Saya ingin bertanya dokumen apa yang saya butuhkan.", correct: "b", options: [["a","Ich möchte fragen, welche Dokumente brauche ich."],["b","Ich möchte fragen, welche Dokumente ich brauche."],["c","Ich möchte fragen, ich brauche welche Dokumente."],["d","Ich möchte fragen, welche ich Dokumente brauche."]], translation: "Ich möchte fragen, welche Dokumente ich brauche.", explanation: "Kunci: b. Setelah welche Dokumente dalam anak kalimat, subjek ich tetap sebelum verba, dan verba brauche berada di akhir." },
  { id: "q46", level: "Sulit", title: "Tambahan Sulit 10. Ich _____ mich um die Sicherheit in der Stadt.", correct: "c", options: [["a","bewerbe"],["b","melde"],["c","kümmere"],["d","frage"]], translation: "Saya mengurus keamanan di kota.", explanation: "Kunci: c) kümmere. Polanya sich kümmern um + Akkusativ. Untuk ich, verba menjadi kümmere dan reflexive pronoun-nya mich." },
  { id: "q47", level: "Sulit", title: "Tambahan Sulit 11. Der Antrag ist nicht vollständig, weil die Unterschrift _____.", correct: "a", options: [["a","fehlt"],["b","fällt"],["c","fährt"],["d","füllt"]], translation: "Permohonan itu tidak lengkap karena tanda tangan tidak ada.", explanation: "Kunci: a) fehlt. Fehlen berarti kurang/tidak ada. Subjek anak kalimat adalah die Unterschrift, sehingga verba konjugasi orang ketiga singular: fehlt." },
  { id: "q48", level: "Sulit", title: "Tambahan Sulit 12. Wir sprechen _____ die Stadt und gehen später _____ Marktplatz.", correct: "d", options: [["a","über der / auf dem"],["b","über dem / auf dem"],["c","über die / auf dem"],["d","über die / auf den"]], translation: "Kami berbicara tentang kota dan nanti pergi ke alun-alun.", explanation: "Kunci: d) über die / auf den. Über sebagai topik biasanya memakai Akkusativ. Gehen auf den Marktplatz menunjukkan arah, sehingga auf + Akkusativ maskulin: auf den Marktplatz." },
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
  ["Sie möchten Geld von Ihrem Konto bekommen.", "Geld abheben"],
  ["Sie möchten Geld auf Ihr Konto bringen.", "Geld einzahlen"],
  ["Sie möchten Geld an eine andere Person schicken.", "einen Betrag überweisen"],
  ["Ihre Bankkarte ist weg.", "die Bankkarte sperren lassen"],
  ["Sie verstehen den Antrag nicht.", "um Hilfe bitten / nach dem Formular fragen"],
  ["Sie möchten am Wochenende als Aushilfe arbeiten.", "sich um die Stelle bewerben"],
  ["Der Arbeitgeber möchte Ihre Dokumente sehen.", "die Unterlagen mitbringen"],
  ["Die Mülltonne ist voll.", "die Müllabfuhr leert die Mülltonne"],
  ["Ein Tourist findet den Bahnhof nicht.", "nach dem Weg fragen"],
  ["Sie stehen vor dem Rathaus und suchen das Amt.", "Könnten Sie mir sagen, wo das Amt ist?"],
  ["Sie müssen das Visum länger gültig machen.", "das Visum verlängern"],
  ["Sie möchten eine formale Frage stellen.", "Könnten Sie mir bitte helfen?"],
  ["Sie möchten wissen, welche Dokumente nötig sind.", "fragen, welche Dokumente Sie brauchen"],
  ["Sie möchten eine Unterschrift auf den Antrag setzen.", "den Antrag unterschreiben"],
  ["Sie möchten den Antrag offiziell einreichen.", "den Antrag bei der Behörde abgeben"],
  ["Sie möchten Ihren Ausweis länger gültig machen.", "den Ausweis verlängern"],
  ["Sie sehen einen Diebstahl in der Stadt.", "den Diebstahl bei der Polizei melden"],
  ["Sie möchten zur Arbeit fahren und kein Auto benutzen.", "mit den öffentlichen Verkehrsmitteln fahren"],
];

type PracticeItem = {
  prompt: string;
  answer: string;
  explanation: string;
};

const grammarCaseDrills: PracticeItem[] = [
  { prompt: "Ich gehe in _____ Stadt. (wohin? feminin)", answer: "die", explanation: "Wohin? menunjukkan arah, jadi in memakai Akkusativ. Stadt feminin: die Stadt tetap die dalam Akkusativ." },
  { prompt: "Ich wohne in _____ Stadt. (wo? feminin)", answer: "der", explanation: "Wo? menunjukkan lokasi tetap, jadi in memakai Dativ. Stadt feminin: die menjadi der." },
  { prompt: "Das Auto steht auf _____ Parkplatz. (wo? maskulin)", answer: "dem", explanation: "Stehen menunjukkan posisi tetap. Auf + Dativ untuk lokasi: der Parkplatz menjadi dem Parkplatz." },
  { prompt: "Ich stelle das Auto auf _____ Parkplatz. (wohin? maskulin)", answer: "den", explanation: "Stellen menunjukkan perubahan lokasi/arah. Auf + Akkusativ: der Parkplatz menjadi den Parkplatz." },
  { prompt: "Wir warten vor _____ Rathaus. (wo? neutral)", answer: "dem", explanation: "Vor untuk lokasi memakai Dativ. Rathaus neutral: das Rathaus menjadi dem Rathaus." },
  { prompt: "Wir gehen über _____ Brücke. (gerakan melewati)", answer: "die", explanation: "Über untuk gerakan melewati biasanya Akkusativ. Brücke feminin tetap die." },
  { prompt: "Er fährt mit _____ Bus.", answer: "dem", explanation: "Mit selalu Dativ. Bus maskulin: der Bus menjadi dem Bus." },
  { prompt: "Sie geht ohne _____ Ausweis.", answer: "den", explanation: "Ohne selalu Akkusativ. Ausweis maskulin: der Ausweis menjadi den Ausweis." },
  { prompt: "Ich helfe _____ Touristin.", answer: "der", explanation: "Helfen selalu memakai Dativ. Touristin feminin: die Touristin menjadi der Touristin." },
  { prompt: "Der Beamte prüft _____ Antrag.", answer: "den", explanation: "Prüfen membutuhkan objek Akkusativ. Antrag maskulin: der Antrag menjadi den Antrag." },
  { prompt: "Die Aushilfe serviert _____ Gast eine Suppe.", answer: "dem", explanation: "Orang yang menerima sesuatu memakai Dativ. Gast maskulin: der Gast menjadi dem Gast." },
  { prompt: "Die Aushilfe serviert dem Gast _____ Suppe.", answer: "eine", explanation: "Benda yang disajikan adalah objek Akkusativ. Suppe feminin dengan artikel tidak tentu tetap eine." },
  { prompt: "Wir beantragen _____ Kredit.", answer: "einen", explanation: "Beantragen membutuhkan Akkusativ. Kredit maskulin dengan artikel tidak tentu menjadi einen Kredit." },
  { prompt: "Ich brauche _____ Dokument.", answer: "ein", explanation: "Brauchen membutuhkan Akkusativ. Dokument neutral dengan artikel tidak tentu tetap ein." },
  { prompt: "Sie spricht über _____ neues Gesetz.", answer: "ein", explanation: "Über untuk topik pembicaraan biasanya Akkusativ. Gesetz neutral Akkusativ memakai ein; adjektif neues membawa akhiran -es." },
  { prompt: "Wir fahren mit _____ öffentlichen Verkehrsmitteln.", answer: "den", explanation: "Mit selalu Dativ. Pada Dativ plural, artikel menjadi den dan kata benda plural sering mendapat -n jika belum berakhiran -n." },
  { prompt: "Der Tourist fragt nach _____ Weg.", answer: "dem", explanation: "Nach selalu Dativ. Weg maskulin: der Weg menjadi dem Weg." },
  { prompt: "Ich bewerbe mich um _____ Stelle.", answer: "eine", explanation: "Sich bewerben um memakai Akkusativ. Stelle feminin dengan artikel tidak tentu tetap eine." },
  { prompt: "Die Behörde kümmert sich um _____ Ordnung.", answer: "die", explanation: "Sich kümmern um memakai Akkusativ. Ordnung feminin tetap die dalam Akkusativ." },
  { prompt: "Ich habe keinen Termin bei _____ Behörde.", answer: "der", explanation: "Bei selalu Dativ. Behörde feminin: die Behörde menjadi der Behörde." },
  { prompt: "Könnten Sie _____ bitte helfen?", answer: "mir", explanation: "Helfen membutuhkan Dativ. Untuk ich, bentuk Dativ adalah mir." },
  { prompt: "Könnten Sie _____ bitte den Weg zeigen?", answer: "mir", explanation: "Orang yang menerima informasi memakai Dativ: mir. Den Weg adalah Akkusativ sebagai objek yang ditunjukkan." },
  { prompt: "Bitte bringen Sie _____ Ausweis mit.", answer: "Ihren", explanation: "Ausweis maskulin sebagai objek Akkusativ. Possessiv formal Ihr menjadi Ihren." },
  { prompt: "Ich gebe _____ Unterlagen am Schalter ab.", answer: "die", explanation: "Unterlagen plural sebagai objek Akkusativ. Artikel tertentu plural tetap die." },
];

const contextualCases: PracticeItem[] = [
  { prompt: "Bank: Anda ingin membuka rekening, tetapi belum tahu formulir mana yang harus diisi.", answer: "Guten Tag. Ich möchte ein Konto eröffnen. Könnten Sie mir bitte sagen, welches Formular ich ausfüllen muss?", explanation: "Gunakan möchte + infinitiv untuk keinginan sopan. Indirekte Frage memakai verba di akhir: welches Formular ich ausfüllen muss. Ausfüllen muncul sebagai infinitiv karena ada modalverb muss." },
  { prompt: "Bank: Anda ingin menarik uang dari rekening.", answer: "Ich möchte Geld von meinem Konto abheben.", explanation: "Geld abheben adalah verba pisah. Karena ada möchte, verba utama kembali menjadi infinitiv di akhir: abheben. Von selalu Dativ: von meinem Konto." },
  { prompt: "Bank: Anda ingin mentransfer sejumlah uang hari ini.", answer: "Ich möchte den Betrag heute überweisen.", explanation: "Überweisen membutuhkan objek Akkusativ. Betrag maskulin menjadi den Betrag. Heute adalah keterangan waktu yang fleksibel posisinya." },
  { prompt: "Behörde: Visa Anda hampir habis masa berlakunya.", answer: "Mein Visum ist nur noch einen Monat gültig. Ich möchte das Visum verlängern.", explanation: "Gültig berarti berlaku/valid. Verlängern membutuhkan objek Akkusativ; Visum neutral tetap das Visum." },
  { prompt: "Behörde: Anda ingin menyerahkan permohonan di loket.", answer: "Ich gebe den Antrag am Schalter ab.", explanation: "Abgeben adalah verba pisah, jadi ab berada di akhir. Antrag maskulin sebagai objek Akkusativ menjadi den Antrag." },
  { prompt: "Behörde: Anda tidak membawa kartu identitas.", answer: "Ich habe meinen Ausweis nicht dabei.", explanation: "Haben membutuhkan Akkusativ. Ausweis maskulin dengan possessive mein menjadi meinen Ausweis. Nicht menyangkal frasa dabei dalam konteks ini." },
  { prompt: "Polisi: Dompet Anda hilang dan Anda ingin melapor.", answer: "Meine Geldbörse ist weg. Ich möchte den Diebstahl melden.", explanation: "Weg sein berarti hilang/tidak ada. Melden membutuhkan objek Akkusativ; Diebstahl maskulin menjadi den Diebstahl." },
  { prompt: "Polisi: Anda ingin meminta bantuan secara formal.", answer: "Könnten Sie mir bitte helfen?", explanation: "Könnten Sie adalah Konjunktiv II untuk permintaan formal. Helfen membutuhkan Dativ, jadi ich menjadi mir." },
  { prompt: "Kota: Anda bertanya halte terdekat di mana.", answer: "Könnten Sie mir bitte sagen, wo die nächste Haltestelle ist?", explanation: "Ini indirekte Frage. Dalam anak kalimat, verba ist diletakkan di akhir. Haltestelle feminin menjadi subjek Nominativ: die nächste Haltestelle." },
  { prompt: "Kota: Anda sedang berada di depan balai kota.", answer: "Ich stehe vor dem Rathaus.", explanation: "Stehen menunjukkan posisi tetap. Vor + Dativ untuk lokasi; Rathaus neutral menjadi dem Rathaus." },
  { prompt: "Kota: Anda pergi ke supermarket setelah kerja.", answer: "Nach der Arbeit gehe ich in den Supermarkt.", explanation: "Nach untuk waktu/urutan memakai Dativ: nach der Arbeit. In den Supermarkt memakai Akkusativ karena menunjukkan arah." },
  { prompt: "Kota: Anda naik transportasi umum ke kantor.", answer: "Ich fahre mit den öffentlichen Verkehrsmitteln zum Amt.", explanation: "Mit selalu Dativ; Dativ plural menjadi den öffentlichen Verkehrsmitteln. Zum adalah zu + dem untuk das Amt." },
  { prompt: "Pekerjaan: Anda melamar posisi sebagai Aushilfe.", answer: "Ich bewerbe mich um die Stelle als Aushilfe.", explanation: "Sich bewerben membutuhkan reflexive pronoun. Untuk ich: mich. Polanya um + Akkusativ; Stelle feminin tetap die." },
  { prompt: "Pekerjaan: Anda menulis bahwa punya pengalaman di restoran.", answer: "Ich habe Erfahrung im Restaurant.", explanation: "Erfahrung sering dipakai singular tanpa artikel untuk pengalaman umum. Im adalah in dem dan dipakai untuk lokasi: im Restaurant." },
  { prompt: "Pekerjaan: Pemberi kerja mengundang Anda ke wawancara.", answer: "Der Arbeitgeber lädt mich zum Vorstellungsgespräch ein.", explanation: "Einladen adalah verba pisah: lädt ... ein. Zu + Dativ menjadi zum untuk das Vorstellungsgespräch." },
  { prompt: "Restoran: Anda menyajikan sup kepada tamu.", answer: "Ich serviere dem Gast eine Suppe.", explanation: "Penerima memakai Dativ: dem Gast. Benda yang diberikan/disajikan memakai Akkusativ: eine Suppe." },
  { prompt: "Restoran: Anda melayani para tamu.", answer: "Ich bediene die Gäste.", explanation: "Bedienen membutuhkan objek Akkusativ. Gäste plural dengan artikel tertentu tetap die." },
  { prompt: "Landeskunde: Anda menjelaskan gedung parlemen.", answer: "Das Parlament ist ein wichtiges Gebäude in Wien.", explanation: "Parlament adalah subjek Nominativ neutral. Ein wichtiges Gebäude: setelah artikel tidak tentu neutral, kata sifat memakai -es." },
  { prompt: "Landeskunde: Anda mengatakan banyak pengunjung berdiri di depan parlemen.", answer: "Vor dem Parlament stehen viele Besucher.", explanation: "Vor + Dativ untuk lokasi: dem Parlament. Viele Besucher adalah subjek plural, sehingga verba stehen berbentuk plural." },
  { prompt: "Ungkapan: Anda ingin meminta bantuan kecil.", answer: "Darf ich dich um einen Gefallen bitten?", explanation: "Bitten um memakai Akkusativ. Gefallen maskulin dengan artikel tidak tentu menjadi einen Gefallen. Dich dipakai jika lawan bicara informal." },
];

const sentenceAnalyses = [
  ["Die Beamtin gibt dem Mann das Formular.", "Pegawai negeri perempuan memberi formulir itu kepada pria tersebut.", "Nominativ + Dativ + Akkusativ", "Die Beamtin adalah subjek. Dem Mann adalah penerima Dativ. Das Formular adalah objek langsung Akkusativ."],
  ["Könnten Sie mir bitte sagen, wo der Bahnhof ist?", "Bisakah Anda memberi tahu saya di mana stasiun?", "Indirekte Frage", "Kalimat utama memakai Könnten Sie untuk sopan. Anak kalimat wo der Bahnhof ist menaruh verba ist di akhir."],
  ["Ich möchte ein Konto eröffnen.", "Saya ingin membuka rekening.", "Modalähnliche Struktur möchte + Infinitiv", "Möchte berada di posisi kedua, sedangkan infinitiv eröffnen diletakkan di akhir. Konto neutral menjadi ein Konto."],
  ["Ohne den Ausweis kann ich den Antrag nicht abgeben.", "Tanpa kartu identitas itu saya tidak bisa menyerahkan permohonan.", "Ohne + Akkusativ dan trennbares Verb", "Ohne selalu Akkusativ: den Ausweis. Abgeben adalah verba pisah; karena ada kann, bentuk infinitiv abgeben berada di akhir."],
  ["Ich fahre mit den öffentlichen Verkehrsmitteln zur Arbeit.", "Saya pergi kerja dengan transportasi umum.", "Mit + Dativ", "Mit selalu Dativ. Verkehrsmitteln adalah Dativ plural dengan artikel den dan adjektif öffentlichen."],
  ["Der Arbeitgeber lädt mich zum Vorstellungsgespräch ein.", "Pemberi kerja mengundang saya ke wawancara kerja.", "Trennbares Verb dan zu + Dativ", "Einladen berpisah menjadi lädt ... ein. Zum adalah zu + dem untuk kata neutral das Vorstellungsgespräch."],
  ["Ich bewerbe mich um eine Stelle als Aushilfe.", "Saya melamar posisi sebagai pekerja bantuan.", "Reflexiv dan um + Akkusativ", "Sich bewerben membutuhkan mich untuk ich. Um eine Stelle memakai Akkusativ karena pola verba ini."],
  ["Die Polizei hilft dem Touristen.", "Polisi membantu turis itu.", "Helfen + Dativ", "Helfen selalu Dativ. Der Tourist menjadi dem Touristen karena termasuk maskulin lemah dengan tambahan -en."],
  ["Der Tourist fragt nach dem Weg.", "Turis itu bertanya tentang jalan/rute.", "Nach + Dativ", "Nach adalah preposisi Dativ. Der Weg menjadi dem Weg."],
  ["Ich habe das Formular ausgefüllt.", "Saya sudah mengisi formulir itu.", "Perfekt verba pisah", "Ausfüllen menjadi ausgefüllt. Ge berada di antara awalan aus dan bentuk dasar füllt."],
  ["Sie hat Geld vom Konto abgehoben.", "Dia sudah menarik uang dari rekening.", "Perfekt dan von + Dativ", "Vom adalah von + dem. Abheben memiliki Partizip II abgehoben."],
  ["Ich weiß nicht, welche Dokumente ich brauche.", "Saya tidak tahu dokumen apa yang saya butuhkan.", "Nebensatz", "Setelah welche Dokumente, subjek ich muncul sebelum verba. Verba brauche berada di akhir anak kalimat."],
];

const translationExercises: PracticeItem[] = [
  { prompt: "Saya harus mengisi formulir itu.", answer: "Ich muss das Formular ausfüllen.", explanation: "Muss adalah modalverb, sehingga verba utama ausfüllen berada sebagai infinitiv di akhir. Das Formular adalah Akkusativ neutral." },
  { prompt: "Bisakah Anda membantu saya?", answer: "Könnten Sie mir bitte helfen?", explanation: "Könnten Sie adalah bentuk formal sopan. Helfen memakai Dativ, jadi ich berubah menjadi mir." },
  { prompt: "Saya pergi ke kantor pemerintahan tanpa kartu identitas.", answer: "Ich gehe ohne den Ausweis zur Behörde.", explanation: "Ohne selalu Akkusativ: den Ausweis. Zur adalah zu + der karena Behörde feminin dalam Dativ." },
  { prompt: "Di kota ada banyak museum.", answer: "In der Stadt gibt es viele Museen.", explanation: "In der Stadt memakai Dativ untuk lokasi. Gibt es diikuti Akkusativ; viele Museen sebagai objek plural." },
  { prompt: "Kami bertemu di stasiun.", answer: "Wir treffen uns am Bahnhof.", explanation: "Am adalah an + dem. Bahnhof maskulin memakai Dativ karena menunjukkan lokasi pertemuan." },
  { prompt: "Saya melamar posisi itu.", answer: "Ich bewerbe mich um die Stelle.", explanation: "Sich bewerben memakai reflexive pronoun mich untuk ich dan pola um + Akkusativ." },
  { prompt: "Pegawai negeri memeriksa data saya.", answer: "Der Beamte prüft meine Angaben.", explanation: "Prüfen membutuhkan Akkusativ. Angaben plural sebagai objek langsung tetap meine Angaben." },
  { prompt: "Saya ingin membuka rekening.", answer: "Ich möchte ein Konto eröffnen.", explanation: "Möchte membuat kalimat lebih sopan. Infinitiv eröffnen ditempatkan di akhir." },
  { prompt: "Turis itu bertanya tentang jalan.", answer: "Der Tourist fragt nach dem Weg.", explanation: "Fragen nach memakai Dativ. Weg maskulin: der Weg menjadi dem Weg." },
  { prompt: "Saya harus melaporkan pencurian itu.", answer: "Ich muss den Diebstahl melden.", explanation: "Melden membutuhkan Akkusativ. Diebstahl maskulin berubah menjadi den Diebstahl." },
  { prompt: "Dompet saya hilang.", answer: "Meine Geldbörse ist weg.", explanation: "Geldbörse feminin menjadi meine Geldbörse sebagai subjek Nominativ. Weg sein berarti hilang/tidak ada." },
  { prompt: "Saya bekerja paruh waktu.", answer: "Ich arbeite in Teilzeit.", explanation: "In Teilzeit adalah ungkapan tetap untuk jenis pekerjaan/jam kerja." },
  { prompt: "Dia menyajikan kopi kepada para tamu.", answer: "Sie serviert den Gästen Kaffee.", explanation: "Den Gästen adalah Dativ plural sebagai penerima. Kaffee adalah objek Akkusativ tanpa artikel." },
  { prompt: "Bisakah Anda menjelaskan bagaimana saya ke kantor?", answer: "Könnten Sie mir erklären, wie ich zum Amt komme?", explanation: "Indirekte Frage menaruh verba komme di akhir. Zum adalah zu + dem karena das Amt neutral." },
  { prompt: "Saya membawa dokumen saya.", answer: "Ich bringe meine Unterlagen mit.", explanation: "Mitbringen adalah verba pisah: bringe ... mit. Unterlagen plural sebagai objek Akkusativ." },
  { prompt: "Pemerintah kota mengurus ketertiban.", answer: "Die Stadt kümmert sich um die Ordnung.", explanation: "Sich kümmern um memakai reflexive pronoun sich untuk die Stadt dan um + Akkusativ." },
  { prompt: "Mobil itu berada di tempat parkir.", answer: "Das Auto steht auf dem Parkplatz.", explanation: "Stehen menyatakan lokasi tetap. Auf + Dativ: der Parkplatz menjadi dem Parkplatz." },
  { prompt: "Saya pergi ke diskotek pada akhir pekan.", answer: "Am Wochenende gehe ich in die Disco.", explanation: "Am Wochenende adalah keterangan waktu. In die Disco memakai Akkusativ karena menunjukkan arah/tujuan." },
  { prompt: "Parlemen menetapkan undang-undang baru.", answer: "Das Parlament beschließt ein neues Gesetz.", explanation: "Beschließen membutuhkan Akkusativ. Gesetz neutral dengan artikel tidak tentu tetap ein; adjektif neues mendapat -es." },
  { prompt: "Saya minta bantuan kecil kepadamu.", answer: "Ich bitte dich um einen Gefallen.", explanation: "Bitten um memakai Akkusativ. Gefallen maskulin menjadi einen Gefallen, dan dich adalah objek orang yang diminta secara informal." },
];
const formalEmailStructure = [
  ["Betreff", "Termin beim Amt / Frage zur Stellenanzeige", "Tulis tema singkat dan jelas."],
  ["Anrede", "Sehr geehrte Damen und Herren, / Sehr geehrte Frau Müller,", "Sapaan formal. Setelah koma, kalimat berikutnya mulai huruf kecil."],
  ["Grund", "ich schreibe Ihnen, weil ich ...", "Jelaskan alasan menulis email."],
  ["Bitte", "Könnten Sie mir bitte sagen, ...?", "Gunakan bentuk sopan dengan Könnten Sie atau Könnte ich."],
  ["Details", "Ich möchte ... / Ich brauche ... / Ich muss ...", "Masukkan kosakata Kapitel 5: Antrag, Formular, Ausweis, Konto, Visum."],
  ["Dank", "Vielen Dank im Voraus.", "Penutup isi email sebelum salam akhir."],
  ["Gruß", "Mit freundlichen Grüßen", "Salam penutup formal."],
];
const formalEmailPhrases = [
  ["Termin", "Könnte ich bitte einen Termin bekommen?", "Bisakah saya mendapat janji temu?"],
  ["Dokumen", "Könnten Sie mir bitte sagen, welche Dokumente ich brauche?", "Bisakah Anda memberi tahu dokumen apa yang saya butuhkan?"],
  ["Formular", "Ich muss das Formular ausfüllen und unterschreiben.", "Saya harus mengisi dan menandatangani formulir."],
  ["Behörde", "Ich möchte den Antrag bei der Behörde abgeben.", "Saya ingin menyerahkan permohonan di kantor pemerintahan."],
  ["Bank", "Ich möchte ein Konto eröffnen und brauche einen Antrag.", "Saya ingin membuka rekening dan membutuhkan formulir permohonan."],
  ["Visum", "Mein Visum ist nur noch einen Monat gültig.", "Visa saya hanya berlaku satu bulan lagi."],
  ["Bewerbung", "Ich interessiere mich für die Stelle als Aushilfe.", "Saya tertarik pada posisi sebagai pekerja bantuan/part-time."],
];
const politeRequestPatterns = [
  ["Bantuan umum", "Könnten Sie mir bitte helfen?", "Bisakah Anda membantu saya?"],
  ["Izin bertanya", "Dürfte ich Sie etwas fragen?", "Bolehkah saya bertanya sesuatu?"],
  ["Meminta informasi", "Könnten Sie mir bitte sagen, wo die nächste Bank ist?", "Bisakah Anda memberi tahu di mana bank terdekat?"],
  ["Meminta penjelasan", "Könnten Sie mir erklären, wie ich zum Amt komme?", "Bisakah Anda menjelaskan bagaimana saya ke kantor pemerintahan?"],
  ["Meminta formulir", "Könnten Sie mir bitte das Formular geben?", "Bisakah Anda memberikan formulir itu kepada saya?"],
  ["Meminta pemeriksaan", "Wären Sie so freundlich, meine Angaben zu prüfen?", "Maukah Anda memeriksa data saya?"],
  ["Meminta janji", "Könnte ich bitte einen Termin haben?", "Bisakah saya mendapat janji temu?"],
];
const speakingSituations = [
  ["Bei der Bank", "Guten Tag. Ich möchte ein Konto eröffnen. Könnten Sie mir bitte sagen, welches Formular ich ausfüllen muss?", "Gerne. Bitte füllen Sie dieses Formular aus und bringen Sie Ihren Ausweis mit."],
  ["Bei der Behörde", "Guten Tag. Ich möchte mein Visum verlängern. Könnten Sie mir bitte sagen, welche Dokumente ich brauche?", "Natürlich. Sie brauchen den Antrag, Ihren Ausweis und ein gültiges Dokument."],
  ["Bei der Polizei", "Guten Tag. Meine Geldbörse ist weg. Ich möchte den Diebstahl melden. Könnten Sie mir bitte helfen?", "Ja, natürlich. Bitte geben Sie hier Ihre Angaben an."],
  ["In der Stadt", "Entschuldigung. Könnten Sie mir bitte sagen, wo die nächste Haltestelle ist?", "Ja. Gehen Sie geradeaus und dann links. Die Haltestelle ist vor dem Rathaus."],
];
const examWritingTasks = [
  "Sie möchten bei der Behörde einen Termin bekommen. Schreiben Sie eine formale E-Mail und fragen Sie nach den Dokumenten.",
  "Sie möchten ein Konto eröffnen. Schreiben Sie an die Bank und fragen Sie nach dem Formular und dem Ausweis.",
  "Sie interessieren sich für eine Stelle als Aushilfe. Schreiben Sie eine kurze formale E-Mail an den Arbeitgeber.",
];
const examSpeakingTasks = [
  "Bitten Sie im Amt höflich um Hilfe, weil Sie ein Formular nicht verstehen.",
  "Fragen Sie bei der Bank höflich, ob Sie Geld abheben oder eine Überweisung machen können.",
  "Sagen Sie der Polizei höflich, dass Ihre Geldbörse weg ist und Sie den Diebstahl melden möchten.",
];

function Section({ id, children }: { id?: string; children: React.ReactNode }) { return <section id={id} className="mb-7 scroll-mt-32 rounded-[22px] border border-[#dfeade] bg-white/95 p-8 shadow-[var(--shadow)] backdrop-blur max-[600px]:p-5">{children}</section>; }
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

function PracticeList({ items }: { items: PracticeItem[] }) {
  return <ol className="list-decimal space-y-4 pl-5 text-[#223326]">{items.map((item, index)=><li className="pl-1" key={`${item.prompt}-${index}`}><p className="font-bold">{item.prompt}</p><p className="mt-1 text-[#176126]"><strong>Jawaban:</strong> {item.answer}</p><p className="mt-1 text-sm text-[#445449]"><strong>Penjelasan gramatikal:</strong> {item.explanation}</p></li>)}</ol>;
}

function ExerciseSection({ onAnswer, showScore, onShowScore, scoreText }: { onAnswer: (id: string, ok: boolean) => void; showScore: boolean; onShowScore: () => void; scoreText: string }) {
  return <Section id="exercises"><H2>9. ✏️ Latihan Soal — Übungen</H2><p className="mb-4 text-[#445449]">Bagian ini berisi latihan tambahan yang banyak: pilihan ganda, kasus situasi sehari-hari, analisis gramatikal, dan latihan terjemahan. Fokusnya tetap Kapitel 5: kota, bank, Behörde, pekerjaan, kasus Akkusativ/Dativ, kata sifat, verba pisah, dan kalimat sopan.</p>{quizGroups.map((group)=><div key={group.level}><H3>{group.title}</H3><p className="mb-2 text-[#647268]">{group.intro}</p>{quizzes.filter((quiz)=>quiz.level===group.level).map(q=><Quiz key={q.id} quiz={q} onAnswer={onAnswer}/>)}</div>)}<H3>Übung 4: Was machen Sie in dieser Situation?</H3><Box title="Lengkapi dengan ungkapan yang sesuai">{situationExercises.map(([situation, answer], index)=><div className="border-t border-[#d8e5d5] py-3 first:border-t-0" key={situation}><p className="font-bold text-[#223326]">{index + 1}. {situation}</p><p className="mt-1 text-[#176126]"><strong>Antwort:</strong> {answer}</p></div>)}</Box><H3>Übung 5: Kasus Grammar — Akkusativ, Dativ, dan Artikel</H3><Box title="Isi bagian kosong dan baca pembahasannya"><PracticeList items={grammarCaseDrills}/></Box><H3>Übung 6: Kasus Situasi — Bank, Behörde, Stadt, Arbeit</H3><Box title="Gunakan redemittel yang tepat untuk setiap situasi"><PracticeList items={contextualCases}/></Box><H3>Übung 7: Analisis Kalimat</H3><Box title="Bedah fungsi kata dan struktur kalimat"><DataTable headers={["Kalimat", "Arti", "Fokus", "Penjelasan gramatikal"]} rows={sentenceAnalyses}/></Box><H3>Übung 8: Terjemahkan ke Bahasa Jerman</H3><Box title="Latihan produksi kalimat dari materi Kapitel 5"><PracticeList items={translationExercises}/></Box><div className="mt-6 text-center"><button className="inline-block cursor-pointer rounded-lg border-0 bg-[#2e7d32] px-8 py-3 text-[1.1em] text-white hover:bg-[#1b5e20]" onClick={onShowScore}>📊 Lihat Skor Total Pilihan Ganda</button>{showScore && <div className="mt-4 text-[1.3em] font-bold text-[#2e7d32]">{scoreText}</div>}</div></Section>;
}

function ExamPrepSection() {
  return <Section id="exam-prep"><H2>5. 📝 Materi Khusus Ujian: Schreiben & Sprechen</H2><p className="text-[#445449]">Fokus bagian ini adalah dua tugas yang sering keluar: menulis E-Mail formal dan berbicara dengan permintaan sopan. Semua contoh memakai Wortschatz Kapitel 5 seperti <em>die Behörde</em>, <em>das Formular</em>, <em>der Ausweis</em>, <em>der Antrag</em>, <em>das Konto</em>, <em>das Visum</em>, dan <em>um einen Gefallen bitten</em>.</p><H3>A. Schreiben: E-Mail formal</H3><Box title="Rumus cepat E-Mail formal"><DataTable headers={["Bagian", "Redemittel", "Fungsi"]} rows={formalEmailStructure}/></Box><Tip><strong>Pola aman untuk ujian:</strong> sapaan formal + alasan menulis + permintaan sopan + detail Kapitel 5 + terima kasih + salam penutup. Gunakan <em>Sie/Ihnen/Ihre</em> untuk formal, bukan <em>du/dir/deine</em>.</Tip><Box title="Wortschatz siap pakai untuk Schreiben"><DataTable headers={["Tema", "Kalimat", "Arti"]} rows={formalEmailPhrases}/></Box><H3>Contoh 1: E-Mail ke Behörde</H3><div className="my-3 rounded-xl border border-[#d8e5d5] bg-white px-5 py-4 text-[#223326]"><p className="font-black text-[#176126]">Betreff: Termin zur Visumverlängerung</p><p className="mt-3">Sehr geehrte Damen und Herren,</p><p className="mt-3">ich schreibe Ihnen, weil ich mein Visum verlängern möchte. Mein Visum ist nur noch einen Monat gültig. Könnten Sie mir bitte sagen, welche Dokumente ich brauche?</p><p className="mt-3">Ich habe meinen Ausweis und das Formular dabei. Könnte ich bitte nächste Woche einen Termin bekommen?</p><p className="mt-3">Vielen Dank im Voraus.</p><p className="mt-3">Mit freundlichen Grüßen<br/>[Name]</p></div><H3>Contoh 2: E-Mail ke Bank</H3><div className="my-3 rounded-xl border border-[#d8e5d5] bg-white px-5 py-4 text-[#223326]"><p className="font-black text-[#176126]">Betreff: Konto eröffnen</p><p className="mt-3">Sehr geehrte Damen und Herren,</p><p className="mt-3">ich möchte ein Konto eröffnen. Könnten Sie mir bitte erklären, welches Formular ich ausfüllen muss?</p><p className="mt-3">Ich habe meinen Ausweis dabei. Brauche ich noch ein anderes Dokument oder einen Antrag?</p><p className="mt-3">Vielen Dank für Ihre Hilfe.</p><p className="mt-3">Mit freundlichen Grüßen<br/>[Name]</p></div><H3>Checklist Schreiben sebelum dikumpulkan</H3><Box title="Cek 6 hal ini"><ol className="list-decimal space-y-2 pl-5 text-[#223326]"><li>Ada <strong>Betreff</strong> yang singkat.</li><li>Sapaan formal benar: <strong>Sehr geehrte Damen und Herren,</strong></li><li>Isi punya alasan: <strong>ich schreibe Ihnen, weil...</strong></li><li>Permintaan sopan memakai <strong>Könnten Sie...</strong> atau <strong>Könnte ich...</strong></li><li>Ada minimal 3 kosakata Kapitel 5, misalnya <em>Formular, Ausweis, Antrag</em>.</li><li>Penutup formal: <strong>Mit freundlichen Grüßen</strong></li></ol></Box><H3>B. Sprechen: permintaan yang sopan</H3><Box title="Pola kalimat untuk höflich bitten"><DataTable headers={["Situasi", "Kalimat", "Arti"]} rows={politeRequestPatterns}/></Box><Tip><strong>Formula 3 langkah untuk Sprechen:</strong> mulai dengan <em>Entschuldigung / Guten Tag</em>, sebutkan masalah dengan singkat, lalu pakai permintaan sopan. Contoh: <em>Entschuldigung, ich brauche Hilfe. Könnten Sie mir bitte das Formular geben?</em></Tip><H3>Dialog pendek untuk latihan</H3><div className="grid gap-4 md:grid-cols-2">{speakingSituations.map(([title, personA, personB])=><div className="rounded-xl border border-[#d8e5d5] bg-white px-5 py-4 text-[#223326]" key={title}><p className="font-black text-[#176126]">{title}</p><p className="mt-3"><strong>Person A:</strong> {personA}</p><p className="mt-2"><strong>Person B:</strong> {personB}</p></div>)}</div><H3>Simulasi soal ujian</H3><Box title="Schreiben: pilih 1 dan tulis 6-8 kalimat"><ol className="list-decimal space-y-2 pl-5 text-[#223326]">{examWritingTasks.map((task)=><li key={task}>{task}</li>)}</ol></Box><Box title="Sprechen: jawab dengan 2-3 kalimat sopan"><ol className="list-decimal space-y-2 pl-5 text-[#223326]">{examSpeakingTasks.map((task)=><li key={task}>{task}</li>)}</ol></Box></Section>;
}

function getFlashcardDetail(card: string[]): GermanCardDetail {
  const [term, info, meaning] = card;
  if (flashcardExamples[term]) return flashcardExamples[term];
  if (contextualFlashcardExamples[term]) return contextualFlashcardExamples[term];

  const formHint = info === "-" ? "Fokus kartu ini adalah arti dan pemakaian dasar ungkapan." : info === "Sg." ? "Kata ini biasanya dipakai dalam bentuk singular." : info === "Pl." ? "Kata ini biasanya dipakai dalam bentuk plural." : info.startsWith("hat ") ? `Bentuk Perfekt yang perlu diingat: ${info}.` : `Bentuk tambahan/plural yang perlu diingat: ${info}.`;
  const isNoun = /^(der|die|das|der\/die)\s/.test(term);

  return {
    example: isNoun ? `${term} ist im Thema Leben in der Stadt wichtig.` : `In dieser Situation passt der Ausdruck: ${term}.`,
    translation: isNoun ? `${meaning} penting dalam tema hidup di kota.` : `Dalam situasi ini ungkapan yang cocok adalah: ${meaning}.`,
    explanation: `${term} berarti "${meaning}". ${formHint}`,
  };
}

function Flashcards({ direction }: { direction: FlashcardDirection }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cardButtonRef = useRef<HTMLButtonElement | null>(null);
  const dragStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const dragDistance = useRef({ x: 0, y: 0 });
  const gestureMode = useRef<"idle" | "horizontal" | "vertical">("idle");
  const animationTimer = useRef<number | null>(null);
  const clickGuardTimer = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionMs, setTransitionMs] = useState(0);
  const card = flashcards[index];
  const [term, info, meaning] = card;
  const detail = getFlashcardDetail(card);
  const isGermanToIndonesian = direction === "de-id";
  const frontLabel = isGermanToIndonesian ? "Deutsch" : "Indonesia";
  const backLabel = isGermanToIndonesian ? "Arti + Contoh" : "Deutsch";
  const frontText = isGermanToIndonesian ? term : meaning;
  const backText = isGermanToIndonesian ? meaning : term;
  const totalCards = flashcards.length;
  const isFirstCard = index === 0;
  const isLastCard = index === totalCards - 1;
  const dragProgress = Math.min(Math.abs(dragOffset) / 360, 1);
  const cardStyle = {
    opacity: 1 - dragProgress * 0.16,
    transform: `translate3d(${dragOffset}px, 0, 0) rotate(${dragOffset / 34}deg)`,
    transition: isDragging || transitionMs === 0 ? "none" : `transform ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${transitionMs}ms ease`,
  };

  useEffect(() => {
    return () => {
      if (animationTimer.current !== null) window.clearTimeout(animationTimer.current);
      if (clickGuardTimer.current !== null) window.clearTimeout(clickGuardTimer.current);
    };
  }, []);

  const clearAnimationTimer = () => {
    if (animationTimer.current !== null) {
      window.clearTimeout(animationTimer.current);
      animationTimer.current = null;
    }
  };
  const markSuppressClick = () => {
    suppressClick.current = true;
    if (clickGuardTimer.current !== null) window.clearTimeout(clickGuardTimer.current);
    clickGuardTimer.current = window.setTimeout(() => {
      suppressClick.current = false;
    }, 350);
  };
  const getTargetIndex = (directionType: "next" | "prev") => {
    if (directionType === "next") return isLastCard ? null : index + 1;
    return isFirstCard ? null : index - 1;
  };
  const resetDragRefs = () => {
    dragStart.current = null;
    dragDistance.current = { x: 0, y: 0 };
    gestureMode.current = "idle";
  };
  const snapBack = () => {
    clearAnimationTimer();
    setIsDragging(false);
    setIsAnimating(true);
    setTransitionMs(180);
    setDragOffset(0);
    animationTimer.current = window.setTimeout(() => {
      setIsAnimating(false);
      setTransitionMs(0);
    }, 190);
  };
  const slideTo = (directionType: "next" | "prev") => {
    if (isAnimating) return;
    const targetIndex = getTargetIndex(directionType);
    if (targetIndex === null) {
      markSuppressClick();
      snapBack();
      return;
    }

    const width = cardButtonRef.current?.offsetWidth ?? 360;
    const exitOffset = directionType === "next" ? -width * 1.18 : width * 1.18;
    const entryOffset = directionType === "next" ? width * 0.34 : -width * 0.34;

    clearAnimationTimer();
    markSuppressClick();
    setIsDragging(false);
    setIsAnimating(true);
    setTransitionMs(170);
    setDragOffset(exitOffset);

    animationTimer.current = window.setTimeout(() => {
      setIndex(targetIndex);
      setFlipped(false);
      setTransitionMs(0);
      setDragOffset(entryOffset);

      animationTimer.current = window.setTimeout(() => {
        setTransitionMs(220);
        setDragOffset(0);

        animationTimer.current = window.setTimeout(() => {
          setIsAnimating(false);
          setTransitionMs(0);
        }, 230);
      }, 20);
    }, 175);
  };
  const next = () => slideTo("next");
  const prev = () => slideTo("prev");
  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (isAnimating) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY, time: window.performance.now() };
    dragDistance.current = { x: 0, y: 0 };
    gestureMode.current = "idle";
    suppressClick.current = false;
    clearAnimationTimer();
    setTransitionMs(0);
    setDragOffset(0);
    setIsDragging(true);
  };
  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const start = dragStart.current;
    if (start === null) return;
    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    dragDistance.current = { x: distanceX, y: distanceY };

    if (gestureMode.current === "idle") {
      if (Math.max(Math.abs(distanceX), Math.abs(distanceY)) < 6) return;
      gestureMode.current = Math.abs(distanceY) > Math.abs(distanceX) * 1.15 ? "vertical" : "horizontal";
    }

    if (gestureMode.current === "vertical") {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      resetDragRefs();
      setDragOffset(0);
      setIsDragging(false);
      return;
    }

    event.preventDefault();
    markSuppressClick();
    const atStart = isFirstCard && distanceX > 0;
    const atEnd = isLastCard && distanceX < 0;
    const resistedDistance = atStart || atEnd ? distanceX * 0.28 : distanceX;
    const width = cardButtonRef.current?.offsetWidth ?? 360;
    const limitedDistance = Math.sign(resistedDistance) * Math.min(Math.abs(resistedDistance), width * 0.85);
    setDragOffset(limitedDistance);
  };
  const finishPointerDrag = (event: React.PointerEvent<HTMLButtonElement>, cancelled = false) => {
    const start = dragStart.current;
    if (start === null) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const distanceX = dragDistance.current.x;
    const distanceY = dragDistance.current.y;
    const elapsed = Math.max(window.performance.now() - start.time, 1);
    const velocity = Math.abs(distanceX) / elapsed;
    const directionType = distanceX < 0 ? "next" : "prev";
    const width = cardButtonRef.current?.offsetWidth ?? 360;
    const swipeThreshold = Math.min(120, width * 0.26);
    const mode = gestureMode.current;
    const moved = Math.abs(distanceX) > 6 || Math.abs(distanceY) > 6;
    const isHorizontalSwipe = mode === "horizontal" && Math.abs(distanceX) > Math.abs(distanceY) * 1.2;
    const shouldAdvance = !cancelled && isHorizontalSwipe && getTargetIndex(directionType) !== null && (Math.abs(distanceX) >= swipeThreshold || velocity > 0.55);

    resetDragRefs();

    if (shouldAdvance) {
      slideTo(directionType);
      return;
    }
    if (moved || cancelled) {
      markSuppressClick();
      snapBack();
      return;
    }
    setIsDragging(false);
    setDragOffset(0);
    setTransitionMs(0);
  };

  return <div className="rounded-2xl border border-[#cde3ca] bg-[#f6fbf3] p-5"><button ref={cardButtonRef} className={`group w-full touch-pan-y select-none [perspective:1400px] ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${isGermanToIndonesian ? "h-[420px] max-[600px]:h-[460px]" : "h-[280px] max-[600px]:h-[320px]"}`} onClick={() => { if (suppressClick.current || isAnimating) { suppressClick.current = false; return; } setFlipped((value) => !value); }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerCancel={(event) => finishPointerDrag(event, true)} onPointerUp={(event) => finishPointerDrag(event)}><span key={`${direction}-${index}`} className="relative block h-full w-full rounded-[24px] will-change-[opacity,transform]" style={cardStyle}><span className={`relative block h-full w-full rounded-[24px] transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}><span className="absolute inset-0 flex flex-col items-center justify-center rounded-[24px] border border-[#b7d7b5] bg-[radial-gradient(circle_at_20%_15%,#fff8c7_0%,transparent_28%),linear-gradient(135deg,#ffffff_0%,#eaf8e6_100%)] px-6 text-center shadow-[0_18px_45px_rgba(38,117,49,0.16)] [backface-visibility:hidden] group-hover:shadow-[0_22px_55px_rgba(38,117,49,0.22)]"><span className="mb-4 rounded-full bg-[#287b31] px-4 py-1 text-xs font-black uppercase tracking-[0.28em] text-white">{frontLabel}</span><span className="text-3xl font-black text-[#176126] max-[600px]:text-2xl">{frontText}</span><span className="mt-5 text-sm font-bold text-[#647268]">Klik balik, geser kiri/kanan</span></span><span className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto rounded-[24px] border border-[#f2dfa2] bg-[radial-gradient(circle_at_82%_18%,#c9f3cf_0%,transparent_30%),linear-gradient(135deg,#fff9e8_0%,#ffffff_100%)] px-6 py-5 text-center shadow-[0_18px_45px_rgba(74,59,20,0.14)] [backface-visibility:hidden] [transform:rotateY(180deg)]"><span className="mb-3 rounded-full bg-[#f6c343] px-4 py-1 text-xs font-black uppercase tracking-[0.28em] text-[#4a3b14]">{backLabel}</span><span className="text-3xl font-black text-[#4a3b14] max-[600px]:text-2xl">{backText}</span><span className="mt-4 rounded-xl bg-white/80 px-4 py-2 text-sm font-black text-[#176126]">Bentuk: {info}</span>{isGermanToIndonesian && <span className="mt-4 block space-y-3 text-left text-sm not-italic text-[#382c10]"><span className="block rounded-xl bg-white/85 px-4 py-3"><strong>Contoh:</strong> {detail.example}</span><span className="block rounded-xl bg-white/85 px-4 py-3"><strong>Terjemahan:</strong> {detail.translation}</span><span className="block rounded-xl bg-white/85 px-4 py-3"><strong>Penjelasan:</strong> {detail.explanation}</span></span>}</span></span></span></button><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><button className={`rounded-xl px-5 py-2 font-bold ${isFirstCard || isAnimating ? "cursor-not-allowed bg-[#edf2ea] text-[#9aa79d]" : "bg-[#edf8ea] text-[#176126] hover:bg-[#dff1db]"}`} disabled={isFirstCard || isAnimating} onClick={prev}>← Sebelumnya</button><span className="font-bold text-[#647268]">{index + 1} / {totalCards}</span><button className={`rounded-xl px-5 py-2 font-bold ${isLastCard || isAnimating ? "cursor-not-allowed bg-[#edf2ea] text-[#9aa79d]" : "bg-[#287b31] text-white hover:bg-[#176126]"}`} disabled={isLastCard || isAnimating} onClick={next}>Berikutnya →</button></div></div>;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
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
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("kapitel5-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const frame = window.requestAnimationFrame(() => {
      setDarkMode(savedTheme ? savedTheme === "dark" : prefersDark);
      setThemeReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    window.localStorage.setItem("kapitel5-theme", darkMode ? "dark" : "light");
  }, [darkMode, themeReady]);
  return <main className={`theme-shell mx-auto max-w-[920px] px-5 py-6 ${darkMode ? "dark-page" : ""}`}><header className="mb-8 overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#267531_0%,#63bd6b_100%)] px-8 py-12 text-center text-white shadow-[0_20px_55px_rgba(38,117,49,0.24)]"><p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-[#fff4bd]">Deutsch Lernen</p><h1 className="mb-3 text-[2.25em] font-black tracking-[-0.03em] max-[600px]:text-[1.7em]">🇩🇪 Kapitel 5: Leben in der Stadt</h1><p className="text-[1.05em] opacity-95">Materi Lengkap Bahasa Jerman — Hidup di Kota</p></header>
  <nav className="sticky top-3 z-50 mb-7 rounded-[22px] border border-[#b7d7b5] bg-white/92 px-3 py-3 shadow-[0_14px_38px_rgba(38,117,49,0.16)] backdrop-blur"><div className="flex items-center justify-between gap-2 md:hidden"><a className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#287b31] px-4 py-2 text-sm font-black text-white no-underline shadow-sm transition hover:bg-[#176126]" href="#"><span>🇩🇪</span><span>Kapitel 5</span></a><button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf8ea] text-2xl font-black text-[#176126] shadow-sm" type="button" aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((value) => !value)}><span aria-hidden="true">{mobileMenuOpen ? "×" : "☰"}</span></button></div><div className={`${mobileMenuOpen ? "flex" : "hidden"} mt-3 flex-col gap-2 md:mt-0 md:flex md:flex-row md:flex-wrap md:items-center`}><a className="hidden shrink-0 items-center gap-2 rounded-2xl bg-[#287b31] px-4 py-2 text-sm font-black text-white no-underline shadow-sm transition hover:bg-[#176126] md:flex" href="#"><span>🇩🇪</span><span>Kapitel 5</span></a>{navItems.map(([href,icon,text])=>{ const active = activeNav === href; return <a className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2 text-sm font-black no-underline shadow-sm transition hover:-translate-y-0.5 ${active ? "bg-[#287b31] text-white ring-2 ring-[#f6c343]" : "bg-[#edf8ea] text-[#176126] hover:bg-[#287b31] hover:text-white hover:shadow-md"}`} href={href} key={href} onClick={() => { setActiveNav(href); setMobileMenuOpen(false); }} aria-current={active ? "page" : undefined}><span>{icon}</span><span>{text}</span></a>;})}<button className="theme-toggle flex shrink-0 items-center gap-2 rounded-2xl bg-[#fff9e8] px-4 py-2 text-sm font-black text-[#4a3b14] shadow-sm transition hover:-translate-y-0.5" type="button" aria-pressed={darkMode} onClick={() => setDarkMode((value) => !value)}><span>{darkMode ? "☀️" : "🌙"}</span><span>{darkMode ? "Light" : "Dark"}</span></button></div></nav>
  <Section><H2>📋 Daftar Isi</H2><div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">{[["#vocab","1. Kosakata (Wortschatz)"],["#grammar","2. Tata Bahasa (Grammatik)"],["#phrases","3. Frasa Umum (Redemittel)"],["#dialog","4. Dialog & Situasi"],["#exam-prep","5. Materi Khusus Ujian"],["#culture","6. Landeskunde: Wien"],["#flash-de-id","7. Flashcard"],["#mini-game","8. Mini Game"],["#exercises","9. Latihan Soal (Übungen)"]].map(([href,text])=><a className="block rounded-xl border border-[#d5e8d1] bg-[#edf8ea] px-4 py-3 font-bold text-[#176126] no-underline transition hover:-translate-y-0.5 hover:bg-[#dff1db] hover:shadow-md" href={href} key={href}>{text}</a>)}</div></Section>
  <Section id="vocab"><H2>1. 📖 Kosakata — Wortschatz</H2><H3>🏙️ Kota & Tempat (Stadt & Orte)</H3><VocabTable rows={places}/><H3>🚦 Layanan Kota (in der Stadt)</H3><VocabTable rows={cityServices}/><H3>💼 Pekerjaan & Wawancara (Bewerbungsgespräch)</H3><VocabTable rows={jobs}/><H3>🔎 Mencari Kerja (einen Job suchen)</H3><VocabTable rows={jobSearch}/><H3>�️ Bekerja di Restoran (im Restaurant arbeiten)</H3><VocabTable rows={restaurant}/><H3>🏛️ Di Kantor Pemerintahan (bei der Behörde)</H3><VocabTable rows={office}/><H3>�🏦 Di Bank & Kantor (Bei der Bank & Behörde)</H3><VocabTable rows={bank}/><H3>💳 Tambahan Kosakata Bank (in der Bank)</H3><VocabTable rows={bankExtra}/><H3>👮 Polisi & Tur Kota</H3><VocabTable rows={policeTour}/><H3>✨ Kata dan Ungkapan Lainnya</H3><VocabTable rows={expressions}/></Section>
  <Section id="grammar"><H2>2. 📐 Tata Bahasa — Grammatik</H2><H3>A. Adjektive nach dem bestimmten Artikel</H3><p>Ketika kata sifat muncul setelah artikel tertentu (<em>der, die, das</em>), endingnya berubah sesuai kasus:</p><Box title="Tabel Deklinasi"><DataTable headers={["Kasus","Maskulin (der)","Feminin (die)","Neutral (das)","Plural (die)"]} rows={[["Nominativ","der große Park","die schöne Stadt","das alte Haus","die kleinen Straßen"],["Akkusativ","den großen Park","die schöne Stadt","das alte Haus","die kleinen Straßen"],["Dativ","dem großen Park","der schönen Stadt","dem alten Haus","den kleinen Straßen"]]}/></Box><Tip>💡 <strong>Tips:</strong> Setelah artikel tertentu, akhiran kata sifat hanya <strong>-e</strong> atau <strong>-en</strong>. Nominativ singular selalu <strong>-e</strong>, sisanya <strong>-en</strong> (kecuali Akkusativ feminin & neutral = <strong>-e</strong>).</Tip><Example>Ich besuche <strong>die alte Kirche</strong>. → Saya mengunjungi gereja tua itu.<br/><span className="text-[0.9em] not-italic text-[#666]">Er wohnt in <strong>dem kleinen Haus</strong>. → Dia tinggal di rumah kecil itu.</span></Example><H3>B. Präpositionen: <em>ohne</em> + Akkusativ & <em>mit</em> + Dativ</H3><Box title="ohne + Akkusativ (tanpa)"><DataTable headers={["Contoh","Arti"]} rows={[["ohne den Ausweis","tanpa kartu identitas"],["ohne eine Bewerbung","tanpa lamaran"],["ohne das Formular","tanpa formulir"]]}/></Box><Box title="mit + Dativ (dengan)"><DataTable headers={["Contoh","Arti"]} rows={[["mit dem Bus","dengan bus"],["mit der Straßenbahn","dengan trem"],["mit dem Fahrrad","dengan sepeda"],["mit den Freunden","dengan teman-teman"]]}/></Box><Example>Ich fahre <strong>mit dem Zug</strong> nach Wien. → Saya naik kereta ke Wina.<br/>Er geht <strong>ohne den Regenschirm</strong>. → Dia pergi tanpa payung.</Example><H3>C. Konjunktiv II: <em>könnte</em> (Bisa / Bisakah)</H3><p>Digunakan untuk permintaan sopan, saran, atau kemungkinan. Ini adalah bentuk sopan dari <em>können</em>.</p><Box title="Konjugasi könnte"><DataTable headers={["Pronomen","Konjugasi","Contoh"]} rows={[["ich","könnte","Ich könnte Ihnen helfen."],["du","könntest","Könntest du mir das Formular geben?"],["er/sie/es","könnte","Er könnte morgen kommen."],["wir","könnten","Wir könnten zusammen gehen."],["ihr","könntet","Könntet ihr mir helfen?"],["sie/Sie","könnten","Könnten Sie das bitte wiederholen?"]]}/></Box><Tip>💡 <strong>Tips:</strong> Gunakan <em>Könnten Sie...?</em> untuk situasi formal (di bank, kantor, wawancara). Gunakan <em>Könntest du...?</em> untuk situasi informal.</Tip><Example><strong>Könnten Sie</strong> mir bitte helfen? → Bisakah Anda membantu saya?<br/><strong>Könnte</strong> ich ein Konto eröffnen? → Bisakah saya membuka rekening?</Example><H3>D. Artikel: der, die, das, ein, kein</H3><p>Artikel menunjukkan gender, jumlah, dan kasus. Pada level dasar, hafalkan artikel bersama kosakatanya karena artikel berubah saat masuk Akkusativ atau Dativ.</p><Box title="Artikel penting per kasus"><DataTable headers={["Kasus","Maskulin","Feminin","Neutral","Plural"]} rows={[["Nominativ","der / ein / kein","die / eine / keine","das / ein / kein","die / - / keine"],["Akkusativ","den / einen / keinen","die / eine / keine","das / ein / kein","die / - / keine"],["Dativ","dem / einem / keinem","der / einer / keiner","dem / einem / keinem","den / - / keinen + -n"]]}/></Box><Tip><strong>kein</strong> dipakai untuk menyangkal kata benda: <em>Ich habe keinen Ausweis</em> = saya tidak punya kartu identitas. <strong>nicht</strong> menyangkal verba, adjektif, atau seluruh kalimat: <em>Das Formular ist nicht richtig.</em></Tip><Example><strong>Der Antrag</strong> ist wichtig. → Permohonan itu penting.<br/><strong>Ich unterschreibe den Antrag.</strong> → Saya menandatangani permohonan itu.<br/><strong>Ich helfe dem Touristen.</strong> → Saya membantu turis laki-laki itu.</Example><H3>E. Kasus: Nominativ, Akkusativ, Dativ</H3><p>Gunakan pertanyaan sederhana untuk menentukan kasus: siapa melakukan sesuatu? = Nominativ; apa/siapa yang dikenai tindakan? = Akkusativ; kepada/untuk siapa? atau setelah preposisi Dativ = Dativ.</p><Box title="Cara cepat membaca kasus"><DataTable headers={["Kasus","Fungsi","Pertanyaan","Contoh"]} rows={[["Nominativ","Subjek","wer? / was?","Der Beamte arbeitet."],["Akkusativ","Objek langsung","wen? / was?","Ich brauche den Ausweis."],["Dativ","Objek penerima / setelah mit, bei, zu","wem? / wo?","Sie hilft dem Kunden."]]}/></Box><Example><strong>Die Beamtin gibt dem Mann das Formular.</strong> → Pegawai negeri perempuan memberi formulir itu kepada pria tersebut.<br/><span className="text-[0.9em] not-italic text-[#666]">die Beamtin = Nominativ, dem Mann = Dativ, das Formular = Akkusativ.</span></Example><H3>F. Wechselpräpositionen: in, an, auf, vor, über</H3><p>Beberapa preposisi bisa memakai Akkusativ atau Dativ. Jika menunjukkan arah/gerakan ke tujuan, pakai Akkusativ. Jika menunjukkan lokasi tetap, pakai Dativ.</p><Box title="Arah vs lokasi"><DataTable headers={["Pertanyaan","Kasus","Contoh","Arti"]} rows={[["wohin? ke mana","Akkusativ","Ich gehe in die Stadt.","Saya pergi ke kota."],["wo? di mana","Dativ","Ich bin in der Stadt.","Saya berada di kota."],["wohin?","Akkusativ","Er stellt das Auto auf den Parkplatz.","Dia menaruh mobil ke tempat parkir."],["wo?","Dativ","Das Auto steht auf dem Parkplatz.","Mobil itu berada di tempat parkir."]]}/></Box><Tip>Verba gerak seperti <em>gehen, fahren, stellen, legen</em> sering memicu Akkusativ. Verba posisi seperti <em>sein, stehen, sitzen, liegen, wohnen</em> sering memicu Dativ.</Tip><H3>G. Trennbare Verben & Perfekt</H3><p>Verba pisah memiliki awalan seperti <em>aus-, ab-, ein-, mit-</em>. Pada kalimat utama present tense, awalan pindah ke akhir. Pada Perfekt, bentuk participle sering menjadi <em>ge</em> di antara awalan dan verba dasar.</p><Box title="Verba pisah dari Kapitel ini"><DataTable headers={["Infinitiv","Präsens","Perfekt","Arti"]} rows={[["ausfüllen","Ich fülle das Formular aus.","Ich habe das Formular ausgefüllt.","mengisi"],["abheben","Ich hebe Geld ab.","Ich habe Geld abgehoben.","menarik uang"],["einzahlen","Sie zahlt Geld ein.","Sie hat Geld eingezahlt.","menyetor"],["abgeben","Wir geben die Unterlagen ab.","Wir haben die Unterlagen abgegeben.","menyerahkan"],["mitbringen","Bitte bringen Sie den Ausweis mit.","Sie haben den Ausweis mitgebracht.","membawa serta"]]}/></Box><Example><strong>Ich muss das Formular ausfüllen.</strong> → Saya harus mengisi formulir itu.<br/><span className="text-[0.9em] not-italic text-[#666]">Dengan modalverb <em>muss</em>, verba utama kembali menjadi infinitiv di akhir: ausfüllen.</span></Example><H3>H. Nebensatz & indirekte Fragen</H3><p>Pada anak kalimat bahasa Jerman, verba terkonjugasi pindah ke akhir. Ini sangat sering muncul saat bertanya dengan sopan memakai <em>Könnten Sie mir sagen/erklären...</em></p><Box title="Struktur anak kalimat"><DataTable headers={["Kalimat langsung","Kalimat sopan/tidak langsung","Arti"]} rows={[["Wo ist der Bahnhof?","Könnten Sie mir sagen, wo der Bahnhof ist?","Bisakah Anda memberi tahu saya di mana stasiun?"],["Wie komme ich zum Amt?","Könnten Sie mir erklären, wie ich zum Amt komme?","Bisakah Anda menjelaskan bagaimana saya ke kantor pemerintahan?"],["Welche Dokumente brauche ich?","Ich weiß nicht, welche Dokumente ich brauche.","Saya tidak tahu dokumen apa yang saya perlukan."]]}/></Box><Tip>Setelah koma, perhatikan posisi verba: <em>ist, komme, brauche</em> berada di akhir anak kalimat.</Tip></Section>
  <Section id="phrases"><H2>3. 💬 Frasa Umum — Redemittel</H2>{[["🙏 Meminta dengan Sopan (Höflich bitten)",["Könnten Sie mir bitte helfen? → Bisakah Anda membantu saya?","Könnte ich bitte einen Termin haben? → Bisakah saya mendapat janji temu?","Dürfte ich Sie etwas fragen? → Bolehkah saya bertanya sesuatu?","Wären Sie so freundlich, mir zu helfen? → Maukah Anda membantu saya?"]],["🔍 Menanyakan Sesuatu (Nach Dingen fragen)",["Wo ist die nächste Bank? → Di mana bank terdekat?","Wie komme ich zum Bahnhof? → Bagaimana saya bisa ke stasiun?","Können Sie mir den Weg zeigen? → Bisakah Anda menunjukkan jalannya?","Was brauche ich für den Antrag? → Apa yang saya butuhkan untuk permohonan?"]],["🏦 Di Bank (Gespräche bei der Bank)",["Ich möchte ein Konto eröffnen. → Saya ingin membuka rekening.","Kann ich Geld abheben? → Bisakah saya menarik uang?","Ich möchte Geld überweisen. → Saya ingin mentransfer uang."]],["🏛️ Di Kantor Pemerintahan (Bei der Behörde)",["Ich brauche eine Anmeldung. → Saya perlu registrasi.","Wo muss ich unterschreiben? → Di mana saya harus tanda tangan?","Welche Dokumente brauche ich? → Dokumen apa yang saya butuhkan?"]],["🏙️ Mendeskripsikan Kota (Eine Stadt beschreiben)",["Die Stadt ist sehr schön und modern. → Kota ini sangat cantik dan modern.","Es gibt viele Parks und Museen. → Ada banyak taman dan museum.","Die Altstadt ist besonders sehenswert. → Kota tua sangat layak dikunjungi.","Man kann gut mit der U-Bahn fahren. → Bisa dengan mudah naik metro."]]].map(([title,items])=><div key={title as string}><H3>{title as string}</H3>{(items as string[]).map(x=><Example key={x}>{x}</Example>)}</div>)}</Section>
  <Section id="dialog"><H2>4. 🎭 Contoh Dialog</H2><H3>Dialog 1: Di Bank</H3><div className="my-2.5 rounded-[10px] bg-[#f9fbe7] p-[18px]"><p><strong>🧑 Kunde:</strong> Guten Tag! Ich möchte ein Konto eröffnen.</p><p><strong>👨‍💼 Bankangestellter:</strong> Guten Tag! Haben Sie Ihren Ausweis dabei?</p><p><strong>🧑 Kunde:</strong> Ja, hier bitte. Könnten Sie mir erklären, welche Konten es gibt?</p><p><strong>👨‍💼 Bankangestellter:</strong> Natürlich. Wir haben ein Girokonto und ein Sparkonto.</p><p><strong>🧑 Kunde:</strong> Ich möchte ein Girokonto. Was muss ich ausfüllen?</p><p><strong>👨‍💼 Bankangestellter:</strong> Bitte füllen Sie dieses Formular aus und unterschreiben Sie hier.</p><p><strong>🧑 Kunde:</strong> Vielen Dank für Ihre Hilfe!</p></div><H3>Dialog 2: Wawancara Kerja</H3><div className="my-2.5 rounded-[10px] bg-[#f9fbe7] p-[18px]"><p><strong>👨‍💼 Interviewer:</strong> Guten Tag, Frau Müller. Bitte setzen Sie sich.</p><p><strong>👩 Bewerberin:</strong> Vielen Dank. Ich freue mich über die Einladung.</p><p><strong>👨‍💼 Interviewer:</strong> Erzählen Sie uns von Ihrer Erfahrung.</p><p><strong>👩 Bewerberin:</strong> Ich habe drei Jahre als Sekretärin gearbeitet. Ich könnte sofort anfangen.</p><p><strong>👨‍💼 Interviewer:</strong> Sehr gut. Könnten Sie auch am Wochenende arbeiten?</p><p><strong>👩 Bewerberin:</strong> Ja, das wäre kein Problem.</p></div></Section>
  <ExamPrepSection />
  <Section id="culture"><H2>6. 🌍 Landeskunde: Rund um den Ring — Wien</H2><p><strong>Die Ringstraße</strong> adalah jalan boulevard terkenal di Wina (Wien), ibu kota Austria. Jalan ini mengelilingi pusat kota tua (<em>Innere Stadt</em>) dan dibangun pada abad ke-19.</p><p>Di sepanjang Ringstraße, Anda bisa menemukan bangunan penting seperti:</p><DataTable headers={["Gebäude","Arti","Fungsi"]} rows={buildings}/><Tip>💡 Wien sering disebut sebagai salah satu kota paling layak huni di dunia!</Tip></Section>
  <Section id="games"><H2>7. 🎮 Flashcard & Mini Game</H2><nav className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-[#d5e8d1] bg-[#f6fbf3] p-2" aria-label="Navigasi flashcard">{flashNavItems.map(([href,text])=><a className="rounded-xl bg-white px-4 py-2 text-sm font-black text-[#176126] no-underline shadow-sm transition hover:bg-[#287b31] hover:text-white" href={href} key={href}>{text}</a>)}</nav><div className="grid grid-cols-2 gap-5 max-[760px]:grid-cols-1"><div id="flash-de-id" className="scroll-mt-24"><H3>🃏 Flashcard Jerman → Indonesia</H3><Flashcards direction="de-id" /></div><div id="flash-id-de" className="scroll-mt-24"><H3>🃏 Flashcard Indonesia → Jerman</H3><Flashcards direction="id-de" /></div><div id="mini-game" className="col-span-2 scroll-mt-24 max-[760px]:col-span-1"><H3>⚡ Mini Game</H3><MiniGame /></div></div></Section>
  <ExerciseSection onAnswer={(id, ok)=>setAnswers(a=>({...a,[id]:ok}))} showScore={show} onShowScore={()=>setShow(true)} scoreText={scoreText} />
  <footer className="p-5 text-center text-[0.9em] text-[#888]">Materi Bahasa Jerman — Kapitel 5: Leben in der Stadt<br/>Update: 11 Mei 2026<br/>Viel Erfolg beim Lernen! 🍀</footer></main>;
}
