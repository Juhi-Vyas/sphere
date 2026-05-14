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

      <div className="sticky top-0 z-10 bg-[#FFF7ED]/95 backdrop-blur-md border-b border-orange-100 px-5 py-4">

        <div className="flex items-start justify-between gap-4">

          {/* LEFT */}

          <div className="flex-1 min-w-0">

            <h1 className="text-3xl lg:text-4xl font-black text-[#111827] leading-tight">

              {problem.title}

            </h1>

            <p className="text-orange-500 font-semibold mt-2 text-sm sm:text-base">

              {problem.category}

            </p>

          </div>

          {/* BADGE */}

          <span
            className={`badge border-0 px-4 py-3 font-semibold shadow-sm ${getDifficultyBadgeClass(
              problem.difficulty
            )}`}
          >

            {problem.difficulty}

          </span>

        </div>

        {/* SELECT */}

        <div className="mt-4">

          <select
            className="select w-full bg-white border border-orange-100 rounded-2xl text-[#111827] focus:outline-none focus:border-orange-300 shadow-sm"
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

                {p.title} -{" "}
                {p.difficulty}

              </option>

            ))}

          </select>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-4 sm:p-5 space-y-5">

        {/* DESCRIPTION */}

        <div className="bg-white border border-orange-100 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center">

              <span className="text-orange-500 font-black">

                D

              </span>

            </div>

            <h2 className="text-2xl font-black text-[#111827]">

              Description

            </h2>

          </div>

          <div className="space-y-4 text-gray-700 leading-8 text-[15px]">

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

        <div className="bg-white border border-orange-100 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">

              <span className="text-blue-500 font-black">

                E

              </span>

            </div>

            <h2 className="text-2xl font-black text-[#111827]">

              Examples

            </h2>

          </div>

          <div className="space-y-4">

            {problem.examples.map(
              (example, idx) => (

                <div
                  key={idx}
                  className="bg-[#FFF7ED] border border-orange-100 rounded-[24px] p-4"
                >

                  {/* TOP */}

                  <div className="flex items-center gap-3 mb-4">

                    <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">

                      {idx + 1}

                    </div>

                    <p className="font-bold text-[#111827]">

                      Example {idx + 1}

                    </p>

                  </div>

                  {/* CONTENT */}

                  <div className="space-y-3 font-mono text-sm">

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">

                      <span className="text-orange-500 font-bold sm:min-w-[70px]">

                        Input:

                      </span>

                      <span className="text-gray-700 break-all">

                        {example.input}

                      </span>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">

                      <span className="text-green-500 font-bold sm:min-w-[70px]">

                        Output:

                      </span>

                      <span className="text-gray-700 break-all">

                        {example.output}

                      </span>

                    </div>

                    {example.explanation && (

                      <div className="pt-3 border-t border-orange-100">

                        <span className="text-xs text-gray-500 leading-6 font-sans">

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

        <div className="bg-white border border-orange-100 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center">

              <span className="text-purple-500 font-black">

                C

              </span>

            </div>

            <h2 className="text-2xl font-black text-[#111827]">

              Constraints

            </h2>

          </div>

          <ul className="space-y-3">

            {problem.constraints.map(
              (constraint, idx) => (

                <li
                  key={idx}
                  className="flex items-start gap-3 text-gray-700"
                >

                  <span className="text-orange-500 font-bold mt-[2px]">

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