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

const STORAGE_KEY = "deutsch-kapitel-6-progress-v1";

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
  ["#plan", "Plan"],
  ["#gallery", "Gambar"],
  ["#wortschatz", "Wortschatz"],
  ["#grammatik", "Grammatik"],
  ["#redemittel", "Redemittel"],
  ["#lesen", "Lesen"],
  ["#training", "Training"],
];

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

export default function Home() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    if (typeof window === "undefined") return defaultProgress;
    return mergeProgress(window.localStorage.getItem(STORAGE_KEY));
  });
  const [toast, setToast] = useState<Toast | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [timer, setTimer] = useState(120);
  const [timerRunning, setTimerRunning] = useState(false);
  const rewardCursor = useRef(0);

  const allWords = useMemo(
    () => vocabGroups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title }))),
    [],
  );

  const filteredWords = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return allWords;
    return allWords.filter((item) => `${item.de} ${item.id} ${item.group}`.toLowerCase().includes(query));
  }, [allWords, search]);

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

  const showToast = useCallback((text: string) => {
    const id = Date.now();
    setToast({ text, id });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2600);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (!timerRunning) return;

    const interval = window.setInterval(() => {
      setTimer((value) => {
        if (value <= 1) {
          window.clearInterval(interval);
          setTimerRunning(false);
          showToast("Sprint 2 menit selesai. Tandai satu tugas kecil sekarang.");
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [showToast, timerRunning]);

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

  function resetTimer() {
    setTimer(120);
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
              <div className="focus-box">
                <span className="timer">{formatTimer(timer)}</span>
                <div>
                  <h3>2-Minuten-Start</h3>
                  <p>Mulai dari durasi yang terlalu kecil untuk ditolak.</p>
                </div>
                <div className="button-row">
                  <button className="primary-button" type="button" onClick={() => setTimerRunning((value) => !value)}>
                    {timerRunning ? "Pause" : "Start"}
                  </button>
                  <button className="ghost-button" type="button" onClick={resetTimer}>
                    Reset
                  </button>
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
              <p>{nextTask ? `Next tiny action: ${nextTask.label}` : "Semua task utama selesai. Saatnya review dan ulangi quiz."}</p>
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
                    <button className={`flashcard ${cardFlipped ? "flipped" : ""}`} type="button" onClick={() => setCardFlipped((value) => !value)}>
                      <span>{cardFlipped ? currentCard.id : currentCard.de}</span>
                      <em>{cardFlipped ? currentCard.de : "Balik kartu"}</em>
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
