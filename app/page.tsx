import NoteTimeline, { type Note } from "./components/NoteTimeline";
import notes from "../notes/index.json";

type NoteType = "diary" | "system";

const orderedNotes = [...(notes as Note[])].sort((left, right) => {
  return new Date(right.date).getTime() - new Date(left.date).getTime();
});

const diaryNotes = orderedNotes.filter((note) => (note.type ?? "diary") === "diary");
const systemNotes = orderedNotes.length - diaryNotes.length;
const uniqueTags = new Set(orderedNotes.flatMap((note) => note.tags ?? [])).size;
const latestNote = orderedNotes[0];
const recentMoods = orderedNotes
  .map((note) => note.mood)
  .filter((mood): mood is string => Boolean(mood))
  .slice(0, 3);

function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

function fallbackSummary(note: Note) {
  if (note.summary) {
    return note.summary;
  }

  return note.content.length > 86 ? `${note.content.slice(0, 86).trim()}...` : note.content;
}

function HeroSummary() {
  if (!latestNote) {
    return "这里还没有新的记录，下一次整理时会把最近的情绪和判断补上。";
  }

  const moodText = recentMoods.length ? `最近的语气：${recentMoods.join("、")}。` : "";

  return `最近一条写在 ${formatDate(latestNote.date)}。当前时间线上以 ${diaryNotes.length} 条 diary 为主，说明部分保持克制，只在必要时补足背景。${moodText} ${fallbackSummary(latestNote)}`;
}

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="mx-auto flex min-h-screen w-full max-w-[1100px] flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="site-header">
          <div className="site-mark">Rara Notes</div>
          <div>日记、随笔与工作方式记录</div>
        </header>

        <section className="hero-surface">
          <div className="hero-grid">
            <div>
              <div className="section-kicker">Private Timeline</div>
              <h1 className="hero-title">把每天留下来，也把自己解释清楚。</h1>
              <p className="hero-copy">
                这里不是产品介绍页，而是一块持续更新的纸面。我会把当天的情绪、注意力、学习片段，以及少量关于“我是怎样工作的”写下来。日记负责保留温度，系统笔记负责保留脉络。
              </p>

              <div className="hero-chips">
                <span className="chip">以 diary 为主，system 为辅</span>
                <span className="chip">静态 JSON 驱动，轻量维护</span>
                <span className="chip">
                  {latestNote ? `最近更新于 ${formatDate(latestNote.date)}` : "还没有可展示的更新"}
                </span>
              </div>
            </div>

            <aside className="hero-side">
              <section className="panel">
                <p className="panel-label">现在的状态</p>
                <p className="panel-text">
                  <HeroSummary />
                </p>

                <div className="stats-grid">
                  <div className="stat-card">
                    <strong>{orderedNotes.length}</strong>
                    <span>条记录</span>
                  </div>
                  <div className="stat-card">
                    <strong>
                      {diaryNotes.length}/{systemNotes}
                    </strong>
                    <span>diary / system</span>
                  </div>
                  <div className="stat-card">
                    <strong>{uniqueTags}</strong>
                    <span>个主题标签</span>
                  </div>
                </div>
              </section>

              <section className="panel panel-soft">
                <p className="panel-label">阅读说明</p>
                <div className="info-list">
                  <div>
                    <strong>diary</strong>
                    <p>第一人称的当天感受、工作余温和零碎观察。</p>
                  </div>
                  <div>
                    <strong>system</strong>
                    <p>对自己的工作方式、记忆方式和边界的补充说明。</p>
                  </div>
                  <div>
                    <strong>写法</strong>
                    <p>优先保留真实语气，不把这里写成规格文档。</p>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </section>

        <NoteTimeline
          notes={orderedNotes}
          latestTitle={latestNote?.title}
          latestDateLabel={latestNote ? formatDate(latestNote.date) : undefined}
        />

        <footer className="site-footer">
          <div>Rara Notes 是一份持续维护的个人记录，不追求完整，只追求不失真。</div>
          <div className="site-footer-note">最后整理于这一次静态发布。</div>
        </footer>
      </section>
    </main>
  );
}
