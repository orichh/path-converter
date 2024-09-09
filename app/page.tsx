"use client";

import { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import {
  getLocalPathFromUncPath,
  getLocalStringPathFromUncPath,
  getUncPathFromLocalPath,
  getUncStringPathFromLocalPath,
} from "./helpers";

export default function Home() {
  const [originalPath, setOriginalPath] = useState<string>("");
  const [convertedPath, setConvertedPath] = useState<string>("");
  const [convertedStringPath, setConvertedStringPath] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [isUncPathToLocalPath, setIsUncPathToLocalPath] =
    useState<boolean>(true);
  const placeholder = isUncPathToLocalPath
    ? "\\\\localhost\\c$\\my\\path"
    : "C:\\my\\path";
  const convertedPlaceholder = isUncPathToLocalPath
    ? "C:\\my\\path"
    : "\\\\localhost\\c$\\my\\path";
  const convertedStringPlaceholder = isUncPathToLocalPath
    ? '"C:\\\\my\\\\path"'
    : '"\\\\\\\\localhost\\\\c$\\\\my\\\\path"';

  const handleConvert = (
    originalPath: string,
    isUncPathToLocalPath: boolean,
  ) => {
    if (!originalPath) {
      return;
    }

    setError("");

    try {
      const convertedPath = isUncPathToLocalPath
        ? getLocalPathFromUncPath(originalPath.replaceAll('"', ""))
        : getUncPathFromLocalPath(originalPath.replaceAll('"', ""));

      const convertedStringPath = isUncPathToLocalPath
        ? getLocalStringPathFromUncPath(originalPath.replaceAll('"', ""))
        : getUncStringPathFromLocalPath(originalPath.replaceAll('"', ""));

      setConvertedPath(convertedPath);
      setConvertedStringPath(`\"${convertedStringPath}\"`);
    } catch (err) {
      setError(
        "Something went wrong. Are you sure your input string is correct?",
      );
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOriginalPath(e.currentTarget.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-gray-700">PATH CONVERTER</h1>

      <div className="w-full flex justify-center space-x-5 text-gray-700">
        <span>{isUncPathToLocalPath ? "Unc Path" : "Local Path"}</span>
        <FontAwesomeIcon
          title={"Swap"}
          icon={faShuffle}
          size="xl"
          onClick={() => setIsUncPathToLocalPath(!isUncPathToLocalPath)}
          cursor={"pointer"}
        />
        <span>{isUncPathToLocalPath ? "Local Path" : "Unc Path"}</span>
      </div>

      <div className="text-red-500">{error}</div>

      <div className="w-full">
        <label className="text-gray-700 text-sm font-bold" htmlFor="uncPath">
          {isUncPathToLocalPath ? "Unc Path" : "Local Path"}
        </label>
        <textarea
          rows={4}
          wrap="hard"
          autoFocus={true}
          title={originalPath}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="uncPath"
          placeholder={placeholder}
          value={originalPath}
          onChange={handleTextChange}
        />
      </div>

      <div className="w-full">
        <label
          className="text-gray-700 text-sm font-bold"
          htmlFor="convertedPath"
        >
          {isUncPathToLocalPath ? "Local Path" : "UNC Path"}
        </label>
        <textarea
          wrap="hard"
          rows={4}
          title={convertedPath}
          disabled={true}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="convertedPath"
          value={convertedPath}
          placeholder={convertedPlaceholder}
        />

        <label
          className="text-gray-700 text-sm font-bold"
          htmlFor="convertedStringPath"
        >
          {isUncPathToLocalPath ? "Local String Path" : "UNC String Path"}
        </label>
        <textarea
          wrap="hard"
          rows={4}
          title={convertedStringPath}
          disabled={true}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="convertedStringPath"
          value={convertedStringPath}
          placeholder={convertedStringPlaceholder}
        />
      </div>

      <button
        title="convert"
        role="button"
        onClick={() => handleConvert(originalPath, isUncPathToLocalPath)}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        convert to {isUncPathToLocalPath ? "local path" : "unc path"}
      </button>
    </main>
  );
}
