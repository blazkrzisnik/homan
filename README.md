# Kavarna Homan — spletna stran

Statična večstranska stran (vanilla HTML/CSS/JS): Python `build.py` predloga za skupni header/footer, Supabase kot backend za ponudbo in rezervacije (s fallback podatki, če Supabase ni povezan), interaktivni rezervacijski obrazec z animacijo izbire prostora.

## Strani
- `index.html` — Domov (zgodovina, podpisna sladica, časovnica)
- `ponudba.html` — Ponudba (kava / torte & slaščice / hrana), urejljivo prek admina
- `rezervacije.html` — Rezervacije (izbira prostora, datuma, ure, števila gostov)
- `admin.html` — skrit admin panel (ni v navigaciji): dodajanje ponudbe + pregled rezervacij

## Struktura
```
index.html, ponudba.html, rezervacije.html, admin.html
css/style.css
js/main.js            ← nav, scroll-reveal, menu tabi
js/supabase-config.js ← Supabase URL/ključ (vnesi svoje)
js/menu.js             ← nalaganje ponudbe (Supabase + fallback)
js/reservations.js     ← logika rezervacijskega obrazca
```
Izvorne predloge (za urejanje vsebine strani + `build.py`) so v ločeni mapi/zipu `homan-kavarna-viri`.

## Supabase nastavitev
1. Ustvari brezplačen Supabase projekt.
2. V SQL editorju ustvari tabele:

```sql
create table menu_items (
  id bigint generated always as identity primary key,
  category text not null,       -- 'kava' | 'slascice' | 'hrana'
  name text not null,
  description text,
  price text,
  created_at timestamptz default now()
);

create table reservations (
  id bigint generated always as identity primary key,
  area text not null,           -- 'notranjost' | 'lipa' | 'okno'
  area_label text,
  date date not null,
  time text not null,
  guests int not null,
  name text not null,
  phone text not null,
  email text not null,
  note text,
  status text default 'pending', -- 'pending' | 'confirmed' | 'cancelled'
  created_at timestamptz default now()
);

alter table menu_items enable row level security;
alter table reservations enable row level security;

create policy "Public read menu" on menu_items for select using (true);
-- Rezervacije: gostje smejo vstavljati vnose, brati/urejati pa naj lahko samo admin
create policy "Public insert reservations" on reservations for insert with check (true);
```
Ker `admin.html` trenutno dostopa do baze z anon ključem, za polno zaščito rezervacij (branje/urejanje/brisanje) razmisli o Supabase Auth namesto samo `select`/`update`/`delete` politik odprtih vsem — ali admin panel prestavi na stran, zaščiteno s pravim prijavnim sistemom.

3. V `js/supabase-config.js` vnesi svoj `SUPABASE_URL` in `SUPABASE_ANON_KEY`.
4. Dokler ni povezano, se na `ponudba.html` prikažejo vgrajeni (fallback) podatki iz `menu.js`; rezervacijski obrazec pa se v tem primeru odda prek Formspree (vnesi svoj `YOUR_FORM_ID` v `js/reservations.js`).

## Admin panel
`admin.html` ni v navigaciji. Geslo (`ADMIN_PASSWORD` v datoteki) je trenutno `homan2026` — **pred objavo ga zamenjaj**. Zaščita je samo kozmetična (client-side), za pravo varnost dodaj Supabase Auth.

## Deploy
Naloži vsebino te mape na Vercel (ali povleci direktno) — brezplačen tier zadošča.
