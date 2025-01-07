interface StreamCallbacks {
  onUpdate?: (data: any) => void;
  onClose?: (message: string) => void;
  onError?: (error: any) => void;
}

async function runLangflow(
  input: string,
  stream: boolean = false,
  callbacks?: StreamCallbacks,
) {
  const config = {
    baseURL: "https://api.langflow.astra.datastax.com",
    flowId: "4845febb-f9bc-4bb9-baf7-1e564e2d6d3a",
    langflowId: "3f85c6e3-66bf-4b59-a926-253cd5db180b",
    token:
      "AstraCS:KFnjksBFQbNPcFkkZCRsCvIo:16c81ac34496854710fbd612ce5929295283f16c0c492b35289b697869327fd1",
  };

  const url = `${config.baseURL}/lf/${config.langflowId}/api/v1/run/${config.flowId}?stream=${stream}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_value: input,
        input_type: "chat",
        output_type: "chat",
        tweaks: {
          "ChatInput-SvnAi": {},
          "ParseData-TiOM8": {},
          "Prompt-dDtnI": {},
          "SplitText-ZfVZD": {},
          "ChatOutput-nSLvh": {},
          "AstraDB-YNxAt": {},
          "AstraDB-oOalL": {},
          "File-FbLjc": {},
          "CohereEmbeddings-2n5y3": {},
          "CohereEmbeddings-NHgPp": {},
          "GoogleGenerativeAIModel-Tw4LZ": {},
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    if (stream && data.outputs?.[0]?.outputs[0]?.artifacts?.stream_url) {
      const streamUrl = data.outputs[0].outputs[0].artifacts.stream_url;
      const eventSource = new EventSource(streamUrl);

      eventSource.onmessage = (event) => {
        callbacks?.onUpdate?.(JSON.parse(event.data));
      };

      eventSource.onerror = (event) => {
        callbacks?.onError?.(event);
        eventSource.close();
      };

      eventSource.addEventListener("close", () => {
        callbacks?.onClose?.("Stream closed");
        eventSource.close();
      });

      return eventSource;
    }

    return data.outputs?.[0]?.outputs[0]?.artifacts?.message || "";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Example usage:
async function example() {
  // For regular response
  try {
    const response = await runLangflow(
      "How can you help me with data analysis?",
    );
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }

  // For streaming response
  try {
    await runLangflow("How can you help me with data analysis?", true, {
      onUpdate: (data) => console.log("Received:", data),
      onClose: (msg) => console.log("Closed:", msg),
      onError: (err) => console.error("Stream error:", err),
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// const response = await runLangflow("how can you help me with data analysis?");
// console.log(response);

export default runLangflow;
