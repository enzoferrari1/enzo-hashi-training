"use client";
import axios from "axios";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { suggestions } from "@/constants";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Flame } from "lucide-react";

interface TopicProps {
  formData: { title: string; topic: string };
  onHandleInputChange: (fieldName: string, fieldValue: any) => void;
}

function Topic({ formData, onHandleInputChange }: TopicProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const GenerateScript = async () => {
    const result = await axios.post("api/generate-script", {
      topic: formData.topic,
    });
    console.log(result.data);
  };

  return (
    <div className="px-2">
      <div className="pb-4">
        <h2 className="pb-1">Project title</h2>
        <Input
          placeholder="Enter project title"
          onChange={(event) => {
            onHandleInputChange("title", event.target.value);
          }}
        />
      </div>
      <div>
        <h2 className="">Video Topic</h2>
        <span className="text-gray-400 text-sm">
          Select topic for your video
        </span>
        <Tabs defaultValue="account" className="w-full py-3">
          <TabsList>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="your_topic">Your topic</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestions">
            <div className="">
              {suggestions.map((suggestion, index) => (
                <Button
                  variant={`${formData.topic == suggestion ? "secondary" : "outline"}`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChange("topic", suggestion);
                  }}
                  key={index}
                  className={`mr-2 mb-2 `}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your_topic">
            <h2 className="pb-1">Enter your topic</h2>
            <Textarea
              placeholder="Enter your topic here"
              onChange={(event) => {
                onHandleInputChange("topic", event.target.value);
              }}
            />
          </TabsContent>
        </Tabs>
        {formData.topic && (
          <Button className="mt-2" onClick={GenerateScript}>
            <Flame />
            Generate Script
          </Button>
        )}
      </div>
    </div>
  );
}

export default Topic;
