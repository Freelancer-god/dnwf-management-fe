"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/components/modal/provider";

export function CardWrapper({ formId, children }: { formId: string; children: React.ReactNode }) {
  const modal = useModal();

  return (
    <Card className="min-w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[60vh] overflow-y-auto">{children}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => modal?.hide()}>
          Cancel
        </Button>
        <Button type="submit" form={formId}>
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
