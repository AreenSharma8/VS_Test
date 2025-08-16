// Defines node types using a config-driven factory to avoid duplicate code.

import React from 'react';
import { createNodeType } from './factory';

// Core four nodes (refactor of existing)

export const InputNode = createNodeType({
  type: 'customInput', // match your existing "type" used across the app
  label: 'Input',
  color: '#2563eb',
  defaults: { text: 'Enter text...' },
  handles: {
    // Inputs typically have an output only
    sources: [{ id: 'out', position: 'right' }],
  },
  controls: [
    { kind: 'textarea', key: 'text', label: 'Text', rows: 4, placeholder: 'Your prompt...' },
  ],
});

export const OutputNode = createNodeType({
  type: 'customOutput',
  label: 'Output',
  color: '#16a34a',
  handles: {
    // Outputs typically accept one input
    targets: [{ id: 'in', position: 'left' }],
  },
  renderBody: ({ data }) => (
    <div>
      <p className="node__text">Displays the final result.</p>
      {data.preview ? <pre className="node__text">{String(data.preview)}</pre> : null}
    </div>
  ),
});

export const LLMNode = createNodeType({
  type: 'llm',
  label: 'LLM',
  color: '#7c3aed',
  defaults: { model: 'gpt-3.5', temperature: 0.7 },
  handles: {
    targets: [{ id: 'prompt', position: 'left' }],
    sources: [{ id: 'completion', position: 'right' }],
  },
  controls: [
    {
      kind: 'select',
      key: 'model',
      label: 'Model',
      options: [
        { label: 'gpt-3.5', value: 'gpt-3.5' },
        { label: 'gpt-4', value: 'gpt-4' },
        { label: 'mixtral', value: 'mixtral' },
      ],
    },
    { kind: 'number', key: 'temperature', label: 'Temperature', min: 0, max: 1, step: 0.1, default: 0.7 },
  ],
});

export const TextNode = createNodeType({
  type: 'text',
  label: 'Text',
  color: '#0ea5e9',
  defaults: { operation: 'uppercase', content: '' },
  handles: {
    targets: [{ id: 'in', position: 'left' }],
    sources: [{ id: 'out', position: 'right' }],
  },
  controls: [
    {
      kind: 'select',
      key: 'operation',
      label: 'Operation',
      options: [
        { label: 'Uppercase', value: 'uppercase' },
        { label: 'Lowercase', value: 'lowercase' },
        { label: 'Trim', value: 'trim' },
      ],
    },
    { kind: 'textarea', key: 'content', label: 'Content', rows: 3, placeholder: 'Type text...' },
  ],
});

// Five new demonstration nodes

export const MathAddNode = createNodeType({
  type: 'mathAdd',
  label: 'Math: Add',
  color: '#fb923c',
  defaults: { a: 0, b: 0 },
  handles: {
    targets: [
      { id: 'a', position: 'left' },
      { id: 'b', position: 'left' },
    ],
    sources: [{ id: 'sum', position: 'right' }],
  },
  controls: [
    { kind: 'number', key: 'a', label: 'A', step: 1, default: 0 },
    { kind: 'number', key: 'b', label: 'B', step: 1, default: 0 },
  ],
  renderBody: ({ data }) => (
    <p className="node__text">Sum: {Number(data.a || 0) + Number(data.b || 0)}</p>
  ),
});

export const DelayNode = createNodeType({
  type: 'delay',
  label: 'Delay',
  color: '#22c55e',
  defaults: { ms: 500, passthrough: true },
  handles: {
    targets: [{ id: 'in', position: 'left' }],
    sources: [{ id: 'out', position: 'right' }],
  },
  controls: [
    { kind: 'number', key: 'ms', label: 'Delay (ms)', min: 0, step: 50, default: 500 },
    { kind: 'toggle', key: 'passthrough', label: 'Passthrough' },
  ],
});

export const HTTPRequestNode = createNodeType({
  type: 'httpRequest',
  label: 'HTTP Request',
  color: '#ef4444',
  defaults: { method: 'GET', url: '' },
  handles: {
    targets: [{ id: 'body', position: 'left' }],
    sources: [{ id: 'response', position: 'right' }],
  },
  controls: [
    {
      kind: 'select',
      key: 'method',
      label: 'Method',
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'DELETE', value: 'DELETE' },
      ],
    },
    { kind: 'text', key: 'url', label: 'URL', placeholder: 'https://api.example.com/...' },
  ],
});

export const SentimentNode = createNodeType({
  type: 'sentiment',
  label: 'Sentiment',
  color: '#8b5cf6',
  defaults: { provider: 'rule-based', showScore: true },
  handles: {
    targets: [{ id: 'text', position: 'left' }],
    sources: [{ id: 'score', position: 'right' }],
  },
  controls: [
    {
      kind: 'select',
      key: 'provider',
      label: 'Provider',
      options: [
        { label: 'Rule-based', value: 'rule-based' },
        { label: 'OpenAI', value: 'openai' },
        { label: 'HuggingFace', value: 'hf' },
      ],
    },
    { kind: 'toggle', key: 'showScore', label: 'Show score' },
  ],
});

export const FilterNode = createNodeType({
  type: 'filter',
  label: 'Filter',
  color: '#06b6d4',
  defaults: { condition: 'item.length > 3' },
  handles: {
    targets: [{ id: 'list', position: 'left' }],
    sources: [{ id: 'filtered', position: 'right' }],
  },
  controls: [
    {
      kind: 'text',
      key: 'condition',
      label: 'Condition (JS)',
      placeholder: 'e.g., item.value > 10',
    },
  ],
  renderBody: ({ data }) => (
    <p className="node__text">Condition: {data.condition}</p>
  ),
});