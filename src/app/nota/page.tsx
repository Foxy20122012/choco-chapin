"use client";

import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";
import { useNotes } from "@/context/NoteContext";
import { useEffect } from "react";

function HomePage() {
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center h-screen ml-96">
        <div >
          <NoteForm />
          {notes.map((note) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
