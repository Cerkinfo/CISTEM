# CISTEM 
### Centralized Inventory and Supply Tracking for Event Management

## 👋 Introduction
CISTEM is a SaaS developed by Cerkinfo as part of its activities during [FOSDEM](https://fosdem.org).

## ℹ️ Technical
```
Language : Typescript
Framework (Client-side interface): React
PAckage Manager : Yarn
Database & Server-side logic : Supabase
```

## 💾 Initialisation
1. Clone this repo
2. Run ```yarn install```
3. Setup [Supabase](https://supabase.com) :
    - Be logged to your Supabase profile in a browser
    - Run ```npx supabase login``` in a terminal
    - Insert the code given in your browser into terminal + Enter
    - You're logged !
    - Run ```npx supabase link``` in a terminal
    - Choose your supabase project + Enter
    - Your Supabase environement is setuped !

### ❤️ If you're not a Cerkinfo dev
1. Before step 3, you must create a new empty Supabase project
2. After step 3 you must run ```npx supabase push``` to migrate the CISTEM structure to your own project.
3. WARNING : With the "DB Push" you will get the schema structure, but the tables will be empty! You will have to fill them in yourself.

### 💜 If you're a Cerkinfo dev
1. Before step 3, you must ask the President to give you the project Admin Account or add your own Supabase Account to the Team !

### ⚠️ WARNING
NEVER PUBLISH THE SUPABASE ANON KEY !! IS THE "GOD MODE KEY" \
IN GENERAL IF YOU USE IT, SORRY NOT SORRY YOU'RE CODE SUCKS. SECURE IT. \
IF YOU HAVE PUSH THE KEY BY MISTAKE, GO TO THE SUPABASE DASHBOARD AND REGENERATE THE KEY AND THEN REMOVE THE COMMIT (yes this repo is public, bots are faster than you, the priority is to change the key, then fix your bullshit).

## 💌 Contact
- Cerkinfo FOSDEM Manager : ```fosdem@cerkinfo.be```
- Cerkinfo Dev Manager : ```web@cerkinfo.be```