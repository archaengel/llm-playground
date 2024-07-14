"use client";

import { Button, Grid, TextInput } from "@tremor/react";
import { useEffect, useState } from "react";
import { StopIcon, TrashIcon } from "@heroicons/react/outline";
import { Message, useChat } from "ai/react";

const initMessages: Message[] = [
  {
    id: "1",
    role: "system",
    content: "You are a ping pong machine",
  },
  {
    id: "2",
    role: "user",
    content: "Ping?",
  },
  {
    id: "3",
    role: "assistant",
    content: "Pong!",
  },
];

export default function Home() {
  const {
    handleSubmit,
    stop,
    input,
    handleInputChange,
    messages,
    setMessages,
    isLoading,
  } = useChat({ api: "/api/chat" });

  useEffect(() => {
    setMessages(initMessages);
  }, []);

  return (
    <div className="max-w-7xl mx-auto pt-10">
      {messages.map((message) => (
        <div
          key={`${message.id}`}
          className={`p-4 ${
            message.role == "user"
              ? ""
              : "bg-gray-50 border-t-2 border-b-2 border-gray-100"
          }`}
        >
          <>
            <div className="relative">
              <div className="absolute right-0">
                <Button
                  variant="light"
                  color="gray"
                  tooltip="Delete"
                  icon={TrashIcon}
                  onClick={() => {
                    setMessages(messages.filter((m) => m.id != message.id));
                  }}
                />
              </div>
            </div>
            {message.role == "system" && (
              <p className="text-xs font-bold">system</p>
            )}
            <div>
              <p className="text-sm text-gray-600">{message.content || ""}</p>
            </div>
          </>
        </div>
      ))}
      <div className="flex pt-2 space-x-2">
        <TextInput
          className="border-0 shadow-none"
          placeholder="Type something here..."
          value={input}
          onChange={handleInputChange}
        />
        {isLoading ? (
          <Button
            tooltip="Stop"
            icon={StopIcon}
            onClick={() => {
              stop();
            }}
          />
        ) : (
          <Button disabled={input.trim().length === 0} onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
