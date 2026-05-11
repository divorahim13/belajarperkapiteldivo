"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  chapters,
  grammarBlocks,
  microChallenges,
  modules,
  pageImages,
  phraseGroups,
  quizzes,
  readingBlocks,
  rewardLines,
  studyTasks,
  vocabGroups,
  type VocabItem,
} from "./kapitel6Data";

type ProgressState = {
  selectedChapter: string;
  completedTasks: Record<string, boolean>;
  masteredWords: Record<string, boolean>;
  pagesRead: Record<string, boolean>;
  quizAnswers: Record<string, number>;
  studyDays: string[];
};

type Toast = {
  text: string;
  id: number;
};

type PomodoroMode = "focus" | "break";
type ThemeMode = "light" | "dark";
type VocabCard = VocabItem & { group: string };

type WritingCorrection = {
  correctedText: string;
  feedbackId: string;
  strengths: string[];
  corrections: {
    original: string;
    corrected: string;
    reason: string;
  }[];
  nextPractice: string[];
};

const STORAGE_KEY = "deutsch-kapitel-6-progress-v1";
const THEME_STORAGE_KEY = "deutsch-kapitel-6-theme-v1";
const DEFAULT_FOCUS_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;
const MIN_POMODORO_MINUTES = 1;
const MAX_POMODORO_MINUTES = 90;

const defaultProgress: ProgressState = {
  selectedChapter: "6",
  completedTasks: {},
  masteredWords: {},
  pagesRead: {},
  quizAnswers: {},
  studyDays: [],
};

const navItems = [
  ["#home", "Home"],
  ["#mulai", "Mulai"],
  ["#plan", "Plan"],
  ["#gallery", "Gambar"],
  ["#wortschatz", "Wortschatz"],
  ["#grammatik", "Grammatik"],
  ["#redemittel", "Redemittel"],
  ["#lesen", "Lesen"],
  ["#schreiben", "Schreiben"],
  ["#training", "Training"],
];

const startSteps = [
  {
    label: "1",
    title: "Baca halaman 64-65",
    text: "Buka Galeri, lihat gambar awal Kapitel 6, lalu tandai halaman yang sudah kamu baca.",
  },
  {
    label: "2",
    title: "Kerjakan checklist pertama",
    text: "Masuk ke Checklist belajar dan selesaikan task paling atas. Jangan lompat jauh dulu.",
  },
  {
    label: "3",
    title: "Kunci 10 kata",
    text: "Buka Wortschatz, cari kata yang sering muncul, lalu klik Kunci kalau kamu sudah paham.",
  },
  {
    label: "4",
    title: "Tutup dengan quiz",
    text: "Jawab 2 sampai 3 quiz. Kalau salah, baca penjelasannya dan ulangi besok.",
  },
];

const finishSignals = [
  "2 halaman gambar sudah ditandai selesai",
  "1 checklist sudah dicentang",
  "10 kosakata sudah dikunci",
  "minimal 2 quiz sudah dijawab",
];

const umlautButtons = ["ä", "ö", "ü", "Ä", "Ö", "Ü", "ß"];

function todayKey() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function addToday(progress: ProgressState): ProgressState {
  const today = todayKey();
  if (progress.studyDays.includes(today)) return progress;
  return { ...progress, studyDays: [...progress.studyDays, today].sort() };
}

function calcStreak(days: string[]) {
  const set = new Set(days);
  const cursor = new Date(`${todayKey()}T00:00:00`);
  let streak = 0;

  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function mergeProgress(raw: string | null): ProgressState {
  if (!raw) return defaultProgress;

  try {
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      ...defaultProgress,
      ...parsed,
      completedTasks: { ...defaultProgress.completedTasks, ...parsed.completedTasks },
      masteredWords: { ...defaultProgress.masteredWords, ...parsed.masteredWords },
      pagesRead: { ...defaultProgress.pagesRead, ...parsed.pagesRead },
      quizAnswers: { ...defaultProgress.quizAnswers, ...parsed.quizAnswers },
      studyDays: Array.isArray(parsed.studyDays) ? parsed.studyDays : [],
    };
  } catch {
    return defaultProgress;
  }
}

function percent(done: number, total: number) {
  if (!total) return 0;
  return Math.round((done / total) * 100);
}

function wordKey(item: VocabItem) {
  return item.de;
}

function flashcardExample(item: VocabCard) {
  if (item.example) return item.example;

  const groupExamples: Record<string, string> = {
    "Taetigkeiten im Beruf": "Im Buero organisiere ich Termine und berate Kunden.",
    "Bahnreisen und Bahnhof": "Am Bahnhof frage ich: Wann faehrt der naechste Zug?",
    "Stadtprogramm und Freizeitangebote": "Heute Abend suchen wir ein guenstiges Konzert.",
    "Beruf wechseln und Traumberuf": "Spaeter moechte ich einen neuen Beruf lernen.",
    Telefonieren: "Ich moechte eine Nachricht hinterlassen.",
    "Die moderne Arbeitswelt": "Im modernen Betrieb arbeiten viele Teams digital.",
    "Feste in D-A-CH": "An Weihnachten schmuecken viele Familien den Baum.",
    "Andere wichtige Woerter": "Also gut, der naechste Schritt ist klar.",
  };

  return groupExamples[item.group] ?? `Ich benutze "${item.de}" in einem kurzen Satz.`;
}

function clampPomodoroMinutes(value: number, fallback: number) {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(MAX_POMODORO_MINUTES, Math.max(MIN_POMODORO_MINUTES, Math.round(value)));
}

export default function Home() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    if (typeof window === "undefined") return defaultProgress;
    return mergeProgress(window.localStorage.getItem(STORAGE_KEY));
  });
  const [toast, setToast] = useState<Toast | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  });
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [writingDraft, setWritingDraft] = useState("");
  const [writingCorrection, setWritingCorrection] = useState<WritingCorrection | null>(null);
  const [writingError, setWritingError] = useState("");
  const [writingLoading, setWritingLoading] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState(DEFAULT_FOCUS_MINUTES);
  const [breakMinutes, setBreakMinutes] = useState(DEFAULT_BREAK_MINUTES);
  const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>("focus");
  const [timer, setTimer] = useState(DEFAULT_FOCUS_MINUTES * 60);
  const [timerDuration, setTimerDuration] = useState(DEFAULT_FOCUS_MINUTES * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | "unsupported">(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
    return Notification.permission;
  });
  const rewardCursor = useRef(0);
  const writingRef = useRef<HTMLTextAreaElement | null>(null);

  const allWords = useMemo(
    () => vocabGroups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title }))),
    [],
  );

  const filteredWords = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return allWords;
    return allWords.filter((item) => `${item.de} ${item.id} ${item.group}`.toLowerCase().includes(query));
  }, [allWords, search]);

  const darkMode = theme === "dark";
  const taskCount = studyTasks.length;
  const completedTasks = studyTasks.filter((task) => progress.completedTasks[task.id]).length;
  const pagesDone = pageImages.filter((page) => progress.pagesRead[String(page.page)]).length;
  const masteredWords = allWords.filter((item) => progress.masteredWords[wordKey(item)]).length;
  const answeredQuizzes = quizzes.filter((quiz) => progress.quizAnswers[quiz.id] !== undefined).length;
  const correctQuizzes = quizzes.filter((quiz) => progress.quizAnswers[quiz.id] === quiz.answer).length;
  const totalUnits = taskCount + pageImages.length + allWords.length + quizzes.length;
  const doneUnits = completedTasks + pagesDone + masteredWords + answeredQuizzes;
  const totalProgress = percent(doneUnits, totalUnits);
  const xp =
    studyTasks.filter((task) => progress.completedTasks[task.id]).reduce((sum, task) => sum + task.xp, 0) +
    pagesDone * 6 +
    masteredWords * 4 +
    correctQuizzes * 15 +
    progress.studyDays.length * 8;
  const level = Math.floor(xp / 120) + 1;
  const streak = calcStreak(progress.studyDays);
  const currentCard = filteredWords[Math.min(cardIndex, Math.max(filteredWords.length - 1, 0))];
  const nextTask = studyTasks.find((task) => !progress.completedTasks[task.id]);
  const pomodoroProgress = percent(timerDuration - timer, timerDuration);
  const pomodoroModeLabel = pomodoroMode === "focus" ? "Fokus" : "Istirahat";
  const pomodoroHint =
    pomodoroMode === "focus"
      ? "Fokus ke satu task kecil. Saat selesai, timer otomatis pindah ke istirahat."
      : "Istirahat dulu. Saat selesai, timer kembali ke sesi fokus.";
  const notificationLabel =
    notificationPermission === "granted"
      ? "Notif aktif"
      : notificationPermission === "denied"
        ? "Notif diblokir"
        : notificationPermission === "unsupported"
          ? "Notif app aktif"
          : "Aktifkan notif";

  const showToast = useCallback((text: string) => {
    const id = Date.now();
    setToast({ text, id });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2600);
  }, []);

  const showPomodoroNotification = useCallback((title: string, body: string) => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!timerRunning) return;

    const interval = window.setInterval(() => {
      setTimer((value) => {
        if (value > 1) return value - 1;

        window.clearInterval(interval);

        const completedMode = pomodoroMode;
        const nextMode: PomodoroMode = completedMode === "focus" ? "break" : "focus";
        const nextDuration = (nextMode === "focus" ? focusMinutes : breakMinutes) * 60;
        const message =
          completedMode === "focus"
            ? "Sesi fokus selesai. Waktunya istirahat."
            : "Istirahat selesai. Siap fokus lagi.";

        setTimerRunning(false);
        setPomodoroMode(nextMode);
        setTimerDuration(nextDuration);
        showToast(message);
        showPomodoroNotification(completedMode === "focus" ? "Fokus selesai" : "Istirahat selesai", message);

        return nextDuration;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [breakMinutes, focusMinutes, pomodoroMode, showPomodoroNotification, showToast, timerRunning]);

  function randomReward(prefix: string) {
    rewardCursor.current = (rewardCursor.current + 1) % rewardLines.length;
    const reward = rewardLines[rewardCursor.current];
    showToast(`${prefix}. ${reward}`);
  }

  function updateProgress(updater: (previous: ProgressState) => ProgressState) {
    setProgress((previous) => addToday(updater(previous)));
  }

  function selectChapter(id: string) {
    setProgress((previous) => ({ ...previous, selectedChapter: id }));
  }

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  function insertUmlaut(character: string) {
    const textarea = writingRef.current;

    if (!textarea) {
      setWritingDraft((current) => `${current}${character}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const nextValue = `${writingDraft.slice(0, start)}${character}${writingDraft.slice(end)}`;
    setWritingDraft(nextValue);
    setWritingCorrection(null);
    setWritingError("");

    window.requestAnimationFrame(() => {
      textarea.focus();
      const nextCursor = start + character.length;
      textarea.setSelectionRange(nextCursor, nextCursor);
    });
  }

  async function requestWritingCorrection() {
    const text = writingDraft.trim();

    if (!text) {
      setWritingError("Tulis dulu 2 sampai 5 kalimat Jerman, baru minta koreksi.");
      setWritingCorrection(null);
      return;
    }

    setWritingLoading(true);
    setWritingError("");
    setWritingCorrection(null);

    try {
      const response = await fetch("/api/correct-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = (await response.json()) as Partial<WritingCorrection> & { error?: string };

      if (!response.ok || data.error) {
        setWritingError(data.error ?? "Koreksi AI belum bisa dipakai sekarang.");
        return;
      }

      setWritingCorrection(data as WritingCorrection);
      randomReward("Tulisan selesai dikoreksi");
    } catch {
      setWritingError("Koneksi ke koreksi AI gagal. Coba lagi sebentar.");
    } finally {
      setWritingLoading(false);
    }
  }

  function toggleTask(id: string) {
    const willComplete = !progress.completedTasks[id];
    updateProgress((previous) => ({
      ...previous,
      completedTasks: { ...previous.completedTasks, [id]: willComplete },
    }));
    if (willComplete) randomReward("Task selesai");
  }

  function togglePage(page: number) {
    const key = String(page);
    const willComplete = !progress.pagesRead[key];
    updateProgress((previous) => ({
      ...previous,
      pagesRead: { ...previous.pagesRead, [key]: willComplete },
    }));
    if (willComplete) randomReward(`Halaman ${page} selesai`);
  }

  function toggleWord(item: VocabItem) {
    const key = wordKey(item);
    const willComplete = !progress.masteredWords[key];
    updateProgress((previous) => ({
      ...previous,
      masteredWords: { ...previous.masteredWords, [key]: willComplete },
    }));
    if (willComplete) randomReward("Kosakata dikunci");
  }

  function answerQuiz(id: string, answer: number) {
    updateProgress((previous) => ({
      ...previous,
      quizAnswers: { ...previous.quizAnswers, [id]: answer },
    }));
    const quiz = quizzes.find((item) => item.id === id);
    if (quiz?.answer === answer) randomReward("Jawaban benar");
  }

  function nextChallenge() {
    setChallengeIndex((value) => (value + 1) % microChallenges.length);
  }

  function updatePomodoroMinutes(mode: PomodoroMode, value: number) {
    const fallback = mode === "focus" ? DEFAULT_FOCUS_MINUTES : DEFAULT_BREAK_MINUTES;
    const minutes = clampPomodoroMinutes(value, fallback);

    if (mode === "focus") {
      setFocusMinutes(minutes);
    } else {
      setBreakMinutes(minutes);
    }

    if (!timerRunning && pomodoroMode === mode) {
      const duration = minutes * 60;
      setTimer(duration);
      setTimerDuration(duration);
    }
  }

  function switchPomodoroMode(mode: PomodoroMode) {
    const duration = (mode === "focus" ? focusMinutes : breakMinutes) * 60;
    setPomodoroMode(mode);
    setTimer(duration);
    setTimerDuration(duration);
    setTimerRunning(false);
  }

  function skipPomodoroMode() {
    const nextMode: PomodoroMode = pomodoroMode === "focus" ? "break" : "focus";
    switchPomodoroMode(nextMode);
    showToast(nextMode === "break" ? "Pindah ke istirahat." : "Pindah ke fokus.");
  }

  async function requestPomodoroNotifications() {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotificationPermission("unsupported");
      showToast("Notifikasi browser tidak tersedia di perangkat ini.");
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    showToast(permission === "granted" ? "Notifikasi Pomodoro aktif." : "Notifikasi belum aktif.");
  }

  function resetTimer() {
    const duration = (pomodoroMode === "focus" ? focusMinutes : breakMinutes) * 60;
    setTimer(duration);
    setTimerDuration(duration);
    setTimerRunning(false);
  }

  return (
    <main id="home" className="app-shell">
      {toast ? <div className="toast">{toast.text}</div> : null}

      <section className="hero-band">
        <div className="hero-copy">
          <p className="eyebrow">Deutsch Lernen A2</p>
          <h1>Home Kapitel</h1>
          <p className="hero-text">
            Pilih kapitel, lanjutkan progress, lalu masuk ke Kapitel 6: Arbeitswelten dengan gambar buku,
            Wortschatz, Grammatik, Redemittel, latihan, dan micro-quest.
          </p>
        </div>

        <div className="dashboard-grid" aria-label="Progress Kapitel 6">
          <Metric label="Progress" value={`${totalProgress}%`} helper={`${doneUnits}/${totalUnits} unit`} />
          <Metric label="XP" value={String(xp)} helper={`Level ${level}`} />
          <Metric label="Streak" value={`${streak} hari`} helper={`${progress.studyDays.length} hari belajar`} />
          <Metric label="Quiz" value={`${correctQuizzes}/${quizzes.length}`} helper={`${answeredQuizzes} dijawab`} />
        </div>
      </section>

      <nav className="top-nav" aria-label="Navigasi materi">
        {navItems.map(([href, label]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
        <button className="theme-toggle" type="button" aria-pressed={darkMode} onClick={toggleTheme}>
          {darkMode ? "Light mode" : "Dark mode"}
        </button>
      </nav>

      <section className="section-panel">
        <div className="section-heading">
          <p className="eyebrow">Chapter selector</p>
          <h2>Pilih Kapitel</h2>
        </div>

        <div className="chapter-grid">
          {chapters.map((chapter) => {
            const active = progress.selectedChapter === chapter.id;
            return (
              <button
                className={`chapter-card ${active ? "active" : ""}`}
                key={chapter.id}
                type="button"
                onClick={() => selectChapter(chapter.id)}
              >
                <span>{chapter.title}</span>
                <strong>{chapter.subtitle}</strong>
                <em>{chapter.status === "ready" ? "Siap belajar" : "Slot materi"}</em>
              </button>
            );
          })}
        </div>

        {progress.selectedChapter !== "6" ? (
          <div className="empty-state">
            <h3>{chapters.find((chapter) => chapter.id === progress.selectedChapter)?.title} belum punya materi lengkap.</h3>
            <p>Struktur home sudah siap. Untuk sekarang semua gambar dan materi yang kamu kirim masuk ke Kapitel 6.</p>
            <button className="primary-button" type="button" onClick={() => selectChapter("6")}>
              Buka Kapitel 6
            </button>
          </div>
        ) : null}
      </section>

      {progress.selectedChapter === "6" ? (
        <>
          <section id="mulai" className="section-panel guide-panel">
            <div className="section-heading">
              <p className="eyebrow">Mulai dari sini</p>
              <h2>Kamu disuruh melakukan ini hari ini</h2>
              <p>
                Jangan baca semua halaman sekaligus. Ikuti satu putaran kecil ini dulu supaya belajar terasa jelas,
                selesai, dan bisa diulang besok.
              </p>
            </div>

            <div className="start-grid">
              {startSteps.map((step) => (
                <article className="start-card" key={step.label}>
                  <span>{step.label}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>

            <div className="finish-box">
              <div>
                <p className="eyebrow">Target sesi pertama</p>
                <h3>Sesi dianggap selesai kalau:</h3>
              </div>
              <ul>
                {finishSignals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="plan" className="section-panel">
            <div className="section-heading">
              <p className="eyebrow">Kapitel 6</p>
              <h2>Arbeitswelten: jalur belajar</h2>
              <p>
                Urutannya dibuat seperti game loop: mulai kecil, dapat umpan balik cepat, kunci kosakata,
                lalu pakai dalam speaking atau writing.
              </p>
            </div>

            <div className="progress-strip">
              <ProgressBar label="Tasks" value={percent(completedTasks, taskCount)} detail={`${completedTasks}/${taskCount}`} />
              <ProgressBar label="Gambar" value={percent(pagesDone, pageImages.length)} detail={`${pagesDone}/${pageImages.length}`} />
              <ProgressBar label="Wortschatz" value={percent(masteredWords, allWords.length)} detail={`${masteredWords}/${allWords.length}`} />
              <ProgressBar label="Quiz" value={percent(answeredQuizzes, quizzes.length)} detail={`${answeredQuizzes}/${quizzes.length}`} />
            </div>

            <div className="habit-row">
              <div className={`focus-box pomodoro-box ${pomodoroMode === "break" ? "break-mode" : ""}`}>
                <div className="pomodoro-clock" aria-live="polite">
                  <span>{pomodoroModeLabel}</span>
                  <strong>{formatTimer(timer)}</strong>
                  <div className="bar-track pomodoro-track" aria-label={`Pomodoro ${pomodoroProgress}%`}>
                    <span style={{ width: `${pomodoroProgress}%` }} />
                  </div>
                </div>

                <div className="pomodoro-content">
                  <div>
                    <h3>Pomodoro custom</h3>
                    <p>{pomodoroHint}</p>
                  </div>

                  <div className="pomodoro-settings" aria-label="Pengaturan Pomodoro">
                    <label>
                      <span>Fokus</span>
                      <input
                        aria-label="Durasi fokus dalam menit"
                        max={MAX_POMODORO_MINUTES}
                        min={MIN_POMODORO_MINUTES}
                        type="number"
                        value={focusMinutes}
                        onChange={(event) => updatePomodoroMinutes("focus", event.currentTarget.valueAsNumber)}
                      />
                      <em>menit</em>
                    </label>
                    <label>
                      <span>Istirahat</span>
                      <input
                        aria-label="Durasi istirahat dalam menit"
                        max={MAX_POMODORO_MINUTES}
                        min={MIN_POMODORO_MINUTES}
                        type="number"
                        value={breakMinutes}
                        onChange={(event) => updatePomodoroMinutes("break", event.currentTarget.valueAsNumber)}
                      />
                      <em>menit</em>
                    </label>
                  </div>

                  <div className="button-row">
                    <button className="primary-button" type="button" onClick={() => setTimerRunning((value) => !value)}>
                      {timerRunning ? "Pause" : "Start"}
                    </button>
                    <button className="ghost-button" type="button" onClick={resetTimer}>
                      Reset
                    </button>
                    <button className="ghost-button" type="button" onClick={skipPomodoroMode}>
                      {pomodoroMode === "focus" ? "Istirahat" : "Fokus"}
                    </button>
                    <button
                      className="ghost-button"
                      disabled={notificationPermission === "granted" || notificationPermission === "unsupported"}
                      type="button"
                      onClick={requestPomodoroNotifications}
                    >
                      {notificationLabel}
                    </button>
                  </div>
                </div>
              </div>

              <div className="focus-box accent">
                <span className="timer">?</span>
                <div>
                  <h3>Mystery micro-quest</h3>
                  <p>{microChallenges[challengeIndex]}</p>
                </div>
                <button className="primary-button" type="button" onClick={nextChallenge}>
                  Quest lain
                </button>
              </div>
            </div>

            <div className="module-grid">
              {modules.map((module) => (
                <article className="module-card" key={module.id}>
                  <div className="module-topline">
                    <span>{module.badge}</span>
                    <strong>{module.minutes} min</strong>
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.summary}</p>
                  <ul>
                    {module.goals.map((goal) => (
                      <li key={goal}>{goal}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="section-panel">
            <div className="section-heading">
              <p className="eyebrow">Tracking</p>
              <h2>Checklist belajar</h2>
              <p>{nextTask ? `Langkah kecil berikutnya: ${nextTask.label}` : "Semua task utama selesai. Saatnya review dan ulangi quiz."}</p>
            </div>

            <div className="task-list">
              {studyTasks.map((task) => (
                <label className="task-item" key={task.id}>
                  <input checked={Boolean(progress.completedTasks[task.id])} type="checkbox" onChange={() => toggleTask(task.id)} />
                  <span>
                    <strong>{task.label}</strong>
                    <em>{task.module} · {task.xp} XP</em>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section id="gallery" className="section-panel">
            <div className="section-heading">
              <p className="eyebrow">Semua gambar</p>
              <h2>Galeri Kapitel 6</h2>
              <p>Halaman 64 sampai 81 sudah dipasang sebagai referensi visual. Tandai halaman setelah kamu baca.</p>
            </div>

            <div className="gallery-grid">
              {pageImages.map((page) => {
                const done = Boolean(progress.pagesRead[String(page.page)]);
                return (
                  <article className={`page-card ${done ? "done" : ""}`} key={page.page}>
                    <a href={page.src} target="_blank" rel="noreferrer">
                      <Image src={page.src} alt={`Halaman ${page.page}: ${page.title}`} width={720} height={1000} />
                    </a>
                    <div className="page-card-body">
                      <span>Seite {page.page}</span>
                      <h3>{page.title}</h3>
                      <p>{page.focus}</p>
                      <button className={done ? "done-button" : "ghost-button"} type="button" onClick={() => togglePage(page.page)}>
                        {done ? "Sudah dibaca" : "Tandai selesai"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="wortschatz" className="section-panel">
            <div className="section-heading">
              <p className="eyebrow">Wortschatz</p>
              <h2>Kosakata lengkap Kapitel 6</h2>
              <p>Kelompok kata dibuat dari topik buku: kerja, kereta, acara, telepon, dunia kerja modern, dan Feste.</p>
            </div>

            <div className="search-row">
              <input
                aria-label="Cari kosakata"
                placeholder="Cari kata Jerman atau arti Indonesia..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCardIndex(0);
                  setCardFlipped(false);
                }}
              />
              <span>{filteredWords.length} kata tampil</span>
            </div>

            <div className="vocab-groups">
              {vocabGroups.map((group) => {
                const visible = group.items.filter((item) => {
                  const query = search.trim().toLowerCase();
                  if (!query) return true;
                  return `${group.title} ${item.de} ${item.id}`.toLowerCase().includes(query);
                });
                if (!visible.length) return null;

                return (
                  <article className="vocab-group" key={group.title}>
                    <h3>{group.title}</h3>
                    <div className="vocab-table">
                      {visible.map((item) => {
                        const mastered = Boolean(progress.masteredWords[wordKey(item)]);
                        return (
                          <div className={`vocab-row ${mastered ? "mastered" : ""}`} key={`${group.title}-${item.de}`}>
                            <div>
                              <strong>{item.de}</strong>
                              <span>{item.id}</span>
                              {item.example ? <em>{item.example}</em> : null}
                            </div>
                            <button type="button" onClick={() => toggleWord(item)}>
                              {mastered ? "Hafal" : "Kunci"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="grammatik" className="section-panel">
            <div className="section-heading">
              <p className="eyebrow">Grammatik</p>
              <h2>Aturan inti Kapitel 6</h2>
              <p>Fokus utamanya Adjektivendungen, werden, wenn-Saetze, permintaan sopan, dan Aussprache m/n.</p>
            </div>

            <div className="grammar-grid">
              {grammarBlocks.map((block) => (
                <article className="grammar-card" key={block.title}>
                  <h3>{block.title}</h3>
                  <p>{block.rule}</p>
                  <div className="mini-table">
                    {block.rows.map((row) => (
                      <div className="mini-row" key={row.join("-")}>
                        {row.map((cell, index) => (
                          <span key={`${cell}-${index}`}>{cell}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                  <ul className="example-list">
                    {block.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                  {block.trap ? <p className="trap">{block.trap}</p> : null}
                </article>
              ))}
            </div>
          </section>

          <section id="redemittel" className="section-panel">
            <div className="section-heading">
              <p className="eyebrow">Redemittel</p>
              <h2>Kalimat siap pakai</h2>
              <p>Pakai blok ini untuk speaking drill: baca, tutup arti Indonesia, lalu jawab dengan variasi sendiri.</p>
            </div>

            <div className="phrase-grid">
              {phraseGroups.map((group) => (
                <article className="phrase-card" key={group.title}>
                  <h3>{group.title}</h3>
                  {group.rows.map((row) => (
                    <div className="phrase-row" key={`${group.title}-${row.de}`}>
                      {row.context ? <span>{row.context}</span> : null}
                      <strong>{row.de}</strong>
                      <em>{row.id}</em>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          </section>

          <section id="lesen" className="section-panel">
            <div className="section-heading">
              <p className="eyebrow">Lesen + Landeskunde</p>
              <h2>Ringkasan materi bacaan</h2>
              <p>Bagian ini merangkum teks panjang dengan kata sendiri supaya tetap belajar tanpa menyalin penuh isi buku.</p>
            </div>

            <div className="reading-grid">
              {readingBlocks.map((block) => (
                <article className="reading-card" key={block.title}>
                  <h3>{block.title}</h3>
                  <p>{block.summary}</p>
                  <ul>
                    {block.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <strong>{block.task}</strong>
                </article>
              ))}
            </div>
          </section>

          <section id="schreiben" className="section-panel writing-panel">
            <div className="section-heading">
              <p className="eyebrow">Schreiben</p>
              <h2>Latihan tulisan + AI koreksi</h2>
              <p>
                Tulis jawaban pendek dalam bahasa Jerman. Pakai tombol umlaut kalau keyboard kamu belum nyaman,
                lalu kirim untuk koreksi AI saat API key sudah aktif.
              </p>
            </div>

            <div className="writing-grid">
              <article className="writing-editor">
                <label htmlFor="writing-practice">Form kosong latihan menulis</label>
                <textarea
                  id="writing-practice"
                  ref={writingRef}
                  placeholder="Contoh: Ich arbeite gern im Team. Am Wochenende lerne ich Deutsch, weil ich eine Ausbildung machen moechte."
                  value={writingDraft}
                  onInput={(event) => {
                    setWritingDraft(event.currentTarget.value);
                    setWritingCorrection(null);
                    setWritingError("");
                  }}
                />

                <div className="umlaut-toolbar" aria-label="Shortcut huruf Jerman">
                  {umlautButtons.map((character) => (
                    <button className="ghost-button" key={character} type="button" onClick={() => insertUmlaut(character)}>
                      {character}
                    </button>
                  ))}
                </div>

                <div className="writing-actions">
                  <span>{writingDraft.trim().length} karakter</span>
                  <div className="button-row">
                    <button className="ghost-button" type="button" onClick={() => setWritingDraft("")}>
                      Kosongkan
                    </button>
                    <button className="primary-button" type="button" disabled={writingLoading} onClick={requestWritingCorrection}>
                      {writingLoading ? "Mengoreksi..." : "Koreksi AI"}
                    </button>
                  </div>
                </div>

                {writingError ? <p className="writing-error">{writingError}</p> : null}
              </article>

              <article className="writing-feedback">
                <div className="module-topline">
                  <span>Feedback</span>
                  <strong>{writingCorrection ? "Siap review" : "Menunggu tulisan"}</strong>
                </div>

                {writingCorrection ? (
                  <div className="feedback-stack">
                    <div className="feedback-block corrected">
                      <span>Versi dikoreksi</span>
                      <p>{writingCorrection.correctedText}</p>
                    </div>

                    <div className="feedback-block">
                      <span>Catatan utama</span>
                      <p>{writingCorrection.feedbackId}</p>
                    </div>

                    <div className="feedback-columns">
                      <div>
                        <h3>Yang sudah bagus</h3>
                        <ul>
                          {writingCorrection.strengths.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3>Latihan berikutnya</h3>
                        <ul>
                          {writingCorrection.nextPractice.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="correction-list">
                      {writingCorrection.corrections.map((item) => (
                        <div className="correction-item" key={`${item.original}-${item.corrected}`}>
                          <strong>{item.original}</strong>
                          <span>{item.corrected}</span>
                          <p>{item.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-feedback">
                    <h3>Mulai dari 2 sampai 5 kalimat</h3>
                    <p>
                      Coba tulis tentang pekerjaan, jadwal kereta, atau rencana Ausbildung. Koreksi AI nanti muncul di sini.
                    </p>
                  </div>
                )}
              </article>
            </div>
          </section>

          <section id="training" className="section-panel">
            <div className="section-heading">
              <p className="eyebrow">Training</p>
              <h2>Flashcards dan quiz</h2>
              <p>Setiap kartu yang kamu tandai hafal langsung masuk progress. Quiz memberi feedback cepat.</p>
            </div>

            <div className="training-grid">
              <article className="flashcard-panel">
                <div className="module-topline">
                  <span>{filteredWords.length ? `${cardIndex + 1}/${filteredWords.length}` : "0/0"}</span>
                  <strong>{masteredWords} hafal</strong>
                </div>
                {currentCard ? (
                  <>
                    <button
                      className={`flashcard ${cardFlipped ? "flipped" : ""}`}
                      type="button"
                      aria-pressed={cardFlipped}
                      onClick={() => setCardFlipped((value) => !value)}
                    >
                      <span className="flashcard-inner">
                        <span className="flashcard-face flashcard-front">
                          <span className="flashcard-kicker">{currentCard.group}</span>
                          <strong>{currentCard.de}</strong>
                          <em>Klik untuk lihat arti dan contoh</em>
                        </span>
                        <span className="flashcard-face flashcard-back">
                          <span className="flashcard-kicker">Arti Indonesia</span>
                          <strong>{currentCard.id}</strong>
                          <span className="flashcard-example">
                            <small>Contoh</small>
                            <span>{flashcardExample(currentCard)}</span>
                          </span>
                          <em>{currentCard.de}</em>
                        </span>
                      </span>
                    </button>
                    <div className="button-row">
                      <button
                        className="ghost-button"
                        type="button"
                        onClick={() => {
                          setCardIndex((value) => Math.max(value - 1, 0));
                          setCardFlipped(false);
                        }}
                      >
                        Sebelumnya
                      </button>
                      <button
                        className="ghost-button"
                        type="button"
                        onClick={() => {
                          setCardIndex((value) => Math.min(value + 1, filteredWords.length - 1));
                          setCardFlipped(false);
                        }}
                      >
                        Berikutnya
                      </button>
                      <button className="primary-button" type="button" onClick={() => toggleWord(currentCard)}>
                        {progress.masteredWords[wordKey(currentCard)] ? "Sudah hafal" : "Saya hafal"}
                      </button>
                    </div>
                  </>
                ) : (
                  <p>Tidak ada kartu untuk pencarian ini.</p>
                )}
              </article>

              <article className="quiz-panel">
                <div className="module-topline">
                  <span>Quiz</span>
                  <strong>{correctQuizzes}/{quizzes.length} benar</strong>
                </div>
                {quizzes.map((quiz) => {
                  const chosen = progress.quizAnswers[quiz.id];
                  return (
                    <div className="quiz-item" key={quiz.id}>
                      <h3>{quiz.question}</h3>
                      <div className="choice-grid">
                        {quiz.choices.map((choice, index) => {
                          const selected = chosen === index;
                          const correct = quiz.answer === index;
                          const answered = chosen !== undefined;
                          return (
                            <button
                              className={`${selected ? "selected" : ""} ${answered && correct ? "correct" : ""} ${
                                answered && selected && !correct ? "wrong" : ""
                              }`}
                              key={choice}
                              type="button"
                              onClick={() => answerQuiz(quiz.id, index)}
                            >
                              {choice}
                            </button>
                          );
                        })}
                      </div>
                      {chosen !== undefined ? <p className="explanation">{quiz.explanation}</p> : null}
                    </div>
                  );
                })}
              </article>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}

function Metric({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{helper}</em>
    </div>
  );
}

function ProgressBar({ label, value, detail }: { label: string; value: number; detail: string }) {
  return (
    <div className="progress-card">
      <div>
        <strong>{label}</strong>
        <span>{detail}</span>
      </div>
      <div className="bar-track" aria-label={`${label} ${value}%`}>
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}
