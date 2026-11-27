const songConfig = {
    title: "Beautiful In White x My Love",
    userCredit: "@_jvst.k",
    startDelay: 1000,
    clearWhenFinished: false,

    cameraZoom: 1.65,
    activeLineScale: 1.15,
    fadeStrength: 0.35,
};

const lyrics = [
    {
        code: 'if (heart.knows( "you\'re my every reason" )) {',
        speed: 45,
        endPause: 1000
    },
    {
        code: '    System.out.println( "you\'re all that I believe in" );',
        speed: 42,
        endPause: 1000
    },
    {
        code: '    System.out.println( "with all my heart I" );',
        speed: 40,
        endPause: 1000
    },
    {
        code: '    System.out.println( "mean every word" );',
        speed: 40,
        endPause: 1000
    },
    {
        code: '}',
        speed: 30,
        endPause: 50
    },

    {
        code: 'else if (prayer.whisper( "so, I say a little prayer" )) {',
        speed: 42,
        endPause: 1000
    },
    {
        code: '    System.out.println( "and hope my dreams will take me there" );',
        speed: 40,
        endPause: 500
    },
    {
        code: '    System.out.println( "where the skies are blue" );',
        speed: 42,
        endPause: 300
    },
    {
        code: '    System.out.println( "to see you once again, my love" );',
        speed: 42,
        endPause: 900
    },
    {
        code: '}',
        speed: 30,
        endPause: 50
    },

    {
        code: 'for (Place place : journey.search( "overseas, from coast to coast" )) {',
        speed: 42,
        endPause: 300
    },
    {
        code: '    System.out.println( "to find a place I love the most" );',
        speed: 40,
        endPause: 800
    },
    {
        code: '    System.out.println( "where the fields are green" );',
        speed: 42,
        endPause: 400
    },
    {
        code: '    System.out.println( "to see you once again" );',
        speed: 42,
        endPause: 2800
    },
    {
        code: '    System.out.println( "my love" );',
        speed: 42,
        endPause: 3000
    },
    {
        code: '}',
        speed: 30,
        endPause: 1500
    },
];

const JAVA_CONTROL = new Set([
    'if', 'else', 'do', 'while', 'for', 'switch', 'case', 'break',
    'continue', 'return', 'try', 'catch', 'finally', 'throw', 'throws'
]);

const JAVA_KEYWORDS = new Set([
    'public', 'private', 'protected', 'class', 'interface', 'static', 'final',
    'void', 'new', 'import', 'package', 'this', 'super', 'null', 'true', 'false',
    'extends', 'implements'
]);

const JAVA_TYPES = new Set([
    'System', 'String', 'Memory', 'Heart', 'Exception', 'Track', 'Song', 'Place',
    'int', 'boolean', 'double', 'float', 'char', 'long', 'byte', 'short',
    'void', 'List', 'Map', 'Set'
]);

function formatTokenText(tokenStr, tokenStartIdx, activeCharIdx) {
    if (activeCharIdx >= 0 && activeCharIdx >= tokenStartIdx && activeCharIdx < tokenStartIdx + tokenStr.length) {
        const offset = activeCharIdx - tokenStartIdx;
        const before = escapeHtml(tokenStr.slice(0, offset));
        const activeChar = escapeHtml(tokenStr.slice(offset, offset + 1));
        const after = escapeHtml(tokenStr.slice(offset + 1));

        return `${before}<span class="char-active">${activeChar}</span>${after}`;
    }
    return escapeHtml(tokenStr);
}

function highlightJava(rawCode, isLineFinished) {
    const tokenRegex = /("(?:\\.|[^"\\])*")|([a-zA-Z_$][a-zA-Z0-9_$]*)|(\d+)|([{}()[\]])|([:!+\-*\/%=<>]+)|([.,;])|(\s+)|(.)/g;

    let html = '';
    let match;

    const activeCharIdx = isLineFinished ? -1 : (rawCode.length - 1);

    while ((match = tokenRegex.exec(rawCode)) !== null) {
        const tokenStartIdx = match.index;
        const [
            fullToken,
            stringToken,
            wordToken,
            numberToken,
            bracketToken,
            operatorToken,
            punctToken,
            spaceToken,
            otherToken
        ] = match;

        if (stringToken !== undefined) {
            const formatted = formatTokenText(stringToken, tokenStartIdx, activeCharIdx);
            html += `<span class="t-string">${formatted}</span>`;
        } else if (wordToken !== undefined) {
            const formatted = formatTokenText(wordToken, tokenStartIdx, activeCharIdx);

            const nextIdx = tokenRegex.lastIndex;
            const lookAhead = rawCode.slice(nextIdx).match(/^\s*\(/);
            const isMethod = !!lookAhead;

            let spanClass = 't-var';
            if (JAVA_CONTROL.has(wordToken)) {
                spanClass = 't-control';
            } else if (JAVA_KEYWORDS.has(wordToken)) {
                spanClass = 't-keyword';
            } else if (JAVA_TYPES.has(wordToken)) {
                spanClass = 't-type';
            } else if (isMethod) {
                spanClass = 't-method';
            } else {
                spanClass = 't-var';
            }

            html += `<span class="${spanClass}">${formatted}</span>`;
        } else if (numberToken !== undefined) {
            const formatted = formatTokenText(numberToken, tokenStartIdx, activeCharIdx);
            html += `<span class="t-number">${formatted}</span>`;
        } else if (bracketToken !== undefined) {
            const formatted = formatTokenText(bracketToken, tokenStartIdx, activeCharIdx);
            html += `<span class="t-bracket">${formatted}</span>`;
        } else if (operatorToken !== undefined) {
            const formatted = formatTokenText(operatorToken, tokenStartIdx, activeCharIdx);
            html += `<span class="t-operator">${formatted}</span>`;
        } else if (punctToken !== undefined) {
            const formatted = formatTokenText(punctToken, tokenStartIdx, activeCharIdx);
            html += `<span class="t-punct">${formatted}</span>`;
        } else if (spaceToken !== undefined) {
            html += spaceToken;
        } else if (otherToken !== undefined) {
            const formatted = formatTokenText(otherToken, tokenStartIdx, activeCharIdx);
            html += formatted;
        }
    }

    return html;
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}


const codeDisplay = document.getElementById('code-display');
const songTitleElem = document.getElementById('song-title');
const userCreditElem = document.getElementById('user-credit');
const editorWindow = document.querySelector('.editor-window');

if (songTitleElem) songTitleElem.textContent = songConfig.title;
if (userCreditElem) userCreditElem.textContent = songConfig.userCredit;

let currentLineIndex = 0;
let isTyping = false;
let isPaused = false;
let typingTimeout = null;

function updateCamera(isReturning = false) {
    const renderedLines = codeDisplay.querySelectorAll('.code-line');
    if (renderedLines.length === 0) return;

    const activeLine = renderedLines[currentLineIndex];
    if (!activeLine) return;

    renderedLines.forEach((line, idx) => {
        const distance = Math.abs(currentLineIndex - idx);

        if (distance === 0) {
            line.classList.add('active');
            line.style.opacity = '1';
            line.style.transform = `scale(${songConfig.activeLineScale})`;
            line.style.filter = 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.12))';
        } else {
            line.classList.remove('active');
            const opacity = Math.max(0.04, Math.pow(songConfig.fadeStrength, distance));
            const scale = Math.max(0.82, 0.90 - (distance - 1) * 0.05);
            const blurAmount = Math.min(2.5, distance * 0.8);

            line.style.opacity = opacity.toFixed(3);
            line.style.transform = `scale(${scale.toFixed(3)})`;
            line.style.filter = `blur(${blurAmount.toFixed(1)}px)`;
        }
    });

    const windowHeight = editorWindow ? editorWindow.clientHeight : window.innerHeight;
    const lineCenter = activeLine.offsetTop + (activeLine.offsetHeight / 2);
    const targetY = (windowHeight / 2) - (lineCenter * songConfig.cameraZoom);

    const windowWidth = editorWindow ? editorWindow.clientWidth : window.innerWidth;
    const cursorSpan = activeLine.querySelector('.cursor-block');
    const lineContent = activeLine.querySelector('.line-text');
    let cursorX = 0;
    if (cursorSpan && cursorSpan.offsetLeft > 0) {
        cursorX = cursorSpan.offsetLeft + cursorSpan.offsetWidth;
    } else if (lineContent) {
        cursorX = lineContent.scrollWidth;
    }
    const startOffsetX = Math.max(24, windowWidth * 0.05);

    let targetX = startOffsetX;
    if (isReturning) {
        targetX = startOffsetX;
    } else {
        const focusTarget = windowWidth * 0.48;
        const visualCursorX = startOffsetX + (cursorX * songConfig.cameraZoom);
        if (visualCursorX > focusTarget) {
            targetX = startOffsetX - (visualCursorX - focusTarget);
        } else {
            targetX = startOffsetX;
        }
    }

    codeDisplay.style.transform = `
        translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(1)}px, 0) 
        scale(${songConfig.cameraZoom})
    `;
}

function typeLine() {
    if (currentLineIndex >= lyrics.length) {
        isTyping = false;
        const allLines = codeDisplay.querySelectorAll('.code-line');
        allLines.forEach(l => l.classList.remove('active'));

        if (songConfig.clearWhenFinished) {
            setTimeout(() => {
                codeDisplay.innerHTML = '';
                currentLineIndex = 0;
                setTimeout(typeLine, songConfig.startDelay);
            }, 3000);
        }
        return;
    }

    isTyping = true;
    const item = lyrics[currentLineIndex];
    const fullText = item.code || '';
    const speed = item.speed || 45;
    const endPause = item.endPause || 1500;

    const lineRow = document.createElement('div');
    lineRow.className = 'code-line active';

    const lineGutter = document.createElement('div');
    lineGutter.className = 'line-gutter';

    const lineNum = document.createElement('div');
    lineNum.className = 'line-num';
    lineNum.textContent = String(currentLineIndex + 1).padStart(2, '0');

    const foldArrow = document.createElement('span');
    foldArrow.className = 'fold-arrow';
    foldArrow.textContent = fullText.trim().endsWith('{') ? '˅' : '\u00A0';

    const gitMarker = document.createElement('div');
    gitMarker.className = 'git-marker';

    lineGutter.appendChild(lineNum);
    lineGutter.appendChild(foldArrow);
    lineGutter.appendChild(gitMarker);

    const lineContent = document.createElement('div');
    lineContent.className = 'line-text';

    lineRow.appendChild(lineGutter);
    lineRow.appendChild(lineContent);
    codeDisplay.appendChild(lineRow);

    codeDisplay.classList.add('returning');
    updateCamera(false);

    setTimeout(() => {
        codeDisplay.classList.remove('returning');
    }, 650);

    const firstNonSpace = fullText.search(/\S/);
    let charIdx = firstNonSpace > 0 ? firstNonSpace : 0;

    function typeNextChar() {
        if (isPaused) return;

        if (charIdx <= fullText.length) {
            const currentSub = fullText.slice(0, charIdx);
            const isFinished = (charIdx === fullText.length);

            const highlighted = highlightJava(currentSub, isFinished);
            lineContent.innerHTML = highlighted + '<span class="cursor-block"></span>';

            updateCamera(false);

            if (!isFinished) {
                charIdx++;
                typingTimeout = setTimeout(typeNextChar, speed);
            } else {
                typingTimeout = setTimeout(() => {
                    lineContent.innerHTML = highlightJava(fullText, true);

                    currentLineIndex++;
                    typeLine();
                }, endPause);
            }
        }
    }

    typeNextChar();
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeLine, songConfig.startDelay);
});

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        isPaused = !isPaused;
        if (!isPaused && isTyping) {
            typeLine();
        }
    } else if (e.key === 'r' || e.key === 'R') {
        clearTimeout(typingTimeout);
        codeDisplay.innerHTML = '';
        currentLineIndex = 0;
        isPaused = false;
        typeLine();
    }
});
