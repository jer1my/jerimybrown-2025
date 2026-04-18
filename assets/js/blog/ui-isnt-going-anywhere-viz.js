/**
 * Scroll-swapping visualizations for "UI Is Not Going Anywhere: A UX Story"
 *
 * - Crossfades chart panels in the pinned right column as data sections scroll into view
 * - Injects a "See the full pattern" button that opens a horizontal timeline modal
 */

// Maps article H2 headings to chart keys
const SECTION_CHART_MAP = [
    { match: 'Green Screen',    chart: 'pc'            },
    { match: 'Phone You Could', chart: 'phone'         },
    { match: 'Chat Box',        chart: 'ai'            },
    { match: 'Visual Animals',  chart: 'visual-animals'},
    { match: 'Accessibility',   chart: 'accessibility' },
];

// ─── SVG Chart Factory ────────────────────────────────────────────────────────
// All three charts share an identical visual shape — only the labels differ.
// This makes the repeated pattern immediately obvious.

function makeChart({ title, startValue, endValue, inflectionYear, inflectionLabel, startYear, endYear }) {
    return `
<svg viewBox="22 0 344 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
    <defs>
        <linearGradient id="area-grad-${chart_id(title)}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0.02"/>
        </linearGradient>
    </defs>

    <!-- Title -->
    <text x="50" y="16"
          font-family="'IBM Plex Sans', sans-serif" font-size="12" font-weight="500"
          fill="currentColor" fill-opacity="0.38" letter-spacing="0.08em"
          style="text-transform:uppercase">${title.toUpperCase()}</text>

    <!-- End value label (big, top-right, overlays chart intentionally) -->
    <text x="356" y="52"
          text-anchor="end"
          font-family="'IBM Plex Sans', sans-serif" font-size="32" font-weight="600"
          fill="var(--color-accent)">${endValue}</text>

    <!-- Inflection event label -->
    <text x="168" y="52"
          font-family="'IBM Plex Sans', sans-serif" font-size="13" font-weight="500"
          fill="var(--color-accent)" fill-opacity="0.8">${inflectionLabel}</text>

    <!-- Axes -->
    <line x1="50" y1="200" x2="360" y2="200"
          stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>
    <line x1="50" y1="60"  x2="50"  y2="200"
          stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>

    <!-- Area fill under post-inflection curve -->
    <path d="M160,200 L160,175 C200,174 340,110 360,60 L360,200 Z"
          fill="url(#area-grad-${chart_id(title)})"/>

    <!-- Pre-inflection line (muted — slow growth) -->
    <path d="M50,190 C90,188 125,184 160,175"
          fill="none" stroke="currentColor" stroke-opacity="0.25"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Post-inflection line (accent — J-curve, accelerates upward) -->
    <path d="M160,175 C200,174 340,110 360,60"
          fill="none" stroke="var(--color-accent)"
          stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Inflection vertical dashed line -->
    <line x1="160" y1="60" x2="160" y2="200"
          stroke="var(--color-accent)" stroke-width="1.5"
          stroke-dasharray="4,4" stroke-opacity="0.4"/>

    <!-- Inflection glow ring -->
    <circle cx="160" cy="175" r="13"
            fill="var(--color-accent)" fill-opacity="0.14"/>
    <!-- Inflection dot -->
    <circle cx="160" cy="175" r="6"
            fill="var(--color-accent)"/>

    <!-- Start value label -->
    <text x="54" y="171"
          font-family="'IBM Plex Sans', sans-serif" font-size="18" font-weight="600"
          fill="currentColor" fill-opacity="0.32">${startValue}</text>

    <!-- X-axis: start year -->
    <text x="50" y="220"
          text-anchor="middle"
          font-family="'IBM Plex Sans', sans-serif" font-size="13"
          fill="currentColor" fill-opacity="0.3">${startYear}</text>

    <!-- X-axis: inflection year -->
    <text x="160" y="220"
          text-anchor="middle"
          font-family="'IBM Plex Sans', sans-serif" font-size="13" font-weight="600"
          fill="var(--color-accent)" fill-opacity="0.8">${inflectionYear}</text>

    <!-- X-axis: end year -->
    <text x="360" y="220"
          text-anchor="end"
          font-family="'IBM Plex Sans', sans-serif" font-size="13"
          fill="currentColor" fill-opacity="0.3">${endYear}</text>
</svg>`;
}

function chart_id(title) {
    return title.replace(/\s+/g, '-').toLowerCase().substring(0, 12);
}

const CHARTS = {
    pc: makeChart({
        title:            'US home computer ownership',
        startValue:       '~3%',
        endValue:         '50%',
        inflectionYear:   '1984',
        inflectionLabel:  'Mac GUI',
        startYear:        '1977',
        endYear:          '1998',
    }),
    phone: makeChart({
        title:            'Global smartphone penetration',
        startValue:       '6%',
        endValue:         '70%',
        inflectionYear:   '2007',
        inflectionLabel:  'iPhone UI',
        startYear:        '2002',
        endYear:          '2026',
    }),
    ai: makeChart({
        title:            'ChatGPT weekly active users',
        startValue:       '1M',
        endValue:         '900M',
        inflectionYear:   '2024',
        inflectionLabel:  'ChatGPT UI',
        startYear:        '2022',
        endYear:          '2026',
    }),
};

// ─── Viz Panel ────────────────────────────────────────────────────────────────

function buildVizPanel() {
    return `
<div class="viz-panel" id="viz-panel">
    <div class="viz-slide viz-slide--active" data-viz="cover">
        <img src="../assets/content/blog/ui-isnt-going-anywhere/cover.webp"
             alt="" class="viz-cover-img" loading="eager">
    </div>
    <div class="viz-slide" data-viz="chart-pc">
        <div class="viz-chart-wrap">${CHARTS.pc}</div>
    </div>
    <div class="viz-slide" data-viz="chart-phone">
        <div class="viz-chart-wrap">${CHARTS.phone}</div>
    </div>
    <div class="viz-slide" data-viz="chart-ai">
        <div class="viz-chart-wrap">${CHARTS.ai}</div>
    </div>
    <div class="viz-slide" data-viz="visual-animals">
        <img src="../assets/content/blog/ui-isnt-going-anywhere/visual-animals.webp"
             alt="We Are Visual Animals" class="viz-cover-img" loading="lazy">
    </div>
    <div class="viz-slide" data-viz="accessibility">
        <img src="../assets/content/blog/ui-isnt-going-anywhere/accessibility.webp"
             alt="A Word About Accessibility" class="viz-cover-img" loading="lazy">
        </div>
    </div>
</div>`;
}

// ─── Timeline Modal ───────────────────────────────────────────────────────────

const TL_START = 1977;
const TL_END   = 2026;

const TIMELINE_EVENTS = [
    {
        year:     1977,
        headline: 'The 1977 Trinity',
        body:     'Apple II, Commodore PET, TRS-80. Computers exist, but only hobbyists can use them. Adoption is near zero.',
        stat:     null,
        uiMoment: false,
        imgKey:   'green-screen',
        imgAlt:   'Green screen terminal',
    },
    {
        year:     1984,
        headline: 'Mac GUI Ships',
        body:     'The first mass-market graphical interface. No memorizing commands. Point, click, understand. Everything changes.',
        stat:     '8% → 50% US household ownership',
        uiMoment: true,
        imgKey:   'mac-gui',
        imgAlt:   'Mac GUI era graphic',
    },
    {
        year:     2000,
        headline: 'The T9 Era',
        body:     'Cell phones exist. Texting is miserable. Three presses for the letter C. The adoption ceiling is very real.',
        stat:     '6% smartphone penetration',
        uiMoment: false,
        imgKey:   't9-keypad',
        imgAlt:   'T9 keypad graphic',
    },
    {
        year:     2007,
        headline: 'iPhone Launches',
        body:     'A touchscreen interface unlocks the mobile market. The fastest consumer technology adoption in history.',
        stat:     '6% → 70% global penetration',
        uiMoment: true,
        imgKey:   'iphone-ui',
        imgAlt:   'iPhone touchscreen graphic',
    },
    {
        year:     2022,
        headline: 'ChatGPT Launches',
        body:     'A text box. One million users in five days — mostly technical early adopters pushing past the friction.',
        stat:     '1M users in 5 days',
        uiMoment: false,
        imgKey:   'chatgpt-prompt',
        imgAlt:   'Blank ChatGPT prompt box',
    },
    {
        year:     2024,
        headline: 'UI Layers Arrive',
        body:     'Memory, projects, voice, canvas, artifacts. Adoption stops being a technical story and becomes a human one.',
        stat:     '900M weekly active users',
        uiMoment: true,
        imgKey:   'ai-interface',
        imgAlt:   'Rich AI interface graphic',
    },
    {
        year:     2026,
        headline: 'Claude Design Launches',
        body:     'April 17, 2026. Prototypes, slides, wireframes — with AI. The pattern completes itself again.',
        stat:     null,
        uiMoment: false,
        imgKey:   'claude-design',
        imgAlt:   'Claude Design screenshot',
    },
];

function tlYearToPercent(year) {
    return (year - TL_START) / (TL_END - TL_START) * 100;
}

function tlPercentToYear(pct) {
    return Math.round(TL_START + (pct / 100) * (TL_END - TL_START));
}

const TL_CHART_MAP = { 1984: CHARTS.pc, 2007: CHARTS.phone, 2024: CHARTS.ai };

function buildPanelVisual(e) {
    return `<img class="tl-event__img"
                 src="../assets/content/blog/ui-isnt-going-anywhere/tl-${e.year}.webp"
                 alt="${e.imgAlt}" loading="lazy">`;
}

function buildTimelineModal() {
    const events = TIMELINE_EVENTS.map((e, i) => `
        <div class="tl-event${e.uiMoment ? ' tl-event--ui-moment' : ''}${i === 0 ? ' tl-event--active' : ''}"
             data-event="${i}"
             style="left:${tlYearToPercent(e.year)}%">
            <div class="tl-event__upper">
                <div class="tl-event__visual">${buildPanelVisual(e)}</div>
            </div>
            <div class="tl-event__node"></div>
            <div class="tl-event__lower">
                <div class="tl-event__year-row">
                    <div class="tl-event__year">${e.year}</div>
                    ${e.uiMoment ? '<div class="tl-ui-badge">✦ UI Moment</div>' : ''}
                </div>
                <div class="tl-event__headline">${e.headline}</div>
                <p class="tl-event__body">${e.body}</p>
                ${e.stat ? `<div class="tl-event__stat">${e.stat}</div>` : ''}
            </div>
        </div>
    `).join('');

    const anchors = TIMELINE_EVENTS.map((e, i) => `
        <button class="tl-anchor${e.uiMoment ? ' tl-anchor--ui-moment' : ''}${i === 0 ? ' tl-anchor--active' : ''}"
                style="left:${tlYearToPercent(e.year)}%"
                data-anchor="${i}"
                aria-label="${e.year}: ${e.headline}"></button>
    `).join('');

    return `
<div class="tl-modal" id="timeline-modal" role="dialog" aria-modal="true" aria-label="The full pattern">
    <button class="tl-modal__close" id="timeline-close" aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    </button>

    <div class="tl-stage" id="tl-stage">
        <div class="tl-year-counter" id="tl-year-counter">${TL_START}</div>
        <div class="tl-big-track" id="tl-big-track">
            <div class="tl-axis"></div>
            ${events}
        </div>
    </div>

    <div class="tl-scrubber-wrap">
        <div class="tl-scrubber" id="tl-scrubber">
            <div class="tl-track" id="tl-track">
                <div class="tl-zone tl-zone--pc"></div>
                <div class="tl-zone tl-zone--mobile"></div>
                <div class="tl-zone tl-zone--ai"></div>
                ${anchors}
                <div class="tl-handle" id="tl-handle">
                    <div class="tl-handle-year" id="tl-handle-year">${TL_START}</div>
                </div>
            </div>
        </div>
        <div class="tl-era-labels">
            <span class="tl-era-label tl-era-label--pc">PC Era</span>
            <span class="tl-era-label tl-era-label--mobile">Mobile Era</span>
            <span class="tl-era-label tl-era-label--ai">AI Era</span>
        </div>
    </div>
</div>`;
}

// ─── Scroll Observer ──────────────────────────────────────────────────────────

function setupScrollObserver() {
    const slides = document.querySelectorAll('.viz-slide');

    function setActiveSlide(vizKey) {
        const map = { cover: 'cover', pc: 'chart-pc', phone: 'chart-phone', ai: 'chart-ai', 'visual-animals': 'visual-animals', accessibility: 'accessibility' };
        const target = map[vizKey] || 'cover';
        slides.forEach(s => s.classList.toggle('viz-slide--active', s.dataset.viz === target));
    }

    const triggers = [];
    document.querySelectorAll('.blog-article__body h2').forEach(h2 => {
        const text = h2.textContent.trim();
        const match = SECTION_CHART_MAP.find(s => text.includes(s.match));
        if (match) triggers.push({ el: h2, viz: match.chart });
    });

    function updateActiveSection() {
        let active = 'cover';
        // Only check H2 triggers after real scrolling — at the top of the page
        // the first H2 is already above the threshold, which would wrongly
        // override the cover image.
        if (window.scrollY > 60) {
            const threshold = window.innerHeight * 0.45;
            for (const t of triggers) {
                if (t.el.getBoundingClientRect().top <= threshold) active = t.viz;
            }
        }
        setActiveSlide(active);
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
}

// ─── Modal + Scrubber ─────────────────────────────────────────────────────────

function setupModal(openBtn) {
    const modal    = document.getElementById('timeline-modal');
    const closeBtn = document.getElementById('timeline-close');
    if (!modal) return;

    // Open / close — persisted via URL hash so hard refresh keeps it open
    const open = () => {
        modal.classList.add('tl-modal--active');
        document.body.style.overflow = 'hidden';
        updateHandle(tlYearToPercent(TIMELINE_EVENTS[activeIdx].year));
        if (location.hash !== '#timeline') history.pushState(null, '', '#timeline');
        closeBtn?.focus();
    };
    const close = () => {
        modal.classList.remove('tl-modal--active');
        document.body.style.overflow = '';
        if (location.hash === '#timeline') history.pushState(null, '', location.pathname + location.search);
    };

    openBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);

    // Browser back button closes the modal
    window.addEventListener('popstate', () => {
        if (location.hash === '#timeline') { open(); }
        else if (modal.classList.contains('tl-modal--active')) { close(); }
    });

    // Clean up body overflow when navigating away with modal open
    window.addEventListener('pagehide', () => {
        document.body.style.overflow = '';
    });
    let modalMouseDownTarget = null;
    modal.addEventListener('mousedown', e => { modalMouseDownTarget = e.target; });
    modal.addEventListener('click', e => {
        if (e.target === modal && modalMouseDownTarget === modal) close();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('tl-modal--active')) close();
    });

    // Re-center the big track when the viewport resizes
    window.addEventListener('resize', () => {
        if (!modal.classList.contains('tl-modal--active')) return;
        updateHandle(tlYearToPercent(TIMELINE_EVENTS[activeIdx].year));
    });

    // Scrubber elements
    const track      = document.getElementById('tl-track');
    const handle     = document.getElementById('tl-handle');
    const handleYear = document.getElementById('tl-handle-year');
    const yearCounter = document.getElementById('tl-year-counter');
    const events     = document.querySelectorAll('.tl-event');
    const bigTrack   = document.getElementById('tl-big-track');
    const anchors    = document.querySelectorAll('.tl-anchor');
    function getTrackScale() { return window.innerWidth <= 768 ? 12 : 6; }

    let activeIdx  = 0;
    let isDragging = false;
    const SNAP_PX  = 20;

    function clampVal(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    function setActiveEvent(idx) {
        events.forEach((ev, i) => ev.classList.toggle('tl-event--active', i === idx));
        anchors.forEach((a, i) => a.classList.toggle('tl-anchor--active', i === idx));
        activeIdx = idx;
    }

    function clearActiveEvent() {
        events.forEach(ev => ev.classList.remove('tl-event--active'));
        anchors.forEach(a => a.classList.remove('tl-anchor--active'));
    }

    function updateHandle(pct) {
        handle.style.left = pct + '%';
        const yr = tlPercentToYear(pct);
        handleYear.textContent = yr;
        yearCounter.textContent = yr;
        const vw = window.innerWidth;
        bigTrack.style.transform = `translateX(${vw / 2 - (pct / 100) * getTrackScale() * vw}px)`;
    }

    function scrubTo(clientX) {
        const rect = track.getBoundingClientRect();
        const rawPct = clampVal((clientX - rect.left) / rect.width * 100, 0, 100);

        // Check proximity to any anchor
        let snappedIdx = -1;
        let minDist    = Infinity;
        TIMELINE_EVENTS.forEach((e, i) => {
            const anchorX = rect.left + tlYearToPercent(e.year) / 100 * rect.width;
            const dist    = Math.abs(clientX - anchorX);
            if (dist < SNAP_PX && dist < minDist) { minDist = dist; snappedIdx = i; }
        });

        if (snappedIdx >= 0) {
            updateHandle(tlYearToPercent(TIMELINE_EVENTS[snappedIdx].year));
            setActiveEvent(snappedIdx);
        } else {
            updateHandle(rawPct);
            clearActiveEvent();
        }
    }

    function snapToNearest() {
        const pct = parseFloat(handle.style.left) || 0;
        let nearestIdx = 0, nearestDist = Infinity;
        TIMELINE_EVENTS.forEach((e, i) => {
            const d = Math.abs(tlYearToPercent(e.year) - pct);
            if (d < nearestDist) { nearestDist = d; nearestIdx = i; }
        });
        updateHandle(tlYearToPercent(TIMELINE_EVENTS[nearestIdx].year));
        setActiveEvent(nearestIdx);
    }

    // Drag state
    let dragLastX        = null;
    let dragDir          = 0;     // +1 right, -1 left, 0 unknown
    let hasDragged       = false; // true once mouse/touch actually moves
    let justDragged      = false; // briefly true after any drag/click ends
    let clickedAnchorIdx = -1;   // anchor index if mousedown landed on a dot

    function recordDragX(clientX) {
        if (dragLastX !== null && clientX !== dragLastX) {
            dragDir    = Math.sign(clientX - dragLastX);
            hasDragged = true;
        }
        dragLastX = clientX;
    }

    function anchorIdxForRelease() {
        const currentPct = parseFloat(handle.style.left) || 0;
        if (dragDir > 0) {
            for (let i = 0; i < TIMELINE_EVENTS.length; i++) {
                if (tlYearToPercent(TIMELINE_EVENTS[i].year) >= currentPct - 0.5) return i;
            }
            return TIMELINE_EVENTS.length - 1;
        }
        if (dragDir < 0) {
            for (let i = TIMELINE_EVENTS.length - 1; i >= 0; i--) {
                if (tlYearToPercent(TIMELINE_EVENTS[i].year) <= currentPct + 0.5) return i;
            }
            return 0;
        }
        let nearestIdx = 0, nearestDist = Infinity;
        TIMELINE_EVENTS.forEach((e, i) => {
            const d = Math.abs(tlYearToPercent(e.year) - currentPct);
            if (d < nearestDist) { nearestDist = d; nearestIdx = i; }
        });
        return nearestIdx;
    }

    function endDrag() {
        isDragging = false;
        handle.classList.remove('tl-handle--dragging');

        // Pure tap on a dot (no movement): soft-scroll to that dot.
        // Real drag: soft-scroll in direction of travel.
        const targetIdx = (!hasDragged && clickedAnchorIdx >= 0)
            ? clickedAnchorIdx
            : anchorIdxForRelease();

        smoothScrollTo(targetIdx);

        // Suppress the click event that fires after mouseup on the same anchor button
        justDragged = true;
        setTimeout(() => { justDragged = false; }, 150);

        clickedAnchorIdx = -1;
        dragLastX  = null;
        dragDir    = 0;
        hasDragged = false;
    }

    // Find nearest anchor index from a pixel position on the track
    function nearestAnchorFromX(clientX) {
        const rect = track.getBoundingClientRect();
        const pct  = clampVal((clientX - rect.left) / rect.width * 100, 0, 100);
        let idx = 0, best = Infinity;
        TIMELINE_EVENTS.forEach((ev, i) => {
            const d = Math.abs(tlYearToPercent(ev.year) - pct);
            if (d < best) { best = d; idx = i; }
        });
        return idx;
    }

    // Mouse — only respond to anchor dot clicks, not bare track clicks
    const scrubberEl = document.getElementById('tl-scrubber');
    scrubberEl.addEventListener('mousedown', e => {
        if (!e.target.classList.contains('tl-anchor')) return;
        isDragging = true;
        hasDragged = false;
        dragLastX  = e.clientX;
        dragDir    = 0;
        handle.classList.add('tl-handle--dragging');
        clickedAnchorIdx = parseInt(e.target.dataset.anchor);
        e.preventDefault();
    });
    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        recordDragX(e.clientX);
        scrubTo(e.clientX);
    });
    window.addEventListener('mouseup', () => { if (isDragging) endDrag(); });

    // Touch — only respond to anchor dot taps
    scrubberEl.addEventListener('touchstart', e => {
        if (!e.target.classList.contains('tl-anchor')) return;
        isDragging = true;
        hasDragged = false;
        dragLastX  = e.touches[0].clientX;
        dragDir    = 0;
        handle.classList.add('tl-handle--dragging');
        clickedAnchorIdx = parseInt(e.target.dataset.anchor);
        e.preventDefault();
    }, { passive: false });
    window.addEventListener('touchmove', e => {
        if (!isDragging) return;
        recordDragX(e.touches[0].clientX);
        scrubTo(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', () => { if (isDragging) endDrag(); });

    // Smooth animated travel to a target anchor
    let rafId = null;

    function smoothScrollTo(targetIdx) {
        if (rafId) cancelAnimationFrame(rafId);

        const fromPct = parseFloat(handle.style.left) || 0;
        const toPct   = tlYearToPercent(TIMELINE_EVENTS[targetIdx].year);
        if (Math.abs(fromPct - toPct) < 0.1) { setActiveEvent(targetIdx); return; }

        const duration = Math.min(600, Math.max(280, Math.abs(toPct - fromPct) * 14)); // ms
        const startTs  = performance.now();

        clearActiveEvent();

        function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; } // ease-in-out quad

        function step(now) {
            const t      = Math.min((now - startTs) / duration, 1);
            const pct    = fromPct + (toPct - fromPct) * ease(t);
            updateHandle(pct);

            if (t < 1) {
                rafId = requestAnimationFrame(step);
            } else {
                updateHandle(toPct);
                setActiveEvent(targetIdx);
                rafId = null;
            }
        }

        rafId = requestAnimationFrame(step);
    }

    // Anchor dot clicks — smooth travel (suppressed if user just finished a drag)
    anchors.forEach((a, i) => {
        a.addEventListener('click', () => { if (!justDragged) smoothScrollTo(i); });
    });

    // Keyboard: arrow keys navigate between anchors (also smooth)
    modal.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            smoothScrollTo(Math.min(activeIdx + 1, TIMELINE_EVENTS.length - 1));
            e.preventDefault();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            smoothScrollTo(Math.max(activeIdx - 1, 0));
            e.preventDefault();
        }
    });

    // Scroll / trackpad: direction-aware scrubbing with anchor snap
    let scrollSnapTimer = null;

    modal.addEventListener('wheel', ev => {
        if (!modal.classList.contains('tl-modal--active')) return;
        ev.preventDefault();

        const raw    = Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.deltaY;
        const pixels = ev.deltaMode === 1 ? raw * 40 : raw;
        if (Math.abs(pixels) < 0.5) return;

        const step       = Math.sign(pixels) * Math.min(Math.abs(pixels) / 36, 1.5);
        const currentPct = parseFloat(handle.style.left) || 0;
        const newPct     = clampVal(currentPct + step, 0, 100);

        // Only snap-check when clearly away from current anchor
        const atCurrent = Math.abs(currentPct - tlYearToPercent(TIMELINE_EVENTS[activeIdx].year)) < 0.5;

        if (!atCurrent) {
            for (let i = 0; i < TIMELINE_EVENTS.length; i++) {
                if (i === activeIdx) continue;
                const aPct = tlYearToPercent(TIMELINE_EVENTS[i].year);
                const crossed = Math.sign(pixels) > 0
                    ? (currentPct < aPct && newPct >= aPct)
                    : (currentPct > aPct && newPct <= aPct);
                if (crossed || Math.abs(newPct - aPct) < 2) {
                    updateHandle(aPct);
                    setActiveEvent(i);
                    clearTimeout(scrollSnapTimer);
                    return;
                }
            }
        }

        _scrollMove(newPct);
        clearTimeout(scrollSnapTimer);
        scrollSnapTimer = setTimeout(() => {
            const pct = parseFloat(handle.style.left) || 0;
            let targetIdx = 0, nearestDist = Infinity;
            TIMELINE_EVENTS.forEach((e, i) => {
                const d = Math.abs(tlYearToPercent(e.year) - pct);
                if (d < nearestDist) { nearestDist = d; targetIdx = i; }
            });
            smoothScrollTo(targetIdx);
        }, 220);
    }, { passive: false });

    function _scrollMove(newPct) {
        updateHandle(newPct);
        clearActiveEvent();
    }

    // Auto-open if URL has #timeline (e.g. hard refresh while modal was open)
    if (location.hash === '#timeline') {
        modal.style.transition = 'opacity 0.1s ease, visibility 0.1s ease';
        modal.classList.add('tl-modal--active');
        document.body.style.overflow = 'hidden';
        if (location.hash !== '#timeline') history.pushState(null, '', '#timeline');
        updateHandle(tlYearToPercent(TIMELINE_EVENTS[activeIdx].year));
        // Don't focus the close button on hash restore
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { modal.style.transition = ''; });
        });
    }
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
    // Activate the right column
    const imagesCol = document.querySelector('.blog-article__images');
    if (!imagesCol) return;
    imagesCol.classList.add('blog-article__images--active');
    imagesCol.innerHTML = buildVizPanel();

    // Inject timeline modal into body
    document.body.insertAdjacentHTML('beforeend', buildTimelineModal());

    // Inject "See the full pattern" button before the "Transient UI" section
    const h2s = document.querySelectorAll('.blog-article__body h2');
    let transientH2 = null;
    h2s.forEach(h2 => { if (h2.textContent.includes('Transient UI')) transientH2 = h2; });
    let openBtn = null;
    if (transientH2) {
        transientH2.insertAdjacentHTML('beforebegin', `
            <div class="viz-timeline-cta">
                <button class="viz-timeline-btn" id="open-timeline" aria-haspopup="dialog">
                    See the full pattern
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `);
        openBtn = transientH2.previousElementSibling?.querySelector('#open-timeline');
    }

    setupScrollObserver();
    setupModal(openBtn);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
