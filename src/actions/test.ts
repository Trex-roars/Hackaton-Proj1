type Tweaks = Record<string, Record<string, any>>;

interface MessageResponse {
    text: string;
    sender: string;
    sender_name: string;
    timestamp: string;
    session_id: string;
    flow_id: string;
    error: boolean;
}

interface OutputResponse {
    outputs: [
        {
            outputs: [
                {
                    results: {
                        message: MessageResponse;
                    };
                }
            ];
        }
    ];
}

class LangflowClient {
    baseURL: string;
    applicationToken: string;

    constructor(baseURL: string, applicationToken: string) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }

    async post<T>(endpoint: string, body: Record<string, any>, headers: Record<string, string> = {"Content-Type": "application/json"}): Promise<T> {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        headers["Content-Type"] = "application/json";
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(errorResponse)}`);
            }

            return await response.json();
        } catch (error: any) {
            console.error('Request Error:', error.message);
            throw error;
        }
    }

    async initiateSession(flowId: string, langflowId: string, inputValue: string, inputType: string = 'chat', outputType: string = 'chat', stream: boolean = false, tweaks: Tweaks = {}): Promise<OutputResponse> {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post<OutputResponse>(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
    }

    async runFlowAndGetTextResponse(flowId: string, langflowId: string, inputValue: string, inputType: string = 'chat', outputType: string = 'chat', tweaks: Tweaks = {}): Promise<string> {
        try {
            const initResponse = await this.initiateSession(flowId, langflowId, inputValue, inputType, outputType, false, tweaks);
            // console.log('Init Response:', initResponse);

            const message = initResponse.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
            if (message) {
                return message;
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error: any) {
            console.error('Error running flow:', error.message);
            throw error;
        }
    }
}

async function getResponseFromLangflow(inputText: string): Promise<string> {
    const flowId = 'f5e8d938-cf8d-4752-b2c2-788f63d5b6a2';
    const langflowId = 'dd6ae453-ebbf-4937-9335-bbfba093e08a';
    const applicationToken = 'AstraCS:UwcgTkdjrXmXqmOIHMeBlIFm:b642f2e49f113754d04c2ac15c2b9ddf1bc6606c3deb3d9f5d1c17dd0b75696d'; // Replace with your actual token
    const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

    try {
        const tweaks: Tweaks = {
            "ChatInput-fp6aY": {},
            "ParseData-dRwVZ": {},
            "Prompt-QUjxP": {},
            "SplitText-1C1g1": {},
            "ChatOutput-9qnMc": {},
            "AstraDB-rAA5Q": {},
            "AstraDB-9mcDn": {},
            "File-XKL7f": {},
            "CohereEmbeddings-42Q9k": {},
            "CohereEmbeddings-VWBFu": {},
            "GoogleGenerativeAIModel-RGWtv": {}
        };

        const responseText = await langflowClient.runFlowAndGetTextResponse(flowId, langflowId, inputText, 'chat', 'chat', tweaks);
        // console.log('Final Output:', responseText);
        return responseText;
    } catch (error: any) {
        console.error('Error getting response:', error.message);
        throw error;
    }
}



// Example usage
(async () => {
    const userInput = "Tell me like i am thinking to post something on social media what type of content should i post";
    try {
        const response = await getResponseFromLangflow(userInput);
        console.log('Response:', response);
    } catch {
        console.error('Failed to get response from Langflow');
    }
})();
