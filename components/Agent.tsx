"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface InterviewDetails {
  role: string;
  level: string;
  type: string;
  techstack: string[];
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [interviewDetails, setInterviewDetails] = useState<InterviewDetails>({
    role: "",
    level: "",
    type: "Technical",
    techstack: [],
  });
  const [showForm, setShowForm] = useState(type === "generate");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    const handleGenerateInterview = async (messages: SavedMessage[]) => {
      try {
        // Extract questions from the transcript
        const questions = messages
          .filter(msg => msg.role === "assistant")
          .map(msg => msg.content)
          .filter(content => content.includes("?"))
          .map(content => content.split("?").map(q => q.trim()).filter(Boolean))
          .flat();

        // Save the interview data
        const response = await fetch("/api/vapi/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: interviewDetails.type,
            role: interviewDetails.role,
            level: interviewDetails.level,
            techstack: interviewDetails.techstack.join(","),
            amount: questions.length,
            userid: userId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save interview");
        }

        router.push("/");
      } catch (error) {
        console.error("Error saving generated interview:", error);
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        handleGenerateInterview(messages);
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId, interviewDetails]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    let formattedQuestions = "";
    if (type === "generate") {
      // For generate type, we'll use a default set of questions
      formattedQuestions = `- Tell me about yourself and your experience
- What are your strengths and weaknesses?
- Why are you interested in this role?
- Where do you see yourself in 5 years?
- What is your expected salary?`;
    } else if (questions) {
      formattedQuestions = questions
        .map((question) => `- ${question}`)
        .join("\n");
    }

    try {
      // Create a copy of the interviewer object to ensure it's properly structured
      const assistant = {
        ...interviewer,
        name: interviewer.name || "Interviewer",  // Ensure name is always set
      };

      await vapi.start(assistant, {
        variableValues: {
          questions: formattedQuestions,
          username: userName || "Candidate",  // Provide a default if userName is undefined
          userid: userId || "",  // Provide a default if userId is undefined
        },
      });
    } catch (error) {
      console.error("Error starting call:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    handleCall();
  };

  if (showForm) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-4">
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Role
          </label>
          <input
            type="text"
            id="role"
            value={interviewDetails.role}
            onChange={(e) => setInterviewDetails(prev => ({ ...prev, role: e.target.value }))}
            className="w-full p-2 rounded border"
            placeholder="e.g., Frontend Developer"
            required
          />
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium mb-1">
            Level
          </label>
          <select
            id="level"
            value={interviewDetails.level}
            onChange={(e) => setInterviewDetails(prev => ({ ...prev, level: e.target.value }))}
            className="w-full p-2 rounded border"
            required
          >
            <option value="">Select level</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-1">
            Type
          </label>
          <select
            id="type"
            value={interviewDetails.type}
            onChange={(e) => setInterviewDetails(prev => ({ ...prev, type: e.target.value }))}
            className="w-full p-2 rounded border"
            required
          >
            <option value="Technical">Technical</option>
            <option value="Behavioral">Behavioral</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <div>
          <label htmlFor="techstack" className="block text-sm font-medium mb-1">
            Tech Stack (comma-separated)
          </label>
          <input
            type="text"
            id="techstack"
            value={interviewDetails.techstack.join(", ")}
            onChange={(e) => setInterviewDetails(prev => ({ 
              ...prev, 
              techstack: e.target.value.split(",").map(tech => tech.trim()).filter(Boolean)
            }))}
            className="w-full p-2 rounded border"
            placeholder="e.g., React, TypeScript, Node.js"
            required
          />
        </div>

        <button type="submit" className="btn-primary mt-4">
          Start Interview
        </button>
      </form>
    );
  }

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
