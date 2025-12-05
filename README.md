# 📦 aks-template-gen

A powerful interactive CLI tool to generate full-stack project templates in seconds.  
Built with **Commander.js** & **Inquirer.js**, supporting multiple frameworks and optional features like **TypeScript, Docker, and Prisma**.

---

## ✨ Features

- 🚀 Create new projects instantly  
- 🧩 Interactive prompts for:
  - Project name
  - Framework selection
  - Feature selection
- 📦 Supports React, Next.js, Vue, and Svelte
- 🔧 Optional features:
  - TypeScript  
  - Tailwind CSS  
  - Docker  
  - Prisma ORM  
- 📁 Template-based project generation
- 📝 Auto-generates `cli.config.json`
- ⚙ Skip installation using `--no-install`

---

## 📥 Installation

Install globally:

```sh
npm install -g aks-template-gen
```

## 🚀 Usage

```sh
aks-template-gen
```

---

## 📝 Auto-generates `cli.config.json`

```json
{
  "projectName": "my-app",
  "framework": "React",
  "features": [
    "TypeScript"
  ],
  "installDeps": true,
  "template": "react"
}
```

---

## 📦 Template-based project generation

```sh
aks-template-gen --template react
```
