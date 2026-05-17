import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {

  return (

    <div className="h-full overflow-y-auto bg-[#FFF7ED]">

      {/* HEADER */}

      <div className="sticky top-0 z-10 bg-[#FFF7ED]/95 backdrop-blur-md border-b border-orange-100 px-3 py-3">

        <div className="flex items-center gap-2">

          {/* SELECT */}

          <select
            className="flex-1 bg-white border border-orange-100 rounded-xl px-3 py-2 text-sm font-semibold text-[#111827] focus:outline-none focus:border-orange-300 shadow-sm"
            value={currentProblemId}
            onChange={(e) =>
              onProblemChange(e.target.value)
            }
          >

            {allProblems.map((p) => (

              <option
                key={p.id}
                value={p.id}
              >

                {p.title} • {p.difficulty}

              </option>

            ))}

          </select>

          {/* BADGE */}

          <span
            className={`badge border-0 px-2 py-1 text-[12px] font-semibold shadow-sm ${getDifficultyBadgeClass(
              problem.difficulty
            )}`}
          >

            {problem.difficulty}

          </span>

        </div>

        {/* CATEGORY */}

        <p className="text-orange-500 font-medium mt-2 text-[12px]">

          {problem.category}

        </p>

      </div>

      {/* CONTENT */}

      <div className="p-4 space-y-4">

        {/* DESCRIPTION */}

        <div className="bg-white border border-orange-100 rounded-[24px] p-4 shadow-sm">

          <div className="flex items-center gap-2 mb-3">

            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">

              <span className="text-orange-500 text-sm font-black">

                D

              </span>

            </div>

            <h2 className="text-sm font-bold text-[#111827]">

              Description

            </h2>

          </div>

          <div className="space-y-3 text-gray-700 leading-6 text-sm">

            <p>

              {problem.description.text}

            </p>

            {problem.description.notes.map(
              (note, idx) => (

                <p key={idx}>

                  {note}

                </p>

              )
            )}

          </div>

        </div>

        {/* EXAMPLES */}

        <div className="bg-white border border-orange-100 rounded-[24px] p-4 shadow-sm">

          <div className="flex items-center gap-2 mb-4">

            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">

              <span className="text-blue-500 text-sm font-black">

                E

              </span>

            </div>

            <h2 className="text-sm font-bold text-[#111827]">

              Examples

            </h2>

          </div>

          <div className="space-y-4">

            {problem.examples.map(
              (example, idx) => (

                <div
                  key={idx}
                  className="bg-[#FFF7ED] border border-orange-100 rounded-[20px] p-3"
                >

                  {/* TOP */}

                  <div className="flex items-center gap-2 mb-3">

                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold">

                      {idx + 1}

                    </div>

                    <p className="font-semibold text-sm text-[#111827]">

                      Example {idx + 1}

                    </p>

                  </div>

                  {/* CONTENT */}

                  <div className="space-y-2 font-mono text-sm">

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">

                      <span className="text-orange-500 font-bold sm:min-w-[60px]">

                        Input:

                      </span>

                      <span className="text-gray-700 break-all">

                        {example.input}

                      </span>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">

                      <span className="text-green-500 font-bold sm:min-w-[60px]">

                        Output:

                      </span>

                      <span className="text-gray-700 break-all">

                        {example.output}

                      </span>

                    </div>

                    {example.explanation && (

                      <div className="pt-2 border-t border-orange-100">

                        <span className="text-[12px] text-gray-500 leading-5 font-sans">

                          <span className="font-bold text-[#111827]">

                            Explanation:

                          </span>{" "}

                          {
                            example.explanation
                          }

                        </span>

                      </div>

                    )}

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* CONSTRAINTS */}

        <div className="bg-white border border-orange-100 rounded-[24px] p-4 shadow-sm">

          <div className="flex items-center gap-2 mb-4">

            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">

              <span className="text-purple-500 text-sm font-black">

                C

              </span>

            </div>

            <h2 className="text-sm font-bold text-[#111827]">

              Constraints

            </h2>

          </div>

          <ul className="space-y-2">

            {problem.constraints.map(
              (constraint, idx) => (

                <li
                  key={idx}
                  className="flex items-start gap-2 text-gray-700"
                >

                  <span className="text-orange-500 font-bold mt-[2px] text-sm">

                    •

                  </span>

                  <code className="text-sm break-all">

                    {constraint}

                  </code>

                </li>

              )
            )}

          </ul>

        </div>

      </div>

    </div>

  );

}

export default ProblemDescription;