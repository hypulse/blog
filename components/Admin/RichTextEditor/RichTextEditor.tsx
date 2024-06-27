"use client";

import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Marked } from "marked";
import { editImage, onImageUpload } from "@/utils/editor-utils";
import { useEffect, useRef } from "react";
import { POST_STATES } from "@/utils/constants";

export default function RichTextEditor() {
  const editor = useRef<MdEditor>(null);

  useEffect(() => {
    window.onbeforeunload = () => {
      return "Are you sure you want to leave?";
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <>
      <MdEditor
        ref={editor}
        style={{ height: "500px" }}
        renderHTML={(text) => new Marked().parse(text)}
        onImageUpload={(file: File) =>
          onImageUpload(file).then((dataUrl) => editImage(dataUrl, 800, 600))
        }
      />
      <div className="flex justify-end">
        <div className="join">
          <select className="select select-bordered join-item">
            <option disabled selected>
              Select a state
            </option>
            {POST_STATES.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
          <button className="btn btn-primary join-item">Save</button>
        </div>
      </div>
    </>
  );
}
