import React from "react";
import { render, screen } from "@testing-library/react";
import JobList from "../components/JobList";
import { act } from "react-dom/test-utils";

interface MockedResponse extends Response {
  json: () => Promise<{ value: string }>;
}

describe("jobList", () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    globalThis.fetch = jest.fn((url) =>
      Promise.resolve({
        json: () =>
          Promise.resolve(
            url === "https://hacker-news.firebaseio.com/v0/jobstories.json"
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9]
              : {
                  by: "clemo_ra",
                  id: 40425039,
                  score: 1,
                  time: 1716274805,
                  title:
                    "Langfuse (YC W23) is hiring engineers in Berlin: open-source LLM devtool",
                  type: "job",
                  url: "https://github.com/langfuse/langfuse/blob/main/careers",
                },
          ),
      } as unknown as MockedResponse),
    );
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("Should render jobList component", () => {
    act(() => {
      render(<JobList />);
    });
    expect(screen.getByTestId("job-list")).toBeDefined();
  });

  it("Should render 6 job items", async () => {
    act(() => {
      render(<JobList />);
    });
    const list = await screen.findByTestId("rendered-list");
    expect(list.querySelectorAll("li")).toHaveLength(6);
  });
});
