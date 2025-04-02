"use client";
import axios from "axios";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { suggestions } from "@/constants";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Flame, Loader2Icon } from "lucide-react";
import { FormData } from "../page";

interface TopicProps {
  formData: FormData;
  onHandleInputChange: (fieldName: string, fieldValue: any) => void;
}

function Topic({ formData, onHandleInputChange }: TopicProps) {
  const [scripts, setScripts] = useState<Array<{ content: string }> | null>(
    null
  );
  const [error, setError] = useState<string | null | unknown>(null);
  const [loadingScript, setLoadingScript] = useState(false);
  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number | null>(
    null
  );

  const GenerateScript = async () => {
    try {
      setLoadingScript(true);
      const result = await axios.post("api/generate-script", {
        topic: formData.topic,
      });
      setScripts(result.data?.scripts);
      console.log(result.data);
      setLoadingScript(false);
    } catch (error) {
      setError(error);
      setLoadingScript(false);
      console.log(error);
    }
  };

  return (
    <div className="">
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
          <Button
            className="mt-2"
            onClick={() => {
              GenerateScript();
            }}
            disabled={loadingScript}
          >
            {loadingScript ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Flame />
            )}
            Generate Script
          </Button>
        )}

        {scripts && scripts?.length > 0 && (
          <div className="mt-4">
            <h2>Select the script</h2>
            <div className="grid grid-cols-2 p-2 gap-5">
              {scripts.map((script, index) => (
                <div
                  className={`p-3 border rounded-lg mt-1 ${index == selectedScriptIndex && "bg-secondary border-white"}`}
                  key={index}
                  onClick={() => {
                    setSelectedScriptIndex(index);
                    onHandleInputChange("script", script);
                  }}
                >
                  <h2 className="line-clamp-4 text-gray-300 text-sm">
                    {script.content}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topic;
