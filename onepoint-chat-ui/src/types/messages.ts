export interface Message {
    id: string;
    text: string;
    type: "user" | "agent";
    timestamp: Date;
    clientId: string;
    chunk?: string;
}