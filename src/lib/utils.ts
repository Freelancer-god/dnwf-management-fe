import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodNullable, ZodOptional, z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetcher<JSON>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  try {
    const response = await fetch(input, { ...init, cache: "no-store" });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Error: ${response.status} - ${response.statusText} - ${JSON.stringify(errorDetails)}`);
    }

    return response.json();
  } catch (error) {
    console.log("🚀 ~ error:", error);
    throw error;
  }
}

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function snakeToHumanReadable(snakeStr: string): string {
  // Split the string by underscores
  const words = snakeStr.split("_");

  // Capitalize the first letter of each word and join them with a space
  const humanReadable = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return humanReadable;
}

export const truncate = (str: string, num: number) => {
  if (!str) return "";
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
  try {
    const response = await fetch(`https://wsrv.nl/?url=${url}&w=50&h=50&blur=5`);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
};

export const placeholderBlurhash =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoJJREFUWEfFl4lu4zAMRO3cx/9/au6reMaOdkxTTl0grQFCRoqaT+SQotq2bV9N8rRt28xms87m83l553eZ/9vr9Wpkz+ezkT0ej+6dv1X81AFw7M4FBACPVn2c1Z3zLgDeJwHgeLFYdAARYioAEAKJEG2WAjl3gCwNYymQQ9b7/V4spmIAwO6Wy2VnAMikBWlDURBELf8CuN1uHQSrPwMAHK5WqwFELQ01AIXdAa7XawfAb3p6AOwK5+v1ugAoEq4FRSFLgavfQ49jAGQpAE5wjgGCeRrGdBArwHOPcwFcLpcGU1X0IsBuN5tNgYhaiFFwHTiAwq8I+O5xfj6fOz38K+X/fYAdb7fbAgFAjIJ6Aav3AYlQ6nfnDoDz0+lUxNiLALvf7XaDNGQ6GANQBKR85V27B4D3QQRw7hGIYlQKWGM79hSweyCUe1blXhEAogfABwHAXAcqSYkxCtHLUK3XBajSc4Dj8dilAeiSAgD2+30BAEKV4GKcAuDqB4TdYwBgPQByCgApUBoE4EJUGvxUjF3Q69/zLw3g/HA45ABKgdIQu+JPIyDnisCfAxAFNFM0EFNQ64gfS0EUoQP8ighrZSjn3oziZEQpauyKbfjbZchHUL/3AS/Dd30gAkxuRACgfO+EWQW8qwI1o+wseNuKcQiESjALvwNoMI0TcRzD4lFcPYwIM+JTF5x6HOs8yI7jeB5oKhpMRFH9UwaSCDB2Jmg4rc6E2TT0biIaG0rQhNqyhpHBcayTTSXH6vcDL7/sdqRK8LkwTsU499E8vRcAojHcZ4AxABdilgrp4lsXk8oVqgwh7+6H3phqd8J0Kk4vbx/+sZqCD/vNLya/5dT9fAH8g1WdNGgwbQAAAABJRU5ErkJggg==";

export const toDateString = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function capitalizeFirstLetter(words: string) {
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function wait<T>(callback: () => T | Promise<T>, timeout = 3000): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await callback();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, timeout);
  });
}

export function mergeArraysById(first, updates) {
  const result = [...first];

  updates.forEach((update) => {
    const index = result.findIndex((item) => item.id === update.id);
    if (index !== -1) {
      // Override existing object
      result[index] = update;
    } else {
      // Add new object
      result.push(update);
    }
  });

  return result;
}

export function unwrapZodSchema(schema) {
  while (schema instanceof ZodOptional || schema instanceof ZodNullable) {
    schema = schema.unwrap();
  }

  return schema;
}
