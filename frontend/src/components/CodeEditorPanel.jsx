import Editor from "@monaco-editor/react";

import {
  Loader2Icon,
  PlayIcon,
} from "lucide-react";

import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {

  return (

    <div className="h-full bg-[#FFF7ED] flex flex-col p-1">

      {/* TOPBAR */}

      <div className="flex items-center justify-between px-3 py-2 bg-[#111827] rounded-t-[24px] border border-[#1F2937]">

        {/* LEFT */}

        <div className="flex items-center gap-3">

          

          <select
            className="px-2 py-1 rounded-xl bg-[#1F2937] border border-[#374151] text-white text-sm outline-none focus:border-orange-400 transition-all duration-300"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >

            {Object.entries(
              LANGUAGE_CONFIG
            ).map(([key, lang]) => (

              <option
                key={key}
                value={key}
              >

                {lang.name}

              </option>

            ))}

          </select>

        </div>

        {/* RUN BUTTON */}

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-[1.02] hover:opacity-95 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-300 disabled:opacity-60"
          disabled={isRunning}
          onClick={onRunCode}
        >

          {isRunning ? (

            <>

              <Loader2Icon className="size-3 animate-spin" />

              Running...

            </>

          ) : (

            <>

              <PlayIcon className="size-4" />

              Run Code

            </>

          )}

        </button>

      </div>

      {/* EDITOR */}

      <div className="flex-1 overflow-hidden rounded-b-[18px] border-x border-b border-[#1F2937] shadow-xl">

        <Editor
          height="100%"
          language={
            LANGUAGE_CONFIG[
              selectedLanguage
            ].monacoLang
          }
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{

            fontSize: 17,

            lineHeight: 28,

            fontFamily:
              "'Fira Code', monospace",

            padding: {
              top: 10,
            },

            lineNumbers: "on",

            scrollBeyondLastLine: false,

            automaticLayout: true,

            minimap: {
              enabled: false,
            },

            smoothScrolling: true,

            cursorBlinking: "smooth",

            cursorSmoothCaretAnimation:
              "on",

            roundedSelection: true,

            renderLineHighlight:
              "all",

            wordWrap: "on",

            tabSize: 2,

          }}
        />

      </div>

    </div>

  );

}

export default CodeEditorPanel;