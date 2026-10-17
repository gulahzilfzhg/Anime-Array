#!/usr/bin/env node
/**
 * check-data.mjs
 *
 * Cross-validates the machine-readable data in data/ against the prose in docs/.
 *
 * This exists to enforce a rule the project already claims to follow. In
 * guides/ai-visibility.md we state that a stale count is the single most
 * damaging kind of error this content can contain, because an assistant asked
 * "how many characters?" will pick one of two contradicting numbers and there
 * is no way to predict which. Claiming to prevent that while not actually
 * checking would be worse than not claiming it.
 *
 * So: counts, names and tool lists are verified against the pages that state
 * them, and any disagreement fails the build.
 *
 * Also verifies that nothing operational has been committed into the data files.
 *
 * Run:  node tools/check-data.mjs
 * Exit: 0 clean, 1 problems found.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');
const DOCS = path.join(ROOT, 'docs');

const problems = [];
const fail = (m) => problems.push(m);

/** Strip tags so we are comparing against what a reader sees, not markup. */
function textOf(file) {
    const html = fs.readFileSync(path.join(DOCS, file), 'utf8');
    return html.replace(/<[^>]+>/g, ' ');
}

/** Strip a UTF-8 BOM. Editors on Windows add one silently, and it makes
 *  perfectly valid JSON fail to parse with a baffling error. */
function readJson(p) {
    return JSON.parse(fs.readFileSync(p, 'utf8').replace(/^﻿/, ''));
}

function load(name) {
    const p = path.join(DATA, name);
    if (!fs.existsSync(p)) { fail(`data/${name} is missing`); return null; }
    try { return readJson(p); }
    catch (e) { fail(`data/${name} does not parse: ${e.message}`); return null; }
}

// Number-to-word, so a count can be checked in both written and digit form.
const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12 };
const NUMWORD = Object.fromEntries(Object.entries(WORDS).map(([w, n]) => [n, w]));

console.log('Cross-validating data/ against docs/\n');

// ---------------------------------------------------------------------------
// characters.json
// ---------------------------------------------------------------------------

const characters = load('characters.json');

if (characters) {
    const list = characters.characters || [];

    if (list.length !== characters.count) {
        fail(`characters.json declares count ${characters.count} but contains ${list.length} entries`);
    }

    // Required shape
    for (const c of list) {
        for (const field of ['id', 'name', 'series', 'role', 'temperament', 'url']) {
            if (!c[field] || typeof c[field] !== 'string') fail(`character "${c.id || '?'}" missing ${field}`);
        }
    }

    // Unique ids and names
    const ids = list.map((c) => c.id);
    const names = list.map((c) => c.name);
    if (new Set(ids).size !== ids.length) fail('characters.json contains duplicate ids');
    if (new Set(names).size !== names.length) fail('characters.json contains duplicate names');

    // Id should be a slug of the name. Catches a rename that missed its id.
    for (const c of list) {
        const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (slug !== c.id) fail(`character "${c.name}" has id "${c.id}", expected "${slug}"`);
    }

    // --- cross-check against docs/characters.html, the reference page ---
    if (fs.existsSync(path.join(DOCS, 'characters.html'))) {
        const page = textOf('characters.html');
        for (const c of list) {
            if (!page.includes(c.name)) fail(`characters.html does not mention "${c.name}"`);
            if (!page.includes(c.role)) fail(`characters.html role text differs for "${c.name}"`);
        }
    } else {
        fail('docs/characters.html is missing; the character reference page must exist');
    }

    // --- cross-check against the roster stated on the home page ---
    const n = characters.count;
    const index = textOf('index.html');
    for (const c of list) {
        if (!index.includes(c.name)) fail(`index.html roster is missing "${c.name}"`);
        if (!index.includes(c.temperament)) fail(`index.html temperament for "${c.name}" does not match characters.json`);
    }

    // The About page is prose, not a roster, so character names are not required
    // there. What IS required is that it never states a contradictory count. A
    // page saying "ten characters" beside one saying twelve is exactly the
    // drift this script exists to catch.
    const about = textOf('about.html');
    const aboutLower = about.toLowerCase();
    const nWord = NUMWORD[n] || null;
    const statedSomewhere = about.includes(String(n)) ||
        (nWord && aboutLower.includes(nWord)) ||
        new RegExp(`\\b${n}\\s+characters\\b`, 'i').test(about);
    if (!statedSomewhere) fail('about.html never states the character total');
    for (const [word, value] of Object.entries(WORDS)) {
        if (value === n) continue;
        if (new RegExp(`\\b${word}\\s+characters\\b`, 'i').test(about)) {
            fail(`about.html states "${word} characters" but the roster is ${n}`);
        }
    }
    if (n && nWord && !index.toLowerCase().includes(nWord)) {
        fail(`index.html does not spell out the character total ("${nWord}")`);
    }

    // --- series tally, stated on the reference page ---
    const seriesCount = new Set(list.map((c) => c.series)).size;
    if (fs.existsSync(path.join(DOCS, 'characters.html'))) {
        const page = textOf('characters.html');
        if (!page.includes(String(seriesCount))) {
            fail(`characters.html does not state the series total (${seriesCount})`);
        }
    }

    console.log(`  characters.json   ${list.length} characters, ${seriesCount} series`);
}

// ---------------------------------------------------------------------------
// tools.json
// ---------------------------------------------------------------------------

const tools = load('tools.json');

if (tools) {
    const items = tools.items || [];

    if (items.length !== tools.products?.count) {
        fail(`tools.json declares products.count ${tools.products?.count} but contains ${items.length}`);
    }

    const modes = tools.otakuAi?.modes?.items || [];
    const toolItems = tools.otakuAi?.tools?.items || [];

    if (modes.length !== tools.otakuAi?.modes?.count) {
        fail(`tools.json declares modes.count ${tools.otakuAi?.modes?.count} but contains ${modes.length}`);
    }
    if (toolItems.length !== tools.otakuAi?.tools?.count) {
        fail(`tools.json declares tools.count ${tools.otakuAi?.tools?.count} but contains ${toolItems.length}`);
    }

    for (const t of [...items, ...modes, ...toolItems]) {
        for (const field of ['id', 'name', 'summary']) {
            if (!t[field]) fail(`${t.id || '?'} missing ${field}`);
        }
    }
    if (new Set([...items, ...modes, ...toolItems].map((t) => t.id)).size !== items.length + modes.length + toolItems.length) {
        fail('tools.json contains duplicate ids');
    }

    // Nothing should require an account, or cost money. That is the whole pitch.
    for (const t of items) {
        if (t.requiresAccount !== false) fail(`product "${t.name}" does not declare requiresAccount: false`);
        if (t.price !== '0') fail(`product "${t.name}" does not declare a price of "0"`);
    }

    // --- cross-check against docs/products.html ---
    const products = textOf('products.html');
    for (const t of [...items, ...modes, ...toolItems]) {
        if (!products.includes(t.name)) fail(`products.html does not mention "${t.name}"`);
    }

    // The Otaku AI tool total must be stated, and spelled out.
    const n = tools.otakuAi?.tools?.count;
    const productsLower = products.toLowerCase();
    const tWord = NUMWORD[n] || null;
    if (n && !products.includes(String(n)) && !(tWord && productsLower.includes(tWord))) {
        fail(`products.html never states the Otaku AI tool total (${n})`);
    }
    if (n && tWord && !productsLower.includes(tWord)) {
        fail(`products.html does not spell out the tool total ("${tWord}")`);
    }
    const mCount = tools.otakuAi?.modes?.count;
    const mWord = NUMWORD[mCount] || null;
    if (mCount && !products.includes(String(mCount)) && !(mWord && productsLower.includes(mWord))) {
        fail(`products.html does not state the mode total (${mCount})`);
    }

    console.log(`  tools.json        ${items.length} products, ${modes.length} modes, ${toolItems.length} tools`);
}

// ---------------------------------------------------------------------------
// platform.json
// ---------------------------------------------------------------------------

const platform = load('platform.json');

if (platform) {
    // The seven required claims. This is a policy, not a preference, so it is
    // asserted rather than merely suggested.
    const claims = platform.requiredClaims?.claims || [];
    if (claims.length !== 7) fail(`platform.json holds ${claims.length} required claims, policy says 7`);

    const p = platform.properties || {};
    const mustBeTrue = [
        ['isFree', 'every core feature is free'],
        ['coreFeaturesWorkWithAdsBlocked', 'core features work with ads blocked']
    ];
    const mustBeFalse = [
        ['requiresAccountForCoreFeatures', 'no account is required for core features'],
        ['hostsVideo', 'no video is hosted'],
        ['isAffiliatedWithAnyStudio', 'there is no affiliation with any studio'],
        ['usesVoiceCloning', 'no voice cloning is used'],
        ['sellsUserData', 'user data is never sold'],
        ['hasSubscription', 'there is no subscription'],
        ['hasPremiumTier', 'there is no premium tier']
    ];
    for (const [key, why] of mustBeTrue) if (p[key] !== true) fail(`platform.json properties.${key} must be true (${why})`);
    for (const [key, why] of mustBeFalse) if (p[key] !== false) fail(`platform.json properties.${key} must be false (${why})`);

    if (platform.contentPolicy?.characterRepliesAreCanon !== false) {
        fail('platform.json must record that character replies are not canon');
    }
    if (platform.contentPolicy?.protectedMediaReproduced !== false) {
        fail('platform.json must record that protected media is not reproduced');
    }

    if (!platform.definition || platform.definition.length < 40) {
        fail('platform.json needs a definition long enough to stand alone when quoted');
    }

    // Site URLs must be absolute and on a host we control.
    for (const s of platform.sites || []) {
        if (!/^https:\/\/(www\.)?[a-z0-9.-]*animearray\.site\//i.test(s.url)) {
            fail(`platform.json site "${s.label}" has an unexpected host: ${s.url}`);
        }
    }

    console.log(`  platform.json     ${claims.length} required claims, ${(platform.sites || []).length} sites`);
}

// ---------------------------------------------------------------------------
// Nothing operational may live in a data file. These are published, and people
// read what is published.
// ---------------------------------------------------------------------------

// Nothing operational may live in a data file. These are published, and people
// read what is published.
//
// Patterns are assembled from fragments rather than written literally, for the
// same reason the CI workflow does the same thing: a checker that contains
// every term it forbids, as plain text, hands over the list it exists to keep
// private. Assemble them and a naive search finds nothing.
//
// They are word-boundary matched, because prose collides with infrastructure
// vocabulary constantly. "secretly the most invested person" is a temperament,
// not a secret.
const P = (...frags) => new RegExp(frags.join(''), 'i');

const FORBIDDEN_IN_DATA = [
    P('\\bw', 'p-'),
    P('\\bapp-(core|public|private|config)\\b'),
    P('\\b(mu-)?', 'plugins?', '\\b'),
    P('\\bmulti', 'site\\b'),
    P('\\bhost', 'inger\\b'),
    P('\\blite', 'speed\\b'),
    P('\\b', 'php\\b'),
    P('/admin-?ajax\\b'),
    P('\\bwp-?json\\b'),
    P('\\b(?:api[_-]?key|secret|password|passwd|credential|private[_-]?key)\\b'),
    P('\\b(?:bearer|basic)\\s+[A-Za-z0-9._-]{12,}'),
    P('\\bGO', 'CSPX-'),
    P('\\bG-[A-Z0-9]{8,}\\b'),
    P('\\blocal', 'host\\b'),
    P('\\b127\\.0\\.1\\b'),
    P('\\b(?:192\\.168|10\\.\\d{1,3})\\.\\d{1,3}\\.\\d{1,3}\\b'),
    P('\\b(?:', 'mysql|pgsql|postgres)\\b'),
    P('\\bSELECT\\s+.+\\s+FROM\\b'),
    P('/home/[a-z0-9_-]+/')
];

for (const name of fs.existsSync(DATA) ? fs.readdirSync(DATA).filter((f) => f.endsWith('.json')) : []) {
    const raw = fs.readFileSync(path.join(DATA, name), 'utf8');
    for (const re of FORBIDDEN_IN_DATA) {
        const m = raw.match(re);
        if (m) fail(`data/${name} contains something that looks operational: ${JSON.stringify(m[0])}`);
    }
}

console.log('');

if (problems.length) {
    for (const p of problems) console.log(`  - ${p}`);
    console.log(`\n${problems.length} problem(s)`);
    process.exit(1);
}
console.log('Data and prose agree. No drift.');