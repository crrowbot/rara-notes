"use client";

import { useEffect, useState } from "react";

type NoteType = "diary" | "system";

export type Note = {
  id: string;
  date: string;
  type?: NoteType;
  title: string;
  summary?: string;
  content: string;
  mood?: string;
  tags?: string[];
};

type NoteTimelineProps = {
  notes: Note[];
  latestTitle?: string;
  latestDateLabel?: string;
};

function typeLabel(type: NoteType) {
  return type === "system" ? "system note" : "daily note";
}

function fallbackSummary(note: Note) {
  if (note.summary) {
    return note.summary;
  }

  return note.content.length > 86 ? `${note.content.slice(0, 86).trim()}...` : note.content;
}

export default function NoteTimeline({
  notes,
  latestTitle,
  latestDateLabel
}: NoteTimelineProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeNote = notes.find((note) => note.id === activeId) ?? null;

  useEffect(() => {
    if (!activeNote) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeNote]);

  return (
    <>
      <section className="mt-9">
        <div className="timeline-head">
          <div>
            <h2 className="timeline-title">最近留下的内容</h2>
            <p className="timeline-copy">点击任意一条记录，在悬浮窗口里展开完整内容。</p>
          </div>
          <p className="timeline-meta">
            {latestTitle && latestDateLabel
              ? `最近一条是「${latestTitle}」，写于 ${latestDateLabel}。`
              : "当前时间线上还没有内容。"}
          </p>
        </div>

        <ul className="note-list">
          {notes.map((note) => {
            const type = note.type ?? "diary";

            return (
              <li key={note.id} className={`note-card ${type === "system" ? "note-system" : "note-diary"}`}>
                <button
                  type="button"
                  className="note-button note-inner"
                  onClick={() => setActiveId(note.id)}
                  aria-haspopup="dialog"
                  aria-expanded={activeNote?.id === note.id}
                >
                  <div className="note-topline">
                    <span className={`type-pill ${type === "system" ? "type-system" : ""}`}>
                      {typeLabel(type)}
                    </span>
                    {note.mood ? <span className="mood-pill">{note.mood}</span> : null}
                    <time>{note.date}</time>
                  </div>

                  <div className="note-heading-row">
                    <h3 className="note-title">{note.title}</h3>
                    <span className="expand-pill" aria-hidden="true">
                      打开
                    </span>
                  </div>
                  <p className="note-summary">{fallbackSummary(note)}</p>

                  {note.tags?.length ? (
                    <div className="tag-row">
                      {note.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {activeNote ? (
        <div
          className="note-modal-overlay"
          role="presentation"
          onClick={() => setActiveId(null)}
        >
          <div
            className="note-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="note-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="note-modal-head">
              <div className="note-topline">
                <span
                  className={`type-pill ${(activeNote.type ?? "diary") === "system" ? "type-system" : ""}`}
                >
                  {typeLabel(activeNote.type ?? "diary")}
                </span>
                {activeNote.mood ? <span className="mood-pill">{activeNote.mood}</span> : null}
                <time>{activeNote.date}</time>
              </div>

              <button
                type="button"
                className="note-modal-close"
                onClick={() => setActiveId(null)}
                aria-label="关闭"
              >
                关闭
              </button>
            </div>

            <h3 id="note-modal-title" className="note-modal-title">
              {activeNote.title}
            </h3>
            <p className="note-modal-summary">{fallbackSummary(activeNote)}</p>
            <div className="note-modal-content">{activeNote.content}</div>

            {activeNote.tags?.length ? (
              <div className="tag-row">
                {activeNote.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
