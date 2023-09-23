"use client";
import { useState } from "react";
import { data } from "autoprefixer";

export default function Predict() {
  const [text, setText] = useState("Hellooo");
  const [prediction, setPrediction] = useState("neutral");
  const [isLoading, setIsLoading] = useState(false);
  async function analyse() {
    const input_phrase = text;
    setIsLoading(true);
    const data = await fetch(
      "https://laughing-guide-r554ppw9v7gfw749-5000.app.github.dev/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_phrase }),
      }
    );

    const json = await data.json();
    setPrediction(json.predicted_label);
    setIsLoading(false);
  }

  return (
    <div className=" h-screen w-screen overflow-hidden px-20 flex flex-col items-center">
      <div className="rounded-full absolute top-20 -left-40 w-80 h-80 bg-[#42057F] blur-3xl -z-10"></div>
      <div className="rounded-full absolute bottom-20 -right-40 w-80 h-80 bg-[#42057F] blur-3xl -z-10"></div>
      <h1 className="text-5xl mt-10 text-center">Sentiment Analyzer.ai</h1>
      <div className="w-full bg-[#42057f82] relative h-20 border border-[#dbbae382] my-4 rounded-full">
        <div className="w-[75px] h-20 invisible bg-gray-500 rounded-full"></div>

        <div
          className={`w-[75px] transition-all  h-20  absolute top-0 ${
            prediction == "neutral"
              ? " bg-[#833AC8] border-[#9E4DEA] border-2 shadow-[#9E4DEA] left-[calc(50%-37.5px)]"
              : null
          } ${
            prediction == "negative"
              ? " bg-[#D33D3D] border-[#F55B5B] border-2 shadow-[#F55B5B] ]"
              : null
          }
          ${
            prediction == "positive"
              ? " bg-[#3DD370] border-[#46C370] border-2 shadow-[#46C370] left-[calc(100%-75px)]"
              : null
          } shadow-lg drop-shadow-lg rounded-full`}
        >
          <svg
            className="absolute top-[25%] left-[25%]"
            width="37"
            height="19"
            viewBox="0 0 37 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="8.49996"
              cy="9.49993"
              rx="7.5"
              ry="9.5"
              transform="rotate(-8.37645 8.49996 9.49993)"
              fill="#272727"
            />
            <ellipse
              cx="29.2026"
              cy="9.50003"
              rx="7.5"
              ry="9.5"
              transform="rotate(16.5767 29.2026 9.50003)"
              fill="#272727"
            />
          </svg>
          <svg
            width="100"
            height="100"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-[20%] -right-[20%]"
          >
            <path
              d={`${prediction == "positive" ? "M30 60 Q50 80 70 60" : ""} ${
                prediction == "negative" ? "M30 70 Q50 60 70 70" : ""
              } ${prediction == "neutral" ? "M30 70 Q50 73 70 70" : ""}`}
              stroke="black"
              strokeWidth={2}
              fill="transparent"
            />
          </svg>
        </div>
      </div>
      <div
        className={`transition ${
          prediction == "neutral"
            ? " bg-[#833AC8] border-[#9E4DEA] border-2 shadow-[#9E4DEA] left-[calc(50%-37.5px)]"
            : null
        } ${
          prediction == "negative"
            ? " bg-[#D33D3D] border-[#F55B5B] border-2 shadow-[#F55B5B] ]"
            : null
        }
          ${
            prediction == "positive"
              ? " bg-[#3DD370] border-[#46C370] border-2 shadow-[#46C370] left-[calc(100%-75px)]"
              : null
          }} w-28 py-4 mb-8  mx-auto rounded-lg text-center`}
      >
        {prediction ? prediction : "result"}
      </div>
      <form
        className="w-full flex-col h-full flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          analyse();
        }}
      >
        <textarea
          id="textArea"
          name="textArea"
          className={`w-full max-w-xl z-10 ${
            isLoading && "opacity-25"
          } text-white p-4 bg-[#42057f82] border rounded-xl h-full max-h-[400px]`}
          placeholder="Place your text here ..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <button
          className="max-w-xl bg-[#6f2eafce] w-full rounded-md p-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
