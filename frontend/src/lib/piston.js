const PISTON_API =
  "https://emkc.org/api/v2/piston/execute";

const LANGUAGE_VERSIONS = {

  javascript: {
    language: "javascript",
    version: "18.15.0",
  },

  python: {
    language: "python",
    version: "3.10.0",
  },

  java: {
    language: "java",
    version: "15.0.2",
  },

};

/**
 * Execute code
 */
export async function executeCode(
  language,
  code
) {

  try {

    const languageConfig =
      LANGUAGE_VERSIONS[
        language
      ];

    if (!languageConfig) {

      return {
        success: false,
        error:
          `Unsupported language: ${language}`,
      };

    }

    const response =
      await fetch(
        PISTON_API,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            language:
              languageConfig.language,

            version:
              languageConfig.version,

            files: [
              {
                content: code,
              },
            ],

          }),

        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      return {

        success: false,

        error:
          data.message ||
          `HTTP error! status: ${response.status}`,

      };

    }

    const output =
      data.run?.output || "";

    const stderr =
      data.run?.stderr || "";

    if (stderr) {

      return {

        success: false,

        output,

        error: stderr,

      };

    }

    return {

      success: true,

      output:
        output || "No output",

    };

  } catch (error) {

    return {

      success: false,

      error:
        `Failed to execute code: ${error.message}`,

    };

  }

}