import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const software = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/software" }),
  schema: z.object({
    软件名称: z.string(),
    英文名称: z.string(),
    类别: z.string(),
    价格: z.string(),
    开源: z.boolean(),
    平台: z.array(z.string()),
    平替: z.union([z.string(), z.array(z.string())]).optional().default(''),
    评分: z.number(),
    官网: z.string(),
    github: z.string().optional(),
    大小: z.string(),
    序号: z.number(),
    发布时间: z.string(),
    标签: z.array(z.string()),
    网盘: z.object({
      夸克: z.string().optional(),
      迅雷: z.string().optional(),
    }).optional(),
  }),
});

const tutorials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tutorials" }),
  schema: z.object({
    title: z.string(),
    software: z.string(),
    softwareSlug: z.string(),
    difficulty: z.string(),
    category: z.string(),
    order: z.number(),
    description: z.string(),
  }),
});

export const collections = { software, tutorials };
