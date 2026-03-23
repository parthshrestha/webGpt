# WebGPT

WebGPT is a browser-based AI assistant built as a Chrome extension that lets users ask questions without leaving their current tab.  
The goal is to make ChatGPT-style help feel faster and more integrated into everyday browsing by keeping the assistant available in a lightweight popup interface.

---

## Overview

WebGPT was built to create a smoother browsing workflow for users who want quick AI assistance while researching, writing, debugging, or learning online.

Instead of opening a separate AI website in another tab, WebGPT brings the experience directly into the browser through an extension popup. The long-term vision is to support:
- quick question answering
- productivity assistance
- debugging help
- screenshot-based help
- a free usage tier with optional paid expansion later

---

## Features

- Chrome extension popup for quick access
- Ask questions without switching tabs
- Lightweight browser-based AI assistant experience
- React-based frontend for the extension UI
- FastAPI backend for handling AI requests
- Supabase integration for backend services and future user/account support
- Planned free-tier request limits
- Designed for future screenshot/debugging support

---

## Why I Built It

WebGPT was created to solve a simple but real problem: constantly switching tabs to use AI tools breaks focus.

This project explores how AI can be built into the browser workflow more naturally by making help accessible exactly where users are already working. It also serves as a hands-on project for learning:
- Chrome extension architecture
- React-based UI design
- FastAPI backend development
- Supabase integration
- AI product workflow design

---

## Tech Stack

### Frontend
- React
- JavaScript
- HTML
- CSS

### Backend
- Python
- FastAPI

### Platform / Services
- Supabase
- Chrome Extension APIs

### Future Integrations
- AI model API integration
- screenshot capture and analysis
- usage limits / billing system

---

## Planned User Experience

1. User opens the WebGPT extension in the browser
2. A popup interface appears
3. The user types a question
4. The extension sends the request to the backend
5. The backend processes the request and returns a response
6. The user gets help without leaving the page they were on

Long term, WebGPT may also support:
- page-aware assistance
- screenshot-based debugging help
- freemium usage limits
- richer productivity features

---

## Project Goals

- Make AI assistance easier to access during browsing
- Reduce friction caused by tab-switching
- Learn how browser extensions work end-to-end
- Build a practical product with real user value
- Explore how AI can fit naturally into browser workflows

---

## Architecture

```text
User
  ↓
Chrome Extension Popup (React)
  ↓
Extension Request Handler
  ↓
FastAPI Backend
  ↓
AI / Business Logic
  ↓
Supabase / Storage / Future User Data
  ↓
Response back to extension popup
