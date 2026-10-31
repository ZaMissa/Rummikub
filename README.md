# Rummikub Table

A Rummikub game for phones. Play **pass & play** on one device, or sit down at an **online
table** with friends — no account, no server to run, no sign-up. Install it to your home
screen and it works offline.

**Play now: https://zamissa.github.io/Rummikub/**

---

## Put it on your phone

1. Open **https://zamissa.github.io/Rummikub/** in Chrome.
2. Menu (⋮) → **Add to Home screen** → *Install*.
3. Launch it from the home screen. Full screen, own icon, plays offline.

Prefer one file? Grab **[`rummikub.html`](rummikub.html)** — the entire game in a single HTML
document. Open it in any browser from anywhere, no install and no network needed.

> Installing and offline play need `http(s)`. Opened straight from storage the game still
> plays — it just cannot be installed.

## Start a game

The **Home** screen asks for your name and offers three ways in:

- **Pass & play** — one phone, hands passed around.
- **Host online** — you create the table and share an invite (copy it, send it over
  WhatsApp, or send a **join link** that pre-fills everything).
- **Join online** — paste an invite, follow a link, or type the room code.

In pass & play, finish your turn and hand the phone over — the next hand stays hidden until
its owner taps to reveal it. Online, every phone sees only its own rack.

## Play

Tap tiles to select them, then **＋ Meld** to lay a new meld, or tap a meld's **＋ Add here**
to extend it. Groups are 3–4 tiles of one number in different colours; runs are 3 or more
consecutive numbers in one colour. Jokers stand in for any tile and hold their slot.

A line under your rack always tells you what the game expects next — *"Opening meld: play 30+
points…"*, *"Tap ＋ Meld to play these 3 tiles"*, *"All melds valid · end your turn when
ready"* — and turns red when a selection cannot be played. Once you have opened, you may
split and rearrange the whole table.

| Mode | Numbers | Jokers | Rack | Opening |
|---|---|---|---|---|
| **Standard** | 1–13 | 2 | 14 | 30 points |
| **Blitz · 2 jokers** | 1–7 | 2 | 7 | 15 points |
| **Blitz · 4 jokers** | 1–7 | 4 | 7 | 15 points |

Everyone at an online table plays the mode the host chose.

## What is in it

- **A table-first screen** — the felt gets the room, the rack sits below it in the flow (so
  the last meld is never covered), and the newest meld is outlined with a *"player · +N"* tag
  so you can see what just moved.
- **Arrange mode** — pick a tile, then tap the left or right half of another to place it
  exactly where you want. Full undo.
- **Rounds and scoring** — the round winner takes the value of everyone else's remaining
  tiles (a joker in hand counts 30); totals accumulate and the starting player rotates.
- **Match history and stats** — head-to-head record, rounds, draws, current streak and an
  all-time table, saved on your own device.
- **Saved games** — every table autosaves, with a rolling recovery snapshot so a crash or a
  closed tab does not cost you the game.
- **Your own look** — choose your stone and felt colours; in pass & play each player's choice
  returns on their turn.
- **Sound, vibration and flash cues** — toggle each, with a test button.
- **Backup codes** — export a table as a code or a `.rummi` file, optionally password
  protected, and import it on another phone.

## Privacy

- **Your hand is yours.** Online, the host sends each guest only a *projection*: your own
  rack. Other people's tiles, the pool order and the seat list are never sent to your phone.
- **Seats are protected.** A 4–8 digit PIN guards your seat, and it never leaves your device
  — a same-named impostor with the wrong PIN is refused.
- **The host cannot be forged.** Guests verify an ECDSA signature on every board, so nobody
  else in the room can impersonate the host.
- **Messages are encrypted.** Traffic goes through a public relay as AES-GCM ciphertext, and
  upgrades to direct peer-to-peer (WebRTC) when a channel is available.
- **Nothing is stored on a server.** There is no backend and no account: your stats, saves
  and backups live in your browser's storage on your phone.

Online play needs both players online at the same time over an encrypted relay connection.

## Notes

- This repository contains **the built game only** — the playable output of a private
  source tree. The build is versioned: the version this page was built from is **v0.41.43**
  and it is also shown on screen (☰ menu), so you can tell which build your phone is running.
- The app is installable/offline via a service worker; when a new version is published your
  phone picks it up on the next launch.
