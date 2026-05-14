import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import toast from "react-hot-toast";

import confetti from "canvas-confetti";

import Navbar from "../components/Navbar";

import ProblemDescription from "../components/ProblemDescription";

import OutputPanel from "../components/OutputPanel";

import CodeEditorPanel from "../components/CodeEditorPanel";

import { PROBLEMS } from "../data/problems";

import { executeCode } from "../lib/piston";

function ProblemPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] =
    useState("two-sum");

  const [selectedLanguage, setSelectedLanguage] =
    useState("javascript");

  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript
  );

  const [output, setOutput] = useState(null);

  const [isRunning, setIsRunning] =
    useState(false);

  const currentProblem =
    PROBLEMS[currentProblemId];

  useEffect(() => {

    if (id && PROBLEMS[id]) {

      setCurrentProblemId(id);

      setCode(
        PROBLEMS[id].starterCode[
          selectedLanguage
        ]
      );

      setOutput(null);

    }

  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {

    const newLang = e.target.value;

    setSelectedLanguage(newLang);

    setCode(
      currentProblem.starterCode[newLang]
    );

    setOutput(null);

  };

  const handleProblemChange = (
    newProblemId
  ) => {

    navigate(`/problem/${newProblemId}`);

  };

  const triggerConfetti = () => {

    confetti({
      particleCount: 100,
      spread: 200,
      origin: { x: 0.2, y: 0.5 },
    });

    confetti({
      particleCount: 100,
      spread: 200,
      origin: { x: 0.8, y: 0.5 },
    });

  };

  const normalizeOutput = (output) => {

    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");

  };

  const checkIfTestsPassed = (
    actualOutput,
    expectedOutput
  ) => {

    const normalizedActual =
      normalizeOutput(actualOutput);

    const normalizedExpected =
      normalizeOutput(expectedOutput);

    return (
      normalizedActual ===
      normalizedExpected
    );

  };

  const handleRunCode = async () => {

    setIsRunning(true);

    setOutput(null);

    const result = await executeCode(
      selectedLanguage,
      code
    );

    setOutput(result);

    setIsRunning(false);

    if (result.success) {

      const expectedOutput =
        currentProblem.expectedOutput[
          selectedLanguage
        ];

      const testsPassed =
        checkIfTestsPassed(
          result.output,
          expectedOutput
        );

      if (testsPassed) {

        triggerConfetti();

        toast.success(
          "All test cases passed!"
        );

      } else {

        toast.error(
          "Some test cases failed!"
        );

      }

    } else {

      toast.error(
        "Code execution failed!"
      );

    }

  };

  return (

    <div className="h-screen overflow-hidden bg-[#FFF7ED] flex flex-col">

      <Navbar />

      {/* MAIN */}

      <div className="flex-1 overflow-hidden pt-20">

        <PanelGroup direction="horizontal">

          {/* LEFT PANEL */}

          <Panel
            defaultSize={40}
            minSize={30}
          >

            <div className="h-full overflow-y-auto bg-white border-r border-orange-100">

              <ProblemDescription
                problem={currentProblem}
                currentProblemId={
                  currentProblemId
                }
                onProblemChange={
                  handleProblemChange
                }
                allProblems={Object.values(
                  PROBLEMS
                )}
              />

            </div>

          </Panel>

          {/* RESIZE HANDLE */}

          <PanelResizeHandle className="w-[3px] bg-orange-100 hover:bg-orange-300 transition-all duration-300" />

          {/* RIGHT PANEL */}

          <Panel
            defaultSize={60}
            minSize={30}
          >

            <PanelGroup direction="vertical">

              {/* EDITOR */}

              <Panel
                defaultSize={70}
                minSize={30}
              >

                <div className="h-full bg-[#FFF7ED] p-4">

                  <div className="h-full bg-white border border-orange-100 rounded-[30px] overflow-hidden shadow-sm">

                    <CodeEditorPanel
                      selectedLanguage={
                        selectedLanguage
                      }
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={
                        handleLanguageChange
                      }
                      onCodeChange={setCode}
                      onRunCode={
                        handleRunCode
                      }
                    />

                  </div>

                </div>

              </Panel>

              {/* HANDLE */}

              <PanelResizeHandle className="h-[3px] bg-orange-100 hover:bg-orange-300 transition-all duration-300" />

              {/* OUTPUT */}

              <Panel
                defaultSize={30}
                minSize={20}
              >

                <div className="h-full bg-[#FFF7ED] p-4 pt-0">

                  <div className="h-full bg-white border border-orange-100 rounded-[30px] overflow-hidden shadow-sm">

                    <OutputPanel
                      output={output}
                    />

                  </div>

                </div>

              </Panel>

            </PanelGroup>

          </Panel>

        </PanelGroup>

      </div>

    </div>

  );

}

export default ProblemPage;