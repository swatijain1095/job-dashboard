import React from "react";
import JobItem from "../components/JobItem";
import { render, screen, waitFor } from "@testing-library/react";
import { getFormattedTime } from "../utils";

interface MockedResponse extends Response {
  json: () => Promise<{ value: string }>;
}

const jobDetailObj = {
  by: "clemo_ra",
  id: 40425039,
  score: 1,
  time: 1716274805,
  title:
    "Langfuse (YC W23) is hiring engineers in Berlin: open-source LLM devtool",
  type: "job",
  url: "https://github.com/langfuse/langfuse/blob/main/careers",
};

describe("JobItem", () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(jobDetailObj),
        // Add other properties that `Response` expects
      } as unknown as MockedResponse),
    );
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("Should show job details", async () => {
    render(<JobItem jobId={40425039} />);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://hacker-news.firebaseio.com/v0/item/40425039.json",
    );
    await waitFor(() => {
      expect(screen.getByText(jobDetailObj.title)).toBeDefined();
      expect(screen.getByText(`by ${jobDetailObj.by}`)).toBeDefined();
      expect(
        screen.getByText(getFormattedTime(jobDetailObj.time)),
      ).toBeDefined();
    });
  });
});
